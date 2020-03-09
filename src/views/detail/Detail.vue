<template>
  <div id = "detail">
    <detail-nav-bar class="detail-nav"   @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" >
<!--      检查点击购物车是不是获取到了store中的值-->
<!--      <div>{{$store.state.cartList.length}}</div>-->
<!--      <ul>-->
<!--        <li :key="item.index" v-for="item in $store.state.cartList">{{item}}</li>-->
<!--      </ul>-->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show = "isShowBackTop"/>
<!--    <toast :message="message" :is-show="isShow"/>-->
  </div>
</template>

<script>
  import  DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'

  import  DetailBaseInfo from "./childComps/DetailBaseInfo"
  import DetailShopInfo from './childComps/DetailShopInfo'
  import Scroll from 'components/common/scroll/Scroll'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import GoodsList from 'components/content/goods/GoodsList'
  import DetailBottomBar from './childComps/DetailBottomBar'


  import  {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail"
  import  {itemListenerMixin,backTopMixin} from "common/mixin";
  import  {debounce} from  'common/utils'
  import  {BACKTOP_DISTANCE} from "common/const"
  import {mapActions} from 'vuex'

  // import  Toast from 'components/common/toast/Toast'



  export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      // Toast



    },
    data(){
      return {
        iid:null,
        // res:null
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo: {},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0,
        // message:'',
        // isShow:false,





      }
    },
    mixins:[itemListenerMixin,backTopMixin],
    methods:{
      ...mapActions({
        addMyLoveCart:'addCart'
      }),
      imageLoad(){
        //this.$refs 来获取组件/DOM中的元素节点
        // console.log("======");
        // //详情页中推荐商品每一张图片加载好就发出一次
        // this.$refs.scroll.refresh()
        this.newRefresh();
        //getThemeToY在组件创建的时候对里面的y值做了防抖
        //debounce返回的是函数
        this.getThemeTopY();
      },
      titleClick(index){
        // console.log(index);
        //去到themeTop(y轴)中的对应位置
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)

      },
      contentScroll(position){
        // console.log(position);//滚定在哪里的位置
        //1.拿y值
        const  positionY =-position.y
        // 2.positionY与主题中值进行对比
        //   themeTopYs [0, 3152, 4629, 4824, __ob__: Observer]
        //分两种情况：第一：0-2 第二：3
        //positionY在0到 3152 之间 index =0
        //positionY在=3152到4629 之间 index =1
        //positionY在=4629到4824 之间 index =2

        //positionY大于等于4824 index =3
        let length = this.themeTopYs.length
        for(let i=0;i<length-1;i++) {
         /* // console.log(this.themeTopYs);
          // if(positionY>this.themeTopYs[parseInt(i)] && positionY<this.themeTopYs[i+1]){
          //   console.log(i);
          // }
          if(this.currentIndex !== i && ((i<length-1 && positionY>=this.themeTopYs[parseInt(i)] && positionY<
            this.themeTopYs[i+1] )||(i === length-1 && positionY>=this.themeTopYs[parseInt(i)]))){
            // console.log(i);
            this.currentIndex = i;
            // console.log(this.currentIndex);
            // console.log(this.currentIndex);// 1 2 3 0
            //currentIndex 是点击nacbar上哪一个的索引值index
            this.$refs.nav.currentIndex = this.currentIndex
          }*/
         // hack做法：在后面添加一个很大的数字  长度是变成5 i<length-1=4  遍历for  [i+1]=4+1 会越界  所以要减1 3+1=4 4
          if(this.currentIndex !== i && (i<length-1 && positionY>=this.themeTopYs[parseInt(i)] && positionY<
            this.themeTopYs[i+1] )){
            this.currentIndex = i;
            this.$refs.nav.currentIndex  = this.currentIndex

          }
        }
        //返回顶部
        this.isShowBackTop = (-position.y)> BACKTOP_DISTANCE

      },
      addToCart(){
        // console.log('Detail中监听到了detail购物车发出的事件！');
        //1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        //2.将商品添加到购物车
        //vue=>mutation
        // this.$store.commit('addCart',product)
        //vue=>actions=>mutation
        //action 返回new promise
        // this.$store.dispatch('addCart',product).then(res => {
        //   console.log(res);
        // })

        this.addMyLoveCart(product).then(res => {
          // console.log(res);
          // this.isShow = true;
          // this.message = res;
          // setTimeout(()=>{
          //   this.isShow = false;
          //   this.message = ''
          // },1500)
          // ======================================================================================================
          // this.$toast.show()
          this.$toast.show(res,2000)
        })


      },

    },
    mounted(){

    },
    created() {
      // 1.保存传进来的iid
      this.iid = this.$route.params.iid
      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        //1.获取顶部的轮播图  result.itemInfo.topImages路径
        const data = res.result
        this.topImages = data.itemInfo.topImages
        // console.log(res.result.itemInfo.topImages);
        // 2.  获取商品信息  goods 是Goods的实例
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        // 3. 获取商家信息
        this.shop = new Shop (data.shopInfo)
        //4.商品的详细信息 没有搞类
        this.detailInfo = data.detailInfo
        //5.商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //6.评论信息
        // if(data.rate.cRate !=  0){
        //   this.commentInfo = data.rate.list[0]
        // }
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }
      })
      //3.请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })
      //对this.getThemeTopY防抖
      this.getThemeTopY = debounce(()=>{
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs);
      },100)
    },



  };
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color:#ffffff;
    height: 100vh;
  }
  .content{
    height: calc(100% - 44px - 58px);

  }
  .detail-nav{
    position:relative;
    z-index: 9;
    background-color: #ffffff;
  }
</style>


