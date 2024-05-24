# javascript 基础

## 继承和原型链

javascript 只有一种结构对象：对象（object），每个对象都有一个私有属性指向另一个名为**原型（prototype）**的对象.

原型对象也有一个自己的原型，层层向上直到一个对象的原型为 `null`。

尽管这种动态类型的混杂常被认为是 javascript 的弱点之一，但是原型继承模型本身实际上比类式模型更强大。在原型模型的基础上构建类式模型十分简单。

ECMAScript 标准规定，符号 `someObject.[[Prototype]]` 用于标识 `someObject` 的原型。内部插槽可以通过 `Object.getPrototypeOf()` 和 `Object.setPrototypeOf()` 函数来访问。

也是常见的 javascript 引擎实现的非标准访问器 `__proto__` 。

需要注意区分 `__proto__` 和函数的 `prototype` 的区别，前者表示的是当前对象的原型，后者是在给定函数被用作构造函数时分配给所有对象实例的 `[[Prototype]]` 即实例的 `__proto__` 访问器。

```javascript
function Foo() {}

Foo.prototype = {
  // ...
};

const foo = new Foo();

console.log(foo.__proto__ === Foo.prototype); // true
```

所有实例的 `[[Prototype]]` 引用相同的对象，所以可以通过修改 `Foo.prototype` 来修改所有实例的原型。

```javascript
function Box(value) {
  this.value = value;
}
Box.prototype.getValue = function () {
  return this.value;
};
const box = new Box(1);

// 在创建实例后修改 Box.prototype
Box.prototype.getValue = function () {
  return this.value + 1;
};
box.getValue(); // 2
```

重新赋值 `Constructor.prototype` 后创建的新实例和重新赋值前创建的旧实例引用的不是同一个 `[[Prototype]]`

`constructor` 也会指向新的 `prototype` 对象的构造函数，`instanceof` 判断的是构造函数的 `prototype` 是否在实例的原型链上，所以仍然会返回 `true`。

```javascript
function Box(value) {
  this.value = value;
}
Box.prototype.getValue = function () {
  return this.value;
};
const box = new Box(1);

// 在创建实例后修改 Box.prototype
Box.prototype = {
  getValue() {
    return this.value + 1;
  },
};
const newBox = new Box(2);

console.log(box.getValue()); // 1
console.log(newBox.getValue()); // 3

console.log(box instanceof Box); // false
console.log(box.constructor === Box); // true

console.log(newBox instanceof Box); // true
console.log(newBox.constructor === Box); //false
console.log(newBox.constructor === Object); // true
```

箭头函数没有默认原型

```javascript
function doSomething() {}
console.log(doSomething.prototype); // { constructor: f doSomething(), [[Prototype]]:{...} }
// 你如何声明函数并不重要；
// JavaScript 中的函数总有一个默认的
// 原型属性——有一个例外：
// 箭头函数没有默认的原型属性：
const doSomethingFromArrowFunction = () => {};
console.log(doSomethingFromArrowFunction.prototype); // undefined
```

`Object.setPrototypeOf` 可以给 `Object.create(null)` 创建的无原型对象设置原型

`Object.create(null).__proto__` 只能修改已有原型，而不能给无原型对象设置原型，如果对象没有原型则会设置 `__proto__` 属性（属性不是原型）
