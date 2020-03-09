<template>
<!--  <div class="cart" ref="scroll" 没有必要每一次进来购物车都要刷新>-->
  <div class="cart" ref="scroll">
    <!--    商品导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
      <!--      <div slot="center">购物车({{length}})</div>-->
    </nav-bar>
    <!--    商品列表-->
    <cart-list/>
    <!--    底部汇总-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import {mapGetters} from 'vuex'
  import CartList from './childComps/CartList'
  import CartBottomBar from  './childComps/CartBottomBar'




  export default {
    name: "Shopcart",
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      //第一种方法：要一一对应
      ...mapGetters(['cartLength','cartList'])
      //第二种方法：自定义名称
      // ...mapGetters({
      //   length:'cartLength'
      //   })
    },
    //点击来到购物车这里做一次刷新
    // activated() {
    //   this.$ref.scroll.refresh()
    // }
  }
</script>

<style scoped>
  /*.cart{*/
  /*  height:100vh;*/
  /*}*/
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  /*height: 44px;*/
}
</style>
