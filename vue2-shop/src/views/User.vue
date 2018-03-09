<template lang="html">

  <div class="car">
    <mt-header title="我的中心" icon="search" style="background-color: #1f1f1f;height: 12vw" fixed>
      <router-link :to="{name:'首页'}" slot="left">
        <mt-button icon="back" ></mt-button>
      </router-link>
    </mt-header>

      <header class="header" @click='goPersonal'>
        <div class="header-icon">
              <span class="" v-if="!avatarUrl"><img :src="this.defaultImageUrl" alt=""></span>
             <span v-else><img :src="avatarUrl ? avatarUrl : this.defaultImageUrl" alt=""></span>
        </div>
          <span v-if="isreg==='none'">登录/注册</span>
        <div v-if="isreg==='has'" class="reg">
          <span>{{nickname}}</span>
          <div>
            <span>{{whichLevel}}</span>
          </div>
        </div>
      </header>
      <div class="main">
          <router-link class="my-indent" :to="{ path: '/order/全部'}">
              <span class="my-indent-left">我的订单</span>
              <div class="my-indent-right">
                  <span>全部订单</span>
                  <i class="icon-go"></i>
              </div>
          </router-link>

          <section class="my-pay">
              <router-link :to="{ path: '/order/全部'}">
                  <span><i class="iconfont icon-dingdan"></i></span>
                  <p>全部</p>
              </router-link>
              <router-link :to="{  path: '/order/待付款'}">
                  <span ><i class="iconfont icon-icon-_fukuan"></i></span>
                  <p>待付款</p>
              </router-link>
              <router-link :to="{  path: '/order/待收货'}">
                  <span ><i class="iconfont icon-daishouhuo"></i></span>
                  <p>待收货</p>
              </router-link>
              <router-link :to="{  path: '/order/已完成'}">
                <span ><i class="iconfont icon-yiwancheng"></i></span>
                <p>已完成</p>
              </router-link>
          </section>

          <section class="my-vip">
            <router-link class="my-vip-top ho" :to="{ name: ''}" >
              <div class="my-vip-top-div">
                <span class="icon2-vip">
                    <i class="iconfont icon-liwu"></i>
                </span>
              </div>
              <p>
                <span>收藏的商品</span><i class="icon-go"></i>
              </p>
            </router-link>
          </section>


        <section class="my-vip" v-if="realnameVerfiy===true">
          <router-link class="my-vip-top ho" :to="{ name: '我的邀请码',query:{timeStamp:this.vtimeStamp}}">
            <div class="my-vip-top-div">
                <span class="icon2-vip">
                    <i class="iconfont icon-erweima"></i>
                </span>
            </div>
            <p>
              <span>我的邀请码</span><i class="icon-go"></i>
            </p>
          </router-link>
        </section>

        <section style="margin-top: 3vw;">
          <a class="my-indent" v-if="isshow">
            <span class="my-indent-left" style="color: red" >立即实名认证，邀请好友一起赚钱</span>
            <div class="my-indent-right">
              <span v-if="status==='INIT'||status===''">认证中</span>
              <!--<span v-if="status==='AUDITED'">认证中</span> -->
              <!--<span v-if="status==='REFUSED'">认证失败</span> -->
              <i class="icon-go"></i>
            </div>
          </a> 
          <template v-if="realnameVerfiy===true && type==='STAFF' || type==='LIFE_STYLE_TEACHER' || type==='DESIGNER' ">
            <router-link class="my-indent" :to="{ name: '我的收益'}" v-if="realnameVerfiy===true">
              <span class="my-indent-left" >我的收益</span>
              <div class="my-indent-right">
                <span>查看详情</span>
                <i class="icon-go"></i>
              </div>
            </router-link>
            <router-link
              class="my-indent" :to="{ name: ''}"
              style="height: 20vw;"
              v-if="realnameVerfiy===true">
              <div style="line-height: 10vw;text-align: center">
                <p style="color: red" >{{amountData.cashAmount?amountData.cashAmount:0}}</p>
                <p>可提取现金</p>
              </div>
              <div style="line-height: 10vw;text-align: center">
                <p style="color: red">{{amountData.unSettleAmount?amountData.unSettleAmount:0}}</p>
                <p>待收益现金</p>
              </div>
              <div style="line-height: 10vw;text-align: center">
                <p style="color: red">{{amountData.totalAmount?amountData.totalAmount:0}}</p>
                <p>已提现现金</p>
              </div>
            </router-link>
          </template> <!--判断type类型，STAFF、LIFE_STYLE_TEACHER、DESIGNER三种显示如上，否则如下-->
          <template v-if="realnameVerfiy === true && type ==='VIP' || type==='USER' || type==='OTHER' ">
            <router-link class="my-indent" :to="{ name: '我的积分'}" v-if="realnameVerfiy===true">
              <span class="my-indent-left" >我的积分</span>
              <div class="my-indent-right">
                <span>查看详情</span>
                <i class="icon-go"></i>
              </div>
            </router-link>
            <router-link
              class="my-indent" :to="{ name: ''}"
              style="height: 20vw ;"
              v-if="realnameVerfiy===true">
              <div style="line-height: 10vw;text-align: center">
                <p style="color: red" >{{amountData.cashAmount?amountData.cashAmount:0}}</p>
                <p>我的积分</p>
              </div>
              <div style="line-height: 10vw;text-align: center">
                <p style="color: red">{{amountData.unSettleAmount?amountData.unSettleAmount:0}}</p>
                <p>待收益积分</p>
              </div>
              <div style="line-height: 10vw;text-align: center">
                <p style="color: red">{{amountData.totalAmount?amountData.totalAmount:0}}</p>
                <p>累计收益积分</p>
              </div>
            </router-link>
          </template> <!-- TODO 根据后端接口设置内容 -->
        </section>


          <section class="my-service">
              <router-link class="my-service-top" :to="{ name: '我的优惠券'}">
                  <div>
                    <span >
                        <i class="iconfont icon-youhuiquan"></i>
                    </span>
                  </div>
                  <p>
                    <span>我的优惠券</span><i class="icon-go"></i>
                  </p>
              </router-link>
              <router-link class="my-service-bottom" :to="{ name: '地址管理'}">
                  <div>
                    <span><i class="iconfont icon-dizhi"></i></span>
                  </div>
                  <p>
                    <span>收货地址管理</span><i class="icon-go"></i>
                  </p>
              </router-link><!--
            <router-link class="my-service-bottom" :to="{ name: ''}">
              <div>
                <span ><i class="iconfont icon-huiyuan"></i></span>
              </div>
              <p>
                <span>会员俱乐部</span><i class="icon-go"></i>
              </p>
            </router-link>
            <router-link class="my-service-bottom" :to="{ name: ''}">
              <div>
                <span ><i class="iconfont icon-wenti"></i></span>
              </div>
              <p>
                <span>常见问题</span><i class="icon-go"></i>
              </p>
            </router-link>
            <router-link class="my-service-bottom" :to="{ name: ''}">
              <div>
                <span ><i class="iconfont icon-kefu"></i></span>
              </div>
              <p>
                <span>联系客服</span><i class="icon-go"></i>
              </p>
            </router-link> -->
            <router-link class="my-service-bottom" :to="{name :'退出登录'}">
              <div>
                <span ><i class="iconfont icon-shezhi"></i></span>
              </div>
              <p>
                <span>账户与安全</span><i class="icon-go"></i>
              </p>
            </router-link>
          </section>

      </div>
      <!--<v-baseline></v-baseline>-->
      <v-footer></v-footer>
    </div>
</template>

<script>
  // import * as mockData from '@/http/mock.js' //模拟数据

  import Baseline from '@/common/_baseline.vue'
  import Footer from '@/common/_footer.vue'
  import {getUserProfile} from '@/api/'
  import {Toast} from 'mint-ui';
  import VueCookie from 'vue-cookie';
  
  export default {
    components: {
      'v-baseline': Baseline,
      'v-footer': Footer
    },
    data: function() {
      return {
        ishasauthentication: 'has',
        isreg: 'has',
        showProfile:false,
        avatarUrl:'',
        realnameVerfiy:false,
        nickname:'',
        amountData:'',
        status:'',
        firstEnter:-1,
        whichLevel:'',
        show:'',
        type:'',
        line:'',
        birthDate:'',
        vtimeStamp:Date.parse(new Date())
      }
    },
    methods:{
      unshowProfile() {
        this.showProfile = false;
      },
      goPersonal(){
        this.$router.push({path:'/personal',query:{birth:this.birthDate}})
      }
    },
    computed: {
      isshow(){
        if(this.realnameVerfiy=== true){
          return false
        }else if(this.realnameVerfiy=== false){
        if(this.status ==='AUDITED'){
          //return false
        }else if(this.status ==='INIT') {
          return true
        }else if(this.status ==='REFUSED'){
          return false;
        }
      }
    },
      toRename:function() {
        if(this.status==='AUDITED'||'INIT'){
          Toast({
            message: '实名认证中，请耐心等待',
            position: 'bottom',
            duration: 1000,
            position: 'middle',
          });
        }else{
            this.$router.push({path:'/realnameauth'});
        }

      }
    },
    created(){
      getUserProfile().then(res=>{
        let data=res.data.data;
        //console.log(data);
        if(!data){
          return;
        }
        this.avatarUrl=data.avatarUrl;
        this.realnameVerfiy=data.realnameVerfiy;
        this.status=data.status;
        this.nickname=data.nickname;
        this.type = data.type;
        this.birthDate = data.birthDate;
        this.$store.commit('SET_USER_PROFILE',data);
        return data.id
        /*if(this.realnameVerfiy){
          if(this.$route.query.time !=-1){
            if(!this.getRealnameVerfiy){ 
               console.log(this.getRealnameVerfiy)      
               //this.$router.push({path:'/Verfiy'})
            }
          }
        } */
      }).then( res =>{
        this.$api({
          url:"vip/vip_level",
          method:"get",
          params:{userId:res}
        }).then( res =>{
          let kind = res.data.data.name;
          switch (kind) {
            case '普卡':
              this.whichLevel = "普通会员"
              break;
            case '银卡':
              this.whichLevel = "银牌会员"
              break;
            case '金卡':
              this.whichLevel = "金牌会员"
              break;
            case '金卡0':
              this.whichLevel = "金牌会员"
              break;
            case '贵宾卡':
              this.whichLevel = "贵宾会员"
              break;
            case '钻石卡':
              this.whichLevel = "钻石会员"
              break;
            case undefined:
              this.whichLevel = "普通会员"
              break;    
          }
        })

      })
      this.$api({
        url: '/order/partner/summary',
        method: 'get'
      }).then(response =>{
        //console.log(response);
        if(response.data.code==="2000"){
          if(response.data.data!=null>0){
            this.amountData = response.data.data;
          }
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  @import '../assets/fz.less';
  @import '../assets/index/style.css';
  @import '../assets/user/icon/carstyle.css';
  @import '../assets/user/icon/fonts1/iconfont.css';
  @import '../assets/user/icon/fonts3/myStyle.css';


  .car {
    margin-top: 12vw;
    width: 100%;
    padding-bottom: 14vw;
    background-color: #f4f4f4;
    .header {
      width: 100%;
      height: 16vw;
      /*background: url(../../static/carbg.png) center 0 #f37d0f;*/
      background-size: auto 100%;
      background-color: #ffffff;
      padding: 3.2vw 0;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      .reg{
        margin-left: 10px;
        display: flex;
        flex-direction: column;
      }
      .signout{
        margin-left: 130px;
        background-color:#EEE;
      }
      .header-icon {
        border: .4vw solid #ffffff;
        background-color: @cl;
        margin-left: 4vw;
        -webkit-box-sizing: border-box;
              box-sizing: border-box;
        width: 14vw;
        height: 14vw;
        line-height: 16vw;
        text-align: center;
        border-radius: 50%;
        span {
          .fz(font-size, 54);
          &::before {
            color: #ffffff;
          }
          img{
            width: 14vw;
            height: 14vw;
            margin-top: -16px;
          }
        }
      }
      >span {
        margin-left: 3.2vw;
        .fz(font-size, 30);
        color: #ffffff;
        letter-spacing: .2vw;
      }
    }
    .main {
      width: 100%;
      margin-top: 4vw;
      .my-indent {
        width: 100%;
        display: block;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #333;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        padding: 0 5vw;
        height: 15vw;
        line-height: 15vw;
        background-color: #fff;
        .bd();
        &:active {
          background-color: rgb(224, 227, 230)
        }

        .my-indent-right {
          span {
            display: inline-block;
            .fz(font-size, 28);
            color: rgba(0, 0, 0, .4);
            position: relative;
          }
          i {
            position: relative;
            top: .8vw;
          }
        }
      }

      .my-pay {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        padding: 2vw 0;
        background-color: #fff;
        .bd();

        >a {
          display: block;
          width: 33.33%;
          color: #999;
          text-align: center;

          >span {
            .fz(font-size, 50);
            margin-top: 2.3vw;
            display: block;
            text-align: center;
          }

          p {
            padding: 2.3vw 0;
            text-align: center;
          }
        }
      }

      .my-vip,.my-service,.my-settle {
        width: 100%;
        .mt();
        .bd();
        .bt();
        >a {
          background-color: #fff;
          display: block;
          width: 100%;
          display: -ms-flex;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          height: 15vw;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          -webkit-box-pack: justify;
              -ms-flex-pack: justify;
                  justify-content: space-between;
          padding: 0 6vw;
          -webkit-box-sizing: border-box;
                  box-sizing: border-box;
          &:active {
            background-color: rgb(224, 227, 230);
          }
          >div {
            -ms-flex: 2;
            -webkit-box-flex: 2;
                    flex: 2;
                    padding-top: 1.3vw;
          }

          .my-vip-top-div {
            padding-top: 0;
          }
          >p {
            -ms-flex: 10;
            -webkit-box-flex: 10;
                    flex: 10;
            position: relative;

            &:active {
              background-color: rgb(224, 227, 230);
            }

            i {
              position: absolute;
              right: 0;
              top: .4vw;
            }
          }
        }

      }
    }
  }
  /*图标大小不一，重新定义*/

  .icon-go {
    .fz(font-size, 36);
    &::before {
      color: #aba8a8;
    }
  }

  [class^="icon2-"],
  [class*=" icon2-"] {
    .fz(font-size, 50);
  }

  .icon2-service {
    .fz(font-size, 34);
  }

</style>
