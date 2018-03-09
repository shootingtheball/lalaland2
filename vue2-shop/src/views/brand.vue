<template lang="html">
  <div class="main"  >
    <mt-header title="品牌" icon="search" style="background-color: #1f1f1f;height: 12vw" fixed>
      <router-link :to="{name:''}" slot="left">
        <mt-button icon="back" @click="$router.back();return false;"></mt-button>
      </router-link>
    </mt-header>

<div style="overflow: scroll;height: 94vh;">
  <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :bottom-distance="20" :auto-fill="false" ref="loadmore">
    <div class="img" v-if="formDate">
      <div v-for="item in formDate" class="img2" v-if="item.bannerUrl">
        <!--<span>{{item.name}}</span> -->
        <img :src="item.bannerUrl?item.bannerUrl:defaultImageUrl" alt=""   @click="$router.push({path:'/productList/brand/'+item.brandId})">
      </div>
    </div>
    <div slot="bottom" class="mint-loadmore-bottom">
      <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
      <span v-show="topStatus === 'loading'">Loading...</span>
    </div>
  </mt-loadmore>
</div>

    <v-bottomBar></v-bottomBar>

  </div>
</template>

<script>
  import { Loadmore } from 'mint-ui';
  import { Toast } from 'mint-ui';
  import bottomBar from '@/common/_footer.vue'

  export default {
    components:{
      'v-bottomBar':bottomBar
    },
    data:function(){
      return {
          formDate:'',
        topStatus:'',
        allLoaded: false,
        scrollMode:"auto",
        total:'',
        page:1,
        totalPage:'',
        pageSize:10
      }
    },
    created:function(){

      this.$api({
            url: '/brand/list',
            method: 'get',
            params:{page:1,pageSize:this.pageSize}
          }).then(response =>{
            if(response.data.code==="2000"){
              if(response.data.data.dataList!=null>0){
                this.formDate = response.data.data.dataList;
                console.log(this.formDate)
                this.total = response.data.data.total
                this.totalPage =Math.ceil(this.total/this.pageSize)
              }
            }
      })

    },
    beforeCreate(){

    },
    methods:{
      loadBottom:function(id) {
        console.log('我要开始加载了')
        if(this.totalPage>this.page){
          this.topStatus = 'loading';
          this.page++;
          this.$api({
            url: '/brand/list',
            method: 'get',
            params:{page:this.page,pageSize:this.pageSize}
          }).then(response =>{
            console.log('response',response);
            if(response.data.code==="2000"){
              if(response.data.data!=null>0){
                for(var i =0;i<response.data.data.dataList.length;i++){
                  this.formDate.push(response.data.data.dataList[i]);
                }
                this.topStatus = '';
                console.log('this.formDate',this.formDate)
              }
            }
          })
        }else{
          // this.allLoaded = true ;
          Toast({
            message: '已无更多数据',
            position: 'middle',
            duration: 1000
          });
        }

      }
    }
  }
</script>



<style lang="less" scoped>
  *{
    box-sizing: border-box;
  }

  .main{
    padding-top: 12vw;
    min-height: 100%;
    .img{
      img{
        width: 100%;
        margin-top: 12px;
      }
      .img2{
        position: relative;
        span{
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          font-size: 18px;
        }
      }
    }

  }


</style>
