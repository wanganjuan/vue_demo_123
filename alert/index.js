import Alert from './alert.vue'
import Vue from 'vue';
// 导入模板
console.log(Alert)
// 类似模板文件，vue extend 返回一个function 通过new 进行是实例化，el 绑定绑定位置
// 生成 构造函数
const AlertConstructor = Vue.extend(Alert)
let instance = new AlertConstructor({
  el: document.createElement('div')
})
let el = instance.$el
AlertConstructor.prototype.buttonClick = function () {
  el.parentNode && el.parentNode.removeChild(el)
  typeof this.callback === 'function' && this.callback()
}
const alert = (options = {}) => {  
  instance.content = options.content,
  instance.buttonDesc = options.buttonDesc,
  instance.callback = options.callback
  document.body.appendChild(el)
}
export default {
  install (Vue, options) {
    Vue.prototype.$alertD = alert
  }
}