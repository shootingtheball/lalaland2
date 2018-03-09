import request from '@/http/api.js'
import Qs from 'qs'

export function fetchList(query) {
  return request({
    url: '/partner/home',
    method: 'get',
    params: query
  })
}
export function fetchInviteShare(query) {
  return request({
    url: '/qrcode/partner/invite_with_share',
    method: 'get',
    params: query
  })
}

export function loginPassword(params) {
  return request({
    url: '/user/login',
    method: 'post',
    data: Qs.stringify(params)
  })
}

export function getWeixinConfig(params) {
  return request({
    url: '/wechat/js_sdk/get_config',
    method: 'get',
    params
  })
}
export function checkLogin(params) {
  return request({
    url: '/wechat/check_login',
    method: 'get',
    params
  })
}
export function getUserProfile(params) {
  return request({
    url: '/mine/user/profile/get',
    method: 'get',
    params
  })
}

export function logOut() {
  return request({
    url: '/user/logout',
    method :"post"
  })
}



