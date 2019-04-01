<template>
  <div :style="device" id="app">
    <router-view></router-view>
  </div>
</template>
<script>//
import Vue from 'vue'
import { mapState } from 'vuex'
import { Button, Cell, Field, InfiniteScroll } from 'mint-ui'
import NvHeader from './components/NvHeader'

Vue.component(Field.name, Field)
Vue.use(InfiniteScroll)
Vue.component(Cell.name, Cell)
Vue.component(Button.name, Button)
Vue.component(NvHeader.name, NvHeader)
export default {
  name: 'App',
  data () {
    return {}
  },
  computed: {
    ...mapState({
      device: state => `height: 100%;width:${state.user.Device.width}px;min-height:${state.user.Device.height}px;`
    })
  }
}
</script>
