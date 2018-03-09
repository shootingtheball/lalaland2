<template lang="html">
  <div class="main">
    <mt-header title="编辑地址管理" icon="search" style="background-color: #1f1f1f;height: 12vw" fixed>
      <router-link :to="{name:''}" slot="left">
        <mt-button icon="back" @click="$router.back();return false;"></mt-button>
      </router-link>
    </mt-header>

    <div class="content">
      <div class="filed">
        <mt-field label="收件人"  placeholder="请填写姓名"  v-model="username"></mt-field>
        <mt-field label="手机号码" placeholder="请输入手机号"  v-model="mobile"></mt-field>
        <div class="contentespecial">
          <div class="especial">
            <div class="citylabel">
              <label for="city">省市区</label>
            </div>
            <div class="cityinput">
              <input type="all" id="city" placeholder="请填写地区" v-model="getAddress" @click="showaddress" ref="origin" readonly="readonly" >
            </div>
          </div>
        </div>

        <mt-field label="详细地址" placeholder="详细地址" v-model="fullAddress"></mt-field>

      </div>

      <div class="save" @click="_showaddress">
        <button @click="saveAddress">保存</button>
      </div>
    </div>
    <!--
    <div class="selectarea" v-show="address_flag">
      <div class="selectbtn">
        <div @click="address_flag=!address_flag">取消</div>
        <div @click="fillAddress">确定</div>
      </div>
      <mt-picker class="select" :slots="slots" value-key="name" @change="onValuesChange"></mt-picker>
    </div>-->
    <transition name="change">

      
    </transition>
  </div>

</template>

<script>
  import { Field } from 'mint-ui';
  import {address, slots} from './address';
  import { Toast } from 'mint-ui';

  export default {
    components:{

    },
    props:['datas'],
    data() {
      return {
        address_flag: false,
        slots: slots,
        address:'',
        mobile:'',
        username:'',
        fullAddress:'',
        provinceCode:"",
        cityCode:"",
        districtCode:"",
        selected:[],
        id:""
      }

    },
    created:function () {
      this.$api({
        url: '/user_address/get',
        method: 'get',
        params:{addressId:this.$route.params.addressId}
      }).then(response =>{
        this.address = response.data.data;
        this.username = this.address.username;
        this.mobile = this.address.mobile;
        this.fullAddress = this.address.fullAddress;
        this.id=this.address.id
      })
    },
    mounted:function () {
      // this.initAddress();
    },
    computed:{
      getAddress(){
        let str= "";
        this.selected.forEach((ele,i) => {
          if(i===0){
            for (const k in ele) {
              this.provinceCode = k;
              str = ele[k]
           }
          }else if(i===1){
            for (const key in ele) {
              this.cityCode = key;
                if(ele[key]!=="市辖区"){
                  str += ele[key]
                } 
            }  
          }else{
            for (const ke in ele) {
              this.districtCode =ke;
              str += ele[ke]
            }
          } 

        });
          return str 
      }
    },
    methods:{
      toFade:function(){
        document.activeElement.blur();
      },
      saveAddress:function(){
        var flag = true;
        if(flag){
          if(this.checkData()){
            flag = false;
            this.$api({
              url: 'user_address/update',
              method: 'get',
              params:{
                id:this.id,
                mobile:this.mobile,
                username:this.username,
                provinceCode:this.provinceCode,
                cityCode:this.cityCode,
                districtCode:this.districtCode,
                fullAddress:this.fullAddress,
                isDefault:true
              }
            }).then(response =>{
              if(response.data.code==='2000'){
                if(response.data.data>0){
                  Toast({
                    message: '编辑地址成功',
                    position: 'middle',
                    duration: 1000
                  });
                  this.$router.back();return false;;
                }
              }
              flag = true;
            })

          }
        }

      },
      checkData:function(){
        var flag = true;
        if(!this.username){
          Toast({
            message: '请填写姓名',
            position: 'middle',
            duration: 1000
          });
          flag = false;
        }else if(!this.mobile){
          Toast({
            message: '请填写手机号',
            position: 'middle',
            duration: 1000
          });
          flag = false;
        }else if(this.mobile&&this.mobile.length!=11){
          Toast({
            message: '请填写正确手机号',
            position: 'middle',
            duration: 1000
          });
          flag = false;
        }else if(!this.$refs.origin.value){
          Toast({
            message: '请填写省市区',
            position: 'middle',
            duration: 1000
          });
          flag = false;
        }else if(!this.fullAddress){
          Toast({
            message: '请填写详细地址',
            position: 'middle',
            duration: 1000
          });
          flag = false;
        }
        return flag;
      },
       showaddress(){
         if(this.address_flag === false){
           this.address_flag =true
         }
       },
      _showaddress:function(){
        if(this.address_flag===true){
          this.address_flag=false;
        }
      },/*
      fillAddress() {
        // 填入省市区
        this.address = this.temp_addr;
        this.address_flag = !this.address_flag;
      },*/
      initAddress() {
        this.slots[0].values = this.total;
      },
      onValuesChange(picker, values) {
        // 防止没有省份时报错
        if (values[0]){
          this.slots[1].values = values[0].cityList;
        }
        // 防止没有市时报错
        if (values[1]) {
          this.slots[2].values = values[1].districtList;

        }
        // 防止没有区时报错
        if (values[2]) {
          // 这里可以指定地址符，此处以空格进行连接
          this.temp_addr = values[0].name + ' ' + values[1].name + ' ' + values[2].name;
          this.provinceCode = values[0].code;
          this.cityCode = values[1].code;
          this.districtCode = values[2].code;
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "./../../assets/fz.less";

  .main{
    margin-top: 12vw;
      .content{
        .contentespecial{
          .especial{
            background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 50%);
            background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
            background-size: 120% 1px;
            background-repeat: no-repeat;
            background-position: top left;
            background-origin: content-box;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            box-sizing: border-box;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            font-size: 16px;
            line-height: 1;
            min-height: inherit;
            overflow: hidden;
            padding: 0 10px;
            width: 100%;
            .citylabel{
              width: 105px;
              height: 48px;
              line-height: 48px;
            }
            .cityinput{
              display: flex;
              align-items: center;
              font-size: 16px;
              color: inherit;
              input{
                font-size: inherit;
                border-radius: 0;
                border: 0;
              }
            }
          }
        }

      }
    .save{
      text-align: center;
      padding-top: 20px;
      padding-bottom: 20px;
      button{
        padding: 10px 15px;
        color: #ffffff;
        background-color: #000000;
        font-size: 14px;
      }
    }

    .selectarea{
      position: fixed;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: #f4f4f4;
      .selectbtn{
        display: flex;
        justify-content: space-between;
        padding: 0 35px;
      }
    }
    .sel{
      padding-top: 10px;
      padding-right: 10px;
      background: #F2F2F2;
      height: 390px;
    }
    .change-enter-active{
      transition: all .5s ease;
    }
    .change-leave-active{
      transition: all .8s ;
    }
    .change-enter, .change-leave-to{
      transform: translateY(200px);
      opacity: 0;
    }
  }

</style>
