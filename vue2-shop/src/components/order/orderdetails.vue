<template lang="html">
  <div class="main">
    <mt-header title="订单详情" icon="search" style="background-color: #1f1f1f;height: 12vw" fixed>
      <router-link :to="{name:'首页'}" slot="left">
        <mt-button icon="back" @click="$router.back();return false;"></mt-button>
      </router-link>
    </mt-header>

    <div style="height: 12vw">

    </div>

    <div class="hintinformation" v-if="formdata.status=='WAIT_BUYER_CONFIRM_GOODS'">
      订单已发货，还剩15天12小时自动确认收货
    </div>
    <div class="hintinformation" v-else-if="formdata.status=='TRADE_FINISHED'">
      您的货物已签收
    </div>

    <div class="goodstate" v-if="formdata.status!='WAIT_BUYER_PAY'">
      <div class="left">
        <div class="goodsimg">
          <img src="../../assets/icon/wuliu.png" style="width: 30px" alt="">
        </div>
        <div class="goodstext" >
          <p v-if="">订单配货中</p>
          <p>您的订单已发货</p>
          <p>您的订单已签收</p>
          <p>2018-12-12 12:12:12</p>
        </div>
      </div>
      <div class="right">
        <img src="../../assets/icon/arrow-r.png" style="width: 14px;" alt="">
      </div>
    </div>

    <div class="goodsaddress">
      <p>{{formdata.buyerName}} {{formdata.mobile}}</p>
      <p>{{formdata.fullAddress}}</p>
    </div>

    <div class="content">
      <div class="delcontent" v-for="item in formdata.skuList">
        <div class="left">
          <div class="goodimg">
            <img :src="item.imageUrl?item.imageUrl[0]:defaultImageUrl" style="height:64px;" alt="">
          </div>
          <div class="goodtext">
            <p>{{item.title}}</p>
            <p>颜色：{{item.skuMap.skuColor}}  尺码：{{item.skuMap.skuSize}}</p>
          </div>
        </div>
        <div class="right">
          <span class="nub">X{{item.quantity}}</span>
          <span class="price">￥{{item.amount}}</span>
          <span class="saleprice" v-if="item.marketPrice"><s>￥{{item.marketPrice}}</s></span>
          <button>申请退款</button>
        </div>
      </div>

      <div class="public">
        <div class="left">
          商品总价
        </div>
        <div class="right">
          3232.00
        </div>
      </div>
      <div class="public">
        <div class="left">
          运费
        </div>
        <div class="right">
          -￥10.00
        </div>
      </div>
      <!--<div class="public">-->
        <!--<div class="left">-->
          <!--圣诞节活动满3000减500-->
        <!--</div>-->
        <!--<div class="right">-->
          <!--—￥500.00-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="public">-->
        <!--<div class="left">-->
          <!--注册新会员满300减80优惠券-->
        <!--</div>-->
        <!--<div class="right">-->
          <!--—￥80.00-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="public especial">-->
        <!--<div class="left">-->
          <!--注册新会员满300减80优惠券-->
        <!--</div>-->
        <!--<div class="right">-->
          <!--—￥80.00-->
        <!--</div>-->
      <!--</div>-->

      <div class="payment">
          <div class="left">
            实付款（含运费）
          </div>
        <div class="right">
          ￥3000.00
        </div>
      </div>
    </div>

    <div class="information" v-if="formdata.status!='WAIT_BUYER_PAY'">
      <div class="pubinformation">
        <div class="left">
          订单号码：{{order.id||order.orderId}}
        </div>
        <div class="right">
          <button>复制</button>
        </div>
      </div>
      <div class="pubinformation">
        <div class="left">
          付款方式：微信支付
        </div>
      </div>
      <div class="pubinformation">
        <div class="left">
          交易流水：{{order.id||order.orderId}}
        </div>
      </div>
      <div class="pubinformation">
        <div class="left">
          创建时间：{{order.id||order.orderId}}
        </div>
      </div>
      <div class="pubinformation ">
        <div class="left">
          付款时间：2018-12-12 12:12:12
        </div>
      </div>
    </div>

    <div class="footer">
      <div v-if="formdata.status!='WAIT_BUYER_CONFIRM_GOODS'">
        <button>申请退款</button>
        <button>联系客服</button>
      </div>

      <div v-if="formdata.status=='WAIT_BUYER_CONFIRM_GOODS'">
        <button style="color:#ef306e;border: 1px solid #ef306e">付款</button>
        <button>联系客服</button>
      </div>

      <div v-if="isseliver=='none'" >
        <button>申请退款</button>
        <button>联系客服</button>
        <button style="color:#ef306e">查看物流</button>
        <button style="color:#ef306e">确认收货</button>
      </div>
    </div>
  </div>

</template>

<script>
  // import catdetail from 'catdetaillogistics.vue';

  //WAIT_BUYER_PAY           待付款
  //WAIT_BUYER_CONFIRM_GOODS   待收货
  //TRADE_FINISHED     已完成
  //TRADE_CANCE   已取消


  export default {
    components:{
        // 'v-catdetail':catdetail
    },
    props:[],
    data() {
      return {
        isseliver: 'has',
        formdata:'',
        order:{}
      }

    },
    created:function () {
      this.$api({
        method:'get',
        url:'order/user/detail',
        params:{orderId:this.$route.params.id}
      }).then(response=>{
        this.order = response.data.data
        //这里进颜色和尺码的确定
        var unique = {}
        var skuColor = []
        var skuSize = []
        if(this.order.skuList){
        this.order.skuList.forEach(function(item,index) {
          item.skuFeatures.forEach(function(sku) {
            var name = sku.name
            var text = sku.value[0]
            if(name=='颜色'){
              if(!unique[text]){
                skuColor.push(text)
              }
            }else if(name=='尺寸'){
              if(!unique[text]){
                skuSize.push(text)
              }
            }
          })
          this.order.skuList[index].skuMap = {skuColor:skuColor,skuSize:skuSize}
        })
        }
      });
    },
    mounted:function () {

    },
    computed:{

    },
    methods:{

    }
  }
</script>

<style lang="less" scoped>
  @import "./../../assets/fz.less";

  .main{
    background-color: #eeeeee;
    height: 100%;
    .hintinformation{
      font-size: 12px;
      padding: 3px 20px;
    }

    .goodstate{
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #ffffff;
      padding: 6px 20px;
      .left{
        display: flex;
        align-items: center;
        .goodstext{
          margin-left: 10px;
          font-size: 14px;
          p:nth-of-type(2){
            color: #adb1b2;
          }

        }
      }


    }

    .goodsaddress{
      background-color: #ffffff;
      margin-top: 10px;
      padding: 6px 20px;
      p:nth-of-type(1){
        font-size: 14px;
      }
      p:nth-of-type(2){
        font-size: 12px;
        color: #adb1b2;
      }
    }

    .content{
      background-color: #ffffff;
      padding: 10px 20px;
      padding-bottom: 0;
      margin-top: 10px;
      .delcontent{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 10px;
        background-color: #eeeeee;
        .left{
          display: flex;
          .goodtext{
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            margin-left: 8px;
            padding: 6px 0;
            p:nth-of-type(1){
              font-size: 14px;
            }
            p:nth-of-type(2){
              font-size: 12px;
              color: #adb1b2;
            }
          }
        }
        .right{
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          .nub{
            font-size: 12px;
            color: #adb1b2;
          }
          .price{
            font-size: 14px;
          }
          .saleprice{
            font-size: 12px;
            color: #adb1b2;
          }
          button{
            outline: none;
            padding: 2px 4px;
            background-color: #ffffff;
          }
        }
      }


      .public{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        margin-top: 11px;
        .right{
          color: #adb1b2;
        }
      }
      .especial{
        margin-bottom: 20px;
      }


      .payment{
        display: flex;
        justify-content: space-between;
        height: 35px;
        line-height: 35px;
        font-size: 14px;
        border-top: 1px solid #adb1b2;
        .right{
          color: #ef306e;
        }

      }
    }

    .information{
      padding: 15px 20px;
      background-color: #ffffff;
      margin-top: 10px;
      .pubinformation{
        margin-bottom: 2px;
        color: #adb1b2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 13px;
        .right{
          button{
            outline: none;
            border: 1px solid #adb1b2;
            padding: 1px 8px;
            background-color: #ffffff;
            font-size: 12px;
          }
        }
      }
    }

    .footer{
      padding: 0 20px;
      display: flex;
      justify-content: flex-end;
      height: 35px;
      line-height: 35px;
      background-color: #ffffff;
      margin-top: 10px;
      position: fixed;
      left: 0;
      bottom: 0;
      right: 0;
      button{
        outline: none;
        border: 1px solid #adb1b2;
        padding: 0 4px;
        background-color: #ffffff;

      }
    }

  }
</style>
