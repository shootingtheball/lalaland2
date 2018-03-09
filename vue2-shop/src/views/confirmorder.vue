<template lang="html">
  <div class="main">
    <mt-header title="订单确认" icon="search" style="background-color: #1f1f1f;height: 12vw" fixed>
      <router-link :to="{name:'首页'}" slot="left">
        <mt-button icon="back" @click="$router.back();return false;"></mt-button>
      </router-link>
    </mt-header>

    <div class="address">
      <div v-if="hasfilladdress" class="noneaddress">
        <p style="height:20px;line-height: 36px">您还没有收货地址</p>
        <!--<router-link :to="{name:''}" @click="toAddress" >-->
          <!--选择收获地址-->
        <!--</router-link>-->
        <a  @click="toAddress">选择收获地址</a>
      </div>

      <div v-else class="hasaddress" @click="toAddress">
        <div class="left">
          <div class="name">
            {{defaultAddress.username}} {{defaultAddress.mobile}}
          </div>
          <div class="deladdress">
            {{defaultAddress.fullAddress}}
          </div>
        </div>

        <div class="right">
          <img src="../assets/icon/arrow-r.png" alt="">
        </div>
      </div>
    </div>

    <div class="middle">
      <div class="goods" v-for="k in CarList">
        <div class="left">
          <div class="img">
            <img :src="k.imgPath" alt="">
          </div>
          <div class="goostext">
            <p>{{k.title}}</p>
            <p>颜色：{{k.col}}  尺码：{{k.size}}</p>
          </div>
        </div>
        <div class="right">
          <span>x {{k.nub}}</span>
          <span class="unit-price">单价：￥{{k.price}}</span>
        </div>
      </div>

      <div class="comment">
        <div class="left">
          运费
        </div>
        <div>
          <!--￥34.00-->
        </div>
      </div>
      <div class="comment" @click='toCoupon'>
        <div class="left">
          优惠券
        </div>
        <div>
          <!--￥34.00-->
        </div>
      </div>
      <div class="comment">
        <div class="left">
          合计
        </div>
        <div style="color:#ef558f;">
          ￥{{allpay}}
        </div>
      </div>
    </div>

    <div class="paymethodtitle">
      选择支付方式
    </div>
    <div class="paymethod">
      <div class="method">
        <div class="something-left">
          <label :class="{false:false}">
            <input type="checkbox">
          </label>
        </div>
        <div class="img">
          <img src="../assets/icon/wechat.png" style="width:35px">
          <span>微信支付</span>
        </div>
      </div>
      <!--<div class="method">-->
        <!--<div class="something-left">-->
          <!--<label class="false">-->
            <!--<input type="checkbox">-->
          <!--</label>-->
        <!--</div>-->
        <!--<div class="img">-->
          <!--<img src="../assets/icon/zhifubao.png" alt="">-->
          <!--<span>支付宝支付</span>-->
        <!--</div>-->
      <!--</div>-->

    </div>
    <div class="topay">
      <div class="total">
        合计：￥{{allpay}}
      </div>
      <div  class="topaybtn" @click="beforeToPay">
        立即支付
      </div>
    </div>
  </div>
</template>

<script>
  import wx from 'weixin-js-sdk'
  import {getWeixinConfig} from '@/api/'
  import { Toast } from 'mint-ui';
  export default {
    components:{
    },
    props:[],
    data() {
      return {
        hasfilladdress: false,
        formdata: {userAddressId:'',couponId:[],bonusAmount:'',remarks:'',deliveryMethod:'',items:[]},
        defaultAddress:'',
        CarList:''
      }
    },
    created:function(){
      // 防止页面刷新后数据丢失
      if (this.$store.state.detail.selectedList == '') {
        this.$store.commit('SET_SELECTEDLIST')
      }
      if(this.$store.state.detail.defaultAddress){
        this.defaultAddress =this.$store.state.detail.defaultAddress;
      }else{
        this.$api({
          url: '/user_address/list',
          method: 'get'
        }).then(response =>{
          if(response.data.code=='2000'){
            if(response.data.data==undefined){
              this.hasfilladdress = true  //周日该，有待测试
            }else{
              this.hasfilladdress = true
              for(var i=0;i<response.data.data.length;i++){
                if(response.data.data[i].default==true){
                  this.defaultAddress = response.data.data[i]
                  break
                }
              }
            }
          }
        })
      }
      
      if(this.$route.query.pay === 'payimmediate'){
        this.CarList = this.$store.state.detail.immediatePurchaseGood;
        console.log(this.$store.state.detail.immediatePurchaseGood)
      }else if(this.$route.query.pay==='notPayimmediate'){
        this.CarList = this.$store.state.detail.selectedList;
        console.log(this.$store.state.detail.selectedList)
      }

    },
    mounted:function () {
      let url = location.href
      //let url = location.href.split('?')[0]
      getWeixinConfig({url}).then(res=>{
        res=res.data;
        if (res.data) {
          let config = res.data
          config.jsApiList = ['chooseWXPay']
          wx.config(config)
        }
      })
    },
    computed: {
      //所有商品列表
      carList() {
        //return this.$store.state.detail.selectedList
      },
      // 商品价格总和
      allpay() {
        let allpay = 0;
        if(this.$route.query.pay === 'payimmediate'){
          console.log('payimmediate')
          for (let i = 0; i < this.$store.state.detail.immediatePurchaseGood.length; i++) {
            allpay += this.$store.state.detail.immediatePurchaseGood[i].price*this.$store.state.detail.immediatePurchaseGood[i].nub
          }      
        }else if(this.$route.query.pay==='notPayimmediate'){
          for (let i = 0; i < this.$store.state.detail.selectedList.length; i++) {
            console.log('not-payimmediate')
            allpay += this.$store.state.detail.selectedList[i].price*this.$store.state.detail.selectedList[i].nub
          }        }
        return allpay
      }
    }, 
    methods:{
      toAddress:function(){
        this.$store.commit('CHANGEFROMCONFFIMORDER',true);
        this.$router.push({path:'/address',query:{pay:this.$route.query.pay}});
      },
      toCoupon(){
        this.$store.commit('CHANGEFROMCONFFIMORDER',true);
        this.$router.push({path:'/mycoupon'});
      },
      beforeToPay:function(){
        if(this.defaultAddress){
          this.formdata.userAddressId = this.defaultAddress.id
        }
        //这里是立即购买
        if(this.$store.state.detail.immediatePurchaseGood){
          if(this.formdata.userAddressId){
            var arr = this.$store.state.detail.immediatePurchaseGood;
            this.formdata.items[0] = {}
            this.formdata.items[0].skuId = arr.id
            this.formdata.items[0].quantity = this.$store.state.detail.currentNub
            this.formdata.channel = 'WECHAT'
            this.formdata.paymentProduct = 'MP'
            this.$api({
              url:'payment/order_and_pay',
              headers:{"Content-Type":"application/json"},
              method:'post',
              data:this.formdata
            }).then(response =>{
              if(response.data.data&&response.data.code==='2000'&&response.data.data.payObject){
                let res=response.data;
                this.onBridgeReady( () => {
                  if (res.data && res.data.payObject) {
                    WeixinJSBridge.invoke(
                      'getBrandWCPayRequest', res.data.payObject,
                      res => {
                        if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                          this.$router.push({name: 'PaySuccess', query: {
                              title: res.data.title,
                              orderId:res.data.orderId,
                              amount:res.data.amount
                            }})
                        }else{
                          // TODO /
                          Toast({
                            message:'取消支付',
                            position: 'middle',
                            duration: 1000
                          })
                        }
                      });
                  }
                })
              }else{
                let res=response.data;
                if(res.msg){
                  Toast({
                    message:res.msg,
                    position: 'middle',
                    duration: 1000
                  })
                }
              }
            })
            this.$store.commit('ISimmediatePurchaseGood',false);
          }else{
            Toast({
              message: '请选择收获地址',
              position: 'middle',
              duration: 1000
            });
          }
        }else{
          if(this.formdata.userAddressId){
            this.topay()
          }else{
            Toast({
              message: '请选择收获地址',
              position: 'middle',
              duration: 1000
            });
          }
        }

      },
      topay:function(){
        var arr = this.$store.state.detail.selectedList;
        for(var i = 0;i<arr.length;i++){
          this.formdata.items[i] = {}
          this.formdata.items[i].skuId = arr[i].id
          this.formdata.items[i].quantity = arr[i].nub
        }
        this.formdata.channel = 'WECHAT'
        this.formdata.paymentProduct = 'MP'
        this.$api({
          url:'payment/order_and_pay',
          headers:{"Content-Type":"application/json"},
          method:'post',
          data:this.formdata
        }).then(response =>{
          if(response.data.data&&response.data.code==='2000'&&response.data.data.payObject){
            let res=response.data;
            this.onBridgeReady( () => {
              if (res.data && res.data.payObject) {
               //console.log(JSON.stringify(res.data.payObject))
                WeixinJSBridge.invoke(
                  'getBrandWCPayRequest', res.data.payObject,
                  res => {
                    if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                      this.$router.push({name: 'PaySuccess', query: {
                        title: res.data.title,
                        orderId:res.data.orderId,
                        amount:res.data.amount
                      }})
                    }else{
                      // TODO /
                      Toast({
                        message:JSON.stringify('取消支付'),
                        position: 'middle',
                        duration: 1000
                      })
                    }
                  });
              }
            })
          }else{
            let res=response.data;
            if(res.msg){
            Toast({
              message:res.msg,
              position: 'middle',
              duration: 1000
            })
            }
          }
        })

      },
      onBridgeReady (callback) {

        if (typeof WeixinJSBridge == "undefined"){
          if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', callback, false);
          }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', callback);
            document.attachEvent('onWeixinJSBridgeReady', callback);
          }
        }else{
          callback && callback();
        }
      }
    }
  }
</script>

<style lang="less" scoped>
 @import '../assets/user/icon/fonts3/myStyle.css';

  *{
    box-sizing: border-box;
  }
  .main{
    background: #eeeeee;
    min-height: 100%;
    padding-top: 12vw;
    padding-bottom: 48px;
    .address{
      width: 100%;
      min-height: 75px;
      padding:0 20px;
      background-color: #ffffff;
      .noneaddress{
        text-align: center;
        height: 100%;
        line-height: 75px;
        a{
          background-color: #000000;
          color: #ffffff;
          padding: 6px 12px;
        }
      }
      .hasaddress{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;
        .name{
          font-size: 16px;
        }
        .deladdress{
          margin-top: 5px;
          color: #999999;
          font-size: 12px;
        }
      }
    }

    .middle{
      width: 100%;
      background-color: #ffffff;
      padding: 10px 20px;
      margin-top: 10px;

      .goods{
        display: flex;
        height: 90px;
        justify-content: space-between;
        background-color: #fafafa;
        padding: 12px 10px;
        margin-bottom: 2px;
        .unit-price{
            font-size: 12px !important;
          }
        .left{
          display: flex;
          align-items: flex-start;
          .img{
            img{
              height: 64px;
            }
          }
          .goostext{
            margin-left: 10px;
            p:nth-of-type(1){
              font-size: 14px;
            }
            p:nth-of-type(2){
              margin-top: 10px;
              font-size: 12px;
            }
          }
        }

        .right{
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          span:nth-of-type(1){
            font-size: 12px;
          }
          span:nth-of-type(2){
            font-size: 14px;
            margin-top: 8px;
          }
        }
      }
      .comment{
        height: 45px;
        font-size: 14px;
        border-top: 1px solid #dddddd;
        display: flex;
        justify-content: space-between;
        align-items: center;
        div:nth-of-type(2){
          color: #b0b0b0;
        }
      }
    }

    .paymethodtitle{
      height: 40px;
      border-bottom: 1px solid #dddddd;
      padding:0 20px;
      line-height: 40px;
      background-color: #ffffff;
      margin-top: 10px;
    }

    .paymethod{
      width: 100%;
      background-color: #ffffff;
      padding: 0 20px;
      .method{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #dddddd;
        font-size: 12px;
        .something-left {

          label {
            float: left;
            background: url("../assets/car/images/tr.svg") no-repeat center center/50% 50%;
            input {
              height: 14vw;
              width: 14vw;
              opacity: 0;
              filter: alpha(opacity=0);
            }
          }
          .false {
            background: url("../assets/car/images/f.svg") no-repeat center center /50% 50%!important;
          }

        }
        .img{
          span{
            margin-left: 8px;
          }
        }
      }

    }
    .topay{
      width: 100%;
      position: fixed;
      left: 0;
      bottom: 0;
      background-color: #ffffff;
      .total{
        float: left;
        text-align: center;
        font-size: 14px;
        color: #ed145b;
        height: 48px;
        line-height: 48px;
        width: 50%;
      }
      .topaybtn{
        float: left;
        background-color: #ed145b;
        color: #ffffff;
        width: 50%;
        text-align: center;
        height: 48px;
        line-height: 48px;
      }
    }
  }
</style>
