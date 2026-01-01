<template>
  <div class="available-badge">
    <span class="badge-dot"></span>
    <span class="badge-text" :class="{ 'is-broken': !isFixed('contrast-badge') }"
      >Available for work</span
    >
    <Transition name="issue-marker">
      <div
        v-if="!isFixed('contrast-badge') && isMarkersReady"
        class="issue-marker-wrapper"
        style="top: -6px; right: -6px"
        @click.stop="openIssue('contrast-badge')"
      >
        <IssueMarker />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { useBrokenPortfolio } from '@/composables/useBrokenPortfolio'
import IssueMarker from '@/components/broken/IssueMarker.vue'

const { isFixed, openIssue, isMarkersReady } = useBrokenPortfolio()
</script>

<style scoped>
@import '@/assets/styles/issue-marker.css';
.available-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: rgba(var(--white--1), 0.9);
  border-radius: 12px;
  position: relative;
}

.badge-dot {
  width: 8px;
  height: 8px;
  background-color: rgb(var(--green--normal));
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
  font-size: var(--label--1--normal);
  color: rgb(var(--green--normal));
  font-weight: var(--font-weight--medium);
  transition: color 0.3s ease;
}

.badge-text.is-broken {
  color: #ccc; /* Broken contrast */
}
</style>
