<template>
  <div class="LeaveAMessage">
    <nv-header title="商品留言" :fixed="true"></nv-header>
    <mt-field v-if="1"
              class="textarea-msg"
              label="留言版"
              placeholder="输入留言提交"
              type="textarea"
              rows="4"
              v-model="msgContent"
    />
    <div>
      <div class="msg-Submit">
        <mt-button type="danger" @click.native="massageSubmit" size="large">留言提交</mt-button>
      </div>
      <div infinite-scroll-disabled="loading"
           infinite-scroll-distance="10"
           infinite-scroll-immediate-check="isMax"
           v-infinite-scroll="loadMore">
        <ul class="msg-list">
          <li :key="ins" v-for="(n,ins) in list">
            <div>
              <img :src="n.portrait" alt="">
              <div>
                <p>{{n.name}}</p>
                <p>{{n.time}}</p>
              </div>
            </div>
            <p>{{n.msg}}</p>
          </li>
        </ul>
      </div>
      <div v-if="!list.length"
           style="padding: 30%;color: red;text-align: center;font-size: 2.5em;border-bottom: 1px solid #ddd">没有留言
      </div>
    </div>
  </div>
</template>

<script>//
import { http } from '../../tool/http'
import { Toast } from '../../tool/toast'
import { copy } from '../../tool/util'

export default {
  name: 'LeaveAMessage',
  data () {
    return {
      original: [],
      msgContent: '',
      list: [],
      loading: true,
      pageSize: 10,
      isMax: true // 当加载数据未撑满容器就再加载一次数据
    }
  },
  methods: {
    massageSubmit () {
      if (!this.msgContent || (this.msgContent && (this.msgContent.length < 10 || this.msgContent.length > 500))) {
        Toast('宝贝描述需要(最少10字,最多500字)介绍')
        return
      }
      http.post('/addMassage', {
        id: this.$route.query.id,
        msg: this.msgContent
      }).then(value => {
        if (value.data) {
          this.msgContent = ''
          this.getList(parseInt(this.original.length / 10), true)
        }
      })
    },
    loadMore () {
      this.getList(parseInt(this.original.length / 10))
    },
    getList (page = 0, neS) {
      return http.get('/getMassageList', {
        id: this.$route.query.id,
        offset: page,
        limit: this.pageSize
      }).then(data => {
        if (data.data && data.data.length) {
          let list = []
          data.data.forEach(value => {
            value.list.forEach(value2 => {
              value2.name = value.name
              value2.portrait = value.portrait
              const date = new Date(value2.time * 1000)
              value2.time = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日  ${date.getHours()}时${date.getMinutes()}分`
              list.push({ ...value2 })
            })
          })
          this.loading = list.length < this.pageSize
          list = neS ? list : (copy(this.list)).concat(list)
          list.sort((l, r) => l.time > r.time)
          this.list = list
          this.original = neS ? data.data : (copy(this.original)).concat(data.data)
        } else {
          this.loading = true
        }
        return data
      })
    }
  },
  created () {
    let time = 0
    this.getList(0).then(() => {
      time = setInterval(() => {
        if (this.$route.path === '/publish/leaveAMessage') {
          this.getList(parseInt(this.original.length / 10), true)
        } else {
          clearInterval(time)
        }
      }, 10000)
    }).catch(() => {
      clearInterval(time)
    })
  }
}
</script>

<style scoped lang="scss">
  .LeaveAMessage {
    .msg-list {
      margin: 10px;

      li {
        > div {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          height: 2.5em;

          img {
            height: 100%;
            margin-right: 10px;
          }

          > div {
            height: 100%;

            p {
              font-size: 1em;
            }
          }
        }

        > p {
          margin-bottom: 20px;
          font-size: 1.2em;
          color: black;
          border-bottom: 1px solid #ddd;
        }
      }
    }

    .textarea-msg {
      border-bottom: 1px solid #ddd;
    }

    .msg-Submit {
      margin: 5% 10px;
    }
  }
</style>
