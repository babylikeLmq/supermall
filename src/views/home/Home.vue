<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref = "tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"></tab-control>
   <scroll class="content"
           ref="scroll" :probe-type = "3"
           @scroll="contentScroll"
           :pull-up-load="true"
           @pullingUp="loadMore">
     <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
     <recommend-view :recommends="recommends"/>
     <feature-view/>
     <tab-control :titles="['流行','新款','精选']"
                  @tabClick="tabClick"
                  ref = "tabControl2" ></tab-control>
     <goods-list  :goods = "showGoods"/>
   </scroll>
    <back-top @click.native="backClick" v-show = "isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  // import BackTop from 'components/content/backTop/BackTop'


  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'



  import {getHomeMultidata,getHomeGoods} from "network/home"
  import  {itemListenerMixin,backTopMixin} from "common/mixin";
  import  {BACKTOP_DISTANCE} from "common/const"

  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      //组件创建好就发送网络请求  mounted 数据和DOM都完成挂载执行
    },
    mixins:[itemListenerMixin,backTopMixin],
    data() {
      return {
        // result :null
        banners: [],
        recommends: [],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
          },
        currentType: 'pop',
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,
        }

      },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },

    created() {
      //1.请求多个数据
      this.getHomeMultidata()
        //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    // destroyed(){
    //   console.log('home destoryed');
    // },
    activated(){
      //指定滚动到x轴和y轴的位置 behavior  类型String,表示滚动行为,支持参数 smooth(平滑滚动),instant(瞬间滚动),默认值auto,实测效果等同于instant
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      //滚动完就刷新
      this.$refs.scroll.refresh()
    },
    deactivated(){
      //1.离开的时候保存位置
      this.saveY = this.$refs.scroll.getHomeScrollSaveY();
      //测试来回多次滚动
      // console.log(this.saveY);
      //2.取消全局事件的监听
      this.$bus.$off('itemImageLoad',this.itemImgListener)

    },

    mounted(){
      // const refresh =debounce( this.$refs.scroll.refresh,50)
      // // 1.监听item中图片加载完成
      // this.$bus.$on('itemImageLoad',()=>{
      //   // this.$refs.scroll.refresh();
      //   // console.log('=======');
      //   // 点一下pop就刷新30次
      //   refresh()
      // });
    },
    methods:{


      /*
      * 事件监听部分
      * */
      swiperImageLoad(){
        //获取tabContent 的offsetTop
        // offsetTop 它返回当前元素顶部相对指定元素顶部的偏移量。
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      tabClick(index){
        // console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },


      contentScroll(position){
        // console.log(position);
        //y轴位置大于1000 返回true => 显示图片
        //1.判断BackTop是否显示
        this.isShowBackTop = (-position.y)> BACKTOP_DISTANCE
        // 2.决定tabControl是否吸顶（position = fixed）
        this.isTabFixed = (-position.y)> this.tabOffsetTop
      },
      // 上拉加载更多
      loadMore(){
        // console.log('上拉加载更多');
        //currentType是指 流行  新款 精选  他们加载更多 是根据加载页码实现  getHomeGoods就是获取到页码商品数据的 每一次上拉加载更多页码都会加一
        this.getHomeGoods(this.currentType)
      },

      /*
      * 网络部分
      * */
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          // console.log(res);
          //creared 中的this 指向组件对象
          // this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page+1
        getHomeGoods(type,page).then(res=>{
          //把最新的临时数据保存到goods中的list
          this.goods[type].list.push(...res.data.list)
          //一页的数据加满 页码加一
          this.goods[type].page += 1
            //完成上拉加载更多
            this.$refs.scroll.finishPullUp();
        }
        )
      }
    },

  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;

  }
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
  /*使用浏览器原生滚动时，为了让导航不跟随导航滚动*/
  /*position: fixed;*/
  /*left: 0;*/
  /*top: 0;*/
  /*right: 0;*/
  /*z-index: 10;*/
}

/*css新属性考虑到兼容性不用*/
  /*.tab-control{*/
  /*  position: sticky;*/
  /*  top: 44px;*/
  /*  background-color: #fff;*/
  /*  z-index: 10 ;*/
  /*}*/

  /*<tab-control :class="{fixed:isTabFixed}" 有bug*/
/*.fixed{*/
/*  position: fixed;*/
/*  left: 0;*/
/*  right: 0;*/
/*  top: 44px;*/
/*}*/

  .tab-control{
    position: relative;
    background-color: #ffffff;
    z-index: 9;
    padding: 0;
    margin: 0;
  }


  .content{
    /*给个高度里面内容就可以滚动了*/
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  /*.content{*/
  /*  height:calc(100% - 93px);*/
  /*  overflow:hidden;*/
  /*  margin-top: 44px;*/
  /*  */

  /*}*/
</style>
