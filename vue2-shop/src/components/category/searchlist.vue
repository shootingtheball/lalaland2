<template lang="html">
  <div class="main">
    <mt-header title="列表页" icon="search" style="position:fixed;top:0px;left:0px;right:0px;background-color: #1f1f1f;">
      <router-link :to="{name:'首页'}" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="search-title">
      <a href="javascript:;" @click="clickSortAll()" :class="{active: allActive}">综合</a>
      <a href="javascript:;" @click="clickSortPrice()" :class="{active: priceActive}">价格</a>
      <a href="javascript:;" @click="clickSortBrand()" :class="{active: brandActive}">品牌</a>
    </div>

    <div class="title">
      共找到{{total}}件商品
    </div>

    <!-- tab-container -->
    <div class="content">
      <div class="delcontent">
          <div class="goodcontent" v-for="item in goodsList">
            <div class="boxcontent">
              <div class="img" @click="$router.push({path:'/detail/'+item.id})">
                <img :src="item.imageUrl?item.imageUrl[0]:'../../assets/icon/defaultImage.jpeg'" style="width: 100%" alt="">
              </div>
              <p>{{item.name}}</p>
              <span>￥{{item.sellPrice}}</span>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>

  import request from '@/http/api.js'
  export default {
    data() {
      return {
        allActive: true,
        priceActive: false,
        brandActive: false,
        total: 0,
        selected: '综合',
        goodsList: []
      }
    },
    created: function() {
      this.search();
    },
    methods:{
      search: function (params = {}) {
        var _params = Object.assign({keyword: this.$route.params.keyword}, params);
          request({
          url: 'search/product',
          method: 'POST',
          data: _params
        }).then(({data}) => {
          if (data.code === '2000') {
              this.goodsList = data.data.dataList;
              this.total = data.data.total;
          }
        });
      },
      clickSortAll: function () {
        this.allActive = true;
        this.priceActive = false;
        this.brandActive = false;
        this.search();
      },
      clickSortPrice: function () {
        this.allActive = false;
        this.priceActive = true;
        this.brandActive = false;
        this.search({
          sortBy: 'PRICE_DESC'
        });
      },
      clickSortBrand: function () {
        this.allActive = false;
        this.priceActive = false;
        this.brandActive = true;
        this.search({
          sortBy: 'BRAND_DESC'
        });
      }
    }
  }
</script>



<style lang="less" scoped>
  @import "./../../assets/fz.less";

  .main {
    background: #eeeeee;
    height: 100%;
    .head{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      background: #eeeeee;
    }
      .title{
        text-align: center;
        margin-top: 2px;
        width: 100%;
        height: 50px;
        line-height: 50px;
        background-color: #ffffff;
        font-size: 15px;
      }
    .search-title {
      background-color: #fff;
      margin-top: 40px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
    text-align: center;
      a {
        padding: 17px 0;
        font-size: 15px;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        text-decoration: none;
        &.active {
          border-bottom: 3px solid #26a2ff;
          color: #26a2ff;
          margin-bottom: -3px;
        }
      }
    }
    .content{
      margin-top: 10px;
      padding-top: 20px;
      min-height: 100%;
      background-color: #ffffff;
      .delcontent{
        display: flex;
        flex-wrap:wrap;
        .goodcontent{
          width: 50%;
          display: flex;
          margin-bottom: 12px;
          .boxcontent{
            width: 94%;
            .img{
              width: 100%;
            }
            p{
              margin-left: 20px;
              font-size: 15px;
              margin-top: 2px;
            }
            span{
              margin-left: 20px;
              font-size: 17px;
            }
          }
        }
        .goodcontent:nth-of-type(2n){
          justify-content: flex-start;
        }
      }
    }
  }
</style>
