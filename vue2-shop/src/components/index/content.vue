<template lang="html">
  <div>
    <section class="section1" v-if='brandList'>
      <!--<h1 class="section1-title">-->
        <!--section1-->
        <!--<i class="icon-right"></i>-->
      <!--</h1>-->
      <!--<ul>-->
        <!--<img src="data1" alt="" style="width: 100%;">-->
      <!--</ul>-->

      <!--有网络请求的数据-->
      <!--<ul class="section1-list">-->
        <!--<li v-for="(k,j) in data1">-->
          <!--<router-link :to="{name:'详情页'}" :key="j">-->
            <!--<img v-lazy="k.logoUrl" alt="">-->
          <!--</router-link>-->
        <!--</li>-->
      <!--</ul>-->

      <!--没有网络请求的固定数据-->
      <ul class="section1-list">
        <li >
          <router-link :to="{path:'/detail/23624'}" >
            <img src="../../assets/icon/小banner.png" alt="">
          </router-link>
        </li>
        <li >
          <router-link :to="{path:'/detail/22901'}" >
            <img src="../../assets/icon/小banner2.png" alt="">
          </router-link>
        </li>

      </ul>
      <!--<router-link :to="{ name: '详情页'}"  class="section1-banner">-->
      <!--<img v-lazy="section1.banner" v-if='section1'>-->
      <!--</router-link>-->
    </section>

    <section class="section2" v-if='productList' v-for="(catePro,index) in productList" :key="index">
      <!--<img :src="catePro.imageUrl?catePro.imageUrl:defaultImageUrl" style="width: 100%;"> -->
      <router-link :to="'/productList/cate/'+catePro.cateId">
        <img v-lazy="catePro.imageUrl?catePro.imageUrl:defaultImageUrl" style="width: 100%;">
      </router-link>
      <div class="section2-list">
        <ul class="brand">
          <li v-for="(product,index) in catePro.productList" v-if="catePro.productList">
            <router-link :to="'/detail/'+product.productId">
              <img v-lazy="product.imageUrl?product.imageUrl[0]:defaultImageUrl" style="width: 135px">
            </router-link>
            <h2 class="section2-list-title ac">
              {{product.name}}
            </h2>
            <!--<p class="section2-list-intro">-->
              <!--{{k.intro}}-->
            <!--</p>-->
            <p class="section2-list-price">
              ￥{{product.sellPrice?product.sellPrice : product.marketPrice}}
            </p>
          </li>
        </ul>
      </div>
      <!--<router-link class="section2-banner" :to="{name:'详情页'}">-->
        <!--<img v-lazy="section2.banner">-->
      <!--</router-link>-->
    </section>
  </div>

</template>

<script>
  import { Lazyload } from 'mint-ui';
  var p1 = require("../../assets/icon/WechatIMG13.jpeg");
  var p2 = require("../../assets/icon/WechatIMG15.jpeg");
  var p3 = require("../../assets/icon/WechatIMG17.jpeg");
  // import { fetchList } from '@/api/index'

  export default {
    props:['section1','section2','carouselList','productList','brandList'],
    data:function() {
      return {
      }
    },
    created:function() {
      //console.log('contetn='+this.contentData)
    },
    mounted() {
      console.log(this.productList)
    }
  }

</script>

<style lang="less" scoped>
  @import '../../assets/fz.less';
  @import '../../assets/index/style.css';
  .section1 {

    .section1-title {
     .bt();
      background-color: #ffffff;
      text-align: center;
      padding: 4vw 0;
      .fz(font-size, 40);
      color: #333;
      position: relative;

      i {
        position: absolute;
        right: 6vw;
        top: 50%;
        .fz(font-size, 36);
        .fz(margin-top,-16);

        &::before {
          color: rgb(159, 159, 159);
        }
      }
    }

    .section1-list {
      display: -ms-flex;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      -ms-flex-pack: distribute;
      justify-content: space-around;
      padding:1vw 1vw 1vw 1vw;
      li {
        width: 50%;
        padding:1vw;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        a,
        img {
          width: 100%;
          display: block;
        }
      }
    }

    .section1-banner {
      display: block;
      width: 100vw;
      img {
        width: 100%;
        height: 24vw;
      }
    }


  }
  .section2-list {
    overflow-x: auto;
    width: 100%;
    /*原生滑动*/
    -webkit-overflow-scrolling: touch;
    >ul {
      .bt();
      display: -ms-flex;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      padding: 15px 0;
      padding-bottom: 0;
      margin-bottom: 15px;
      li {
        margin-right: 10px;
        width: 135px;
        text-align: left;
        height: 100%;

        a,
        img {
          display: block;
          width: 100%;
        }
        h2,
        p {
          padding-left: 8px;
          text-align: left;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        h2 {
          .fz(font-size, 28);
          padding-top: 3vw;
          color: #333;
        }

        p.section2-list-intro {
          padding-top: 2vw;
          .fz(font-size, 10);
          color: rgb(150, 150, 150);
        }

        p.section2-list-price {
          color: #b4282d;
          font-size: 12px;
        }
      }
    }



  }

  .section2-banner {
    display: block;
    width: 100vw;
    img {
      display: block;
      height: 24vw;
      width: 100%;
    }
  }

</style>
