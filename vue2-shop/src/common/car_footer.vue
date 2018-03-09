<template lang="html">
  <div class="main">


    <div class="vfooter">
      <div class="left">
        <div class="kefu">
          <div>
            <img src="./../assets/icon/icon_service@2x.png" style="width: 26px" alt="">
          </div>
          <div>
            客服
          </div>
        </div>
        <div class="shopcar" @click="toshopcar">
          <div>
            <mt-badge type="error" size="small" class="badges">{{getBadgenub}}</mt-badge>
            <img src="./../assets/icon/icon_cart@2x.png" style="width: 26px" alt="">
          </div>
          <div>
            购物车
          </div>
        </div>
      </div>
      <div class="right">
        <div class="tocar" @click="tocar">
          加入购物车
        </div>
        <div class="pay" @click="topayim">
          立即购买
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
        badgenub: 0
      }
    },
    created:function(){
      // this.$store.commit('CHANGE_COUNT');
      this.$store.dispatch('upDataNub');
      this.badgenub = this.$store.state.detail.count || 0;

      //更新版本后有可能报错
      /*this.$on('hehe',function(data){
        this.$store.dispatch('upDataNub');
        this.badgenub = this.$store.state.detail.count || 0;
      }); */
    },
    computed:{
      getBadgenub() {
        this.badgenub = this.$store.state.detail.count || 0;
        return this.badgenub 
      }
    },
    methods:{
      tocar:function(){
        this.$emit('toshow');
        this.$emit('tocars');
      },
      topayim:function(){
        this.$emit('immediatepay');
      },
      carnum:function(data){
        console.log("data"+data);
      },
      toshopcar:function(){
        this.$router.push({path:'/car'});
      }
    }
  }
</script>

<style lang="less" scoped>
  *{
    box-sizing: border-box;
  }
  .main{


    .vfooter{
      position: fixed;
      z-index: 100;
      left: 0;
      bottom: 0;
      height: 60px;
      width: 100%;
      display: flex;
      background-color: #ffffff;
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
          position: relative;
          .badges{
            position: absolute;
            right: 10px;
            top: -4px;
          }
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
