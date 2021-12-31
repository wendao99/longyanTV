import Cookies from 'js-cookie'
import store from '@/store'

// 账号登录
export function isAccountLoggedIn() {
  return (Cookies.get('MUSIC_U') !== undefined && store.state.data.loginMode === 'account')
}

export function setCookies(string) {
  const cookies = string.split(';;');
  cookies.map(cookie => {
    document.cookie = cookie;
  });
}
