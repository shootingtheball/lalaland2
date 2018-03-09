<template>
  <transition name="move">
  <div class="edit" >
  <div class="head" ref="vhead">
    <span class="icon1" @click="$router.back()" ref='vicon'>
      <i class="iconfont icon-zuojiantou"></i>
    </span>
    <span>{{$route.query.kind}}</span>
    <span class="done" @click='done'>完成</span>
  </div>
  <input type="text" ref="ipt" v-if="!isGenderShow && !isTelShow">
  <div v-if='isGenderShow' class="option">
    <div class="sex" @click="changeSex($event)" id="male"><span>男</span><span class="choose" v-if="isShowChoose"><img src="../../assets/icon/green-choose.png" alt=""></span></div>
    <div class="sex" @click="changeSex($event)" id="female"><span>女</span><span class="choose" v-if='!isShowChoose'><img src="../../assets/icon/green-choose.png" alt=""></span></div>
  </div>
  <div v-if="isTelShow" class="mobile">
    <div class="num"><input type="text" v-model="mobile" placeholder="手机号"></div>
    <div class="veri"><input type="text" v-model="vercode" placeholder="验证码"><div @click="sendcode" class="btn">获取验证码</div></div>
  </div>
  </div>
  </transition>
</template>

<script>
 import { Toast } from 'mint-ui';
 import {getUrlKey} from '@/util/getHref.js'

export default {
  data(){
    return {
      issend: 'none',
      isGenderShow:false,
      isShowChoose:false,
      isTelShow:false,
      vercode:'',
      mobile:'',
      parentUserId:''
    }
  },
  created(){
    if(this.$route.query.kind ==='性别'){
      this.isGenderShow = true
    }else if(this.$route.query.kind ==='手机号'){
      this.isTelShow =true
    }

    if(this.$store.state.login.gender===0){
      this.isShowChoose =true;
    }else if(this.$store.state.login.gender===1){
      this.isShowChoose =false;
    }

    this.parentUserId = getUrlKey('parentUserId');
  },
  methods:{
    done() {
      let data={};
      if(this.$refs.vicon.nextSibling.nextSibling.innerHTML==='昵称'){
        let nickname = this.$refs.ipt.value;
        if(nickname){
          this.$api({
            method:'get',
            url:'/mine/user/profile/update',
            params:{nickname:this.$refs.ipt.value}
          }).then(res => {
            if(res.data.code ==='2000'){
              this.$router.push({path:'/personal',query:{nickname : nickname}})
            }
          })
        }
      }else if(this.$refs.vicon.nextSibling.nextSibling.innerHTML==='手机号'){
       if(this.vercode){
          this.$api({
            method:'get',
            url:'/mine/user/profile/update',
            params:{mobile:this.mobile}
          }).then(res => {
            if(res.data.code ==='2000'){
              this.$router.push({path:'/personal',query:{mobile:this.mobile}})
            }else {
              Toast({
                message: '更改手机号失败',
                position: 'bottom',
                duration: 2000,
                position: 'middle'
              });
            }
          })
       }else{
         {
          Toast({
            message: '请输入验证码',
            position: 'bottom',
            duration: 2000,
            position: 'middle'
          });
        }
       }
      }else if(this.$refs.vicon.nextSibling.nextSibling.innerHTML==='性别'){
        if(this.isShowChoose){
          this.$api({
              method: 'get',
              url: "/mine/user/profile/update",
              params: {gender:0}
          }).then(res =>{
            if(res.data.code ==='2000') {
              this.$router.push({path:'/personal',query:{gender : '男'}})
            }
          })
        }else if(!this.isShowChoose){
          this.$api({
              method: 'get',
              url: "/mine/user/profile/update",
              params: {gender:1}
          }).then(res =>{
              if(res.data.code ==='2000') {
              this.$router.push({path:'/personal',query:{gender : '女'}})
            }            
          })
        }
      }
    },
    sendcode:function() {
        if(this.issend == 'none'){
         // debugger
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
    },
    changeSex(event) {
      if(event.currentTarget.id === 'male'){
        this.isShowChoose =true;
      }else if(event.currentTarget.id === 'female'){
        this.isShowChoose =false;
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/user/icon/fonts3/myStyle.css';

  .move-enter-active{
    transition: all .3s ease;
  }
  .move-leave-active{
    transition: all .3 ease;
  }
  .move-enter,.move-leave-to{
    transform: translate(100%)
  }
  .edit{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right:0;
    background: #f4f4f4;
    .head{
      font-size: 14px;
      font-weight: normal;
      position: absolute;
      top: 0;
      width: 100%;
      height: 12vw;
      background: rgb(31, 31, 31);
      color: #fff;
      text-align: center;
      line-height: 12vw;
        .icon1{
          width: 10vw;
          position: absolute;
          top: 50%;
          transform: translate(0,-50%);
          left: 2vw
        }
        .done{
          color: #05be03;
          position: absolute;
          top: 50%;
          transform: translate(0,-50%);
          right: 6vw
        }
    }
    input{
      width: 100%;
      line-height: 5vh;
      background: #fff;
      padding: 0 3vw;
      margin-top: 15vw;
      border-top: 1px solid #efebeb;
      border-bottom: 1px solid #efebeb;
      font-size: 14px;
    }
    .option{
      margin-top: 15vw;
      background: #fff;
      padding: 0 3vw;
      .sex{
        display: flex;
        justify-content: space-between
      }
      & div{
        line-height: 5vh
      }
      #male{
         border-bottom: 1px solid #ddd
      }
      .choose{
        height: 5vh
      }
      & img{
        height: 35%
      }
    }
    .mobile{  
      margin-top: 15vw;
      & div{
        display: flex;
        height: 5vh;
        font-size: 14px;
        justify-content: space-between
      }
      & input{
        margin: 0;
        vertical-align: middle;
      }
      .btn{
        line-height: 5vh;
        white-space: nowrap;
        background: #e8065b;
        color: #FCFCFC;
        font-size: 12px;
        margin-left: 1vw;
        border: 1px solid #efebeb;
        box-sizing: border-box
      }
    }
  }
</style>

