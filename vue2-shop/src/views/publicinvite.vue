<template>
    <div id="app">
      <v-head>
        <h1 slot="title">加入众蜜</h1>
      </v-head>
      <img :src="qrCodeUrl" alt="">
      <p>扫码二维码，立即成为众蜜会员</p>
    </div>
</template>

<script>
  import head from '../common/_header'
  import store from '@/vuex/store.js'
  import {getWeixinConfig,fetchInviteShare} from '@/api/'
  import wx from 'weixin-js-sdk'

    export default {
        name: 'app',
        components: {
          'v-head':head
        },
      created:function () {
        //let url = location.href.split('#')[0]
        let url = location.href;
        this.userId=this.$store.state.login.userId;
        getWeixinConfig({url}).then(res=>{
          res=res.data;
          console.log("getWeixinConfig======",res)
          if (res.data) {
            let config = res.data
            config.jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage']
            wx.config(config)
            let title='您的好友邀请您一起来玩众蜜！'
            let link='http://'+WAP_HOST+'/partner/pub_invite'
            if(this.userId){
              link=link+'?parentUserId='+this.userId
            }
            wx.onMenuShareAppMessage({
              title: title, // 分享标题
              desc: '众蜜是一个服装设计师主导的社区', // 分享描述
              link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: '', // 分享图标
              type: 'link', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function () {
// 用户确认分享后执行的回调函数
              },
              cancel: function () {
// 用户取消分享后执行的回调函数
              }
            });
            wx.onMenuShareTimeline({
              title: title, // 分享标题
              link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: '', // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            });
          }
        })

        let accessToken="B9-AYIxBz7V5ZuEVLtOQYgveAyF6ePxreAnJUsFDukLrOTxCdhyLQOAJd9PCpX6aQTtF_ZEU1din9ofSh_qoGy1ykg2yrlqT5Bfz81wrEy7fRJLyKEM5q_MH4rYHu5PE"
        if(this.userId){
          this.qrCodeUrl=this.qrCodeUrl+"parentUserId%3d"+this.userId+"%26Access-Token%3d"+accessToken+"&Access-Token="+accessToken;
        }else{
          this.qrCodeUrl=this.qrCodeUrl+"Access-Token%3d"+accessToken+"&Access-Token="+accessToken;
        }

      },
        data() {
            return {
              userId:'',
              qrCodeUrl:process.env.BASE_API+'/qrcode/partner/invite?content='+process.env.BASE_WAP+'/partner/apply%3f'
            }

        },
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        padding-top: 12vw;
        min-height: 100%;
    }

    #app > p {
      line-height: 30px;
      font-size: 20px;
    }

    #app > p:nth-of-type(1) {
        /*padding-top: 80px;*/
    }

    #app > img {
        width: 80vw;
    }
</style>
