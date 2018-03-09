<template lang="html">
    <mt-swipe :auto="4000" v-if='swiperData'>
      <mt-swipe-item v-for="k in swiperData" :key="k.id">
        <router-link :to="{path:'/productList/search/衣服'}">
          <img :src="k.imageUrl">
        </router-link>
      </mt-swipe-item>
    </mt-swipe>

</template>

<script>
export default {
  props:['swiperData'],
  methods:{
  }
}
</script>

<style lang="less" scoped>

.mint-swipe {
  width: 100%;
  height:50vw;
  a,img {
    display: block;
    width: 100%;
    height:100%;
  }
}
</style>
