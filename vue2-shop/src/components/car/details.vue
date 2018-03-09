<template lang="html">
  <div class="main">
    <div class="inner">
      <img src="./../../assets/icon/details.jpg" alt="" style="width: 100%">
      <div>

      </div>
    </div>

    <div class="outcon">
      <div class="colse">
        <div>
          <div>
            <img src="./../../assets/icon/details.jpg" alt="" style="width: 90px">
          </div>
          <div>
            <p style="font-size: 6px">及膝连衣裙</p>
            <p style="margin-top: 10px;color: #ed175d;">￥24244.00</p>
          </div>
        </div>
        <div class="imgclose">
          <img src="./../../assets/icon/close.png" alt="" style="width: 25px;height: 25px">
        </div>
      </div>

      <div class="color">
        <div style="font-size: 14px;">
          颜色
        </div>
        <div class="delcolor">
          <div>黑色</div>
          <div class="active" style="background-color:#ed145b;">珊瑚红</div>
          <div>深藏青</div>
        </div>
      </div>

      <div class="size">
        <div>
          尺码
        </div>
        <div class="desize">
          <div>
            38
          </div>
          <div class="active">
            38
          </div>
          <div>
            38
          </div>
          <div>
            38
          </div>
          <div>
            38
          </div>
        </div>
      </div>

      <div class="nub">
        <div class="title">
          数量
        </div>
        <div class="denub">
          <v-nub></v-nub>
        </div>a
      </div>
    </div>

    <!--<div class="footer">-->
      <!--<div class="left">-->
        <!--<div class="kefu">-->
          <!--<div>-->
            <!--<img src="./../../assets/icon/icon-substitutepay.png" alt="">-->
          <!--</div>-->
          <!--<div>-->
            <!--客服-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="shopcar">-->
          <!--<div>-->
            <!--<img src="./../../assets/icon/icon-substitutepay.png" alt="">-->
          <!--</div>-->
          <!--<div>-->
            <!--购物车-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="right">-->
        <!--<div class="tocar">-->
          <!--加入购物车-->
        <!--</div>-->
        <!--<div class="pay">-->
          <!--立即购买-->
        <!--</div>-->
      <!--</div>-->

    <!--</div>-->
    <v-footer></v-footer>
  </div>

</template>

<script>
import nub from './num.vue'
import footer from '../../common/car_footer.vue'

  export default {
    components:{
      'v-nub': nub,
      'v-footer': footer
    },
    props:[],
    data() {
      return {

      }

    }
  }
</script>

<style lang="less" scoped>
*{
  box-sizing: border-box;
}
  .main{
    width: 100%;
    position: relative;
    box-sizing: border-box;
    .inner{
      position: relative;
      >div{
        background-color: rgba(0,0,0,0.4);
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .outcon{
      position: absolute;
      box-sizing: border-box;
      left: 0;
      top: 260px;
      width: 100%;
      padding: 2vw 3vw;
      background-color: #ffffff;
      .colse{
        display: flex;
        justify-content: space-between;
        height: 70px;
        >div:nth-of-type(1){
          display: flex;
          align-items: center;
          >div:nth-of-type(1){
            margin-top: -50px;
          }
          >div:nth-of-type(2){
            margin-left: 12px;
          }
        }
        .imgclose{
          margin-top: 10px;
        }
      }

      .color{
        margin-top: 14px;
        .delcolor{
          display: flex;
          margin-top: 12px;
          padding-bottom: 20px;
          border-bottom: 1px solid #dddddd;
          div{
            height: 21px;
            padding: 0 14px;
            font-size: 14px;
            border: 1px solid #000000;
            margin-right: 10px;
          }
          div.active{
            border: none;
            color: #ffffff;
          }
        }
      }

      .size{
        margin-top: 14px;
        .desize{
          display: flex;
          margin-top: 12px;
          padding-bottom: 20px;
          border-bottom: 1px solid #dddddd;
          div{
            height: 21px;
            padding: 0 14px;
            font-size: 14px;
            border: 1px solid #dddddd;
            margin-right: 10px;
          }
          div.active{
            background-color: #ed145b;
            border: none;
            color: #ffffff;
          }
        }
      }

      .nub{
        margin-top: 14px;
        .title{
          margin-bottom: 12px;
        }
      }
    }

    .footer{
      position: fixed;
      left: 0;
      bottom: 0;
      height: 60px;
      width: 100%;
      display: flex;
      .left{
        display: flex;
        border-top: 1px solid #dddddd;
        padding-top: 6px;
        width: 40%;
        .kefu{
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 50%;
          font-size: 12px;
        }
        .shopcar{
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 50%;
          font-size: 12px;
        }
      }
      .right{
        width: 60%;
        display: flex;
        text-align: center;
        height: 60px;
        line-height: 60px;
        .tocar{
          width: 50%;
          background-color: #000000;
          color: #ffffff;
        }
        .pay{
          width: 50%;
          background-color: #000000;
          color: #ffffff;
          margin-left: 2px;
        }
      }

    }
  }
</style>
