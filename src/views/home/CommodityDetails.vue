<template>
  <div class="Commodity-Details">
    <nv-header title="商品详情" :fixed="true"></nv-header>
    <div class="info-data">
      <img :src="details.info.portrait" alt="">
      <div>
        <p>发布者:</p>
        <p>{{details.info.name}}</p>
      </div>
    </div>
    <p class="details-money">¥{{details.price}}元 <span style="font-size: 0.8em">包邮</span></p>
    <p class="details-Content"><span>{{details.brandNew>0? '全新':'非全新'}}</span>
      {{details.content}}
    </p>
    <ul class="img-List">
      <li v-for="(n,index) in details.imgList" :key="index">
        <img :src="n" alt="">
      </li>
    </ul>
    <div v-if="isMeOrder">
      <div style="text-align: center;padding: 10%;color: black;font-size: 1.5em;" v-if="details.status*1===3">宝贝已下架
      </div>
      <template v-else-if="isMeOrder&&details.status>0">
        <div class="odd-info" v-if="logisticsTxt">
          <mt-cell title="物流信息"></mt-cell>
          <mt-field :disabled="!(addTxt&&isMeOrder===1)"
                    :placeholder="details.logistics.odd ? details.logistics.odd:`等待发货...`"
                    label="快递单号:"
                    type="text"
                    v-model="logistics.odd"></mt-field>
          <mt-field :disabled="!(addTxt&&isMeOrder===1)"
                    :placeholder="details.logistics.oddName ? details.logistics.oddName:'如:顺丰'"
                    label="快递名称:"
                    type="text"
                    v-model="logistics.oddName"></mt-field>
          <div style="margin: 10px">
            <mt-button @click.native="openExpressage" size="large" type="primary"
                       v-if="isMeOrder===1&&addTxt">{{details.logistics.odd? '修改物流':`物流发货`}}
            </mt-button>
            <mt-button @click.native="confirmExpressage" size="large" type="primary"
                       v-else-if="details.status*1===2&&isMeOrder===2">确认收货
            </mt-button>
          </div>
        </div>
        <mt-cell :value="details.logistics.location" title="寄送地址:"></mt-cell>
        <div class="info-data">
        <img :src="details.logistics.portrait" alt="">
        <div>
          <p>购买者: <span>{{details.logistics.name}}</span></p>
          <p>{{details.logistics.phone}}</p>
        </div>
      </div>
      </template>
    </div>
    <router-link :to="{path:'/publish/leaveAMessage',query:{id:details.id}}" class="leaveA-message">
      查看留言内容
    </router-link>
    <div>
      <mt-button v-if="details.status*1===0&&isMeOrder===1"
                 type="danger"
                 size="large"
                 @click.native="delTreasure">下架宝贝
      </mt-button>
      <mt-button v-else-if="details.status*1===0&&!isMeOrder"
                 type="danger"
                 size="large"
                 @click.native="purchase">购买宝贝
      </mt-button>
    </div>
  </div>
</template>

<script>//
import { http } from '../../tool/http'
import { Toast } from '../../tool/toast'
import { mapState } from 'vuex'

export default {
  name: 'CommodityDetails',
  data () {
    return {
      details: {
        id: null,
        imgList: null,
        content: null,
        title: null,
        price: null,
        LookNumber: null,
        status: null, // 0代表发布,1代表支付了,2代表发货了,3代表取消发布了,4代表完成,5代表纠纷由后台处理
        brandNew: null, // 全新
        info: {
          id: null,
          portrait: null,
          name: null
        },
        logistics: {
          id: null,
          odd: '',
          oddName: '',
          name: null,
          phone: null,
          location: null,
          portrait: null
        }
      },
      logistics: {
        odd: '',
        oddName: ''
      }
    }
  },
  computed: {
    ...mapState({
      token: state => !state.user.token,
      info: state => state.user.info
    }),
    isMeOrder () {
      if (this.token || !this.info.id) {
        return 0 // 未登录
      }
      if (this.details.info && this.info.id === this.details.info.id) {
        return 1 // 发布者
      }
      if (this.details.logistics && this.info.id === this.details.logistics.id) {
        return 2 // 购买者
      }
      return false
    },
    addTxt () {
      // 可以修改物流
      return this.details.status * 1 === 1 || this.details.status * 1 === 2
    },
    logisticsTxt () {
      // 0代表发布,1代表支付了,2代表发货了,3代表取消发布了,4代表完成,5代表纠纷由后台处理
      if (this.isMeOrder === 1 && this.details.status > 0) {
        return true
      }
      if (this.isMeOrder === 2 && (this.details.status * 1 === 2 || this.details.status * 1 === 4 || this.details.status * 1 === 5)) {
        return true
      }
      return false
    }
  },
  methods: {
    purchase () {
      if (!this.info.id || this.token) {
        Toast('请登陆再购买')
        return
      }
      console.log(this.details.price > this.info.balance, this.details.price, this.info.balance)
      if (this.details.price * 1 > this.info.balance) {
        Toast('余额不足')
        return
      }
      if (!this.info.location) {
        Toast('需要收货地址请添加')
        this.$router.push('/info/amend')
        return
      }
      http.post('/purchase', {
        id: this.$route.query.id
      }).then(value => {
        this.getDetails()
      })
    },
    delTreasure () {
      // 下架商品
      return http.post('/delTreasure', {
        id: this.$route.query.id
      }).then(value => {
        this.getDetails()
      })
    },
    openExpressage () {
      // 修改物流发货
      if (!this.logistics.odd || !this.logistics.oddName) {
        Toast('地址输入错误')
        return
      }
      http.post('/amendExpressage', {
        id: this.$route.query.id,
        odd: this.logistics.odd,
        oddName: this.logistics.oddName
      }).then(value => {
        this.getDetails()
        this.logistics = {
          odd: '',
          oddName: ''
        }
      })
    },
    confirmExpressage () {
      // 确认收货
      http.post('/confirmExpressage', {
        id: this.$route.query.id
      }).then(value => {
        this.getDetails()
      })
    },
    getDetails () {
      http.get('/CommodityDetails', {
        id: this.$route.query.id
      }).then(value => {
        if (value.data) {
          this.details = value.data
        }
      })
    }
  },
  created () {
    this.getDetails()
  }
}
</script>

<style scoped lang="scss">
  .Commodity-Details {
    .location {
      color: black;
      text-indent: 10px;

      span {
        font-weight: bold;
      }
    }

    .info-data {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      height: 50px;
      margin: 3% 10px;

      img {
        height: 100%;
        margin-right: 10px;
      }

      > div {
        height: 100%;

        p:nth-child(1) {
          font-weight: bold;
          font-size: 1.2em;

          span {
            color: black;
          }
        }

        p:nth-child(2) {
          color: black;
          font-weight: bold;
          font-size: 1.2em;
        }
      }
    }

    .img-List {
      img {
        padding: 0 10px;
        width: 100%;
      }
    }

    .details-money {
      color: red;
      margin: 0 10px;
      font-size: 2.5em;
      border-bottom: 1px solid #ddd;
      border-top: 1px solid #ddd;
      margin-bottom: 10px;
    }

    .details-Content {
      font-size: 1.3em;
      margin: 0 10px;
      color: black;

      span {
        display: inline-block;
        background-color: red;
        color: white;
        border-radius: 10px;
      }
    }

    .leaveA-message {
      display: block;
      padding: 10%;
      text-align: center;
      font-size: 2em;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      margin: 10px 0;
      color: darkorange;
    }
  }
</style>
