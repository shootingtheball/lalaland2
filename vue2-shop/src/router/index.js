import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
//按需加载,当渲染其他页面时才加载其组件,并缓存,减少首屏加载时间
const Index = resolve => require(["@/views/Index.vue"], resolve);
const Category = resolve => require(["@/views/Category.vue"], resolve);
const CategoryMain = resolve =>
  require(["@/components/category/main.vue"], resolve);
const Car = resolve => require(["@/views/Car.vue"], resolve);
const User = resolve => require(["@/views/User.vue"], resolve);
const Detail = resolve => require(["@/views/Detail.vue"], resolve);
const Search = resolve => require(["@/views/Search.vue"], resolve);
const Pay = resolve => require(["@/components/car/pay/pay.vue"], resolve);
const Login = resolve => require(["@/views/login.vue"], resolve);
const newLogin = resolve => require(["@/views/newLogin.vue"], resolve);
const bindMobile = resolve => require(["@/views/bindMobile.vue"], resolve);

const RealnameAuth = resolve => require(["@/views/RealnameAuth.vue"], resolve);
const Order = resolve => require(["@/views/order.vue"], resolve);
const orderdetails = resolve =>
  require(["@/components/order/orderdetails.vue"], resolve);
const orderlogistics = resolve =>
  require(["@/components/order/catlogistics.vue"], resolve);

const mypropfit = resolve => require(["@/views/myprofit.vue"], resolve);
const myintegral = resolve => require(["@/views/myintegral.vue"], resolve);

const myinvitationcode = resolve =>
  require(["@/views/myinvitationcode.vue"], resolve);
const mycoupon = resolve => require(["@/views/mycoupon.vue"], resolve);
const godsdetails = resolve =>
  require(["@/components/car/details.vue"], resolve);
const addressindex = resolve =>
  require(["@/components/user/index.vue"], resolve);
const address = resolve => require(["@/components/user/address.vue"], resolve);
const seachList = resolve =>
  require(["@/components/category/searchlist.vue"], resolve);
const confirmorder = resolve => require(["@/views/confirmorder.vue"], resolve);
const manageaddress = resolve =>
  require(["@/components/user/manageaddress.vue"], resolve);
const editAddress = resolve =>
  require(["@/components/user/editAddress.vue"], resolve)
const catdetaillogistics = resolve =>
  require(["@/components/order/catdetaillogistics.vue"], resolve);
const productList = resolve =>
  require(["@/components/product/productList.vue"], resolve);
const brand = resolve => require(["@/views/brand.vue"], resolve);

const shareinvite = resolve =>
  require(["@/views/publicinvite.vue"], resolve);

const bindError = resolve =>
  require(["@/views/bindError.vue"], resolve);

const Verfiy = resolve =>
  require(["@/views/Verfiy.vue"],resolve)

const bindSuccess = resolve =>
  require(["@/views/bindSuccess.vue"],resolve)

const partnerLoginSuccess = resolve =>
  require(["@/components/partnerLogin/partnerLoginSuccess.vue"],resolve)

const account = resolve =>
require(["@/components/user/account.vue"],resolve)

const confirm = resolve =>
require(["@/components/invite/confirm.vue"],resolve)

const signIn = resolve =>
require(["@/components/invite/signIn.vue"],resolve)

const inviteSuc = resolve =>
require(["@/components/invite/inviteSuc.vue"],resolve)

/*const inviteFai = resolve =>
require(["@/components/invite/inviteFai.vue"],resolve)
*/

const inviteStr = resolve =>
require(["@/components/inviteStranger/inviteStr.vue"],resolve)

const partnerInviteNotBindLogin = resolve =>
  require(["@/components/partner/invite/login/mobilenotbind/index.vue"],resolve)
const inviteStrErr = resolve =>
require(["@/components/inviteStranger/inviteStrErr.vue"],resolve)

const inviteRealname = resolve =>
require(["@/components/inviteStranger/inviteRealname.vue"],resolve)

const share = resolve =>
require(['@/components/inviteStranger/share.vue'],resolve )

const rule = resolve =>
require(['@/components/myinvitationcode/rule'],resolve )

const directionalLogin = resolve =>
require(['@/components/partner/directional/login.vue'],resolve )

const personal = resolve =>
require(['@/components/user/personal.vue'],resolve )

const personalEdit = resolve =>
require(['@/components/user/personalEdit.vue'],resolve )

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "首页",
      component: Index
    },
    {
      path: "/category",
      name: "分类页",
      // redirect: '/category/all',
      component: Category
      // children: [{
      //   path: '/category/:tab',
      //   component:CategoryMain
      // }]
    },
    {
      path: "/car",
      name: "购物车页",
      component: Car
    },
    {
      path: "/car/pay",
      name: "支付页",
      component: Pay
    },
    {
      path: "/user",
      name: "用户页",
      component: User,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录才能进入的
      }
    },
    {
      path: "/detail/:id",
      name: "详情页",
      component: Detail
    },
    {
      path: "/brand",
      name: "品牌",
      component: brand
    },
    {
      path: "/search",
      name: "搜索页",
      component: Search
    },
    {
      path: "/login",
      name: "登录页",
      component: Login
    },
    {
      path: "/newLogin",
      name: "登录页面",
      component: newLogin,
      //alias:"/partner/invite/login"
    },
    {
      path: "/bindMobile",
      name: "登录页面",
      component: bindMobile,
      //alias:"/partner/invite/login"
    },

    {
      path: "/shareinvite",
      name: "邀请二维码",
      component: shareinvite
    },
    {
      path: "/order/:state",
      name: "订单",
      component: Order
    },
    {
      path: "/orderdetails/:id",
      name: "订单详情",
      component: orderdetails
    },
    {
      path: "/orderdetails/:id/orderlogistics",
      name: "物流详情",
      component: orderlogistics
    },
    {
      path: "/orderdetails/:id/catdetaillogistics",
      name: "具体物流",
      component: catdetaillogistics
    },
    {
      path: "/mypropfit",
      name: "我的收益",
      component: mypropfit
    },
    {
      path: "/myintegral",
      name: "我的积分",
      component: myintegral
    },
    {
      path: "/myinvitationcode",
      name: "我的邀请码",
      component: myinvitationcode
    },
    {
      path: "/mycoupon",
      name: "我的优惠券",
      component: mycoupon
    },
    {
      path: "/realnameauth",
      name: "实名认证",
      component: RealnameAuth
    },
    {
      path: "/godsdetails",
      name: "商品详情",
      component: godsdetails
    },
    {
      path: "/productList/:from/:id",
      name: "商品列表",
      component: productList
    },
    {
      path: "/usesr/address",
      component: addressindex,
      name: "地址",
      children: [
        {
          path: "/address",
          component: address,
          name: "地址管理"
        },
        {
          path: "/manageaddress",
          component: manageaddress,
          name: "添加地址"
        }
      ]
    },
    {
      path: "/seachList/:keyword",
      component: seachList,
      name: "商品列表"
    },
    {
      path: "/confirmorder",
      component: confirmorder,
      name: "订单确认"
    },
    {
      path: "/bindError",
      component: bindError,
      name: "已经绑定成功"
    },
    {
      path:"/user_address/get/:addressId",
      component:editAddress,
      name:"编辑地址"
    },
    {
      path:"/Verfiy",
      component:Verfiy,
      name:"认证成功"
    },
    {
      path:"/bindSuccess",
      component:bindSuccess,
      name:"绑定成功"
    },
    {
      path:"/partnerLoginSuccess",
      component:partnerLoginSuccess,
      name:"同伴登录成功"
    },
    {
      path:"/account",
      component:account,
      name:"退出登录"
    },
    {
      path:"/partner/invite/confirm",
      component:confirm,
      name:"确认成为合伙人",
    },
    {
      path:"/partner/invite/signIn",
      component:signIn,
      name:"合伙人登录",
    },
    {
      path:"/partner/invite/inviteSuc",
      component:inviteSuc,
      name:"合伙人开通成功",
    },
    {
      path:"/partner/invite/login",
      component:partnerInviteNotBindLogin,
      name:"识别二维码",
    },
    {
      path :'/partner/directional/login',
      component:directionalLogin,
      name :'定向邀请登录'
    },
    {
      path:"/partner/invite/error",
      component:inviteStrErr,
      name:"邀请陌生用户错误",
    },
    {
      path : "/partner/invite/inviteRealname",
      component : inviteRealname,
      name :"邀请陌生用户认证"
    },
    {
      path : '/partner/invite/share',
      component : share,
      name : '分享二维码'
    },
    {
      path : '/rule',
      component : rule,
      name :'分销规则'
    },
    {
      path: '/personal',
      component:personal,
      name:'用户资料'
    },
    {
      path: '/personalEdit',
      component:personalEdit,
      name:'用户资料编辑'
    }
  ]
});
