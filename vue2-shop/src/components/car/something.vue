<template lang="html">

  <div class="wrap" ref="vWrap">
    <!--<v-gologin></v-gologin>-->
    <ul class="something" v-if='carList'>
      <li v-for="(k,i) in carList" :class="{move:isMove===i}">
        <v-touch v-on:swipeleft="swipeLeft(i)" v-on:swiperight="swipeRight(i)" v-bind:enabled="true" >
          <div class="something-left" @click="toggle">
            <label class="true" :class="{false:!k.choseBool}">
              <input type="checkbox" v-model="k.choseBool"> 
            </label>
          </div>
          <div class="something-middle">
            <img :src="k.imgPath?k.imgPath:k.productImage">
          </div>
          <div class="something-right" @click="topath(k.productId)">
            <p>{{k.title}}</p>
            <p style="color: #d8d8d8;"> {{k.col}} - {{k.size}}</p>

            <!--<div class="something-right-bottom" @click="cut(i)">-->

            <!--<span></span>-->
            <!--</div>-->
          </div>
          <div class="something-last">
            <p><span class='unit-price'>单价</span>￥{{k.price}}</p>
            <div class="count">
              <v-num :totalnub="{a:k,b:i}" @noinventoryToCar="noInventoryToCar"></v-num>
            </div>
          </div>
          <div class="deleteGood">
            <!--<div>-->
              <!--收藏-->
            <!--</div>-->
            <div class="todelete" @click="cut(i)">
              删除
            </div>
          </div>
        </v-touch>

      </li>

    </ul>

  </div>
</template>

<script>
// 提示登录组件
import Gologin from '@/components/car/gologin.vue'
import Util from '../../util/common'
import num from './num.vue'
import { Toast } from 'mint-ui';
import BS from "better-scroll"

export default {
  data(){
    return {
      nub: 0,
      isMove:''
    }
  },
  components: {
    'v-gologin': Gologin,
    'v-num': num
  },
  computed: {
    carList() {
      return this.$store.state.detail.carList;
      console.log(this.$store.state.detail.carList)
    }
  },
  created(){
    this.$nextTick(() => {
      this.getScroll()
    })
  },
  methods: {
    getScroll(){
      console.log(this.$refs.vWrap)
      let scroll = new BS(this.$refs.vWrap,{click:true}) 
    },
    noInventoryToCar:function() {
      Toast({
        message: '该商品已是最大库存',
        position: 'middle',
        duration: 1000
      });
    },
    swipeLeft:function(data){
      console.log('Swipe me!');
      this.isMove = data;
    },
    swipeRight:function(data){
      console.log('Swipe me!');
      this.isMove = '';
    },
    topath:function(data) {
      this.$router.push({ path: '/detail/'+data})
    },
    cut(i){
    // 点击垃圾桶，删除当前商品，这里用splice和filter都会bug,只能重置数组
      let newCarList= [];
      var nub = 0;
      for (let k = 0; k < this.carList.length; k++) {
          if(k!==i) {
            newCarList.push(this.carList[k])
          }
        if(k==i) {
          nub = this.carList[k].nub
        }
      }
      //点击垃圾桶 把商品数量count-1
      for(var j = 0;j<nub;j++){
        this.$store.dispatch('setLocalCount',false);
      }
         this.$store.dispatch('cutCarList',newCarList);
    },
    toggle() {
      // console.log(this.$store.getters.selectedList)
      setTimeout(() => {
          // 每点击一下都会改变choseBool的布尔值,所以要重置数组
          this.$store.dispatch('cutCarList',this.carList)

      }, 0);
      this.$store.dispatch('setSelectedList')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/fz.less';
.wrap {
    width: 100%;
    .something {
        width: 100%;
       // height: 100%;
        > li {
          width: 120%;
          transition:all 0.6s;
          >div{
            display: -ms-flex;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            padding: 4vw 2vw;
            position: relative;
            height: 21vw;
            .bd();
            .something-left {

              label {
                float: left;
                background: url("../../assets/car/images/tr.svg") no-repeat center center/50% 50%;
                input {
                  height: 14vw;
                  width: 14vw;
                  opacity: 0;
                  filter: alpha(opacity=0);
                }
              }
              .false {
                background: url("../../assets/car/images/f.svg") no-repeat center center /50% 50%!important;
              }

            }
            .something-middle {
              height: 20vw;
              width: 20vw;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              img {
                display: block;
                width: 100%;
                height: 100%;
              }
            }
            .something-right {
              height: 100%;
              display: -ms-flex;
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              -webkit-box-orient: vertical;
              -webkit-box-direction: normal;
              -ms-flex-flow: column wrap;
              flex-flow: column wrap;
              -webkit-box-pack: justify;
              -ms-flex-pack: justify;
              /*justify-content: space-between;*/
              padding-left: 2vw;
              -webkit-box-sizing: border-box;
              box-sizing: border-box;
              width: 40vw;
              p {
                //overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                font-size: 12px;
              }
              p:last-of-type {
                font-size: 12px;
                color: #d8d8d8;
                margin-top: 6px;
              }
              .something-right-bottom {

                > div {
                  display: -ms-flex;
                  display: -webkit-box;
                  display: -ms-flexbox;
                  display: flex;
                  -webkit-box-align: center;
                  -ms-flex-align: center;
                  align-items: center;
                  input {
                    width: 6vw;
                    text-align: center;
                  }

                  span {
                    height: 7vw;
                    line-height: 7vw;
                    width: 8vw;
                    display: inline-block;
                    border: 0.2vw solid #f1f1f1;
                    border-radius: 1vw;
                    text-align: center;
                    font-size: 20px;
                    cursor: pointer;
                  }
                }
                > span {
                  position: absolute;
                  right: 0;
                  bottom: 0;
                  width: 13vw;
                  height: 13vw;
                  background: url("../../assets/car/images/laji.svg") no-repeat center/50%;
                }
              }

            }
            .something-last{
              display: -ms-flex;
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              flex-direction: column;
              -webkit-box-orient: vertical;
              -webkit-box-direction: normal;
              font-size: 12px;
              height: 100%;
              justify-content: space-between;
              align-items: flex-end;
              .unit-price{
                color: #e8065b;
                font-size: 12px
              }
              p{
                align-self: center;
                font-size: 14px;
                color: #e8065b;

              }

            }
            .deleteGood{
              display: flex;
              width: 20vw;
              align-items: center;
              .todelete{
                line-height: 21vw;
                width: 20vw;
                text-align: center;
                margin-left: 8px;
                background-color: #e8065b;
                color: #ffffff;

              }
            }
          }

        }

        >li.move{
          transform: translateX(-16%);

        }

    }
    label,
    span {
        &:active {
            -webkit-transform: scale(1.3);
            transform: scale(1.3);
        }
    }
}
</style>
