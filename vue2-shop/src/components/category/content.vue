<template lang="html">
<div class="main">
  <ul v-for="(item,index) in formdata" :key="index">

    <li >
      <router-link :to="'/productList/search/'+item.name" class="left" style="text-align: left;padding-left: 10px;height: 40px;line-height: 40px;font-size: 18px;">{{item.name}}</router-link>
    </li>
    <li>
      <!--查看全部-->
      <router-link :to="'/productList/search/'+item.name" class="right"
      style="text-align: right;padding-right: 10px;height: 40px;line-height: 40px;color: #999999;font-size: 12px">查看全部</router-link>
    </li>
    <li v-for="(subitem,index) in item.subCates" :key="index" style="float: left;">
      <!--分类id在这儿-->
      <router-link :to="'/productList/cate/'+ subitem.id" v-if="subitem.name">
        <span style="float: left">
         {{subitem.name}}
        </span>
        <span style="float: right;line-heght:60px;height:60px" class="img-span">
          <img src="./../../assets/icon/arrow-r.png" alt="">
        </span>
      </router-link>
    </li>

    <!--<li>-->
      <!--<router-link :to="{name:'详情页'}">-->
        <!--<span style="float: left">-->
          <!--衬衫-->
        <!--</span>-->
        <!--<span style="float: right">-->
          <!--<img src="./../../assets/icon/arrow-r.png" alt="">-->
        <!--</span>-->
      <!--</router-link>-->
    <!--</li>-->
  </ul>
</div>

</template>

<script>
  export default {
    data(){
      return {
          formdata:{}
      }
    },
    created:function() {
        this.$api({
          url: '/product_cate/list_origin',
          method: 'get'
        }).then(response =>{
          this.formdata = response.data.data.categorys;
          var tep = this.formdata;
          for(var i = 0;i<tep.length; i++){
            if(tep[i].subCates.length%2 != 0){
              this.formdata[i].subCates.push({});
            }
          }

          console.log(response);
          console.log(this.formdata)
        }).catch(() => {
          console.log(1)
        })
    },
    methods:{

    }
  }
</script>

<style lang="less" scoped>
  .main {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    flex: 12;
    height: 100%;
    &::-webkit-scrollbar {display:none}
    >h2 {
      font-size: 24px;
      padding: 2vw 4vw;
      color:#333;
      letter-spacing: 2px;
      background-color: rgb(247, 247, 247);
    }
    >ul {
      width: 100%;
      display: -webkit-flex;
      display: -ms-flex;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      background-color: rgb(247, 247, 247);
      padding-bottom: 10PX;

      li {
        background-color: rgb(247, 247, 247);
        width: 50%;
        text-align: center;
        a {
          color: #666;
          display: block;
          background-color: #ffffff;
          height: 60px;
          line-height: 60px;
          margin-top: 2px;
          font-size: 13px;
          img {
            display: block;
            width: 3.5vw;
            height: 3.5vw;
            margin: 4vw auto;
          }
          span {
            text-align: center;
            padding-left: 10px;
            padding-right: 14px;
          }
          .img-span{
            display: flex;
            flex-direction: column;
            justify-content: center
          }
        }
      }
      li:nth-of-type(2n) a{
        margin-left: 2px;
      }

      li:nth-of-type(2) a{
        margin-left: 0px;
      }
    }
  }
</style>
