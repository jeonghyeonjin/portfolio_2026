<template>
  <div class="progress-bar-container">
    <div class="progress-bar" :style="{ width: `${(progress / total) * 100}%` }"></div>
  </div>
</template>

<script setup>
defineProps({
  progress: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
})
</script>

<style scoped>
.progress-bar-container {
  height: 4px;
  background: rgba(var(--gray--5s), 0.2);
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: rgb(var(--blue--normal));
  transition: width 0.3s ease;
}
</style>

