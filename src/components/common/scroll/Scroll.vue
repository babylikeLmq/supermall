<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import  BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default: false
        //传进来true 就可以在最后位置上拉动作做完 触发函数
      }
    },
    data(){
      return {
        scroll:null,
        // message:'哈哈哈'

      }
    },
    mounted(){
      // 1.创建Scroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        //scroll标签中div包裹div能生效点击事件
        click:true,
        probeType : this.probeType,
        pullUpLoad: this.pullUpLoad

      })
      //2.监听滚动的位置
      if(this.probeType ===2 || this.probeType === 3){
        this.scroll.on('scroll',(position)=>{
          // console.log(position);传出去谁想打印谁使用
          this.$emit('scroll',position)


        })
      }
      //刷新图片
      // this.scroll.refresh();
      // 3.监听上拉事件
      if(this.pullUpLoad){
        this.scroll.on("pullingUp", () => {
          // console.log("上拉加载更多"); 给home做
          this.$emit('pullingUp')
        });
      }
    },
    methods:{
      //多了个延时 scrollTo里面内部的运作不需要过多的给外面知道 面向我开发知道有scrollTo方法就行
      scrollTo(x,y,time=300){
        //先判断scroll是否有值
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      refresh(){
        //检验刷了多少次
        // console.log('刷新的次数');
        this.scroll && this.scroll.refresh()
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      },
      getHomeScrollSaveY(){
        return this.scroll ? this.scroll.y:0
      }
    }
  };
</script>

<style scoped>

</style>
