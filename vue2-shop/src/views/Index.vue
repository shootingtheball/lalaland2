<template lang="html">
  <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
  <div class="index" >
    <v-header></v-header>
    <div ref="vIdex" class="main">
    <div>
    <v-swiper :swiperData="carouselList"></v-swiper>
    <v-nav :carouselList="carouselList" :navdata="carouselList" :brandList="brandList" :productList="productList"></v-nav>

    <!--
    <v-service></v-service>
    <v-section1 :section1="datas.section1"></v-section1>
    <v-section2 :section2="datas.section2"></v-section2>
    <v-section3></v-section3> -->
    <!--<v-section4 :section4="datas.section4"></v-section4>-->
    <!--<v-baseline></v-baseline>-->
   <img src="../assets/icon/defaultImage.jpeg" style="width: 0;height: 0" alt="" ref="defaultImage">
   </div>
   </div>
   <v-footer></v-footer>
  </div>
</template>

<script>
import Header from '@/components/index/header.vue'
import Swiper from '@/components/index/swiper.vue'
import Service from '@/components/index/service.vue'
import Section1 from '@/components/index/section1.vue'
import Section2 from '@/components/index/section2.vue'
import Section3 from '@/components/index/section3.vue'
import Section4 from '@/components/index/section4.vue'
import navbar from '@/components/index/navbar.vue'
import Baseline from '@/common/_baseline.vue'
import Footer from '@/common/_footer.vue'
import { fetchList } from '@/api/index'
import BS from 'better-scroll'


export default {
  components: {
    'v-header': Header,
    'v-service': Service,
    'v-section1': Section1,
    'v-section2': Section2,
    'v-section3': Section3,
    'v-section4': Section4,
    'v-baseline': Baseline,
    'v-footer': Footer,
    'v-nav': navbar,
    'v-swiper':Swiper
  },
  data() {
    return {
      carouselList: '',
      loading:true,
      brandList:"",
      productList:"",
      carouselList:""
    }
  },
  beforeCreate() {

    // this.$api({
    //   method: 'post',
    //   url: '/index'
    // }).then((response) => {
    //   this.datas = response.data;
    //   console.log(this.datas)
    // }).catch(function(error) {
    //   // alert(error)
    // })
      this.$api({
        url: '/partner/home',
        method: 'get'
      }).then(response =>{
        if(response.data.data.brandList){
          this.brandList = response.data.data.brandList;
        }
        if(response.data.data.productList){
          this.productList = response.data.data.productList;
          //this.cateProductList = [{imageUrl:p1},{imageUrl:p2},{imageUrl:p3}]
          console.log(this.cateProductList)
        }
        if (response.data.data.carouselList) {
          this.carouselList = response.data.data.carouselList;
          console.log("this.carouselList=" + this.carouselList);
        }

      })
  },
  created(){
    this.$nextTick(() => {
      //this.getScroll()
    })
  },
  methods:{
    getScroll(){
      let scroll = new BS(this.$refs.vIndex,{click:true}) 
    }
  }
}
</script>



<style lang="less" scoped>
.index {
    width: 100%;
    padding-top: 12vw;
    padding-bottom: 55px;
    /*padding-bottom: 14vw;*/
    background-color: rgb(240, 243, 239);
}
/*.main{
  position: fixed;
  top: 12vw;
  bottom: 53px;
  width: 100%
} */
</style>
