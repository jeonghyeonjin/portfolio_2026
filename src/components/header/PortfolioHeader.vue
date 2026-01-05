<template>
  <div class="portfolio-header" ref="portfolioHeaderRef">
    <AvailableBadge ref="availableBadgeRef" />
    <RoleTitle ref="roleTitleRef" />
    <NameTitle ref="nameTitleRef" />
    <Transition name="issue-marker">
      <div
        v-if="!isFixed('header-scroll-perf') && isMarkersReady"
        class="issue-marker-wrapper high-z"
        style="top: -20px; left: -20px"
        @click="openIssue('header-scroll-perf')"
      >
        <IssueMarker />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AvailableBadge from './AvailableBadge.vue'
import RoleTitle from './RoleTitle.vue'
import NameTitle from './NameTitle.vue'
import IssueMarker from '@/components/broken/IssueMarker.vue'
import { useBrokenPortfolio } from '@/composables/useBrokenPortfolio'
import { useResponsive } from '@/composables/useResponsive'

gsap.registerPlugin(ScrollTrigger)

const { isFixed, openIssue, isMarkersReady } = useBrokenPortfolio()
const { isMobile } = useResponsive()

// 상수
const ANIMATION_DURATION_SHORT = 0.15
const ANIMATION_DURATION_MEDIUM = 0.3
const ANIMATION_DURATION_LONG = 0.6
const ANIMATION_DELAY = 0.15
const EASE_OUT = 'power2.out'
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
let heroCheckHandler = null
let heroCheckTimeout = null
let isRestoring = false
let mobileHeaderAnimation = null
let mobileBadgeAnimation = null
let mobileRoleAnimation = null

// ScrollTrigger 인스턴스
let aboutScrollTrigger = null
let skillScrollTrigger = null
let workScrollTrigger = null
let experienceScrollTrigger = null
let resizeHandler = null
let resizeTimeout = null

// NameTitle 텍스트를 변경하는 함수 (NameTitle의 imperative API 사용)
const changeNameText = (newText) => {
  if (!nameTitleRef.value?.changeText) return

  // NameTitle의 changeText 메서드 사용
  nameTitleRef.value.changeText(newText, {
    hideSecondLine: true,
    blurAmount: BLUR_AMOUNT_LARGE,
    transformY: TRANSFORM_Y_UP_LARGE,
    duration: ANIMATION_DURATION_SHORT,
  })
}

// NameTitle 원래 상태로 복원하는 함수 (NameTitle의 imperative API 사용)
const restoreNameText = () => {
  if (!nameTitleRef.value?.restore) return

  // NameTitle의 restore 메서드 사용
  nameTitleRef.value.restore({
    firstName: ORIGINAL_FIRST_LINE_TEXT,
    secondName: ORIGINAL_SECOND_LINE_TEXT,
    blurAmount: BLUR_AMOUNT_MEDIUM,
    transformY: TRANSFORM_Y_UP_SMALL,
    duration: ANIMATION_DURATION_SHORT,
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
  if (!nameTitleRef.value?.restore) {
    isRestoring = false
    return
  }

  // NameTitle의 restore 메서드 사용 (모바일용 설정)
  nameTitleRef.value.restore({
    firstName: ORIGINAL_FIRST_LINE_TEXT,
    secondName: ORIGINAL_SECOND_LINE_TEXT,
    blurAmount: BLUR_AMOUNT_LARGE,
    transformY: TRANSFORM_Y_UP_LARGE,
    duration: ANIMATION_DURATION_MEDIUM,
  })

  isRestoring = false
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
  if (aboutScrollTrigger) {
    aboutScrollTrigger.kill()
    aboutScrollTrigger = null
  }
  if (skillScrollTrigger) {
    skillScrollTrigger.kill()
    skillScrollTrigger = null
  }
  if (workScrollTrigger) {
    workScrollTrigger.kill()
    workScrollTrigger = null
  }
  if (experienceScrollTrigger) {
    experienceScrollTrigger.kill()
    experienceScrollTrigger = null
  }
}

// 정리 헬퍼 함수
const cleanupAnimations = () => {
  killAllAnimations()
  killMobileAnimations()
}

const cleanupTweens = () => {
  // NameTitle은 자체적으로 애니메이션 관리
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
  const aboutSection = document.querySelector('.about-section')
  const skillSection = document.querySelector('.skill-section')
  const workSection = document.querySelector('.work-section')
  const experienceSection = document.querySelector('.experience-section')

  if (
    !heroSection ||
    !aboutSection ||
    !skillSection ||
    !workSection ||
    !experienceSection ||
    !nameTitleRef.value
  )
    return

  // 원래 상태로 복원하는 함수 (Skill 섹션을 벗어날 때)
  const restoreOriginalState = () => {
    // 중복 실행 방지
    if (isRestoring) return
    isRestoring = true

    // 진행 중인 애니메이션 중단
    killAllAnimations()

    // 모바일에서만 전체 헤더 표시 (AvailableBadge와 RoleTitle은 blur/transform 없이)
    if (isMobile.value && portfolioHeaderRef.value) {
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

  // 숨기는 함수 (Skill 섹션에 진입할 때)
  const hideState = () => {
    // 진행 중인 애니메이션 중단
    killAllAnimations()

    // 모바일에서만 전체 헤더 숨기기 (AvailableBadge와 RoleTitle은 blur/transform 없이)
    if (isMobile.value && portfolioHeaderRef.value) {
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
    // Skill 섹션의 top 90% 지점 계산
    const skillTop = skillSection.offsetTop
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
    // Skill 섹션의 top 90% 지점까지의 거리 계산
    const distance = skillTop - heroBottom + window.innerHeight * MOBILE_DISTANCE_MULTIPLIER

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
  if (isMobile.value && portfolioHeaderRef.value) {
    killMobileAnimations()
    setMobileHeaderInitialState()
    setupMobileHeaderScrollAnimation()
  }

  // 섹션 가시성 확인 함수들
  const isSkillSectionVisible = () => {
    const skillRect = skillSection.getBoundingClientRect()
    return skillRect.top < window.innerHeight && skillRect.bottom > 0
  }

  const isWorkSectionVisible = () => {
    const workRect = workSection.getBoundingClientRect()
    return workRect.top < window.innerHeight && workRect.bottom > 0
  }

  const isExperienceSectionVisible = () => {
    const experienceRect = experienceSection.getBoundingClientRect()
    return experienceRect.top < window.innerHeight && experienceRect.bottom > 0
  }

  // Skill 섹션 ScrollTrigger (데스크톱/태블릿용) - 첫 번째 섹션
  if (!isMobile.value) {
    skillScrollTrigger = ScrollTrigger.create({
      trigger: skillSection,
      start: SCROLL_TRIGGER_START,
      end: SCROLL_TRIGGER_END,
      scrub: SCROLL_TRIGGER_SCRUB,
      onEnter: () => {
        hideState()
        changeNameText('Skill')
      },
      onLeaveBack: () => {
        // Skill 섹션을 벗어날 때 (Hero로 돌아갈 때) 원래 상태로 복원
        restoreOriginalState()
      },
    })
  }

  // Work 섹션 ScrollTrigger (데스크톱/태블릿용) - 두 번째 섹션
  if (!isMobile.value) {
    workScrollTrigger = ScrollTrigger.create({
      trigger: workSection,
      start: SCROLL_TRIGGER_START,
      end: SCROLL_TRIGGER_END,
      scrub: SCROLL_TRIGGER_SCRUB,
      onEnter: () => {
        hideState()
        changeNameText('Work')
      },
      onLeaveBack: () => {
        // Work 섹션을 벗어날 때, Skill 섹션이 보이면 "Skill"로
        if (isSkillSectionVisible()) {
          changeNameText('Skill')
        } else {
          restoreOriginalState()
        }
      },
    })
  }

  // Experience 섹션 ScrollTrigger (데스크톱/태블릿용) - 세 번째 섹션
  if (!isMobile.value) {
    experienceScrollTrigger = ScrollTrigger.create({
      trigger: experienceSection,
      start: SCROLL_TRIGGER_START,
      end: SCROLL_TRIGGER_END,
      scrub: SCROLL_TRIGGER_SCRUB,
      onEnter: () => {
        hideState()
        changeNameText('EXP.')
      },
      onLeaveBack: () => {
        // Experience 섹션을 벗어날 때, 이전 섹션 확인
        if (isWorkSectionVisible()) {
          changeNameText('Work')
        } else if (isSkillSectionVisible()) {
          changeNameText('Skill')
        } else {
          restoreOriginalState()
        }
      },
    })
  }

  // About 섹션 ScrollTrigger (데스크톱/태블릿용) - 네 번째 섹션
  if (!isMobile.value) {
    aboutScrollTrigger = ScrollTrigger.create({
      trigger: aboutSection,
      start: SCROLL_TRIGGER_START,
      end: SCROLL_TRIGGER_END,
      scrub: SCROLL_TRIGGER_SCRUB,
      onEnter: () => {
        hideState()
        changeNameText('About')
      },
      onLeaveBack: () => {
        // About 섹션을 벗어날 때, 이전 섹션 확인
        if (isExperienceSectionVisible()) {
          changeNameText('EXP.')
        } else if (isWorkSectionVisible()) {
          changeNameText('Work')
        } else if (isSkillSectionVisible()) {
          changeNameText('Skill')
        } else {
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
@import '@/assets/styles/breakpoints.css';
@import '@/assets/styles/issue-marker.css';

.portfolio-header {
  position: fixed;
  left: 60px;
  bottom: 60px;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: auto;
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

@media (--mobile) {
  .portfolio-header {
    left: 40px;
    bottom: 40px;
  }
}
</style>
