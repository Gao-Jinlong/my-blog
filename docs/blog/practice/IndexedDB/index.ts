import type { ShallowRef } from "vue";
import { ElMessage } from "element-plus";

const db: ShallowRef<IDBDatabase | null> = shallowRef(null);

const headers = ref([
  {
    title: "姓名",
    key: "name",
  },
  {
    title: "年龄",
    key: "age",
  },
  {
    title: "邮箱",
    key: "email",
  },
  {
    title: "ssn",
    key: "ssn",
  },
]);
const data = ref([
  { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
  { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" },
]);

function handleOpen() {
  const request = window.indexedDB.open("MyTestDatabase", 3);

  // 连接错误处理
  request.onerror = (event) => {
    console.log("Error!", event);
    ElMessage.error("数据库连接失败");
  };

  request.onupgradeneeded = (event: any) => {
    console.log("onupgradeneeded", event);

    const db = event.target.result as IDBDatabase;

    // 为数据库创建对象存储 objectStore
    // 使用 ssn 作为 keyPath , keyPath 应该是唯一的，还有另一种方式是使用 autoIncrement
    const objectStore = db.createObjectStore("customers", { keyPath: "ssn" });
    // 创建一个名为 "name" 的索引，以便通过名字来搜索客户
    // 创建索引，以使用姓名来搜索客户，名字可能会重复，所以不能使用 unique 索引
    objectStore.createIndex("name", "name", { unique: false });
    // 使用邮箱建立索引，我们想要确保用户邮箱不会重复，所以会使用 unique 索引
    objectStore.createIndex("email", "email", { unique: true });

    // 使用事物的 oncomplete 事件确保在插入数据之前对象存储已经创建完毕
    objectStore.transaction.oncomplete = (event) => {};
  };

  request.onsuccess = (event) => {
    console.log("Success!", event);

    handleSuccess(event);
  };
}

function handleSuccess(event: any) {
  db.value = event.target.result as IDBDatabase;
  db.value.onerror = (event) => {
    console.log("Database error: " + event.target?.errorCode);
  };
}

function handleAdd() {
  if (!db.value) {
    ElMessage.error("数据库未连接");
    return;
  }

  const transaction = db.value.transaction(["customers"], "readwrite");

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
}

function handleDelete() {
  if (!db.value) {
    ElMessage.error("数据库未连接");
    return;
  }

  const request = db.value
    .transaction(["customers"], "readwrite")
    .objectStore("customers")
    .delete("444-44-4444");

  request.onsuccess = (event) => {
    console.log("删除成功", event);
    ElMessage.success("删除成功");
  };
}

function handleGet() {
  if (!db.value) {
    ElMessage.error("数据库未连接");
    return;
  }

  const transaction = db.value.transaction(["customers"]);
  const objectStore = transaction.objectStore("customers");
  const request = objectStore.get("444-44-4444");

  request.onerror = (event) => {
    ElMessage.error("获取数据失败");
    console.log("获取数据失败", event);
  };
  request.onsuccess = (event) => {
    console.log("获取数据成功", request.result);
    ElMessage.success("获取数据成功，查询名称是：" + request.result.name);
  };
}

export { db, headers, data, handleOpen, handleAdd, handleDelete, handleGet };
