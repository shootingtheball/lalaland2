export function isFromWechat() {
  let ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    // 跳转到微信授权页面
    return true
  }
  return false
}
