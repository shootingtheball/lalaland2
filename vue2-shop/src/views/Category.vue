<template lang="html">
  <div class="wrap">
    <v-header class="header">
      <h1 slot="title">分类</h1>
    </v-header>
    <section class="view">
      <v-content ></v-content>
      <!--<router-view :datas="allData"></router-view>-->
    </section>

  </div>
</template>

<script>

import Header from '@/common/_header.vue'
import content from '@/components/category/content.vue'
// import category from '@/http/mock.js' //模拟数据

export default {
  components:{
    'v-header':Header,
    'v-content': content
  },
  data(){
    return {
      allData:''
    }
  },
  created(){

  }
}
</script>

<style lang="less" scoped>
  .wrap {
    padding-top: 12vw;
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-flow: column nowrap;
            flex-flow: column nowrap;

    .view {
      width: 100%;
      height:100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
    }
  }
</style>
