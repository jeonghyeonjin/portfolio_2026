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
          :class="{
            'has-footer': work.footer,
            'link-count-1': getLinkCount(work.footer) === 1,
            'link-count-2': getLinkCount(work.footer) >= 2,
          }"
          role="button"
          tabindex="0"
          :aria-label="`${work.title} 상세 보기`"
          :ref="(el) => setWorkItemRef(el, work.id)"
          @click="(e) => openWorkModal(work.id, e)"
          @keydown.enter="(e) => openWorkModal(work.id, e)"
          @keydown.space.prevent="(e) => openWorkModal(work.id, e)"
          @mouseenter="(e) => handleWorkHover(e, work.id, true)"
          @mouseleave="(e) => handleWorkHover(e, work.id, false)"
        >
          <div class="work-image-container" aria-hidden="true">
            <video v-if="work.videoSources" class="work-video" autoplay loop muted playsinline>
              <source :src="work.videoSources.webm" type="video/webm" />
              <source :src="work.videoSources.mp4" type="video/mp4" />
            </video>
            <img
              v-else-if="work.thumbnail"
              :src="getThumbnailUrl(work.thumbnail)"
              :alt="`${work.title} 대표 이미지`"
              class="work-image"
            />
            <div v-else class="work-image-placeholder"></div>
            <div class="work-overlay"></div>

            <div v-if="work.chips && work.chips.length > 0" class="work-chips-container">
              <WorkChip
                v-for="(chip, index) in work.chips"
                :key="`${work.id}-${index}`"
                :label="chip.label"
                :variant="chip.variant"
              />
            </div>

            <div class="work-info">
              <h3 class="work-info-title">{{ work.title }}</h3>
              <p class="work-info-description">{{ work.description }}</p>
            </div>

            <!-- Work Item Footer Area (Caption style) -->
            <div v-if="work.footer" class="work-item-footer" @click.stop>
              <div class="footer-links">
                <a
                  v-if="work.footer.githubLink"
                  :href="work.footer.githubDisabled ? undefined : work.footer.githubLink"
                  :target="work.footer.githubDisabled ? undefined : '_blank'"
                  :rel="work.footer.githubDisabled ? undefined : 'noopener noreferrer'"
                  class="footer-link footer-link-github"
                  :class="{ 'is-disabled': work.footer.githubDisabled }"
                  @click.stop="work.footer.githubDisabled ? $event.preventDefault() : null"
                  :aria-label="work.footer.githubDisabled ? 'GitHub 저장소 (비활성화)' : 'GitHub 저장소 열기'"
                  :aria-disabled="work.footer.githubDisabled"
                >
                  <img src="@/assets/images/icons/github.svg" alt="GitHub" class="footer-icon" />
                </a>
                <a
                  v-if="work.footer.externalLink"
                  :href="work.footer.externalDisabled ? undefined : work.footer.externalLink"
                  :target="work.footer.externalDisabled ? undefined : '_blank'"
                  :rel="work.footer.externalDisabled ? undefined : 'noopener noreferrer'"
                  class="footer-link footer-link-external"
                  :class="{ 'is-disabled': work.footer.externalDisabled }"
                  @click.stop="work.footer.externalDisabled ? $event.preventDefault() : null"
                  :aria-label="work.footer.externalDisabled ? '외부 링크 (비활성화)' : '외부 링크 열기'"
                  :aria-disabled="work.footer.externalDisabled"
                >
                  <img
                    src="@/assets/images/icons/external_link.svg"
                    alt="External link"
                    class="footer-icon"
                  />
                </a>
              </div>
            </div>
          </div>
          <Transition name="issue-marker">
            <div
              v-if="index === 2 && !isFixed('work-modal-perf') && isMarkersReady"
              class="issue-marker-wrapper"
              style="top: 20px; right: 20px"
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
    <!-- <Teleport to="body"> -->
    <WorkModal
      ref="workModalRef"
      v-if="activeWorkId"
      :work-id="activeWorkId"
      :is-visible="isModalVisible"
      @close="closeWorkModal"
    />
    <!-- </Teleport> -->
  </section>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import WorkModal from './works/WorkModal.vue'
import WorkChip from '@/components/common/WorkChip.vue'
import IssueMarker from '@/components/broken/IssueMarker.vue'
import { useBrokenPortfolio } from '@/composables/useBrokenPortfolio'
import { useResponsive } from '@/composables/useResponsive'
import { useBodyScrollLock } from '@/composables/useBodyScrollLock'
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
const { lock: lockBodyScroll, unlock: unlockBodyScroll } = useBodyScrollLock()

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
const WORK_MODAL_ID = 'work-modal'

// work-item ref 설정
const setWorkItemRef = (el, workId) => {
  if (el) {
    workItemRefs.value[workId] = el
  }
}

// 외부 데이터를 불러와서 Object.freeze로 최적화
const works = Object.freeze(worksData.map((work) => Object.freeze(work)))

// 썸네일 URL 처리 함수
const getThumbnailUrl = (thumbnailPath) => {
  if (!thumbnailPath) return null
  try {
    // 상대 경로를 new URL()로 처리 (Vite가 빌드 시 올바른 경로로 변환)
    return new URL(thumbnailPath, import.meta.url).href
  } catch {
    return thumbnailPath
  }
}

// 링크 개수 계산 함수
const getLinkCount = (footer) => {
  if (!footer) return 0
  let count = 0
  if (footer.externalLink) count++
  if (footer.githubLink) count++
  return count
}

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

// Work 아이템 호버 핸들러
const handleWorkHover = (_event, workId, isEntering) => {
  const workItem = workItemRefs.value[workId]
  if (!workItem) return

  const overlay = workItem.querySelector('.work-overlay')
  const chipsContainer = workItem.querySelector('.work-chips-container')
  const chips = chipsContainer ? chipsContainer.querySelectorAll('.work-chip') : []
  const info = workItem.querySelector('.work-info')
  const title = workItem.querySelector('.work-info-title')
  const description = workItem.querySelector('.work-info-description')

  if (isEntering) {
    // Hover 진입
    gsap.to(overlay, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    })

    // 칩들 순차적으로 등장
    if (chips.length > 0) {
      chips.forEach((chip, index) => {
        gsap.fromTo(
          chip,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            delay: index * 0.05,
            ease: 'back.out(1.7)',
          },
        )
      })
    }

    gsap.to(info, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    })
    gsap.fromTo(
      title,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        delay: 0.1,
        ease: 'power2.out',
      },
    )
    gsap.fromTo(
      description,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        delay: 0.15,
        ease: 'power2.out',
      },
    )
  } else {
    // Hover 종료 - 모든 애니메이션 kill 후 초기 상태로 복원
    gsap.killTweensOf([overlay, ...chips, info, title, description])

    gsap.to(overlay, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
    })

    if (chips.length > 0) {
      gsap.to(chips, {
        scale: 0.8,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      })
    }

    gsap.to(info, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
    })
    // 텍스트 위치도 초기화
    gsap.to([title, description], {
      y: 20,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
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
  lockBodyScroll(WORK_MODAL_ID)

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
      unlockBodyScroll(WORK_MODAL_ID)
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
      lockBodyScroll(WORK_MODAL_ID)
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

onMounted(async () => {
  setupScrollTrigger()

  // 원형 요소 초기 숨김
  if (circleRevealRef.value) {
    gsap.set(circleRevealRef.value, { autoAlpha: 0 })
  }

  // 초기 해시 확인 (새로고침 또는 직접 URL 접근)
  const initialWorkId = getWorkIdFromHash()
  if (initialWorkId) {
    activeWorkId.value = initialWorkId
    isModalVisible.value = true
    lockBodyScroll(WORK_MODAL_ID)

    // DOM이 준비될 때까지 대기
    await nextTick()
    await nextTick()

    // 모달 요소에 즉시 표시 클래스 적용
    const modalEl = workModalRef.value?.$el
    if (modalEl) {
      modalEl.classList.add(IS_VISIBLE_CLASS)
      gsap.set(modalEl, { autoAlpha: 1 })
    }
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
  unlockBodyScroll(WORK_MODAL_ID)

  // 원형 요소 정리
  if (circleRevealRef.value) {
    gsap.killTweensOf(circleRevealRef.value)
  }
})
</script>

<style>
/* Global CSS variable definition for animation */
@property --_x {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}
</style>

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
  grid-template-columns: 1fr 3fr;
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
  grid-column: 2;
  grid-row: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.work-item {
  cursor: pointer;
  position: relative;
}

/* Footer가 있을 때만 inverse radius mask effect 적용 */
.work-item.has-footer {
  /* Setup for the inverse radius mask effect */
  --r: 30px; /* radius matching the container */
  transition: --_x 0.5s;

  /* 기본 너비 설정 */
  --base-width: 50px; /* 기본 너비 */
  --_x: 0px; /* 기본 확장값 */
}

.work-item.link-count-1 {
  --base-width: 50px; /* 링크 1개일 때 기본 너비 */
  --_x: 0px; /* 확장 없음 */
}

.work-item.link-count-2 {
  --base-width: 90px; /* 링크 2개일 때 기본 너비 */
  --_x: 40px;
}

/* 링크가 2개 이하일 때는 hover 시 확장 없음 */
.work-item.link-count-1:hover,
.work-item.link-count-2:hover {
}

/* 링크가 3개 이상일 때만 hover 시 확장 (미래 확장 가능) */
.work-item.has-footer:hover:not(.link-count-1):not(.link-count-2) {
  --_x: calc(var(--base-width) - 50px + 50px); /* 추가 확장 */
}

.work-image-container {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  z-index: 0;
}

/* 기본 스타일 */
.work-video,
.work-image,
.work-image-placeholder,
.work-overlay {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left top;
  border-radius: 20px; /* Ensure content follows border radius */
}

/* Footer가 있을 때만 mask 적용 */
.work-item.has-footer .work-video,
.work-item.has-footer .work-image,
.work-item.has-footer .work-image-placeholder,
.work-item.has-footer .work-overlay {
  /* The dynamic inverse radius mask */
  --_m: /calc(2 * var(--r)) calc(2 * var(--r)) radial-gradient(#000 69%, #0000 72%);
  --_g: conic-gradient(
    from 90deg at calc(100% - var(--r)) calc(100% - var(--r)),
    #0000 25%,
    #000 0
  );
  --_d: (30px + var(--r)); /* Height of footer area rough estimate */

  /* 기본 상태에서도 50px 정도는 보여야 함 */
  /* --_x 기본값이 0일 때, 50px 정도 보이도록 설정 */

  mask:
    calc(100% - var(--_d) - var(--_x)) 100% var(--_m),
    100% calc(100% - var(--_d)) var(--_m),
    radial-gradient(30px at 100% 100%, #0000 99%, #000 calc(100% + 1px))
      calc(-1 * var(--r) - var(--_x)) calc(-1 * var(--r)),
    var(--_g) calc(-1 * var(--_d) - var(--_x)) 0,
    var(--_g) 0 calc(-1 * var(--_d));
  mask-repeat: no-repeat;
  /* Add standard mask for top rounded corners preservation if needed, but border-radius handles it usually */
}

/* Footer Area Styles - behaves like figcaption */
.work-item-footer {
  position: absolute;
  bottom: -10px;
  right: -10px;
  height: 50px; /* Matches the _d roughly (30px + r=20 = 50) */
  width: calc(var(--base-width, 50px) + var(--_x, 0px));
  box-sizing: border-box;
  /* Translate to sit in the corner properly */
  translate: calc(20px - var(--r)) calc(20px - var(--r));
  overflow: hidden;
  background: transparent;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 5px;
  /* clip-path to make it look nice */
  clip-path: inset(0 0 0 0 round 20px);
  z-index: 10;
  transition: width 0s; /* Fallback for --_x if property not supported */
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 2px;
  opacity: 1; /* 항상 보이도록 변경 */
  transition: opacity 0.5s;
}

/* .work-item:hover .footer-links {
  opacity: 1;
} */

.footer-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  text-decoration: none;
}

.footer-link.is-disabled {
  pointer-events: auto;
  cursor: default !important;
  opacity: 0.4;
}

.footer-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  /* gray--5s (117, 117, 117) 색상으로 설정 */
  /* 검은색 → 흰색 → 회색: brightness(0) invert(1) brightness(0.46) */
  filter: brightness(0) invert(1) brightness(0.46);
  /* 117/255 ≈ 0.46 */
  transition: filter 0.2s;
}

.footer-link:not(.is-disabled):hover .footer-icon {
  /* gray--1 (40, 40, 40) 색상으로 변경 */
  /* 검은색 → 흰색 → 어두운 회색: brightness(0) invert(1) brightness(0.16) */
  filter: brightness(0) invert(1) brightness(0.16);
  /* 40/255 ≈ 0.16 */
}

.footer-link.is-disabled .footer-icon {
  /* disabled 상태에서는 더 어둡게 */
  filter: brightness(0) invert(1) brightness(0.3);
}

/* hover 시 배경색 변화 방지 */
.footer-link:hover {
  background-color: transparent;
}

.work-image-placeholder {
  background-color: rgb(var(--gray--5s));
}

.work-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(var(--gray--0), 0.85);
  opacity: 0;
  z-index: 1;
  pointer-events: none;
}

.work-chips-container {
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  gap: 8px;
  z-index: 2;
  pointer-events: none;
}

.work-chips-container :deep(.work-chip) {
  opacity: 0;
}

.work-info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  opacity: 0;
  z-index: 2;
  pointer-events: none;
  text-align: center;
}

.work-info-title {
  font-size: var(--display--2);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--white--0));
  margin: 0 0 12px 0;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.work-info-description {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  line-height: 1.6;
  color: rgb(var(--white--3));
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

  .work-title-text {
    font-size: var(--display--1);
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
