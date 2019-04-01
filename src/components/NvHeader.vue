<template>
  <div class="NvHeader">
    <mt-header :fixed="fixed" :title="title">
      <mt-button @click.native="goBack" v-if="hideBack" slot="left" icon="back">返回</mt-button>
      <slot name="right"></slot>
    </mt-header>
  </div>
</template>

<script>//
import Vue from 'vue'
import { Header } from 'mint-ui'

Vue.component(Header.name, Header)
export default {
  name: 'NvHeader',
  props: {
    title: { type: String, default: '标题' },
    hideBack: { type: Boolean, default: true },
    fixed: { type: Boolean, default: false }, // 背景透明与固定NoTransparency isFixed
    to: { type: String },
    fn: { type: Function }
  },
  methods: {
    goBack () {
      if (this.fn) {
        this.fn()
      } else {
        if (this.to) {
          this.$router.replace(this.to)
        } else {
          this.$router.back()
        }
      }
    }
  }
}
</script>

<style scoped>
  .NvHeader {
    height: 40px;
    width: 100%;
  }
</style>
