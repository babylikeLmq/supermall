import {ADD_COUNTER, ADD_TO_NEW_CART} from './mutation-types'
export default {
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_TO_NEW_CART](state,payload){
    payload.checked = true
    state.cartList.push(payload)
  }
}
