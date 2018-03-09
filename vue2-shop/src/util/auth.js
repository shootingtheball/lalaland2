import VueCookie from 'vue-cookie';
import store from '@/vuex/store.js'   //vuex
import Util from '../util/common'

export function isLogin() {
  if (store.state.login.token) {
    return true;
  } else if (Util.getLocal('TOKEN')) {
    //TODO fixed bug
    let tokenObj = Util.getLocal('TOKEN');
    if (!tokenObj.token) {
      return true
    } else {
      return false
    }
  }
  let Authorization = VueCookie.get('Authorization');
  console.log('Authorization===========',Authorization)
  return Authorization != null && Authorization.length > 0
}
