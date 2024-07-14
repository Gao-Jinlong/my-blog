import type { ShallowRef } from "vue";
import useMessage from "../../../.vitepress/components/v-message/useMessage";

const $message = useMessage();

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
    $message.error("数据库连接失败");
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

    useDatabase(db);
  };

  request.onsuccess = (event) => {
    console.log("Success!", event);

    handleSuccess(event);
    useDatabase(db.value);
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
    $message.error("数据库未连接");
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

    $message.success("添加成功");
  };
  transaction.onerror = (event) => {
    console.log("Error!", event);

    $message.error("添加失败");
  };
}

function handleDelete() {
  if (!db.value) {
    $message.error("数据库未连接");
    return;
  }

  const request = db.value
    .transaction(["customers"], "readwrite")
    .objectStore("customers")
    .delete("444-44-4444");

  request.onsuccess = (event) => {
    console.log("删除成功", event);

    $message.success("删除成功");
  };
}

function handleGet() {
  if (!db.value) {
    $message.error("数据库未连接");

    return;
  }

  const transaction = db.value.transaction(["customers"]);
  const objectStore = transaction.objectStore("customers");
  const request = objectStore.get("444-44-4444");

  request.onerror = (event) => {
    $message.error("获取数据失败");

    console.log("获取数据失败", event);
  };
  request.onsuccess = (event) => {
    console.log("获取数据成功", request.result);
    if (!request.result) {
      $message.warning("数据不存在");
      return;
    } else {
      $message.success("获取数据成功" + request.result?.name);
    }
  };
}

function handleUpdate() {
  if (!db.value) {
    return;
  }
  const objectStore = db.value
    ?.transaction(["customers"], "readwrite")
    .objectStore("customers");
  const request = objectStore.get("444-44-4444");

  request.onerror = (event) => {};
  request.onsuccess = (event) => {
    request.result.age = 20;

    const requestUpdate = objectStore.put(request.result);
    requestUpdate.onerror = (event) => {
      $message.error("更新数据失败");
    };
    requestUpdate.onsuccess = (event) => {
      $message.success("更新数据成功");
    };
  };
}

function handleCursor() {
  if (!db.value) {
    $message.error("数据库未连接");
    return;
  }
  const objectStore = db.value
    ?.transaction(["customers"], "readwrite")
    .objectStore("customers");
  const request = objectStore.openCursor();
  request.onerror = (event) => {
    $message.error("获取数据失败");
  };
  request.onsuccess = (event) => {
    const cursor = event.target?.result;
    if (cursor) {
      console.log(`SSN ${cursor.key} 对应的名字是 ${cursor.value.name}`);
      cursor.continue();
    } else {
      $message.success("遍历完成");
    }
  };
}

const allData = ref([]);
function handleGetAll() {
  if (!db.value) {
    $message.error("数据库未连接");
    return;
  }
  const objectStore = db.value
    ?.transaction(["customers"], "readwrite")
    .objectStore("customers");
  const request = objectStore.getAll();
  request.onerror = (event) => {
    $message.error("获取数据失败");
  };
  request.onsuccess = (event) => {
    console.log("获取数据成功", request.result);
    allData.value = request.result;
  };
}

function handleIndex() {
  if (!db.value) {
    $message.error("数据库未连接");
    return;
  }
  const objectStore = db.value
    ?.transaction(["customers"], "readwrite")
    .objectStore("customers");

  const index = objectStore.index("name");
  index.get("Donna").onsuccess = (event) => {
    console.log(`Donna 的 SSN 是 ${event.target.result.ssn}`);
    $message.success(`Donna 的 SSN 是 ${event.target.result.ssn}`);
  };
}

function handleKeyCursor() {
  if (!db.value) {
    $message.error("数据库未连接");
    return;
  }
  const objectStore = db.value
    ?.transaction(["customers"], "readwrite")
    .objectStore("customers");

  const index = objectStore.index("name");

  index.openCursor().onsuccess = (event) => {
    const cursor = event.target?.result;
    if (cursor) {
      // cursor.key 是名字，如“Bill”，而 cursor.value 是整个对象。
      console.log(
        `名字：${cursor.key}，SSN：${cursor.value.ssn}，电子邮件：${cursor.value.email}`
      );
      cursor.continue();
    }
  };

  index.openKeyCursor().onsuccess = (event) => {
    const cursor = event.target?.result;
    if (cursor) {
      console.log(`Name: ${cursor.key}, SSN: ${cursor.primaryKey}`);
      cursor.continue();
    } else {
      $message.success("遍历完成");
    }
  };
  index.onerror = (event) => {
    $message.error("获取数据失败");
  };
}

function handleRangeCursor(direction: IDBCursorDirection = "next") {
  if (!db.value) {
    $message.error("数据库未连接");
    return;
  }

  const objectStore = db.value
    ?.transaction(["customers"], "readwrite")
    .objectStore("customers");

  const index = objectStore.index("name");
  // 仅匹配“Donna”
  const singleKeyRange = IDBKeyRange.only("Donna");

  // 匹配所有大于“Bill”的，包括“Bill”
  const lowerBoundKeyRange = IDBKeyRange.lowerBound("Bill");

  // 匹配所有大于“Bill”的，但不包括“Bill”
  const lowerBoundOpenKeyRange = IDBKeyRange.lowerBound("Bill", true);

  // 匹配所有小于“Donna”的，不包括“Donna”
  const upperBoundOpenKeyRange = IDBKeyRange.upperBound("Donna", true);

  // 匹配所有在“Bill”和“Donna”之间的，但不包括“Donna”
  const boundKeyRange = IDBKeyRange.bound("Bill", "Donna", false, false);

  // 使用其中的一个键范围，把它作为 openCursor()/openKeyCursor() 的第一个参数
  index.openCursor(boundKeyRange, direction).onsuccess = (event) => {
    const cursor = event.target?.result;
    if (cursor) {
      console.log(
        `名字：${cursor.key}，SSN：${cursor.value.ssn}，电子邮件：${cursor.value.email}`
      );
      // 对匹配结果进行一些操作。
      cursor.continue();
    }
  };
}

function openNewVersion() {
  const openReq = indexedDB.open("MyTestDatabase", 4);

  openReq.onblocked = (event) => {
    // 如果其他页面加载了该数据库，在我们继续之前需要关闭它们。
    console.log("请关闭其它打开了该站点标签页！");
  };

  openReq.onupgradeneeded = (event) => {
    // 其他数据库已被关闭

    console.log("onupgradeneeded");

    useDatabase(db);
  };

  openReq.success = (event) => {
    const db = event.target.result;
    console.log("数据库打开成功", db);
    useDatabase(db);
    return;
  };
}

function useDatabase(db) {
  // 确保添加了在其他标签页请求了版本变更时会被通知的事件处理器
  // 必须关闭数据库，这样其他标签页才能更新数据库
  // 如果不这样做，在用户关闭这些标签页之前，版本升级将不会发生
  db.onversionchange = (event) => {
    db.close();
    console.log("此页面的新版本已准备就绪。请重新加载或关闭此标签页！");
  };
}

export {
  db,
  headers,
  data,
  allData,
  handleOpen,
  handleAdd,
  handleDelete,
  handleGet,
  handleUpdate,
  handleCursor,
  handleGetAll,
  handleIndex,
  handleKeyCursor,
  handleRangeCursor,
  openNewVersion,
};
