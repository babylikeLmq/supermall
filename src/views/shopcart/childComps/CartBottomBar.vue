<template>
  <div class="bottom-bar">
    <!--    全选-->
    <div class="check-content">
      <check-button class="agree-check-button"
                    :is-checked="isSelectAll"
                    @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <!--  价格汇总-->
    <div class="price">
      合计:¥{{totalPrice}}
    </div>
<!--    去计算商品个数-->
    <div class="calculate" @click="calcClick">
      去计算:{{toCalculateNumber}}
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton"
  import {mapGetters} from 'vuex'

  export default {
    name: "CartBottomBar",
    components:{
      CheckButton
    },
    computed:{
      ...mapGetters(['cartList']),

      totalPrice(){

        return  this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue,item) => {
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      toCalculateNumber(){
        // const cartList = this.$store.getters.cartList;
        return this.cartList.filter(item => item.checked).length

      },

      isSelectAll(){
        if (this.cartList.length === 0) return false
        //第一种filter：遍历性能不是特别好
        // return !(this.cartList.filter(item => !item.checked.length))
        // 第二种fund：！undefined == true
        return !this.cartList.find(item => !item.checked)
        //第三种：普通的遍历
        // for(let item of this.cartList){
        //   if(!item.checked){
        //     return false
        //   }
        // }
        // //所有都遍历完 都没有返回true
        // return  true
        }

    },
    methods:{
      checkClick(){
        // console.log('全选能点击！');
        if (this.isSelectAll) {//全部选中
          this.cartList.forEach(item => item.checked = false)
        }else{//部分或者全部都不选中
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick(){
        if(!this.isSelectAll){
          this.$toast.show('请选中购买的商品',2000)
        }

      }
    }

  };
</script>

<style scoped>
  /*最大的*/
  .bottom-bar {
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;

    background-color: #eee;
    font-size: 15px;
  }

  /*左边*/
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 13px;
    width: 70px;
  }

  .agree-check-button {
    width: 22px;
    height: 22px;
    line-height: 22px;
    margin-right: 5px;
  }

  /*中间*/
  .price {
    margin-left: 20px;
    flex: 1;
    text-align: center;
  }

  /*右边*/
  .calculate {
    width: 130px;
    background-color: rgba(255,0,0,0.8);
    color: #fff;
    text-align: center;
  }
</style>
