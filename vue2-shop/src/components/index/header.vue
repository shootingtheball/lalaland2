<template lang="html">

  <!--<mt-header  style="background-color: #1f1f1f;" fixed>-->
    <!--<router-link :to="{name:'分类页'}" slot="left">-->
      <!--<mt-button ><img src="./../../assets/icon/多选.png" alt="" style="width: 24px;"></mt-button>-->
    <!--</router-link>-->

    <!--<h1 slot="title"><img src="../../assets/icon/logo@2x.png" alt=""></h1>-->
  <!--<router-link :to="{name:''}" slot="right">-->
    <!--<mt-button class="qrcode">-->
      <!--<p><img src="../../assets/icon/icon_QR-code@2x.png" style="width: 20px" alt=""></p>-->
      <!--<p style="font-size: 12px">邀请码</p>-->
    <!--</mt-button>-->
  <!--</router-link>-->
<!--</mt-header>-->
  <header>
    <div class="left">
      <router-link :to="{name:'分类页'}" slot="left">
      <img src="./../../assets/icon/多选.png" alt="" style="width: 24px;">
      </router-link>
    </div>
    <div class="title">
      <img src="../../assets/icon/logo@2x.png" style="width: 40px" alt="">
    </div>
    <div class="right">
      <router-link :to="{name:'邀请二维码'}" slot="right">
        <img src="../../assets/icon/icon_QR-code@2x.png" style="width: 20px" alt="">
        <span style="font-size: 8px;color: #ffffff">邀请码</span>
      </router-link>
    </div>
  </header>

</template>

<script>
export default {components: {

}}
</script>

<style lang="less" scoped>
@import '../../assets/fz.less';
@import '../../assets/index/style.css';
.mint-header {
  /*margin-bottom: 200px;*/
  height: 12vw;
    background-color: #fff;
    color: #ffffff!important;
    .fz(font-size, 40)!important;

}

  header{
    background-color: #000000;
    position: fixed;
    z-index: 100;
    top:0;
    left: 0;
    right: 0;
    height: 12vw;
    display: flex;
    justify-content: space-between;
    >div >a{
      background-color: #000000;
    }
    >div{
      height: 12vw;
      display: flex;
      width: 10vw;
      align-items: center;
      justify-content: center;
    }
    .right{
      padding-right: 10px;
      width: 55px;
      a{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;

      }
    }
  }
</style>
