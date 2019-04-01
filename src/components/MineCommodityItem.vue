<template>
  <router-link :to="{path:'/commodity/details',query:{id:info.id}}" class="Mine-Commodity-Item">
    <img :src="info.img" alt="">
    <div>
      <p>{{info.title}}</p>
      <p>{{info.content}}</p>
      <p>¥{{info.price}}</p>
    </div>
  </router-link>
</template>

<script>//
export default {
  name: 'MineCommodityItem',
  props: {
    info: {
      type: Object
    }
  }
}
</script>

<style scoped lang="scss">
  .Mine-Commodity-Item {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    height: 100px;
    margin: 10px 0;
    overflow: hidden;

    img {
      width: 100px;
      height: 100px;
      min-width: 100px;
      margin: 0 10px;
    }

    div {
      flex: 1 1 auto;
      height: 100%;

      p:nth-child(1) {
        font-size: 1.5em;
        font-weight: bold;
        color: black;
        height: 30%;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      p:nth-child(2) {
        color: #999999;
        height: 40%;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      p:nth-child(3) {
        font-weight: bold;
        font-size: 2em;
        color: red;
        height: 30%;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
</style>
