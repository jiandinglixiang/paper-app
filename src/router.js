import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/Home.vue'
import Index from './views/Index.vue'
import store from './vuex'
import { getToken } from './tool/token'

Vue.use(Router)
export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      component: Index,
      children: [
        {
          path: '/',
          meta: { getInfo: true },
          component: Home
        },
        {
          path: 'publish',
          meta: { getInfo: true }, // 没有的话就获取
          component: () => import(/* webpackChunkName: "Publish" */ './views/publish/Publish.vue')
        },
        {
          path: 'user',
          meta: { newest: true }, // 每次都获取最新
          component: () => import(/* webpackChunkName: "User" */ './views/User.vue')
        }
      ]
    },
    {
      path: '/search', // 搜索列表
      component: () => import(/* webpackChunkName: "Search" */ './views/home/Search.vue')
    },
    {
      path: '/commodity/details', // 商品详情
      component: () => import(/* webpackChunkName: "commodityDetails" */ './views/home/CommodityDetails.vue')
    },
    {
      path: '/info/copyright/list', // 我发布的
      component: () => import(/* webpackChunkName: "Copyright" */ './views/user/Copyright.vue')
    },
    {
      path: '/info/sellsy/list', // 我卖出的
      component: () => import(/* webpackChunkName: "Sellsy" */ './views/user/Sellsy.vue')
    },
    {
      path: '/info/download/list', // 我买到的
      component: () => import(/* webpackChunkName: "Download" */ './views/user/Download.vue')
    },
    {
      path: '/info/amend', // 资料修改
      meta: { getInfo: true },
      component: () => import(/* webpackChunkName: "Amend" */ './views/user/Amend.vue')
    },
    {
      path: '/info/bank', // 充值
      meta: { getInfo: true },
      component: () => import(/* webpackChunkName: "Bank" */ './views/user/Bank.vue')
    },
    {
      path: '/publish/leaveAMessage', // 留言详情
      meta: { getInfo: true },
      component: () => import(/* webpackChunkName: "Bank" */ './views/publish/LeaveAMessage.vue')
    },
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "Login" */ './views/user/Login.vue')
    }
  ]
})

export default router

router.beforeEach((to, from, next) => {
  // `to` 和 `from` 都是路由对象
  console.log(to)
  if (to.meta.getInfo && !store.state.user.info.phone) {
    // 如果没有就需要
    getToken() && store.dispatch('GET_MINE_INFO')
    next()
  } else if (to.meta.newest) {
    // 每次进入都获取最新
    getToken() && store.dispatch('GET_MINE_INFO')
    next()
  } else {
    next()
  }
})
