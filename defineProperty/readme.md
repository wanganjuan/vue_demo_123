Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 

## 并返回这个对象。

在ES6中，由于 Symbol类型的特殊性，用Symbol类型的值来做对象的key与常规的定义或修改不同，而Object.defineProperty 是定义key为Symbol的属性的方法之一。

var person = function() {
    var _name = ' ';
    var obj = {};
    Object.defineProperty(obj, 'name', {
        configurable: true,
        enumerable: true,
        get: function() {
            return this._name + '123';
        },
        set: function(n) {
            this._name = n;
        }
    })
    return obj;
}();
undefined
person.name = '555'
"555"
person.name
"555123"