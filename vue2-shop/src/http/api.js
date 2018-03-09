import axios from "axios";
import store from "@/vuex/store.js";
import router from "../router";
import { isFromWechat } from "@/util/weixin.js";

const api = axios.create();

api.defaults.baseURL = process.env.BASE_API;
// api.defaults.baseURL = 'http://127.0.0.1:8887';
//api.defaults.baseURL = 'http://192.168.40.124:8887';
api.defaults.timeout = 100000;
api.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
api.defaults.headers.post["X-Requested-With"] = "XMLHttpRequest";
api.defaults.withCredentials = true;
// 请求拦截
api.interceptors.request.use(function (config) {
  config.headers['Access-Token'] = 'B9-AYIxBz7V5ZuEVLtOQYgveAyF6ePxreAnJUsFDukLrOTxCdhyLQOAJd9PCpX6aQTtF_ZEU1din9ofSh_qoGy1ykg2yrlqT5Bfz81wrEy7fRJLyKEM5q_MH4rYHu5PE';
  // // 在发送请求之前做些什么
  store.commit('SET_LOADING', true);
  // 如果有token,添加到请求报文 后台会根据该报文返回status
  if (store.state.login.token) {
    config.headers.Authorization = `token ${store.state.login.token}`;
  }

  return config;

  },
  function(error) {
    // 对请求错误做些什么
    alert("网络错误,请稍后再试");

    store.commit("SET_LOADING", false);

    return Promise.reject(error);
  }
);

// 添加响应拦截器
api.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    // 加到时器主要是为了 展示Loading效果 项目中应去除
    setTimeout(() => {
      store.commit("SET_LOADING", false);
    }, 300);
    console.log("==========", response);
    let data = response.data;
    if (data && data.code === "4001") {
      if (isFromWechat()) {
        let redirect_url = data.data.redirect_url;
        window.location.href = redirect_url;
      } else {
        router.replace({
          path: "newLogin",
          query: { redirect: router.currentRoute.fullPath }
        });
      }
    }
    if (data && data.code === "4002") {
      if (isFromWechat()) {
        let redirect_url = data.data.redirect_url;
        window.location.href = redirect_url;
      } else {
        router.replace({
          path: "bindMobile",
          query: { redirect: router.currentRoute.fullPath }
        });
      }
    }
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    store.commit("SET_LOADING", false);

    if (error.response) {
      if (error.response.status == 401) {
        // 如果返回401 即没有权限，跳到登录页重新登录
        store.commit("CHANGE_TOKEN", {});

        alert("请重新登录");

        router.replace({
          path: "newLogin",
          query: { redirect: router.currentRoute.fullPath }
        });
      }
    }

    return Promise.reject(error);
  }
);
export default api;
