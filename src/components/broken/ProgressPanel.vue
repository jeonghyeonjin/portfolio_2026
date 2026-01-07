<template>
  <div class="progress-panel-wrapper">
    <!-- Compact 버튼 (항상 표시) -->
    <div class="progress-button" :class="{ 'all-fixed': allFixed }">
      <svg
        v-if="!allFixed"
        class="button-icon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 7H17.8486C17.3511 7 17 6.49751 17 6C17 4.34315 15.6569 3 14 3C12.3431 3 11 4.34315 11 6C11 6.49751 10.6488 7 10.1513 7H8C7.44771 7 7 7.44772 7 8V10.1513C7 10.6488 6.49751 11 6 11C4.34315 11 3 12.3431 3 14C3 15.6569 4.34315 17 6 17C6.49751 17 7 17.3511 7 17.8486V20C7 20.5523 7.44771 21 8 21L20 21C20.5523 21 21 20.5523 21 20V17.8486C21 17.3511 20.4975 17 20 17C18.3431 17 17 15.6569 17 14C17 12.3431 18.3431 11 20 11C20.4975 11 21 10.6488 21 10.1513L21 8C21 7.44772 20.5523 7 20 7Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <div v-if="!allFixed" class="button-count-container">
        <span class="button-count-current">{{ progress }}</span>
        <span class="button-count-separator">/</span>
        <span class="button-count-total">{{ totalIssues }}</span>
      </div>
      <button class="help-button" aria-label="Help" @click.stop="toggleHelpPanel">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9.14648 9.07361C9.31728 8.54732 9.63015 8.07896 10.0508 7.71948C10.4714 7.36001 10.9838 7.12378 11.5303 7.03708C12.0768 6.95038 12.6362 7.0164 13.1475 7.22803C13.6587 7.43966 14.1014 7.78875 14.4268 8.23633C14.7521 8.68391 14.9469 9.21256 14.9904 9.76416C15.0339 10.3158 14.9238 10.8688 14.6727 11.3618C14.4215 11.8548 14.0394 12.2685 13.5676 12.5576C13.0958 12.8467 12.5533 12.9998 12 12.9998V14.0002M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12.0498 17V17.1L11.9502 17.1002V17H12.0498Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <!-- 설명 판넬 (absolute 팝업) -->
    <Transition name="panel">
      <div
        v-if="isHelpPanelOpen"
        ref="helpPanelRef"
        class="help-panel"
        @click.stop
        @wheel.passive.stop="handlePanelWheel"
      >
        <button class="help-panel-close" aria-label="닫기" @click="toggleHelpPanel">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <div v-if="!isAutoOpened" class="help-panel-content">
          <div class="help-header">
            <div class="help-title">Broken Portfolio</div>
            <div class="help-subtitle">Find and fix issues</div>
          </div>

          <div class="help-content">
            <div v-if="!allFixed" class="help-section">
              <div class="help-label">
                <svg
                  class="help-label-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 21H15M12 3C8.68629 3 6 5.68629 6 9C6 10.2145 6.36084 11.3447 6.98117 12.2893C7.93507 13.7418 8.41161 14.4676 8.47352 14.5761C9.02428 15.541 8.92287 15.2007 8.99219 16.3096C8.99998 16.4342 9 16.6229 9 17C9 17.5523 9.44772 18 10 18L14 18C14.5523 18 15 17.5523 15 17C15 16.6229 15 16.4342 15.0078 16.3096C15.0771 15.2007 14.9751 15.541 15.5259 14.5761C15.5878 14.4676 16.0651 13.7418 17.019 12.2893C17.6394 11.3447 18.0002 10.2145 18.0002 9C18.0002 5.68629 15.3137 3 12 3Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                How to play
              </div>
              <p class="help-text">
                Look for strange elements on the page and click on them to discover issues. Each
                issue can be fixed by understanding the problem and applying the solution.
              </p>
            </div>

            <div v-if="allFixed" class="completion-message">🎉 All issues found!</div>
          </div>
        </div>

        <!-- 하단 고정 영역 (프로그레스 표시, 리셋 버튼, 프로그레스바) -->
        <div class="help-panel-footer">
          <div v-if="!allFixed" class="help-section">
            <div class="progress-display">
              <span class="progress-number">{{ animatedProgress }}</span>
              <span class="progress-separator">/</span>
              <span class="progress-number">{{ totalIssues }}</span>
              <span class="progress-label">issues found</span>
            </div>
          </div>

          <div v-if="!isAutoOpened" class="help-section">
            <CommonButton
              variant="secondary"
              size="medium"
              :disabled="progress === 0"
              class="reset-button"
              @click="handleReset"
            >
              Reset Progress
            </CommonButton>
          </div>
        </div>
        <!-- 프로그레스바 -->
        <ProgressBar :progress="animatedProgress" :total="totalIssues" />
      </div>
    </Transition>

    <!-- Reset 확인 모달 -->
    <Transition name="modal">
      <div v-if="isResetModalOpen" class="reset-modal-overlay" @click="cancelReset">
        <div class="reset-modal" @click.stop>
          <div class="reset-modal-header">
            <h3 class="reset-modal-title">Reset Progress</h3>
            <p class="reset-modal-subtitle">Are you sure you want to reset all progress?</p>
          </div>
          <div class="reset-modal-footer">
            <CommonButton variant="secondary" size="medium" @click="cancelReset">
              Cancel
            </CommonButton>
            <CommonButton variant="destructive" size="medium" @click="confirmReset">
              Reset
            </CommonButton>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useBrokenPortfolio } from '@/composables/useBrokenPortfolio'
import CommonButton from '@/components/common/CommonButton.vue'
import ProgressBar from '@/components/common/ProgressBar.vue'

const { progress, totalIssues, allFixed, fixedIssues, resetProgress } = useBrokenPortfolio()

const isHelpPanelOpen = ref(false)
const isResetModalOpen = ref(false)
const animatedProgress = ref(0)
const helpPanelRef = ref(null)
const isAutoOpened = ref(false) // 자동으로 열렸는지 여부
let autoCloseTimeout = null
let animationFrameId = null

const AUTO_CLOSE_DELAY = 3000 // 3초 후 자동 접기
const ANIMATION_DURATION = 600 // 애니메이션 지속 시간 (ms)

const toggleHelpPanel = async () => {
  if (!isHelpPanelOpen.value) {
    // 판넬 열기 (사용자가 직접 클릭)
    isAutoOpened.value = false
    isHelpPanelOpen.value = true
    await nextTick()
    // 판넬이 열린 후 현재 progress로 설정 (애니메이션 없이)
    animatedProgress.value = progress.value
    clearAutoClose()
  } else {
    // 판넬 닫기
    isHelpPanelOpen.value = false
    scheduleAutoClose()
  }
}

const handleReset = () => {
  isResetModalOpen.value = true
}

const confirmReset = () => {
  resetProgress()
  animatedProgress.value = 0
  isHelpPanelOpen.value = false
  isResetModalOpen.value = false

  clearAutoClose()
}

const cancelReset = () => {
  isResetModalOpen.value = false
}

const animateProgress = (from, to) => {
  // 기존 애니메이션 취소
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }

  const startTime = Date.now()
  const startValue = from
  const endValue = to

  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / ANIMATION_DURATION, 1)

    // easing function (ease-out)
    const eased = 1 - Math.pow(1 - progress, 3)

    animatedProgress.value = Math.round(startValue + (endValue - startValue) * eased)

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(animate)
    } else {
      animatedProgress.value = endValue
      animationFrameId = null
    }
  }

  animationFrameId = requestAnimationFrame(animate)
}

const openHelpPanel = async (previousProgress = null) => {
  const fromProgress = previousProgress !== null ? previousProgress : progress.value
  const toProgress = progress.value

  if (!isHelpPanelOpen.value) {
    // 초기값을 이전 progress로 설정
    animatedProgress.value = fromProgress
    isAutoOpened.value = true // 자동으로 열림
    isHelpPanelOpen.value = true
    // 판넬이 열린 후 애니메이션 시작
    await nextTick()
    // 약간의 딜레이 후 애니메이션 시작 (판넬 열림 애니메이션 후)
    setTimeout(() => {
      animateProgress(fromProgress, toProgress)
    }, 100)
    scheduleAutoClose()
  } else {
    // 이미 열려있으면 즉시 애니메이션
    animateProgress(fromProgress, toProgress)
    scheduleAutoClose()
  }
}

const scheduleAutoClose = () => {
  clearAutoClose()
  autoCloseTimeout = setTimeout(() => {
    isHelpPanelOpen.value = false
  }, AUTO_CLOSE_DELAY)
}

const clearAutoClose = () => {
  if (autoCloseTimeout) {
    clearTimeout(autoCloseTimeout)
    autoCloseTimeout = null
  }
}

const handlePanelWheel = (e) => {
  // 판넬 내부의 스크롤 가능한 영역에서는 스크롤 허용
  const target = e.target
  const panel = target.closest('.help-panel')

  // 판넬이 스크롤 가능한 경우 이벤트 전파 허용
  if (panel && panel.scrollHeight > panel.clientHeight) {
    return
  }

  // 그 외의 경우 이벤트 전파 차단
  e.stopPropagation()
}

// 초기 animatedProgress 설정
watch(
  () => progress.value,
  (newValue) => {
    if (!isHelpPanelOpen.value) {
      animatedProgress.value = newValue
    }
  },
  { immediate: true },
)

// 이슈가 해결될 때마다 설명 판넬 자동 표시
watch(
  () => fixedIssues.value.length,
  (newLength, oldLength) => {
    if (newLength > oldLength) {
      // 이슈가 새로 해결됨
      const previousProgress = oldLength
      openHelpPanel(previousProgress)
    }
  },
)

// 외부 클릭 시 닫기
const handleClickOutside = (event) => {
  if (isHelpPanelOpen.value && !event.target.closest('.progress-panel-wrapper')) {
    isHelpPanelOpen.value = false

    clearAutoClose()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  clearAutoClose()
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
})
</script>

<style scoped>
@import '@/assets/styles/breakpoints.css';

.progress-panel-wrapper {
  position: relative;
  pointer-events: auto;
  display: flex;
  align-items: center;
}

@media (--mobile) {
  .progress-panel-wrapper {
    display: flex !important;
    visibility: visible !important;
    opacity: 1 !important;
    width: auto !important;
    height: auto !important;
  }
}

.progress-button {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 8px 6px 8px 16px;
  border-radius: 10px;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.progress-button.all-fixed {
  padding: 0;
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

@media (--mobile) {
  .progress-button {
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }

  .help-button {
    padding: 6px;
  }

  .help-button svg {
    width: 24px;
    height: 24px;
  }
}

.help-button {
  background: none;
  border: none;
  padding: 9px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(var(--gray--2));
  transition: all 0.2s ease;
  border-radius: 6px;
  min-width: 44px;
  min-height: 44px;
  width: auto;
  height: auto;
  flex-shrink: 0;
}

.help-button:hover {
  color: rgb(var(--gray--1));
}

.help-button svg {
  width: 24px;
  height: 24px;
  display: block;
  color: rgb(var(--gray--5s));
  transition: color 0.3s ease;
}

.help-button:hover svg {
  color: rgb(var(--gray--1));
}

.button-icon {
  width: 20px;
  height: 20px;
  display: block;
  flex-shrink: 0;
  color: rgb(var(--gray--2));
  fill: currentColor;
  margin-right: 6px;
  transition: color 0.2s ease;
}

.button-count-container {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-right: 2px;
}

.button-count-current {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--medium);
  color: rgb(var(--green--normal));
}

.button-count-separator {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--medium);
  color: rgb(var(--gray--2));
}

.button-count-total {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--medium);
  color: rgb(var(--gray--2));
}

/* 설명 판넬 */
.help-panel {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: rgb(var(--white--0));
  border-radius: 12px;
  min-width: 280px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  pointer-events: auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 85vh;
  z-index: 100;
}

.help-panel-close {
  display: none;
}

.help-panel-content {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}

@media (--mobile) {
  .help-panel-content {
    padding: 30px 30px 20px 30px;
  }
}

.help-panel-footer {
  padding: 0 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.help-header {
  margin-bottom: 16px;
}

.help-title {
  font-size: var(--title--3);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--gray--1));
  letter-spacing: -0.02em;
}

.help-subtitle {
  font-size: var(--label--1--normal);
  color: rgb(var(--gray--5s));
}

.help-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.help-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.help-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--headline--2);
  font-weight: 600;
  color: rgb(var(--gray--5s));
}

.help-label-icon {
  width: 20px;
  height: 20px;
  display: block;
  flex-shrink: 0;
}

.help-text {
  font-size: var(--body--1--normal);
  line-height: 1.6;
  color: rgb(var(--gray--4));
  margin: 0;
}

.progress-display {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.progress-number {
  font-size: 20px;
  font-weight: 700;
  color: rgb(var(--blue--normal));
}

.progress-separator {
  font-size: 16px;
  color: rgba(var(--gray--5s), 0.5);
}

.progress-label {
  font-size: 13px;
  color: rgb(var(--gray--5s));
  margin-left: 4px;
}

.completion-message {
  border-radius: 8px;
  color: rgb(var(--green--normal));
  font-size: var(--heading--2);
  font-weight: var(--font-weight--bold);
}

.reset-button {
  width: 100%;
}

/* Reset 확인 모달 */
.reset-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 3000;
  backdrop-filter: blur(4px);
}

.reset-modal {
  background: rgb(var(--white--0));
  border-radius: 20px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.reset-modal-header {
  padding: 28px 28px 0 28px;
}

.reset-modal-title {
  font-size: var(--title--3);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--gray--1));
  letter-spacing: -0.02em;
  margin: 0 0 8px 0;
}

.reset-modal-subtitle {
  color: rgba(var(--gray--5s), 1);
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  margin: 0;
  line-height: 1.6;
}

.reset-modal-footer {
  padding: 20px 28px 28px 28px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

/* Modal Transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .reset-modal,
.modal-leave-active .reset-modal {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .reset-modal,
.modal-leave-to .reset-modal {
  transform: scale(0.9);
  opacity: 0;
}

/* Transition 애니메이션 */
.panel-enter-active,
.panel-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.panel-enter-from {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}

.panel-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}
</style>
