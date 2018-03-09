<template>
  <div class="confirm">
      <div class="main">
          <div class="head">
              <div>合伙人开通失败</div>
              <div>
              {{this.$route.query.msg}}
              </div>
          </div>
          <div class="bot">
              <button @click="skip" class="btn">确认返回</button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
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
      padding: 20px;
      height: 94% 
  }
  .head{
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      background:	#E8E8E8;
      height: 50vw
  }
  .bot{
      height: 70vw;
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
  }
</style>
