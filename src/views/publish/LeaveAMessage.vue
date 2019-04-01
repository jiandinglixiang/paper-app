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
      <ul class="msg-list">
        <li v-for="(n,ins) in list" :key="ins">
          <div>
            <img :src="n.info&&n.info.portrait" alt="">
            <div>
              <p>{{n.info&&n.info.name}}</p>
              <p>{{n.time}}</p>
            </div>
          </div>
          <p>{{n.msg}}</p>
        </li>
      </ul>
      <div v-if="!list.length"
           style="padding: 30%;color: red;text-align: center;font-size: 2.5em;border-bottom: 1px solid #ddd">没有留言
      </div>
    </div>
  </div>
</template>

<script>//
import { http } from '../../tool/http'
import { Toast } from '../../tool/toast'

export default {
  name: 'LeaveAMessage',
  data () {
    return {
      msgContent: '',
      list: []
    }
  },
  methods: {
    massageSubmit () {
      if (!this.msgContent || (this.msgContent && (this.msgContent.length < 10 || this.msgContent.length > 500))) {
        Toast('宝贝描述需要(最少10字,最多500字)介绍')
        return
      }
      http.get('/addLeaveAMessage.json', {
        id: this.$route.query.id,
        msgContent: this.msgContent
      }).then(value => {
        if (value.data && value.data.length) {
          this.msgContent = ''
          this.list = value.data
        }
      })
    },
    getList () {
      http.get('/LeaveAMessage.json', {
        id: this.$route.query.id
      }).then(value => {
        if (value.data && value.data.length) {
          this.list = value.data
        }
      })
    }
  },
  created () {
    this.getList()
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
