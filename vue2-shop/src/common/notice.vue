<template>
  <div class="notice">
      <div class="infor">
          {{message}}
      </div>
  </div>
</template>

<script>
export default {
  data() {
      return{
          message:""
      }
  }
}
</script>

<style scoped>
  .notice{
      position: relative;
  }
  .infor{
      position: absolute;
      left: 50%;
      right: 50%;
      transform: translate(-50%);
      transform: translate(-50%);
      text-align: center;
      color: #CD3700;
      font-size: 30px;
      font-weight: bold
  }
  
</style>
