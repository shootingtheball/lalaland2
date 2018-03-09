<template lang="html">
  <div class="main">
    <mt-header title="收货地址管理" icon="search" style="background-color: #1f1f1f;height: 12vw" fixed>
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
              <input type="text" @focus="toFade" id="city" placeholder="请填写地区"  readonly="readonly" v-model="getAddress" @click="showaddress" ref="origin">
            </div>
          </div>
        </div>

        <mt-field label="详细地址" placeholder="详细地址" v-model="fullAddress"></mt-field>
      </div>

      <div class="save"@click="_showaddress">
        <button @click="saveDate">保存地址</button>
      </div>
    </div>
     <!--<
    <div class="selectarea" v-show="address_flag">
      <div class="selectbtn">
        <div @click="address_flag=!address_flag">取消</div>
        <div @click="fillAddress">确定</div>
      </div>
   mt-picker class="select" :slots="slots" value-key="name" @change="onValuesChange"></mt-picker>
    </div> -->
    <transition name="change">
      <div class="sel"  v-if="address_flag" >
        <div @click='getProvince($event)'><vselect :list='provinceList' id='province' @give='getCity'></vselect></div>
        <div><vselect id='city' :list='cityList' :firstCity='firstCity' @give='getCounty'></vselect></div>
        <div><vselect id='county' :list='countyList' :firstCity='firstCity'></vselect></div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { Field } from 'mint-ui';
  import {address, slots} from './address';
  import { Toast } from 'mint-ui';
  import vselect from '../../common/select.vue'

  export default {
    components:{
      vselect
    },
    props:['datas'],
    data() {
      return {
        address_flag: false,
        slots: slots,
        address: '',
        temp_addr: '',
        fullAddress:'',
        mobile:'',
        username:'',
        provinceCode:'',
        cityCode:'',
        districtCode:'',
        total: '',
        selected:[],
        provinceList:[],
        cityList:[],
        countyList:[],
        firstCity:''
      }

    },
  /* created:function () {
      this.$api({
        url: 'country/list_with_childs',
        method: 'get'
      }).then(response =>{
        console.log(response)
        this.total = response.data.data.provinceList;
        this.initAddress();
      })
   },*/
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
        //document.activeElement.blur();
      },
      saveDate:function(){
        var flag = true;
        if(flag){
          if(this.checkDate()){
            flag = false;
            this.$api({
              url: 'user_address/add',
              method: 'get',
              params:{
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
                    message: '添加地址成功',
                    position: 'middle',
                    duration: 1000
                  });
                  this.$router.back();return false;;
                }
              }
              console.log(response)
              flag = true;
            })

          }
        }

      },
      checkDate:function(){
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
            message: '请填写地址',
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
      showaddress:function(){
         if(this.address_flag === false){
           this.address_flag =true;
         }
      },
      _showaddress:function(){
        if(this.address_flag===true){
          this.address_flag=false;
        }
      },
      getProvince(event){
          let id = event
          console.log(id)
          this.$api({
             url:'/province/list',
             method:'get'
           }).then(res => {
             if(res.data.code==='2000'){
                this.provinceList = res.data.data
             }
          })
      },
      getCity(code){
       this.$api({
         url:'/city/list_by_province_code?provinceCode='+code,
         method:'get'
       }).then(res => {
         this.cityList =  res.data.data;
       })
      },
      getCounty(code) {
        this.$api({
         url:'/district/list_by_city_code?cityCode='+code,
         method:'get'
       }).then(res => {
         this.countyList =  res.data.data;
       })
      }
     /* fillAddress() {
        // 填入省市区
        this.address = this.temp_addr;
        this.address_flag = !this.address_flag;
      },
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
          this.slots[2].values = values[1].districtList;1
        }
        // 防止没有区时报错
        if (values[2]) {
          // 这里可以指定地址符，此处以空格进行连接
          this.temp_addr = values[0].name + ' ' + values[1].name + ' ' + values[2].name;
          this.provinceCode = values[0].code;
          this.cityCode = values[1].code;
          this.districtCode = values[2].code;
        }
      } */
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
    .area-select.medium{
      display: flex
    }
    .sel{
      padding-top: 10px;
      padding-right: 10px;
      background: #F2F2F2;
      height: 390px;
      display: flex;
      justify-content: space-between;
      &>div{
        width: 30%;
      }
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
