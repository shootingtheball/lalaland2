<template lang="html">
  <div class="main">
    <mt-header title="查看物流" icon="search" style="background-color: #1f1f1f;">
      <router-link :to="{name:'首页'}" slot="left">
        <mt-button icon="back" @click="$router.back();return false;"></mt-button>
      </router-link>
    </mt-header>

    <div class="hintinformation">
        共7个包裹
    </div>


    <div class="logisticscontent">
        <div class="top">
          申通快递：2342424233
        </div>
      <div class="btm">
        <div>
          <img src="../../assets/icon/产品图1.jpg" style="height: 65px" alt="">
        </div>
        <div>
          <p>XIAO STUDIOS腰裤双排扣双面呢大</p>
          <P>北京-北京市-朝阳区-XXX小区—XXX楼-XX单元XXX</P>
          <P>已签收</P>
        </div>
      </div>
    </div>
    <div class="logisticscontent">
      <div class="top">
        申通快递：2342424233
      </div>
      <div class="btm">
        <div>
          <img src="../../assets/icon/产品图1.jpg" style="height: 65px" alt="">
        </div>
        <div>
          <p>XIAO STUDIOS腰裤双排扣双面呢大</p>
          <P>北京-北京市-朝阳区-XXX小区—XXX楼-XX单元XXX</P>
          <P>已签收</P>
        </div>
      </div>
    </div>
    <div class="logisticscontent">
      <div class="top">
        申通快递：2342424233
      </div>
      <div class="btm">
        <div>
          <img src="../../assets/icon/产品图1.jpg" style="height: 65px" alt="">
        </div>
        <div>
          <p>XIAO STUDIOS腰裤双排扣双面呢大</p>
          <P>北京-北京市-朝阳区-XXX小区—XXX楼-XX单元XXX</P>
          <P>已签收</P>
        </div>
      </div>
    </div>
    <div class="logisticscontent">
      <div class="top">
        申通快递：2342424233
      </div>
      <div class="btm">
        <div>
          <img src="../../assets/icon/产品图1.jpg" style="height: 65px" alt="">
        </div>
        <div>
          <p>XIAO STUDIOS腰裤双排扣双面呢大</p>
          <P>北京-北京市-朝阳区-XXX小区—XXX楼-XX单元XXX</P>
          <P>已签收</P>
        </div>
      </div>
    </div>
    <div class="logisticscontent">
      <div class="top">
        申通快递：2342424233
      </div>
      <div class="btm">
        <div>
          <img src="../../assets/icon/产品图1.jpg" style="height: 65px" alt="">
        </div>
        <div>
          <p>XIAO STUDIOS腰裤双排扣双面呢大</p>
          <P>北京-北京市-朝阳区-XXX小区—XXX楼-XX单元XXX</P>
          <P>已签收</P>
        </div>
      </div>
    </div>
    <div class="logisticscontent">
      <div class="top">
        申通快递：2342424233
      </div>
      <div class="btm">
        <div>
          <img src="../../assets/icon/产品图1.jpg" style="height: 65px" alt="">
        </div>
        <div>
          <p>XIAO STUDIOS腰裤双排扣双面呢大</p>
          <P>北京-北京市-朝阳区-XXX小区—XXX楼-XX单元XXX</P>
          <P>已签收</P>
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

      }

    },
    created:function () {

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
      padding: 0 20px;
      height: 24px;
      line-height: 24px;
      font-size: 12px;
    }
    .logisticscontent{
      margin-bottom: 10px;
      padding: 10px 20px;
      background-color: #ffffff;
      .top{
        color: #adb1b2;
        font-size: 14px;
      }
      .btm{
        margin-top: 8px;
        display: flex;
        align-items: center;
        P:nth-of-type(1){
          font-size: 16px;
        }
        P:nth-of-type(2){
          font-size: 12px;
          color: #adb1b2;
        }
        P:nth-of-type(3){
          font-size: 12px;
          color: #ef306e;
        }
      }
    }

  }
</style>
