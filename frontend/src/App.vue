<script setup lang="ts">
import { theme } from 'ant-design-vue';
</script>

<template>
  <a-config-provider
    :theme="{
      algorithm: theme.defaultAlgorithm,
    }"
  >
    <router-view />
  </a-config-provider>
</template>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  min-height: 100vh;
}
</style>
