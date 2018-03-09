<template lang="html">
  <div class="main">
    <mt-header title="我的优惠券" icon="search" style="background-color: #1f1f1f;height: 12vw" fixed>
      <router-link :to="{name:'首页'}" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header> 
    <div class="content" v-for="item in dataList" @click="selectCou(item)">
      <div class="decontent">
        <div class="container">
          <div class="top">{{y(item)}}
          </div>
          <div class="btm">
            <div class="left">
              <div class="btm-money">
                <span>￥</span>
                <span>{{item.couponData.amount}}</span>
                <span>{{r(item)}}</span>
              </div>
              <div class="btm-time">
                当月有效，过期无效
              有效期：<span>2017-11-11</span>至 <span>2018-11-11</span> | <span>详情 <img src="./../assets/icon/arrow-b.png" alt="" style="width: 12px"> </span>
              </div>
            </div>
            <div class="right" v-show="">
              <img src="./../assets/icon/guoqi.png" alt="" style="width: 60px">
            </div>
          </div>
        </div>
        <div class="btm-con">
          <div class="context">
            <p v-for="(k,index) in x(item)">{{index+1}} {{k}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>


  export default {
    components:{

    },
    props:[],
    data() {
      return {
        dataList:""
      }
    },
    methods:{
      r(item){
        return JSON.parse(item.detailData.detail).cash.base_info.notice;
      },
      x(item){
        let desc= JSON.parse(item.detailData.detail).cash.base_info.description;
        let str =desc.slice(1);
        let arr =str.split("•")
        return  arr
      },
      y(item){
        return JSON.parse(item.detailData.detail).cash.base_info.title
      },
      selectCou(item){
        if(this.$store.state.detail.isFromConfrimOrder){
          this.$store.commit('ADDCOUPON',item)
          this.$store.commit('CHANGEFROMCONFFIMORDER',false);
          this.$router.push({path:'/confirmorder'});
        }
      }
    },
    created() {
      this.$api({
        url:"/coupon/list_user_coupon",
        method:"get"
      }).then(res => {
        /*
        this.dataList = res.data.data.dataList
        let r = JSON.parse(this.dataList[0].detailData.detail)
        */
      })
    }
  }
</script>

<style lang="less" scoped>
  @import "./../assets/fz.less";

  .main{
    margin-top: 12vw;
    background-color: #f3f4f6;
    .content{
      padding: 4vw;
      .decontent{
        background-color: #ffffff;
        margin-bottom: 4vw;
        .container{
          background-image: url("./../assets/icon/couponbg.png");
          background-size: 100% ;
          background-repeat:no-repeat;
          display: flex;
          flex-direction: column;
          padding: 2vw 3vw;
          padding-bottom: 0;
          justify-content: space-between;
          .top{
            font-size: 12px;
            margin-top: 14px
          }
          .btm{
            margin-top: 6vw;
            margin-bottom: 2vw;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .left{
              .btm-money{
                display: flex;
                align-items: center;
                span:nth-of-type(1){
                  color: #e90032;
                  font-size: 20px;
                  align-self: flex-start;
                  font-style: italic;
                }
                span:nth-of-type(2){
                  color: #e90032;
                  font-size: 40px;
                  font-style: italic;
                }
                span:nth-of-type(3){
                  margin-left: 27px;
                }
              }
              .btm-time{
                font-size: 12px;
              }
            }
            .right{
              align-self: flex-end;
            }
          }
        }
        .btm-con{
          padding-top: 2px;
          padding-left: 3vw;
          padding-right: 3vw;
          padding-bottom: 2vw;
          border: 1px solid #cccccc;
          border-top: none;
          .context{
            font-size: 12px;
            border-top: 1px solid #cccccc;
            padding-top: 2vw;

          }
        }

      }


    }


  }
</style>
