<script setup>
import { ref, reactive, computed, nextTick } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  placement: {
    type: String,
    default: 'top', // 'top', 'bottom', 'left', 'right'
    validator: (value) => ['top', 'bottom', 'left', 'right'].includes(value),
  },
  backgroundColor: {
    type: String,
    default: 'rgb(var(--gray--1))',
  },
})

const isVisible = ref(false)
const isReady = ref(false) // 위치 계산 완료 여부
const triggerRef = ref(null)
const positionerRef = ref(null) // 래퍼 요소 ref

// 래퍼(위치 담당) 스타일 - transition 없음
const positionerStyles = reactive({
  top: '0px',
  left: '0px',
  transform: '',
})

// 실제 컨텐츠 스타일 (Transform Origin 등)
const contentStyles = reactive({
  transformOrigin: 'center bottom',
})

// 화살표 스타일
const arrowStyles = reactive({
  left: '',
  top: '',
  transform: '',
  width: '12px',
  height: '12px',
  borderRadius: '3px',
})

// 배경색은 computed로 처리
const arrowBackgroundColor = computed(() => props.backgroundColor)
const contentBackgroundColor = computed(() => props.backgroundColor)

const updatePosition = async () => {
  if (!triggerRef.value) return

  // DOM 렌더링 대기
  await nextTick()
  if (!positionerRef.value) return

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const popupRect = positionerRef.value.getBoundingClientRect()
  const viewportWidth = document.documentElement.clientWidth
  const viewportHeight = window.innerHeight
  const padding = 16

  // 기본 배치 방향 결정 및 Flipping 로직
  let currentPlacement = props.placement

  const fitsTop = triggerRect.top - popupRect.height - 8 >= padding
  const fitsBottom = triggerRect.bottom + popupRect.height + 8 <= viewportHeight - padding
  const fitsLeft = triggerRect.left - popupRect.width - 8 >= padding
  const fitsRight = triggerRect.right + popupRect.width + 8 <= viewportWidth - padding

  if (currentPlacement === 'top' && !fitsTop && fitsBottom) currentPlacement = 'bottom'
  else if (currentPlacement === 'bottom' && !fitsBottom && fitsTop) currentPlacement = 'top'
  else if (currentPlacement === 'left' && !fitsLeft && fitsRight) currentPlacement = 'right'
  else if (currentPlacement === 'right' && !fitsRight && fitsLeft) currentPlacement = 'left'

  let top = 0
  let left = 0
  let transform = ''
  let arrowTop = ''
  let arrowLeft = ''
  let arrowTransform = 'rotate(45deg)'

  switch (currentPlacement) {
    case 'top':
      top = triggerRect.top - 8
      left = triggerRect.left + triggerRect.width / 2
      transform = 'translate(-50%, -100%)'
      arrowTop = 'calc(100% - 6px)'
      break
    case 'bottom':
      top = triggerRect.bottom + 8
      left = triggerRect.left + triggerRect.width / 2
      transform = 'translate(-50%, 0)'
      arrowTop = '-6px'
      break
    case 'left':
      top = triggerRect.top + triggerRect.height / 2
      left = triggerRect.left - 8
      transform = 'translate(-100%, -50%)'
      arrowLeft = 'calc(100% - 6px)'
      break
    case 'right':
      top = triggerRect.top + triggerRect.height / 2
      left = triggerRect.right + 8
      transform = 'translate(0, -50%)'
      arrowLeft = '-6px'
      break
  }

  // 화면 경계 보정
  if (currentPlacement === 'top' || currentPlacement === 'bottom') {
    const halfWidth = popupRect.width / 2
    if (left - halfWidth < padding) left = halfWidth + padding
    else if (left + halfWidth > viewportWidth - padding) left = viewportWidth - padding - halfWidth
  } else {
    const halfHeight = popupRect.height / 2
    if (top - halfHeight < padding) top = halfHeight + padding
    else if (top + halfHeight > viewportHeight - padding)
      top = viewportHeight - padding - halfHeight
  }

  // 화살표 위치 보정 및 Transform Origin 설정
  if (currentPlacement === 'top' || currentPlacement === 'bottom') {
    const popupLeftEdge = left - popupRect.width / 2
    const arrowX = triggerRect.left + triggerRect.width / 2 - popupLeftEdge
    arrowLeft = `${Math.round(arrowX)}px`
    // top일 때는 translateY(-10%), bottom일 때는 translateY(10%)
    const translateY = currentPlacement === 'top' ? '-10%' : '10%'
    arrowTransform = `translateX(-50%) translateY(${translateY}) rotate(45deg)`

    // Transform Origin: 화살표가 있는 X축 지점
    contentStyles.transformOrigin = `${arrowLeft} ${currentPlacement === 'top' ? '100%' : '0%'}`
  } else {
    const popupTopEdge = top - popupRect.height / 2
    const arrowY = triggerRect.top + triggerRect.height / 2 - popupTopEdge
    arrowTop = `${Math.round(arrowY)}px`
    // right일 때는 translateX(10%), left일 때는 translateX(-10%)
    const translateX = currentPlacement === 'right' ? '10%' : '-10%'
    arrowTransform = `translateY(-50%) translateX(${translateX}) rotate(45deg)`

    // Transform Origin: 화살표가 있는 Y축 지점
    contentStyles.transformOrigin = `${currentPlacement === 'left' ? '100%' : '0%'} ${arrowTop}`
  }

  positionerStyles.top = `${Math.round(top)}px`
  positionerStyles.left = `${Math.round(left)}px`
  positionerStyles.transform = transform

  arrowStyles.top = arrowTop
  arrowStyles.left = arrowLeft
  arrowStyles.transform = arrowTransform

  // 위치 계산 완료 후 실제 컨텐츠 표시
  isReady.value = true
}

const showTooltip = () => {
  isVisible.value = true
  // 이미 준비된 상태라면 깜빡임을 방지하기 위해 isReady를 초기화하지 않음
  if (!isReady.value) {
    isReady.value = false // 초기화
  }
  updatePosition()
}

const hideTooltip = () => {
  isVisible.value = false
  isReady.value = false
}

// 깜빡임 없이 내용을 업데이트하거나 툴팁을 다시 표시하기 위한 메서드
// showTooltip과 달리 isReady를 false로 초기화하지 않음
const ensureShown = () => {
  isVisible.value = true
  updatePosition()
}

// 외부에서 호출할 수 있도록 expose
defineExpose({
  show: showTooltip,
  hide: hideTooltip,
  ensureShown,
  updatePosition,
  isVisible: () => isVisible.value,
})
</script>

<template>
  <div
    class="tooltip-wrapper"
    ref="triggerRef"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
    @focusin="showTooltip"
    @focusout="hideTooltip"
  >
    <slot></slot>
  </div>

  <Teleport to="body">
    <!-- 위치를 잡는 Wrapper (Transition 없음, 항상 fixed) -->
    <div
      v-if="isVisible"
      ref="positionerRef"
      class="tooltip-positioner"
      :style="positionerStyles"
      role="tooltip"
    >
      <!-- 크기 측정용 Dummy (사용자에게 안 보임) -->
      <div class="tooltip-content dummy">
        {{ text }}
      </div>

      <!-- 실제 보여지는 Content (애니메이션 적용) -->
      <Transition name="tooltip-bounce">
        <div
          v-if="isReady"
          class="tooltip-content real"
          :style="{ ...contentStyles, backgroundColor: contentBackgroundColor }"
        >
          {{ text }}
          <div
            class="tooltip-arrow"
            :style="{ ...arrowStyles, backgroundColor: arrowBackgroundColor }"
          ></div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<style scoped>
.tooltip-wrapper {
  position: relative;
  display: inline-flex;
}

.tooltip-positioner {
  position: fixed;
  z-index: 9999;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* 공통 스타일 */
.tooltip-content {
  /* Typography */
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: var(--label--1);
  font-weight: var(--font-weight--medium);
  line-height: 1.2;
  white-space: nowrap;

  /* Colors */
  background-color: rgb(var(--gray--1));
  color: rgb(var(--white--2));

  /* Box model */
  padding: 8px 12px;
  border-radius: 4px;
  max-width: 240px;

  /* 텍스트 말줄임 */
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;

  /* Shadow */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Dummy: 공간만 차지하고 보이지 않음 */
.tooltip-content.dummy {
  visibility: hidden;
  opacity: 0;
}

/* Real: 실제 보여지는 요소. absolute로 dummy 위에 겹치게 함 */
.tooltip-content.real {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

/* Arrow */
.tooltip-arrow {
  position: absolute;
  /* 스타일은 인라인으로 제어 */
}

/* Bounce Animation */
.tooltip-bounce-enter-active {
  /* 약간의 탄성 효과 (overshoot) */
  transition:
    opacity 0.3s cubic-bezier(0.2, 0.8, 0.4, 1),
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tooltip-bounce-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.tooltip-bounce-enter-from {
  opacity: 0;
  transform: scale(0.6); /* 작게 시작해서 커짐 */
}

.tooltip-bounce-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
