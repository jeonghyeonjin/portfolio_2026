<template>
  <Transition name="fade">
    <div
      v-if="isVisible"
      class="work-modal-toc"
      :class="{
        'is-expanded': isExpanded || isMobileExpanded,
        'theme-light': theme === 'light',
        'theme-dark': theme === 'dark',
      }"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @click="handleMobileToggle"
    >
      <div class="toc-container">
        <div
          v-for="(section, index) in sections"
          :key="index"
          class="toc-item"
          :class="{ 'is-active': activeSection === section.id }"
          @click.stop="activeSection !== section.id && scrollToSection(section.id)"
        >
          <span class="toc-label">{{ section.label }}</span>
          <div class="toc-marker"></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useResponsive } from '@/composables/useResponsive'

const props = defineProps({
  sections: {
    type: Array,
    required: true,
    // Expected format: [{ id: 'section-id', label: 'Section Label' }]
  },
  thresholdSelector: {
    type: String,
    default: null, // If null, uses the first section's ID
  },
  theme: {
    type: String,
    default: 'dark', // 'light' or 'dark'
    validator: (value) => ['light', 'dark'].includes(value),
  },
})

const isVisible = ref(false)
const isExpanded = ref(false)
const isMobileExpanded = ref(false)
const activeSection = ref('')
const { isMobile } = useResponsive()

// 클릭 후 자동 감지 일시 중지를 위한 플래그
const isUserScrolling = ref(false)
let userScrollTimeout = null
let scrollEndCheckInterval = null

// Threshold logic
const checkVisibility = () => {
  const modalContainer = document.querySelector('.work-modal-container')
  if (!modalContainer) return

  const targetId =
    props.thresholdSelector || (props.sections.length > 0 ? props.sections[0].id : null)
  if (!targetId) return

  const targetEl = document.getElementById(targetId)

  if (targetEl) {
    const rect = targetEl.getBoundingClientRect()
    isVisible.value = rect.top < window.innerHeight * 0.8 && rect.bottom > -10000
  }
}

// Active section logic - 화면 중앙에 가장 가까운 섹션 감지
const checkActiveSection = () => {
  // 사용자가 클릭한 직후라면 자동 감지 스킵
  if (isUserScrolling.value) return

  const modalContainer = document.querySelector('.work-modal-container')
  if (!modalContainer) return

  // 뷰포트 중앙 지점 계산
  const viewportCenter = window.innerHeight / 2

  let closestId = null
  let minDistance = Infinity

  // 모든 섹션을 순회하며 화면 중앙에 가장 가까운 섹션 찾기
  for (const section of props.sections) {
    const el = document.getElementById(section.id)
    if (!el) continue

    const rect = el.getBoundingClientRect()

    // 섹션이 뷰포트에 보이는지 확인
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0

    if (isVisible) {
      // 섹션의 중앙 지점 계산
      const sectionCenter = rect.top + rect.height / 2

      // 뷰포트 중앙과의 거리 계산
      const distance = Math.abs(sectionCenter - viewportCenter)

      // 가장 가까운 섹션 업데이트
      if (distance < minDistance) {
        minDistance = distance
        closestId = section.id
      }
    }
  }

  // 가장 가까운 섹션이 있으면 활성화
  if (closestId) {
    activeSection.value = closestId
  }
}

const handleScroll = () => {
  checkVisibility()
  checkActiveSection()
}

const scrollToSection = (id) => {
  const modalContainer = document.querySelector('.work-modal-container')
  const el = document.getElementById(id)

  if (modalContainer && el) {
    // 클릭한 섹션을 즉시 활성화
    activeSection.value = id

    // 자동 감지 일시 중지 (스크롤 완료 후 재개)
    isUserScrolling.value = true
    if (userScrollTimeout) clearTimeout(userScrollTimeout)
    if (scrollEndCheckInterval) clearInterval(scrollEndCheckInterval)

    // 섹션으로 스크롤
    const headerOffset = 100
    const elementPosition = el.getBoundingClientRect().top
    const offsetPosition = elementPosition + modalContainer.scrollTop - headerOffset

    modalContainer.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })

    // 실제 스크롤 완료 감지
    let lastScrollTop = modalContainer.scrollTop
    let stableCount = 0
    const STABLE_THRESHOLD = 3 // 연속 3회 변화 없으면 완료로 간주

    scrollEndCheckInterval = setInterval(() => {
      const currentScrollTop = modalContainer.scrollTop

      if (Math.abs(currentScrollTop - lastScrollTop) < 1) {
        stableCount++
        if (stableCount >= STABLE_THRESHOLD) {
          // 스크롤 완료
          clearInterval(scrollEndCheckInterval)
          scrollEndCheckInterval = null
          isUserScrolling.value = false
        }
      } else {
        stableCount = 0
        lastScrollTop = currentScrollTop
      }
    }, 50) // 50ms마다 체크

    // 최대 대기 시간 (안전장치)
    userScrollTimeout = setTimeout(() => {
      if (scrollEndCheckInterval) {
        clearInterval(scrollEndCheckInterval)
        scrollEndCheckInterval = null
      }
      isUserScrolling.value = false
    }, 2000) // 최대 2초 후 강제 재개
  }
}

const handleMouseEnter = () => {
  if (!isMobile.value) {
    isExpanded.value = true
  }
}

const handleMouseLeave = () => {
  if (!isMobile.value) {
    isExpanded.value = false
  }
}

const handleMobileToggle = () => {
  if (isMobile.value) {
    isMobileExpanded.value = !isMobileExpanded.value
  }
}

let scrollRaf = null
const onScroll = () => {
  if (scrollRaf) cancelAnimationFrame(scrollRaf)
  scrollRaf = requestAnimationFrame(handleScroll)
}

onMounted(() => {
  const modalContainer = document.querySelector('.work-modal-container')
  if (modalContainer) {
    modalContainer.addEventListener('scroll', onScroll, { passive: true })
    // Initial check
    setTimeout(handleScroll, 500) // Wait for layout
  }
})

onUnmounted(() => {
  const modalContainer = document.querySelector('.work-modal-container')
  if (modalContainer) {
    modalContainer.removeEventListener('scroll', onScroll)
  }
  if (scrollRaf) cancelAnimationFrame(scrollRaf)
  if (userScrollTimeout) clearTimeout(userScrollTimeout)
  if (scrollEndCheckInterval) clearInterval(scrollEndCheckInterval)
})

watch(
  () => isMobile.value,
  (newVal) => {
    if (!newVal) {
      isMobileExpanded.value = false
    }
  },
)
</script>

<style scoped>
.work-modal-toc {
  position: fixed;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 900; /* Below header (1000) */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 20px 14px;
  /* background: rgba(0, 0, 0, 0.2); Backdrop optional */
  border-radius: 20px;
  transition: all 0.4s ease;
}

.toc-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* Align right to keep dots aligned */
}

/* Item Wrapper */
.toc-item {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 8px;
  transition: all 0.4s ease;
  position: relative;
}

/* The Label */
.toc-label {
  font-size: var(--body--2--normal);
  opacity: 0;
  transform: translateX(10px);
  transition: all 0.4s ease;
  white-space: nowrap;
  pointer-events: none; /* Let clicks pass to item */
  text-align: right;
}

/* The Dot/Dash */
.toc-marker {
  width: 10px;
  height: 3px;
  border-radius: 3px;
  transition: all 0.4s ease;
}

/* Dark Theme (Default) */
.work-modal-toc.theme-dark .toc-label {
  color: rgb(var(--gray--1));
  font-weight: var(--font-weight--regular);
}

.work-modal-toc.theme-dark .toc-marker {
  background-color: rgba(var(--white--1), 0.3);
}

.work-modal-toc.theme-dark:hover .toc-marker {
  background-color: rgba(var(--white--1), 0.6);
}

.work-modal-toc.theme-dark .toc-item.is-active .toc-label {
  color: rgb(var(--yellow--normal));
}

/* Light Theme */
.work-modal-toc.theme-light .toc-label {
  color: rgb(var(--gray--1));
}

.work-modal-toc.theme-light .toc-marker {
  background-color: rgba(var(--gray--5s), 0.5);
}

.work-modal-toc.theme-light:hover .toc-marker {
  background-color: rgba(var(--gray--5s), 0.8);
}

.work-modal-toc.theme-light .toc-item.is-active .toc-label {
  color: rgb(var(--gray--1));
}

/* Hover/Expanded State */
.work-modal-toc.is-expanded {
  background-color: rgba(var(--white--2), 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.work-modal-toc.is-expanded .toc-label {
  opacity: 1;
  transform: translateX(0);
  pointer-events: auto;
  color: rgb(var(--gray--5s));
}

.work-modal-toc.is-expanded .toc-marker {
  background-color: rgba(var(--gray--5s), 0.5);
}

.work-modal-toc.is-expanded:hover .toc-marker {
  background-color: rgba(var(--gray--5s), 0.8);
}

.work-modal-toc.is-expanded .toc-item:hover:not(.is-active) .toc-label {
  color: rgba(var(--gray--0), 1);
}

.work-modal-toc.is-expanded .toc-item.is-active {
  cursor: default;
  pointer-events: none;
}

.work-modal-toc.is-expanded .toc-item.is-active .toc-label {
  color: rgb(var(--gray--0));
  text-decoration: none;
}

/* Active State */
.toc-item.is-active .toc-marker {
  background-color: rgb(var(--yellow--normal));
  border: 0.5px solid rgb(var(--yellow--light));
}

/* Expanded 상태에서 활성화된 항목의 마커 색상 유지 */
.work-modal-toc.is-expanded .toc-item.is-active .toc-marker {
  background-color: rgb(var(--yellow--normal));
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .work-modal-toc {
    right: 16px;
  }

  .toc-label {
    display: none; /* Hide labels on mobile usually, or show on tap */
  }

  /* If we want to show labels on mobile tap */
  .work-modal-toc.is-expanded .toc-label {
    display: block;
  }
}
</style>
