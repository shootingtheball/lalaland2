<template lang="html">
  <div class="main">
    <mt-header title="我的积分" icon="search" style="background-color: #1f1f1f;">
      <router-link :to="{path:'/user'}" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <section class="top">
      <div>
        <div>
          可用积分
        </div>
        <div style="color: red">
          ￥{{money?money:0}}
        </div>
      </div>

      <!--<div>
        全部提现
      </div> -->
    </section>

    <section @click='getClick($event)'>
          <mt-navbar class="page-part profit-tab"  v-model="selected" style="margin-bottom: 2px;">
            <mt-tab-item id="待收益">待收益</mt-tab-item>
            <mt-tab-item id="已完成">已完成</mt-tab-item>
            <mt-tab-item id="已结算">已结算</mt-tab-item>
          </mt-navbar>
    </section>

    <div class="content">
      <mt-tab-container v-model="selected">
        <!--对应字段1 -->
        <mt-tab-container-item id="待收益">
          <div v-for="item in uncashedData" v-if="uncashedData">
            <div class="decontent">
              <div class="number">
                <div>
                  订单编号: {{item.id}}
                </div>
                <div style="color: red">
                  可提现
                </div>
              </div>
              <div class="money">
                <div>
                  付款金额：{{item.payAmount}}
                </div>
                <div style="color:red;font-size: 22px;">
                  +{{item.profitAmount?item.profitAmount:0}}
                </div>
              </div>
            </div>
            <div class="user">
              <div>
                <i class="iconfont icon-daishouhuo"></i>
                <span>{{item.buyerNickName}}</span>
              </div>
              <div>
                {{item.finishedTime}}
              </div>
            </div>
          </div>
        </mt-tab-container-item>

        <!--对应字段2 -->
        <mt-tab-container-item id="已完成">
          <div v-for="item in completed" v-if="completed">
            <div class="decontent">
              <div class="number">
                <div>
                  订单编号: {{item.id}}
                </div>
                <div style="color:#000000;">
                  预计12月28日可提现
                </div>
              </div>
              <div class="money">
                <div>
                  付款金额：{{item.payAmount}}
                </div>
                <div style="color:red;font-size: 22px;">
                  +{{item.profitAmount?item.profitAmount:0}}
                </div>
              </div>
            </div>
            <div class="user">
              <div>
                <i class="iconfont icon-daishouhuo"></i>
                <span>{{item.buyerNickName}}</span>
              </div>
              <div>
                {{item.finishedTime}}
              </div>
            </div>
          </div>
        </mt-tab-container-item>

        <!--对应字段0 -->
        <mt-tab-container-item id="已结算">
          <div v-for="item in settledData" v-if="settledData">
            <div class="decontent">
              <div class="number">
                <div>
                  订单编号: {{item.id}}
                </div>
                <div >
                  已提现
                </div>
              </div>
              <div class="money">
                <div>
                  付款金额：{{item.payAmount}}
                </div>
                <div style="color:red;font-size: 22px;">
                  +{{item.profitAmount?item.profitAmount:0}}
                </div>
              </div>
            </div>
            <div class="user">
              <div>
                <i class="iconfont icon-daishouhuo"></i>
                <span>{{item.buyerNickName}}</span>
              </div>
              <div>
                {{item.finishedTime}}
              </div>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>

</template>

<script>

  export default {
    data() {
      return {
        selected: '待收益',
        uncashedData: '',
        completed:'',
        settledData:'',
        money:''
      }
    },
    created(){
      this.$api({
        url: '/bonus/partner/list',
        method: 'get',
        params:{
          flag:1,
          page:1,
          pageSize:10
        }
      }).then(response =>{
        if(response.data.code==="2000"){
          if(response.data.data!=null>0){
            this.uncashedData = response.data.data.dataList;
          }
        }
      }) 

    },
    props:[],
    // watch:{
    //   seltected:function(){
    //     if(this.selected=='可提现'){
    //
    //     }else if(this.selected=='待收益'){
    //
    //     }else if(this.selected=='可提现'){
    //
    //     }
    //   }
    // }
    mounted:function () {
      // this.selected = '可提现'
    },
    computed:{

    },
    methods:{
      getClick(event) {
        console.log(event)
        if(event.target.innerHTML ==='已完成'){
          this.$api({
            url: '/bonus/partner/list',
            method: 'get',
            params:{
              flag:2,
              page:1,
              pageSize:10
            }
          }).then(response =>{
            if(response.data.code==="2000"){
              if(response.data.data!=null>0){
                this.completed = response.data.data.dataList;
            }
          }
        })
       }else if(event.target.innerHTML ==='待收益'){
           this.$api({
             url: '/bonus/partner/list',
             method: 'get',
             params:{
             flag:1,
             page:1,
             pageSize:10
          }
        }).then(response =>{
          if(response.data.code==="2000"){
            if(response.data.data!=null>0){
              this.uncashedData = response.data.data.dataList;
            }
          }
        }) 
       }else if(event.target.innerHTML === '已结算'){
          this.$api({
            url: '/bonus/partner/list',
            method: 'get',
            params:{
            flag:0,
            page:1,
            pageSize:10
          }
        }).then(response =>{
          if(response.data.code==="2000"){
            if(response.data.data!=null>0){
              this.settledData = response.data.data.dataList;
              this.money = response.data.data.amount
            }
          }
         })
       }
     }
    },
  }
</script>

<style lang="less" scoped>
  @import "./../assets/fz.less";
  @import "./../assets/user/icon/fonts1/iconfont.css";
  @import '../assets/mint/mint.css';

  .main{
      background-color: #f4f4f4;
      width: 100%;
    >.top{
      background-color: #ffffff;
      display: flex;
      padding: 0 6vw;
      height: 15vw;
      line-height: 15vw;
      margin-top: 2vw;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2vw;
      >div:nth-of-type(1){
        display: flex;
        >div:nth-of-type(2){
          margin-left: 14px;
        }
      }
      >div:nth-of-type(2){
        background-color: #dd1456;
        color: #ffffff;
        height: 21px;
        line-height: 21px;
        font-size: 12px;
        padding: 0 6px;
      }
    }

    div.content{
      background-color: #f4f4f4;
      margin-top: 2px;
      .decontent{
        font-size: 12px;
        height: 62px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: #ffffff;
        .number{
          background-color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 6vw;
        }
        .money{
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 6vw;
          background-color: #ffffff;
        }
      }
      .user{
        margin-top: 1px;
        margin-bottom: 2px;
        background-color: #ffffff;
        height: 40px;
        display: flex;
        align-items: center;
        padding: 0 6vw;
        font-size: 12px;
        justify-content: space-between;
        >div:nth-of-type(1){
          vertical-align: center;
          display: flex;
          align-items: center;
          span{
            padding-left: 10px;
          }

        }
      }
    }

  }
</style>
