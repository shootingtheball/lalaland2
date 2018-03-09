<template>
  <div id="app">
    <div class="top">
      <div class="public">
        <div>
          <label for="name">姓名</label>
        </div>
        <div>
          <input type="text" id="name" @blur="checkdata('name')" placeholder="请输入您的真实姓名" class="nameInput"
                 v-model="name">
        </div>
      </div>
      <div class="public">
        <div>
          <label>性别</label>
        </div>
        <div>

          <input type="radio" name="male" value="1" id="female" style="width: 20px;" v-model="ischecked0"
                 @blur="checkdata('ischecked0')" checked>
          <label for="female">男</label>

          <input type="radio" name="male" value="0" id="male" style="width: 20px;" v-model="ischecked1"
                 @blur="checkdata('ischecked1')">
          <label for="male">女</label>
        </div>
      </div>
      <div class="public">
        <div>
          <label for="card">身份证</label>
        </div>
        <div>
          <input type="text" id="card" placeholder="请输入您的身份证号码" @blur="checkdata('idcard')" class="nameInput"
                 v-model="idcard">
        </div>
      </div>
      <div class="public">
        <div>
          <label for="mail">邮箱</label>
        </div>
        <div>
          <input type="text" id="mail" @blur="checkdata('email')" placeholder="请输入您的邮箱（可不填）" class="nameInput"
                 v-model="email">
        </div>
      </div>
      <div class="public">
        <div>
          <label for="company">公司</label>
        </div>
        <div>
          <input type="text" id="company" @blur="checkdata('company')" placeholder="请输入公司名称" class="nameInput"
                 v-model="company">
        </div>
      </div>
    </div>

    <div class="bottom">
      <p style="padding: 30px 20px;line-height: 22px;font-size: 12px">
        <input type="checkbox" checked="checked" @blur="checkdata('rule')" ref="rule">
        您的认证申请我们将尽快为您审核，审核通过后，您即可分享众蜜给您的朋友，参与销售分成。详细规则请参考
        <router-link href="javascript:void (0);" style="color: #e8065b" :to="{path:'/rule'}  ">《众蜜分销体系规则说明书》
        </router-link>
      </p>

      <button class="btn" @click="subdata">提交申请</button>
    </div>
  </div>
</template>

<script>
  import api from '@/http/api.js';
  import {Toast} from 'mint-ui';
  import {isLogin} from '@/util/auth.js'
  import {getUrlKey} from '@/util/getHref.js'

  export default {
    name: 'app',
    components: {},
    data() {
      return {
        ischecked0: '',
        ischecked1: '',
        name: '',
        sex: '',
        idcard: '',
        email: '',
        company: '',
        listdata: {
          realname: '',
          gender: 0,
          idCardNo: '',
          mail: '',
          companyName: '',
          parentPartnerId: 1,
          vs: this.$route.query.vs ? this.$route.query.vs : getUrlKey('vs')
        },
        issend: 'none',
        data: {
          msg: '获取' +
          '验证码'
        }
      }
    },
    created() {
      console.log('000000000vs' + this.vs)
      if (!isLogin()) {
        this.$router.push({path: '/partner/invite/login'})
      }
    },
    methods: {
      subdata: function () {
        console.log('000000000vs' + this.vs)
        if (this.collectdata()) {
          api({
            method: 'get',
            url: "/person/apply/verify_mobile",
            params: this.listdata
          }).then(response => {
            if (response.data.code === '2000' && response.data.data) {
              let data = response.data.data;
              Toast({
                message: '提交实名认证成功,我们会尽快为您审核！',
                duration: 2500,
                position: 'middle'
              });
              this.$router.push({path: '/user'})
            } else {
              let data = response.data;
              if (data && data.msg) {
                Toast({
                  message: data.msg,
                  duration: 2500,
                  position: 'middle'
                });
                setTimeout(() => {
                  this.$router.push({path: '/user'})
                },3000)
              }
            }
          });
        }
      },
      checkdata: function (data) {
        // debugger
        var flag = true;
        if (data === 'name') {
          if (!this.name) {
            flag = false;
            Toast({
              message: '请输入姓名',
              position: 'bottom',
              duration: 1000,
              position: 'middle'

            });
            // alert('请输入姓名');
          } else {
            this.listdata.realname = this.name;
          }
        } else if (data === 'ischecked0') {
          this.listdata.gender = '0';
        } else if (data === 'ischecked1') {
          this.listdata.gender = '1';
        } else if (data === "") {

          /*if (!this.ischecked1&&!this.ischecked0) {
            flag = false;
            Toast({
              message: '请选择性别',
              position: 'bottom',
              duration: 1000,
              position: 'middle'
            });
            // alert('请选择性别')
          }*/

        } else if (data === 'idcard') {
          if (!this.idcard) {
            flag = false;
            Toast({
              message: '请输入身份证',
              position: 'bottom',
              duration: 1000,
              position: 'middle'
            });
            // alert('请输入身份证');
          } else {
            this.listdata.idCardNo = this.idcard;
          }
        } else if (data === 'email') {
          this.listdata.mail = this.email;
        } else if (data === 'company') {
          if (!this.company) {
            flag = false;
            Toast({
              message: '请输入公司名称',
              position: 'bottom',
              duration: 1000,
              position: 'middle'
            });
            // alert('请输入公司名称')
          } else {
            this.listdata.companyName = this.company;
          }
        } else if (data === 'rule') {
          if (this.$refs.rule.checked !== true) {
            flag = false;
            Toast({
              message: '请同意众蜜分销规则',
              position: 'bottom',
              duration: 1000,
              position: 'middle'
            });
          }
        }
        return flag;
      },
      collectdata: function () {
        var flag = true;
        var arr = ['name', 'sex', 'idcard', 'company', 'rule'];
        for (var i = 0; i < arr.length; i++) {
          if (!this.checkdata(arr[i])) {
            flag = false;
            break
          }
        }
        return flag;
      }
    },
    watch: {}
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    /*margin-top: 60px;*/
    background-color: #f3f3f3;
    min-height: 100%;
  }

  #app .top {
    background-color: #ffffff;
  }

  #app .top .public {
    overflow: hidden;
    border-bottom: 1px solid #dddddd;
  }

  #app .top .public > div {
    float: left;
    height: 50px;
    line-height: 50px;
    text-align: left;
    padding-left: 6vw;
  }

  #app .top .public div:nth-of-type(1) {
    width: 20%;
    /*text-align: center;*/
  }

  #app .top .public div:nth-of-type(2) {
    width: 80%;
  }

  #app .top .public div:nth-of-type(2) input {
    border: none;
    outline: none;
    width: 90%;
  }

  #app .top .public div:nth-of-type(2) input::-webkit-input-placeholder { /* WebKit browsers */
    color: #cccccc;
  }

  #app .top .public div:nth-of-type(2) input:-moz-placeholder { /* WebKit browsers */
    color: #cccccc;
  }

  #app .top .public div:nth-of-type(2) input::-moz-placeholder { /* WebKit browsers */
    color: #cccccc;
  }

  #app .top .public div:nth-of-type(2) input:-ms-input-placeholder { /* WebKit browsers */
    color: #cccccc;
  }

  #app .top .public div:nth-of-type(2) input#vertificationcode {
    width: 60%;
  }

  #app .top .public div:nth-of-type(2) .sendcode {
    color: #005ef9;
    padding: 0 10px;
    width: 15%;
    border-left: 1px solid #999999;
    padding-top: 6px;
    padding-bottom: 6px;
  }

  #app .top .name .nameInput {
    outline: none;
  }

  #app .bottom {
    text-align: center;
  }

  #app .bottom button.btn {
    background-color: #e8065b;
    width: 240px;
    color: #ffffff;
    height: 60px;
    line-height: 60px;
    font-size: 22px;
    outline-style: none;
  }
</style>
