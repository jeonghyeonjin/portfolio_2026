<template>
  <div class="typing-demo">
    <div class="typing__window" @click.stop.prevent="focusInput">
      <!-- 타이핑 영역 -->
      <div class="awaited-word">
        <span v-for="(char, index) in targetText" :key="index" class="word">
          <span
            class="awaited-letter"
            :class="{
              'letter-found': index < userInput.length && userInput[index] === char,
              'letter-to-type': index === userInput.length,
              'has-error-letter': index < userInput.length && userInput[index] !== char,
            }"
          >
            <span>{{ char === ' ' ? '&nbsp;' : char }}</span>
            <span
              v-if="index < userInput.length && userInput[index] !== char"
              class="error-letter has-error-letter"
            >
              {{ userInput[index] === ' ' ? '_' : userInput[index] }}
            </span>
            <span
              v-if="index < userInput.length && userInput[index] === char"
              class="ing-letter has-ing-letter"
            >
              {{ char }}
            </span>
          </span>
        </span>
      </div>

      <input
        ref="inputRef"
        v-model="userInput"
        type="text"
        class="input"
        spellcheck="false"
        @input="handleInput"
        @blur="isFocused = false"
        @focus="isFocused = true"
      />
    </div>
    <div v-if="!isFocused" class="focus-overlay" @click.stop.prevent="focusInput">
      <span>Click to Type</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const targetText = 'hello world'
const userInput = ref('')
const inputRef = ref(null)
const isFocused = ref(false)

const focusInput = (event) => {
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }
  inputRef.value?.focus()
}

const handleInput = () => {
  // 영어와 공백만 허용
  const filtered = userInput.value.replace(/[^a-zA-Z\s]/g, '')
  if (userInput.value !== filtered) {
    userInput.value = filtered
  }

  if (userInput.value.length > targetText.length) {
    userInput.value = userInput.value.slice(0, targetText.length)
  }
}
</script>

<style scoped>
@import '@/assets/styles/color.css';

/* Gruvbox Color Mapping */
.typing-demo {
  --bg0: rgb(var(--gray--0));
  --bg0_h: rgb(var(--gray--0s));
  --bg1: rgb(var(--gray--1));
  --bg2: rgb(var(--gray--2));
  --bg3: rgb(var(--gray--3));
  --fg0: rgb(var(--gray--12));
  --fg2: rgb(var(--gray--10));
  --fg3: rgb(var(--gray--8));
  --fg4: rgb(var(--gray--6));
  --red: rgb(var(--red--normal));
  --green: rgb(var(--green--normal));
  --yellow: rgb(var(--yellow--normal));

  width: 100%;
  background-color: var(--bg0_h);
  border-radius: 12px;
  padding: 40px 24px;
  border: 1px solid var(--bg2);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.typing__window {
  position: relative;
  width: auto;
  margin: 0 auto;
  cursor: text;
  pointer-events: auto;
}

.input {
  position: fixed;
  left: -9999px;
  top: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.awaited-word {
  display: inline-block;
  position: relative;
  margin: 0;
  white-space: nowrap;
}

.word {
  display: inline-block;
  position: relative;
}

.awaited-letter {
  display: table-cell;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 32px;
  color: var(--bg3);
  position: relative;
  min-width: 0.6rem;
  z-index: 1;
  border-bottom: 2px solid transparent;
  line-height: 1.5;
  transform: translateZ(0);
  will-change: transform, opacity;
  backface-visibility: hidden;
}

.awaited-letter::after {
  content: '';
  position: absolute;
  width: 0.5rem;
  height: 0.5rem;
  right: -0.2rem;
  bottom: 0rem;
  border-right: 3px solid transparent;
  border-bottom: 3px solid transparent;
  transition:
    transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: scale(0.95);
  z-index: 99;
  will-change: transform, opacity;
}

/* Error Letter */
.error-letter {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 32px;
  color: var(--red);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  line-height: 1.5;
  transition:
    font-size 0.3s ease,
    font-family 0.3s ease;
}

/* Ing Letter */
.ing-letter {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 32px;
  color: var(--fg0);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  line-height: 1.5;
}

/* States */
.has-ing-letter {
  background-color: var(--bg0_h);
  animation: correctKeyPress 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
  backface-visibility: hidden;
  transition: all 0.2s ease;
  animation-delay: 0.02s;
}

.has-error-letter {
  background-color: var(--bg0_h);
  animation: errorKeyPress 0.3s cubic-bezier(0.36, 0, 0.66, -0.56);
  transform-origin: center;
  backface-visibility: hidden;
  transition: all 0.2s ease;
  color: var(--red);
}

.has-error-letter::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--red);
  opacity: 0.1;
  transform: scale(1.1);
  animation: errorPulse 0.3s ease-out;
}

.letter-found {
  color: var(--fg4);
  animation: keyPressEffect 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
  backface-visibility: hidden;
  transition: color 0.2s ease;
}

.letter-to-type::after {
  border-right: 3px solid var(--fg4);
  border-bottom: 3px solid var(--fg4);
  opacity: 1;
  transform: translateZ(0) scale(1);
  animation: cursor-pulse 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  backface-visibility: hidden;
}

.focus-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(var(--gray--0), 0.7);
  border-radius: 8px;
  backdrop-filter: blur(2px);
  z-index: 100;
  cursor: pointer;
  pointer-events: auto;
}

.focus-overlay span {
  font-size: var(--body--1--normal);
  font-weight: 600;
  color: var(--white--0);
  padding: 8px 16px;
  border-radius: 20px;
}

/* Animations */
@keyframes correctKeyPress {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes errorKeyPress {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-2px);
  }
  50% {
    transform: translateX(2px);
  }
  75% {
    transform: translateX(-1px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes errorPulse {
  0% {
    opacity: 0.3;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
}

@keyframes keyPressEffect {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes cursor-pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .awaited-letter,
  .error-letter,
  .ing-letter {
    font-size: 24px;
  }
}
</style>
