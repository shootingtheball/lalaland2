<template>
  <div class="signIn">
    <div class="main">
      <div class="tel">
          <span>手机号</span>
          <input type="text" class="telInput" v-model="mobile">
      </div>
      <div class="code">
          <span>验证码</span>
          <input type="text" class="codeInput" v-model="vercode">
          <div @click="sendcode" class="veri">获取验证码</div>
      </div>
      <button @click="toregiter">确认</button>
      <div class="maskInside"></div>
    </div>
    <div class="maskOutside">
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import VueCookie from 'vue-cookie';
import {getUrlKey} from '@/util/getHref.js'
import {isLogin} from '@/util/auth.js'


export default {
      data(){
      return {
        issend : 'none',
        mobile : '',
        vercode : '',
        data : {
          msg : '获取验证码'
        },
        info : '',
        vs: ""
      }
    },
    created(){
      this.vs = getUrlKey('vs');
    },
    methods:{
      toregiter:function(){
        if(this.vercode){
          this.$api({
            url:"/user/login_mobile",
            method:"get",
            params:{
              mobile: this.mobile ,
              verifyCode: this.vercode ,
              type: 'MOBILE_CODE',
              vs:this.vs
              }
            }).then(r => {
              if(r.data.code==='2000'){
              this.$store.commit('CHANGE_TOKEN',r.data.data)
              this.$router.push({path:'/partner/invite/inviteRealname'})
            }else if(r.data.code==='4000'){
              this.info = r.data.msg ;
              this.$router.push({path:'/partner/invite/error', query:{msg: this.info} })
            }else {
              Toast({
                message: '获取验证码',
                position: 'bottom',
                duration: 2000,
                position: 'middle'
              });
            }
          })
        }else{
          Toast({
            message: '请输入验证码',
            position: 'bottom',
            duration: 2000,
            position: 'middle'
          });
        }
      },
      sendcode:function() {
        if(this.issend == 'none'){
          this.issend = 'has';
          // 计数时间
          if(this.mobile&&this.mobile.length==11){
            var a = 60;
            var that = this;
            var time1 = setInterval(function() {
              //console.log(a);
              a = a - 1;
              that.$set(that.data,'msg',a+'s');
              if(a == 0){
                that.$set(that.data,'msg','获取验证码');
                that.issend = 'none';
                clearInterval(time1);
              }
            },1000)
            this.$api({
              method: 'get',
              url: "sms/partner/send_mobile_code",
              params: {mobile: this.mobile, bizType: 'VERIFY_LOGIN',vs:this.vs}
            }).then(response=>{
              this.issend = 'none';
            }).catch(err=>{
              this.issend = 'none';
            })
          }else{
            Toast({
              message: '请输入手机号',
              position: 'bottom',
              duration: 1000,
              position: 'middle'
            });
            this.issend = 'none';
          }

        }
      }
    }
}
</script>

<style scoped>
  .signIn{
    background: 	#E8E8E8;
    position: relative;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
  }
  .maskOutside{
    position: absolute;
    left: 0;
    top: 0 ;
    bottom: 0;
    width:100%;
    background:url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516626019072&di=eb250ce20d1248781da15b22a869022f&imgtype=0&src=http%3A%2F%2Fb.zol-img.com.cn%2Fsjbizhi%2Fimages%2F9%2F320x510%2F1471350456238.jpg');
    z-index: -2;
    background-size: 100vw 100vh;
  }
  .main{
    position: absolute;
    top: 40vw;
    left: 5vw;
    right: 5vw;
    height: 210px;
    color: #000;
    border-radius: 30px;
  }
  .maskInside{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: black;
      z-index: -1;
      opacity: 0.2;
      border-radius: 30px;
  }
  .tel{
        margin-bottom: 10vw;
        display: flex;
        margin-top: 10vw;
        padding-left: 8vw
  }
  .telInput{
        width: 55vw;
        margin-left: 5vw;
  }
  .code{
    display: flex;
     padding-left: 8vw
  }
  .veri{
    border-radius:20px;
    width: 90px;
    text-align: center
  }
  .codeInput{
      width: 25vw;
      margin: 0 5vw
  }
  button{
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    margin-top: 30px;
    height: 37px;
    width: 150px;
    border-radius: 5px;
    background: #fff;
    margin-bottom: -30px;
  }
</style>
