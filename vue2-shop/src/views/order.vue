<template lang="html">
  <div class="main">
    <mt-header title="我的订单" icon="search" style="background-color: #1f1f1f;height: 12vw" fixed>
      <router-link :to="{name:'首页'}" slot="left">
        <mt-button icon="back" @click="$router.back();return false;"></mt-button>
      </router-link>
    </mt-header>

    <mt-navbar class="page-part topnav" v-model="selected">
      <mt-tab-item id="全部">全部</mt-tab-item>
      <mt-tab-item id="待付款">待付款</mt-tab-item>
      <mt-tab-item id="待收货">待收货</mt-tab-item>
      <mt-tab-item id="已完成">已完成</mt-tab-item>
     <!-- <mt-tab-item id="已取消">已取消</mt-tab-item> -->
    </mt-navbar>

    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="全部">
        <div v-for="(item,index) in alldata" v-if="alldata">
          <div class="number">
            <div class="left">
              订单编号 {{item.orderId}}
            </div>
            <div class="right" v-if="item.status==='WAIT_BUYER_PAY'">
              待付款
            </div>
            <div class="right" v-else-if="item.status==='WAIT_BUYER_CONFIRM_GOODS'">
              待收货
            </div>
            <div class="right" v-else>
              交易关闭
            </div>
          </div>
          <div class="content" @click="$router.push({path:'/orderdetails/'+item.orderId})">
              <div class="img">
                <img :src="item.imageUrl?item.imageUrl:defaultImageUrl" style="height: 65px" alt="">
              </div>

            <div class="contenttext">
                <p>{{item.skuList[0].productName}}</p>
                <p>{{item.skuList[0].skuFeatures[0].name}} {{item.skuList[0].skuFeatures[0].value[0]}} {{item.skuList[0].skuFeatures[1].name}} {{item.skuList[0].skuFeatures[1].value[0]}}</p>
            </div>
            <div class="price">
              <div>￥{{item.priceAmount}}</div>
              <!--<div><s>￥{{item.skuList[0].marketPrice}}</s></div>-->
              <div>X{{item.quantity}}</div>
            </div>
          </div>
          <div class="foot">
            <div class="left">
              共1件，总价：<span style="color: red">￥{{item.amount}}</span>
            </div>
            <div class="right" v-if="item.status==='WAIT_BUYER_PAY'">
              <div @click="cancelOrder(item.orderId)">
                取消订单
              </div>
              <div @click="paymentOrder(item.orderId)">
                付款
              </div>
            </div>
            <div class="right" v-else-if="item.status==='WAIT_BUYER_CONFIRM_GOODS'">
              <div>
                查看物流
              </div>
              <div>
                申请退货
              </div>
            </div>
            <div class="right" v-else>

            </div>
          </div>
        </div>

      </mt-tab-container-item>
      <mt-tab-container-item id="待付款">
        <div v-if="paydata[0].status" v-for="item in paydata">
          <div class="number">
            <div class="left">
              订单编号 {{item.orderId}}
            </div>
            <div class="right">
              待付款
            </div>
          </div>
          <div class="content" @click="$router.push({path:'/orderdetails/'+item.orderId})">
            <div class="img">
              <img :src="item.imageUrl?item.imageUrl:defaultImageUrl" style="height: 65px" alt="">
            </div>
            <div class="contenttext" >
              <p>{{item.skuList[0].productName}}</p>
              <p>{{item.skuList[0].skuFeatures[0].name}} {{item.skuList[0].skuFeatures[0].value[0]}} {{item.skuList[0].skuFeatures[1].name}} {{item.skuList[0].skuFeatures[1].value[0]}}</p>
            </div>
            <div class="price">
              <div>￥{{item.priceAmount}}</div>
              <!--<div><s>￥{{item.skuList[0].marketPrice}}</s></div>-->
              <div>X{{item.quantity}}</div>
            </div>
          </div>
          <div class="foot">
            <div class="left">
              共1件，总价：<span style="color: red">￥{{item.amount}}</span>
            </div>
            <div class="right">
              <div @click="cancelOrder(item.orderId)">
                取消订单
              </div>
              <div @click="paymentOrder(item.orderId)">
                付款
              </div>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="待收货">
        <div v-if="goodsdata[0].status" v-for="item in goodsdata">
          <div class="number">
            <div class="left">
              订单编号 {{item.orderId}}
            </div>
            <div class="right">
              待收货
            </div>
          </div>
          <div class="content" @click="$router.push({path:'/orderdetails/'+item.orderId})">
            <div class="img">
              <img :src="item.imageUrl?item.imageUrl:defaultImageUrl" style="height: 65px" alt="">
            </div>
            <div class="contenttext" @click="$router.push({path:'/orderdetails/2'})">
              <p>{{item.skuList[0].productName}}</p>
              <p>{{item.skuList[0].skuFeatures[0].name}} {{item.skuList[0].skuFeatures[0].value[0]}} {{item.skuList[0].skuFeatures[1].name}} {{item.skuList[0].skuFeatures[1].value[0]}}</p>
            </div>
            <div class="price">
              <div>￥{{item.priceAmount}}</div>
              <!--<div><s>￥{{item.skuList[0].marketPrice}}</s></div>-->
              <div>X{{item.quantity}}</div>
            </div>
          </div>
          <div class="foot">
            <div class="left">
              共1件，总价：<span style="color: red">￥{{item.amount}}</span>
            </div>
            <div class="right">
              <div>
                查看物流
              </div>
              <div>
                申请退货
              </div>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="已完成">
        <div v-if="finishdata[0].status" v-for="item in finishdata">
          <div class="number">
            <div class="left">
              订单编号 {{item.orderId}}
            </div>
            <div class="right">
              交易关闭
            </div>
          </div>
          <div class="content" @click="$router.push({path:'/orderdetails/'+item.orderId})">
            <div class="img">
              <img :src="item.imageUrl?item.imageUrl:defaultImageUrl" style="height: 65px" alt="">
            </div>
            <div class="contenttext">
              <p>{{item.skuList[0].productName}}</p>
              <p>{{item.skuList[0].skuFeatures[0].name}} {{item.skuList[0].skuFeatures[0].value[0]}} {{item.skuList[0].skuFeatures[1].name}} {{item.skuList[0].skuFeatures[1].value[0]}}</p>
            </div>
            <div class="price">
              <div>￥{{item.priceAmount}}</div>
              <!--<div><s>￥{{item.skuList[0].marketPrice}}</s></div>-->
              <div>X{{item.quantity}}</div>
            </div>
          </div>
          <div class="foot">
            <div class="left">
              共1件，总价：<span style="color: red">￥{{item.amount}}</span>
            </div>

          </div>
        </div>
      </mt-tab-container-item>

<!--
      <mt-tab-container-item id="已取消">
        <div v-for="(item,index) in canceldata" v-if="canceldata">
          <div class="number">
            <div class="left">
              订单编号 {{item.orderId}}
            </div>
            <div class="right">
              订单已取消
            </div>
          </div>
          <div class="content" @click="$router.push({path:'/orderdetails/'+item.orderId})">
            <div class="img">
              <img :src="item.imageUrl?item.imageUrl:defaultImageUrl" style="height: 65px" alt="">
            </div>

            <div class="contenttext">
              <p>{{item.skuList[0].productName}}</p>
              <p>{{item.skuList[0].skuFeatures[0].name}} {{item.skuList[0].skuFeatures[0].value[0]}} {{item.skuList[0].skuFeatures[1].name}} {{item.skuList[0].skuFeatures[1].value[0]}}</p>
            </div>
            <div class="price">
              <div>￥{{item.priceAmount}}</div>
              <div>X{{item.quantity}}</div>
            </div>
          </div>
          <div class="foot">
            <div class="left">
              共1件，总价：<span style="color: red">￥{{item.amount}}</span>
            </div>
            <div class="right" v-if="item.status==='WAIT_BUYER_PAY'">
              <div @click="cancelOrder(item.orderId,index)">
                取消订单
              </div>
              <div @click="paymentOrder">
                付款
              </div>
            </div>
            <div class="right" v-else-if="item.status==='WAIT_BUYER_CONFIRM_GOODS'">
              <div>
                查看物流
              </div>
              <div>
                申请退货
              </div>
            </div>
            <div class="right" v-else>

            </div>
          </div>
        </div>

      </mt-tab-container-item>   -->
    </mt-tab-container>
  </div>

</template>

<script>
  import wx from 'weixin-js-sdk'
  import head from './../common/_header'
  import { Toast } from 'mint-ui';

  //WAIT_BUYER_PAY           待付款
  //WAIT_BUYER_CONFIRM_GOODS   待收货
  //TRADE_FINISHED     已完成
  //TRADE_CANCE   已取消


  export default {
    components:{
      'v-head': head
    },
    props:['datas'],
    data() {
      return {
        selected: this.$route.params.state,
        alldata: '',
        paydata:'',
        goodsdata:'',
        finishdata:'',
        canceldata:''
      }

    },
    created:function () {


      //获取数据
      this.getAlldata();
      this.getWaitBuydata();
      this.getWaitConfirmdata();
      this.getTradeFinishdata();

    },
    mounted:function () {

    },
    computed:{
      tabIndex(){
        return this.$store.state.category.tabIndex
      }
    },
    methods:{
      changeTabIndex(i) {
        this.$store.commit('CHANGE_TABINDEX',i)
      },
      orderDetail(orderId) {


      },
      cancelOrder(orderId) {
        if(this.selected=='全部'){
          this.$api({
            url: 'order/cancel',
            method: 'get',
            params:{orderId:orderId}
          }).then(response =>{
            if(response.data.data) {
              Toast({
                message: '订单取消成功',
                position: 'middle',
                duration: 1000
              });
              this.getAlldata();
              console.log(response)
            }
          })
        }else if(this.selected=='待付款'){
          this.$api({
            url: 'order/cancel',
            method: 'get',
            params:{orderId:orderId}
          }).then(response =>{
            if(response.data.data) {
              Toast({
                message: '订单取消成功',
                position: 'middle',
                duration: 1000
              });
              this.getWaitBuydata();
              console.log(response)
            }
          })
        }

      },
      paymentOrder(orderId) {
        if(this.selected=='全部'){
          this.$api({
            url: 'payment/prepay',
            method: 'get',
            params:{orderId:orderId,channel:'WECHAT',paymentProduct:'MP'}
          }).then(response =>{
            if(response.data.data) {
              Toast({
                message: '订单支付成功',
                position: 'middle',
                duration: 1000
              });
              this.wePay(response);
              console.log(response)
            }else{
              Toast({
                message: response.data.msg,
                position: 'middle',
                duration: 1000
              });
            }
          })
        }else if(this.selected=='待付款'){
          this.$api({
            url: 'payment/prepay',
            method: 'get',
            params:{orderId:orderId,channel:'WECHAT',paymentProduct:'MP'}
          }).then(response =>{
            if(response.data.data) {
              Toast({
                message: '订单支付成功',
                position: 'middle',
                duration: 1000
              });
              this.wePay(response);
              console.log(response)
            }else{
              Toast({
                message: response.data.msg,
                position: 'middle',
                duration: 1000
              });
            }
          })
        }
      },
      wePay:function(response) {
        if(response.data.data&&response.data.code==='2000'&&response.data.data.payObject){
          let res=response.data;
          this.onBridgeReady( () => {
            if (res.data && res.data.payObject) {
              console.log(JSON.stringify(res.data.payObject))
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
      },
      getAlldata:function() {
        this.$api({
          url: 'order/user/all',
          method: 'get',
          params:{page:1,pageSize:10}
        }).then(response =>{
          if(response.data.data){
            this.alldata = response.data.data.dataList
            console.log('this.alldata',this.alldata)
          }
        })
      },
      getWaitBuydata:function() {
        this.$api({
          url: 'order/user/wait_buyer_pay',
          method: 'get',
          params:{page:1,pageSize:10}
        }).then(response =>{
          if(response.data.data) {
            this.paydata = response.data.data.dataList
            console.log(response)
          }
        })
      },
      getWaitConfirmdata:function() {
        this.$api({
          url: 'order/user/wait_confirm_goods',
          method: 'get',
          params:{page:1,pageSize:10}
        }).then(response =>{
          if(response.data.data) {
            this.goodsdata = response.data.data.dataList
            console.log(response)
          }
        })
      },
      getTradeFinishdata:function() {
        this.$api({
          url: 'order/user/trade_finished',
          method: 'get',
          params:{page:1,pageSize:10}
        }).then(response =>{
          if(response.data.data) {
            this.finishdata = response.data.data.dataList
            console.log(response)
          }
        })
      },
      getCancledata:function() {
        this.$api({
          url: '/order/user/cancel',
          method: 'get',
          params:{page:1,pageSize:10}
        }).then(response =>{
          if(response.data.data){
            this.canceldata = response.data.data.dataList
            console.log('this.cancel',this.cancel)
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "./../assets/fz.less";

  .main{
    background-color: #eeeeee;
    margin-top: 24vw;

    .topnav{
      position: fixed;
      left: 0;
      top: 12vw;
      right: 0;
      z-index: 100;
    }

    .number{
      display: flex;
      justify-content: space-between;
      padding: 0 6vw;
      text-align: center;
      height: 12vw;
      line-height: 12vw;
      font-size: 12px;
      margin-top: 2vw;
      background-color: #ffffff;
      >.right{
        color: red;
      }
    }
    .content{
      background-color: #ffffff;
      display: flex;
      margin-top: 1px;
      font-size: 14px;
      height: 90px;
      padding: 0 6vw;
      >.img{
        width: 22%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      >.contenttext{
        width: 66%;
        padding-top: 14px;
        padding-left: 8px;
        p:nth-of-type(2){
          color: #949494;
        }

      }
      >.price{
        width: 22%;
        display: flex;
        flex-direction: column;
        padding-top: 14px;
        >div{
          text-align: right;
        }
        div:nth-of-type(2){
          color: #949494;
          font-size: 12px;
        }
        div:nth-of-type(2){
          font-size: 12px;
        }
      }
    }
    .foot{
      background-color: #ffffff;
      margin-top: 1px;
      height: 12vw;
      line-height: 12vw;
      padding: 0 6vw;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      .right{
        display: flex;
        align-items: center;
        >div{
          height: 8vw;
          line-height: 8vw;
          width: 18vw;
          border: 1px solid #949494;
          text-align: center;
        }
        >div:nth-of-type(2){
          margin-left: 8px;
          background-color: #ef306e;
          border: none;
          color: #ffffff;
        }
      }

    }
  }
</style>
