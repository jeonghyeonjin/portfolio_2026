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

const portfolioHeaderRef = ref(null)
const availableBadgeRef = ref(null)
const roleTitleRef = ref(null)
const nameTitleRef = ref(null)

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

const isMobile = () => {
  const mobileBreakpoint = getMobileBreakpoint()
  return window.innerWidth <= mobileBreakpoint
}

// NameTitle 텍스트를 변경하는 함수
const changeNameText = (newText) => {
  if (!nameTitleRef.value?.firstLineRef || !nameTitleRef.value?.secondLineRef) return

  const firstLine = nameTitleRef.value.firstLineRef
  const secondLine = nameTitleRef.value.secondLineRef

  // 진행 중인 모든 애니메이션 중단
  if (nameTextTimeline) {
    nameTextTimeline.kill()
    nameTextTimeline = null
  }
  if (nameTextRestoreAnimation) {
    nameTextRestoreAnimation.kill()
    nameTextRestoreAnimation = null
  }

  // 모든 진행 중인 애니메이션 kill
  gsap.killTweensOf(firstLine)
  gsap.killTweensOf(secondLine)

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
          filter: 'blur(40px)',
          y: '-10%',
        })

        // 첫 번째 줄 페이드인 + blur + transform 애니메이션
        gsap.to(firstLine, {
          opacity: 1,
          filter: 'blur(0px)',
          y: '0%',
          duration: 0.15,
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
      duration: 0.15,
    },
    0,
  )
  nameTextTimeline.to(
    secondLine,
    {
      opacity: 0,
      duration: 0.15,
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
  if (nameTextTimeline) {
    nameTextTimeline.kill()
    nameTextTimeline = null
  }
  if (nameTextRestoreAnimation) {
    nameTextRestoreAnimation.kill()
    nameTextRestoreAnimation = null
  }

  // 모든 요소의 진행 중인 애니메이션 kill
  gsap.killTweensOf(firstLine)
  gsap.killTweensOf(secondLine)

  // 첫 번째 줄을 숨기고 원래 내용으로 복원
  nameTextRestoreAnimation = gsap.to(firstLine, {
    opacity: 0,
    duration: 0.15,
    ease: 'power2.in',
    onComplete: () => {
      if (firstLine && secondLine) {
        // 원래 텍스트로 복원
        firstLine.textContent = 'Jeong'
        secondLine.textContent = 'Hyeon-jin'
        secondLine.style.display = 'block'

        // 초기 상태 설정 (blur와 transform)
        gsap.set([firstLine, secondLine], {
          opacity: 0,
          filter: 'blur(30px)',
          y: '-5%',
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
            duration: 0.15,
            ease: 'power2.out',
          },
          0,
        )
        nameTextTimeline.to(
          secondLine,
          {
            opacity: 1,
            filter: 'blur(0px)',
            y: '0%',
            duration: 0.15,
            ease: 'power2.out',
          },
          0,
        )
      }
    },
  })
}

onMounted(() => {
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
    if (badgeAnimation) badgeAnimation.kill()
    if (roleAnimation) roleAnimation.kill()
    if (nameAnimation) nameAnimation.kill()
    if (headerAnimation) headerAnimation.kill()

    // 모바일에서만 전체 헤더 표시 (AvailableBadge와 RoleTitle은 blur/transform 없이)
    if (isMobile() && portfolioHeaderRef.value) {
      // 헤더가 이미 보이는 상태면 애니메이션 생략
      const currentOpacity = gsap.getProperty(portfolioHeaderRef.value, 'opacity')
      if (currentOpacity < 1) {
        // 헤더 컨테이너는 opacity만 적용 (blur/transform 없음)
        headerAnimation = gsap.to(portfolioHeaderRef.value, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        })

        // AvailableBadge와 RoleTitle은 opacity만 복원 (blur/transform 없음)
        if (availableBadgeRef.value?.$el) {
          availableBadgeRef.value.$el.style.display = 'inline-flex'
          badgeAnimation = gsap.to(availableBadgeRef.value.$el, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
          })
        }

        if (roleTitleRef.value?.$el) {
          roleAnimation = gsap.to(roleTitleRef.value.$el, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
          })
        }

        // NameTitle 텍스트 복원 (blur와 transform 효과 포함)
        // 모바일에서는 깜빡임 방지를 위해 직접 복원
        if (nameTitleRef.value?.firstLineRef && nameTitleRef.value?.secondLineRef) {
          const firstLine = nameTitleRef.value.firstLineRef
          const secondLine = nameTitleRef.value.secondLineRef

          // 진행 중인 모든 애니메이션 중단
          if (nameTextTimeline) {
            nameTextTimeline.kill()
            nameTextTimeline = null
          }
          if (nameTextRestoreAnimation) {
            nameTextRestoreAnimation.kill()
            nameTextRestoreAnimation = null
          }
          gsap.killTweensOf(firstLine)
          gsap.killTweensOf(secondLine)

          // 이미 원래 텍스트인지 확인
          const isAlreadyRestored =
            firstLine.textContent === 'Jeong' && secondLine.textContent === 'Hyeon-jin'

          // 텍스트가 변경되어야 하는 경우만 변경
          if (!isAlreadyRestored) {
            firstLine.textContent = 'Jeong'
            secondLine.textContent = 'Hyeon-jin'
            secondLine.style.display = 'block'
          }

          // blur와 transform 효과는 항상 적용
          // 초기 상태 설정 (blur와 transform)
          gsap.set([firstLine, secondLine], {
            opacity: 0,
            filter: 'blur(40px)',
            y: '-10%',
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
              duration: 0.3,
              ease: 'power2.out',
            },
            0,
          )
          nameTextTimeline.to(
            secondLine,
            {
              opacity: 1,
              filter: 'blur(0px)',
              y: '0%',
              duration: 0.3,
              ease: 'power2.out',
            },
            0,
          )
        } else {
          restoreNameText()
          isRestoring = false
        }
      } else {
        // 헤더가 이미 보이는 상태면 플래그만 해제
        isRestoring = false
      }
      return // 모바일에서는 여기서 종료
    }

    // 데스크톱/태블릿에서는 기존 동작 유지
    // AvailableBadge 복원 (딜레이 추가)
    if (availableBadgeRef.value?.$el) {
      availableBadgeRef.value.$el.style.display = 'inline-flex'
      badgeAnimation = gsap.to(availableBadgeRef.value.$el, {
        opacity: 1,
        duration: 0.6,
        delay: 0.15,
        ease: 'power2.out',
      })
    }

    // RoleTitle 복원 (딜레이 추가)
    if (roleTitleRef.value?.$el) {
      roleAnimation = gsap.to(roleTitleRef.value.$el, {
        opacity: 1,
        duration: 0.6,
        delay: 0.15,
        ease: 'power2.out',
      })
    }

    // NameTitle은 딜레이 없이 바로 복원
    if (nameTitleRef.value?.$el) {
      nameAnimation = gsap.to(nameTitleRef.value.$el, {
        opacity: 1,
        duration: 0.15,
        ease: 'power2.out',
      })
    }

    // NameTitle 텍스트 복원
    restoreNameText()
    isRestoring = false
  }

  // 숨기는 함수 (Skills 섹션에 진입할 때)
  const hideState = () => {
    // 진행 중인 애니메이션 중단
    if (badgeAnimation) badgeAnimation.kill()
    if (roleAnimation) roleAnimation.kill()
    if (nameAnimation) nameAnimation.kill()
    if (headerAnimation) headerAnimation.kill()

    // 모바일에서만 전체 헤더 숨기기 (AvailableBadge와 RoleTitle은 blur/transform 없이)
    if (isMobile() && portfolioHeaderRef.value) {
      // AvailableBadge와 RoleTitle은 opacity만 변경 (blur/transform 없음)
      if (availableBadgeRef.value?.$el) {
        badgeAnimation = gsap.to(availableBadgeRef.value.$el, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
        })
      }

      if (roleTitleRef.value?.$el) {
        roleAnimation = gsap.to(roleTitleRef.value.$el, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
        })
      }

      // 헤더 컨테이너는 opacity만 적용 (blur/transform 없음)
      headerAnimation = gsap.to(portfolioHeaderRef.value, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      })
      return // 모바일에서는 여기서 종료
    }

    // 데스크톱/태블릿에서는 기존 동작 유지
    // AvailableBadge 숨기기
    if (availableBadgeRef.value?.$el) {
      badgeAnimation = gsap.to(availableBadgeRef.value.$el, {
        opacity: 0,
        duration: 0,
        ease: 'power2.out',
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
        duration: 0.15,
        ease: 'power2.out',
      })
    }

    // NameTitle은 그대로 유지 (텍스트는 changeNameText로 변경됨)
  }

  // 모바일에서 헤더 애니메이션을 gsap.to() + scrollTrigger 방식으로 설정
  if (isMobile() && portfolioHeaderRef.value) {
    // 기존 애니메이션 kill
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
    gsap.killTweensOf(portfolioHeaderRef.value)
    if (availableBadgeRef.value?.$el) {
      gsap.killTweensOf(availableBadgeRef.value.$el)
    }
    if (roleTitleRef.value?.$el) {
      gsap.killTweensOf(roleTitleRef.value.$el)
    }

    // 초기 상태 설정
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

    // Hero 섹션의 bottom 지점을 기준으로 헤더 숨기기/보이기
    // Hero 섹션의 bottom 지점에서 Skills 섹션의 top 90% 지점까지 헤더를 숨김
    const setupMobileHeaderAnimation = () => {
      // Skills 섹션의 top 90% 지점 계산
      const skillsTop = skillsSection.offsetTop
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
      // Skills 섹션의 top 90% 지점까지의 거리 계산
      const distance = skillsTop - heroBottom + window.innerHeight * 1

      mobileHeaderAnimation = gsap.to(portfolioHeaderRef.value, {
        opacity: 0,
        filter: 'blur(40px)',
        y: '-10%',
        ease: 'power2.out',
        scrollTrigger: {
          trigger: heroSection,
          start: 'bottom 90%',
          end: `+=${distance}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      })

      if (availableBadgeRef.value?.$el) {
        mobileBadgeAnimation = gsap.to(availableBadgeRef.value.$el, {
          opacity: 0,
          filter: 'blur(40px)',
          y: '-10%',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heroSection,
            start: 'bottom 80%',
            end: `+=${distance}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
      }

      if (roleTitleRef.value?.$el) {
        mobileRoleAnimation = gsap.to(roleTitleRef.value.$el, {
          opacity: 0,
          filter: 'blur(40px)',
          y: '-10%',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heroSection,
            start: 'bottom 90%',
            end: `+=${distance}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
      }
    }

    setupMobileHeaderAnimation()

    // Hero 섹션의 bottom 지점 이전에서는 헤더 보이기
    // 역방향 스크롤 시 자동으로 처리됨 (scrub: true)
  }

  // Skills 섹션 ScrollTrigger (데스크톱/태블릿용)
  if (!isMobile()) {
    ScrollTrigger.create({
      trigger: skillsSection,
      start: 'top 95%',
      end: 'top center',
      scrub: 1,
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
    ScrollTrigger.create({
      trigger: worksSection,
      start: 'top 95%',
      end: 'top center',
      scrub: 1,
      onEnter: () => {
        // Works 섹션에 진입할 때도 hideState 호출 (이미 Skills에서 숨겨졌을 수 있음)
        hideState()
        changeNameText('Works')
      },
      onLeaveBack: () => {
        // Works 섹션을 벗어날 때, Skills 섹션이 아직 보이면 "Skills"로, 아니면 원래 상태로
        const skillsRect = skillsSection.getBoundingClientRect()
        const isSkillsVisible = skillsRect.top < window.innerHeight && skillsRect.bottom > 0

        if (isSkillsVisible) {
          // Skills 섹션이 보이면 "Skills"로 변경
          changeNameText('Skills')
        } else {
          // Skills 섹션도 벗어났으면 복원
          restoreOriginalState()
        }
      },
    })
  }
})

onUnmounted(() => {
  if (badgeAnimation) badgeAnimation.kill()
  if (roleAnimation) roleAnimation.kill()
  if (nameAnimation) nameAnimation.kill()
  if (headerAnimation) headerAnimation.kill()
  if (mobileHeaderAnimation) mobileHeaderAnimation.kill()
  if (mobileBadgeAnimation) mobileBadgeAnimation.kill()
  if (mobileRoleAnimation) mobileRoleAnimation.kill()
  if (nameTextTimeline) nameTextTimeline.kill()
  if (nameTextRestoreAnimation) nameTextRestoreAnimation.kill()
  if (nameTitleRef.value?.firstLineRef) gsap.killTweensOf(nameTitleRef.value.firstLineRef)
  if (nameTitleRef.value?.secondLineRef) gsap.killTweensOf(nameTitleRef.value.secondLineRef)
  if (portfolioHeaderRef.value) gsap.killTweensOf(portfolioHeaderRef.value)
  if (availableBadgeRef.value?.$el) gsap.killTweensOf(availableBadgeRef.value.$el)
  if (roleTitleRef.value?.$el) gsap.killTweensOf(roleTitleRef.value.$el)
  if (heroCheckTimeout) {
    clearTimeout(heroCheckTimeout)
    heroCheckTimeout = null
  }
  if (heroCheckHandler) {
    window.removeEventListener('scroll', heroCheckHandler)
    ScrollTrigger.removeEventListener('scrollEnd', heroCheckHandler)
  }
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
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
