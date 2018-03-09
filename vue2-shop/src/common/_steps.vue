<template lang="html">
  <div class="main">

    <div class="maincontent" v-for="k in remotedata">
      <div class="content" v-if="k.esp=='esp'">
        <div class="left">
          <p>2018-12-12</p>
          <p>12:12:12</p>
        </div>
        <div class="middle">
          <div class="img">

          </div>
          <div class="stepline">

          </div>
        </div>
        <div class="right">
          <p>已签收</p>
          <p>已签收</p>
        </div>
      </div>

      <div class="content" v-if="k.esp=='nor'">
        <div class="left especial">
          <p>2018-12-12</p>
          <p>12:12:12</p>
        </div>
        <div class="middle">
          <div class="img">

          </div>
          <div class="stepline">

          </div>
        </div>
        <div class="right">
          <p></p>
          <p>已签收</p>
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
        remotedata:[{esp:'nor'},{esp:'nor'},{esp:'esp'}]
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
  @import "./../assets/fz.less";

  .main{
    width: 100%;
    background-color: #ffffff;
    .maincontent{
      .content{
        display: flex;
        align-items: flex-start;
        overflow: hidden;
        padding-bottom: 20px;
        .left{
          width: 25%;
          text-align: right;
          font-size: 12px;
          p:nth-of-type(1){
            font-size: 14px;
          }
        }
        .especial{
          p:nth-of-type(1){
            font-size: 12px;
          }
        }
        .middle{
          height: 100%;
          position: relative;
          .img{
            position: relative;
            z-index: 100;
            width: 32px;
            height: 32px;
            margin-top: -8px;
            background: url("../assets/icon/cf.svg") no-repeat center center/50% 50%;
          }
          .stepline{
            height: 100px;
            width: 2px;
            background-color: #bcbcbc;
            position: absolute;
            z-index: 99;
            top: 12px;
            left: 15px;
          }
        }
        .right{
          p:nth-of-type(1){
            font-size: 14px;
          }
          p:nth-of-type(2){
            font-size: 12px;
          }
        }
      }
    }
    .maincontent:nth-of-type(1) .content{
      color: #eea74f;
    }

  }
</style>
