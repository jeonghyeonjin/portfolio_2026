<template>
  <span :class="['badge', `badge--${type}`, type === 'difficulty' && `badge--${difficulty}`]">
    <slot />
  </span>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['difficulty', 'category'].includes(value),
  },
  difficulty: {
    type: String,
    default: '',
    validator: (value) => !value || ['basic', 'intermediate', 'advanced'].includes(value),
  },
})
</script>

<style scoped>
.badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: var(--label--1--normal);
  font-weight: var(--font-weight--regular);
  letter-spacing: -0.02em;
}

.badge--difficulty {
  color: rgb(var(--gray--1));
}

.badge--difficulty.badge--basic {
  background-color: rgb(var(--green--light));
}

.badge--difficulty.badge--intermediate {
  background-color: rgb(var(--yellow--light));
}

.badge--difficulty.badge--advanced {
  background-color: rgb(var(--red--light));
}

.badge--category {
  background-color: rgba(var(--gray--5s), 0.1);
  color: rgb(var(--gray--5s));
}
</style>

