<template lang="html">

    <div class="car">
      <!-- slot分发内容 让子组件混合父组件的内容 -->
      <v-header>
        <h1 slot="title">购物车</h1>
      </v-header>
      <!-- 根据购物车是否有商品加载不同的组件 -->
      <v-something v-if="show" class="something"></v-something>
      <v-nothing v-else></v-nothing>
      <v-footer v-if="show" class="footer"></v-footer>
      <v-bottomBar></v-bottomBar>
    </div>
</template>

<script>
import Header from '@/common/_header.vue'
import Nothing from '@/components/car/nothing.vue'
import Something from '@/components/car/something.vue'
import Footer from '@/components/car/footer.vue'
import bottomBar from '@/common/_footer.vue'

export default {
  components:{
    'v-header':Header,
    'v-nothing':Nothing,
    'v-something':Something,
    'v-footer':Footer,
    'v-bottomBar':bottomBar
  },
  computed:{
    count(){
      return this.$store.state.detail.count
    },
    show(){
      if(this.$store.state.detail.carList==null||this.$store.state.detail.carList.length==0){
        return false
      }else{
        return true
      }
    }
  },
  created(){
     if (this.$store.state.detail.carList == "") {
        this.$store.commit('RESET_CARLIST')
     }
     console.log(this.$store.state.detail.carList)
     let arr = this.$store.state.detail.carList;
  },
  beforeRouteLeave(to, from, next) {
    this.$api({
      url:'shoppingcart/add_item',
      method:'get',
      params:{skuId:85899,quantity:4}
    }).then( r =>{
       next();
    })
    
   next();
  }
}
</script>

<style lang="less" scoped>
.car {
  position: relative;
  width: 100%;
  padding-bottom: 14vw;
  padding-top: 12vw;
  .something{
    position: fixed;
    top: 12vw;
    bottom: 30vw;
    overflow:scroll
  }
  .footer{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 14vw;
  }
}
</style>
