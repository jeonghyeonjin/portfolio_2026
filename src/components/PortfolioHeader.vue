<template>
  <div class="portfolio-header" ref="portfolioHeaderRef">
    <AvailableBadge ref="availableBadgeRef" />
    <RoleTitle ref="roleTitleRef" />
    <NameTitle ref="nameTitleRef" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AvailableBadge from './AvailableBadge.vue'
import RoleTitle from './RoleTitle.vue'
import NameTitle from './NameTitle.vue'
import { getMobileBreakpoint } from '@/utils/breakpoints'

gsap.registerPlugin(ScrollTrigger)

// 상수
const ANIMATION_DURATION_SHORT = 0.15
const ANIMATION_DURATION_MEDIUM = 0.3
const ANIMATION_DURATION_LONG = 0.6
const ANIMATION_DELAY = 0.15
const EASE_OUT = 'power2.out'
const EASE_IN = 'power2.in'
const BLUR_AMOUNT_LARGE = '40px'
const BLUR_AMOUNT_MEDIUM = '30px'
const TRANSFORM_Y_UP_LARGE = '-10%'
const TRANSFORM_Y_UP_SMALL = '-5%'
const ORIGINAL_FIRST_LINE_TEXT = 'Jeong'
const ORIGINAL_SECOND_LINE_TEXT = 'Hyeon-jin'
const SCROLL_TRIGGER_START = 'top 95%'
const SCROLL_TRIGGER_END = 'top center'
const SCROLL_TRIGGER_SCRUB = 1
const MOBILE_SCROLL_START_HEADER = 'bottom 90%'
const MOBILE_SCROLL_START_BADGE = 'bottom 80%'
const MOBILE_DISTANCE_MULTIPLIER = 1

// Refs
const portfolioHeaderRef = ref(null)
const availableBadgeRef = ref(null)
const roleTitleRef = ref(null)
const nameTitleRef = ref(null)

// 애니메이션 인스턴스
let badgeAnimation = null
let roleAnimation = null
let nameAnimation = null
let headerAnimation = null
let nameTextTimeline = null
let nameTextRestoreAnimation = null
let heroCheckHandler = null
let heroCheckTimeout = null
let isRestoring = false
let mobileHeaderAnimation = null
let mobileBadgeAnimation = null
let mobileRoleAnimation = null

// ScrollTrigger 인스턴스
let skillsScrollTrigger = null
let worksScrollTrigger = null
let resizeHandler = null
let resizeTimeout = null

// 유틸리티 함수
const isMobile = () => {
  const mobileBreakpoint = getMobileBreakpoint()
  return window.innerWidth <= mobileBreakpoint
}

// 애니메이션 정리 헬퍼
const killNameTextAnimations = (firstLine, secondLine) => {
  if (nameTextTimeline) {
    nameTextTimeline.kill()
    nameTextTimeline = null
  }
  if (nameTextRestoreAnimation) {
    nameTextRestoreAnimation.kill()
    nameTextRestoreAnimation = null
  }
  if (firstLine) gsap.killTweensOf(firstLine)
  if (secondLine) gsap.killTweensOf(secondLine)
}

// NameTitle 텍스트를 변경하는 함수
const changeNameText = (newText) => {
  if (!nameTitleRef.value?.firstLineRef || !nameTitleRef.value?.secondLineRef) return

  const firstLine = nameTitleRef.value.firstLineRef
  const secondLine = nameTitleRef.value.secondLineRef

  // 진행 중인 모든 애니메이션 중단
  killNameTextAnimations(firstLine, secondLine)

  // 첫 번째 줄과 두 번째 줄을 동시에 숨기기
  nameTextTimeline = gsap.timeline({
    onComplete: () => {
      // 두 줄이 모두 숨겨진 후 내용 변경
      if (firstLine && secondLine) {
        // 첫 번째 줄에 새 텍스트 설정, 두 번째 줄 숨기기
        firstLine.textContent = newText
        secondLine.style.display = 'none'

        // 초기 상태 설정 (blur와 transform)
        gsap.set(firstLine, {
          opacity: 0,
          filter: `blur(${BLUR_AMOUNT_LARGE})`,
          y: TRANSFORM_Y_UP_LARGE,
        })

        // 첫 번째 줄 페이드인 + blur + transform 애니메이션
        gsap.to(firstLine, {
          opacity: 1,
          filter: 'blur(0px)',
          y: '0%',
          duration: ANIMATION_DURATION_SHORT,
        })
      }
      nameTextTimeline = null
    },
  })

  // 첫 번째 줄과 두 번째 줄 동시에 숨기기
  nameTextTimeline.to(
    firstLine,
    {
      opacity: 0,
      duration: ANIMATION_DURATION_SHORT,
    },
    0,
  )
  nameTextTimeline.to(
    secondLine,
    {
      opacity: 0,
      duration: ANIMATION_DURATION_SHORT,
    },
    0,
  )
}

// NameTitle 원래 상태로 복원하는 함수
const restoreNameText = () => {
  if (!nameTitleRef.value?.firstLineRef || !nameTitleRef.value?.secondLineRef) return

  const firstLine = nameTitleRef.value.firstLineRef
  const secondLine = nameTitleRef.value.secondLineRef

  // 진행 중인 모든 애니메이션 중단
  killNameTextAnimations(firstLine, secondLine)

  // 첫 번째 줄을 숨기고 원래 내용으로 복원
  nameTextRestoreAnimation = gsap.to(firstLine, {
    opacity: 0,
    duration: ANIMATION_DURATION_SHORT,
    ease: EASE_IN,
    onComplete: () => {
      if (firstLine && secondLine) {
        // 원래 텍스트로 복원
        firstLine.textContent = ORIGINAL_FIRST_LINE_TEXT
        secondLine.textContent = ORIGINAL_SECOND_LINE_TEXT
        secondLine.style.display = 'block'

        // 초기 상태 설정 (blur와 transform)
        gsap.set([firstLine, secondLine], {
          opacity: 0,
          filter: `blur(${BLUR_AMOUNT_MEDIUM})`,
          y: TRANSFORM_Y_UP_SMALL,
        })

        // 첫 번째 줄과 두 번째 줄을 동시에 페이드인
        nameTextTimeline = gsap.timeline({
          onComplete: () => {
            nameTextTimeline = null
            nameTextRestoreAnimation = null
          },
        })

        nameTextTimeline.to(
          firstLine,
          {
            opacity: 1,
            filter: 'blur(0px)',
            y: '0%',
            duration: ANIMATION_DURATION_SHORT,
            ease: EASE_OUT,
          },
          0,
        )
        nameTextTimeline.to(
          secondLine,
          {
            opacity: 1,
            filter: 'blur(0px)',
            y: '0%',
            duration: ANIMATION_DURATION_SHORT,
            ease: EASE_OUT,
          },
          0,
        )
      }
    },
  })
}

// 애니메이션 정리 헬퍼
const killAllAnimations = () => {
  if (badgeAnimation) badgeAnimation.kill()
  if (roleAnimation) roleAnimation.kill()
  if (nameAnimation) nameAnimation.kill()
  if (headerAnimation) headerAnimation.kill()
}

// 모바일 헤더 복원 애니메이션
const restoreMobileHeader = () => {
  if (!portfolioHeaderRef.value) return

  const currentOpacity = gsap.getProperty(portfolioHeaderRef.value, 'opacity')
  if (currentOpacity >= 1) {
    isRestoring = false
    return
  }

  // 헤더 컨테이너는 opacity만 적용 (blur/transform 없음)
  headerAnimation = gsap.to(portfolioHeaderRef.value, {
    opacity: 1,
    duration: ANIMATION_DURATION_MEDIUM,
    ease: EASE_OUT,
  })

  // AvailableBadge와 RoleTitle은 opacity만 복원 (blur/transform 없음)
  if (availableBadgeRef.value?.$el) {
    availableBadgeRef.value.$el.style.display = 'inline-flex'
    badgeAnimation = gsap.to(availableBadgeRef.value.$el, {
      opacity: 1,
      duration: ANIMATION_DURATION_MEDIUM,
      ease: EASE_OUT,
    })
  }

  if (roleTitleRef.value?.$el) {
    roleAnimation = gsap.to(roleTitleRef.value.$el, {
      opacity: 1,
      duration: ANIMATION_DURATION_MEDIUM,
      ease: EASE_OUT,
    })
  }
}

// 모바일 NameTitle 텍스트 복원
const restoreMobileNameText = () => {
  if (!nameTitleRef.value?.firstLineRef || !nameTitleRef.value?.secondLineRef) {
    restoreNameText()
    isRestoring = false
    return
  }

  const firstLine = nameTitleRef.value.firstLineRef
  const secondLine = nameTitleRef.value.secondLineRef

  killNameTextAnimations(firstLine, secondLine)

  // 이미 원래 텍스트인지 확인
  const isAlreadyRestored =
    firstLine.textContent === ORIGINAL_FIRST_LINE_TEXT &&
    secondLine.textContent === ORIGINAL_SECOND_LINE_TEXT

  // 텍스트가 변경되어야 하는 경우만 변경
  if (!isAlreadyRestored) {
    firstLine.textContent = ORIGINAL_FIRST_LINE_TEXT
    secondLine.textContent = ORIGINAL_SECOND_LINE_TEXT
    secondLine.style.display = 'block'
  }

  // blur와 transform 효과는 항상 적용
  gsap.set([firstLine, secondLine], {
    opacity: 0,
    filter: `blur(${BLUR_AMOUNT_LARGE})`,
    y: TRANSFORM_Y_UP_LARGE,
  })

  // 첫 번째 줄과 두 번째 줄을 동시에 페이드인
  nameTextTimeline = gsap.timeline({
    onComplete: () => {
      nameTextTimeline = null
      isRestoring = false
    },
  })

  nameTextTimeline.to(
    firstLine,
    {
      opacity: 1,
      filter: 'blur(0px)',
      y: '0%',
      duration: ANIMATION_DURATION_MEDIUM,
      ease: EASE_OUT,
    },
    0,
  )
  nameTextTimeline.to(
    secondLine,
    {
      opacity: 1,
      filter: 'blur(0px)',
      y: '0%',
      duration: ANIMATION_DURATION_MEDIUM,
      ease: EASE_OUT,
    },
    0,
  )
}

// 데스크톱/태블릿 헤더 복원 애니메이션
const restoreDesktopHeader = () => {
  // AvailableBadge 복원 (딜레이 추가)
  if (availableBadgeRef.value?.$el) {
    availableBadgeRef.value.$el.style.display = 'inline-flex'
    badgeAnimation = gsap.to(availableBadgeRef.value.$el, {
      opacity: 1,
      duration: ANIMATION_DURATION_LONG,
      delay: ANIMATION_DELAY,
      ease: EASE_OUT,
    })
  }

  // RoleTitle 복원 (딜레이 추가)
  if (roleTitleRef.value?.$el) {
    roleAnimation = gsap.to(roleTitleRef.value.$el, {
      opacity: 1,
      duration: ANIMATION_DURATION_LONG,
      delay: ANIMATION_DELAY,
      ease: EASE_OUT,
    })
  }

  // NameTitle은 딜레이 없이 바로 복원
  if (nameTitleRef.value?.$el) {
    nameAnimation = gsap.to(nameTitleRef.value.$el, {
      opacity: 1,
      duration: ANIMATION_DURATION_SHORT,
      ease: EASE_OUT,
    })
  }

  // NameTitle 텍스트 복원
  restoreNameText()
}

// 모바일 헤더 애니메이션 정리
const killMobileAnimations = () => {
  if (mobileHeaderAnimation) {
    mobileHeaderAnimation.kill()
    mobileHeaderAnimation = null
  }
  if (mobileBadgeAnimation) {
    mobileBadgeAnimation.kill()
    mobileBadgeAnimation = null
  }
  if (mobileRoleAnimation) {
    mobileRoleAnimation.kill()
    mobileRoleAnimation = null
  }
  if (portfolioHeaderRef.value) {
    gsap.killTweensOf(portfolioHeaderRef.value)
  }
  if (availableBadgeRef.value?.$el) {
    gsap.killTweensOf(availableBadgeRef.value.$el)
  }
  if (roleTitleRef.value?.$el) {
    gsap.killTweensOf(roleTitleRef.value.$el)
  }
}

// ScrollTrigger 정리
const cleanupScrollTriggers = () => {
  if (skillsScrollTrigger) {
    skillsScrollTrigger.kill()
    skillsScrollTrigger = null
  }
  if (worksScrollTrigger) {
    worksScrollTrigger.kill()
    worksScrollTrigger = null
  }
}

// 정리 헬퍼 함수
const cleanupAnimations = () => {
  killAllAnimations()
  killMobileAnimations()
  if (nameTextTimeline) nameTextTimeline.kill()
  if (nameTextRestoreAnimation) nameTextRestoreAnimation.kill()
}

const cleanupTweens = () => {
  if (nameTitleRef.value?.firstLineRef) {
    gsap.killTweensOf(nameTitleRef.value.firstLineRef)
  }
  if (nameTitleRef.value?.secondLineRef) {
    gsap.killTweensOf(nameTitleRef.value.secondLineRef)
  }
  if (portfolioHeaderRef.value) {
    gsap.killTweensOf(portfolioHeaderRef.value)
  }
  if (availableBadgeRef.value?.$el) {
    gsap.killTweensOf(availableBadgeRef.value.$el)
  }
  if (roleTitleRef.value?.$el) {
    gsap.killTweensOf(roleTitleRef.value.$el)
  }
}

// 헤더 초기화 함수
const initializeHeader = () => {
  // 기존 애니메이션 및 ScrollTrigger 정리
  cleanupAnimations()
  cleanupTweens()
  cleanupScrollTriggers()

  const heroSection = document.querySelector('.hero-section')
  const skillsSection = document.querySelector('.skills-section')
  const worksSection = document.querySelector('.works-section')

  if (!heroSection || !skillsSection || !worksSection || !nameTitleRef.value) return

  // 원래 상태로 복원하는 함수 (Skills 섹션을 벗어날 때)
  const restoreOriginalState = () => {
    // 중복 실행 방지
    if (isRestoring) return
    isRestoring = true

    // 진행 중인 애니메이션 중단
    killAllAnimations()

    // 모바일에서만 전체 헤더 표시 (AvailableBadge와 RoleTitle은 blur/transform 없이)
    if (isMobile() && portfolioHeaderRef.value) {
      restoreMobileHeader()
      restoreMobileNameText()
      return // 모바일에서는 여기서 종료
    }

    // 데스크톱/태블릿에서는 기존 동작 유지
    restoreDesktopHeader()
    isRestoring = false
  }

  // 모바일 헤더 숨기기 애니메이션
  const hideMobileHeader = () => {
    // AvailableBadge와 RoleTitle은 opacity만 변경 (blur/transform 없음)
    if (availableBadgeRef.value?.$el) {
      badgeAnimation = gsap.to(availableBadgeRef.value.$el, {
        opacity: 0,
        duration: ANIMATION_DURATION_MEDIUM,
        ease: EASE_OUT,
      })
    }

    if (roleTitleRef.value?.$el) {
      roleAnimation = gsap.to(roleTitleRef.value.$el, {
        opacity: 0,
        duration: ANIMATION_DURATION_MEDIUM,
        ease: EASE_OUT,
      })
    }

    // 헤더 컨테이너는 opacity만 적용 (blur/transform 없음)
    headerAnimation = gsap.to(portfolioHeaderRef.value, {
      opacity: 0,
      duration: ANIMATION_DURATION_MEDIUM,
      ease: EASE_OUT,
    })
  }

  // 데스크톱/태블릿 헤더 숨기기 애니메이션
  const hideDesktopHeader = () => {
    // AvailableBadge 숨기기
    if (availableBadgeRef.value?.$el) {
      badgeAnimation = gsap.to(availableBadgeRef.value.$el, {
        opacity: 0,
        duration: 0,
        ease: EASE_OUT,
        onComplete: () => {
          if (availableBadgeRef.value?.$el) {
            availableBadgeRef.value.$el.style.display = 'none'
          }
        },
      })
    }

    // RoleTitle opacity를 0으로 변경
    if (roleTitleRef.value?.$el) {
      roleAnimation = gsap.to(roleTitleRef.value.$el, {
        opacity: 0,
        duration: ANIMATION_DURATION_SHORT,
        ease: EASE_OUT,
      })
    }

    // NameTitle은 그대로 유지 (텍스트는 changeNameText로 변경됨)
  }

  // 숨기는 함수 (Skills 섹션에 진입할 때)
  const hideState = () => {
    // 진행 중인 애니메이션 중단
    killAllAnimations()

    // 모바일에서만 전체 헤더 숨기기 (AvailableBadge와 RoleTitle은 blur/transform 없이)
    if (isMobile() && portfolioHeaderRef.value) {
      hideMobileHeader()
      return // 모바일에서는 여기서 종료
    }

    // 데스크톱/태블릿에서는 기존 동작 유지
    hideDesktopHeader()
  }

  // 모바일 헤더 초기 상태 설정
  const setMobileHeaderInitialState = () => {
    gsap.set(portfolioHeaderRef.value, {
      opacity: 1,
      filter: 'blur(0px)',
      y: '0%',
    })
    if (availableBadgeRef.value?.$el) {
      availableBadgeRef.value.$el.style.display = 'inline-flex'
      gsap.set(availableBadgeRef.value.$el, {
        opacity: 1,
        filter: 'blur(0px)',
        y: '0%',
      })
    }
    if (roleTitleRef.value?.$el) {
      gsap.set(roleTitleRef.value.$el, {
        opacity: 1,
        filter: 'blur(0px)',
        y: '0%',
      })
    }
  }

  // 모바일 헤더 ScrollTrigger 애니메이션 설정
  const setupMobileHeaderScrollAnimation = () => {
    // Skills 섹션의 top 90% 지점 계산
    const skillsTop = skillsSection.offsetTop
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
    // Skills 섹션의 top 90% 지점까지의 거리 계산
    const distance = skillsTop - heroBottom + window.innerHeight * MOBILE_DISTANCE_MULTIPLIER

    mobileHeaderAnimation = gsap.to(portfolioHeaderRef.value, {
      opacity: 0,
      filter: `blur(${BLUR_AMOUNT_LARGE})`,
      y: TRANSFORM_Y_UP_LARGE,
      ease: EASE_OUT,
      scrollTrigger: {
        trigger: heroSection,
        start: MOBILE_SCROLL_START_HEADER,
        end: `+=${distance}`,
        scrub: true,
        invalidateOnRefresh: true,
      },
    })

    if (availableBadgeRef.value?.$el) {
      mobileBadgeAnimation = gsap.to(availableBadgeRef.value.$el, {
        opacity: 0,
        filter: `blur(${BLUR_AMOUNT_LARGE})`,
        y: TRANSFORM_Y_UP_LARGE,
        ease: EASE_OUT,
        scrollTrigger: {
          trigger: heroSection,
          start: MOBILE_SCROLL_START_BADGE,
          end: `+=${distance}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
    }

    if (roleTitleRef.value?.$el) {
      mobileRoleAnimation = gsap.to(roleTitleRef.value.$el, {
        opacity: 0,
        filter: `blur(${BLUR_AMOUNT_LARGE})`,
        y: TRANSFORM_Y_UP_LARGE,
        ease: EASE_OUT,
        scrollTrigger: {
          trigger: heroSection,
          start: MOBILE_SCROLL_START_HEADER,
          end: `+=${distance}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
    }
  }

  // 모바일에서 헤더 애니메이션을 gsap.to() + scrollTrigger 방식으로 설정
  if (isMobile() && portfolioHeaderRef.value) {
    killMobileAnimations()
    setMobileHeaderInitialState()
    setupMobileHeaderScrollAnimation()
  }

  // Skills 섹션이 보이는지 확인
  const isSkillsSectionVisible = () => {
    const skillsRect = skillsSection.getBoundingClientRect()
    return skillsRect.top < window.innerHeight && skillsRect.bottom > 0
  }

  // Skills 섹션 ScrollTrigger (데스크톱/태블릿용)
  if (!isMobile()) {
    skillsScrollTrigger = ScrollTrigger.create({
      trigger: skillsSection,
      start: SCROLL_TRIGGER_START,
      end: SCROLL_TRIGGER_END,
      scrub: SCROLL_TRIGGER_SCRUB,
      onEnter: () => {
        hideState()
        changeNameText('Skills')
      },
      onLeaveBack: () => {
        restoreOriginalState()
      },
    })
  }

  // Works 섹션 ScrollTrigger (데스크톱/태블릿용)
  if (!isMobile()) {
    worksScrollTrigger = ScrollTrigger.create({
      trigger: worksSection,
      start: SCROLL_TRIGGER_START,
      end: SCROLL_TRIGGER_END,
      scrub: SCROLL_TRIGGER_SCRUB,
      onEnter: () => {
        // Works 섹션에 진입할 때도 hideState 호출 (이미 Skills에서 숨겨졌을 수 있음)
        hideState()
        changeNameText('Works')
      },
      onLeaveBack: () => {
        // Works 섹션을 벗어날 때, Skills 섹션이 아직 보이면 "Skills"로, 아니면 원래 상태로
        if (isSkillsSectionVisible()) {
          // Skills 섹션이 보이면 "Skills"로 변경
          changeNameText('Skills')
        } else {
          // Skills 섹션도 벗어났으면 복원
          restoreOriginalState()
        }
      },
    })
  }

  // ScrollTrigger refresh
  ScrollTrigger.refresh()
}

// 리사이즈 핸들러 (디바운싱 적용)
const handleResize = () => {
  if (resizeTimeout) {
    clearTimeout(resizeTimeout)
  }

  resizeTimeout = setTimeout(() => {
    // ScrollTrigger refresh 후 재초기화
    ScrollTrigger.refresh()
    initializeHeader()
  }, 150)
}

onMounted(() => {
  // 모바일에서 주소표시줄/하단 메뉴 변화로 인한 스크롤 이슈 해결
  ScrollTrigger.normalizeScroll(true)

  // 초기화
  initializeHeader()

  // 리사이즈 이벤트 리스너 등록
  resizeHandler = handleResize
  window.addEventListener('resize', resizeHandler)
})

const cleanupEventListeners = () => {
  if (heroCheckTimeout) {
    clearTimeout(heroCheckTimeout)
    heroCheckTimeout = null
  }
  if (heroCheckHandler) {
    window.removeEventListener('scroll', heroCheckHandler)
    ScrollTrigger.removeEventListener('scrollEnd', heroCheckHandler)
  }
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
    resizeHandler = null
  }
  if (resizeTimeout) {
    clearTimeout(resizeTimeout)
    resizeTimeout = null
  }
}

onUnmounted(() => {
  cleanupAnimations()
  cleanupTweens()
  cleanupEventListeners()
  cleanupScrollTriggers()
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  // normalizeScroll 정리
  ScrollTrigger.normalizeScroll(false)
})
</script>

<style scoped>
@import '@/assets/breakpoints.css';

.portfolio-header {
  position: fixed;
  left: 60px;
  bottom: 60px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

@media (--mobile) {
  .portfolio-header {
    left: 40px;
    bottom: 40px;
  }
}
</style>
