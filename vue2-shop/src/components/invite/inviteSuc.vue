<template>
  <div class="confirm">
      <div class="main">
          <div class="head">
            <div class="title">合伙人开通成功</div>
            <div class="desc">您已成为xxxx的合伙人，您可以享受合伙人相应权益，最终解析权归xxx所有</div>
          </div>
          <div class="bot">
              <button @click="skip1" class="btn">邀请合伙人</button>
              <button @click="skip2" class="btn">确认返回</button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  methods:{
      skip1() {
          this.$router.push({path:'/myinvitationcode'})
      },
      skip2(){
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
      background: #fff;
      margin-bottom: -30px;
  }
</style>
