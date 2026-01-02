import { ref } from 'vue'

// 전역 상태로 모달 스택 관리
const modalStack = ref([])

/**
 * 스크롤바 너비 계산
 */
const getScrollbarWidth = () => {
  const outer = document.createElement('div')
  outer.style.visibility = 'hidden'
  outer.style.overflow = 'scroll'
  outer.style.msOverflowStyle = 'scrollbar'
  document.body.appendChild(outer)

  const inner = document.createElement('div')
  outer.appendChild(inner)

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth

  outer.parentNode?.removeChild(outer)

  return scrollbarWidth
}

/**
 * body 스크롤 잠금
 */
const lockBodyScroll = () => {
  const scrollbarWidth = getScrollbarWidth()

  // position: fixed 대신 overflow: hidden만 사용하여 ScrollTrigger에 영향을 주지 않음
  document.body.style.overflow = 'hidden'

  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`
    // CSS 변수로 스크롤바 너비 저장
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`)
  }
  document.documentElement.style.overflow = 'hidden'
}

/**
 * body 스크롤 해제
 */
const unlockBodyScroll = () => {
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
  document.documentElement.style.removeProperty('--scrollbar-width')
  document.documentElement.style.overflow = ''
}

/**
 * body 스크롤 잠금/해제를 관리하는 composable
 * 여러 모달이 동시에 열릴 수 있는 상황을 처리
 */
export function useBodyScrollLock() {
  /**
   * 모달 열기 (스크롤 잠금)
   * @param {string} modalId - 모달의 고유 ID
   */
  const lock = (modalId) => {
    // 이미 스택에 있으면 무시
    if (modalStack.value.includes(modalId)) {
      return
    }

    // 스택에 추가
    modalStack.value.push(modalId)

    // 첫 번째 모달인 경우에만 실제로 스크롤 잠금
    if (modalStack.value.length === 1) {
      lockBodyScroll()
    }
  }

  /**
   * 모달 닫기 (스크롤 해제)
   * @param {string} modalId - 모달의 고유 ID
   */
  const unlock = (modalId) => {
    // 스택에서 제거
    const index = modalStack.value.indexOf(modalId)
    if (index > -1) {
      modalStack.value.splice(index, 1)
    }

    // 모든 모달이 닫힌 경우에만 실제로 스크롤 해제
    if (modalStack.value.length === 0) {
      unlockBodyScroll()
    }
  }

  /**
   * 현재 모달 스택 상태
   */
  const isLocked = () => modalStack.value.length > 0

  return {
    lock,
    unlock,
    isLocked,
  }
}
