<template lang="html">
  <div class="login">
    <v-header>
      <h1 slot="title">登录页</h1>
    </v-header>
    <section>
      <mt-field
       label="账号"
        placeholder="请输入账号"
        type = "text"
        v-model = "account"
        :readonly = '!toggle'
        :disableClear = '!toggle'
        ></mt-field>
      <mt-field
       label="密码"
       placeholder="请输入密码"
       type="password"
       v-model="password"
       :readonly='!toggle'
       :disableClear = '!toggle'
        ></mt-field>
      <p class="tip"></p>
    </section>
    <mt-button
     plain
     size="large"
     @click="login"
     v-if='toggle'>登录</mt-button>
    <mt-button
     plain
     size="large"
     @click="logout"
     v-else>退出登录</mt-button>

  </div>
</template>

<script>
import Header from '@/common/_header.vue'
import { Toast } from 'mint-ui'
import {loginPassword} from '@/api/'
export default {
  components:{
    'v-header':Header
  },
  data(){
    return {
      account:'',
      password:'',
      toggle:!this.$store.state.login.token
    }
  },
  methods:{
    // 登录按钮
    login(){
      if(this.account!=="" && this.password!=="") {
        //Toast('登录成功,存储token,跳转网页');
        //this.toggle = false;
        let params={type:'MOBILE_PASSWORD',mobile:this.account,password:this.password};
        loginPassword(params).then((res)=>{

          if(res.data&&res.data.code!=='2000'){
            Toast('登录失败！');
            return
          }
          this.$store.commit('CHANGE_TOKEN',res.data.data);
        });

      }else {
        Toast('账号密码不能为空');
      }

      setTimeout(()=>{
        this.$router.replace({
          path: 'user'
        })
      },1000);
      // 登录成
    },

    //退出登录按钮
    logout(){
      Toast('退出登录成功,清除token');
      this.$store.commit('USER_SIGNOUT',{});
      this.toggle = true;
      this.account = '';
      this.password = '';

    }
  }
}

</script>

<style lang="less" scoped>
.login {
  padding-top: 12vw;
  >section {
    .tip {
      padding: 6vw 3vw;
      color:rgb(224, 145, 71);
      letter-spacing: 2px;
      font-size: 16px;
    }
  }
}
</style>
