<template>
  <swiper>
      <swiper-item :key="homeswiper.index" v-for="homeswiper in banners">

        <a  :href="homeswiper.link">
          <img  :src="homeswiper.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'

  export default {
    name: "Home",
    props:{
      banners:{
        type:Array,
        default(){
          return  []
        }
      }
    },
    data(){
      return {
        isLoad:false
      }
    },
    components:{
      Swiper,
      SwiperItem,
    },
    methods:{
      imageLoad(){
        // console.log('轮播图正常打印');打印了四次也就是说事件发射了4次 我需要一次就行 为什么 因为只要知道一张图片的高度就行
        if(!this.isLoad){
          this.$emit('swiperImageLoad');
          this.isLoad = true;
        }

      }
    }
  }
</script>

<style scoped>

</style>
