### common.js 规范
http://javascript.ruanyifeng.com/nodejs/module.html

所有代码都运行在模块作用域，不会污染全局作用域。
模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
模块加载的顺序，按照其在代码中出现的顺序。

Node 应用由模块组成，采用的是Common.js 模块规范。
CommonJS规范规定，每个模块内部，module变量代表当前模块
var x = 5;
var addX = function (value) {
  return value + x;
};
module.exports.x = x;
module.exports.addX = addX;

上面代码通过module.exports输出变量x和函数addX。

require方法用于加载模块。

var example = require('./example.js');

console.log(example.x); // 5
console.log(example.addX(1)); // 6

### exports 与 module.exports
为了方便，Node为每个模块提供一个exports变量，指向module.exports。这等同在每个模块头部，有一行这样的命令。

var exports = module.exports;
于是我们可以直接在 exports 对象上添加方法，表示对外输出的接口，如同在module.exports上添加一样。注意，不能直接将exports变量指向一个值，因为这样等于切断了exports与module.exports的联系。

#### 最好直接用 module.exports

### ES6模块规范
不同于CommonJS，ES6使用 export 和 import 来导出、导入模块。

// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export {firstName, lastName, year};

### export default 命令
使用export default命令，为模块指定默认输出。

// export-default.js
export default function () {
  console.log('foo');
}

### 其他的 amd ,cmd ==  还是多用，多总结