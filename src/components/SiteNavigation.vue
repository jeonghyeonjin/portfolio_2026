<template>
  <nav class="navigation">
    <div class="nav-left">
      <div class="logo-container" ref="logoContainerRef">
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
      </div>
    </div>
    <div class="nav-center">
      <ul class="menu-list" ref="menuListRef">
        <li
          class="menu-item"
          :class="{ active: activeSection === 'skills' }"
          @click="scrollToSection('skills')"
        >
          Skills
        </li>
        <li
          class="menu-item"
          :class="{ active: activeSection === 'works' }"
          @click="scrollToSection('works')"
        >
          Works
          <ShortcutHint :keys="'/'" :active="activeSection === 'works'" />
        </li>
        <li
          class="menu-item"
          :class="{ active: activeSection === 'experiences' }"
          @click="scrollToSection('experiences')"
        >
          Experiences
        </li>
        <li
          class="menu-item"
          :class="{ active: activeSection === 'about' }"
          @click="scrollToSection('about')"
        >
          About
        </li>
      </ul>
    </div>
    <div class="nav-right">
      <!-- 추후 사용할 영역 -->
    </div>
    <button class="hamburger-button" ref="hamburgerButtonRef" aria-label="메뉴">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </button>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ShortcutHint from './common/ShortcutHint.vue'
import { getMobileBreakpoint } from '@/utils/breakpoints'

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

const logoContainerRef = ref(null)
const menuListRef = ref(null)
const hamburgerButtonRef = ref(null)
const activeSection = ref('')

const sections = [
  { id: 'skills', element: null },
  { id: 'works', element: null },
  { id: 'experiences', element: null },
  { id: 'about', element: null },
]

let scrollTriggers = []

const scrollToSection = (sectionId) => {
  const section = sections.find((s) => s.id === sectionId)
  if (section && section.element) {
    // skills 섹션의 경우, 섹션 하단이 화면 하단에 오도록
    if (sectionId === 'skills') {
      const rect = section.element.getBoundingClientRect()
      const elementTop = rect.top + window.scrollY
      const elementHeight = rect.height
      const windowHeight = window.innerHeight
      // 섹션 하단이 화면 하단에 오도록 스크롤 위치 계산
      const targetScrollY = elementTop + elementHeight - windowHeight

      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: targetScrollY,
        },
        ease: 'power2.inOut',
      })
    } else {
      // 다른 섹션은 기존대로 상단이 화면 상단에 오도록
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: section.element,
          offsetY: 0,
        },
        ease: 'power2.inOut',
      })
    }
  }
}

// ScrollTrigger 타이밍과 동일한 기준으로 초기 active 섹션 설정
const updateActiveSection = () => {
  // ScrollTrigger가 설정된 후 각 트리거의 상태를 확인
  if (scrollTriggers.length === 0) return

  // 역순으로 확인하여 가장 아래에 있는 활성화된 섹션 찾기
  for (let i = scrollTriggers.length - 1; i >= 0; i--) {
    const trigger = scrollTriggers[i]
    // ScrollTrigger의 progress가 0보다 크면 활성화된 상태
    // 또는 isActive가 true이면 활성화된 상태
    if (trigger && (trigger.progress > 0 || trigger.isActive)) {
      if (trigger.sectionId) {
        activeSection.value = trigger.sectionId
        return
      }
    }
  }

  // ScrollTrigger 상태로 확인이 안 되면 직접 계산
  const viewportHeight = window.innerHeight
  const triggerPoint = viewportHeight * 0.95

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i]
    if (section.element) {
      const rect = section.element.getBoundingClientRect()
      // 섹션의 top이 triggerPoint(95%)를 지났는지 확인
      if (rect.top <= triggerPoint) {
        activeSection.value = section.id
        return
      }
    }
  }

  // 아무 섹션도 활성화되지 않으면 빈 문자열 (Hero 섹션)
  activeSection.value = ''
}

const setupScrollTriggers = () => {
  // 기존 ScrollTrigger 제거
  scrollTriggers.forEach((trigger) => trigger.kill())
  scrollTriggers = []

  // PortfolioHeader와 동일한 타이밍으로 설정
  sections.forEach((section, index) => {
    if (section.element) {
      const trigger = ScrollTrigger.create({
        trigger: section.element,
        start: 'top 95%',
        end: 'top center',
        scrub: 1,
        onEnter: () => {
          activeSection.value = section.id
        },
        onLeaveBack: () => {
          // 이전 섹션이 있는지 확인
          if (index > 0) {
            const prevSection = sections[index - 1]
            if (prevSection.element) {
              const rect = prevSection.element.getBoundingClientRect()
              const isPrevVisible = rect.top < window.innerHeight && rect.bottom > 0

              if (isPrevVisible) {
                // 이전 섹션이 보이면 이전 섹션으로 설정
                activeSection.value = prevSection.id
                return
              }
            }
          }
          // 이전 섹션이 없거나 보이지 않으면 빈 문자열 (Hero 섹션)
          activeSection.value = ''
        },
      })
      // 트리거에 섹션 정보 저장
      trigger.sectionId = section.id
      trigger.sectionIndex = index
      scrollTriggers.push(trigger)
    }
  })
}

onMounted(() => {
  // 섹션 요소들 찾기
  sections.forEach((section) => {
    const element = document.getElementById(section.id)
    if (element) {
      section.element = element
    }
  })

  // ScrollTrigger로 active 섹션 감지 (PortfolioHeader와 동일한 타이밍)
  setupScrollTriggers()

  // ScrollTrigger refresh 후 초기 상태 설정 (약간의 딜레이로 DOM 업데이트 대기)
  ScrollTrigger.refresh()
  setTimeout(() => {
    updateActiveSection()
  }, 0)

  // 리사이즈 시 ScrollTrigger 재설정
  window.addEventListener('resize', () => {
    setupScrollTriggers()
    ScrollTrigger.refresh()
  })

  // 화면 크기 확인
  const mobileBreakpoint = getMobileBreakpoint()
  const isMobile = window.innerWidth <= mobileBreakpoint

  if (!isMobile) {
    // 데스크톱/태블릿: 초기 상태 설정 - 메뉴 아이템들을 숨김
    if (menuListRef.value) {
      const menuItems = menuListRef.value.querySelectorAll('.menu-item')
      gsap.set(menuItems, {
        opacity: 0,
        x: -10,
      })
    }

    // 로고 애니메이션
    if (logoContainerRef.value) {
      gsap.from(logoContainerRef.value, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: 'power3.out',
        onComplete: () => {
          // 로고 애니메이션 완료 후 메뉴 아이템들 순차적으로 나타나기
          if (menuListRef.value) {
            const menuItems = menuListRef.value.querySelectorAll('.menu-item')
            gsap.to(menuItems, {
              opacity: 1,
              x: 0,
              duration: 0.6,
              stagger: 0.15,
              ease: 'power2.out',
            })
          }
        },
      })
    }
  } else {
    // 모바일: 로고와 햄버거 버튼만 애니메이션
    if (logoContainerRef.value) {
      gsap.from(logoContainerRef.value, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: 'power3.out',
      })
    }

    if (hamburgerButtonRef.value) {
      gsap.from(hamburgerButtonRef.value, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
      })
    }
  }
})

onUnmounted(() => {
  scrollTriggers.forEach((trigger) => trigger.kill())
  scrollTriggers = []
  window.removeEventListener('resize', setupScrollTriggers)
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
})
</script>

<style scoped>
@import '@/assets/breakpoints.css';

.navigation {
  position: fixed;
  top: 40px;
  left: 30px;
  right: 30px;
  z-index: 1000;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  gap: 0;
}

.nav-left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.logo-container {
  display: flex;
  justify-content: flex-start;
  width: auto;
  padding: 10px 10px;
}

.nav-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.logo {
  height: auto;
  width: auto;
  max-width: 30px;
  display: block;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.menu-item {
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: var(--body-1---normal----regular);
  font-weight: 400;
  color: rgba(50, 50, 50, 0.8);
  cursor: pointer;
  transition: color 0.3s ease;
  will-change: opacity, transform;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  padding: 6px 12px;
}

.menu-item:hover {
  color: var(--gray--1);
}

.menu-item.active {
  color: var(--gray--1);
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 6px;
}

.hamburger-button {
  display: none;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--gray--5s);
  transition: color 0.3s ease;
  will-change: opacity, transform;
}

.hamburger-button:hover {
  color: var(--gray--1);
}

.hamburger-button svg {
  display: block;
  width: 24px;
  height: 24px;
}

/* Tablet: --tablet */
@media (--tablet) {
  .navigation {
    top: 40px;
    left: 40px;
    right: 40px;
    grid-template-columns: 1fr 1fr 1fr;
  }
}

/* Mobile: --mobile */
@media (--mobile) {
  .navigation {
    top: 40px;
    left: 40px;
    right: 40px;
    grid-template-columns: auto 1fr auto;
    justify-content: space-between;
  }

  .nav-center {
    display: none;
  }

  .nav-right {
    justify-content: flex-end;
  }

  .logo-container {
    width: auto;
    padding: 0;
  }

  .logo {
    max-width: 26px;
  }

  .menu-list {
    display: none;
  }

  .hamburger-button {
    display: block;
  }
}
</style>
