<template>
  <div class="copyright" v-if="isHome">
    <a href="http://beian.miit.gov.cn/">备案号：鲁ICP备2024058644号</a>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";
const { page, frontmatter } = useData();

const isHome = computed(() => frontmatter.value.layout === "home");
</script>
<style scoped lang="scss">
.copyright {
  text-align: center;
  font-size: 12px;
  padding: 20px 0;

  width: 80%;
  margin: 0 auto;
  border-top: 1px solid var(--vp-c-divider);

  a {
    color: var(--vp-c-text-1);

    &:hover {
      color: var(--vp-c-brand);
    }
  }
}
</style>
