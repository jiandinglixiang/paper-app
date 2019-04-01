import { TOKEN_RESIZE } from '../vuex/user'
import store from '../vuex'
import router from '../router'

let to = null

export function getToken () {
  if (to) {
    return to
  }
  const token = localStorage.getItem('Token')
  token && store.commit(TOKEN_RESIZE, token)
  return token
}

export function setToken (token) {
  if (/^(?=.*\d)[a-zA-Z\d]{32,32}$/.test(token)) {
    to = token
    store.commit(TOKEN_RESIZE, token)
    localStorage.setItem('Token', token)
    return getToken()
  }
  return new Error('错误token')
}

export function clearToken () {
  localStorage.removeItem('Token')
  location.reload()
}

export function removeToken () {
  localStorage.removeItem('Token')
  store.commit(TOKEN_RESIZE, null)
  router.push('/login')
}
