<template>
  <div class="cart-list">
    <scroll class="content">
<!--      <cart-list-item :key="item.index" v-for="item in cartList" :product="item"/>-->

      <cart-list-item :key="index" v-for="(item,index) in cartList" :item-info="item"/>
    </scroll>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem'

  export default {
    name: "CartList",
    components:{
      Scroll,
      CartListItem
    },
    computed:{
      ...mapGetters(['cartList'])
    }
  };
</script>

<style scoped>
/* .cart-list{
   height: 100vh;
 }
.content{
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}*/
.cart-list{
  height: calc(100vh - 44px -  40px - 49px);
}
.content{
  height:100%;
  overflow: hidden;
}


/*下面这种方法前提是给cart 一个高度  100vh*/
/*.cart-list{*/
/*  height: calc(100% - 44px - 49px);*/
/*}*/
/*!*100%是内容的高度  *!*/
/*.content{*/
/*  height:100%;*/
/*  overflow: hidden;*/
/*}*/
</style>
