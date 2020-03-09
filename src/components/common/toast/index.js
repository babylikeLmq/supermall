import Toast from './Toast'

const obj ={}

obj.install = function(Vue) {
// console.log('执行了obj的install函数',Vue);
//     1.创建组建构造器
const toastContrustor = Vue.extend(Toast)
  //2.new的方式 ，根据组建构造器，可以创建出来一个组件对象
const toast = new toastContrustor()
  //3.将组件对象，挂载到某个元素上
  toast.$mount(document.createElement('div'))
  //4.toast.$el对应就是div     $el（可以拿到Dom元素上的属性 ）
  document.body.appendChild(toast.$el)
  //====================toast=s是=>对象====================
  Vue.prototype.$toast = toast
}

export default  obj
