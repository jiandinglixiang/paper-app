<template>
  <div>
    <nv-header title="资料修改"></nv-header>
    <mt-cell title="头像">
      <input
        @change="imgSubmit"
        ref="input"
        class="mint-field-core"
        type="file"
        accept="image/*">
      <img v-if="info.portrait" :src="info.portrait" height="45px" width="45px"/>
    </mt-cell>
    <mt-field type="text" label="昵称" :placeholder="info.name ? info.name:'请输入昵称'"
              v-model="modifiedAmend.name"></mt-field>
    <mt-field type="number" label="身份证号码" :placeholder="info.identity ? info.identity:'身份证号码'"
              v-model="modifiedAmend.identity"></mt-field>
    <mt-field type="textarea" rows="4" label="收货地址" :placeholder="info.location ? info.location:'请输入收货地址'"
              v-model="modifiedAmend.location"></mt-field>
    <mt-field type="password" label="密码" placeholder="不修改则不填" v-model="modifiedAmend.password"></mt-field>
    <mt-field v-if="modifiedAmend.password" type="password" label="密码" placeholder="再次输入密码"
              v-model="modifiedAmend.password2"></mt-field>
    <div class="Amend-button">
      <p style="color: red">注:不填则不修改</p>
      <mt-button type="danger" @click.native="submit()" size="large">修改提交</mt-button>
    </div>
  </div>
</template>

<script>//
import { mapActions, mapState } from 'vuex'
import { util } from '../../tool/util'
import { Toast } from '../../tool/toast'
import { http } from '../../tool/http'
import { GET_MINE_INFO } from '../../vuex/user'
import md5 from 'js-md5'

export default {
  name: 'Amend',
  data () {
    return {
      modifiedAmend: {
        password: '',
        password2: '',
        portrait: '', // 头像
        name: '', // 名称
        location: '', // 地址
        identity: '' // 身份证号码
      }
    }
  },
  computed: {
    ...mapState({
      info: state => state.user.info
    })
  },
  methods: {
    ...mapActions({
      getInfo: GET_MINE_INFO
    }),
    imgSubmit (event) {
      console.log(event)
      if (!event.target.files[0]) {
        return
      }
      http.post('/pushFile', {
        file: event.target.files[0]
      }).then(value => {
        if (value.data && value.data[0]) {
          return this.submit(value.data[0])
        }
        Toast('头像上传错误')
        return null
      })
    },
    verify (files) {
      const data = {}
      if (files) {
        data.portrait = files
      }
      if (this.modifiedAmend.name) {
        if (!util.isName(this.modifiedAmend.name)) {
          Toast('昵称输入错误')
          return
        }
        if (this.modifiedAmend.name === this.info.name) {
          Toast('昵称与当前一样')
          return
        }
        data.name = this.modifiedAmend.name
      }
      if (this.modifiedAmend.identity) {
        if (!util.identityValid(this.modifiedAmend.identity)) {
          Toast('身份证输入错误')
          return
        }
        if (this.modifiedAmend.identity === this.info.identity) {
          Toast('身份证与当前一样')
          return
        }
        data.identity = md5(this.modifiedAmend.identity)
      }
      if (this.modifiedAmend.location) {
        if (!util.isName(this.modifiedAmend.location)) {
          Toast('地址不能有特殊字符')
          return
        }
        if (this.modifiedAmend.location === this.info.location) {
          Toast('地址与当前一样')
          return
        }
        data.location = this.modifiedAmend.location
      }
      if (this.modifiedAmend.password) {
        if (!util.passwordValid(this.modifiedAmend.password)) {
          Toast('密码输入错误')
          return
        }
        if (!util.passwordValid(this.modifiedAmend.password2)) {
          Toast('再次输入密码错误')
          return
        }
        if (this.modifiedAmend.password2 !== this.modifiedAmend.password) {
          Toast('两次密码输入不一致')
          return
        }
        data.password = md5(this.modifiedAmend.password)
      }
      return data
    },
    submit (files) {
      const data = this.verify(files)
      if (!data) return
      const key = Object.keys(data)
      if (!key.length) {
        Toast('没有修改内容')
        return
      }
      http.post('/modifiedAmend', data).then(value => {
        this.$refs.input.value = ''
        this.modifiedAmend = {
          password: '',
          password2: '',
          portrait: '', // 头像
          name: '', // 名称
          location: '', // 地址
          identity: '' // 身份证号码
        }
        this.getInfo()
        Toast('修改成功')
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .Amend-button {
    margin: 10% 10px;
  }
</style>
