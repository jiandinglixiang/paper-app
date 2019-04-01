<template>
  <div>
    <nv-header title="我卖出的" :fixed="true"></nv-header>
    <div v-if="list.length===0" style="text-align: center">
      <img src="../../assets/nolist.png" style="width: 50%" alt="">
      <p style="font-size: 2em;margin: 15px auto;color: black;">没有订单</p>
    </div>
    <div infinite-scroll-disabled="loading"
         infinite-scroll-distance="10"
         infinite-scroll-immediate-check="isMax"
         v-infinite-scroll="loadMore">
      <ul>
        <mine-commodity-item v-for="(n,index) in list" :info="n" :key="`${index}${n.id}`"/>
      </ul>
    </div>
  </div>
</template>

<script>//
import { http } from '../../tool/http'
import { copy } from '../../tool/util'
import MineCommodityItem from '../../components/MineCommodityItem'

export default {
  name: 'Sellsy',
  components: { MineCommodityItem },
  data () {
    return {
      list: [],
      loading: true,
      pageSize: 10,
      isMax: true // 当加载数据未撑满容器就再加载一次数据
    }
  },
  methods: {
    loadMore () {
      this.getList(parseInt(this.list.length / 10))
    },
    getList (page = 0) {
      this.loading = 'true'
      return http.get('/publish', {
        publish: '-1', // 0代表发布,1代表支付了,2代表发货了,3代表取消发布了,4代表完成,5代表纠纷由后台处理
        offset: page,
        limit: this.pageSize
      }).then(data => {
        if (data.data && data.data.length) {
          this.loading = data.data.length < this.pageSize
          this.list = (copy(this.list)).concat(data.data)
        } else {
          this.loading = true
        }
        return data
      })
    }
  },
  created () {
    this.getList(0)
  }
}
</script>

<style scoped>

</style>
