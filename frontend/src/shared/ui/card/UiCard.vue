<template>
  <a-card v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}" />
    </template>
  </a-card>
</template>

<script setup lang="ts">
import { Card as ACard } from 'ant-design-vue';
</script>
