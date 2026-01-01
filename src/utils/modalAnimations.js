import { gsap } from 'gsap'

const BASE_WIDTH = 100

/**
 * 스케일 값 계산 - 화면 크기에 따른 원형 확대 배율
 */
export const calculateScaleValue = () => {
  let windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  if (windowHeight > windowWidth) {
    windowWidth = windowHeight
  }
  const toScale = windowWidth / BASE_WIDTH
  return Math.ceil(toScale)
}

/**
 * 원형 애니메이션의 시작 위치 결정
 * @param {Event} event - 클릭 이벤트 (옵션)
 * @returns {Object} { x, y } 좌표
 */
export const getCircleStartPosition = (event = null) => {
  if (event) {
    // 클릭 이벤트가 있으면 커서 위치 사용
    return {
      x: event.clientX,
      y: event.clientY,
    }
  }

  // 이벤트가 없으면 검색창 위치 또는 화면 중앙 사용
  const searchContainer = document.querySelector('.search-container')
  if (searchContainer) {
    const rect = searchContainer.getBoundingClientRect()
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }
  }

  // 검색창이 없으면 화면 중앙 사용
  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  }
}

/**
 * 원형 요소 초기 설정
 * @param {Ref} circleRef - 원형 요소 ref
 * @param {Object} position - { x, y } 시작 위치
 */
export const initializeCircleElement = (circleRef, position) => {
  if (!circleRef) return

  gsap.set(circleRef, {
    x: position.x,
    y: position.y,
    width: BASE_WIDTH,
    height: BASE_WIDTH,
    scale: 1,
    xPercent: -50,
    yPercent: -50,
    borderRadius: '50%',
    backgroundColor: 'rgb(var(--white--1))',
    autoAlpha: 1,
    zIndex: 9998,
  })
}

/**
 * 원형 확대 애니메이션 생성
 * @param {Ref} circleRef - 원형 요소 ref
 * @param {Ref} modalRef - 모달 요소 ref
 * @param {Object} options - 옵션
 * @param {Function} options.onComplete - 애니메이션 완료 콜백
 * @param {boolean} options.isOptimized - 최적화 플래그
 * @returns {gsap.core.Timeline} GSAP 타임라인
 */
export const createCircleRevealAnimation = (circleRef, modalRef, options = {}) => {
  const { onComplete, isOptimized = false } = options
  const IS_VISIBLE_CLASS = 'is-visible'

  const tl = gsap.timeline({
    onComplete: () => {
      if (modalRef) {
        modalRef.classList.add(IS_VISIBLE_CLASS)
      }

      // 원형 애니메이션 완료 후 원형 요소 숨기기
      if (circleRef) {
        gsap.set(circleRef, { autoAlpha: 0, zIndex: -1, scale: 1 })
      }

      if (onComplete) onComplete()
    },
  })

  const targetScale = calculateScaleValue()

  tl.to(circleRef, {
    scale: targetScale,
    duration: 0.5,
    ease: 'power2.inOut',
    ...(isOptimized && { force3D: true }),
  })
    .to(
      modalRef,
      {
        autoAlpha: 1,
        duration: 0.5,
        ease: 'power2.out',
      },
      '-=0.2',
    )
    .call(() => {
      // 모달이 나타난 후 원형 요소를 확실히 숨기기
      if (circleRef) {
        gsap.set(circleRef, { autoAlpha: 0, zIndex: -1, scale: 1 })
      }
    })

  return tl
}

/**
 * 원형 축소 애니메이션 생성 (모달 닫기)
 * @param {Ref} circleRef - 원형 요소 ref
 * @param {Ref} modalRef - 모달 요소 ref
 * @param {number} currentScale - 현재 스케일 값
 * @param {Object} options - 옵션
 * @param {Function} options.onComplete - 애니메이션 완료 콜백
 * @returns {gsap.core.Timeline} GSAP 타임라인
 */
export const createCircleCloseAnimation = (circleRef, modalRef, currentScale, options = {}) => {
  const { onComplete } = options
  const IS_VISIBLE_CLASS = 'is-visible'

  if (!circleRef || !modalRef) {
    // 애니메이션 없이 즉시 완료
    if (onComplete) onComplete()
    return null
  }

  // 원형을 다시 보이게 하고 확장된 상태로 설정
  const scaleToUse = currentScale || calculateScaleValue()
  gsap.set(circleRef, {
    autoAlpha: 1,
    zIndex: 9998,
    scale: scaleToUse,
  })

  const tl = gsap.timeline({
    onComplete: () => {
      if (modalRef) {
        modalRef.classList.remove(IS_VISIBLE_CLASS)
      }
      // 원형 요소 완전히 숨기기
      gsap.set(circleRef, { autoAlpha: 0, scale: 1, zIndex: 9998 })

      if (onComplete) onComplete()
    },
  })

  // 역순 애니메이션: 모달 숨기기 → 원형 축소
  tl.to(modalRef, {
    autoAlpha: 0,
    duration: 0.2,
    ease: 'power2.in',
  }).to(
    circleRef,
    {
      scale: 1,
      duration: 0.6,
      ease: 'power2.inOut',
    },
    '-=0.1',
  )

  return tl
}
