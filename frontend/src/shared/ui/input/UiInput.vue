<template>
  <div class="ui-input-wrapper">
    <label v-if="label" :for="$attrs.id as string" class="ui-input-label">{{ label }}</label>
    <a-input v-bind="$attrs" :value="modelValue" @update:value="modelValue = $event">
      <template v-for="(_, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}" />
      </template>
    </a-input>
  </div>
</template>

<script setup lang="ts">
import { Input as AInput } from 'ant-design-vue';

defineProps<{
  label?: string;
}>();

const modelValue = defineModel<string | number>();
</script>

<style scoped>
.ui-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}
.ui-input-label {
  font-weight: 500;
  font-size: 0.9rem;
  color: #333;
}
</style>
