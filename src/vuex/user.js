import { http } from '../tool/http'

export const DEVICE_RESIZE = 'DEVICE_RESIZE'
export const TOKEN_RESIZE = 'TOKEN_RESIZE'
export const GET_MINE_INFO = 'GET_MINE_INFO'
export const SET_MINE_INFO = 'SET_MINE_INFO'

export default {
  state: {
    Device: { // 设备信息
      navInfo: { wx: false, ios: false, android: false },
      width: 100,
      height: 100
    },
    token: null,
    info: {
      id: null,
      portrait: null,
      name: null,
      phone: null,
      location: null,
      balance: 0,
      identity: null
    }
  },
  mutations: {
    [DEVICE_RESIZE] (state, params) {
      state.Device = { width: params.width, height: params.height, navInfo: params.navInfo }
    },
    [TOKEN_RESIZE] (state, token) {
      state.token = token
    },
    [SET_MINE_INFO] (state, info) {
      state.info = info
    }
  },
  actions: {
    [GET_MINE_INFO] ({ commit, state }) {
      return http.get('/info').then(value => {
        if (value.data) {
          commit(SET_MINE_INFO, {
            ...(state.info),
            ...(value.data)
          })
        }
        return value
      })
    }
  }
}
