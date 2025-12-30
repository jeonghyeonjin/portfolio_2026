<template>
  <div class="available-badge">
    <span class="badge-dot"></span>
    <span class="badge-text">Available for work</span>
  </div>
</template>

<script setup></script>

<style scoped>
.available-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: rgba(var(--green--normal), 0.1);
  border-radius: 20px;
  font-size: var(--body--1--normal--regular);
}

.badge-dot {
  width: 8px;
  height: 8px;
  background-color: rgb(var(--green--dark));
  border-radius: 12px;
  flex-shrink: 0;
  animation: blink 1.5s ease-in-out infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.33;
  }
}

.badge-text {
  color: rgb(var(--green--dark));
  font-weight: 600;
}
</style>
