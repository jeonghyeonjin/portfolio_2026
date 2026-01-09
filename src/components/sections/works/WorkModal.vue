<template>
  <div ref="modalOverlayRef" class="work-modal-overlay" @click.self="handleClose">
    <div ref="workModalContainerRef" class="work-modal-container" @click.stop>
      <button class="work-modal-close" aria-label="닫기" @click="handleClose">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <Transition name="issue-marker">
        <div
          v-if="!isFixed('work-modal-lazy-load') && isMarkersReady"
          class="issue-marker-wrapper"
          style="position: fixed; top: 40px; left: 40px; z-index: 10001"
          @click.stop="openIssue('work-modal-lazy-load')"
        >
          <IssueMarker />
        </div>
      </Transition>
      <div ref="workModalWrapperRef" class="work-modal-wrapper">
        <div ref="workModalContentRef" class="work-modal-content-inner">
          <component :is="workComponent" v-if="workComponent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { shallowRef, ref, onMounted, onUnmounted, provide, computed, watch, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import IssueMarker from '@/components/broken/IssueMarker.vue'
import { useBrokenPortfolio } from '@/composables/useBrokenPortfolio'
// useBodyScrollLock 제거 - ScrollSmoother와 충돌 가능성
// import { useBodyScrollLock } from '@/composables/useBodyScrollLock'
import worksData from '@/data/works.json'
// 모든 모달 컴포넌트를 명시적으로 import (Vite 빌드 시 정적 분석을 위해)
import WorkModalShadow from './WorkModalShadow.vue'
import WorkModalMasterForge from './WorkModalMasterForge.vue'
import WorkModalKeebbear from './WorkModalKeebbear.vue'
import WorkModalTape from './WorkModalTape.vue'

const { isFixed, openIssue, isMarkersReady } = useBrokenPortfolio()
// const { lock: lockBodyScroll, unlock: unlockBodyScroll } = useBodyScrollLock()

// const WORK_MODAL_ID = 'work-modal'

const props = defineProps({
  workId: {
    type: Number,
    required: true,
  },
  isVisible: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])

// workId를 provide로 전달하여 자식 컴포넌트에서 사용할 수 있도록 함
provide('workId', props.workId)

// 모달 컴포넌트 맵 (명시적 import로 Vite가 빌드 시 모든 컴포넌트를 포함하도록 함)
const modalComponents = {
  WorkModalShadow,
  WorkModalMasterForge,
  WorkModalKeebbear,
  WorkModalTape,
}

// shallowRef를 사용하여 컴포넌트를 반응형으로 만들지 않음
const workComponent = shallowRef(null)
const modalOverlayRef = ref(null)
const workModalContainerRef = ref(null)
const workModalWrapperRef = ref(null)
const workModalContentRef = ref(null)
// const modalSmoother = ref(null)

// 부모 컴포넌트에서 DOM 요소에 접근할 수 있도록 expose
defineExpose({
  $el: modalOverlayRef,
})

// workId에 해당하는 work 데이터 찾기
const workData = computed(() => {
  return worksData.find((work) => work.id === props.workId) || null
})

// modalComponent 이름에 따라 해당 컴포넌트 로드
const loadWorkComponent = () => {
  const modalComponent = workData.value?.modalComponent
  if (!modalComponent) {
    console.error(`workId ${props.workId}에 대한 modalComponent가 정의되지 않았습니다.`)
    return
  }

  const component = modalComponents[modalComponent]
  if (!component) {
    console.error(`${modalComponent} 컴포넌트를 찾을 수 없습니다.`)
    return
  }

  workComponent.value = component
}

const handleClose = () => {
  emit('close')
}

watch(
  () => props.isVisible,
  (isVisible) => {
    // ScrollSmoother 인스턴스 가져오기 시도 (약간의 지연 허용)
    const checkAndPauseSmoother = (count = 0) => {
      const mainSmoother = ScrollSmoother.get()

      if (mainSmoother) {
        if (isVisible) {
          mainSmoother.paused(true)
        } else {
          mainSmoother.paused(false)
        }
      } else if (count < 10) {
        // 아직 초기화되지 않았다면 재시도
        setTimeout(() => checkAndPauseSmoother(count + 1), 100)
      }
    }

    if (isVisible) {
      // 메인 ScrollSmoother 일시 중지 시도
      checkAndPauseSmoother()

      // 모달이 열릴 때 ScrollTrigger refresh (컨텐츠가 로드된 후)
      nextTick(() => {
        // 자식 컴포넌트의 배경색을 읽어서 스크롤바 트랙 색상에 적용
        if (workModalContentRef.value) {
          const contentElement = workModalContentRef.value.querySelector('.work-modal-content')
          if (contentElement && workModalWrapperRef.value) {
            const computedStyle = window.getComputedStyle(contentElement)
            const bgColor = computedStyle.backgroundColor
            if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
              workModalWrapperRef.value.style.setProperty('--modal-bg-color', bgColor)
            }
          }
        }

        // 약간의 지연을 두고 refresh하여 모든 컴포넌트가 마운트된 후 실행
        setTimeout(() => {
          ScrollTrigger.refresh()
        }, 100)
      })
    } else {
      // 메인 ScrollSmoother 다시 활성화 시도
      checkAndPauseSmoother()
    }
  },
  { immediate: true },
)

onMounted(() => {
  loadWorkComponent()
  // 초기 상태 설정 - 모달은 항상 숨김 상태로 시작
  if (modalOverlayRef.value) {
    gsap.set(modalOverlayRef.value, { autoAlpha: 0 })
  }
})

onUnmounted(() => {
  // unlockBodyScroll(WORK_MODAL_ID)
  // 컴포넌트가 언마운트될 때 메인 ScrollSmoother 다시 활성화
  const mainSmoother = ScrollSmoother.get()
  if (mainSmoother) {
    mainSmoother.paused(false)
  }
})
</script>

<style scoped>
@import '@/assets/styles/breakpoints.css';
@import '@/assets/styles/issue-marker.css';

.work-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  inset: 0;
  background-color: rgb(var(--white--1));
  z-index: 9999;
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  touch-action: none;
}

.work-modal-overlay.is-visible {
  opacity: 1;
  visibility: visible;
}

.work-modal-container {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  /* overflow 관련 속성 제거 - ScrollSmoother Wrapper가 처리 */
}

.work-modal-wrapper {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth; /* CSS 스무스 스크롤 */
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  /* 커스텀 스크롤바 스타일 */
  scrollbar-width: thin;
  scrollbar-color: rgba(var(--gray--5s), 1) var(--modal-bg-color, rgb(var(--white--1)));
}

.work-modal-content-inner {
  width: 100%;
  /* min-height는 컨텐츠에 따라 결정 */
  will-change: transform; /* ScrollSmoother 성능 최적화 */
  /* 자식 컴포넌트에서 설정한 배경색 변수를 상속 */
  --modal-bg-color: rgb(var(--white--1)); /* 기본값 */
}

/* Custom Scrollbar Styles - Wrapper에 적용 */
.work-modal-wrapper::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.work-modal-wrapper::-webkit-scrollbar-track {
  background: var(--modal-bg-color, rgb(var(--white--1)));
  border-radius: 4px;
}

.work-modal-wrapper::-webkit-scrollbar-thumb {
  background: rgba(var(--gray--5), 0.5);
  border-radius: 4px;
  transition: background 0.2s ease;
}

.work-modal-wrapper::-webkit-scrollbar-thumb:hover {
  background: rgba(var(--gray--5), 0.7);
}

.work-modal-wrapper::-webkit-scrollbar-corner {
  background: transparent;
}

.work-modal-close {
  position: fixed;
  top: 40px;
  right: 40px;
  z-index: 10000;
  background: none;
  border: none;
  padding: 9px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(var(--white--1));
  transition: all 0.2s ease;
  border-radius: 6px;
  min-width: 44px;
  min-height: 44px;
  width: auto;
  height: auto;
  flex-shrink: 0;
  mix-blend-mode: difference;
}

.work-modal-close:hover {
  opacity: 0.8;
}

.work-modal-close svg {
  width: 24px;
  height: 24px;
  display: block;
}

/* Tablet: --tablet */
@media (--tablet) {
  .work-modal-close {
    top: 30px;
    right: 30px;
  }
}

/* Mobile: --mobile */
@media (--mobile) {
  .work-modal-close {
    top: 20px;
    right: 20px;
  }
}
</style>
