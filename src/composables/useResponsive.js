import { useMediaQuery } from '@vueuse/core'
import { computed } from 'vue'
import { getMobileBreakpoint, getTabletBreakpoint } from '@/utils/breakpoints'

/**
 * 반응형 미디어 쿼리를 위한 공통 composable
 * VueUse의 useMediaQuery를 활용하여 성능 최적화
 */
export function useResponsive() {
  const mobileBreakpoint = getMobileBreakpoint()
  const tabletBreakpoint = getTabletBreakpoint()

  // VueUse의 useMediaQuery를 사용하여 자동으로 반응형 업데이트
  const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint}px)`)
  const isTablet = useMediaQuery(`(max-width: ${tabletBreakpoint}px)`)
  const isDesktop = computed(() => !isTablet.value)
  const isMobileOrTablet = computed(() => isTablet.value)

  return {
    isMobile,
    isTablet,
    isDesktop,
    isMobileOrTablet,
  }
}
