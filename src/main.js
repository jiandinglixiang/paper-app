import Vue from 'vue'
import App from './App.vue'
import '@babel/polyfill'
// import '../static/js/doc_C.js' // 函数参数类型验证插件
import router from './router'
import store from './vuex'
import './assets/init.scss'
import device from './tool/device.js'
import { http } from './tool/http'

Vue.config.productionTip = false

device(store)
window.$store = store
window.$http = http
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
