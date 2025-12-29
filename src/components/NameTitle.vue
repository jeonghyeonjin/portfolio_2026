<template>
  <div class="name-title" ref="nameTitleRef">
    <div ref="nameTextRef" class="name-text">
      <div ref="firstLineRef" class="name-line">Jeong</div>
      <div ref="secondLineRef" class="name-line">Hyeon-jin</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const nameTitleRef = ref(null)
const nameTextRef = ref(null)
const firstLineRef = ref(null)
const secondLineRef = ref(null)

defineExpose({
  $el: nameTitleRef,
  firstLineRef,
  secondLineRef,
})
</script>

<style scoped>
@import '@/assets/breakpoints.css';

.name-title {
  display: flex;
  flex-direction: column;
  margin-top: 12px;
}

.name-text {
  display: flex;
  flex-direction: column;
}

.name-line {
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: var(--hero-title-1);
  font-weight: 700;
  color: var(--gray--1);
  letter-spacing: -0.02em;
  line-height: 1.1;
}

@media (max-width: 1439px) {
  .name-line {
    font-size: var(--hero-title-2);
  }
}

@media (max-width: 799px) {
  .name-line {
    font-size: var(--hero-title-3);
  }
}
</style>
