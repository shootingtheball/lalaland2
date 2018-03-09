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
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import VueCookie from 'vue-cookie';

export default {
      data(){
      return {
        issend : 'none',
        mobile : '',
        vercode : '',
        data : {
          msg : '获取验证码'
        },
        vs : "mycode",
        info : ''
      }
    },
    created(){
         this.parentUserId = this.$route.query.parentUserId;
    },
    methods:{
      toregiter:function(){
        if(this.vercode){
          this.$api({
            method : 'get',
            url : "/user/login_partner_vip",
            params: {mobile: this.mobile,verifyCode: this.vercode,type:'MOBILE_CODE',vs:this.vs}
          }).then(response => {
            console.log(response.data);
            if(response.data.code === '2000'){
              this.$store.commit('CHANGE_TOKEN',response.data.data)
              this.$router.push({path:'/partner/invite/inviteSuc'})
            }else if(response.data.code==='4000'){
              this.info = response.data.msg
              Toast({
                message: this.info,
                position: 'bottom',
                duration: 4000,
                position: 'middle'
              });
              var t = setTimeout(r => {
                this.$router.push({path : '/newLogin', query : {mobile:this.mobile,vercode:this.vercode}})
              },3000)
            }else if(response.data.code==='4000'){
              this.info = response.data.msg
              Toast({
                message: this.info,
                position: 'bottom',
                duration: 3000,
                position: 'middle'
              });
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
  .main{
    position: absolute;
    top: 40vw;
    left: 0;
    right: 0;
    height: 210px;
    background: #5CACEE;
    color: #000
  }
  .tel{
        margin-bottom: 10vw;
        display: flex;
        margin-top: 10vw;
        padding-left: 8vw
  }
  .telInput{
        width: 65vw;
        margin-left: 5vw
  }
  .code{
    display: flex;
     padding-left: 8vw
  }
  .veri{
    color:gray;
    border: 1px solid gray;
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
