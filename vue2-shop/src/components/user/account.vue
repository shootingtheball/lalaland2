<template>
  <div class="account">
      <v-header><h1 slot="title">账户与安全</h1></v-header>
      <div class="logOut" @click="signOut">
          退出登录
      </div>
  </div>
</template>

<script>
import Header from '@/common/_header.vue'
import {logOut} from '@/api/'
import { mapActions } from 'vuex'
import {isLogin} from '@/util/auth.js'

export default {

  components:{
      'v-header':Header
  },
  methods:{
      signOut() {
        logOut().then(() =>{
              this.$store.commit("USER_SIGNOUT");
              this.$router.push({path:'/'})
          }
        );
      }
  }
}
</script>

<style lang="less" scoped>
  .account{
      background-color:#f4f4f4;
      height: 100%;
      position: relative;
  }
  .logOut{
      height: 11vw;
      background-color: #fff;
      line-height: 11vw;
      text-align: center;
      position: absolute;
      top: 12vw;
      width: 100%
  }
</style>
