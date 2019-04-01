<template>
  <div infinite-scroll-disabled="loading"
       infinite-scroll-distance="10"
       infinite-scroll-immediate-check="isMax"
       v-infinite-scroll="loadMore">
    <nv-header title="搜索结果"></nv-header>
    <ul>
      <commodity-item v-for="(n,index) in list" :info="n" :key="`${index}${n.id}`"/>
    </ul>
  </div>
</template>

<script>//
import CommodityItem from '../../components/CommodityItem'
import { http } from '../../tool/http'
import { copy } from '../../tool/util'

export default {
  name: 'Search',
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
      this.getList(parseInt(this.list.length / 10 + 1))
    },
    getList (page = 1) {
      this.loading = 'true'
      return http.get('/search.json', {
        search: this.$route.query.search,
        startPage: page,
        pageSize: this.pageSize
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
  },
  components: { CommodityItem }
}
</script>

<style scoped>

</style>
