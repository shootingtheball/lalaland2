<template lang="html">
  <div class="main">
    <mt-header title="我的邀请码" icon="search" style="background-color: #1f1f1f;height: 12vw" fixed>
      <router-link :to="{name:'首页'}" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="top">
      <div style="margin-top: 4vw">我的专属邀请码</div>
      <div>
        <img :src="qrCodeUrl" style="width: 32vw;" alt="">
      </div>
      <div style="font-size: 12px;color: #676767;text-align: center;">
        <p>好友当面扫描上方二维码</p>
        <p>或者点击邀请好友分享给好友</p>
      </div>
      <div class="rule" style="margin-top: 10px;font-size: 12px" @click=''>
        <router-link :to="{path : '/rule'}">
            规则说明
        </router-link>
        <router-link :to="{ name: ''}" >
            <span @click = 'showMask'>邀请好友</span>
        </router-link>
      </div>
      <div class="mask" v-if='isShowMask' @click='unShowMask'>
        <div v-if="fromwhere">
          <span class="arrow"><i class="iconfont icon-jiantou"></i></span>
          <span class="text">点击右上角邀请</span>
         </div>

        <div v-else>
          <span class="arrow2"><i class="iconfont icon-xiajiantou"></i></span>
          <span class="text2">点击浏览器下方邀请</span>
        </div>
      </div> <!-- 判断不同浏览器，箭头指向不同 -->
    </div>

    <div class="mid">
      我的邀请记录
    </div>

    <!--<div class="content" v-for="item in partnerList">-->
      <!--<div class="user">-->
          <!--<img src="./../assets/icon/icon-substitutepay.png" alt="">-->
          <!--<span>{{item.username}}</span>-->
      <!--</div>-->
      <!--<div class="reg">-->
        <!--{{item.createdTime}}  注册-->
      <!--</div>-->
    <!--</div>-->
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-immediate-check="false"
      infinite-scroll-distance="10">
      <li v-for="item in partnerList" class="content">
        <div class="user">
          <img :src="item.avatarUrl ? item.avatarUrl : defaultImageUrl" style="width: 30px;height:30px;border-radius: 50%" alt="">
          <span >{{item.nickname}}</span>
          <span>{{item.mobile}}</span>
          <span></span>
        </div>
        <div class="reg">
          {{item.createdTime}}注册
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import  api from './../http/api.js'
import store from '@/vuex/store.js'
import {getWeixinConfig,fetchInviteShare} from '@/api/'
import wx from 'weixin-js-sdk'
import { Toast } from 'mint-ui';
import {isFromWechat} from '@/util/weixin.js'

export default {
    props:[],
    data() {
      return {
        partnerList:[],
        total:'',
        currentPage: 1,
        hasMore:true,
        userId:0,
        show:false,
        fromwhere:true,
        qrCodeUrl:'',
        isShowMask:false
      }
    },
    created(){
      this.userId=this.$store.state.login.userId;
      //let url = location.href.split('#')[0]
      let url = location.href;
      fetchInviteShare().then((response)=>{
        if(!response.data||!response.data.data){
          alert("获取服务端信息错误，请刷新重试！")
        }
        const title='您的好友邀请您一起来玩众蜜！'
        const shareInfo=response.data.data.shareInfo
        const link=shareInfo.link
        this.qrCodeUrl=response.data.data.qrCodeUrl
        getWeixinConfig({url}).then(res=>{
          res=res.data;
          if (res.data) {
            let config = res.data
            if(!config.appId){
              alert("配置信息错误，请刷新重试！")
            }
            config.jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage']
            wx.config(config)
            wx.ready(function(){
              wx.onMenuShareAppMessage({
                title: title, // 分享标题
                desc: '众蜜是一个服装设计师主导的社区', // 分享描述
                link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl:'',  // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function (res) {
                },
                cancel: function (res) {
                  // 用户取消分享后执行的回调函数
                }
              })
              wx.onMenuShareTimeline({
                title: title, // 分享标题
                link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: '', // 分享图标
                success: function (res) {
                  //alert(JSON.stringify(res))
                  // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                  //alert(JSON.stringify(res))
                  // 用户取消分享后执行的回调函数
                }
              })
            })
            wx.error(function(res){
              console.log('config error',res)
              // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            });

          }else{
            alert("服务端错误，请刷新重试！")
          }
        })
      })
      const self=this;
      this.$api({
        method:'get',
        url:"partner/apply/child/list",
        params:{pageSize:10,page:this.currentPage}
      }).then(response=>{
        let resultData=response.data.data;
        if(!resultData){
          return
        }
        if(resultData.data||resultData.dataList){
          self.partnerList = resultData.dataList;
          self.total = resultData.total;
        }
      })
    },
    mounted(){
      if(!isFromWechat()){
        this.fromwhere =false
      }
    },

    methods:{
      loadMore() {
        console.log(this.currentPage)
        this.currentPage = this.currentPage + 1;
        if(this.hasMore){
          this.loading = true;
          this.$api({
            method:'get',
            url:"partner_apply/list",
            params:{pageSize:10,page:this.currentPage}
          }).then(response=>{
            this.loading = false;
            if(!response.data.data){
              this.hasMore=false
              return
            }
            if(response.data.data.dataList){
              this.partnerList=this.partnerList.concat(response.data.data.dataList)
            }

          })
        }else{
          Toast({
            message: '没有更多数据',
            position: 'middle',
            duration: 1000
          });
        }
      },
      showMask() {
        this.isShowMask =true;
      },
      unShowMask() {
        this.isShowMask =false;
      }
    },
    beforeRouteUpdate(to,from,next){

    }
  }
</script>

<style lang="less" scoped>
  @import "./../assets/fz.less";
  @import '../assets/user/icon/fonts3/myStyle.css';

  .main{
    margin-top: 12vw;
    background-color: #f4f4f4;
    width: 100%;
      .top{
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 4vw;
        .mask{
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: #000;
          opacity: 0.6;
          .arrow{
            position: absolute;
            top: 7vh;
            right: 10vw;
          }
          .text{
            position: absolute;
            top: 16vh;
            right: 3vw;
            color: #ffffff;
            font-size: 22px;
          }
          .arrow2{
            position: absolute;
            bottom: 19vh;
            right: 41vw;
          }
          .text2{
            position: absolute;
            bottom: 29vh;
            right: 22vw;
            color: #ffffff;
            font-size: 22px;
          }
        }
        .rule{
          justify-content: space-between;
          display: flex;
          align-items: center;
          >a{
            background-color: #ec145b;
            display: block;
            height: 8vw;
            line-height: 8px;
            width: 24vw;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          a:nth-of-type(1){
            margin-right: 10px;
          }
        }
      }

      .mid{
        background-color: #ffffff;
        padding-left: 4vw;
        height: 10vw;
        line-height: 10vw;
        margin-top: 2vw;
      }

    .content{
      display: flex;
      align-items: center;
      padding-left: 4vw;
      padding-right: 3vw;
      background-color: #ffffff;
      margin-top: 2px;
      height: 15vw;
      justify-content: space-between;
      border-top: 1px solid #f4f4f4;
      .reg{
        font-size: 12px;
        color: #b3b3b3;
      }

    }

  }
</style>
