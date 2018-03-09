<template>
  <div class="success">
      <div class="infor">
          <div class="logo">
              <span class="image"><img src="../assets/icon/right.png" alt=""></span>
          </div>
          <div class="message">
              恭喜您，认证成功
          </div>
      </div>
      <div class="change">
          <div class="btn" @click="jump">
              我的中心
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
      return {

      }
  },
  methods:{
      jump() {
          this.$router.push({ path: 'user', query: { time: -1 }})
      }
  }
}
</script>

<style scoped>
  .infor{
      
  }
  .logo{
      position: relative;
      height: 370px;
  }
  .image{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%)
  }
  .message{
      text-align: center;
      color: #CD3700;
      font-size: 30px;
      font-weight: bold
  }
  .change{
      margin-top: 80px;
      text-align: center;
      position: relative;

  }
  .btn{
      background-color: #f5a42f;
      color:#fff;
      position: absolute;
      left: 50%;
      height: 40px;
      width: 100px;
      transform: translate(-50%);
      font-size: 14px;
      line-height: 40px
  }
</style>
