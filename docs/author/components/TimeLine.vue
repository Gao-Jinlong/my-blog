<template>
  <el-timeline>
    <el-timeline-item
      v-for="item of myTimeLine"
      :timestamp="`${item.startTime} - ${item.endTime}`"
      placement="top"
    >
      <el-card class="timeLine__card">
        <span>{{ item.title }}</span>
        <span class="sub-title">{{ item.organize }}</span>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>
<script setup lang="ts">
type TimeLineItem = {
  startTime: string;
  endTime: string;
  title: string;
  organize: string;
};
const myTimeLine = ref<TimeLineItem[]>([
  {
    startTime: "2022-08",
    endTime: "now",
    title: "web 开发",
    organize: "上海地听信息科技有限公司",
  },
  {
    startTime: "2022-08",
    endTime: "2023-07",
    title: "前端开发工程师",
    organize: "青岛拓宇数智科技有限公司",
  },
  {
    startTime: "2018-09",
    endTime: "2022-06",
    title: "数字媒体技术（学士学位）",
    organize: "潍坊学院",
  },
]);
</script>
<style lang="scss">
.el-timeline {
  li {
    list-style: none !important;
  }
}
.el-timeline-item__timestamp {
  font-size: 16px;
  font-weight: 500;
  color: var(--el-text-color-primary);
}
.timeLine__card {
  width: 100%;
  padding: 5px 20px;
  border-radius: 10px;
  color: var(--el-text-color-primary);
  display: flex;
  justify-content: space-between;
  .el-card__body {
    flex: 1;
    display: flex;
    justify-content: space-between;
    font-weight: bold;
  }
}
.sub-title {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  font-weight: normal;
}
</style>
