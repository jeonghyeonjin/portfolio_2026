<template>
  <div class="work-modal-content">
    <div ref="workModalHeaderRef" class="work-modal-header">
      <h1 class="work-modal-title">{{ workData?.title || '' }}</h1>
      <p class="work-modal-subtitle">
        {{ workData?.description || '' }}
      </p>
      <div ref="producthuntBadgeRef" class="producthunt-badge">
        <img
          src="@/assets/images/producthunt/dailybadge2.avif"
          alt="Product Hunt Daily #2"
          class="producthunt-badge-icon"
        />
        <div class="producthunt-badge-text">
          <span class="producthunt-badge-label">Product Hunt Daily #2</span>
          <span class="producthunt-badge-date">February 23rd, 2023</span>
        </div>
      </div>
      <div ref="heroImageOverlayRef" class="hero-image-overlay"></div>
    </div>

    <div ref="heroImageContainerRef" class="hero-image-container">
      <div ref="heroImageWrapperRef" class="hero-image-wrapper">
        <img :src="heroThumbnailUrl" alt="Tape Dashboard" class="hero-image" />
      </div>
    </div>

    <div class="work-modal-body">
      <!-- Project Overview -->
      <section
        class="content-section"
        v-if="modalData.sections?.projectOverview"
        id="tape-overview"
      >
        <h2 class="section-title">{{ modalData.sections.projectOverview.title }}</h2>
        <p class="section-text text-ko">{{ modalData.sections.projectOverview.paragraphs.ko }}</p>
        <p class="section-text text-en">{{ modalData.sections.projectOverview.paragraphs.en }}</p>
        <!-- <div class="video-container">
          <video autoplay loop muted playsinline class="demo-video">
            <source src="/videos/tape/tape_test.webm" type="video/webm" />
            <source src="/videos/tape/tape_test.mp4" type="video/mp4" />
          </video>
        </div> -->
        <div class="screenshots-grid">
          <img
            src="@/assets/images/works/tape/tape_screenshot1.png"
            alt="Tape Screenshot 1"
            class="screenshot-image"
          />
          <!-- <img
            src="@/assets/images/works/tape/tape_screenshot2.png"
            alt="Tape Screenshot 2"
            class="screenshot-image"
          /> -->
          <img
            src="@/assets/images/works/tape/tape_screenshot3.png"
            alt="Tape Screenshot 3"
            class="screenshot-image"
          />
          <img
            src="@/assets/images/works/tape/tape_screenshot4.png"
            alt="Tape Screenshot 4"
            class="screenshot-image"
          />
        </div>
      </section>

      <!-- Tech Stack -->
      <section class="content-section" v-if="modalData.sections?.techStack" id="tape-tech">
        <h2 class="section-title">{{ modalData.sections.techStack.title }}</h2>
        <TechStackGrid :stacks="techStacks" />
      </section>

      <!-- Key Contributions -->
      <section
        class="content-section"
        v-if="modalData.sections?.keyContributions"
        id="tape-features"
      >
        <h2 class="section-title">{{ modalData.sections.keyContributions.title }}</h2>
        <template v-for="(feature, index) in modalData.features" :key="index">
          <div class="feature-block" :ref="(el) => setFeatureBlockRef(el, index)">
            <div class="feature-content">
              <div class="feature-text" :ref="(el) => setFeatureTextRef(el, index)">
                <h3 class="feature-title">{{ feature.title }}</h3>

                <template v-if="feature.scope">
                  <p class="section-text">
                    <strong>{{ feature.scope.label }}</strong>
                  </p>
                  <ul class="feature-list">
                    <li
                      v-for="(item, itemIndex) in feature.scope.items"
                      :key="itemIndex"
                      v-html="item"
                    ></li>
                  </ul>
                </template>

                <template v-if="feature.challenge">
                  <p class="section-text">
                    <strong>{{ feature.challenge.label }}</strong>
                  </p>
                  <ul class="feature-list">
                    <li v-for="(item, itemIndex) in feature.challenge.items" :key="itemIndex">
                      {{ item }}
                    </li>
                  </ul>
                </template>

                <template v-if="feature.solution">
                  <p class="section-text">
                    <strong>{{ feature.solution.label }}</strong>
                  </p>
                  <ul class="feature-list">
                    <li
                      v-for="(item, itemIndex) in feature.solution.items"
                      :key="itemIndex"
                      v-html="item"
                    ></li>
                  </ul>
                </template>

                <template v-if="feature.deliverables">
                  <p class="section-text">
                    <strong>{{ feature.deliverables.label }}</strong>
                  </p>
                  <ul class="feature-list">
                    <li v-for="(item, itemIndex) in feature.deliverables.items" :key="itemIndex">
                      {{ item }}
                    </li>
                  </ul>
                </template>

                <template v-if="feature.impact">
                  <p class="section-text">
                    <strong>{{ feature.impact.label }}</strong>
                  </p>
                  <ul class="feature-list">
                    <li v-for="(item, itemIndex) in feature.impact.items" :key="itemIndex">
                      {{ item }}
                    </li>
                  </ul>
                </template>
              </div>
              <div class="feature-image-wrapper">
                <ChannelListDemo v-if="index === 0" ref="channelListDemoRef" />
                <VideoDetailDemo v-if="index === 0 && !isMobile" ref="videoDetailDemoRef" />
                <EmojiFeedbackDemo v-if="index === 1" ref="emojiFeedbackDemoRef" />
                <img
                  v-if="index === 2"
                  src="@/assets/images/works/tape/tape_clip_type.png"
                  alt="Tape Clip Types"
                  class="feature-image"
                />
              </div>
            </div>
            <div v-if="feature.codeKey" class="feature-code-wrapper">
              <CodeBlock :code="modalData.codeSnippets[feature.codeKey]" />
            </div>
          </div>
        </template>
      </section>

      <!-- Performance Metrics -->
      <section
        class="content-section"
        v-if="modalData.sections?.performanceImpact"
        id="tape-metrics"
      >
        <h2 class="section-title">{{ modalData.sections.performanceImpact.title }}</h2>
        <MetricsGrid :metrics="performanceMetrics" />
      </section>

      <!-- Key Takeaways -->
      <section class="content-section" v-if="modalData.sections?.keyTakeaways" id="tape-takeaways">
        <h2 class="section-title">{{ modalData.sections.keyTakeaways.title }}</h2>

        <div v-for="(takeaway, index) in modalData.takeaways" :key="index" class="takeaway-block">
          <h3 class="takeaway-title">{{ takeaway.title }}</h3>
          <ul class="feature-list">
            <li v-for="(item, itemIndex) in takeaway.items" :key="itemIndex" v-html="item"></li>
          </ul>
        </div>
      </section>
    </div>

    <WorkModalTOC v-if="!isMobile" :sections="tocSections" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, inject, computed } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useResponsive } from '@/composables/useResponsive'
import CodeBlock from '@/components/common/CodeBlock.vue'
import MetricsGrid from '@/components/common/MetricsGrid.vue'
import TechStackGrid from '@/components/common/TechStackGrid.vue'
import EmojiFeedbackDemo from './demos/EmojiFeedbackDemo.vue'
import ChannelListDemo from './demos/ChannelListDemo.vue'
import VideoDetailDemo from './demos/VideoDetailDemo.vue'
import WorkModalTOC from '@/components/common/WorkModalTOC.vue'
import worksData from '@/data/works.json'
import modalData from '@/data/modals/WorkModalTape.json'

const workId = inject('workId', 4)

// ScrollTrigger instances management
const scrollTriggers = ref([])
const retryTimeouts = ref([])
const MAX_RETRY_ATTEMPTS = 3

const workData = computed(() => {
  return worksData.find((work) => work.id === workId) || null
})

// 히어로 이미지 URL (public 폴더의 파일은 BASE_URL 사용)
const heroThumbnailUrl = computed(() => {
  return `${import.meta.env.BASE_URL}videos/tape/tape_thumbnail-front.png`
})

gsap.registerPlugin(ScrollTrigger)

const workModalHeaderRef = ref(null)
const producthuntBadgeRef = ref(null)
const heroImageContainerRef = ref(null)
const heroImageOverlayRef = ref(null)
const heroImageWrapperRef = ref(null)
const { isMobile } = useResponsive()
const emojiFeedbackDemoRef = ref(null)
const channelListDemoRef = ref(null)
const videoDetailDemoRef = ref(null)

// Dynamic refs for features
const featureBlockRefs = ref([])
const featureTextRefs = ref([])

const setFeatureBlockRef = (el, index) => {
  if (el) {
    featureBlockRefs.value[index] = el
  }
}

const setFeatureTextRef = (el, index) => {
  if (el) {
    featureTextRefs.value[index] = el
  }
}

// Helper function to create and track ScrollTrigger
const createScrollTrigger = (animation) => {
  if (!animation || !animation.scrollTrigger) return
  scrollTriggers.value.push(animation.scrollTrigger)
}

// Helper function to add retry timeout
const addRetryTimeout = (timeoutId) => {
  retryTimeouts.value.push(timeoutId)
}

const setupFeatureTextAnimation = (textRef, retryCount = 0) => {
  if (!textRef) return

  const modalOverlay = document.querySelector('.work-modal-container')
  if (!modalOverlay) return

  // 요소가 실제로 DOM에 있고 크기가 있는지 확인
  if (!textRef.offsetParent && textRef.offsetWidth === 0 && textRef.offsetHeight === 0) {
    // Retry with limit
    if (retryCount < MAX_RETRY_ATTEMPTS) {
      const timeoutId = setTimeout(() => {
        setupFeatureTextAnimation(textRef, retryCount + 1)
      }, 100)
      addRetryTimeout(timeoutId)
    }
    return
  }

  try {
    gsap.set(textRef, {
      x: -100,
      opacity: 0,
    })

    const scrollTriggerConfig = {
      trigger: textRef,
      scroller: modalOverlay,
      start: 'top 80%',
      end: 'top 50%',
      toggleActions: 'play none none reverse',
      invalidateOnRefresh: true,
    }

    if (!scrollTriggerConfig.trigger || !scrollTriggerConfig.scroller) {
      console.warn('ScrollTrigger params are not set properly')
      return
    }

    const animation = gsap.to(textRef, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: scrollTriggerConfig,
    })

    createScrollTrigger(animation)
  } catch (error) {
    console.warn('Feature text animation setup failed:', error)
  }
}

const setupDemoAnimation = (demoRef, retryCount = 0) => {
  if (!demoRef) return

  const modalOverlay = document.querySelector('.work-modal-container')
  if (!modalOverlay) return

  // Vue 컴포넌트인 경우 $el 사용, 일반 요소인 경우 직접 사용
  const demoElement = demoRef.$el || demoRef
  if (!demoElement) return

  // DOM 요소인지 확인 (HTMLElement인지 확인)
  if (!(demoElement instanceof HTMLElement)) {
    return
  }

  // 요소가 실제로 DOM에 있고 크기가 있는지 확인
  if (
    !demoElement.offsetParent &&
    demoElement.offsetWidth === 0 &&
    demoElement.offsetHeight === 0
  ) {
    // Retry with limit
    if (retryCount < MAX_RETRY_ATTEMPTS) {
      const timeoutId = setTimeout(() => {
        setupDemoAnimation(demoRef, retryCount + 1)
      }, 100)
      addRetryTimeout(timeoutId)
    }
    return
  }

  try {
    // 초기 상태: 오른쪽으로 이동하고 투명하게
    gsap.set(demoElement, {
      x: 100,
      opacity: 0,
    })

    const scrollTriggerConfig = {
      trigger: demoElement,
      scroller: modalOverlay,
      start: 'top 80%',
      end: 'top 50%',
      toggleActions: 'play none none reverse',
      invalidateOnRefresh: true,
    }

    // ScrollTrigger 파라미터 검증
    if (!scrollTriggerConfig.trigger || !scrollTriggerConfig.scroller) {
      console.warn('ScrollTrigger params are not set properly')
      return
    }

    // 스크롤 트리거로 애니메이션
    const animation = gsap.to(demoElement, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: scrollTriggerConfig,
    })

    createScrollTrigger(animation)
  } catch (error) {
    console.warn('Demo animation setup failed:', error)
  }
}

const setupFeatureBlockAnimation = (blockRef, index = 0, retryCount = 0) => {
  if (!blockRef) return

  const modalOverlay = document.querySelector('.work-modal-container')
  if (!modalOverlay) return

  // 요소가 실제로 DOM에 있고 크기가 있는지 확인
  if (!blockRef.offsetParent && blockRef.offsetWidth === 0 && blockRef.offsetHeight === 0) {
    // Retry with limit
    if (retryCount < MAX_RETRY_ATTEMPTS) {
      const timeoutId = setTimeout(() => {
        setupFeatureBlockAnimation(blockRef, index, retryCount + 1)
      }, 100)
      addRetryTimeout(timeoutId)
    }
    return
  }

  try {
    gsap.set(blockRef, {
      y: 50,
      opacity: 0,
    })

    const scrollTriggerConfig = {
      trigger: blockRef,
      scroller: modalOverlay,
      start: 'top 90%',
      end: 'top 60%',
      toggleActions: 'play none none reverse',
      invalidateOnRefresh: true,
    }

    if (!scrollTriggerConfig.trigger || !scrollTriggerConfig.scroller) {
      console.warn('ScrollTrigger params are not set properly')
      return
    }

    const animation = gsap.to(blockRef, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      delay: index * 0.1,
      scrollTrigger: scrollTriggerConfig,
    })

    createScrollTrigger(animation)
  } catch (error) {
    console.warn('Feature block animation setup failed:', error)
  }
}

const setupBlockAnimation = (block, index = 0, retryCount = 0) => {
  if (!block) return

  const modalOverlay = document.querySelector('.work-modal-container')
  if (!modalOverlay) return

  // 요소가 실제로 DOM에 있고 크기가 있는지 확인
  if (!block.offsetParent && block.offsetWidth === 0 && block.offsetHeight === 0) {
    // Retry with limit
    if (retryCount < MAX_RETRY_ATTEMPTS) {
      const timeoutId = setTimeout(() => {
        setupBlockAnimation(block, index, retryCount + 1)
      }, 100)
      addRetryTimeout(timeoutId)
    }
    return
  }

  try {
    gsap.set(block, {
      y: 50,
      opacity: 0,
    })

    const scrollTriggerConfig = {
      trigger: block,
      scroller: modalOverlay,
      start: 'top 90%',
      end: 'top 60%',
      toggleActions: 'play none none reverse',
      invalidateOnRefresh: true,
    }

    if (!scrollTriggerConfig.trigger || !scrollTriggerConfig.scroller) {
      console.warn('ScrollTrigger params are not set properly')
      return
    }

    const animation = gsap.to(block, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      delay: index * 0.1,
      scrollTrigger: scrollTriggerConfig,
    })

    createScrollTrigger(animation)
  } catch (error) {
    console.warn('Block animation setup failed:', error)
  }
}

// Data from JSON
const performanceMetrics = modalData.performanceMetrics
const techStacks = modalData.techStacks

const tocSections = [
  { id: 'tape-overview', label: 'Project Overview' },
  { id: 'tape-tech', label: 'Tech Stack' },
  { id: 'tape-features', label: 'Key Contributions' },
  { id: 'tape-metrics', label: 'Performance Metrics' },
  { id: 'tape-takeaways', label: 'Key Takeaways' },
]

onMounted(() => {
  // Hero 이미지 스크롤 애니메이션
  if (heroImageContainerRef.value && heroImageWrapperRef.value) {
    const modalOverlay = document.querySelector('.work-modal-container')

    gsap.set(heroImageWrapperRef.value, { scale: isMobile.value ? 7 : 8 })

    if (modalOverlay && heroImageContainerRef.value) {
      try {
        const animation1 = gsap.to(heroImageWrapperRef.value, {
          scale: 1,
          scrollTrigger: {
            trigger: heroImageContainerRef.value,
            scroller: modalOverlay,
            start: 'top top',
            end: 'bottom center',
            scrub: 1,
            pin: true,
          },
        })
        createScrollTrigger(animation1)

        // Fade out elements - consolidated
        const elementsToFade = [
          heroImageOverlayRef.value,
          workModalHeaderRef.value,
          producthuntBadgeRef.value,
        ].filter(Boolean)
        if (elementsToFade.length > 0) {
          const animation3 = gsap.to(elementsToFade, {
            opacity: 0,
            scrollTrigger: {
              trigger: heroImageContainerRef.value,
              scroller: modalOverlay,
              start: 'top 0px',
              end: '50px',
              scrub: 1,
            },
          })
          createScrollTrigger(animation3)
        }
      } catch (error) {
        console.warn('Hero image animation setup failed:', error)
      }
    }
  }

  // Setup all animations - single nextTick
  nextTick(() => {
    // Feature blocks
    featureBlockRefs.value.forEach((blockRef, index) => {
      if (blockRef) {
        setupFeatureBlockAnimation(blockRef, index)
      }
    })

    // Feature texts
    featureTextRefs.value.forEach((textRef) => {
      if (textRef) {
        setupFeatureTextAnimation(textRef)
      }
    })

    // Demo animations
    setupDemoAnimation(emojiFeedbackDemoRef.value)
    setupDemoAnimation(channelListDemoRef.value)
    setupDemoAnimation(videoDetailDemoRef.value)

    // Other blocks
    const blocks = document.querySelectorAll('.tech-block, .challenge-block, .takeaway-block')
    blocks.forEach((block, index) => {
      setupBlockAnimation(block, index)
    })
  })
})

// Cleanup on unmount
onUnmounted(() => {
  // Kill all ScrollTrigger instances
  scrollTriggers.value.forEach((trigger) => {
    if (trigger) {
      trigger.kill()
    }
  })
  scrollTriggers.value = []

  // Clear all retry timeouts
  retryTimeouts.value.forEach((timeoutId) => {
    clearTimeout(timeoutId)
  })
  retryTimeouts.value = []

  // Refresh ScrollTrigger to clean up
  ScrollTrigger.refresh()
})
</script>

<style scoped>
@import '@/assets/styles/breakpoints.css';

.work-modal-content {
  width: 100%;
  min-height: 100vh;
  background-color: rgb(29, 41, 47);
}

.work-modal-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  height: auto;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hero-image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(var(--gray--0), 0.8);
}

.producthunt-badge {
  margin-top: 20px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 12px;
  pointer-events: none;
}

.producthunt-badge-icon {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.producthunt-badge-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.producthunt-badge-label {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--white--1));
  letter-spacing: -0.01em;
}

.producthunt-badge-date {
  font-size: var(--body--2--normal);
  font-weight: var(--font-weight--regular);
  color: rgb(var(--white--3));
}

.work-modal-title {
  font-size: var(--hero--1);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--white--1));
  letter-spacing: -0.02em;
  z-index: 1001;
}

.work-modal-subtitle {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  color: rgb(var(--white--3));
  z-index: 1001;
}

.work-modal-body {
  overflow: hidden;
}

.hero-image-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.hero-image {
  width: 100%;
  max-width: 1400px;
  height: auto;
  object-fit: contain;
  display: block;
  position: relative;
  z-index: 2;
}

/* Content Sections */
.content-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 40px;
}

.section-title {
  font-size: var(--title--1);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--white--1));
  margin: 0 0 30px 0;
  letter-spacing: -0.01em;
}

.section-text {
  font-size: var(--headline--1);
  font-weight: var(--font-weight--bold);
  line-height: 1.7;
  color: rgb(var(--white--1));
  margin: 0 0 20px 0;
}

.video-container {
  width: 100%;
  margin: 30px 0;
  border-radius: 12px;
  overflow: hidden;
}

.demo-video {
  width: 100%;
  height: auto;
  display: block;
}

.screenshots-grid {
  display: grid;
  grid-template-columns: repeat(1fr);
  gap: 20px;
  margin-top: 30px;
}

.screenshot-image {
  width: 100%;
  height: auto;
  border-radius: 12px;
  display: block;
  border: 1px solid rgba(var(--white--1), 0.2);
}

/* Feature Blocks */
.feature-block {
  margin-bottom: 60px;
  background-color: rgba(255, 255, 255, 0.02);
  border-radius: 24px;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.feature-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

.feature-code-wrapper {
  width: 100%;
  margin-top: 30px;
}

.feature-text {
  display: flex;
  flex-direction: column;
}

.feature-title {
  font-size: var(--heading--1);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--white--1));
  margin: 0 0 15px 0;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0 0 15px 0;
}

.feature-list li {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  line-height: 1.6;
  color: rgb(var(--white--2));
  margin-bottom: 8px;
  padding-left: 20px;
  position: relative;
}

.feature-image-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 20px;
}

.feature-placeholder {
  width: 100%;
  min-height: 300px;
  background-color: rgb(var(--gray--5s) / 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(var(--white--3));
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
}

.feature-video {
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(var(--gray--5), 0.15);
}

.feature-image {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: #0e1519;
}

.feature-videos-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  width: 100%;
}

.feature-video-small {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(var(--gray--5), 0.15);
}

/* Tech Blocks */
.tech-block {
  margin-bottom: 40px;
  background-color: rgba(255, 255, 255, 0.02);
  border-radius: 20px;
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.tech-title {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--white--1));
  margin: 0 0 15px 0;
}

.tech-desc {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--medium);
  color: rgb(var(--white--2));
  margin: 15px 0 10px 0;
}

/* Challenge Blocks */
.challenge-block {
  margin-bottom: 40px;
  background-color: rgba(255, 255, 255, 0.02);
  border-radius: 20px;
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.challenge-title {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--white--1));
  margin: 0 0 15px 0;
}

/* Takeaway Blocks */
.takeaway-block {
  margin-bottom: 30px;
  background-color: rgba(255, 255, 255, 0.02);
  border-radius: 20px;
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.takeaway-title {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--white--1));
  margin: 0 0 15px 0;
}

/* Language distinction */
.text-en {
  opacity: 0.8;
  margin-bottom: 24px;
  font-size: 0.95em;
}

.text-ko {
  color: rgb(var(--white--1));
  font-weight: var(--font-weight--medium);
}

p {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  line-height: 1.6;
  color: rgb(var(--white--1));
  margin: 0;
}

/* Tablet: --tablet */
@media (--tablet) {
  .work-modal-title {
    font-size: var(--hero--2);
    font-weight: var(--font-weight--bold);
  }

  .producthunt-badge-icon {
    width: 40px;
    height: 40px;
  }

  .content-section {
    padding: 40px 30px;
  }

  .section-title {
    font-size: var(--title--2);
  }

  .feature-content {
    gap: 30px;
  }
}

/* Mobile: --mobile */
@media (--mobile) {
  .work-modal-header {
    padding: 0 30px;
  }

  .work-modal-title {
    font-size: var(--hero--3);
    font-weight: var(--font-weight--bold);
  }

  .work-modal-subtitle {
    font-size: var(--body--2--normal);
    font-weight: var(--font-weight--regular);
  }

  .producthunt-badge-icon {
    width: 36px;
    height: 36px;
  }

  .producthunt-badge-label {
    font-size: var(--body--2--normal);
  }

  .producthunt-badge-date {
    font-size: var(--label--1--normal);
  }

  .work-modal-body {
    padding: 0px;
    margin-top: 50px;
  }

  .content-section {
    padding: 10px 20px;
    margin-bottom: 20px;
  }

  .section-title {
    font-size: var(--title--3);
  }

  .section-text {
    font-size: var(--body--1--normal);
    font-weight: var(--font-weight--regular);
  }

  .feature-block {
    padding: 20px;
    margin-bottom: 20px;
  }

  .feature-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .feature-image-wrapper {
    justify-content: center;
  }

  .feature-videos-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .hero-video {
    border-radius: 8px;
  }

  .screenshots-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
