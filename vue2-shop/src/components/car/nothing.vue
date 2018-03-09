<template lang="html">

  <div class="nothing">
    <!--<v-gologin v-if="hasLogin"></v-gologin>-->
    <div class="nothing-img">
      <img src="../../assets/icon/cart_empty@2x.png" alt="" style="width: 140px">
    </div>
    <div class="nothing-toshop">
      <p>您的购物车中还没有商品</p>
      <router-link :to="{path:'/productList/search/衣服'}">去逛逛</router-link>
    </div>
  </div>


</template>

<script>
import Gologin from '@/components/car/gologin.vue'
export default {
  components: {
    'v-gologin': Gologin
  },
  computed:{
    hasLogin:function() {
      return 'dd'
    }
  }
}
</script>

<style lang="less" scoped>
  .nothing {
    width: 100%;
    text-align: center;
    .nothing-img {
      text-align: center;
      margin-top: 40vw;
      /*background-color: rgba(251, 240, 217,0.3);*/

    }
    .nothing-toshop {
      display: -webkit-flex;
      display: -ms-flex;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 2vw 6vw;
      align-items: center;

      /*background-color: rgba(244, 244, 244, 0.3);*/
      &:active {
        background-color: #f2f2f2;
      }
        p{
          font-size: 12px;
          margin-top: 3vw;
        }
       a {
         padding:1vw 6vw;
         background-color: #000000;
         border-radius: 1.5vw;
         color:#fff;
         margin-top: 2vw;
       }
    }
  }
</style>
