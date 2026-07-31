<template>
  <div class="ui-select-wrapper">
    <label v-if="label" :for="$attrs.id as string" class="ui-select-label">{{ label }}</label>
    <a-select v-bind="$attrs" :value="modelValue" @update:value="modelValue = $event">
      <template v-for="(_, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}" />
      </template>
    </a-select>
  </div>
</template>

<script setup lang="ts">
import { Select as ASelect } from 'ant-design-vue';
import type { SelectProps } from 'ant-design-vue';

defineProps<{
  label?: string;
}>();

const modelValue = defineModel<SelectProps['value']>();
</script>

<style scoped>
.ui-select-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}
.ui-select-label {
  font-weight: 500;
  font-size: 0.9rem;
  color: #333;
}
</style>
