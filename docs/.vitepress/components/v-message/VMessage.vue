<script setup lang="ts">
import useMessage from "./useMessage";

const { props, buttonProps } = useMessage();
</script>
<template>
  <VSnackbar v-bind="props">
    <template v-slot:actions>
      <VBtn v-bind="buttonProps" @click="props.modelValue = false"> </VBtn>
    </template>
  </VSnackbar>
</template>
