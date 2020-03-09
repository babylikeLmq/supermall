import {ADD_COUNTER, ADD_TO_NEW_CART} from './mutation-types'



export default {
  //context  不加可以在第一个参数  写：{state,commit}  context相当于  srore
  addCart(context,payload){
    return new Promise((resolve,reject) => {
      //1.查找之前数据中是否有该商品   oldProduct返回ture/false find（）方法返回的是商品对象
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
      // 2.判断oldProduct
      if (oldProduct){//数量+1
        // oldProduct.count += 1;
        context.commit(ADD_COUNTER,oldProduct)
        resolve('当前的商品数量+1')
        reject('当前的商品数量没有+1')
      } else{//添加新的商品
        payload.count = 1;
        // context.state.cartList.push(payload),
        context.commit(ADD_TO_NEW_CART,payload)
        resolve('添加了新的商品')
      }
    })

  }
}
