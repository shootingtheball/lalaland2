<template lang="html">
  <div class="login">
    <mt-header title="登录" icon="search" style="background-color: #1f1f1f;height: 12vw" fixed>
      <router-link :to="{name:'首页'}" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

      <div class="content">
        <div class="mobilenumber">
          <div class="mobilelabel">
            <label for="mobile">手机号</label>
          </div>
          <div class="mobileinput">
            <input type="text" id="mobile" v-model="mobile" ref="input1">
          </div>
        </div>

        <div class="vercode">
          <div class="vercode">
            <input type="text" placeholder="获取验证码" v-model="vercode" ref="input2">
          </div>
          <div class="vercodebtn">
            <button @click="sendcode">{{data.msg}}</button>
          </div>
        </div>

        <div class="regtext">
          如果您还不是会员，也可以使用手机验证码快速注册成为会员。
        </div>

        <div class="btn">
          <button @click="toregiter">登录</button>
        </div>
      </div>

  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import VueCookie from 'vue-cookie';
  import {getUrlKey} from '@/util/getHref.js'

  export default {
    components:{

    },
    data(){
      return {
        issend: 'none',
        mobile:'',
        vercode:'',
        parentUserId:"",
        returnUrl:'',
        data:{
          msg: '获取验证码'
        }
      }
    },
    created(){
         this.parentUserId = getUrlKey('parentUserId');
         //需要获取url参数parentUserId
         this.qrCodeUrl=getUrlKey('qrCodeUrl');
         this.returnUrl=getUrlKey('return_url');
         if(this.returnUrl){
           this.returnUrl=decodeURIComponent(this.returnUrl)
         }
         console.log('登录页面的token======'+this.$store.state.login.token)
    },
    methods:{
      toregiter:function(){
        if(this.vercode){
          this.$api({
            method: 'get',
            url: "/user/login",
            params: {mobile: this.mobile, verifyCode: this.vercode,type:'MOBILE_CODE',parentUserId:this.parentUserId}
          }).then(response=>{
            if(response.data.code==='2000'){
              this.$store.commit('CHANGE_TOKEN',response.data.data)
              if(this.returnUrl){
                document.location.href=this.returnUrl
                return;
              }
              if(this.$route.matched[0].path ==='/partner/invite/share' || this.$route.query.qrCodeUrl){
                this.$router.push({path:'/partner/invite/share',query:{qrCodeUrl:this.$route.query.qrCodeUrl}})
              }else{
                this.$router.push({path:'/User'})
              }
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
              url: "sms/send_code",
              params: {mobile: this.mobile, bizType: 'VERIFY_LOGIN'}
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

<style lang="less" scoped>
  *{
    box-sizing: border-box;
  }
  .login {
    margin-top: 12vw;
    .content{
      padding: 30vw 20vw;
    }
    .mobilenumber{
      display: flex;
      border-bottom: 1px solid #d3d3d3;
      height: 48px;
      line-height: 48px;
      color: #d3d3d3;
      .mobilelabel{
        color: inherit;
      }
      .mobileinput{
        margin-left: 14px;
      }
    }
    .vercode{
      display: flex;
      justify-content: space-between;
      height: 48px;
      line-height: 48px;
      color: #d3d3d3;

      .vercodebtn{
        button{
          outline: none;
          background-color: #ffffff;
          color: #e8065b;
          font-size: 16px;
        }

      }
    }

    .regtext{
      margin-top: 14px;
      font-size: 13px;
    }

    .btn{
      width: 100%;
      margin-top: 8px;
      button{
        width: 100%;
        height: 40px;
        color: #ffffff;
        font-size: 15px;
        background-color: #e8065b;
      }
    }
  }
</style>
