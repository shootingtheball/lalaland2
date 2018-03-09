<template>
  <div class="confirm">
      <div class="main">
          <div class="head">
              <div class="title">合伙人开通失败</div>
              <div class="desc">
              {{this.$route.query.msg || this.message}}
              </div>
          </div>
          <div class="bot">
              <button @click="skip" class="btn">确认返回</button>
          </div>
      </div>
  </div>
</template>

<script>
import {getUrlKey} from '@/util/getHref.js'

export default {
    data(){
        return {
            message :''
        }
    },
    created() {
       this.message = decodeURIComponent(getUrlKey('message'))
       console.log(this.message)
    },
    methods:{
      skip(){
          this.$router.push({path:'/user'})
      }
  }
}
</script>


<style scoped>
  .confirm{
      background: 	#fff;
      position: fixed;
      left: 0;
      top: 0;
      height: 100vh;
      width: 100vw;
  }
  .main{
      padding: 3vw;
      height: 94% ;
  }
  .head{
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      background:	#E8E8E8;
      height: 30vh;
      padding: 40px 0 0 0 
  }
  .title{
      margin-bottom: 20px;
      font-size: 25px
  }
  .desc{
      font-size: 16px;
      font-weight: normal
  }
  .bot{
      height: 60vh;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      background:#5CACEE;
      align-items: center
  }
  button{
      margin-top: 18vw;
      height: 45px;
      width: 150px;
      border-radius: 5px;
      background: #fff
  }
</style>
