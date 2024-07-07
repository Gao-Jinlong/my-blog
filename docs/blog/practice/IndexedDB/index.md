# IndexedDB

## 基本模式

1. 打开数据库
2. 在数据库中创建一个对象存储（object store）
3. 启动事务，并发送一个请求来执行一些数据库操作，如添加或获取数据等。
4. 通过监听正确类型的 DOM 事件以等待操作完成
5. 对结果进行一些操作（可以在 request 对象中找到）

<script setup lang="ts">
import { db, data, headers, handleOpen, handleAdd, handleDelete, handleGet, handleUpdate} from './index'
</script>

<VMessage />
<VDivider />

`onupgradeneeded` 事件会在创建或更新数据库的版本触发

> 该事件仅在最新的浏览器中实现

`onupgradeneeded` 是我们唯一可以修改数据库结构的地方，在这里我们可以创建和删除对象存储，以及创建和删除索引

<VCard elevation='8'>
  <VAlert   
    border="start"
    closable
    :type="!db? 'warning' :'success'"
    :variant="!db? 'outlined':'elevated'"
    :title="!db? '未连接数据库': '已连接数据库'"
  />

  <template v-if="db">
    <h3>内存数据</h3>
    <VDataTable :items="data" :headers>
    </VDataTable>
  </template>
  <VBtn v-if="!db" type="primary" @click="handleOpen">
    连接数据库
  </VBtn>
</VCard>

## 添加数据

读写数据必须在事务中进行

`transaction()` 方法接受两个参数，第一个是事务的作用域，第二个是事务的模式，这里是 readwrite

提示：

- 定义作用域时，仅指定需要用到的对象存储，这样可以同时运行多个不含相互重叠作用域的事务
- 只在必要时指定 readwrite 事务，因为可以同时运行多个 readonly 事务，哪怕它们的作用域有重叠

```js
const transaction = db.transaction(["customers"], "readwrite");

const customerStore = transaction.objectStore("customers");
const customData = toRaw(data.value);
customData.forEach((customer) => {
  customerStore.add(customer);
});
transaction.oncomplete = (event) => {
  console.log("All done!");
  ElMessage.success("添加成功");
};
transaction.onerror = (event) => {
  console.log("Error!", event);
  ElMessage.error("添加失败");
};
```

当事务对象未使用时，它会变为非活跃状态，在其上发出请求会使它变得活跃，当事务完成时会得到一个 DOM 事件

如果请求成功了，将会有在另一个回调中延长这个事务的机会

事务接收三中不同类型的 DOM 事件 `error`, `abort`, `complete`

如果事务中发生了错误或者调用了 `abort()` 方法，事务会被中止，如果事务成功完成，会触发 `complete` 事件

<VBtn @click="handleAdd">添加数据</VBtn>

## 删除数据

和添加数据非常类似：

```js
const request = db
  .transaction(["customers"], "readwrite")
  .objectStore("customers")
  .delete("444-44-4444");

request.onsuccess = (event) => {
  console.log("删除成功", event);
  ElMessage.success("删除成功");
};
```

<VBtn type="danger" color="error" @click="handleDelete">删除数据</VBtn>

## 获取数据

查询有多种方式，首先最简单的是 `get()`，需要提供键值

```js
const transaction = db.transaction(["customers"]);
const objectStore = transaction.objectStore("customers");
const request = objectStore.get("444-44-4444");

request.onerror = (event) => {
  ElMessage.error("获取数据失败");
  console.log("获取数据失败", event);
};
request.onsuccess = (event) => {
  console.log("获取数据成功", event);
  ElMessage.success("获取数据成功，查询名称是", request.result?.name);
};
```

<VBtn type="primary" @click="handleGet">获取数据</VBtn>

## 更新数据

现在我们查询了一些数据，修改一下并把它插回数据库

```js
const objectStore = db
  .transaction(["customers", "readwrite"])
  .objectStore("customers");
const request = objectStore.get("444-44-4444");

request.onsuccess = (event) => {
  const data = event.target.result;

  data.age = 42;

  const requestUpdate = objectStore.put(data);

  requestUpdate.onerror = (event) => {
    console.log("更新失败", event);
    ElMessage.error("更新失败");
  };
  requestUpdate.onsuccess = (event) => {
    console.log("更新成功", event);
    ElMessage.success("更新成功");
  };
};
```

<VBtn type="warning" @click="handleUpdate">更新数据</VBtn>
