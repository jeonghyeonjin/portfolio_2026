<template>
  <span class="skill-chip">
    {{ label }}
  </span>
</template>

<script setup>
defineProps({
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
  background-color: var(--gray--1);
  color: var(--white--1);
  border-radius: 12px;
  font-size: var(--body-1---normal----regular);
  font-weight: 400;
  white-space: nowrap;
}
</style>
