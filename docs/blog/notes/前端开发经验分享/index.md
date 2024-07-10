# 前端技术分享

## 前端在做什么

## 技术布道

### typescript

typescript 给前端带来类型描述的能力

```typescript
/**
 * 站点
 */
export interface StationDto {
  id: number;
  /**
   * 所在地区
   */
  address?: string;
  /**
   * 站点编号
   */
  code: string;
  /**
   * 是否有摄像头。1表示有，2表示没有
   */
  hasCamera: number;
  /**
   * 纬度
   */
  lat: number;
  /**
   * 经度
   */
  lon: number;
  /**
   * 纬度(北京坐标系）
   */
  latBj: number;

  /**
   * 经度(北京坐标系）
   */
  lonBj: number;
  /**
   * 站点名称
   */
  name: string;
  /**
   * 负责人列表展示
   */
  personList?: string;
  /**
   * 负责人
   */
  persons?: StationPersonDto[];
  /**
   * 站点图片名称
   */
  picName?: string;
  /**
   * 排序字段
   */
  sort: number;
  /**
   * 自动站类型
   */
  type?: string;
}
```

通过 Apifox 直接生成类型定义

![alt text](recording.gif)

#### 类型提示

![alt text](recording-1.gif)

#### 三方库的方法提示

![alt text](recording-2.gif)

#### 错误的静态检查

![alt text](recording-3.gif)

#### typescript 的真正价值

typescript 真正的价值在于它给前端提供了一套标准统一的语言体系去描述具体的业务模型

![alt text](image.png)

### vue3

#### mvvm/mvc 与 composables

#### composables 和 mixin

组合和继承

#### 单项数据流

#### 组件模型
