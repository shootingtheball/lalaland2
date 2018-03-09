<template>
  <div>
    <!--<mt-navbar class="page-part" v-model="selected">
      <!<mt-tab-item  v-for="(n,index) in remoData" :id="n.id" :key="n.name">{{n.name}}</mt-tab-item>-->
      <!--<mt-tab-item id="推荐">推荐</mt-tab-item>-->
      <!--<mt-tab-item id="品牌">品牌</mt-tab-item>-->
      <!--<mt-tab-item id="活动">活动</mt-tab-item>-->
      <!--<mt-tab-item id="新品">新品</mt-tab-item>-->
      <!--<mt-tab-item id="全部商品">全部商品</mt-tab-item>
    </mt-navbar> -->


    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="推荐">

        <!--
        <mt-swipe :auto="4000" >
        <mt-swipe-item v-for="k in navdata.swiper" :key="k.id">-->
          <!--<router-link :to="{ name: '详情页'}">-->
            <!--<img :src="k.imgPath" style="width: 100%;">-->
          <!--</router-link>-->
        <!--</mt-swipe-item>-->
         <!-- <mt-swipe-item  key="sp1">
            <span >
            <router-link :to="{ name: '详情页'}" >
              <img :src="carouselList[0].imageUrl" style="width: 100%;">
            </router-link>
            </span>
          </mt-swipe-item>
          <mt-swipe-item  key="sp2">
            <router-link :to="{ name: '详情页'}">
              <img src="./../../assets/icon/Carousel2.jpg" style="width: 100%;">
            </router-link>
          </mt-swipe-item>
          <mt-swipe-item  key="sp2">-->
            <!--<router-link :to="{ name: '详情页'}">-->
              <!--<img src="./../../assets/icon/产品图2.jpg" style="width: 100%;">-->
            <!--</router-link>-->
          <!--</mt-swipe-item>
        </mt-swipe> -->
        <v-content :section1="navdata.section1" :section2="navdata.section2" :carouselList="carouselList" :brandList="brandList" :productList="productList"></v-content>

      </mt-tab-container-item>
      <mt-tab-container-item id="品牌">
        <mt-cell v-for="n in 4" :title="'测试 ' + n" :key="n"></mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="活动">
        <mt-cell v-for="n in 6" :title="'选项 ' + n" :key="n"></mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="新品">
        <mt-cell v-for="n in 6" :title="'选项 ' + n" :key="n"></mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="全部商品">
        <mt-cell v-for="n in 6" :title="'选项 ' + n" :key="n"></mt-cell>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>


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


<script>
import content from './content.vue'

  export default {
      data(){
        return {
          remoData: [{name:'选项一',id:1},{name:'选项二',id:2},{name:'选项三',id:3}],
          selected: '推荐',
        }
      },
      created:function() {
      console.log('navdata='+this.navdata)
    },
    components: {
      'v-content': content
    },
    props:['navdata','carouselList','brandList','productList'],
    mounted: function() {
      // this.selected = '推荐';
      console.log(this.productList)
    }
  }
</script>
