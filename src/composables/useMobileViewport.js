import { ref } from 'vue'
import { watchThrottled } from '@vueuse/core'

/**
 * 모바일 기기에서 실제 뷰포트 높이를 관리하는 composable
 * 주소 표시줄 표시/숨김에 따른 높이 변화를 처리
 *
 * @param {Object} options - 옵션
 * @param {Ref} options.elementRef - 높이를 적용할 엘리먼트 ref
 * @param {Ref} options.isMobile - 모바일 여부 ref
 * @param {number} options.offset - 뷰포트 높이에서 뺄 오프셋 (기본값: 40)
 * @param {number} options.throttleDelay - 스크롤 이벤트 throttle 지연 시간 (기본값: 150ms)
 * @param {number} options.initialDelay - 초기 설정 지연 시간 (기본값: 100ms)
 */
export function useMobileViewport(options = {}) {
  const { elementRef, isMobile, offset = 40, throttleDelay = 150, initialDelay = 100 } = options

  const viewportHeight = ref(0)
  let stopScrollWatch = null
  let cleanupFunctions = []

  /**
   * 모바일에서 실제 뷰포트 높이를 계산하여 설정
   */
  const updateViewportHeight = () => {
    if (!elementRef?.value) return

    if (isMobile?.value) {
      // 모바일에서는 실제 보이는 뷰포트 높이 사용
      const actualHeight = window.innerHeight
      viewportHeight.value = actualHeight - offset
      elementRef.value.style.height = `${viewportHeight.value}px`
    } else {
      // 데스크톱/태블릿에서는 CSS 기본값 사용
      elementRef.value.style.height = ''
      viewportHeight.value = 0
    }
  }

  /**
   * 리사이즈 이벤트 핸들러
   */
  const handleResize = () => {
    updateViewportHeight()
  }

  /**
   * 이벤트 리스너 및 감시자 설정
   */
  const setupListeners = () => {
    // 초기 설정
    updateViewportHeight()

    // 초기 설정 후 약간의 지연을 두고 다시 설정 (주소 표시줄이 숨겨진 후)
    setTimeout(() => {
      updateViewportHeight()
    }, initialDelay)

    // 리사이즈 및 오리엔테이션 변경 이벤트
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    cleanupFunctions.push(() => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    })

    // 모바일에서만 스크롤 이벤트 감시
    if (isMobile?.value) {
      const scrollY = ref(window.scrollY)

      const updateScrollY = () => {
        scrollY.value = window.scrollY
      }

      window.addEventListener('scroll', updateScrollY, { passive: true })

      cleanupFunctions.push(() => {
        window.removeEventListener('scroll', updateScrollY)
      })

      // 스크롤 값 변경 시 throttled로 뷰포트 높이 업데이트
      stopScrollWatch = watchThrottled(
        scrollY,
        () => {
          updateViewportHeight()
        },
        { throttle: throttleDelay },
      )

      cleanupFunctions.push(() => {
        if (stopScrollWatch) stopScrollWatch()
      })
    }
  }

  /**
   * 모든 이벤트 리스너 및 감시자 정리
   */
  const cleanup = () => {
    cleanupFunctions.forEach((fn) => fn())
    cleanupFunctions = []
    stopScrollWatch = null
  }

  return {
    viewportHeight,
    updateViewportHeight,
    setupListeners,
    cleanup,
  }
}
