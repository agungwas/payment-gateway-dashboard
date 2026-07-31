<template>
  <a-alert v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}" />
    </template>
  </a-alert>
</template>

<script setup lang="ts">
import { Alert as AAlert } from 'ant-design-vue';
</script>
