<template>
    <div id="app">
        <img src="../assets/icon/err.png" style="width: 200px" alt="">
        <p>
          您已经申请过认证
        </p>
        <p>
          不能再次申请。
        </p>

        <!--<button>进入个人中心>></button> -->
    </div>
</template>

<script>
export default {
  name: 'app',
  data() {
      return {
          result:""
      }
  },
  components: {

  }
}
</script>

<style>
    *{
        margin: 0;
        padding: 0;
    }
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
    background-color: #f3f3f3;
    min-height: 100%;
}
    #app  img{
        width: 80px;
        margin-top: 45px;
    }
    #app p{
        text-align: center;
    }

    #app p:nth-of-type(1){
        margin-top: 40px;
    }

    #app button{
        width: 240px;
        height: 60px;
        line-height: 60px;
        background-color: #e8065b;
        color: #ffffff;
        font-size: 22px;
        margin-top: 30px;
        outline: none;
    }
</style>
