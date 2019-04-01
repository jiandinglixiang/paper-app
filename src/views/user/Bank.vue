<template>
  <div>
    <nv-header title="余额充值"></nv-header>
    <mt-cell title="当前账户余额" :value="info.balance" style="border-bottom: 1px solid #ddd"></mt-cell>
    <mt-cell title="充值金额" style="color: black;font-weight: bold;font-size: 2em"></mt-cell>
    <mt-field label="输入金额" placeholder="¥" type="number" v-model="number"
              style="border-bottom: 1px solid #ddd"></mt-field>
    <div>
      <mt-badge v-for="(n,index) in list" :key="index"
                @click.native="recharge(`${index+1}00`)"
                style="margin: 5px 5px"
                size="large"
                :type="n">
        {{`${index+1}00`}}元
      </mt-badge>
    </div>
    <div style="margin: 30% 10px">
      <mt-button type="danger" size="large" @click.native="recharge(number)">充值</mt-button>
    </div>
  </div>
</template>

<script>//
import { mapActions, mapState } from 'vuex'
import { Badge } from 'mint-ui'
import Vue from 'vue'
import { Toast } from '../../tool/toast'
import { util } from '../../tool/util'
import { http } from '../../tool/http'
import { GET_MINE_INFO } from '../../vuex/user'

Vue.component(Badge.name, Badge)
export default {
  name: 'Bank',
  data () {
    return {
      number: '',
      list: [
        'primary',
        'error',
        'success',
        'warning',
        'primary',
        'error',
        'success',
        'warning',
        'primary',
        'error',
        'success',
        'warning'
      ]
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
    recharge (number) {
      if (!number) {
        Toast('错误金额')
        return
      }
      if (!util.isNumberS(number)) {
        Toast('最多10位数,最少1位')
        return
      }
      if (!(number > 0)) {
        Toast('必须大于0')
        return
      }
      http.post('/addBalance', { balance: number }).then(value => {
        this.getInfo()
        Toast('充值成功')
      })
    }
  }
}
</script>

<style scoped>

</style>
