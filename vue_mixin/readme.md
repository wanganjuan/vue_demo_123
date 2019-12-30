### 混入适合一些管理界面。按钮功能都差不多，表格展示，分页，可以使用它
#### 全局混入
混入也可以进行全局注册。使用时格外小心！一旦使用全局混入，它将影响每一个之后创建的 Vue 实例。使用恰当时，这可以用来为自定义选项注入处理逻辑。
// 为自定义的选项 'myOption' 注入一个处理器。
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

new Vue({
  myOption: 'hello!'
})
// => "hello!"

值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。
#### 两个对象键名冲突时，取组件对象的键值对。

var mixin = {
  methods: {
    foo: function () {
      console.log('foo')
    },
    conflicting: function () {
      console.log('from mixin')
    }
  }
}

var vm = new Vue({
  mixins: [mixin],
  methods: {
    bar: function () {
      console.log('bar')
    },
    conflicting: function () {
      console.log('from self')
    }
  }
})

vm.foo() // => "foo"
vm.bar() // => "bar"
vm.conflicting() // => "from self"
// 注意：Vue.extend() 也使用同样的策略进行合并。

### ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。
### 如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素； 特别注意：如果用在子组件上，引用就指向组件实例：