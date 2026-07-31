<template>
  <a-button v-bind="$attrs">
    <slot />
  </a-button>
</template>

<script setup lang="ts">
import { Button as AButton } from 'ant-design-vue';
</script>
