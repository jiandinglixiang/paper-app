<template>
  <div class="user">
    <nv-header title="个人中心" :hideBack="false"></nv-header>
    <div class="tou-xiang">
      <div>
        <p>{{info.name || '昵称'}}</p>
        <p>{{info.phone || '188********'}}</p>
        <p>余额:{{info.balance || '0充值'}}</p>
      </div>
      <img :src="info.portrait||require('../assets/toux.png')" alt="头像">
    </div>
    <p v-show="info.location" style="margin-left: 10px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis">
      收货地址:{{info.location}}</p>
    <div class="group-list">
      <div @click="goPath('/info/copyright/list')">
        <i class="fa fa-copyright  fa-5x"></i>
        <span>我发布的</span>
      </div>
      <div @click="goPath('/info/sellsy/list')">
        <i class="fa fa-sellsy  fa-5x"></i>
        <span>我卖出的</span>
      </div>
      <div @click="goPath('/info/download/list')">
        <i class="fa fa-download  fa-5x"></i>
        <span>我买到的</span>
      </div>
      <div @click="goPath('/info/bank')">
        <i class="fa fa-bank  fa-5x"></i>
        <span>充值</span>
      </div>
      <div @click="goPath('/info/amend')">
        <i class="fa fa-id-card-o  fa-5x"></i>
        <span>资料修改</span>
      </div>
    </div>
    <router-link v-if="token" to="/login" tag="div" class="login-button">
      <mt-button type="primary" size="large">登陆</mt-button>
    </router-link>
    <div v-else class="login-button">
      <mt-button type="danger" size="large" @click.native="clearToken">注销</mt-button>
    </div>
  </div>
</template>

<script>//
import { mapState } from 'vuex'
import { clearToken } from '../tool/token'

export default {
  name: 'User',
  data () {
    return {}
  },
  computed: {
    ...mapState({
      token: state => !state.user.token,
      info: state => state.user.info
    })
  },
  methods: {
    clearToken,
    goPath (path) {
      if (this.token) return
      this.$router.push(path)
    }
  }
}
</script>

<style scoped lang="scss">
  .user {
    .tou-xiang {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      margin: 10px;
      height: 100px;
      border-bottom: #999999 1px solid;

      > div {
        /*height: 100%;*/
        flex: 1 1 auto;

        > p:nth-child(1) {
          overflow: hidden;
          font-size: 2em;
          font-weight: bold;
          color: black;
        }

        > p:nth-child(2) {
          overflow: hidden;
        }
      }

      img {
        width: 80px;
        height: 80px;
      }
    }

    .group-list {
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      justify-content: flex-start;
      margin: 10px;

      > div {
        width: 33.3%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        padding: 10px;

        span {
          color: black;
          font-weight: bold;
          font-size: 1.5em;
        }
      }

      > div:active {
        background-color: rgba(153, 153, 153, 0.5);
      }
    }

    .login-button {
      margin: 20% 10px 10px 10px;
    }
  }
</style>
