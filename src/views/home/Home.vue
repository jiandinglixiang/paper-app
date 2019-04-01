<template>
  <div class="home">
    <div class="home-search">
      <div>
        <i class="fa fa-search fa-2x"></i>
        <input type="search"
               v-model="searchValue"
               placeholder="搜索商品名称"
               class="mint-searchbar-core"
               @search="searchSubmit"
        >
        <span @click="searchSubmit">搜索</span>
      </div>
    </div>
    <mt-swipe :auto="4000" style="height: 200px">
      <mt-swipe-item v-for="(n,i) in swipeList" :key="i">
        <router-link :to="{path:'/commodity/details',query:{id:n.id}}">
          <img class="swipe-img" :src="n.img">
        </router-link>
      </mt-swipe-item>
    </mt-swipe>
    <div infinite-scroll-disabled="loading"
         infinite-scroll-distance="10"
         infinite-scroll-immediate-check="isMax"
         v-infinite-scroll="loadMore">
      <ul class="commodity-List">
        <commodity-item v-for="(n,index) in list" :info="n" :key="`${index}${n.id}`"/>
      </ul>
    </div>
  </div>
</template>

<script>// @ is an alias to /src
import Vue from 'vue'
import { Swipe, SwipeItem } from 'mint-ui'
import { http } from '../../tool/http'
import { copy } from '../../tool/util'
import CommodityItem from '../../components/CommodityItem'
import { Toast } from '../../tool/toast'

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
export default {
  name: 'home',
  components: { CommodityItem },
  data () {
    return {
      searchValue: '',
      swipeList: [],
      list: [],
      loading: true,
      pageSize: 10,
      isMax: true // 当加载数据未撑满容器就再加载一次数据
    }
  },
  methods: {
    getSwipeList () {
      return http.get('/swipeList').then(value => {
        if (value.data && value.data.length) {
          this.swipeList = value.data
        }
        return value
      })
    },
    loadMore () {
      this.getList(parseInt(this.list.length / 10))
    },
    getList (page = 0) {
      this.loading = 'true'
      return http.get('/commodityList', {
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
    },
    searchSubmit () {
      if (/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(this.searchValue)) {
        this.$router.push({ path: '/search', query: { search: this.searchValue } })
      } else {
        Toast('不能有特殊字符')
      }
      console.log(this.searchValue)
    }
  },
  created () {
    this.getSwipeList().then(value => {
      this.getList(0)
    })
  }
}
</script>
<style scoped lang="scss">
  .home {
    .home-search {
      height: 40px;
      font-size: 1.2em;
      padding: 5px 10px;
      border-bottom: 1px solid #ddd;

      > div {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        height: 100%;

        i {
          margin: 10px;
        }

        input {
          flex: 1 1 auto;
          height: 80%;
        }

        span {
          margin: 10px;
          font-size: 1.5em;
        }
      }
    }

    .swipe-img {
      width: 100%;
      height: 100%;
    }

    .commodity-List {

    }
  }
</style>
