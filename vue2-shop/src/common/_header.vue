<template>
  <header>
    <router-link
     class="icon-go"
     :to="{ name: '首页'}"
     v-if="this.$route.matched[0].path=='/category'">
    </router-link>
    <span class="icon-go" @click="$router.back();return false;" v-else></span>
    <slot name="title"></slot>
  </header>
</template>


<style lang="less" scoped>
@import '../assets/fz.less';
@import '../assets/index/style.css';
header {
  background-color: #000000;
  text-align: center;
  position: relative;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 12vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4vw;
  h1 {
    .fz(font-size,34);
    letter-spacing: .2vw;
    font-weight: 600;
    margin-right: 36vw;
    color: #ffffff;
  }
  span,a {
    display: inline-block;
    .fz(font-size,46);
    transform: rotate(-180deg);
    &::before {
      color: #ffffff;
    }
  }
}


</style>


<script>
export default {

}
</script>
