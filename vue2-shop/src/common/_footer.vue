<template lang="html">
  <!-- gotoRouter:点击后路由跳转到与id名相同的route.name所对应的路径 -->
  <footer class="footer" @click.stop='gotoRouter'>
    <mt-tabbar v-model="selected" fixed>
    <mt-tab-item id="首页">
        <div class="footer_icon">
      <img v-if="selected!=='首页'" src="../assets/icon/tab_icon_home_nor@2x.png" class="footer_icon_img"/>
      <img v-if="selected==='首页'" src="../assets/icon/tab_icon_home_se@2x.png" class="footer_icon_img"/>
      首页
      </div>
    </mt-tab-item>
    <mt-tab-item id="品牌">
      <div class="footer_icon">
      <img v-if="selected!=='品牌'" src="../assets/icon/tab_icon_category_nor@2x.png" class="footer_icon_img"/>
        <img v-if="selected==='品牌'" src="../assets/icon/tab_icon_category_se@2x.png" class="footer_icon_img"/>
      品牌
      </div>
    </mt-tab-item>
      <mt-tab-item id="搜索页">
        <div class="footer_icon">
      <img v-if="selected!=='搜索页'"  src="../assets/icon/tab_icon_search_nor@2x.png" class="footer_icon_img"/>
      <img v-if="selected==='搜索页'"  src="../assets/icon/tab_icon_search_se@2x.png" class="footer_icon_img"/>
      搜索
      </div>

      </mt-tab-item>
    <mt-tab-item id="购物车页">
      <div class="footer_icon">
      <img src="../assets/icon/tab_icon_cart_nor@2x.png" v-if="selected!=='购物车页'" class="footer_icon_img"/>
      <img src="../assets/icon/tab_icon_cart_se@2x.png" v-if="selected==='购物车页'" class="footer_icon_img"/>
      购物车
      </div>

    </mt-tab-item>
    <mt-tab-item id="用户页">
    <div class="footer_icon">
      <img v-if="selected!=='用户页'" src="../assets/icon/tab_icon_my_nor@2x.png" class="footer_icon_img"/>
      <img v-if="selected==='用户页'" src="../assets/icon/tab_icon_my_se@2x.png" class="footer_icon_img"/>
      我的
      </div>

    </mt-tab-item>
  </mt-tabbar>
  </footer>
</template>

<script>
  export default {
    methods: {
      gotoRouter() {
          this.$router.push({
          name: this.selected
          })
      }
    },
    data() {
      return {
        //对应mt-tab-item 的id值
        selected: '首页'
      }
    },
    mounted() {

      //获取当前路由名称，根据该名称给当前footer添加is-selected
      let Rname = this.$route.name;
      switch (Rname) {
        case '首页':
          this.selected = '首页';
          break;
        case '品牌':
          this.selected = '品牌';
          break;
        case '搜索页':
          this.selected = '搜索页';
          break;
        case '购物车页':
          this.selected = '购物车页';

          break;
        case '用户页':
          this.selected = '用户页';
          break;
      }
    }

  }
</script>

<style lang="less" scoped>
  @import '../assets/fz.less';
  @import '../assets/index/style.css';
  .footer_icon_img{
    width: 22px;height: 22px;margin-bottom: 5px
  }
.footer_icon{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.mint-tab-item-label:hover {
  color:#333;

}
  .footer {


    .mint-tabbar {
      background-color: #fff;
      background-image: none;
      box-shadow: 0 0 2.2vw 0 hsla(0, 6%, 50%, .13);
      -webkit-box-shadow: 0 0 2.2vw 0 hsla(0, 6%, 50%, .13);
      .is-selected {
        color: #333333;
        background-color: #fff;
        i {
          &::before {
            color: #333333;
          }
        }
      }
      i {
        .fz(font-size, 42);
      }
    }
  }
</style>
