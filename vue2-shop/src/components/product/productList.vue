<template lang="html">
  <div class="main">
    <div class="head">
      <mt-header title="商品列表" icon="search" style="background-color: #1f1f1f;height: 45px">
        <router-link :to="{name:'首页'}" slot="left">
          <mt-button icon="back" @click="$router.back();return false;;"></mt-button>
        </router-link>
      </mt-header>


      <!--<mt-navbar v-model="selected" >-->
        <!--<mt-tab-item id="综合" @click="hehe">综合</mt-tab-item>-->
        <!--<mt-tab-item id="价格">价格</mt-tab-item>-->
        <!--<mt-tab-item id="品牌">品牌</mt-tab-item>-->
      <!--</mt-navbar>-->
      <div class="navBar">
        <div :class="{active:selected=='综合'}" @click="selectNav('综合')">综合</div>
        <div :class="{active:selected=='价格'}" @click="selectNav('价格')">
          价格 <span v-if="priceSortAscend"><img src="../../assets/icon/sort-x.png" style="width: 18px" alt=""></span>
              <span v-else><img src="../../assets/icon/sort-s.png" style="width: 18px" alt=""></span>
        </div>
        <div :class="{active:selected=='品牌'}" @click="selectNav('品牌')">品牌</div>
      </div>


      <div class="toast">
        <p>共找到<span>{{total}}</span>件商品</p>
      </div>
    </div>



    <!-- tab-container -->
    <mt-tab-container v-model="selected" class="content">
      <mt-tab-container-item id="综合">
        <div  style="overflow: scroll;height: 75vh">

          <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :bottom-distance="20" :auto-fill="false" ref="loadmore">
            <div class="delcontent">
              <div class="goodcontent" v-for="item in formdata">
                <div class="boxcontent">
                  <div class="img" @click="$router.push({path:'/detail/'+item.id})">
                    <img :src="item.imageUrl?item.imageUrl[0]:defaultImageUrl" style="width: 100%" alt="">
                  </div>
                  <p>{{item.name}}</p>
                  <span>￥{{item.sellPrice}}</span>
                </div>
              </div>
            </div>

          </mt-loadmore>

        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="价格">
        <div style="overflow: scroll;height: 75vh">
          <mt-loadmore  :bottom-method="loadBottom" :bottom-pull-text="''" :bottom-distance="20" :auto-fill="false" ref="loadmore">
            <div class="delcontent">
              <div class="goodcontent" v-for="item in formdata">
                <div class="boxcontent">
                  <div class="img" @click="$router.push({path:'/detail/'+item.id})">
                    <img :src="item.imageUrl?item.imageUrl[0]:defaultImageUrl" style="width: 100%" alt="">
                  </div>
                  <p>{{item.name}}</p>
                  <span>￥{{item.sellPrice}}</span>
                </div>
              </div>
              <div slot="bottom" class="mint-loadmore-bottom" v-if="bottomIsload">
                <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
                <span v-show="topStatus === 'loading'">Loading...</span>
              </div>
            </div>

          </mt-loadmore>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="品牌">
        <div class="delcontent">

          <div class="goodcontent" v-for="item in formdata">
            <div class="boxcontent">
              <div class="img" @click="$router.push({path:'/detail/'+item.id})">
                <img :src="item.imageUrl?item.imageUrl[0]:defaultImageUrl" style="width: 100%" alt="">
              </div>
              <p>{{item.name}}</p>
              <span>￥{{item.sellPrice}}</span>
            </div>
          </div>

        </div>
      </mt-tab-container-item>
    </mt-tab-container>



  </div>

</template>

<script>
  import { Toast } from 'mint-ui';

  export default {
    data(){
      return {
        priceSortAscend:true,
        selected:'综合',
        formdata:'',
        total: 0,
        priceData:'',
        brandData:'',
        priceMd:'CREATED_TIME_DESC',
        brandMd:'BRAND_DESC',
        topStatus:'',
        scrollMode:"auto",
        bottomIsload:false,
        page:1,
        pageSize:10,
        totalPage:'',
        allLoaded:false
      }
    },
    created:function() {
      console.log('this.$router',this.$route.params)
      if(this.$route.params.from=='brand'){
        this.$api({
          url: '/search/product',
          method: 'get',
          params:{brandId:this.$route.params.id,page:this.page,pageSize:this.pageSize}
        }).then(response =>{
          if(response.data.code==="2000"){
            if(response.data.data.dataList!=null&&response.data.data.dataList.length>0){
              this.formdata = response.data.data.dataList;
              this.total = response.data.data.total;
              this.totalPage = Math.ceil(this.total/this.pageSize);
            }
          }
          console.log(response);
          console.log(this.formdata)
        })
      }else if(this.$route.params.from=='cate'){
        this.$api({
          url: '/search/product',
          method: 'get',
          params:{cateId:this.$route.params.id,page:this.page,pageSize:this.pageSize}
        }).then(response =>{
          if(response.data.code==="2000"){
            if(response.data.data.dataList!=null&&response.data.data.dataList.length>0){
              this.formdata = response.data.data.dataList;
              this.total = response.data.data.total;
              this.totalPage = Math.ceil(this.total/this.pageSize);
            }
          }
          console.log(response);
          console.log(this.formdata)
        })
      }else if(this.$route.params.from=='search'){
        this.$api({
          url: '/search/product',
          method: 'get',
          params:{keyword:this.$route.params.id,page:this.page,pageSize:this.pageSize}
        }).then(response =>{
          if(response.data.code==="2000"){
            if(response.data.data.dataList!=null&&response.data.data.dataList.length>0){
              this.formdata = response.data.data.dataList;
              this.total = response.data.data.total;
              this.totalPage = Math.ceil(this.total/this.pageSize);
            }
          }
          console.log(response);
          console.log(this.formdata)
        })
      }

    },
    methods:{
      loadBottom:function(id) {
        console.log('我要开始加载了')
        var that =this;
        if(this.selected=='综合'){
          if(this.totalPage > this.page){
            this.page++;
            this.formdata.push(this.toSelect([]));
          }else{
            console.log('this.topStatus1212',this.topStatus)
            Toast({
              message: '已无更多数据',
              position: 'middle',
              duration: 1000
            });
            this.allLoaded = true
            this.$refs.loadmore.onBottomLoaded();
            return true
          }
        }else if(this.selected=='价格'){
          this.selected = '价格'
          this.priceSortAscend=!this.priceSortAscend
          if(this.priceMd=='CREATED_TIME_ASC'){
            this.priceMd = 'CREATED_TIME_DESC';
          }else{
            this.priceMd = 'CREATED_TIME_ASC'
          }
          this.priceData = this.toSelect([this.priceMd]);
        }else if(this.selected=='品牌'){
          this.selected = '品牌'
          if(this.brandMd=='BRAND_DESC'){
            this.brandMd = 'BRAND_ASC,';
          }else{
            this.brandMd = 'BRAND_DESC'
          }
          this.brandData = this.toSelect([this.brandMd]);
        }
      },
      selectNav:function(data){
          if(data=='综合'){
            this.selected = '综合'
          }else if(data=='价格'){
            this.selected = '价格'
            this.priceSortAscend=!this.priceSortAscend
            if(this.priceMd=='CREATED_TIME_ASC'){
              this.priceMd = 'CREATED_TIME_DESC';
            }else{
              this.priceMd = 'CREATED_TIME_ASC'
            }
            this.priceData = this.toSelect([this.priceMd]);
          }else if(data=='品牌'){
            this.selected = '品牌'
            if(this.brandMd=='BRAND_DESC'){
              this.brandMd = 'BRAND_ASC,';
            }else{
              this.brandMd = 'BRAND_DESC'
            }
            this.brandData = this.toSelect([this.brandMd]);
          }
      },
      selectData:function(data){
        console.log(data)
      },
      toSelect:function(data,callbak){
        if(this.$route.params.from=='brand'){
          this.$api({
            url: '/search/product',
            method: 'get',
            params:{brandId:this.$route.params.id,sortByList:data,page:this.page,pageSize:this.pageSize}
          }).then(response =>{
            if(response.data.code==="2000"){
              if(response.data.data.dataList!=null&&response.data.data.dataList.length>0){
                return response.data.data.dataList;
                this.total = response.data.data.total;
              }
            }
            if(callbak){
              callbak();
            }
            console.log(response);
            console.log(this.formdata)
          })
        }else if(this.$route.params.from=='cate'){
          this.$api({
            url: '/search/product',
            method: 'get',
            params:{cateId:this.$route.params.id,sortByList:data,page:this.page,pageSize:this.pageSize}
          }).then(response =>{
            if(response.data.code==="2000"){
              if(response.data.data.dataList!=null&&response.data.data.dataList.length>0){
                return response.data.data.dataList;
                this.total = response.data.data.total;
              }
            }
            if(callbak){
              callbak();
            }
            console.log(response);
            console.log(this.formdata)
          })
        }else if(this.$route.params.from=='search'){
          this.$api({
            url: '/search/product',
            method: 'get',
            params:{
              keyword:this.$route.params.id,
              sortByList:data,
              page:this.page,
              pageSize:this.pageSize
              }
          }).then(response =>{
            if(response.data.code==="2000"){
              if(response.data.data.dataList!=null&&response.data.data.dataList.length>0){
                return response.data.data.dataList;
                this.total = response.data.data.total;
              }
            }
            if(callbak){
              callbak();
            }
            console.log(response);
            console.log(this.formdata)
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  *{
    box-sizing: border-box;
  }
  .main {
    background: #eeeeee;
    height: 100%;
    padding-top: 143px;
    .head{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      background: #eeeeee;
    }

    .navBar{
      /*position: fixed;*/
      display: flex;
      justify-content: space-between;
      background-color: #ffffff;
      >div{
        width: 30%;
        text-align: center;
        height: 35px;
        line-height: 35px;
      }
      >div.active{
        border-bottom: 2px solid #26a2ff;
        color: #26a2ff;
      }
    }

      .toast{
        text-align: center;
        margin-top: 2px;
        width: 100%;
        height: 50px;
        line-height: 50px;
        background-color: #ffffff;
        font-size: 14px;
        span{
          font-size:20px;
        }
      }

    .content{
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
            width: 96%;
            box-shadow: 3px 3px 2px #888888;
            border-radius: 4px;
            .img{
              width: 100%;
            }
            p{
              margin-left: 10px;
              font-size: 14px;
              margin-top: 2px;
            }
            span{
              margin-left: 10px;
              font-size: 15px;
              font-weight: bold;
            }
          }
        }
        .goodcontent:nth-of-type(2n){
          justify-content: flex-end;
        }
      }
    }
  }
</style>
