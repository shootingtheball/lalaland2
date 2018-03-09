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

          <input type="radio" name="male" value="0"  id="male" style="width: 20px;" v-model="ischecked1"
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
          <label for="cellphone">手机</label>
        </div>
        <div>
          <input type="text" id="cellphone" @blur="checkdata('cellphone')" placeholder="请输入手机号" class="nameInput"
                 v-model="cellphone">
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
      <div class="public">
        <div>
          <label for="vertificationcode">验证码</label>
        </div>
        <div>
          <input type="text" id="vertificationcode" @blur="checkdata('vercode')" placeholder="请输入验证码" class="nameInput"
                 v-model="vercode">
          <span class="sendcode" @click="sendcode">{{data.msg}}</span>
        </div>
      </div>
    </div>

    <div class="bottom">
      <p style="padding: 30px 20px;line-height: 22px;font-size: 12px">
        <input type="checkbox" checked="checked"  @blur="checkdata('rule')" ref="rule">
        您的认证申请我们将尽快为您审核，审核通过后，您即可分享众蜜给您的朋友，参与销售分成。详细规则请参考
        <router-link href="javascript:void (0);" style="color: #e8065b"  :to="{path:'/rule'}  ">《众蜜分销体系规则说明书》</router-link>
      </p>

      <button class="btn" @click="subdata">提交申请</button>
    </div>
  </div>
</template>

<script>
  import api from '@/http/api.js';
  import {Toast} from 'mint-ui';


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
        cellphone: '',
        vercode: '',
        company:'',
        listdata: {
          realname: '',
          gender: 0,
          idCardNo: '',
          mail: '',
          mobile: '',
          corporation:'',
          code: '',
          parentPartnerId: 1,
        },
        issend:'none',
        data: {
          msg: '获取' +
          '验证码'
        }
      }
    },
    methods: {
      //产生验证码
      sendcode:function(){
        if(this.cellphone){
          if(this.issend=='none'){
            var a = 60;
            var that = this;
            var time1 = setInterval(function () {
              //console.log(a);
              a = a - 1;
              that.$set(that.data, 'msg', a + 's');
              if (a == 0) {
                that.$set(that.data, 'msg', '请输入验证码');
                clearInterval(time1);
              }
            }, 1000)
            this.$api({
              method: 'get',
              url: "sms/send_code",
              params: {mobile: this.cellphone, bizType: 'VERIFY_REAL_NAME'}
            }).then(response=>{
              this.issend=='has'
            })
          }
        }else{
          Toast({
            message: '请输入手机号',
            position: 'bottom',
            duration: 1000,
            position: 'middle'
          });
        }


      },
      subdata: function () {
        if (this.collectdata()) {
          api({
            method: 'get',
            url: "/person/apply/verify",
            params: this.listdata
          }).then(response => {
            if (response.data.code==='2000'&&response.data.data) {
              let data = response.data.data;
              console.log("提交实名认证成功");
                Toast({
                  message: '提交实名认证成功,我们会尽快为您审核！',
                  position: 'bottom',
                  duration: 2500,
                  position: 'middle'
                });
                this.$router.push({path:'/user'})
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

        } else if (data === 'cellphone') {
          if (!this.cellphone) {
            flag = false;
            Toast({
              message: '请输入手机号',
              position: 'bottom',
              duration: 1000,
              position: 'middle'
            });
            // alert('请输入手机号')
          } else {
            //console.log(this.cellphone.length);
            if (this.cellphone.length !== 11) {
              flag = false;
              Toast({
                message: '请输入正确的手机号',
                position: 'bottom',
                duration: 1000,
                position: 'middle'
              });
              // alert('请输入正确的手机号')
            } else {
              this.listdata.mobile = this.cellphone;
            }
          }
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
          } else if(data === 'company'){
            //console.log(this.company.length);
            if (this.company.length ===0) {
              flag = false;
              Toast({
                message: '请输入公司名称',
                position: 'bottom',
                duration: 1000,
                position: 'middle'
              });
              // alert('请输入公司名称')
            } else {
              this.listdata.corporation = this.company;
            }
          }
        } else if (data === 'vercode') {
            if (!this.vercode) {
              flag = false;
              Toast({
                message: '请输入验证码',
                position: 'bottom',
                duration: 1000,
                position: 'middle'
              });
              // alert('请输入验证码')
            } else {
            this.listdata.code = this.vercode;
            }
          }else if(data ==='rule'){
            console.log('this.$refs.rule.checked'+this.$refs.rule.checked)
            if(this.$refs.rule.checked !== true){
              console.log('this.$refs.rule.checked'+this.$refs.rule.checked)
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
        var arr = ['name', 'sex', 'idcard', 'email', 'cellphone', 'vercode','company','rule'];
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
