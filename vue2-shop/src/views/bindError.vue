<template>
  <div id="app">
    <img src="../assets/icon/err.png" style="width: 200px" alt="">
    <template v-if="!message">
      <p>
        您已经绑定过用户***
      </p>
      <p>
        请勿重复绑定。
      </p>
    </template>
    <template v-else>
      <p>
        {{message}}
      </p>
    </template>
    <!--<button>进入个人中心>></button> -->
  </div>
</template>

<script>
  import {getUrlKey} from '@/util/getHref.js'

  export default {
    name: 'app',
    data() {
      return {
        result: "",
        message: ""
      }
    },
    created() {
      this.message = getUrlKey('message')
      this.message = decodeURIComponent(this.message)
    },
    components: {}
  }
</script>

<style scoped>
  * {
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

  #app img {
    width: 80px;
    margin-top: 45px;
  }

  #app p {
    text-align: center;
    color: #CD3700;
    font-size: 30px;
    font-weight: bold
  }

  #app p:nth-of-type(1) {
    margin-top: 40px;
  }

  #app button {
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
