<template>
  <transition name="move">
  <div class="personal">

      <div class="head"><span class="icon1"><i class="iconfont icon-zuojiantou" @click="$router.push('/user')"></i></span>个人资料</div>
      <div class="portrait" ><span><img :src="avatar" alt=""></span></div>

      <div class="content">
      <div class="option" >
          <div>昵称</div>
          <div class="data">{{$route.query.nickname ? $route.query.nickname : nickname}}</div>
          <div class="icon" @click.stop ='showEdit($event)'  id="nickname" ><i class="icon-go go"></i></div>
      </div>
      
      <div class="option" >
          <div>性别</div>
          <div class="data">{{$route.query.gender ? $route.query.gender : gender}}</div>
          <div class="icon"  @click.stop ='showEdit($event)'  id="gender"><i class="icon-go go"></i></div>
      </div>

      <div class="option">
          <div>生日</div>
          <div class="data">{{birthday}}</div>
          <div class="icon" @click.stop='_birth'><i class="icon-go go"></i></div>
      </div>
      
      <div class="option" >
          <div>手机号</div>
          <div class="data">{{$route.query.mobile ? $route.query.mobile : mobile}}</div>
          <div class="icon"  @click.stop ='showEdit($event)'  id="mobile" ><i class="icon-go go"></i></div>
      </div>
      </div>

     <div class="pick" v-if="isshowPicker">
         <mt-picker :slots="slots"  @change='onslotsChange'></mt-picker>
         <div class="cancle"  @click="unshowPicker">确认</div>
     </div>

  </div>
  </transition>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
  data() {
      return {
          birthday:'',
          isshowPicker:false,
          editHeading:'',
          slots:
        [ {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'right'
        }, {
          flex: 1,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot3',
          textAlign: 'center'
        }, {
          flex: 1,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot3',
          textAlign: 'left'
        }]
      }
  },
  created(){
      let Data = {
          year :2018,
          arr : [],
          month : 1,
          arr2 : [],
          day :31,
          arr3 : []
      }
      for(;Data.year>=1920;Data.year--){
          Data.arr.push(Data.year);
      }

      for(;Data.month<=12;Data.month++){
          Data.arr2.push(Data.month)
      }

      for(;Data.day>0;Data.day--){
          Data.arr3.push(Data.day)
      }

      this.slots[0].values = Data.arr;
      this.slots[1].values = Data.arr2
      this.slots[2].values = Data.arr3;

      this.birthday = this.$route.query.birth
  },
  computed:{
      avatar() {
          return this.$store.state.login.avatarUrl
      },
      nickname(){
          
          return this.$store.state.login.nickname
      },
      gender(){  
          if(this.$store.state.login.gender===0) {
              return '男'
          }else{
              return '女'
          }
      },
      _birthday(){
         console.log('this.$store.state.login.birthDate'+this.$store.state.login.birthDate)
         return this.birthday = this.$store.state.login.birthDate
      },
      mobile(){
          return this.$store.state.login.mobile
      }
},
  methods:{
      unshow() {
          this.$emit('unshow')
      },
      _birth() {
          this.isshowPicker =true
      },
      onslotsChange(picker, values) {
          this.birthday = picker.getValues().join('-')
      },
      unshowPicker() {
          this.$api({
            method:'get',
            url:'/mine/user/profile/update',
            params:{birthDate:this.birthday}
          }).then(res =>{
            if(res.data.code ==='2000'){
              this.isshowPicker = false;
            }else{
                Toast({
                message: '更新生日失败',
                position: 'bottom',
                duration: 1000,
                position: 'middle'
              });
            }
          })
      },
      showEdit(event) {
          if(event.currentTarget.id ==='mobile'){
              this.$router.push({path:'/personalEdit', query :{kind:'手机号'}})
          }else if(event.currentTarget.id==='gender'){
              this.$router.push({path:'/personalEdit', query :{kind:'性别'}})
          }else if(event.currentTarget.id==='nickname'){
              this.$router.push({path:'/personalEdit', query :{kind:'昵称'}})
          }
      }
  }
  
}
</script>


<style lang="less" scoped>
@import '../../assets/user/icon/fonts1/iconfont.css';
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

.personal{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right:0;
    background: #fff;
    z-index: 2;
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
    }
    .content{
        height: 30vh
    }
    .portrait{
        margin-top: 12vw;
        height: 40vw;
        position: relative;
        & span{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            border-radius: 50%;
            overflow: hidden;
            width: 30vw;
            height: 30vw;
            img{
                width:100%;
                height: 100%;
            }
        }
    }
    .option{
      display: flex;
      justify-content: space-between;
      line-height: 7vh;
      background: #fff;
      padding: 0 0 0 3vw;
      border-top: 1px solid #efebeb;
      font-size: 14px;
      &:last-child{
          border-bottom: 1px solid #efebeb;
      }
      .data{
          color: #afabab;
          margin-right: -40vw
      }
      .icon{
          font-size: 20px;
          width: 30px;
          text-align: center;
          .go{
              vertical-align: -2px
          }
      }
  }
  .pick{
      position: absolute;
      width: 100%;
      bottom: 6vw;
      z-index: -1;
      height: 52vw;
      .cancle{
          text-align: center;
          margin-top: 1vw;
          line-height: 30px;
      }
      .picker-fontSize{
          font-size: 16px
      }
      .picker-slot{
          font-size: 10px
      }
  }
  .edit{
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0
  }
}

</style>
