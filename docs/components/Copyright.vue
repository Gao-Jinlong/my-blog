<template>
  <div class="copyright">
    <a href="http://beian.miit.gov.cn/">备案号：鲁ICP备2024058644号</a>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.copyright {
  text-align: center;
  font-size: 12px;
  padding: 20px 0;

  width: 80%;
  margin: 0 auto;
  border-top: 1px solid #eee;

  a {
    color: #999;

    &:hover {
      color: var(--vp-c-brand);
    }
  }
}
</style>
