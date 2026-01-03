<template>
  <div class="metrics-grid">
    <div v-for="(metric, index) in metrics" :key="index" class="metric-item">
      <span class="metric-label">{{ metric.label }}</span>
      <span class="metric-value">{{ metric.value }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  metrics: {
    type: Array,
    required: true,
    // Example: [{ label: 'Initial Load Time', value: '< 2s' }, ...]
  },
})
</script>

<style scoped>
@import '@/assets/styles/breakpoints.css';

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.metric-item {
  background: linear-gradient(135deg, rgba(var(--white--1), 0.8) 0%, rgba(var(--white--2), 1) 100%);
  border: 1px solid rgba(var(--gray--4), 0.2);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.metric-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(
    90deg,
    rgba(var(--primary-color), 0.6),
    rgba(var(--accent-color), 0.4)
  );
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.metric-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--gray--5), 0.15);
}

.metric-item:hover::before {
  transform: scaleX(1);
}

.metric-label {
  font-size: var(--body--2--normal);
  font-weight: var(--font-weight--regular);
  color: rgb(var(--gray--3));
  letter-spacing: 0.01em;
}

.metric-value {
  font-size: var(--title--2);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--gray--1));
  font-feature-settings: 'tnum';
}

/* Tablet */
@media (--tablet) {
  .metrics-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
  }

  .metric-item {
    padding: 20px;
  }

  .metric-value {
    font-size: var(--title--3);
  }
}

/* Mobile */
@media (--mobile) {
  .metrics-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .metric-item {
    padding: 18px;
  }

  .metric-label {
    font-size: var(--caption--1);
  }

  .metric-value {
    font-size: var(--body--1--normal);
  }
}
</style>
