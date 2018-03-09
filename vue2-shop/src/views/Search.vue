<template lang="html">
  <div class="search">
    <mt-header title="搜索" icon="search" style="background-color: #1f1f1f;height: 45px" fixed>
      <router-link :to="{name:'首页'}" slot="left">
        <mt-button icon="back" ></mt-button>
      </router-link>
    </mt-header>

    <div class="search-input">
      <input type="text" placeholder="搜索您想要的商品或品牌" v-model="content" @blur="toSearch">
    </div>
    <div class="nowSearch">
      <div>最近搜索</div>
      <span @click="FAKENATOO">FAKENATOO</span>
      <span @click="jacket">羽绒服</span>
      <span @click="leather">皮衣</span>
    </div>
    <!--<div class="search-tip">最近搜索</div>-->
    <!--<div class="search-list">最近搜索</div>-->
    <!--<div class="search-tip">最近搜索</div>-->
    <!--<div class="search-list">最近搜索</div>-->
    <v-bottomBar></v-bottomBar>
  </div>
</template>

<script>
  import bottomBar from '@/common/_footer.vue'

export default {
  data(){
    return{
      content:''
    }
  },
  components:{
    'v-bottomBar':bottomBar
  },
  methods:{
    toSearch:function(){
      if(this.content){
          this.$router.push({path:'/productList/search/'+this.content})
      }
    },
    FAKENATOO() {
      this.$router.push({path:'/productList/search/'+"FAKENATOO"})
    },
    jacket() {
      this.$router.push({path:'/productList/search/'+"羽绒服"})
    },
    leather() {
      this.$router.push({path:'/productList/search/'+"皮衣"})
    }
  }


}
</script>

<style lang="less" scoped>
  .search {
    padding-top: 45px;
    .search-input {
      margin-top: 59px;
      margin-bottom: 27px;
      text-align: center;
      input {
        width: 250px;
        height: 32px;
        line-height: 32px;
        border-bottom: 2px solid #000;
        text-align: center;
        &::-webkit-input-placeholder {
          color: #000;
          height: 32px;
          line-height: 32px;
          vertical-align: bottom;
        }
        &::-moz-placeholder {
          color: #000;
          height: 32px;
          line-height: 32px;
          vertical-align: bottom;
        }
        &:-ms-placeholder {
          color: #000;
          height: 32px;
          line-height: 32px;
          vertical-align: bottom;
        }
      }
    }
    .search-tip, .search-list {
      text-align: center;
      margin-bottom: 25px;
    }
    .nowSearch{
      text-align: center;
      div{
        padding-bottom: 20px;
      }
      span{
        margin-right: 10px;
        color: #666666;
      }
    }
  }
</style>
