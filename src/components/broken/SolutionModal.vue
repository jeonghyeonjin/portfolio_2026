<template>
  <Transition name="modal">
    <div
      v-if="isOpen"
      class="solution-modal-overlay"
      @click="close"
      @wheel.passive.stop
      @touchstart="handleOverlayTouchStart"
      @touchmove="handleOverlayTouchMove"
    >
      <div
        ref="solutionModalRef"
        class="solution-modal"
        @click.stop
        @wheel.passive.stop="handleModalWheel"
        @touchstart.stop
        @touchmove.stop="handleModalTouchMove"
      >
        <Transition name="issue-marker">
          <div
            v-if="
              !isFixed('modal-focus-trap') && activeIssue !== 'modal-focus-trap' && isMarkersReady
            "
            class="issue-marker-wrapper high-z"
            style="top: 28px; right: 68px"
            @click.stop="openIssue('modal-focus-trap')"
          >
            <IssueMarker />
          </div>
        </Transition>
        <!-- Header -->
        <div class="modal-header">
          <button class="modal-close-button" aria-label="닫기" @click="close">
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
          <div class="badges">
            <BaseBadge type="difficulty" :difficulty="issue.difficulty.toLowerCase()">
              {{ issueDifficulty }}
            </BaseBadge>
            <BaseBadge type="category">{{ issue.category }}</BaseBadge>
          </div>
          <h3 class="modal-title">{{ issue.title }}</h3>
          <p class="modal-subtitle">{{ issue.subtitle }}</p>
        </div>

        <!-- Content -->
        <div class="modal-content">
          <!-- Problem -->
          <div class="section problem">
            <div class="section-label">
              <svg
                class="section-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8.4502V12.4502M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12.0498 15.4502V15.5502L11.9502 15.5498V15.4502H12.0498Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              문제
            </div>
            <div class="section-body">
              <p>{{ issue.problem }}</p>
            </div>
          </div>

          <!-- Solution -->
          <div class="section solution">
            <div class="section-label">
              <svg
                class="section-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 11V16M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12.0498 8V8.1L11.9502 8.1002V8H12.0498Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              해결
            </div>
            <div class="section-body">
              <p>{{ issue.solution }}</p>
            </div>
          </div>

          <!-- Impact -->
          <div class="section impact">
            <div class="section-label">
              <svg
                class="section-icon"
                width="16"
                height="16"
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
              효과
            </div>
            <div class="section-body">
              <p class="impact-text">{{ issue.impact }}</p>
            </div>
          </div>

          <!-- Code -->
          <div class="section code">
            <div class="section-label">
              <svg
                class="section-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 7L20 12L15 17M9 17L4 12L9 7"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              코드
            </div>
            <CodeBlock :code="issue.code" />
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <CommonButton
            variant="primary"
            size="large"
            class="modal-footer-btn-fix"
            @click="handleFix"
          >
            Fix Issue
          </CommonButton>
          <CommonButton
            variant="secondary"
            size="large"
            class="modal-footer-btn-close"
            @click="close"
          >
            Close
          </CommonButton>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed, watch, onUnmounted, ref, nextTick } from 'vue'
import { useBrokenPortfolio } from '@/composables/useBrokenPortfolio'
import { useBodyScrollLock } from '@/composables/useBodyScrollLock'
import IssueMarker from './IssueMarker.vue'
import CommonButton from '@/components/common/CommonButton.vue'
import BaseBadge from '@/components/common/BaseBadge.vue'
import CodeBlock from '@/components/common/CodeBlock.vue'

const { activeIssue, getIssue, closeIssue, fixIssue, isFixed, openIssue, isMarkersReady } =
  useBrokenPortfolio()
const { lock: lockBodyScroll, unlock: unlockBodyScroll } = useBodyScrollLock()

const solutionModalRef = ref(null)
const isOpen = computed(() => !!activeIssue.value)
const issue = computed(() => (activeIssue.value ? getIssue(activeIssue.value) : {}))

const SOLUTION_MODAL_ID = 'solution-modal'
let previousActiveElement = null
let focusTrapCleanup = null

const issueDifficulty = computed(() => {
  if (!issue.value.difficulty) return ''
  const map = {
    Basic: '기본',
    Intermediate: '중급',
    Advanced: '고급',
  }
  return map[issue.value.difficulty] || issue.value.difficulty
})

watch(isOpen, async (open) => {
  if (open) {
    lockBodyScroll(SOLUTION_MODAL_ID)
    // 포커스 트랩 적용 (이슈가 해결된 경우에만)
    if (isFixed('modal-focus-trap')) {
      await nextTick()
      previousActiveElement = document.activeElement
      focusTrapCleanup = trapFocus(solutionModalRef.value)
    }
  } else {
    unlockBodyScroll(SOLUTION_MODAL_ID)
    // 포커스 트랩 정리
    if (focusTrapCleanup) {
      focusTrapCleanup()
      focusTrapCleanup = null
    }
    // 이전 포커스 복원
    if (previousActiveElement && previousActiveElement.focus) {
      previousActiveElement.focus()
      previousActiveElement = null
    }
  }
})

onUnmounted(() => {
  unlockBodyScroll(SOLUTION_MODAL_ID)
  // 포커스 트랩 정리
  if (focusTrapCleanup) {
    focusTrapCleanup()
    focusTrapCleanup = null
  }
})

const close = () => {
  closeIssue()
}

const handleFix = () => {
  if (activeIssue.value) {
    fixIssue(activeIssue.value)
  }
}

const handleModalWheel = (e) => {
  // 모달 내부의 스크롤 가능한 영역에서는 스크롤 허용
  const target = e.target
  const codeBlock = target.closest('.code-block')
  const modal = target.closest('.solution-modal')

  // 코드 블록이나 모달 자체가 스크롤 가능한 경우 이벤트 전파 허용
  if (codeBlock || (modal && modal.scrollHeight > modal.clientHeight)) {
    return
  }

  // 그 외의 경우 이벤트 전파 차단
  e.stopPropagation()
}

const handleOverlayTouchStart = (e) => {
  // overlay에서 터치 시작 이벤트 차단
  const modal = e.target.closest('.solution-modal')
  if (!modal) {
    e.stopPropagation()
  }
}

const handleOverlayTouchMove = (e) => {
  // overlay에서 터치 이벤트는 완전히 차단
  // 모달 내부에서 발생한 이벤트는 허용
  const modal = e.target.closest('.solution-modal')
  if (!modal) {
    e.preventDefault()
    e.stopPropagation()
    return false
  }
}

const handleModalTouchMove = () => {
  // 모달 내부에서는 터치 스크롤 허용
  // 이벤트 전파를 차단하여 overlay로 전파되지 않도록 함
  // 하지만 모달 내부에서는 정상적으로 스크롤 가능
}

// 포커스 트랩 함수
const trapFocus = (modalEl) => {
  if (!modalEl) return () => {}

  const focusableElements = modalEl.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  )
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  const handleTabKey = (e) => {
    if (e.key !== 'Tab') return

    if (e.shiftKey) {
      // Shift + Tab: 역순
      if (document.activeElement === firstElement) {
        lastElement?.focus()
        e.preventDefault()
      }
    } else {
      // Tab: 순방향
      if (document.activeElement === lastElement) {
        firstElement?.focus()
        e.preventDefault()
      }
    }
  }

  modalEl.addEventListener('keydown', handleTabKey)
  // 첫 번째 포커스 가능한 요소로 포커스 이동
  firstElement?.focus()

  // cleanup 함수 반환
  return () => {
    modalEl.removeEventListener('keydown', handleTabKey)
  }
}
</script>

<style scoped>
@import '@/assets/styles/issue-marker.css';

.solution-modal {
  position: relative;
}

.solution-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 10002;
  backdrop-filter: blur(4px);
  overflow: hidden;
  touch-action: none;
}

@media (max-width: 799px) {
  .solution-modal-overlay {
    padding: 0;
    align-items: stretch;
  }
}

.solution-modal {
  background: rgb(var(--white--0));
  border-radius: 20px;
  max-width: 640px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch;
}

@media (max-width: 799px) {
  .solution-modal {
    max-width: 100%;
    max-height: 100vh;
    border-radius: 0;
    box-shadow: none;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
  }
}

.modal-header {
  padding: 28px 28px 0 28px;
  position: relative;
}

.modal-close-button {
  display: none;
}

@media (max-width: 799px) {
  .modal-close-button {
    display: flex;
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    padding: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    min-height: 44px;
    z-index: 10004;
    color: rgb(var(--gray--2));
  }

  .modal-close-button:hover {
    color: rgb(var(--gray--1));
  }

  .modal-close-button svg {
    width: 24px;
    height: 24px;
    display: block;
  }
}

.badges {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.modal-title {
  font-size: var(--title--3);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--gray--1));
  letter-spacing: -0.02em;
}

.modal-subtitle {
  color: rgba(var(--gray--5s), 1);
  font-size: var(--caption--1);
  font-weight: var(--font-weight--regular);
  margin: 0;
}

.modal-content {
  padding: 28px;
  overflow-y: auto;
  flex: 1;
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch;
}

@media (max-width: 799px) {
  .modal-content {
    padding-bottom: 100px;
  }
}

.section {
  margin-bottom: 24px;
}

.section:last-child {
  margin-bottom: 0;
}

.section-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.section-icon {
  width: 20px;
  height: 20px;
  display: block;
  flex-shrink: 0;
  color: currentColor;
}

.section.problem .section-label {
  color: rgb(var(--red--normal));
}
.section.solution .section-label {
  color: rgb(var(--green--normal));
}
.section.impact .section-label {
  color: rgb(var(--yellow--normal));
}
.section.code .section-label {
  color: rgb(var(--blue--normal));
}

.section-body {
  padding: 16px;
  border-radius: 0 8px 8px 0;
  font-size: var(--body--1--normal);
  line-height: 1.7;
}

.section.problem .section-body {
  background: rgba(var(--red--normal), 0.05);
  border-left: 3px solid rgb(var(--red--normal));
  color: rgb(var(--gray--2));
}

.section.solution .section-body {
  background: rgba(var(--green--normal), 0.05);
  border-left: 3px solid rgb(var(--green--normal));
  color: rgb(var(--gray--2));
}

.section.impact .section-body {
  background: rgba(var(--yellow--normal), 0.05);
  border-left: 3px solid rgb(var(--yellow--normal));
}

.impact-text {
  font-weight: var(--font-weight--medium);
  color: rgb(var(--yellow--dark));
  margin: 0;
}

.modal-footer {
  padding: 0 28px 28px 28px;
  display: flex;
  gap: 12px;
}

@media (max-width: 799px) {
  .modal-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px;
    background: rgb(var(--white--0));
    border-top: 1px solid rgba(var(--gray--5s), 0.2);
    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
    z-index: 10003;
  }

  .modal-footer-btn-close {
    display: none;
  }
}

.modal-footer-btn-fix {
  flex: 1;
}

/* Modal Transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-enter-active .solution-modal-overlay,
.modal-leave-active .solution-modal-overlay {
  transition: opacity 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-enter-active .solution-modal,
.modal-leave-active .solution-modal {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .solution-modal,
.modal-leave-to .solution-modal {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}
</style>
