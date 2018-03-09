import Util from '../../util/common'
import * as types from '../types'
import Vue from 'vue'


// 容器
const state = {
  productDatas:'',  //detail父组件请求的当前页面商品数据
  colSelected:0,   //0是index,表示第一个
  sizeSelected:0,  //0是index,表示第一个
  count:0,    //购物车里的商品数量
  carList:'',      //购物车的商品列表
  fetchLoading:false,     //全局加载状态的Loading
  selectedList:'',         //已选择的购物车商品列表
  unSelectedList:'',      //未选择的购物车商品列表,提交订单后用它替换carList
  isshowdel:types.IS_SHOW_DETAIL,
  defaultAddress: '' ,   //默认地址
  defaultCoupon:'',     //默认优惠券
  isFromConfrimOrder: false,   //判断是否来自confirm的跳转
  immediatePurchaseGood: false,  //当前的立即购买的物品
  currentNub: 0,       //立即购买的数量
  inventoryNub: 0   //当前库存数量
}

//更改 store 中的状态的唯一方法:提交 mutation
/*
  购物车逻辑:
      unSelectedList：未打钩的购物车商品列表
      SelectedList：已勾选的购物车商品列表
      carList:购物车商品列表
      当支付成功之后,购物车列表需要减掉SelectedList，留下unSelectedList
      直接用unSelectedList替换当前carList即可
*/
const mutations = {
  UPINVENTORYNUB(state,data){
      state.inventoryNub = data
  },
  CURRENTNUB(state,data){
    //这里，Log出来的是正确的    
    state.currentNub = data;
    //console.log("Vuex数量"+state.currentNub)
  },
  ISimmediatePurchaseGood(state,flag){
    if(flag){
      state.immediatePurchaseGood = flag;
    }else{
      state.immediatePurchaseGood = ''
    }
  },
  CHANGEFROMCONFFIMORDER(state,flag){
    if(flag){
      state.isFromConfrimOrder = true;
    }else{
      state.isFromConfrimOrder = false;
    }
  },
  ADDADDRESS(state,res){
        state.defaultAddress = res;
  },
  ADDCOUPON(state,res){
        state.defaultCoupon = res
  },
  SELECT_ALL(state){
    if((state.selectedList&&state.selectedList.length!=state.carList.length)||state.unSelectedList.length==state.carList.length ){
      //console.log(state.unSelectedList)
      state.carList.forEach(function(item){
        item.choseBool = true;
      })
    }else if(state.selectedList.length==state.carList.length){
      state.carList.forEach(function(item){
        item.choseBool = false;
      })
    }
  },

//异步请求的数据
  [types.SET_DATAS](state,res) {
    state.productDatas = res
  },

  //详情页商品颜色的选择
  [types.CHANGE_COL_SELECTED](state,res) {
      state.colSelected = res;
  },

  //详情页商品尺寸的选择

  [types.CHANGE_SIZE_SELECTED] (state,res) {
      state.sizeSelected = res;
  },

  // 向购物车商品列表添加商品
  [types.CHANGE_CARLIST] (state) {
    state.carList = Util.getLocal('carList');
  },

  //获取当前购物车商品数量
  [types.CHANGE_COUNT] (state) {
    state.count = Util.getLocal('count')
    //console.log(state.count)
  },

// 重置购物车
  [types.RESET_CARLIST] (state) {
    state.carList = Util.getLocal('carList')
  },

// 重置购物车数量
  [types.RESET_COUNT] (state) {
    state.count = Util.getLocal('carList').length
  },

// loading开关
  [types.SET_LOADING] (state,res) {
    state.fetchLoading = res
  },
// 购物车里打钩的商品
  ['SET_SELECTEDLIST'] (state,res) {
    state.selectedList = Util.getLocal('selectedList')
  },

//购物车里没打钩的商品

  ['SET_UNSELECTEDLIST'] (state) {
    state.unSelectedList = Util.getLocal('unSelectedList')
  },

  changdel(state){
    state.isshowdel = !state.isshowdel
  }

}

let vm = new Vue({});

// action提交mutations，不直接更改状态（通过store.dispatch触发）
const actions = {
  upDataNub({commit,state}){
    var arr = state.carList;
    var nub = 0;
    console.log(arr)
    if(arr&&arr.length!=0){
      arr.forEach(function(item){
        nub = nub + item.nub
      })
    }

    Util.setLocal(nub,'count',false);
    console.log("Util.getLocal('count')",Util.getLocal('count'))
    commit(types.CHANGE_COUNT);
  },

// 父组件发送异步请求
  setDatas({commit}) {
    vm.$api({
        method:'post',
        url:"/detail"
      }).then(response=>{
        commit('SET_DATAS',response.data);
      })
  },

// 购物车数量增减,true是加,false是减
  setLocalCount({commit},bool = true) {
    let count = Util.getLocal('count') || 0;
    if(bool) {
      Util.setLocal(++count,'count');
    }else {
        Util.setLocal(--count,'count');
    }
    commit(types.CHANGE_COUNT);
  },

  //网购物车列表添加数据
  addCarList({commit},res) {
    var flag = true;
    var goods = Util.getLocal('carList');
    if(goods&&goods.length!=0){
      goods.forEach(function(item,index){
        if(item.id==res[0].id){
          flag =  false;
          goods[index].nub = goods[index].nub + res[0].nub;
          //console.log('res.nub='+res[0].nub)
        }
      });
    }
    if(flag){
      Util.setLocal(res,'carList',true);
    }else{
      Util.setLocal(goods,'carList',false);
    }
    //console.log(Util.getLocal('carList'))
    commit(types.CHANGE_CARLIST)
  },

  //重新设置购物车商品列表,把打钩并提交的商品去掉,即保留unSelectedList

  resetCarList({commit,getters}) {
    const unSelectedList = Util.getLocal('unSelectedList');
    Util.setLocal(unSelectedList,'carList');
    commit(types.RESET_CARLIST)
  },
// 重置购物车数量Count,即没打钩的商品的数量
  resetCount({commit,getters}) {
    const count = Util.getLocal('unSelectedList').length;
    Util.setLocal(count,'count');
    commit(types.RESET_COUNT);
  },

// 删除购物车列表的某一项 （用新的数组直接替换）
  cutCarList({commit},res) {
    Util.setLocal(res,'carList');
    commit(types.RESET_CARLIST);
  },

// 分别保存打钩的商品和未打钩的商品
  setSelectedList({commit,getters}) {
    Util.setLocal(getters.selectedList,'selectedList');
    commit('SET_SELECTEDLIST');
    Util.setLocal(getters.unSelectedList,'unSelectedList');
    commit('SET_UNSELECTEDLIST');

  }

}

// 如同计算属性,处理state的某个状态
const getters = {

    selectedList(state) {
        // choseBool为真的商品 即打钩的商品
       if(state.carList!=='') {
         let arr = state.carList.filter((ele)=>{
           return ele.choseBool == true
         });
         return arr
       }
    },

    unSelectedList(state) {
      if(state.carList !=='') {
        let arr = state.carList.filter((ele)=>{
          return ele.choseBool == false
        });
        return arr
      }
    }

}




export default {
  state,
  actions,
  getters,
  mutations
}
