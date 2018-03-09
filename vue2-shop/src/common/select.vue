<template>
  <div class="select" >
      <div class="ipt" @click="isshow"><input ref='vipt' type="text" placeholder="请选择" readonly="readonly" autocomplete="off"><span><i class="iconfont icon-xiangxia"></i></span></div>
      <div class="datalist" v-for="item in list" v-if="showlist" @click="choose(item)">{{item.name}}</div>
  </div>
</template>

<script>
export default {
  data() {
      return{
          showlist:false
      }
  },
  props:{
      list:{
          type:Array
      }, 
      option:{
          type:String
      }
  },
  methods:{
      choose(item){
          this.$refs.vipt.value = item.name;
          this.$emit('give',item.code);
          this.showlist =!this.showlist
      },
      isshow(){
          this.showlist =!this.showlist
      },
      getData(){
          debugger
          if(this.option ==='province'){
              this.getProvince();
          }
      }
  }
}
</script>

<style lang="less" scoped>
  @import '../assets/user/icon/fonts3/myStyle.css';
  .select{
      .ipt{
          position: relative;
          height: 20px;;
          input{
              height: 100%;
              width:100%;
          }
          span{
              position: absolute;
              top:0;
              right: 0;
              height: 20px;
              line-height: 20px;
          }
      }
  }
</style>
