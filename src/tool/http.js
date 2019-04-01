import AxIos from 'axios'
import Toast from './toast'
import loading from './loading'
import { getToken, removeToken } from './token'

export class Http {
  constructor (url) {
    const baseURL = url || 'http://127.0.0.1/api'
    this.config = {
      baseURL: baseURL,
      timeout: 10000,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
  }

  get (path = '', params = {}) {
    loading.show()
    getToken() && (params.token = getToken())
    const request = AxIos({
      ...(this.config),
      url: path,
      method: 'get',
      params: { ...params }
    })
    return request.then(this.response.bind(this)).catch(this.error.bind(this))
  }

  post (path = '', data = {}, params = {}) {
    loading.show()
    getToken() && (data.token = getToken())
    const request = AxIos({
      ...(this.config),
      url: path,
      method: 'post',
      params: params,
      data: { ...data },
      transformRequest: [
        function (data) {
          // 对 data 进行任意转换处理
          if (Object.prototype.toString.call(data) === '[object FormData]') {
            return data
          }
          const formData = new FormData()
          for (let i in data) {
            if (data[i] !== '' || data[i] !== undefined || data[i] !== null) {
              formData.append(i, data[i])
            } else {
              console.log('post=>>', i, ':', data[i])
            }
          }
          return formData
        }]
    })
    return request.then(this.response.bind(this)).catch(this.error.bind(this))
  }

  response (response) {
    // 响应
    return new Promise((resolve, reject) => {
      if (response.data && response.data.code * 1 === 0) {
        loading.hide()
        resolve(response.data)
      } else {
        // 有错误code
        this.codeError(response.data, reject)
      }
    })
  }

  error (error) {
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      console.log(error.response.status, error.response.headers, error.response.data)
    } else {
      // 在设置引发错误的请求时发生了一些事情
      console.log('Error', error.message)
    }
    setTimeout(function () {
      loading.hide()
    }, 400)
    return Promise.reject(error)
  }

  codeError (data, reject) {
    let error = {}
    switch (data.code * 1) {
      case 911:
        error = { data: data.data, code: 911, msg: '登陆失效' }
        removeToken()
        break
      default:
        error = { data: data.data, code: -1, msg: '未知错误' }
    }
    Toast(error.msg)
    reject(JSON.stringify(error))
  }
}

export const http = new Http()// 默认http实例
export const get = http.get
export const post = http.post

export default http
