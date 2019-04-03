<template>
  <div>
    <router-view/>
    <div class="button-nav">
      <mt-tabbar v-model="selected" :fixed="true" style="max-width: 640px">
        <mt-tab-item id="app1">
          <div @click="$router.replace('/')" style="display: block;height: 100%;width: 100%;overflow: hidden">
            <p><i class="fa fa-home fa-2x"></i></p>
            <p>首页</p></div>
        </mt-tab-item>
        <mt-tab-item id="app3">
          <div @click="$router.replace('/publish')" style="display: block;height: 100%;width: 100%;overflow: hidden">
            <p><i class="fa fa-mail-forward fa-2x"></i></p>
            <p>发布</p></div>
        </mt-tab-item>
        <mt-tab-item id="app2">
          <div @click="$router.replace('/user')" style="display: block;height: 100%;width: 100%;overflow: hidden">
            <p><i class="fa fa-user-circle fa-2x"></i></p>
            <p>我的</p></div>
        </mt-tab-item>
      </mt-tabbar>
    </div>
  </div>
</template>

<script>//
import { Tabbar, TabItem } from 'mint-ui'

export default {
  data () {
    let selected = 'app1'
    switch (this.$route.path) {
      case '/user':
        selected = 'app2'
        break
      case '/publish':
        selected = 'app3'
        break
      default:
    }
    return {
      selected
    }
  },
  name: 'Index',
  components: {
    [Tabbar.name]: Tabbar,
    [TabItem.name]: TabItem
  }
}
</script>

<style scoped>
  .button-nav {
    height: 50px;
    width: 100%;
  }
</style>
