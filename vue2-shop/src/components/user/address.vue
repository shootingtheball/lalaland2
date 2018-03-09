<template lang="html">
  <div class="main">
    <mt-header title="管理收货地址" icon="search" style="background-color: #1f1f1f;height: 12vw;" fixed>
      <router-link :to="{name:'首页'}" slot="left">
        <mt-button icon="back" @click="$router.back();return false;"></mt-button>
      </router-link>
    </mt-header>
    <div style="height: 12vw;width: 100%">

    </div>
    <div class="content" v-for="address in adressdata" v-if="adressdata[0].fullAddress" @click="selectAddress(address)">
      <div class="delcontent">
        <div class="left">
          <div class="info">
            <span class="name">
              {{address.username}}
            </span>
            <span class="mobile">
              {{address.mobile}}
            </span>
          </div>
          <div class="address">{{address.fullAddress}}X</div>
        </div>
        <div class="right">
          <!--<img src="./../../assets/icon/arrow-r.png" alt=""> -->
        </div>
      </div>
      <div class="bottom">
        <div class="left">
          <!--
          <div class="unchoose" @click='choose'>
            <span><img src="../../assets/icon/choose.png"></img></span>
            <span>设为默认</span>
          </div> -->
        </div>
        <div class="right">
          <router-link :to="{name:'编辑地址', params:{addressId:address.id}}">
            <a href="javascript:void(0)">
              <img src="../../assets/icon/edit.png" style="width: 18px" alt="">
              <span>编辑</span>
            </a>
          </router-link>
          <a href="javascript:void(0)" @click="cancel(address)">
            <img src="../../assets/icon/del.png" style="width: 18px" alt="">
            <span>删除</span>
          </a>
        </div>
      </div>
    </div>




    <div class="addaddress">
      <router-link :to="{name:'添加地址'}">
        添加新的收货地址
      </router-link>
    </div>
  </div>

</template>

<script>


  export default {
    components:{

    },
    props:['datas'],
    data() {
      return {
        adressdata:[
          {
            fullAddress:'',
            id:'',
            username:'',
            mobile: ''
          }]
      }

    },
    created:function (){
      this.$api({
        url: '/user_address/list',
        method: 'get'
      }).then(response =>{
        this.adressdata = response.data.data
        console.log(this.adressdata)
      })
    },
    methods:{
      selectAddress:function(data){
        //判断是否来自订单页
        if(this.$store.state.detail.isFromConfrimOrder){
          this.$store.commit('ADDADDRESS',data);
          this.$store.commit('CHANGEFROMCONFFIMORDER',false);
          this.$router.push({path:'/confirmorder',query:{pay:this.$route.query.pay}});
          }else{
        }
      },
      cancel(address) {
         console.log(address.id)
       this.$api({
         url:"/user_address/remove_by_id?id="+address.id
       }).then(res => {
         console.log(res)
       })
      },
      choose(){

      }
    }
  }
</script>

<style lang="less" scoped>
@import "./../../assets/fz.less";

  .main{
    background-color: #dcdcdc;
    min-height: 100%;
    .content{
      background-color: #ffffff;
      margin-bottom: 2vw;
      .delcontent{
        padding: 2vw 3vw;
        margin-bottom: 2px;
        border-bottom: 1px solid #dcdcdc;
        .left{
          font-size: 14px;
          .info{
            position: relative;
            font-size: 18px;
          }
          .mobile{
            float: right;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translate(0,-50%)
          }
          .address{
            font-size: 12px;
            margin-top: 2vw;
          }
        }
        .right{
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .bottom{
        display: flex;
        justify-content: space-between;
        height: 8vw;
        align-items: center;
        padding-left: 3vw;
        padding-right: 4vw;
        font-size: 14px;
        .unchoose img{
          width: 15px
        }
        .unchoose span{
          color : #FF4500
        }
        .right{
          text-align: center;
        }
      }
    }
    .addaddress{
      width: 100%;
      text-align: center;
      margin-top: 30px;
      a{
        background-color: #000000;
        color: #ffffff;
        padding: 8px 13px;
      }
    }
  }

</style>
