<template>
  <div class="tech-stack-grid">
    <div v-for="(stack, index) in stacks" :key="index" class="tech-stack-item">
      <h4 class="tech-stack-title">{{ stack.title }}</h4>
      <slot :name="`stack-${index}`">
        <TreeDiagram v-if="stack.items">
          {{ formatStackItems(stack.items) }}
        </TreeDiagram>
      </slot>
    </div>
  </div>
</template>

<script setup>
import TreeDiagram from './TreeDiagram.vue'

defineProps({
  stacks: {
    type: Array,
    required: true,
    // Example: [{ title: 'Frontend', items: ['Vue 3', 'Vuex 4', ...] }, ...]
  },
})

const formatStackItems = (items) => {
  if (!items || !Array.isArray(items)) return ''
  return items
    .map((item, index) => {
      const prefix = index === items.length - 1 ? '└─' : index === 0 ? '┌─' : '├─'
      return `${prefix} ${item}`
    })
    .join('\n')
}
</script>

<style scoped>
@import '@/assets/styles/breakpoints.css';

.tech-stack-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-top: 30px;
  /* background-color: var(--white--0); */
}

.tech-stack-item {
  background: linear-gradient(135deg, rgba(var(--white--1), 0.8) 0%, rgba(var(--white--2), 1) 100%);
  border: 1px solid rgba(var(--gray--4), 0.2);
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
}

.tech-stack-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(var(--gray--5), 0.12);
  border-color: rgba(var(--gray--3), 0.3);
}

.tech-stack-title {
  font-size: var(--body--1--bold);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--gray--1));
  margin: 0 0 16px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(var(--gray--4), 0.2);
  display: flex;
  align-items: center;
  gap: 8px;
}

.tech-stack-title::before {
  content: '';
  width: 4px;
  height: 20px;
  background: linear-gradient(
    to bottom,
    rgba(var(--primary-color), 0.6),
    rgba(var(--accent-color), 0.4)
  );
  border-radius: 2px;
}

/* Tablet */
@media (--tablet) {
  .tech-stack-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .tech-stack-item {
    padding: 20px;
  }
}

/* Mobile */
@media (--mobile) {
  .tech-stack-grid {
    gap: 16px;
  }

  .tech-stack-item {
    padding: 18px;
  }

  .tech-stack-title {
    font-size: var(--body--1--normal);
    margin-bottom: 12px;
  }
}
</style>
