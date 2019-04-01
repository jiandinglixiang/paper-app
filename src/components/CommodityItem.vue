<template>
  <router-link :to="{path:'/commodity/details',query:{id:info.id}}" tag="li" class="commodity-item">
    <img :src="info.img" alt="">
    <div>
      <p>{{info.title}}</p>
      <p>{{info.content}}</p>
      <p>¥{{info.price}}</p>
      <div>
        <div>
          <p>{{info.info&&info.info.name}}</p>
          <p>{{info.LookNumber}}人看过</p>
        </div>
        <img :src="info.info&&info.info.portrait" alt="">
      </div>
    </div>
  </router-link>
</template>

<script>//
export default {
  name: 'CommodityItem',
  props: {
    info: {
      type: Object
    }
  }
}
</script>
<style scoped lang="scss">
  .commodity-item {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-top: 10px;
    height: 150px;
    overflow: hidden;

    > img {
      padding: 0 10px;
      height: 150px;
      width: 170px;
      min-width: 170px;
    }

    > div {
      flex: 1 1 auto;
      height: 100%;

      > p:nth-child(1) {
        font-size: 2em;
        color: black;
        height: 20%;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      > p:nth-child(2) {
        color: black;
        height: 30%;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      > p:nth-child(3) {
        font-size: 2em;
        height: 20%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: red;
      }

      > div {
        height: 30%;
        overflow: hidden;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;

        img {
          height: 100%;
          margin-right: 10px;
        }
      }
    }
  }
</style>
