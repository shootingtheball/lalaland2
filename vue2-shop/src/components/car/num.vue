<template lang="html">
    <div class="main">
      <div @click="subtraction">-</div>
      <div>{{nub}}</div>
      <div @click="addition">+</div>
    </div>

</template>

<script>


  export default {
    data(){
      return {
        nub: 1
      }
    },
    components: {

    },
    computed: {

    },
    created:function(){
      console.log('this.totalnub',this.totalnub)
      if(this.totalnub){
        this.nub =  this.totalnub.a.nub ||0;
      }
      
    },
    props:['totalnub'],
    methods: {
      addition:function() {
       // console.log('this.$store.state.detail.inventoryNub',this.$store.state.detail.inventoryNub)
        //console.log('this.totalnub',this.totalnub)
        if(this.totalnub){
          //console.log('this.totalnub.a.inventoryNub>this.totalnub.a.nub',this.totalnub.a.inventoryNub>this.totalnub.a.nub)
          if(this.totalnub.a.inventoryNub>this.totalnub.a.nub){
            this.nub++;
            this.notifnum(true);
          }else{
            this.$emit('noinventoryToCar');
          }
        }else{
         
          if(this.$store.state.detail.inventoryNub>0&&this.nub<this.$store.state.detail.inventoryNub){
            this.nub++;
           
            this.notifnum(true);
          }else{
            this.$emit('noinventory');
          }
        }
      },
      subtraction:function() {
        if(this.nub > 0){
          this.nub--;
          this.notifnum(false);
        }
        if(this.totalnub){
          if(this.nub==0){
            let newCarList= [];
            for (let k = 0; k < this.$store.state.detail.carList.length; k++) {
              if(k!==this.totalnub.b) {
                newCarList.push(this.$store.state.detail.carList[k])
              }
            }
            //点击垃圾桶 把商品数量count-1
            this.$store.dispatch('cutCarList',newCarList);
          }
        }
      },
      notifnum:function(data){
        this.$emit('notnum',this.nub,data);
        
        //这里，同步添加给vuex（这是子组件）
        this.$store.commit('CURRENTNUB',this.nub)
        if(this.totalnub){
          this.totalnub.a.nub = this.nub - this.totalnub.a.nub
          var addnub =Math.abs(this.totalnub.a.nub);
          this.$store.dispatch('addCarList',[this.totalnub.a]);
          for(var i = 0;i< addnub; i++){
            if(this.totalnub.a.nub>0){
              this.$store.dispatch('setLocalCount',true);
            }else if(this.totalnub.a.nub<0){
              this.$store.dispatch('setLocalCount',false);
            }
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .main{
    display: -ms-flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    >div{
      border: 1px solid #e8e8e8;
      width: 26px;
      height: 22px;
      line-height: 22px;
      text-align: center;
    }
  }

</style>
