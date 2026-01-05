<template>
  <span class="skill-chip">
    {{ label }}
  </span>
</template>

<script setup>
const { label } = defineProps({
  label: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
.skill-chip {
  display: inline-block;
  padding: 8px 16px;
  background-color: rgb(var(--white--3));
  color: rgb(var(--gray--1));
  border-radius: 6px;
  font-size: var(--body--2--normal);
  font-weight: var(--font-weight--medium);
  white-space: nowrap;
  transition: all 0.2s ease;
}
</style>
