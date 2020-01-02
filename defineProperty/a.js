const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true
}

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    console.log(this)
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter (val) {
    console.log(this)
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

let vm = {}
vm._data = {
  msg: 'init',
  name: 'wj'
}
for (let t in vm._data) {
  proxy(vm, '_data', t)
}
console.log(vm.msg, vm.name)

// 主要市把 vm._data.msg   === vm.msg