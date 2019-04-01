<template>
  <div>
    <nv-header title="发布商品" :hide-back="false"></nv-header>
    <div style="border-bottom: 1px solid #ddd">
      <mt-cell title="添加照片"
               v-for="(n,index) in imgList"
               :key="index"
      >
        <input
          ref="inputs"
          @change="fileChange($event,index)"
          class="mint-field-core"
          type="file"
          accept="image/*">
        <img v-show="n.src" :src="n.src" height="50px" width="50px"/>
      </mt-cell>
    </div>
    <div style="border-bottom: 1px solid #ddd">
      <mt-field type="text"
                placeholder="宝贝标题 品牌型号必不可少"
                v-model="title"></mt-field>
    </div>
    <div style="border-bottom: 1px solid #ddd">
      <mt-field type="textarea"
                rows="10"
                :placeholder="`在这里详细描述一下宝贝
转手原因,入手渠道,规格尺寸,新旧程度和使用感受吧`"
                v-model="detailsContent"></mt-field>
    </div>
    <div style="margin: 10px">
      <mt-switch v-model="brandNew">全新宝贝</mt-switch>
    </div>
    <mt-field label="输入金额" placeholder="¥" type="number" v-model="money"
              style="border-bottom: 1px solid #ddd"></mt-field>
    <div style="margin: 10% 10px">
      <mt-button type="danger" size="large" @click.native="publishSumbit">发布宝贝</mt-button>
    </div>
  </div>
</template>

<script>//
import { copy, util } from '../../tool/util'
import { MessageBox, Switch } from 'mint-ui'
import Vue from 'vue'
import { Toast } from '../../tool/toast'
import { http } from '../../tool/http'

Vue.component(Switch.name, Switch)
export default {
  name: 'Publish',
  data () {
    return {
      imgList: [
        { file: null, src: '' }
      ],
      title: '',
      detailsContent: '',
      brandNew: false,
      money: ''
    }
  },
  methods: {
    fileChange (event, index) {
      if (!event.target.files[0]) return
      const createObjectURL = window.URL.createObjectURL || window.webkitURL.createObjectURL
      const list = copy(this.imgList)
      list[index] = {
        file: event.target.files[0],
        src: createObjectURL(event.target.files[0])
      }
      list.push({ file: null, src: '' })
      this.imgList = list
    },
    publishSumbit () {
      const fileS = {}
      if (this.imgList.length > 1) {
        for (let i = 0; i < this.imgList.length; i++) {
          this.imgList[i] && this.imgList[i].file && (fileS[`file${i}`] = this.imgList[i].file)
        }
        if (!Object.keys(fileS).length) {
          Toast('照片错误,刷新后上传')
          return
        }
      } else {
        Toast('发布宝贝需要照片')
        return
      }
      if (!this.title || (this.title && (this.title.length < 6 || this.title.length > 32))) {
        Toast('宝贝标题需要响亮,最少6个字,最长32个字')
        return
      }
      if (!this.detailsContent || (this.detailsContent && (this.detailsContent.length < 20 || this.detailsContent.length > 500))) {
        Toast('宝贝描述需要(最少20字,最多500字)介绍')
        return
      }
      if (!this.money) {
        Toast('错误金额')
        return
      }
      if (!util.isNumberS(this.money)) {
        Toast('最多10位数,最少1位')
        return
      }
      if (!(this.money > 0)) {
        Toast('必须大于0')
        return
      }
      MessageBox.confirm(`确定以${this.money}元,发布宝贝<<${this.title}>>`, '').then(action => {
        http.post('/pushFile', {
          ...fileS
        }).then(value => {
          if (value.data && value.data.length) {
            return http.post('/publishItem', {
              imgList: value.data.join(','),
              title: this.title,
              content: this.detailsContent,
              brandNew: this.brandNew ? 1 : 0,
              price: this.money
            })
          }
          Toast('头像上传失败')
          return null
        }).then(value => {
          if (!value) return
          Toast('发布成功')
          for (let i in this.$refs.inputs) {
            this.$refs.inputs[i] && this.$refs.inputs[i].files[0] && (this.$refs.inputs[i].value = '')
          }
          this.imgList = [
            { file: null, src: '' }
          ]
          this.title = ''
          this.detailsContent = ''
          this.brandNew = false
          this.money = ''
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
