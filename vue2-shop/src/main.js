import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from '@/vuex/store.js'   //vuex
import api from '@/http/api.js'       //http请求
import {isFromWechat} from '@/util/weixin.js'
import Mint from 'mint-ui';    //移动端UI
import 'mint-ui/lib/style.css'
import {isLogin} from '@/util/auth.js'
import {checkLogin} from '@/api/'
import Vconsole from 'vconsole'
const vconsole = new Vconsole()
var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})

Vue.use(Mint);
Vue.config.productionTip = false
Vue.prototype.$api = api;
Vue.prototype.defaultImageUrl = '/static/img/defaultImage.0e509ef.jpeg';
Vue.prototype.defaultOrderImageUrl = '/static/img/小banner1.685a933.jpg';

// // 用钩子函数beforeEach()对路由进行判断
// let ua = window.navigator.userAgent.toLowerCase()
// if(ua.match(/MicroMessenger/i) == 'micromessenger'){
//   // 跳转到微信授权页面
//   window.location.href = this.webUrl + '/Wap/User/getOpenid'
// }

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 需要权限,进一步进行判断
    if (isLogin()) {  // 通过vuex state获取当前的token是否存在
      next();
    }
    else {    //如果没有权限,重定向到登录页,进行登录
      if (isFromWechat()) {

        console.log( '登陆前的token判断---------'+ store.state.login.token,to,from)
        checkLogin().then(res => {
          if(res.data.code==='2000'){
            next();
          }
          console.log('checkLogin=========', res.data.code)
        })
      } else {
        next({
        //path: '/login',
          path: '/newLogin',
          // query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }
    }
  }
  else { //不需要权限 直接跳转
    next();
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
