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
      <component :is="workComponent" v-if="workComponent" />
    </div>
  </div>
</template>

<script setup>
import { shallowRef, ref, onMounted, onUnmounted, provide, computed, watch } from 'vue'
import { gsap } from 'gsap'
import IssueMarker from '@/components/broken/IssueMarker.vue'
import { useBrokenPortfolio } from '@/composables/useBrokenPortfolio'
import { useBodyScrollLock } from '@/composables/useBodyScrollLock'
import worksData from '@/data/works.json'
// 모든 모달 컴포넌트를 명시적으로 import (Vite 빌드 시 정적 분석을 위해)
import WorkModalShadow from './WorkModalShadow.vue'
import WorkModalMasterForge from './WorkModalMasterForge.vue'
import WorkModalKeebbear from './WorkModalKeebbear.vue'
import WorkModalTape from './WorkModalTape.vue'

const { isFixed, openIssue, isMarkersReady } = useBrokenPortfolio()
const { lock: lockBodyScroll, unlock: unlockBodyScroll } = useBodyScrollLock()

const WORK_MODAL_ID = 'work-modal'

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
    if (isVisible) {
      lockBodyScroll(WORK_MODAL_ID)
    } else {
      unlockBodyScroll(WORK_MODAL_ID)
    }
  },
)

onMounted(() => {
  loadWorkComponent()
  // 초기 상태 설정 - 모달은 항상 숨김 상태로 시작
  if (modalOverlayRef.value) {
    gsap.set(modalOverlayRef.value, { autoAlpha: 0 })
  }
})

onUnmounted(() => {
  unlockBodyScroll(WORK_MODAL_ID)
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
  overflow-y: auto;
  overflow-x: hidden;
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
