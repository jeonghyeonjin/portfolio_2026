<template>
  <div class="keyboard-tester-demo" tabindex="0" @keydown="handleKeydown" @keyup="handleKeyup">
    <div class="keys-container">
      <div
        v-for="key in keys"
        :key="key.code"
        class="key-cap"
        :class="{ active: activeKeys.has(key.code) }"
        @mousedown="simulatePress(key.code)"
        @mouseup="simulateRelease(key.code)"
        @mouseleave="simulateRelease(key.code)"
      >
        <div class="key-top">
          <span class="key-label">{{ key.label }}</span>
        </div>
        <div class="key-side"></div>
      </div>
    </div>
    <p class="instruction">Press Z or X to test switches</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const keys = [
  { label: 'Q', code: 'KeyQ' },
  { label: 'X', code: 'KeyX' },
]

const activeKeys = ref(new Set())

const handleKeydown = (e) => {
  if (keys.some((k) => k.code === e.code)) {
    e.preventDefault()
    // Use Set methods properly to trigger reactivity
    const newSet = new Set(activeKeys.value)
    newSet.add(e.code)
    activeKeys.value = newSet
  }
}

const handleKeyup = (e) => {
  if (activeKeys.value.has(e.code)) {
    // Use Set methods properly to trigger reactivity
    const newSet = new Set(activeKeys.value)
    newSet.delete(e.code)
    activeKeys.value = newSet
  }
}

const simulatePress = (code) => {
  const newSet = new Set(activeKeys.value)
  newSet.add(code)
  activeKeys.value = newSet
}

const simulateRelease = (code) => {
  if (activeKeys.value.has(code)) {
    const newSet = new Set(activeKeys.value)
    newSet.delete(code)
    activeKeys.value = newSet
  }
}

// Global event listeners for better UX
const onGlobalKeydown = (e) => handleKeydown(e)
const onGlobalKeyup = (e) => handleKeyup(e)

onMounted(() => {
  window.addEventListener('keydown', onGlobalKeydown)
  window.addEventListener('keyup', onGlobalKeyup)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onGlobalKeydown)
  window.removeEventListener('keyup', onGlobalKeyup)
})
</script>

<style scoped>
@import '@/assets/styles/color.css';

.keyboard-tester-demo {
  /* Gruvbox inspired variables from KeeBBear */
  --bg0: rgb(var(--gray--0));
  --bg0_h: rgb(var(--gray--0s));
  --bg1: rgb(var(--gray--1));
  --bg2: rgb(var(--gray--2));
  --bg3: rgb(var(--gray--3));
  --fg2: rgb(var(--gray--10));
  --green2: rgb(var(--green--light));
  --primary: rgb(var(--primary-color));

  width: 100%;
  background-color: var(--bg0);
  border-radius: 12px;
  padding: 40px 24px;
  border: 1px solid var(--bg2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  outline: none;
}

.keys-container {
  display: flex;
  gap: 16px;
}

.key-cap {
  position: relative;
  width: 60px;
  height: 60px;
  cursor: pointer;
  transition: transform 0.05s ease;
  user-select: none;
}

.key-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--fg2);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow:
    0 0 0 1px var(--bg3),
    0 0 0 2px var(--bg1),
    0 4px 0 0 var(--bg0),
    0 5px 5px 0 rgba(0, 0, 0, 0.3);
  transition: all 0.05s ease;
  color: var(--bg0);
}

.key-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
}

/* Hover State */
.key-cap:hover .key-top {
  transform: translateY(-2px);
  box-shadow:
    0 0 0 1px var(--bg3),
    0 0 0 2px var(--bg1),
    0 6px 0 0 var(--bg0),
    0 7px 7px 0 rgba(0, 0, 0, 0.3);
}

/* Active State */
.key-cap.active .key-top {
  transform: translateY(4px);
  background-color: var(--green2);
  color: var(--bg0);
  box-shadow:
    0 0 0 1px var(--bg3),
    0 0 0 2px var(--bg1),
    0 0 0 0 var(--bg0),
    0 1px 2px 0 rgba(0, 0, 0, 0.3);
}

.instruction {
  font-size: 14px;
  color: rgb(var(--gray--5));
  margin: 0;
  font-family: 'JetBrains Mono', monospace;
}
</style>
