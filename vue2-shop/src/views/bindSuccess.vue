<template>
    <div id="app">
        <img src="../assets/icon/Success.png" style="width: 200px" alt="">
        <p>
          恭喜您绑定成功
        </p>

        <button @click="getback">返回首页>></button>
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

  },
  methods:{
      getback(){
          this.$router.push({path:'/'})
      }
  }
}
</script>

<style scoped>
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
        color: #CD3700;
        font-size: 30px;
        font-weight: bold
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
