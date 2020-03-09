<template>
  <div class="toast" v-show="isShow">
    {{message}}
  </div>
</template>

<script>

  export default {
    name: "Toast",
    props:{
      //普通toast方式
      // message:{
      //   type:String,
      //   default:''
      // },
      // isShow:{
      //   type:Boolean,
      //   default: false
      //
      // }
    },
    //把放到detail中的方法 属性 统一放到这里
    data(){
      return {
        message:'',
        isShow:false
      }
    },
    methods:{
      show(message="亲，您还没有购买商品哦",duration=2000){
        this.isShow = true;
        this.message = message;
        setTimeout(()=>{
          this.isShow = false;
          this.message = ''
        },duration)
      }
    }

  };
</script>

<style scoped>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  transform:translate(-50%,-50%);
  padding: 8px 10px;
  z-index: 999;

  color: #fff;
  background-color: rgba(0,0,0,.75);
}
</style>
