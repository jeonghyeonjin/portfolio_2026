<template>
  <div ref="modalOverlayRef" class="work-modal-overlay" @click.self="handleClose" @wheel.stop>
    <div class="work-modal-container" @wheel.stop>
      <IconButton size="large" class="work-modal-close" aria-label="닫기" @click="handleClose">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </IconButton>
      <Transition name="issue-marker">
        <div
          v-if="!isFixed('work-modal-lazy-load') && isMarkersReady"
          class="issue-marker-wrapper"
          style="position: fixed; top: 100px; right: 40px; z-index: 10001"
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
import { shallowRef, ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import IconButton from '@/components/common/IconButton.vue'
import IssueMarker from '@/components/broken/IssueMarker.vue'
import { useBrokenPortfolio } from '@/composables/useBrokenPortfolio'

const { isFixed, openIssue, isMarkersReady } = useBrokenPortfolio()

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

// shallowRef를 사용하여 컴포넌트를 반응형으로 만들지 않음
const workComponent = shallowRef(null)
const modalOverlayRef = ref(null)

// 부모 컴포넌트에서 DOM 요소에 접근할 수 있도록 expose
defineExpose({
  $el: modalOverlayRef,
})

// workId에 따라 해당 컴포넌트 동적 로드
const loadWorkComponent = async () => {
  try {
    const component = await import(`./WorkModal${props.workId}.vue`)
    workComponent.value = component.default
  } catch (error) {
    console.error(`WorkModal${props.workId}.vue를 로드할 수 없습니다:`, error)
  }
}

const handleClose = () => {
  emit('close')
}

onMounted(() => {
  loadWorkComponent()
  // 초기 상태 설정 - 모달은 항상 숨김 상태로 시작
  if (modalOverlayRef.value) {
    gsap.set(modalOverlayRef.value, { autoAlpha: 0 })
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
  width: 100vw;
  height: 100vh;
  background-color: rgb(var(--white--1));
  z-index: 9999;
  overflow-y: auto;
  overflow-x: hidden;
  opacity: 0;
  visibility: hidden;
}

.work-modal-overlay.is-visible {
  opacity: 1;
  visibility: visible;
}

.work-modal-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding: 0;
}

.work-modal-close {
  position: fixed;
  top: 40px;
  right: 40px;
  z-index: 10000;
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
