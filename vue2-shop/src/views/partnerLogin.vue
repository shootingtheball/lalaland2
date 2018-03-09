<template>
  <div class="partnerLogin">


    <mt-header title="登录" icon="search" style="background-color: #1f1f1f;height: 12vw" fixed>
      <router-link :to="{name:'首页'}">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="login">
      <div class="name">
        <div class="nameNotice">姓名</div>
        <div class="nameContent"><input type="text" v-model="name"></div>
      </div>
      <div class="tel">
        <div class="telNotice">手机号</div>
        <div class="telContent"><input type="text" v-model="tel"></div>
      </div>
      <div class="jump" @click="sendTo">
        提交
      </div>
    </div>

  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  import VueCookie from 'vue-cookie';
  import {getUrlKey} from '@/util/getHref.js'

  export default {
    data() {
      return {
        isSend: false,
        name: '',
        tel: '',
        search: "",
        parentUserId: ''
      }
    },
    created() {
      this.search = window.location.search
      this.parentUserId = getUrlKey('parentUserId');
    },
    methods: {
      sendTo() {
        if (!this.isSend) {
          //this.isSend = true;
          if (this.name.length != 0 && this.tel.length === 11) {
            this.$api({
              methods: get,
              url: "/user/login_partner",
              params: {mobil: this.tel, name: this.name, parentUserId: parentUserId}
        }
      ).then((res) => {
      if (response.data.code === '2000' && response.data.data) {
        this.$router.push({path: "parterLoginSuccess"})
      }
    })
  }
  else
  {
    Toast({
      message: '请输入正确的内容',
      position: 'bottom',
      duration: 2000,
      position: 'middle'
    });
  }
  }
  }
  }
  }
</script>

<style lang="less" scoped>
  .partnerLogin {
    margin-top: 12vw;
    .login {
      padding: 30vw 20vw;

      .name, .tel {
        border-bottom: 1px solid #d3d3d3;
        display: flex;
        height: 48px;
        line-height: 48px;
      }

      .nameNotice, .telNotice {
        color: black
      }

      input {
        font-size: 12px
      }

      .nameContent, .telContent {
        margin-left: 14px
      }

      .jump {
        margin-top: 20px;
        color: #fff;
        font-size: 15px;
        height: 36px;
        background-color: #FFC125
      }
    }
  }
</style>
