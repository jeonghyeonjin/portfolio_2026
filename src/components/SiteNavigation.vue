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

// 상수
const SCROLL_DURATION = 1.2
const SCROLL_EASE = 'power2.inOut'
const TRIGGER_START = 'top 95%'
const TRIGGER_END = 'top center'
const TRIGGER_SCRUB = 1
const TRIGGER_POINT_RATIO = 0.95
const ANIMATION_DURATION = 0.8
const ANIMATION_EASE = 'power3.out'
const MENU_ANIMATION_DURATION = 0.6
const MENU_STAGGER = 0.15
const MENU_ANIMATION_EASE = 'power2.out'
const HAMBURGER_DELAY = 0.3

// 섹션 정의
const SECTION_IDS = ['skills', 'works', 'experiences', 'about']

// Refs
const logoContainerRef = ref(null)
const menuListRef = ref(null)
const hamburgerButtonRef = ref(null)
const activeSection = ref('')

// 상태
const sections = SECTION_IDS.map((id) => ({ id, element: null }))
let scrollTriggers = []
let resizeHandler = null

// 유틸리티 함수
const isMobile = () => {
  const mobileBreakpoint = getMobileBreakpoint()
  return window.innerWidth <= mobileBreakpoint
}

// 섹션 요소 찾기
const findSections = () => {
  sections.forEach((section) => {
    const element = document.getElementById(section.id)
    if (element) {
      section.element = element
    }
  })
}

// 섹션으로 스크롤
const scrollToSection = (sectionId) => {
  const section = sections.find((s) => s.id === sectionId)
  if (!section?.element) return

  // skills 섹션은 하단이 화면 하단에 오도록 스크롤
  if (sectionId === 'skills') {
    const rect = section.element.getBoundingClientRect()
    const elementTop = rect.top + window.scrollY
    const elementHeight = rect.height
    const windowHeight = window.innerHeight
    const targetScrollY = elementTop + elementHeight - windowHeight

    gsap.to(window, {
      duration: SCROLL_DURATION,
      scrollTo: {
        y: targetScrollY,
      },
      ease: SCROLL_EASE,
    })
  } else {
    // 다른 섹션은 상단이 화면 상단에 오도록 스크롤
    gsap.to(window, {
      duration: SCROLL_DURATION,
      scrollTo: {
        y: section.element,
        offsetY: 0,
      },
      ease: SCROLL_EASE,
    })
  }
}

// 활성 섹션 업데이트
const updateActiveSection = () => {
  if (scrollTriggers.length === 0) return

  // ScrollTrigger 상태로 확인
  for (let i = scrollTriggers.length - 1; i >= 0; i--) {
    const trigger = scrollTriggers[i]
    if (trigger?.sectionId && (trigger.progress > 0 || trigger.isActive)) {
      activeSection.value = trigger.sectionId
      return
    }
  }

  // 직접 계산 (fallback)
  const triggerPoint = window.innerHeight * TRIGGER_POINT_RATIO
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i]
    if (section.element) {
      const rect = section.element.getBoundingClientRect()
      if (rect.top <= triggerPoint) {
        activeSection.value = section.id
        return
      }
    }
  }

  activeSection.value = ''
}

// 이전 섹션이 보이는지 확인
const isPreviousSectionVisible = (index) => {
  if (index <= 0) return false
  const prevSection = sections[index - 1]
  if (!prevSection?.element) return false

  const rect = prevSection.element.getBoundingClientRect()
  return rect.top < window.innerHeight && rect.bottom > 0
}

// ScrollTrigger 설정
const setupScrollTriggers = () => {
  // 기존 트리거 제거
  scrollTriggers.forEach((trigger) => trigger.kill())
  scrollTriggers = []

  sections.forEach((section, index) => {
    if (!section.element) return

    const trigger = ScrollTrigger.create({
      trigger: section.element,
      start: TRIGGER_START,
      end: TRIGGER_END,
      scrub: TRIGGER_SCRUB,
      onEnter: () => {
        activeSection.value = section.id
      },
      onLeaveBack: () => {
        if (isPreviousSectionVisible(index)) {
          activeSection.value = sections[index - 1].id
        } else {
          activeSection.value = ''
        }
      },
    })

    trigger.sectionId = section.id
    trigger.sectionIndex = index
    scrollTriggers.push(trigger)
  })
}

// 리사이즈 핸들러
const handleResize = () => {
  setupScrollTriggers()
  ScrollTrigger.refresh()
}

// 데스크톱/태블릿 애니메이션
const setupDesktopAnimations = () => {
  // 메뉴 아이템 초기 상태
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
      duration: ANIMATION_DURATION,
      ease: ANIMATION_EASE,
      onComplete: () => {
        // 메뉴 아이템 순차 애니메이션
        if (menuListRef.value) {
          const menuItems = menuListRef.value.querySelectorAll('.menu-item')
          gsap.to(menuItems, {
            opacity: 1,
            x: 0,
            duration: MENU_ANIMATION_DURATION,
            stagger: MENU_STAGGER,
            ease: MENU_ANIMATION_EASE,
          })
        }
      },
    })
  }
}

// 모바일 애니메이션
const setupMobileAnimations = () => {
  // 로고 애니메이션
  if (logoContainerRef.value) {
    gsap.from(logoContainerRef.value, {
      opacity: 0,
      scale: 0.8,
      duration: ANIMATION_DURATION,
      ease: ANIMATION_EASE,
    })
  }

  // 햄버거 버튼 애니메이션
  if (hamburgerButtonRef.value) {
    gsap.from(hamburgerButtonRef.value, {
      opacity: 0,
      scale: 0.8,
      duration: ANIMATION_DURATION,
      delay: HAMBURGER_DELAY,
      ease: ANIMATION_EASE,
    })
  }
}

// 초기화
const initialize = () => {
  findSections()
  setupScrollTriggers()
  ScrollTrigger.refresh()

  // 초기 활성 섹션 설정
  setTimeout(() => {
    updateActiveSection()
  }, 0)

  // 애니메이션 설정
  if (isMobile()) {
    setupMobileAnimations()
  } else {
    setupDesktopAnimations()
  }
}

onMounted(() => {
  initialize()

  // 리사이즈 이벤트 리스너
  resizeHandler = handleResize
  window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
  // ScrollTrigger 정리
  scrollTriggers.forEach((trigger) => trigger.kill())
  scrollTriggers = []

  // 이벤트 리스너 제거
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
    resizeHandler = null
  }

  // 모든 ScrollTrigger 제거
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
  font-size: var(--body--1--normal--regular);
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
  color: rgb(var(--gray--1));
}

.menu-item.active {
  color: rgb(var(--gray--1));
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 6px;
}

.hamburger-button {
  display: none;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: rgb(var(--gray--5s));
  transition: color 0.3s ease;
  will-change: opacity, transform;
}

.hamburger-button:hover {
  color: rgb(var(--gray--1));
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
