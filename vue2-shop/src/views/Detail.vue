<template lang="html">
  <div class="detail">
    <!--<v-swiper> </v-swiper>-->
    <div class="topimg">
      <img :src="formdata.imageUrl?formdata.imageUrl[0]:defaultImageUrl" alt="">
    </div>
    <!--<v-chose></v-chose>-->
    <div class="toptitle">
      <h1 style="font-size: 18px;">{{productInfo.name?productInfo.name:productInfo.skuList[0].title}}</h1>
      <p style="font-size: 15px;">￥{{productInfo.skuList[0].sellPrice}}</p>
      <s style="font-size: 12px;color: #737373">{{productInfo.skuList[0].marketPrice}}</s>
    </div>

    <!--<div class="discount">-->
      <!--<div class="left">-->
        <!--<div>领优惠券</div>-->
        <!--<div><button style="outline: none;border: none;background-color: #ffffff"><img src="./../assets/icon/icon_click@2x.png" style="width: 18px" alt=""></button></div>-->
      <!--</div>-->
      <!--<div class="right">-->
        <!--<div>促销活动</div>-->
        <!--<div><button style="outline: none;border: none;background-color: #ffffff"><img src="./../assets/icon/icon_click@2x.png" style="width: 18px" alt=""></button></div>-->
      <!--</div>-->
    <!--</div>-->

    <div class="brand">
      <div class="left">
        <div class="leftimg">
          <img :src="formdata.brandImageUrl" alt="">
        </div>
        <div class="leftbrand">
          <h2>{{formdata.brandName}}</h2>
          <p>{{formdata.countInventory}}</p>
        </div>
      </div>
      <div class="right">
        <button>
          进入品牌
        </button>
      </div>
    </div>

    <div class="brandcontent">
      <h2>商品信息</h2>
      <div>品牌：{{formdata.brandName}}</div>
      <div>款号：{{formdata.productCode}}</div>
      <div>颜色：{{skuMap.colorMap}}</div>
      <!--<div v-if="item">材质：<span v-for="item in skuMap.abricfMap">{{item.name}}:{{item.value}} </span></div>-->
    </div>
    <!--<v-content></v-content>-->

    <div class="content">
      <div class="title">
        图文详情
      </div>

      <div class="details" v-html="formdata.detail" id="skuDetail">

      </div>


      <div class="size">
        <!--<div class="title">-->
          <!--尺码 <span>因不同的计量方法，测量允许1~3cm误差（CM）</span>-->
        <!--</div>-->

      </div>
    </div>


    <div class="dolike">
      <!--<div>猜你喜欢</div>-->
      <div></div>
      <div></div>
      <div></div>
    </div>


    <!--这是购买物品的弹出框-->
    <transition
      appear-class="custom-appear-class"
      appear-to-class="custom-appear-to-class"
      appear-active-class="custom-appear-active-class"
      name="fade">
      <div class="toast" v-if="show">
        <v-details @toshow="checkshow" @tocloseshow="show=!show" :skuInfo="productInfo"></v-details>
      </div>
    </transition>

    <!--<v-baseline></v-baseline>-->
    <v-footer @toshow="checkshow" ref="footer" @toshopcar="show=!show" @immediatepay="norshow"></v-footer>
  </div>
</template>

<script>
import Swiper from '@/components/detail/swiper.vue'
import Chose from '@/components/detail/chose.vue'
import Content from '@/components/detail/content.vue'
import Footer from '@/common/car_footer.vue'
import Baseline from '@/common/_baseline.vue'
import details from '@/common/_details.vue'
export default {
  components:{
    'v-swiper':Swiper,
    'v-chose':Chose,
    'v-content':Content,
    'v-footer':Footer,
    'v-baseline':Baseline,
    'v-details':details
  },
  data:function(){
     return {
       show : false,
       formdata: {

       },
       productInfo:{skuList:[{}]},
       skuMap:{}
     }
  },
  created:function(){
      this.$api({
        url: 'product/info',
        method: 'get',
        params:{productId:this.$route.params.id,sibling:true}
      }).then(response =>{
        console.log(response);
        console.log(this.formdata)
        if(response.data.code==="2000"){
          if(response.data.data!=null>0){
            this.formdata = response.data.data;
            this.productInfo=response.data.data;
            var colorMap = [];
            var abricfMap = [];
            var uniqe = {};
            if(this.productInfo.skuList){
              this.productInfo.skuList.forEach(function(item2) {
                item2.skuFeatures.forEach(function(k) {
                  var name = k.name;
                  if(name=='颜色'){
                    k.value.forEach(function(j) {
                      if(!uniqe[j]){
                        colorMap.push(j);
                        uniqe[j] = j
                      }
                    })

                  }
                })
              })
            }

            if(this.productInfo.productFeatures){
              this.productInfo.productFeatures.forEach(function(item,index) {
                var obj = {}
                obj.name = item.name
                obj.value = item.value.join(',')
                abricfMap.push(obj);
              })
            }


            this.skuMap = {}
            this.skuMap.colorMap = colorMap.join(',');
            this.skuMap.abricfMap = abricfMap
            this.$store.commit('CHANGE_CARLIST');
          }
        }
      })
  }
  ,
  beforeCreate(){
    // this.$store.dispatch('setDatas');
  },
  methods:{
    norshow:function(){
      if(!this.show){
        this.show = true;
      }
    },
    checkshow:function(){
      this.$refs.footer.$emit('hehe');
      this.show = true;
    }
  }
}
</script>

<style lang="less">
  #skuDetail{
      p{
        img{
          width: 100%;
          margin-bottom: 10px;
        }
      }
  }
</style>

<style lang="less" scoped>
  *{
    box-sizing: border-box;
  }
.detail {
  width: 100%;
  padding-bottom: 60px;
  background-color: #f4f4f4;
  .topimg{
    img{
      width: 100%;
    }
  }
  .toptitle{
    padding: 40px 20px 30px;
    background-color: #ffffff;
  }
  .discount{
    margin-top: 20px;
    padding: 0 20px;
    background-color: #ffffff;
    color: #EE3A23;
    >div{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 43px;
    }

  }
  .brand{
    display: flex;
    justify-content: space-between;
    padding: 15px 20px;
    background-color: #ffffff;
    align-items: center;
    margin-top: 10px;
    .left{
      display: flex;
      .leftimg{
        img{
          width: 55px;
        }
      }
      .leftbrand{
        margin-left: 10px;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        h2{
          font-size: 16px;
        }
        p{
          font-size: 12px;
          color: #989898;
          margin-top: 8px;
        }
      }
    }
    .right{
      button{
        outline: none;
        border: 1px solid #ff1700;
        border-radius: 12px;
        padding: 4px 12px;
        color: #fd1900;
        background-color: #ffffff;
      }
    }
  }
  .brandcontent{
    h2{
      margin-bottom: 6px;
      font-size: 22px;
    }
    background-color: #ffffff;
    margin-top: 10px;
    padding: 15px 20px;
  }
  .content{
    width: 100%;
    background-color: #ffffff;
    margin-top: 10px;
    padding: 15px 20px;
    .title{
      margin-bottom: 10px;
      font-size: 20px;
    }
    .img{
      margin-top: 20px;
      img{
        width: 100%;
      }
    }
    /*.detail{*/
      /*width: 100%;*/
      /*p{*/
         /*img{*/
           /*width: 100%;*/
         /*}*/
      /*}*/
    /*}*/
  }
  .dolike{
    background-color: #ffffff;
  }
  .toast{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.8);
    z-index: 101;
  }
  .custom-appear-class,.custom-appear-to-class,.custom-appear-active-class{
    transtion:all 10s;
  }
}
</style>
