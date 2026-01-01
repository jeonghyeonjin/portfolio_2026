<template>
  <section id="work" class="work-section" ref="workSectionRef" aria-labelledby="work-heading">
    <div class="work-container">
      <h2 id="work-heading" class="visually-hidden">Work</h2>
      <svg
        ref="workTitleRef"
        class="work-title"
        viewBox="0 0 200 70"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <text
          class="work-title-text"
          x="0"
          y="50"
          font-family="Wanted Sans Variable, Wanted Sans, sans-serif"
          font-size="56"
          font-weight="700"
          letter-spacing="-0.02em"
        >
          Work
        </text>
      </svg>
      <div class="work-grid">
        <article
          v-for="(work, index) in works"
          :key="work.id"
          class="work-item"
          role="button"
          tabindex="0"
          :aria-label="`${work.title} 상세 보기`"
          :ref="(el) => setWorkItemRef(el, work.id)"
          @click="(e) => openWorkModal(work.id, e)"
          @keydown.enter="(e) => openWorkModal(work.id, e)"
          @keydown.space.prevent="(e) => openWorkModal(work.id, e)"
        >
          <div class="work-image-placeholder" aria-hidden="true"></div>
          <h3 class="work-title">{{ work.title }}</h3>
          <p class="work-description">{{ work.description }}</p>
          <Transition name="issue-marker">
            <div
              v-if="index === 0 && !isFixed('work-modal-perf') && isMarkersReady"
              class="issue-marker-wrapper"
              style="top: 10px; right: 10px"
              @click.stop="openIssue('work-modal-perf')"
            >
              <IssueMarker />
            </div>
          </Transition>
        </article>
      </div>
    </div>
    <!-- 원형 애니메이션 요소 -->
    <div
      ref="circleRevealRef"
      class="circle-reveal"
      :class="{ 'is-optimized': isFixed('work-modal-perf') }"
    ></div>
    <!-- Work Modal -->
    <Teleport to="body">
      <WorkModal
        ref="workModalRef"
        v-if="activeWorkId"
        :work-id="activeWorkId"
        :is-visible="isModalVisible"
        @close="closeWorkModal"
      />
    </Teleport>
  </section>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import WorkModal from './works/WorkModal.vue'
import IssueMarker from '@/components/broken/IssueMarker.vue'
import { useBrokenPortfolio } from '@/composables/useBrokenPortfolio'
import { useResponsive } from '@/composables/useResponsive'
import worksData from '@/data/works.json'
import {
  getCircleStartPosition,
  initializeCircleElement,
  createCircleRevealAnimation,
  createCircleCloseAnimation,
} from '@/utils/modalAnimations'

gsap.registerPlugin(ScrollTrigger)

const { isFixed, openIssue, isMarkersReady } = useBrokenPortfolio()
const { isMobile } = useResponsive()

// provide/inject로 works 데이터 및 콜백 공유
const setWorksData = inject('setWorksData')
const setSelectWorkCallback = inject('setSelectWorkCallback')

const workTitleRef = ref(null)
const workSectionRef = ref(null)
let titleAnimation = null

const activeWorkId = ref(null)
const isModalVisible = ref(false)
const circleRevealRef = ref(null)
const workModalRef = ref(null)
const workItemRefs = ref({})
let currentCircleScale = null

const IS_VISIBLE_CLASS = 'is-visible'

// 스크롤바 너비 계산
const getScrollbarWidth = () => {
  const outer = document.createElement('div')
  outer.style.visibility = 'hidden'
  outer.style.overflow = 'scroll'
  outer.style.msOverflowStyle = 'scrollbar'
  document.body.appendChild(outer)

  const inner = document.createElement('div')
  outer.appendChild(inner)

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth

  outer.parentNode?.removeChild(outer)

  return scrollbarWidth
}

// body 스크롤 잠금 (스크롤바 너비 보정)
const lockBodyScroll = () => {
  const scrollbarWidth = getScrollbarWidth()
  document.body.style.overflow = 'hidden'
  if (scrollbarWidth > 0) {
    // body에 paddingRight 추가 및 배경색 설정
    document.body.style.paddingRight = `${scrollbarWidth}px`
    // App.vue와 동일한 배경색 설정
    const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--white--1').trim()
    document.body.style.backgroundColor = `rgb(${bgColor})`

    // CSS 변수로 스크롤바 너비 저장 (SiteNavigation에서 사용)
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`)
  }
}

// body 스크롤 해제
const unlockBodyScroll = () => {
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
  document.body.style.backgroundColor = ''
  document.documentElement.style.removeProperty('--scrollbar-width')
}

// work-item ref 설정
const setWorkItemRef = (el, workId) => {
  if (el) {
    workItemRefs.value[workId] = el
  }
}

// 외부 데이터를 불러와서 Object.freeze로 최적화
const works = Object.freeze(worksData.map((work) => Object.freeze(work)))

const setupScrollTrigger = () => {
  if (!workTitleRef.value || !workSectionRef.value) return

  // 기존 애니메이션 kill
  if (titleAnimation) {
    titleAnimation.kill()
    titleAnimation = null
  }
  gsap.killTweensOf(workTitleRef.value)

  if (isMobile.value) {
    // 모바일: 초기 상태 숨김, 스크롤 시 등장
    // PortfolioHeader와 동일한 타이밍과 효과로 맞춤
    gsap.set(workTitleRef.value, {
      opacity: 0,
      filter: 'blur(40px)',
      y: '-10%',
      display: 'block',
    })

    // gsap.to()에 scrollTrigger를 직접 넣는 방식으로 변경
    titleAnimation = gsap.to(workTitleRef.value, {
      opacity: 1,
      filter: 'blur(0px)',
      y: '0%',
      ease: 'power2.out',
      scrollTrigger: {
        trigger: workSectionRef.value,
        start: 'top 90%',
        end: 'top center',
        scrub: true,
      },
    })
  } else {
    // 데스크톱/태블릿: 숨김
    gsap.set(workTitleRef.value, {
      opacity: 0,
      display: 'none',
    })
  }
}

// 해시에서 work ID 추출
const getWorkIdFromHash = () => {
  const hash = window.location.hash
  const match = hash.match(/^#work-(\d+)$/)
  return match ? parseInt(match[1], 10) : null
}

// 해시 설정
const setWorkHash = (workId) => {
  if (workId) {
    window.location.hash = `work-${workId}`
  } else {
    // 해시 제거 (뒤로가기로 인한 해시 변경은 처리하지 않음)
    if (window.location.hash.startsWith('#work-')) {
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }
}

// 모달 열기 (원형 애니메이션)
const openWorkModal = async (workId, event = null) => {
  if (!circleRevealRef.value) return

  // 이전 애니메이션 정리
  gsap.killTweensOf(circleRevealRef.value)

  // 시작 위치 결정
  const position = getCircleStartPosition(event)

  // 원형 요소 초기 설정
  initializeCircleElement(circleRevealRef.value, position)

  // 모달은 먼저 숨김 상태로 설정
  activeWorkId.value = workId
  isModalVisible.value = false
  setWorkHash(workId)
  lockBodyScroll()

  // DOM이 업데이트될 때까지 대기
  await nextTick()

  // 모달 요소가 준비될 때까지 추가 대기
  await nextTick()

  // 모달 요소 접근
  const modalEl = workModalRef.value?.$el

  if (!modalEl) {
    console.warn('모달 요소를 찾을 수 없습니다.')
    return
  }

  // 원형 확대 애니메이션 생성
  const timeline = createCircleRevealAnimation(circleRevealRef.value, modalEl, {
    isOptimized: isFixed('work-modal-perf'),
    onComplete: () => {
      isModalVisible.value = true
      currentCircleScale = null // 애니메이션 완료 후 스케일 초기화
    },
  })

  // 현재 스케일 저장 (닫기 애니메이션을 위해)
  if (timeline) {
    // GSAP 타임라인에서 첫 번째 tween의 목표 스케일 값 가져오기
    const firstTween = timeline.getChildren()[0]
    if (firstTween && firstTween.vars && firstTween.vars.scale) {
      currentCircleScale = firstTween.vars.scale
    }
  }
}

// 모달 닫기 (원형 애니메이션 역순)
const closeWorkModal = () => {
  const modalEl = workModalRef.value?.$el

  createCircleCloseAnimation(circleRevealRef.value, modalEl, currentCircleScale, {
    onComplete: () => {
      activeWorkId.value = null
      isModalVisible.value = false
      setWorkHash(null)
      unlockBodyScroll()
      currentCircleScale = null
    },
  })
}

// 해시 변경 감지
const handleHashChange = () => {
  const workId = getWorkIdFromHash()
  if (workId) {
    // 해시가 있으면 모달 열기 (애니메이션 없이)
    if (activeWorkId.value !== workId) {
      activeWorkId.value = workId
      isModalVisible.value = true
      lockBodyScroll()
      const modalEl = workModalRef.value?.$el
      if (modalEl) {
        modalEl.classList.add(IS_VISIBLE_CLASS)
        gsap.set(modalEl, { autoAlpha: 1 })
      }
    }
  } else {
    // 해시가 없으면 모달 닫기
    if (activeWorkId.value !== null) {
      closeWorkModal()
    }
  }
}

// Esc 키 처리
const handleEscKey = (event) => {
  if (event.key === 'Escape' && activeWorkId.value) {
    closeWorkModal()
  }
}

onMounted(() => {
  setupScrollTrigger()

  // 초기 해시 확인
  const initialWorkId = getWorkIdFromHash()
  if (initialWorkId) {
    activeWorkId.value = initialWorkId
    isModalVisible.value = true
    lockBodyScroll()
  }

  // 원형 요소 초기 숨김
  if (circleRevealRef.value) {
    gsap.set(circleRevealRef.value, { autoAlpha: 0 })
  }

  // 해시 변경 감지
  window.addEventListener('hashchange', handleHashChange)
  // Esc 키 감지
  window.addEventListener('keydown', handleEscKey)

  // 리사이즈 처리
  window.addEventListener('resize', () => {
    setupScrollTrigger()
    ScrollTrigger.refresh()
  })

  // provide/inject로 works 데이터 공유
  if (setWorksData) {
    setWorksData(works)
  }

  // provide/inject로 work 선택 콜백 등록
  if (setSelectWorkCallback) {
    setSelectWorkCallback(async (workId) => {
      // 검색창이 열려있을 때는 검색창 위치에서 시작
      await nextTick()

      const searchContainer = document.querySelector('.search-container')
      let searchPosition = null

      if (searchContainer) {
        const rect = searchContainer.getBoundingClientRect()
        searchPosition = {
          clientX: rect.left + rect.width / 2,
          clientY: rect.top + rect.height / 2,
        }
      }

      await openWorkModal(workId, searchPosition)
    })
  }
})

onUnmounted(() => {
  if (titleAnimation) {
    titleAnimation.kill()
    titleAnimation = null
  }
  if (workTitleRef.value) {
    gsap.killTweensOf(workTitleRef.value)
  }
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

  // 이벤트 리스너 제거
  window.removeEventListener('hashchange', handleHashChange)
  window.removeEventListener('keydown', handleEscKey)

  // body 스크롤 해제
  unlockBodyScroll()

  // 원형 요소 정리
  if (circleRevealRef.value) {
    gsap.killTweensOf(circleRevealRef.value)
  }
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

.work-section {
  width: 100%;
  padding: 120px 40px;
  position: relative;
}

.work-container {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr;
  grid-template-rows: auto;
  gap: 40px;
  width: 100%;
}

.work-title {
  width: 100%;
  height: auto;
  max-width: 200px;
  display: block;
  margin: 0 0 60px 0;
  grid-column: 1;
  grid-row: 1;
}

.work-title-text {
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: var(--display--1);
  font-weight: var(--font-weight--bold);
  font-weight: 700;
  fill: rgb(var(--gray--1));
  letter-spacing: -0.02em;
}

.work-grid {
  grid-column: 2 / 4;
  grid-row: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
}

.work-item {
  display: flex;
  flex-direction: column;
  gap: 20px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  position: relative;
}

.work-item:hover {
  opacity: 0.8;
}

.work-image-placeholder {
  width: 100%;
  aspect-ratio: 1;
  background-color: rgb(var(--gray--5s));
  border-radius: 8px;
}

.work-title {
  font-size: var(--headline--1);
  font-weight: var(--font-weight--medium);
  font-weight: 500;
  color: rgb(var(--gray--1));
  margin: 0;
}

.work-description {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  line-height: 1.6;
  color: rgb(var(--gray--1));
  margin: 0;
}

.circle-reveal {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9998;
  transform-origin: center center;
}

.circle-reveal.is-optimized {
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Tablet: --tablet */
@media (--tablet) {
  .work-section {
    padding: 60px 30px;
  }

  .work-container {
    grid-template-columns: 1fr 3fr;
    grid-template-rows: auto;
    gap: 30px;
  }

  .work-title {
    margin-bottom: 40px;
  }

  .work-title-text {
    font-size: var(--display--2);
    font-weight: var(--font-weight--bold);
  }

  .work-grid {
    grid-column: 2;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
}

/* Mobile: --mobile */
@media (--mobile) {
  .work-section {
    padding: 40px 20px;
  }

  .work-container {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, auto);
    gap: 24px;
  }

  .work-title {
    margin-bottom: 30px;
    grid-column: 1;
    grid-row: 1;
  }

  .work-title-text {
    font-size: var(--title--1);
    font-weight: var(--font-weight--bold);
  }

  .work-grid {
    grid-column: 1;
    grid-row: 2;
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .work-title {
    font-size: var(--headline--1);
    font-weight: var(--font-weight--medium);
  }

  .work-description {
    font-size: var(--body--2--normal);
    font-weight: var(--font-weight--regular);
  }
}
</style>
