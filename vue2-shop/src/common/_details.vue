<template lang="html">
  <div class="main">

    <div class="outcon">
      <div class="colse">
        <div>
          <div >
            <!--<img :src="currentSku.imageUrl[0]" alt="" style="width: 90px">-->
          </div>
          <div>
            <p style="font-size: 6px" >{{currentSku.title?currentSku.title:currentSku.name}}</p>
            <p style="margin-top: 10px;color: #ed175d;">￥{{currentSku.sellPrice}}</p>
          </div>
        </div>
        <div class="imgclose" @click="closeshow">
          <img src="./../assets/icon/close.png" alt="" style="width: 25px;height: 25px">
        </div>
      </div>

      <div class="color">
        <div style="font-size: 14px;">
          颜色
        </div>
        <div class="delcolor" v-if="featuresMap.length>0">
          <div :class="{active:active1==index}" @click="checkcoler(index)" v-for="(item,index) in featuresMap[0].value">{{item}}</div>
          <!--<div class="active">珊瑚红</div>-->
          <!--<div>深藏青</div>-->
        </div>
      </div>

      <div class="size">
        <div>
          尺码
        </div>
        <div class="desize" v-if="featuresMap.length>0">
          <div :class="{active:active2==index,disab:!colorMap[index]}" @click="checkgSize(index)"  v-for="(item,index) in featuresMap[1].value">
            {{item}}
          </div>
          <!--<div class="active">-->
            <!--38-->
            <!--</div>-->
            <!--<div>-->
            <!--38-->
            <!--</div>-->
            <!--<div>-->
            <!--38-->
            <!--</div>-->
            <!--<div>-->
            <!--38-->
          <!--</div>-->
        </div>
      </div>

      <div class="nub" >
        <div class="title">
          数量
        </div>
        <div class="denub">
          <v-nub @notnum="updatanum" @noinventory="noIventory"></v-nub>
        </div>
      </div>
    </div>

    <!--<div class="footer">-->
      <!--<div class="left">-->
      <!--<div class="kefu">-->
      <!--<div>-->
      <!--<img src="./../../assets/icon/icon-substitutepay.png" alt="">-->
      <!--</div>-->
      <!--<div>-->
      <!--客服-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="shopcar">-->
      <!--<div>-->
      <!--<img src="./../../assets/icon/icon-substitutepay.png" alt="">-->
      <!--</div>-->
      <!--<div>-->
      <!--购物车-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="right">-->
      <!--<div class="tocar">-->
      <!--加入购物车-->
      <!--</div>-->
      <!--<div class="pay">-->
      <!--立即购买-->
      <!--</div>-->
    <!--</div>-->

    <!--</div>-->
    <v-footer @toshow="checkshow" ref="footer" @tocars="addIntoCar" @immediatepay="payimmediate"></v-footer>
  </div>

</template>

<script>
  import nub from '@/components/car/num.vue'
  import footer from './car_footer.vue'
  import { Toast } from 'mint-ui';
  export default {
    components:{
      'v-nub': nub,
      'v-footer': footer
    },
    props:['skuInfo'],
    data() {
      return {
        active1:0,
        active2:0,
        currentSize: '',
        currentColor:'',
        currentSku: '',
        siblingSkus:[],
        skuMap:[],
        featuresMap:[],
        colorMap:[]
      }

    },
    created:function(){
     // console.log('this.skuInfo',this.skuInfo)
      // 这里进行skuFeatures的收集以及去重
      var arr = this.featuresMap
      this.currentSku = this.skuInfo.skuList[0]
      var that = this;
      var skuColor = [];
      var skuSize = [];
      var unique = {};
      if(this.skuInfo.skuList&&this.skuInfo.skuList.length>0){
        this.skuInfo.skuList.forEach(function(item,index){
              item.skuFeatures.forEach(function(sku){
                var featureId = sku.featureId;
                var name = sku.name;
                var text = sku.value[0];
                if(index===0){
                  if (name === "颜色") {
                    that.currentColor = text
                  } else if (name === '尺码'){
                    that.currentSize = text
                  }
                }

                if (name === "颜色") {
                  if (!unique[text]) {
                    skuColor.push(text);
                    unique[text] = text;
                  }
                } else if (name === '尺码'){
                  sku.value.forEach(function(k,j){
                    if (!unique[k]) {
                      skuSize.push(k);
                      unique[k] = k;
                    }
                  })
                }
            })
        })
        this.featuresMap = [{name: '颜色', value: skuColor}, {name: '尺码', value: skuSize}]
        if(this.currentSku.inventoryList.length>0){
          this.$store.commit('UPINVENTORYNUB',this.currentSku.inventoryList[0].count);
        }
       // console.log('this.featuresMap',this.featuresMap)
       // console.log('this.currentColor',this.currentColor,'this.currentSize',this.currentSize)
      }
      this.checkActive();
      this.currentnub = 1;
    },
    methods:{
      noIventory:function () {
        Toast({
          message: '该商品已是最大库存',
          position: 'middle',
          duration: 1000
        });
      },
      payimmediate:function(){
       //console.log('this.currentSku',this.currentSku)
        // 这里监听立即购买
        if(this.currentnub){
          let arr = this.currentSku;
          if(arr.imageUrl == undefined){
            arr.imageUrl = [''];
          }
          const product = [{
            title:arr.title,
            price:arr.sellPrice,
            size:this.currentSize,
            col:this.currentColor,
            id:arr.id,
            productId:arr.productId,
            imgPath:arr.imageUrl[0],
            choseBool:false,
            nub:this.currentnub
          }];
          this.$store.commit('ISimmediatePurchaseGood',product);
          this.$router.push({path:'/confirmorder',query:{pay:'payimmediate'}})
        }else{
          Toast({
            message: '请选择物品',
            position: 'middle',
            duration: 1000
          });
        }
      },
      checkActive:function(){
        var goodDate = this.skuInfo.skuList;
        var arrb = [];
        var that = this;
       // console.log('goodDate',goodDate)
        for(var i = 0;i< goodDate.length;i++){
          goodDate[i].skuFeatures.forEach(function(item,index) {
            if(item.name==='颜色'){
              if(item.value.indexOf(that.currentColor)!=-1){
                if(index===0){
                  arrb = arrb.concat(goodDate[i].skuFeatures[1].value)
                }else{
                  arrb = arrb.concat(goodDate[i].skuFeatures[0].value)
                }
               // console.log('goodDate[i].skuFeatures[1].value',item.value)
              }
            }
          })

        }
        this.skuMap = arrb;
        //console.log('arrb',arrb)
        //console.log('this.skuMap',this.skuMap)
        var arr = []
        for(var j = 0;j< this.skuMap.length;j++){
          if(arr.indexOf(this.skuMap[j])==-1){
            arr.push(this.skuMap[j]);
          }
        }
        this.skuMap = arr;
        var arrs =[];
        for(var k = 0;k< this.skuMap.length;k++){
          arrs[this.featuresMap[1].value.indexOf(this.skuMap[k])] = true;
        }
        for(var h = 0;h<this.featuresMap[1].value.length;h++){
          if(!arrs[h]){
            arrs[h] = false
          }
        }
       // console.log(arrs)
        this.colorMap = arrs;
       // console.log(this.colorMap)
      },
      checkeDate:function(data){
        var goodDate = this.skuInfo.skuList;
        //  console.log('this.currentColor',this.currentColor,'this.currentSize',this.currentSize)
        var flag = true;
        var that = this;
        for(var i = 0;i< goodDate.length;i++){
          goodDate[i].skuFeatures.forEach(function(item,index) {
            if(item.name==='颜色'){
              if(index===0){
                if(goodDate[i].skuFeatures[0].value.indexOf(that.currentColor)!=-1 && goodDate[i].skuFeatures[1].value.indexOf(that.currentSize)!=-1){
                  that.currentSku = goodDate[i];
                  flag = false;
                }
              }else{
                if(goodDate[i].skuFeatures[1].value.indexOf(that.currentColor)!=-1 && goodDate[i].skuFeatures[0].value.indexOf(that.currentSize)!=-1){
                  that.currentSku = goodDate[i];
                  flag = false;
                }
              }
            }
          })
          if(!flag){
            break;
          }
        }
       // console.log('this.currentSku',this.currentSku)
        if(this.currentSku.inventoryList.length>0){
          this.$store.commit('UPINVENTORYNUB',this.currentSku.inventoryList[0].count);
        }
       // console.log('this.$store.state.detail.inventoryNub',this.$store.state.detail.inventoryNub);


      },
      checkgSize(index){
        this.checkeDate();
        this.checkActive();
        // 判断不能选择库存没有的
        if(!this.colorMap[index]){
          for(var j = index;j<this.colorMap.length;j++){
            if(this.colorMap[j]){
              this.currentSize = this.featuresMap[1].value[index];
              this.active2 = j;
              break;
            }
          }
          Toast({
            message: '该商品没有库存',
            position: 'middle',
            duration: 1000
          });
        }else{
          this.currentSize = this.featuresMap[1].value[index]
          for(var i = 0;i<this.colorMap.length;i++){
            if(this.colorMap[i]){
              this.active2 = index;
            }
          }
        }

      },
      checkcoler:function(data){
        this.active1 = data;
        this.currentColor = this.featuresMap[0].value[data]
        this.checkeDate();
        this.checkActive();
      },
      checkshow:function(){
        this.$emit('toshow');
      },
      closeshow:function(){
        this.$emit('tocloseshow');
      },
      updatanum:function(data,flag){
        //this.$store.dispatch('setLocalCount',flag);
        //更新版本后有可能报错
        //this.$refs.footer.$emit('hehe',data);
       // this.$emit('updatanub');  周日注释掉
        this.currentnub = data;
        //这里，log出来的，滞后一步（这是父组件）
      },
      addIntoCar(){
        //console.log('this.currentSku',this.currentSku)
        let arr = this.currentSku;
        if(arr.imageUrl == undefined){
          arr.imageUrl = [''];
        }
        const product = [{
          title:arr.title,
          price:arr.sellPrice,
          size:this.currentSize,
          col:this.currentColor,
          id:arr.id,
          productId:arr.productId,
          imgPath:arr.imageUrl[0],
          productImage:this.skuInfo.imageUrl,
          choseBool:true,
          nub:this.currentnub,
          inventoryNub:this.currentSku.inventoryList?this.currentSku.inventoryList[0].count:0
        }];
        if(this.currentnub>0){
          this.$store.dispatch('addCarList',product);
          this.$store.dispatch('upDataNub');
          // 商品加入购物车之后，需要重新计算购物车所有商品数量
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  *{
    box-sizing: border-box;
  }
  .main{
    width: 100%;
    position: relative;
    box-sizing: border-box;

    .outcon{
      position: fixed;
      box-sizing: border-box;
      left: 0;
      bottom: 60px;
      width: 100%;
      padding: 2vw 3vw;
      background-color: #ffffff;
      .colse{
        display: flex;
        justify-content: space-between;
        height: 70px;
        >div:nth-of-type(1){
          display: flex;
          align-items: center;
          >div:nth-of-type(1){
            margin-top: -50px;
          }
          >div:nth-of-type(2){
            margin-left: 12px;
          }
        }
        .imgclose{
          margin-top: 10px;
        }
      }

      .color{
        margin-top: 14px;
        .delcolor{
          display: flex;
          margin-top: 12px;
          padding-bottom: 20px;
          border-bottom: 1px solid #dddddd;
          div{
            height: 21px;
            padding: 0 14px;
            font-size: 14px;
            border: 1px solid #000000;
            margin-right: 10px;
          }
          div.active{
            border: none;
            color: #ffffff;
            background-color:#ed145b;
          }
        }
      }

      .size{
        margin-top: 14px;
        .desize{
          display: flex;
          margin-top: 12px;
          padding-bottom: 20px;
          border-bottom: 1px solid #dddddd;
          div{
            height: 21px;
            line-height: 21px;
            padding: 0 14px;
            font-size: 14px;
            border: 1px solid #dddddd;
            margin-right: 10px;
            color: black;
          }
          div.active{
            background-color: #ed145b;
            border: none;
            color: #ffffff;
          }
          div.disab{
            border: none;
            background-color: #fafafa;
            color: black;
          }
        }
      }

      .nub{
        margin-top: 14px;
        .title{
          margin-bottom: 12px;
        }
      }
    }

    .footer{
      position: fixed;
      left: 0;
      bottom: 0;
      height: 60px;
      width: 100%;
      display: flex;
      .left{
        display: flex;
        border-top: 1px solid #dddddd;
        padding-top: 6px;
        width: 40%;
        .kefu{
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 50%;
          font-size: 12px;
        }
        .shopcar{
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 50%;
          font-size: 12px;
        }
      }
      .right{
        width: 60%;
        display: flex;
        text-align: center;
        height: 60px;
        line-height: 60px;
        .tocar{
          width: 50%;
          background-color: #000000;
          color: #ffffff;
        }
        .pay{
          width: 50%;
          background-color: #000000;
          color: #ffffff;
          margin-left: 2px;
        }
      }

    }
  }
</style>
