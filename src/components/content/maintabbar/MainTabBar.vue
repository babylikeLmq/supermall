<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="orange">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
      <div slot="item-text" >首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="orange">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
      <div slot="item-text" >分类</div>
    </tab-bar-item>
    <tab-bar-item path="/shopcart" activeColor="orange">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
      <div slot="item-text" >购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile"  activeColor="orange">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>



<script>
  import TabBar from 'components/common/tabbar/TabBar'
  // import TabBar from '@/components/tabbar/TabBar' 可以写成这样 因为src的别名是@
  import  TabBarItem from 'components/common/tabbar/TabBarItem'

  export default {
    name: "MainTarBar",
    components:{
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
