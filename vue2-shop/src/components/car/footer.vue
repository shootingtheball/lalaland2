<template lang="html">
  <footer class="footer">

    <div class="footer-result">
      <div class="something-left" >
        <label class="true" :class="{false:checkall}" >
          <input type="checkbox" style="margin-right: 8px" @click="selectall">
          全选
        </label>
      </div>
    </div>
    <div class="total">
      <!--<p>共{{count}}件 </p>-->
      <!--<p><span>金额：{{allpay}} </span>元</p>-->
      <p>合计：{{allpay}}</p>
    </div>
    <a class="footer-pay" @click="goPay" :class="{act:isselect}">
      结算
    </a>
  </footer>

</template>

<script>

export default {
  computed:{
    isselect(){
      if (this.$store.state.detail.carList == "") {
        this.$store.commit('RESET_CARLIST')
      };

     for(var i = 0;i<this.$store.state.detail.carList.length;i++){
       if(this.$store.state.detail.carList[i].choseBool==true){
         console.log('has')
         return true
         break
       }
     }
     console.log('none')
     return false
    },
    // 勾选的商品数量
    count(){
      // 如果已选择列表为空 就返回0
      if(this.$store.getters.selectedList==undefined) {
        return 0
      }else {
        return this.$store.getters.selectedList.length
      }
    },
    checkall(){
      console.log(this.$store.state.detail.carList )
      if(this.$store.state.detail.carList!=null&&this.$store.state.detail.carList.length!=0){
        if(this.$store.getters.unSelectedList==undefined||this.$store.getters.unSelectedList.length==0) {
          return false
        }
      }


      return true
    },
    //勾选的商品的价格总和
    allpay(){
      let all = 0;
      // 如果有勾选商品,计算总价格
      if(this.$store.state.detail.carList!=null&&this.$store.state.detail.carList.length!=0){
        if(this.$store.getters.selectedList) {
          for (let i = 0; i < this.$store.getters.selectedList.length; i++) {
            all += this.$store.getters.selectedList[i].price*this.$store.getters.selectedList[i].nub;
          }
        }
      }

      // 没有勾选 即为0
      return all

    }
  },

  methods:{
    selectall:function(){
      if(this.$store.state.detail.carList){
        this.$store.commit('SELECT_ALL');
        this.$store.dispatch('setSelectedList');
      }

    },
    //点击跳转到支付页
    goPay(){

        // 如果有选择商品才能跳转
        if(this.$store.getters.selectedList.length) {
          // 保存+缓存选择的商品 ,在支付页能用到
          this.$store.dispatch('setSelectedList')
          this.$router.push({name:'订单确认',query:{pay:'notPayimmediate'}})


      } else {

        alert('你还没选择商品')

      }

    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/fz.less';
*{
  box-sizing: border-box;
}
  .footer {
    width: 100%;
    height: 16vw;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    .footer-result,a {
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      text-align: center;
    }

    .footer-result {

      .something-left {
        vertical-align: center;
        label {
          float: left;
          background: url("../../assets/car/images/tr.svg") no-repeat center center/50% 50%;
          input {
            height: 14vw;
            width: 14vw;
            opacity: 0;
            filter: alpha(opacity=0);
          }
        }
        .false {
          background: url("../../assets/car/images/f.svg") no-repeat center center /50% 50%!important;
        }

      }
      p {
        .fz(font-size,24);
        color: #999;
      }

      p:last-of-type {

        padding: 1vw 0 0 1vw;
        span {
          color:@cl;
          .fz(font-size,42);
        }
      }
    }
    .total{
      padding-right: 8px;
    }
    .footer-goon {
      background-color: #F4F4F4;
      line-height: 16vw;
    }

    .footer-pay {
      background-color: #999999;
      line-height: 16vw;
      color:#fff;
      width: 50px;
    }
    a.act{
      background-color: #ed145b;
    }
  }
</style>
