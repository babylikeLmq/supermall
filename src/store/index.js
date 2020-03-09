import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'


// 1.安装插件
Vue.use(Vuex)

// 2.创建store 对象
const state ={
  cartList:[]
} ;
const store = new Vuex.Store({
  state,
  mutations,
   /* //没有把addCart  添加新商品  和  相同商品加一  方法分开
      //addCart(state,payload){
      // state.cartList.push(payload)
      //添加进去之前做个判断是否有重复的 重复的加一 没有重复就新添加
      //1.查找之前数据中是否有该商品   oldProduct返回ture/false
      //  let oldProduct = state.cartList.find(function(item) {
      //    return item.iid === payload.iid
      //  });
      let oldProduct = state.cartList.find(item => item.iid === payload.iid);
      // 2.判断oldProduct
      if (oldProduct){
        oldProduct.count += 1;
      } else{
        payload.count = 1;
        state.cartList.push(payload)
      }
    }
*/
  actions,
  getters,


})
//3.导出 挂在到Vue实例上
export default store
