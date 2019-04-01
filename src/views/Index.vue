<template>
  <div>
    <router-view/>
    <div class="button-nav">
      <mt-tabbar v-model="selected" :fixed="true" style="max-width: 640px">
        <mt-tab-item id="1">
          <p><i class="fa fa-home fa-2x"></i></p>
          <p>首页</p>
        </mt-tab-item>
        <mt-tab-item id="3">
          <p><i class="fa fa-mail-forward fa-2x"></i></p>
          <p>发布</p>
        </mt-tab-item>
        <mt-tab-item id="2">
          <p><i class="fa fa-user-circle fa-2x"></i></p>
          <p>我的</p>
        </mt-tab-item>
      </mt-tabbar>
    </div>
  </div>
</template>

<script>//
import { Tabbar, TabItem } from 'mint-ui'

export default {
  data () {
    let selected = '1'
    switch (this.$route.path) {
      case '/user':
        selected = '2'
        break
      case '/publish':
        selected = '3'
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
  },
  watch: {
    selected (val) {
      let path = '/'
      switch (val) {
        case '2':
          path = '/user'
          break
        case '3':
          path = '/publish'
          break
        default:
      }
      this.$router.replace({ path })
    }
  }
}
</script>

<style scoped>
  .button-nav {
    height: 50px;
    width: 100%;
  }
</style>
