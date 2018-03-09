import Util from '../../util/common'
import * as types from '../types'
import Vue from 'vue'
import {removeCookie} from '@/util/cookie.js'
import VueCookie from 'vue-cookie'

const state = {
  token: 0,
  userId: 0,
  gender: 0,
  mobile: '',
  avatarUrl: '',
  nickname: '',
  username: '',
  birthDate: '',
  bindMobile: false,
  realnameVerfiy: false,
  expiresIn: -1,
  openid: ''
}

const mutations = {
  [types.CHANGE_TOKEN](state, res) {
    /*if (!res) {
      return
    } */
    if (res) {
      Util.setLocal(res, 'TOKEN', false);
    } else {
      res = Util.getLocal('TOKEN')
    }
    state.token = res.authToken
    state.userId = res.userId
    state.bindMobile = res.bindMobile
    state.expiresIn = res.expiresIn
    state.imAgentId = res.imAgentId
    state.openid = res.openid
    state.gender = res.gender
    state.birthDate = res.birthDate
    console.log(state.birthDate)
    if (res.authToken) {
      VueCookie.set("authToken", res.authToken);
    }
  },
  [types.SET_USER_PROFILE](state, res) {
    state.avatarUrl = res.avatarUrl
    state.userId = res.userId || res.id
    state.mobile = res.mobile
    state.nickname = res.nickname
    state.username = res.username
    state.realnameVerfiy = res.realnameVerfiy
  },
  [types.USER_SIGNOUT](stats) {
    Util.removeLocal('TOKEN');
    //window.localStorage.clear();
    Object.keys(state).forEach(element => {
      Vue.delete(state, element)
    });

    // clearCookie();
    removeCookie('Authorization')
    VueCookie.delete('authToken')
    VueCookie.delete('Authorization')
    VueCookie.delete('Authorization', {domain: '.zowalk.com'})
    VueCookie.delete('Authorization', {domain: 'zowalk.com'})
    VueCookie.delete('Authorization', {domain: '.zhongmispace.com'})
    VueCookie.delete('Authorization', {domain: '.m.zhongmispace.com'})
    VueCookie.delete('Authorization', {domain: 'm.zhongmispace.com'})

  }
}


export default {
  state,
  mutations
}
