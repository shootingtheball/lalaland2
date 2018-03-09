<template>
  <transition name='move'>
  <div class="rule" v-if="isshow">
      <div class="head"><span class="icon1" @click="$router.back()"><i class="iconfont icon-zuojiantou"></i></span>规则说明</div>
      <div class="detial">
          <ul>
              <li>
                  <ul>
                      <li class="title">1. 作为分销平台供应商的分销者，用户应当遵守以下规定</li>
                      <li>1.1 遵守与众蜜的协议（约定）进行销售行为；</li>
                      <li>1.2 分销者一旦违背众蜜规则受到众蜜处罚，有权立即解除与分销者的合作关系；</li>
                      <li>1.3 同一分销者的下级无数量限制。</li>
                  </ul>
              </li>
              <li>
                  <ul>
                      <li class="title">2. 分销者下载并发布分销者品信息，需遵守以下规定：</li>
                      <li>2.1 发布的商品信息符合国家相关法律法规及众蜜平台专属链接；</li>
                      <li>2.2 发布的商品信息必须如实表述为众蜜平台所有；</li>
                      <li>2.3 发布的商品信息及零售价格符合众蜜平台的相关约定。</li>
                  </ul>
              </li>
              <li>
                  <ul>
                      <li class="title">3. 在向消费者销售及推广过程中，分销者需遵守：</li>
                      <li>3.1 分销者必须严格履行对消费者的承诺，分销者不得以任何形式对抗其对消费者的承诺,如果分销者分不清或不能覆盖分销者对消费者的销售承诺，
                          风险由分销者自行承担；分销者与买家出现任何纠纷，均应当依据众蜜相关规则进行处理；</li>
                      <li>3.2 分销者承诺其最终销售给消费者的分销者品零售价格符合众蜜规定；</li>
                      <li>3.3 在消费者（买家）付款后，分销者可以在平台查看到所属收益，交易7天后无退换货情况收益到账，分销者应当自行承担因此而发生的交易风险；</li>
                      <li>3.4 分销者应当在系统及时跟进平台库存，无论任何原因导致买家拍下后无货而产生的纠纷，均应由分销者自行承担风险与责任；</li>
                      <li>3.5 分销者承诺分销者品所产生的销售订单均由分销平台众蜜负责供货，以保证分销者品品质；</li>
                      <li>3.6 分销者有义务确认消费者（买家）收货地址的有效性；</li>
                      <li>3.7 分销者有义务在消费者买到货物后，及时跟进消费者情况，反馈给众蜜平台。</li>
                  </ul>
              </li>
          </ul>
      </div>
      
  </div>
  </transition>
</template>

<script>

export default {
  data() {
      return {
          isshow:true
      }
  },
  methods:{
      show() {
          this.isshow = true
      },
      unshow() {
          this.isshow = false;
      }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/user/icon/fonts3/myStyle.css';

    .move-enter-active{
      transition: all .3s ease;
    }
    .move-leave-active{
      transition: all .3 ease;
    }
    .move-enter,.move-leave-to{
        transform: translate(100%)
    }

  .rule{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #fff;
      z-index: 2;
      overflow: scroll;
      .head{
        font-size: 14px;
        font-weight: normal;
        position: absolute;
        top: 0;
        width: 100%;
        height: 12vw;
        background: rgb(31, 31, 31);
        color: #fff;
        text-align: center;
        line-height: 12vw;
        .icon1{
            width: 10vw;
            position: absolute;
            top: 50%;
            transform: translate(0,-50%);
            left: 2vw
        }
      }
      .detial{
          margin-top: 14vw;
          font-size: 12px;
          line-height: 20px;
          padding: 0 5vw;
          text-align: justify;
          .title{
              font-weight:bold;
              margin-top: 2vh
          }
      }
    }
</style>
