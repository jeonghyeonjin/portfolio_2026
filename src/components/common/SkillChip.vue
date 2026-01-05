<template>
  <span class="skill-chip" :style="chipStyle">
    {{ label }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  backgroundColor: {
    type: String,
    default: 'rgb(var(--white--3))',
  },
  textColor: {
    type: String,
    default: 'rgb(var(--gray--1))',
  },
})

const chipStyle = computed(() => {
  return {
    backgroundColor: props.backgroundColor,
    color: props.textColor,
  }
})
</script>

<style scoped>
.skill-chip {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 12px;
  font-size: var(--body--2--normal);
  font-weight: var(--font-weight--regular);
  white-space: nowrap;
  transition: all 0.2s ease;
}
</style>
