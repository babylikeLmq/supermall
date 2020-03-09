<template>
  <div  class="tab-bar-item" @click="itemClick">
    <!--<slot v-if="!isActive" name="item-icon"></slot>
    <slot v-else name="item-icon-active"></slot>-->
    <div v-if="!isActive"><slot  name="item-icon"></slot></div>
    <div v-else><slot  name="item-icon-active"></slot></div>
<!--    <slot  class="{active:isActive}" name="item-text"></slot>是ture了已经但是还是没有变红色  因为插槽是用来被替换的 所以在外面再套一个div 把 class="{active:isActive}" 加到div上 -->
  <!--  <div  :class="{active:isActive}" >
    <slot name="item-text"></slot>
  </div>-->

    <div  :style="activeStyle" >
      <slot name="item-text"></slot>
    </div>
    <!--      img是行内块元素-->
 <!--   <img src="../../assets/img/tabbar/home.svg" alt="">
    <div>首页</div>-->
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      path:{
        type:String
      },
      activeColor:{
        type: String,
        default: 'red'
      }
    },
    data(){
      return {
        // isActive:true
      }
    },
    computed:{
      isActive(){
        // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle(){
        return this.isActive?{color:this.activeColor}:{}
      }
    },
    methods:{
      itemClick(){
        // console.log('11111111');
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item{
    flex:1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  /*.active{*/
  /*  color: red;*/
  /*}*/
</style>
