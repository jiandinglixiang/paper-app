<template>
  <div class="login">
    <nv-header :fn="back" :title="isRegister ? '注册':'登陆'"/>
    <div class="log-img">
      <i class="fa fa-ravelry fa-5x"></i>
    </div>
    <div class="from-list">
      <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
      <mt-field v-show="isRegister" label="身份证号码" placeholder="身份证号码" type="number" v-model="identity"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      <mt-field v-show="isRegister" label="密码" placeholder="再次输入密码" type="password" v-model="password2"></mt-field>
      <div class="buttonList">
        <mt-button type="danger" @click.native="register">注册</mt-button>
        <mt-button v-show="!isRegister" @click.native="login" type="primary">登陆</mt-button>
      </div>
    </div>
  </div>
</template>

<script>//
import { Field } from 'mint-ui'
import { http } from '../../tool/http'
import { util } from '../../tool/util'
import { Toast } from '../../tool/toast'
import { setToken } from '../../tool/token'

export default {
  name: 'Login',
  data () {
    return {
      identity: '',
      phone: '',
      password: '',
      password2: '',
      isRegister: false
    }
  },
  methods: {
    verify () {
      if (!util.isMobile(this.phone)) {
        Toast('手机输入错误')
        return true
      }
      if (!util.passwordValid(this.password)) {
        Toast('密码输入错误')
        return true
      }
      return false
    },
    register () {
      if (!this.isRegister) {
        this.isRegister = true
        return
      }
      if (this.verify()) return
      if (!util.identityValid(this.identity)) {
        Toast('身份证号码错误')
        return
      }
      if (!util.passwordValid(this.password2)) {
        Toast('再次输入密码错误')
        return
      }
      if (this.password2 !== this.password) {
        Toast('两次密码输入不一致')
        return
      }
      import('js-md5').then(md5 => {
        http.post('/register', {
          phone: this.phone,
          password: md5.default(this.password2),
          identity: this.identity
        }).then(value => {
          if (value && value.data && value.data.token) {
            setToken(value.data.token)
            this.$router.replace('/user')
          }
        })
      })
    },
    back () {
      if (this.isRegister) {
        this.isRegister = false
      } else {
        this.$router.back()
      }
    },
    login () {
      if (this.verify()) return
      import('js-md5').then(md5 => {
        http.post('/login', {
          phone: this.phone,
          password: md5.default(this.password)
        }).then(value => {
          if (value && value.data && value.data.token) {
            console.log(setToken(value.data.token))
            this.$router.replace('/user')
          }
        })
      })
    }
  },
  components: {
    [Field.name]: Field
  }
}
</script>

<style scoped lang="scss">
  .login {
    overflow: hidden;
    display: block;
    width: 100%;

    .log-img {
      text-align: center;
      margin: 25px 0;
      color: red;
    }

    .from-list {
      margin: 10px;
      overflow: hidden;

      .buttonList {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-around;
        margin-top: 25px;

        > button {
          flex: 1 1 40%;
        }
      }
    }
  }
</style>
