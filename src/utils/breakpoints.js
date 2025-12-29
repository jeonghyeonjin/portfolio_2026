/**
 * CSS 변수에서 브레이크포인트 값을 읽어 숫자로 반환하는 유틸리티 함수
 */

/**
 * CSS 변수 값을 읽어서 숫자(px)로 반환
 * @param {string} variableName - CSS 변수 이름 (예: '--breakpoint-tablet')
 * @returns {number} 픽셀 값 (숫자)
 */
export const getBreakpointValue = (variableName) => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(variableName)
  // "1439px" 같은 문자열에서 숫자만 추출
  return parseInt(value.trim(), 10)
}

/**
 * 태블릿 브레이크포인트 값 반환
 * @returns {number} 태블릿 브레이크포인트 (px)
 */
export const getTabletBreakpoint = () => {
  return getBreakpointValue('--breakpoint-tablet')
}

/**
 * 모바일 브레이크포인트 값 반환
 * @returns {number} 모바일 브레이크포인트 (px)
 */
export const getMobileBreakpoint = () => {
  return getBreakpointValue('--breakpoint-mobile')
}
