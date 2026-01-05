<template>
  <nav class="navigation">
    <div class="nav-left">
      <div class="logo-container" ref="logoContainerRef">
        <img src="@/assets/images/logo.png" alt="Logo" class="logo" />
      </div>
    </div>
    <div class="nav-center" ref="navCenterRef">
      <!-- 검색 모드 -->
      <div
        ref="searchContainerRef"
        class="search-container"
        :class="{ 'is-visible': isSearchMode }"
        :style="menuListWidth ? { width: `${menuListWidth}px` } : {}"
        role="search"
      >
        <div class="search-input-wrapper">
          <label for="work-search" class="visually-hidden">작업 검색</label>
          <BaseInput
            id="work-search"
            ref="searchInputRef"
            v-model="searchQuery"
            type="text"
            placeholder="Search work..."
            aria-label="작업 검색"
            :aria-describedby="filteredWorks.length > 0 ? 'search-results-count' : undefined"
            @keydown.esc="handleSearchEsc"
            @keydown.enter="isFixed('search-keyboard-nav') && handleEnter()"
            @keydown.down.prevent="isFixed('search-keyboard-nav') && navigateDown()"
            @keydown.up.prevent="isFixed('search-keyboard-nav') && navigateUp()"
          />
          <IconButton size="small" aria-label="닫기" @click="handleSearchClose">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </IconButton>
          <Transition name="issue-marker">
            <div
              v-if="!isFixed('search-debounce') && isMarkersReady"
              class="issue-marker-wrapper"
              style="right: 50px; top: 50%; transform: translateY(-50%)"
              @click.stop="openIssue('search-debounce')"
            >
              <IssueMarker />
            </div>
          </Transition>
          <Transition name="issue-marker">
            <div
              v-if="!isFixed('search-keyboard-nav') && isMarkersReady"
              class="issue-marker-wrapper"
              style="right: 80px; top: 50%; transform: translateY(-50%)"
              @click.stop="openIssue('search-keyboard-nav')"
            >
              <IssueMarker />
            </div>
          </Transition>
          <div
            id="search-results-count"
            role="status"
            aria-live="polite"
            aria-atomic="true"
            class="visually-hidden"
          >
            {{ searchQuery ? `${filteredWorks.length}개의 검색 결과` : '' }}
          </div>
        </div>
        <!-- 검색 결과 -->
        <div
          v-if="filteredWorks.length > 0"
          class="search-results"
          role="listbox"
          :aria-label="`${filteredWorks.length}개의 검색 결과`"
          @wheel.passive.stop
        >
          <div
            v-for="(work, index) in filteredWorks"
            :key="work.id"
            :ref="(el) => setResultRef(el, index)"
            role="option"
            :aria-selected="selectedIndex === index"
            tabindex="0"
            class="search-result"
            :class="{ active: selectedIndex === index }"
            @click="handleSelectWork(work.id)"
            @keydown.enter="handleSelectWork(work.id)"
            @keydown.space.prevent="handleSelectWork(work.id)"
            @mouseenter="selectedIndex = index"
          >
            <h3 class="search-result-title">{{ work.title }}</h3>
            <p class="search-result-description">{{ work.description }}</p>
          </div>
        </div>
      </div>
      <!-- 일반 메뉴 모드 -->
      <ul class="menu-list" :class="{ 'is-visible': !isSearchMode }" ref="menuListRef">
        <li
          class="menu-item"
          :class="{ active: activeSection === 'skill' }"
          :aria-current="activeSection === 'skill' ? 'page' : undefined"
          @click="scrollToSection('skill')"
        >
          <span class="menu-text" data-text="Skill">Skill</span>
        </li>
        <li
          class="menu-item"
          :class="{ active: activeSection === 'work' }"
          :aria-current="activeSection === 'work' ? 'page' : undefined"
          @click="scrollToSection('work')"
        >
          <span class="menu-text" data-text="Work">Work</span>
          <Transition name="issue-marker">
            <div
              v-if="!isFixed('search-shortcut') && isMarkersReady"
              class="issue-marker-wrapper"
              style="top: -6px; right: -6px"
              @click.stop="openIssue('search-shortcut')"
            >
              <IssueMarker />
            </div>
          </Transition>
          <ShortcutHint
            v-if="isFixed('search-shortcut')"
            :keys="'/'"
            :active="activeSection === 'work'"
          />
        </li>
        <li
          class="menu-item"
          :class="{ active: activeSection === 'experience' }"
          :aria-current="activeSection === 'experience' ? 'page' : undefined"
          @click="scrollToSection('experience')"
        >
          <span class="menu-text" data-text="Experience">Experience</span>
        </li>
        <li
          class="menu-item"
          :class="{ active: activeSection === 'about' }"
          :aria-current="activeSection === 'about' ? 'page' : undefined"
          @click="scrollToSection('about')"
        >
          <span class="menu-text" data-text="About">About</span>
        </li>
      </ul>
    </div>
    <div class="nav-right">
      <ProgressPanel />
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
import { ref, computed, watch, inject, nextTick, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { refDebounced, useResizeObserver } from '@vueuse/core'
import ShortcutHint from '../common/ShortcutHint.vue'
import ProgressPanel from '../broken/ProgressPanel.vue'
import IssueMarker from '@/components/broken/IssueMarker.vue'
import IconButton from '@/components/common/IconButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import { useBrokenPortfolio } from '@/composables/useBrokenPortfolio'
import { useResponsive } from '@/composables/useResponsive'

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

const { isFixed, openIssue, isMarkersReady } = useBrokenPortfolio()
const { isMobile } = useResponsive()

// provide/inject로 works 데이터 및 콜백 사용
const works = inject('works', ref([]))
const selectWork = inject('selectWork', () => {})

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
const TRANSITION_DURATION = 0.4
const TRANSITION_EASE = 'power2.inOut'

// 섹션 정의
const SECTION_IDS = ['skill', 'work', 'experience', 'about']

// Refs
const logoContainerRef = ref(null)
const menuListRef = ref(null)
const hamburgerButtonRef = ref(null)
const navCenterRef = ref(null)
const searchContainerRef = ref(null)
const searchInputRef = ref(null)
const activeSection = ref('')
const menuListWidth = ref(null)

// 검색 상태
const isSearchMode = ref(false)
const searchQuery = ref('')
const debouncedSearchQuery = refDebounced(searchQuery, 300) // 300ms debounce
const selectedIndex = ref(0)
const resultRefs = ref([])
const isAnimating = ref(false)

// 검색 결과 필터링 (debounced query 사용)
const filteredWorks = computed(() => {
  if (!debouncedSearchQuery.value.trim()) {
    // 검색어가 없으면 모든 works 반환 (기본 정렬)
    return works.value
  }
  const query = debouncedSearchQuery.value.toLowerCase()
  return works.value.filter(
    (work) =>
      work.title.toLowerCase().includes(query) || work.description.toLowerCase().includes(query),
  )
})

// 상태
const sections = SECTION_IDS.map((id) => ({ id, element: null }))
let scrollTriggers = []
let resizeHandler = null

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

  // skill 섹션은 하단이 화면 하단에 오도록 스크롤
  // if (sectionId === 'skill') {
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
  // } else {
  //   // 다른 섹션은 상단이 화면 상단에 오도록 스크롤
  //   gsap.to(window, {
  //     duration: SCROLL_DURATION,
  //     scrollTo: {
  //       y: section.element,
  //       offsetY: 0,
  //     },
  //     ease: SCROLL_EASE,
  //   })
  // }
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
    // 메뉴 리스트 초기 상태 설정
    gsap.set(menuListRef.value, {
      opacity: 1,
      scale: 1,
    })
  }

  // 검색 컨테이너 초기 상태 설정
  if (searchContainerRef.value) {
    gsap.set(searchContainerRef.value, {
      opacity: 0,
      scale: 0.95,
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
  // 메뉴 리스트 초기 상태 설정
  if (menuListRef.value) {
    gsap.set(menuListRef.value, {
      opacity: 1,
      scale: 1,
    })
  }

  // 검색 컨테이너 초기 상태 설정
  if (searchContainerRef.value) {
    gsap.set(searchContainerRef.value, {
      opacity: 0,
      scale: 0.95,
    })
  }

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

// 외부 클릭 처리
const handleOutsideClick = (event) => {
  if (!isSearchMode.value) return

  // 검색 컨테이너 내부 클릭인지 확인
  if (searchContainerRef.value && searchContainerRef.value.contains(event.target)) {
    return
  }

  // 검색 결과 영역 클릭인지 확인
  const searchResults = document.querySelector('.search-results')
  if (searchResults && searchResults.contains(event.target)) {
    return
  }

  // 외부 클릭이면 검색창 닫기
  closeSearch()
}

// menu-list 너비 측정
const measureMenuListWidth = () => {
  if (menuListRef.value) {
    const width = menuListRef.value.offsetWidth
    menuListWidth.value = width
    return width
  }
  return null
}

// 검색창 열기 애니메이션
const animateSearchOpen = () => {
  if (!menuListRef.value || !searchContainerRef.value || isAnimating.value) return

  isAnimating.value = true
  const menuList = menuListRef.value
  const searchContainer = searchContainerRef.value

  // 검색 컨테이너 초기 상태 설정
  gsap.set(searchContainer, {
    opacity: 0,
    scale: 0.95,
  })

  // 메뉴 리스트 페이드 아웃
  gsap.to(menuList, {
    opacity: 0,
    scale: 0.95,
    duration: TRANSITION_DURATION,
    ease: TRANSITION_EASE,
    onComplete: () => {
      // 검색 컨테이너 페이드 인
      gsap.to(searchContainer, {
        opacity: 1,
        scale: 1,
        duration: TRANSITION_DURATION,
        ease: TRANSITION_EASE,
        onComplete: () => {
          isAnimating.value = false
          if (searchInputRef.value) {
            searchInputRef.value.focus()
          }
        },
      })
    },
  })
}

// 검색창 닫기 애니메이션
const animateSearchClose = () => {
  if (!menuListRef.value || !searchContainerRef.value || isAnimating.value) return

  isAnimating.value = true
  const menuList = menuListRef.value
  const searchContainer = searchContainerRef.value

  // 메뉴 리스트 초기 상태 설정
  gsap.set(menuList, {
    opacity: 0,
    scale: 0.95,
  })

  // 검색 컨테이너 페이드 아웃
  gsap.to(searchContainer, {
    opacity: 0,
    scale: 0.95,
    duration: TRANSITION_DURATION,
    ease: TRANSITION_EASE,
    onComplete: () => {
      // 메뉴 리스트 페이드 인
      gsap.to(menuList, {
        opacity: 1,
        scale: 1,
        duration: TRANSITION_DURATION,
        ease: TRANSITION_EASE,
        onComplete: () => {
          isAnimating.value = false
        },
      })
    },
  })
}

// 검색창 열기
const openSearch = () => {
  // 이미 열려있거나 애니메이션 진행 중이면 무시
  if (isSearchMode.value || isAnimating.value) {
    return
  }

  // menu-list 너비 측정
  measureMenuListWidth()

  isSearchMode.value = true
  searchQuery.value = ''
  selectedIndex.value = 0
  nextTick(() => {
    animateSearchOpen()
    // 외부 클릭 감지 이벤트 리스너 추가 (다음 틱에 추가하여 현재 클릭 이벤트가 처리되지 않도록)
    document.addEventListener('click', handleOutsideClick)
  })
}

// 검색창 Esc 키 처리
const handleSearchEsc = () => {
  // 검색창이 닫혀있으면 아무것도 하지 않음
  if (!isSearchMode.value) {
    return
  }

  // 모달이 열려있는지 확인 (hash로 확인)
  const hash = window.location.hash
  const isModalOpen = hash.startsWith('#work-')

  // 모달이 열려있으면 검색창을 닫지 않음
  if (isModalOpen) {
    return
  }

  // 모달이 닫혀있으면 검색창 닫기
  closeSearch()
}

// 검색창 닫기 버튼 처리
const handleSearchClose = () => {
  // 모달이 열려있는지 확인 (hash로 확인)
  const hash = window.location.hash
  const isModalOpen = hash.startsWith('#work-')

  // 모달이 열려있으면 검색창을 닫지 않음
  if (isModalOpen) {
    return
  }

  // 모달이 닫혀있으면 검색창 닫기
  closeSearch()
}

// 검색창 닫기
const closeSearch = () => {
  // 검색창이 이미 닫혀있으면 아무것도 하지 않음
  if (!isSearchMode.value) {
    return
  }

  // input 포커스 제거
  if (searchInputRef.value) {
    searchInputRef.value.blur()
  }

  isSearchMode.value = false
  searchQuery.value = ''
  selectedIndex.value = 0
  // 외부 클릭 감지 이벤트 리스너 제거
  document.removeEventListener('click', handleOutsideClick)
  nextTick(() => {
    animateSearchClose()
  })
}

// 결과 ref 설정
const setResultRef = (el, index) => {
  if (el) {
    resultRefs.value[index] = el
  }
}

// Work 선택 - provide/inject로 전달된 함수 사용
const handleSelectWork = (workId) => {
  // 검색창은 유지하고 모달만 열기
  selectWork(workId)
}

// Enter 키 처리
const handleEnter = () => {
  if (!isFixed('search-keyboard-nav')) return
  if (filteredWorks.value.length > 0 && selectedIndex.value >= 0) {
    const selectedWork = filteredWorks.value[selectedIndex.value]
    if (selectedWork) {
      handleSelectWork(selectedWork.id)
    }
  }
}

// 아래 화살표 키
const navigateDown = () => {
  if (!isFixed('search-keyboard-nav')) return
  if (selectedIndex.value < filteredWorks.value.length - 1) {
    selectedIndex.value++
    scrollToSelected()
  }
}

// 위 화살표 키
const navigateUp = () => {
  if (!isFixed('search-keyboard-nav')) return
  if (selectedIndex.value > 0) {
    selectedIndex.value--
    scrollToSelected()
  }
}

// 선택된 항목으로 스크롤
const scrollToSelected = () => {
  nextTick(() => {
    const selectedEl = resultRefs.value[selectedIndex.value]
    if (selectedEl) {
      selectedEl.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  })
}

// 검색어 변경 시 선택 인덱스 리셋 (DOM 업데이트 후 실행)
watch(
  searchQuery,
  () => {
    selectedIndex.value = 0
  },
  { flush: 'post' },
)

// '/' 키로 검색창 열기
const handleKeydown = (event) => {
  // '/' 키 처리 - 이슈가 해결된 경우에만 동작
  if (event.key === '/' && isFixed('search-shortcut')) {
    // 검색창이 이미 열려있으면 무시 (input에 '/' 입력 허용)
    if (isSearchMode.value) {
      return
    }

    // input이나 textarea에 포커스가 있으면 무시
    if (
      event.target.tagName === 'INPUT' ||
      event.target.tagName === 'TEXTAREA' ||
      event.target.isContentEditable
    ) {
      return
    }

    // works 데이터가 있는 경우에만 검색창 열기
    if (works.value.length > 0) {
      event.preventDefault()
      openSearch()
    }
  }
}

// 외부에서 열 수 있도록 expose (imperative methods only)
defineExpose({
  openSearch,
  closeSearch,
})

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
  if (isMobile.value) {
    setupMobileAnimations()
  } else {
    setupDesktopAnimations()
  }

  // 초기 menu-list 너비 측정
  nextTick(() => {
    if (menuListRef.value) {
      measureMenuListWidth()

      // VueUse의 useResizeObserver를 사용하여 리사이즈 감지
      useResizeObserver(menuListRef, () => {
        if (!isSearchMode.value && menuListRef.value) {
          measureMenuListWidth()
        }
      })
    }
  })
}

onMounted(() => {
  initialize()

  // 리사이즈 이벤트 리스너
  resizeHandler = handleResize
  window.addEventListener('resize', resizeHandler)

  // '/' 키 이벤트 리스너
  window.addEventListener('keydown', handleKeydown)
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

  window.removeEventListener('keydown', handleKeydown)

  // 모든 ScrollTrigger 제거
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
})
</script>

<style scoped>
@import '@/assets/styles/breakpoints.css';
@import '@/assets/styles/issue-marker.css';

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.navigation {
  position: fixed;
  top: 20px;
  left: 30px;
  right: calc(30px + var(--scrollbar-width, 0px));
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
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
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
  border: 1px solid rgba(var(--white--0), 0.2);
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  opacity: 1;
  pointer-events: auto;
}

.menu-list:not(.is-visible) {
  opacity: 0;
  pointer-events: none;
}

.menu-item {
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  color: rgba(var(--gray--2), 0.8);
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
  font-weight: var(--font-weight--medium);
}

.menu-item.active {
  color: rgb(var(--gray--1));
  background-color: rgba(var(--white--0), 0.6);
  border-radius: 6px;
  font-weight: var(--font-weight--medium);
}

.menu-text {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}

@media speech {
  .menu-text::after {
    display: none;
  }
}

.hamburger-button {
  display: none;
  background: none;
  border: none;
  padding: 10px;
  cursor: pointer;
  color: rgb(var(--gray--5s));
  transition: color 0.3s ease;
  will-change: opacity, transform;
  /* WCAG 2.5.5 - Minimum touch target size */
  min-width: 44px;
  min-height: 44px;
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
    top: 20px;
    left: 30px;
    right: calc(30px + var(--scrollbar-width, 0px));
    grid-template-columns: 1fr 1fr 1fr;
  }
}

/* Mobile: --mobile */
@media (--mobile) {
  .navigation {
    top: 40px;
    left: 40px;
    right: calc(40px + var(--scrollbar-width, 0px));
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

/* 검색 모드 스타일 */
.search-container {
  height: 100%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  pointer-events: none;
  /* width는 menuListWidth로 동적으로 설정 */
}

.search-container.is-visible {
  opacity: 1;
  pointer-events: auto;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--white--0), 0.2);
  border-radius: 10px;
  min-width: 300px;
  position: relative;
}

.search-results {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  max-height: 400px;
  overflow-y: auto;
  overscroll-behavior: contain;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  z-index: 1001;
  padding: 8px;
  margin-top: 4px;
}

.search-result {
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
}

.search-result:hover,
.search-result.active {
  background-color: rgba(var(--gray--5s), 0.08);
  transform: translateX(2px);
}

.search-result-title {
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: var(--headline--1);
  font-weight: var(--font-weight--medium);
  font-weight: 500;
  color: rgb(var(--gray--1));
  margin: 0 0 6px 0;
  line-height: 1.3;
}

.search-result-description {
  font-size: var(--body--2--normal);
  font-weight: var(--font-weight--regular);
  color: rgba(var(--gray--5s), 0.7);
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Tablet: --tablet */
@media (--tablet) {
  .search-input-wrapper {
    min-width: 250px;
  }

  .search-results {
    max-height: 350px;
  }
}

/* Mobile: --mobile */
@media (--mobile) {
  .search-container {
    max-width: 100%;
  }

  .search-input-wrapper {
    min-width: 200px;
    padding: 8px 10px;
  }

  .search-results {
    max-height: 300px;
    border-radius: 10px;
  }

  .search-result {
    padding: 10px 12px;
  }

  .search-result-title {
    font-size: var(--headline--2);
    font-weight: var(--font-weight--medium);
  }
}
</style>
