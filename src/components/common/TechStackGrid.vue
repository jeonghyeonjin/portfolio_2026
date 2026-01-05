<template>
  <div class="tech-stack-grid">
    <div v-for="(stack, index) in stacks" :key="index" class="tech-stack-item">
      <h4 class="tech-stack-title">{{ stack.title }}</h4>
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
  color: rgb(var(--white--1));
  margin: 0 0 16px 0;
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
