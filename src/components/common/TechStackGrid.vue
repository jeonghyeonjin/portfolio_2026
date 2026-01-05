<template>
  <div class="tech-stack-grid">
    <div v-for="(stack, index) in stacks" :key="index" class="tech-stack-item">
      <h4 class="tech-stack-title" :class="`tech-stack-title--${theme}`">
        {{ stack.title }}
      </h4>
      <slot :name="`stack-${index}`">
        <div v-if="stack.items" class="tech-badges">
          <SkillChip v-for="(item, itemIndex) in stack.items" :key="itemIndex" :label="item" />
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
import SkillChip from './SkillChip.vue'

defineProps({
  stacks: {
    type: Array,
    required: true,
    // Example: [{ title: 'Frontend', items: ['Vue 3', 'Vuex 4', ...] }, ...]
  },
  theme: {
    type: String,
    default: 'dark',
    validator: (value) => ['dark', 'light'].includes(value),
  },
})
</script>

<style scoped>
@import '@/assets/styles/breakpoints.css';

.tech-stack-grid {
  margin-top: 40px;
}

.tech-stack-item {
  margin-bottom: 24px;
}

.tech-stack-title {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--semibold);
  margin: 0 0 16px 0;
}

.tech-stack-title--dark {
  color: rgb(var(--white--1));
}

.tech-stack-title--light {
  color: rgb(var(--gray--1));
}

.tech-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

/* Tablet */
@media (--tablet) {
  .tech-stack-item {
    margin-bottom: 20px;
  }
}

/* Mobile */
@media (--mobile) {
  .tech-stack-item {
    margin-bottom: 16px;
  }
}
</style>
