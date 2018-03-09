<template lang="html">
  <div class="main">
    <mt-header title="订单详情" icon="search" style="background-color: #1f1f1f;">
      <router-link :to="{name:'首页'}" slot="left">
        <mt-button icon="back" @click="$router.back();return false;"></mt-button>
      </router-link>
    </mt-header>

    <div class="good">
      <div class="left">
        <img src="../../assets/icon/产品图1.jpg" style="height: 65px" alt="">
      </div>
      <div class="right">
        <div style="font-size: 16px">已发货</div>
        <div style="font-size: 12px">顺丰快递</div>
        <div class="ordernub">
          <span>242424223</span>
          <button>复制</button>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="address">
        <div>
          <img src="../../assets/icon/icon-substitutepay.png" alt="">
        </div>

        <span>【收货地址】北京-北京市-朝阳区-XXX小区—XXX楼-XX单元XXX</span>
      </div>


      <div class="step">
        <v-step></v-step>
      </div>

    </div>
  </div>

</template>

<script>
  import step from '@/common/_steps'

  export default {
    components:{
      'v-step':step
    },
    props:[],
    data() {
      return {
        isseliver: 'has'
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
    .good{
      padding:10px 20PX;
      background-color: #ffffff;
      display: flex;
      .left{

      }
      .right{
        display: flex;
        flex-direction: column;
        .ordernub{
          display: flex;
          width: 70vw;
          justify-content: space-between;
          align-items: center;
          span{
            font-size: 12px;
          }
          button{
            outline: none;
            font-size: 12px;
            background-color: #ffffff;
            padding: 0 8px;
            border: 1px solid #adb1b2;
          }
        }
      }
    }

    .content{
      background-color: #ffffff;
      margin-top: 10px;
      width: 100%;
      .address{
        display: flex;
        align-items: flex-start;
        padding: 8px 20px;
        margin-bottom: 20px;
        span{
          font-size: 12px;
          color: #eea74f;
        }
      }

      .step{
        padding: 0px 20px;
        background-color: #ffffff;
      }
    }

  }
</style>
