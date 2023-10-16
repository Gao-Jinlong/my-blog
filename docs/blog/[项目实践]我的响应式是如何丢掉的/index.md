# 【项目实践】我的响应式是如何丢掉的
<a name="GTgfa"></a>
## ref 还是 reactive ？
**结论：二者本质是相同的，建议无脑 ref。**<br />众所周知 vue（后文未特殊说明时皆指 vue3）的响应式模型是基于 Proxy 的发布订阅模式，而 Proxy 是不能够拦截字面量的，因此需要使用对象包裹字面量才能使用 Proxy 拦截实现响应式。<br />**ref(someValue) 就是 reactive({value: someValue})**
> 关于 ref 的 .value 后缀，VueConf（vue 开发者大会）曾经提出过使用`$`语法糖声明响应式变量，并且在编译时自动帮助开发者添加 .value 从而使开发者更加无感的使用响应式，后来这个提案被拒绝掉了没能成为正式标准，因为 vue 团队发现没有 .value 时，开发者不能够清晰地确定自己引用的值是否是响应式的，会带来一些困扰和问题，反而增加了开发者的心智负担，因此拒绝了这个提案。（因此当你不能很好地掌控 ref 与 reactive 时，建议使用 ref，通过 .value 可以更清晰的告诉你：“hey guys，i'm a ref!”）
> 更多阅读：[知道尤雨溪为什么要放弃 $ 语法糖提案么？ - 掘金](https://juejin.cn/post/7222874734185922597?share_token=42842692-7a4b-440d-85a8-1fb56d16f7e7#heading-4)


（就这？这谁都知道！退钱！）<br />客官莫急，正文开始~
<a name="rmCTD"></a>
### 字面量和引用类型有什么区别？
> 相信大部分人都清楚，但还是统一一下认识

在 javascript 中字面量和引用类型都是存储的指向值所在地址的指针，只不过字面量在使用时是按值传递（将值复制一份给使用目标），而引用类型的值仍然是一个地址，这使得**引用类型的值发生变化后在所有被引用位置都会取得变化后的值。**<br />![](https://cdn.nlark.com/yuque/0/2023/jpeg/35025722/1681871135584-678bf377-5e80-4d16-80f0-e326cbace1ea.jpeg)<br />这**通常**是一个非常有用的特性，这可以保证我们**查询**到的值始终是最新的，从而保证所有引用数据的地方都是最新的值，避免数据不一致带来的问题。举个例子
```javascript
const club = {
  count: 10
}

function getMemberCount(club){
  return club.count
}
function addNewMember(club){
  club.count += 10
}

addNewMember(club)
getMemberCount(club) // 20
```
我们在所有使用`count`的地方都通过查询`club`来取值从而达到了所有引用位置都可以同步最新的值。<br />我前面使用了一个词语“通常”，那么肯定会有不常见的情况，接下来我们来讲“但是”<br />引用类型虽然可以很方便的保证数据的一致性，这非常棒，但是也打开了潘多拉的魔盒。当一个程序员只是为了方便而使用引用类型，而并不清楚引用类型的本质，那么混乱就会悄悄地侵入我们的程序，并且这是一个很难察觉的问题，直到某一天，产品经理提出了一个新的需求，他要对我们以前的业务逻辑进行一些修改和升级！此时我们面对自己一点一点迭代出来的庞然大物，却无从下手，因为我们无法知道每个值究竟是在什么地方被改掉了！<br />我们将这个潘多拉魔盒里跑出来的恶魔叫做——**可变数据**。<br />因此我们应该十分谨慎的使用引用类型，我们需要清楚的知道，我们使用引用类型就是为了保持数据的一致性，并且它可能在任何时刻任何地方被其它使用者修改！（为了解决可变数据带来的问题，诞生出了基于不可变数据的编程范式——函数式编程）

事实上单是一个可变数据所带来的困扰，还不足以阻碍聪明的程序员们，尽管有时会带来一些困扰，但我们还有作用域、模块化等一系列手段限制着这个恶魔。直到有一天恶魔混进了 vue 的响应式对象里...
<a name="BAHbh"></a>
### vue 响应式（ref）与引用类型
引用类型变量和 vue 的响应式特性有很多相似的地方（尤其是 reactive 使用语法完全一致但是特性完全不同），这就导致如果不能完全清晰引用类型和 ref 的区别，那就很容易混用导致产生一些很难察觉的问题。<br />来看例子吧
```vue
<template>
  <h1> hello {{ someone.name }} </h1>
  <h2>
    phone:{{someone.info.phone}}
  </h2>
  <h2>
    address:{{someone.info.address}}
  </h2>
</template>

<script setup>
  import { ref, reactive, watch, nextTick } from 'vue'

	const someone = reactive({
		name:'Ginlon',
		info:{
			phone:'10086',
			address:'Qingdao'
		}
	})
	
	someone.name='Sana'

	const newInfo = {
		phone:'10010',
		address:'Beijing'
	}
	someone.info = newInfo
	
	newInfo.address = 'HongKong'
</script>
```
执行结果<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/35025722/1681776060725-9ff3bf65-d11d-4a05-af23-7e253353d25c.png#averageHue=%23f3f3f3&clientId=u577aca62-2998-4&from=paste&height=205&id=u4d0749b4&originHeight=205&originWidth=435&originalType=binary&ratio=1&rotation=0&showTitle=false&size=10949&status=done&style=shadow&taskId=u8f741315-39de-49fb-a153-849d636a182&title=&width=435)<br />看起来非常正确，没有任何问题，但是潘多拉的魔盒已经打开了。<br />将上面代码中最后的赋值语句（30 行）改为异步操作就可以让他原形毕露
```javascript
// info.address = 'HongKong'
Promise.resolve().then(()=>{
	newInfo.address='HongKong';
	console.log(someone.info.address)
})
```
结果<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/35025722/1681778217595-aa0cba89-c53b-479c-a96e-661596bcb27b.png#averageHue=%23f1f1f1&clientId=u577aca62-2998-4&from=paste&height=181&id=u2f7c659f&originHeight=181&originWidth=400&originalType=binary&ratio=1&rotation=0&showTitle=false&size=10597&status=done&style=shadow&taskId=uc9f2b941-5290-4e2e-8a8e-d8c145aaf53&title=&width=400)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/35025722/1681778774538-b311904c-befa-4c66-bd42-b900191ce858.png#averageHue=%23f5f6f5&clientId=u577aca62-2998-4&from=paste&height=166&id=u931f4684&originHeight=167&originWidth=602&originalType=binary&ratio=1&rotation=0&showTitle=false&size=21024&status=done&style=shadow&taskId=u8b7553e2-0a92-4e97-b016-c742e3a5810&title=&width=598)<br />哦天哪，这太可怕了，我们在程序中访问到的值和在页面中访问到的值不是同一个值！
:::warning
事实上此时只要通过`someone`进行查询、修改而不是通过 `newInfo`，一切依然是正常的，后面再来解释原因
:::
让我们来看看究竟发生了什么！
<a name="Uvfig"></a>
#### 1. vue 调度执行（schedule）
首先在改为异步语句之前，一切都是正常的，这牵扯到了 vue 内部的一个优化机制，<br />众所周知 DOM 操作是极其昂贵的，如果我们的响应数据（ref）每次发生变化时都去更新 DOM，那会带来很多不必要的 DOM 操作，造成很大的性能损耗。（尽管有虚拟 DOM、标记更新一系列优化，但是仍然是非常巨大的开销）<br />再来个例子
```vue
<template>
  <div>count:{{count}}</div>
</template>

<script setup>
import { ref, watch } from 'vue';

const count = ref(0)

watch(count,()=>{
  console.log('响应式数据变化了！')
})

for(let i = 0; i < 10; i++){
  count.value++
}
</script>
```
我们写了一个循环对一个响应式的数据进行自增，并且使用`watch`监听这个响应式数据的变化<br />执行结果<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/35025722/1681780244167-c25dba7d-aa31-454e-b3ba-12be079e4a97.png#averageHue=%23fdfdfd&clientId=u577aca62-2998-4&from=paste&height=72&id=u2bf32558&originHeight=72&originWidth=400&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1817&status=done&style=shadow&taskId=ub9471eac-69d3-48cb-9ccf-b29e3197b90&title=&width=400)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/35025722/1681780268952-982e3dbb-ffe7-4b9d-bd2a-bf8251c63600.png#averageHue=%23f5f6f5&clientId=u577aca62-2998-4&from=paste&height=178&id=u2bcfe583&originHeight=178&originWidth=598&originalType=binary&ratio=1&rotation=0&showTitle=false&size=22469&status=done&style=shadow&taskId=u0c8214ed-aad1-4e36-8555-65ca4551bce&title=&width=598)<br />可以看到`watch`只执行了一次，也就是说只监听到了一次响应式数据变化，为什么？<br />这是因为 vue 的内部优化将所有的副作用（响应式数据变化引起的更新）放到了一个**微任务**队列中，这样就可以避免掉无用的 DOM 更新，极大地节省性能消耗。<br />实现方法是使用`Promise.resolve`创建一个微任务队列，并将所有的副作用函数放到这个`Promise`的  `.then`中执行（没错就是 `nextTick`）。（事实上`watch`、`computed`等一系列的可配置特性都与这个调度执行（scheduler）有关，此处不展开，感兴趣可以参考《Vue.js 设计与实现》4.7 调度执行 章节）。
```typescript
const tick = Promise.resolve()
const queue: any[] = []
let queued = false

const scheduler = (fn: any) => {
  queue.push(fn)
  if (!queued) {
    queued = true
    tick.then(flush)
  }
}
```
所以由于 Vue 内部的这个优化导致我们第一次的代码案例中使用`info.address = 'HongKong'`的方式赋值是可以更新到视图的，因为引用类型的数据总是可以拿到最新的值！<br />但这还不足以解释为什么异步更新不能够同步到视图中，即使响应式更新发生在下一个事件循环中，它也应该可以正确的触发视图更新才对，除非...
<a name="oMWOy"></a>
#### 2. reactive 的本质是什么？
除非...响应式被丢掉了！<br />还记得前面我们提到过，通过`newInfo`修改值时会导致视图和代码中的数据不一致，而通过`someone`来修改值却可以维持响应式，接下来我们来看看这两者究竟有何区别。<br />`someone`与`newInfo`的区别其实就是声明方式的不同，前者是通过 vue 的`reactive` Api 创建，而后者则是普通的 javascript 对象，而对`reactive`（即 ref 类型数据）的访问是会被 vue 的响应式系统拦截的，正是这个拦截的处理使我们的访问产生了差异。<br />下面是对这个过程的简要描述，实际的源码处理了很多边界情况要复杂多
```vue
function reactive(value){
	return Proxy(value, {
		get:()=>{
			return isReactive(res) ? res : reactive(res)
		}
	})
}
```
可以看到当我们访问一个响应式数据时，vue 会将数据进行一次响应式的包装再返回给我们，因此我们总是可以拿到响应式的数据，所以在我们的代码中通过`someone`修改值是可以正确的处理响应式的，而通过普通的引用对象`newInfo`并没有经过 vue 的包装，因此不能够触发响应事件，但是由于引用类型本身的特性，我们仍可以访问到最新的值！破案了！<br />此外 vue 这样的处理还有一个好处是：不必在创建对象的时候就进行完全的遍历使用 proxy 包装，而是在真正访问的时候再进行处理，从而减少了不必要的开销和复杂的边界情况处理。<br />我们已经发现了问题的根源所在，但如果我们就是觉得每次取值都通过最开始的对象查找太繁琐了，有没有办法可以通过`newInfo`来取值又保持 vue 的响应式呢？那肯定是当然的<br />通过上面这段代码我们可以发现，`newInfo`与`someone.info`区别仅仅是有没有`reactive`包裹而已，那我们完全可以自己添加一个`reactive`来包裹这个数据！
```javascript
const newInfo = reactive({
	phone:'10010',
	address:'Beijing'
})

someone.info = newInfo

newInfo.address = 'Honkong'
```
这样我们就可以方便的取值且保证响应式的正常执行了！<br />至于可能存在的重复的包装问题，vue 内部已经做了完善的处理，`ref(ref(value))`与`ref(value)`是一致的。

我们用最开始的图在回顾一下我们的响应式是如何丢失的<br />![](https://cdn.nlark.com/yuque/0/2023/jpeg/35025722/1681864149998-c0e3405e-6513-4076-9330-90a0a64945c5.jpeg)

<a name="Dho9Y"></a>
#### 3.开发实践
找到了问题的原因，那就来看看如何避免混用带来的问题：

1. 首先不推荐使用`reactive`，建议无脑`ref`理由可以参考文章开始部分，只要是通过`.value`取到的值就是响应式的数据。
2. 在使用`reactive`声明的对象时需要注意下面这些用法：
   1. 深拷贝 `cloneDeep()`
   2. 解构 `{...reactive(value)}`
   3. `Obejct.assign`（下面解释）
   4. 所有的响应式操作都应该从根对象出发查找
   5. 引用类型数据的地址更改
```javascript
const someone = reactive({
	name:'Ginlon',
	info:{
		phone:'10086',
		address:'Qingdao'
	}
})
const newInfo = {
	phone:'10010',
	address:'Beijing'
}

someone.info = newInfo
```
解释一下`Object.assign`，这是个非常灵活的方法。<br />当我们想要**移除某个响应式对象的响应性**获取其原始值时可以使用<br />`Object.assign({}, refObj)`<br />（注意只能移除最外层以及由外层传递到子层级的响应性，并不能处理深层的显式声明的响应式数据）。<br />当我们想要更新某个响应式对象的值时，又不想丢失响应性的时候，可以使用<br />`Object.assign(refObj, newObj)`
> 【⚠️警告】不推荐使用该写法，对象内部字段的不可控可能会引起不可控的副作用，使用此方法传递一个字段非常多的对象时，会连续触发响应更新，一旦在页面中使用了该对象的字段则会导致高频率的刷新页面。

至于为什么可以维持响应式，我们可以看一下 ECMAScript 关于`Object.assign`的实现标准说明<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/35025722/1681865721640-57fed049-8a8f-4330-aac0-be6130fab5a8.png#averageHue=%23f7f7f7&clientId=u577aca62-2998-4&from=paste&height=513&id=u4cbebd0f&originHeight=513&originWidth=1001&originalType=binary&ratio=1&rotation=0&showTitle=false&size=120512&status=done&style=shadow&taskId=u2ac9fe1f-3f7c-4e66-8181-5097a84d00a&title=&width=1001)<br />可以看到最后值是通过`set`的方式添加给`target`的，而 vue 的响应式系统是可以拦截`set`的因此响应式系统是可以正确的执行的。
> 其实还可以看到`Object.assign`还访问了`sources`的`get`，也就是说响应式系统是可以追踪到依赖的，但是不建议使用这个特性，会使数据流向变得难以追踪。

<a name="HxrrA"></a>
#### 引用类型的使用
<a name="abCJd"></a>
##### 1.映射表
常见的一种情况是服务端返回给我们的数据经常会是一个有唯一标识的对象数组 `{id,otherValue}[]`<br />而很多操作往往是需要根据 id 来查找指定的记录的，项目里常见到<br />`list.find(it=>it.id===Id)`<br />类似的代码，每次`find`都会遍历数组，这会产生很多不必要的开销，而我们可以提前对数据做一个映射
```javascript
const idToData = list.reduce((map, item)=>{
	map[item.Id] = item
},{})
```
这样当我们需要根据 id 获取某个记录是可以直接查表`idToData[id]`，避免遍历整个数组，将`O(n)`的时间复杂度降低为`O(1)`，而由于我们存储的仅仅是一个引用地址表，并没有存储实际数据，所以空间代价是几乎可以忽略不计的。(这种用法在优化双层循环时屡试不爽)
<a name="vYrwH"></a>
##### 2.缓存池
与映射表相似，我们也可以构建一个以 id 为键值的缓存池，维持对某个对象的引用从而避免被GC（垃圾回收）回收，且下次使用时可以直接查表获取，从而避免重复加载或计算某些繁重的任务，webpack 的模块化部分就是这种设计的一个实现。

千辛万苦，终于搞定了响应式，可是很遗憾，解决了响应式的问题并不代表彻底解决了页面更新的问题，因为实际的开发中有些代码会非常庞大复杂，迭代多次后往往很难完善的处理响应式的流转，会造成有些极端情况下，即使在可追踪的范围内我们的数据完成了响应式的更新，我们的页面也有可能不会重新渲染。万不得已时可以尝试的解决方案：<br />给需要重新渲染的部分添加`:key`属性来明确的告诉 vue： “hey, guys! 这一部分有变化，需要重新渲染！”

附部分代码，可直接在 [Vue SFC Playground](https://play.vuejs.org/#eNpdkUFrhDAQhf9K8BIXxHV7KEXchfbSlp5KS09egs6uaTUJGncLIf+9kxh1twcNzMx7+V7GRI9KpecRojwqhqrnSpMB9KgOpSg175TsNTGkh2OCP1ZpfoaEXJiumoQI+NWfvPohlhx72RGKPhR1qKykGNBJdiAFkP2ijY3rllqwDnL6zEUrBU2mGhdHmYd+qVWDypzusuzhfp4oNavrHoYhp+9cnGom3XVYtu6wm+luTxeHu5NYwOWLtSNs9odg7uBkC2krT2vXOySmBlC57keY3YJP6oj39IMJdhMR9a/IjRGD+cq9y2buhfoJ+DeCe2rHfOXv0qNL8PMdwNfF5qjjeIUPA2nwRAl9keL0ht9km2RIXmynZbo1ikJDp1qmwS+1aHYH0kDbSmLMvCIfj1hLii22p7E7f86JjLkmTX3R+ndHyTS6SubA/0ShfCMrtgtdZP8Aq7bv7Q==) 中执行并调试
```vue
<script setup>
	import { ref, reactive, watch, nextTick } from 'vue'

	const someone = reactive({
		name:'Ginlon',
		info:{
			phone:'10086',
			address:'Qingdao'
		}
	})

	watch(someone,(newValue)=>{
		console.log(newValue)
	},{deep:true})

	someone.name='Sana'

	const newInfo = {
		phone:'10010',
		address:'Beijing'
	}

	someone.info = newInfo
	setTimeout(()=>{
		newInfo.address = 'HongKong'
	},0)
</script>

<template>
	<h1> hello {{ someone.name }} </h1>
	<h2>
		phone:{{someone.info.phone}}
	</h2>
	<h2>
		address:{{someone.info.address}}
	</h2>
</template>
```
<a name="UrR3b"></a>
### 推荐阅读

- 《Vue.js设计与实现》.霍春阳.2022 [图灵社区](https://www.ituring.com.cn/book/2953)
- [你不知道的 async、await 魔鬼细节](https://mp.weixin.qq.com/s/X1-DRaZ_9cAfl-q9UwhJGA)

