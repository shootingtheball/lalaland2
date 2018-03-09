<template>
  <div class="share">
      <v-header>
      </v-header>
      <div class="desc">
        <div class="desc1">扫描下方二维码</div>
        <div class="desc2">加入<span>众蜜！</span></div>
      </div>
      <div class="erweima">
          <img :src="qrCodeUrl ? qrCodeUrl : defaultImageUrl" alt="二维码">
      </div>
  </div>
</template>

<script>
import header from '@/common/_header.vue'
import {getUrlKey} from '@/util/getHref.js'
import store from '@/vuex/store.js'
import {getWeixinConfig,fetchInviteShare} from '@/api/'
import wx from 'weixin-js-sdk'

import {isLogin} from '@/util/auth.js';

export default {
  data() {
      return {
          qrCodeUrl:''
      }
  },
  components:{
      'v-header' : header
  },
  created() {

      this.qrCodeUrl = this.$route.query.qrCodeUrl ? this.$route.query.qrCodeUrl : getUrlKey('qrCodeUrl') ;
      this.qrCodeUrl = decodeURIComponent(this.qrCodeUrl)
      if(!isLogin()){
          this.$router.push({path:'/newLogin',query :{qrCodeUrl:this.qrCodeUrl}})
      }
      wx.scanQRCode({
      needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有

      success: function (res) {
      var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
      console.log(result)
      this.$api({
          url :'/partner/apply',
          method:'get',
          params:{m:this.$store.state.login.userId}
      })
      }
    });
  }

}
</script>


<style lang="less" scoped>
  .fix{
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
  }
  .share{
      .fix;
      .desc{
          font-weight: bold;
          text-align: center;
          margin-top: 14vh;
          margin-bottom: 5vh;
          color: #000;
          font-size: 16px;
          .desc1{
              margin-left: -5vw
          }
          .desc2{
              margin-left: 18vw;
              & span{
                  font-size: 30px
              }
          }
      }
      .erweima{
          display: flex;
          justify-content: center;
          height: 40vh;
          & img{
              height: 100%
          }
      }
  }
</style>
