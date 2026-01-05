<template>
  <div class="work-modal-content">
    <div ref="workModalHeaderRef" class="work-modal-header">
      <h1 class="work-modal-title">{{ workData?.title || '' }}</h1>
      <p class="work-modal-subtitle">{{ workData?.description || '' }}</p>
    </div>
    <div class="work-modal-body">
      <div ref="mockupContainerRef" class="mockup-container">
        <div ref="mockupWrapperRef" class="mockup-wrapper">
          <img
            src="@/assets/images/mockup/mockup_ipad_pro.png"
            alt="iPad Pro Mockup"
            class="mockup-frame"
          />
          <div class="mockup-screen">
            <div ref="mockupContainerInnerRef" class="mockup-container-inner"></div>
            <video
              ref="mockupVideoRef"
              autoplay
              loop
              muted
              playsinline
              preload="metadata"
              class="mockup-video"
            >
              <!-- MP4를 우선 사용 (용량이 더 작고 모든 브라우저 지원) -->
              <source :src="videoMp4Url" type="video/mp4" />
              <!-- WebM은 fallback으로만 사용 -->
              <source v-if="supportsWebM" :src="videoWebmUrl" type="video/webm" />
            </video>
          </div>
        </div>
      </div>

      <!-- Project Overview -->
      <section
        class="content-section"
        v-if="modalData.sections?.projectOverview"
        id="keeb-overview"
      >
        <h2 class="section-title">{{ modalData.sections.projectOverview.title }}</h2>
        <p class="section-text text-ko">{{ modalData.sections.projectOverview.paragraphs.ko }}</p>
        <p class="section-text text-en">{{ modalData.sections.projectOverview.paragraphs.en }}</p>
      </section>

      <!-- Key Features -->
      <section class="content-section" v-if="modalData.sections?.keyFeatures" id="keeb-features">
        <h2 class="section-title">{{ modalData.sections.keyFeatures.title }}</h2>

        <template v-for="(feature, index) in modalData.features" :key="index">
          <div class="feature-block" :ref="(el) => setFeatureBlockRef(el, index)">
            <div class="feature-content">
              <div class="feature-text" :ref="(el) => setFeatureTextRef(el, index)">
                <h3 class="feature-title">{{ feature.title }}</h3>
                <ul class="feature-list text-en">
                  <li v-for="(item, itemIndex) in feature.items.en" :key="itemIndex">{{ item }}</li>
                </ul>
                <ul class="feature-list text-ko">
                  <li v-for="(item, itemIndex) in feature.items.ko" :key="itemIndex">{{ item }}</li>
                </ul>
              </div>
              <div class="feature-image-wrapper">
                <TypingDemo v-if="index === 0 && !isMobile" ref="typingDemoRef" />
                <div v-else-if="index === 0 && isMobile" class="feature-placeholder-mobile">
                  <span>Typing Demo (Desktop Only)</span>
                </div>
                <KeyboardTesterDemo
                  v-else-if="index === 1 && !isMobile"
                  ref="keyboardTesterDemoRef"
                />
                <AchievementDemo v-else-if="index === 2" ref="achievementDemoRef" />
              </div>
            </div>
          </div>
        </template>
      </section>

      <!-- Design Features -->
      <section class="content-section" v-if="modalData.sections?.designFeatures" id="keeb-design">
        <h2 class="section-title">{{ modalData.sections.designFeatures.title }}</h2>

        <div class="feature-block" ref="designFeatureBlockRef">
          <div class="feature-content">
            <div class="feature-text" ref="designFeatureTextRef">
              <h3 class="feature-title">{{ modalData.designFeature.title }}</h3>
              <p class="section-text text-ko">{{ modalData.designFeature.description.ko }}</p>
              <p class="section-text text-en">{{ modalData.designFeature.description.en }}</p>
              <ul class="feature-list text-en">
                <li v-for="(item, index) in modalData.designFeature.items.en" :key="index">
                  {{ item }}
                </li>
              </ul>
              <ul class="feature-list text-ko">
                <li v-for="(item, index) in modalData.designFeature.items.ko" :key="index">
                  {{ item }}
                </li>
              </ul>
            </div>
            <div class="feature-image-wrapper">
              <PixelBorderDemo ref="pixelBorderDemoRef" />
            </div>
          </div>
        </div>
      </section>

      <!-- Technical Highlights -->
      <section
        class="content-section"
        v-if="modalData.sections?.technicalHighlights"
        id="keeb-tech-highlights"
      >
        <h2 class="section-title">{{ modalData.sections.technicalHighlights.title }}</h2>

        <template v-for="(techBlock, index) in modalData.techBlocks" :key="index">
          <div class="tech-block">
            <h3 class="tech-title">{{ techBlock.title }}</h3>
            <TreeDiagram v-if="techBlock.treeKey" :data="modalData.treeData[techBlock.treeKey]" />
            <p v-if="techBlock.description" class="tech-desc">{{ techBlock.description }}</p>
            <CodeBlock v-if="techBlock.codeKey" :code="modalData.codeSnippets[techBlock.codeKey]" />
            <ul class="feature-list">
              <li v-for="(item, itemIndex) in techBlock.items" :key="itemIndex">{{ item }}</li>
            </ul>
          </div>
        </template>
      </section>

      <!-- Component Architecture -->
      <section
        class="content-section"
        v-if="modalData.sections?.componentArchitecture"
        id="keeb-architecture"
      >
        <h2 class="section-title">{{ modalData.sections.componentArchitecture.title }}</h2>
        <TreeDiagram :data="componentArchitectureTree" />
      </section>

      <!-- Future Roadmap -->
      <section class="content-section" v-if="modalData.sections?.futureRoadmap" id="keeb-roadmap">
        <h2 class="section-title">{{ modalData.sections.futureRoadmap.title }}</h2>
        <div v-for="(phase, index) in modalData.roadmap" :key="index" class="roadmap-block">
          <h4 class="roadmap-phase">{{ phase.phase }}</h4>
          <ul class="feature-list">
            <li v-for="(item, itemIndex) in phase.items" :key="itemIndex">{{ item }}</li>
          </ul>
        </div>
      </section>

      <!-- Technical Challenges -->
      <section
        class="content-section"
        v-if="modalData.sections?.technicalChallenges"
        id="keeb-challenges"
      >
        <h2 class="section-title">{{ modalData.sections.technicalChallenges.title }}</h2>

        <div
          v-for="(challenge, index) in modalData.challenges"
          :key="index"
          class="challenge-block"
        >
          <h3 class="challenge-title">{{ challenge.title }}</h3>
          <p v-if="challenge.problem" class="section-text">{{ challenge.problem }}</p>
          <p v-if="challenge.solution" class="section-text">{{ challenge.solution }}</p>
          <CodeBlock v-if="challenge.codeKey" :code="modalData.codeSnippets[challenge.codeKey]" />
          <ul v-if="challenge.items" class="feature-list">
            <li v-for="(item, itemIndex) in challenge.items" :key="itemIndex">{{ item }}</li>
          </ul>
        </div>
      </section>

      <!-- Performance Metrics -->
      <section
        class="content-section"
        v-if="modalData.sections?.performanceMetrics"
        id="keeb-metrics"
      >
        <h2 class="section-title">{{ modalData.sections.performanceMetrics.title }}</h2>
        <MetricsGrid :metrics="performanceMetrics" />
      </section>

      <!-- Tech Stack -->
      <section class="content-section" v-if="modalData.sections?.techStackSummary" id="keeb-tech">
        <h2 class="section-title">{{ modalData.sections.techStackSummary.title }}</h2>
        <TechStackGrid :stacks="techStacks" theme="light" />
      </section>

      <!-- Key Takeaways -->
      <section class="content-section" v-if="modalData.sections?.keyTakeaways" id="keeb-takeaways">
        <h2 class="section-title">{{ modalData.sections.keyTakeaways.title }}</h2>

        <div v-for="(takeaway, index) in modalData.takeaways" :key="index" class="takeaway-block">
          <h3 class="takeaway-title">{{ takeaway.title }}</h3>
          <ul class="feature-list">
            <li v-for="(item, itemIndex) in takeaway.items" :key="itemIndex">{{ item }}</li>
          </ul>
        </div>
      </section>
    </div>

    <WorkModalTOC v-if="!isMobile" :sections="tocSections" theme="light" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, inject, computed, provide } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useResponsive } from '@/composables/useResponsive'
import TreeDiagram from '@/components/common/TreeDiagram.vue'
import CodeBlock from '@/components/common/CodeBlock.vue'
import MetricsGrid from '@/components/common/MetricsGrid.vue'
import TechStackGrid from '@/components/common/TechStackGrid.vue'
import WorkModalTOC from '@/components/common/WorkModalTOC.vue'
import TypingDemo from './demos/TypingDemo.vue'
import KeyboardTesterDemo from './demos/KeyboardTesterDemo.vue'
import PixelBorderDemo from './demos/PixelBorderDemo.vue'
import AchievementDemo from './demos/AchievementDemo.vue'
import worksData from '@/data/works.json'
import modalData from '@/data/modals/WorkModalKeebbear.json'

const workId = inject('workId', 3)

// 모달 배경색을 provide로 제공 (기본값: WorkModal.vue의 overlay 배경색)
provide('modalBackgroundColor', 'rgb(var(--white--1))')

// ScrollTrigger instances management
const scrollTriggers = ref([])
const retryTimeouts = ref([])
const MAX_RETRY_ATTEMPTS = 3

const workData = computed(() => {
  return worksData.find((work) => work.id === workId) || null
})

// WebM 지원 여부 확인 (fallback용)
const supportsWebM = computed(() => {
  if (typeof document === 'undefined') return false
  const video = document.createElement('video')
  return video.canPlayType('video/webm; codecs="vp9"') !== ''
})

// 비디오 URL (public 폴더의 파일은 BASE_URL 사용)
const videoWebmUrl = computed(() => {
  return `${import.meta.env.BASE_URL}videos/keebbear_1.webm`
})

const videoMp4Url = computed(() => {
  return `${import.meta.env.BASE_URL}videos/keebbear_1.mp4`
})

gsap.registerPlugin(ScrollTrigger)

const mockupContainerRef = ref(null)
const mockupWrapperRef = ref(null)
const mockupContainerInnerRef = ref(null)
const mockupVideoRef = ref(null)
const workModalHeaderRef = ref(null)
const typingDemoRef = ref(null)
const keyboardTesterDemoRef = ref(null)
const pixelBorderDemoRef = ref(null)
const achievementDemoRef = ref(null)
const designFeatureBlockRef = ref(null)
const designFeatureTextRef = ref(null)
const { isMobile, isTablet } = useResponsive()

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

const isLandscape = window.innerWidth > window.innerHeight

// Helper function to create and track ScrollTrigger
const createScrollTrigger = (animation) => {
  if (!animation || !animation.scrollTrigger) return
  scrollTriggers.value.push(animation.scrollTrigger)
}

// Helper function to add retry timeout
const addRetryTimeout = (timeoutId) => {
  retryTimeouts.value.push(timeoutId)
}

// Helper function to clear a specific timeout
// const clearRetryTimeout = (timeoutId) => {
//   clearTimeout(timeoutId)
//   const index = retryTimeouts.value.indexOf(timeoutId)
//   if (index > -1) {
//     retryTimeouts.value.splice(index, 1)
//   }
// }

const setupDemoAnimation = (demoRef, retryCount = 0) => {
  if (!demoRef) return

  // Mobile: skip complex animations
  if (isMobile.value) {
    const demoElement = demoRef.$el || demoRef
    if (demoElement instanceof HTMLElement) {
      gsap.set(demoElement, { x: 0, opacity: 1 })
    }
    return
  }

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

const setupFeatureTextAnimation = (textRef, retryCount = 0) => {
  if (!textRef) return

  // Mobile: skip complex animations
  if (isMobile.value) {
    gsap.set(textRef, { x: 0, opacity: 1 })
    return
  }

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
    // 초기 상태: 왼쪽으로 이동하고 투명하게
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

    // ScrollTrigger 파라미터 검증
    if (!scrollTriggerConfig.trigger || !scrollTriggerConfig.scroller) {
      console.warn('ScrollTrigger params are not set properly')
      return
    }

    // 스크롤 트리거로 애니메이션 (왼쪽에서 오른쪽으로)
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

const setupBlockAnimation = (block, index = 0, retryCount = 0) => {
  if (!block) return

  // Mobile: skip complex animations
  if (isMobile.value) {
    gsap.set(block, { y: 0, opacity: 1 })
    return
  }

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
    // 초기 상태: 아래로 이동하고 투명하게
    gsap.set(block, {
      y: 50,
      opacity: 0,
    })

    const scrollTriggerConfig = {
      trigger: block,
      scroller: modalOverlay,
      start: 'top 90%',
      end: 'top 60%',
      // toggleActions: 'play none none reverse',
      // invalidateOnRefresh: true,
    }

    // ScrollTrigger 파라미터 검증
    if (!scrollTriggerConfig.trigger || !scrollTriggerConfig.scroller) {
      console.warn('ScrollTrigger params are not set properly')
      return
    }

    // 스크롤 트리거로 애니메이션 (아래에서 위로)
    const animation = gsap.to(block, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      delay: index * 0.1, // 순차적 애니메이션을 위한 딜레이
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
const componentArchitectureTree = modalData.treeData.componentArchitectureTree

const tocSections = [
  { id: 'keeb-overview', label: 'Project Overview' },
  { id: 'keeb-features', label: 'Key Features' },
  { id: 'keeb-design', label: 'Design Features' },
  { id: 'keeb-tech-highlights', label: 'Tech Highlights' },
  { id: 'keeb-architecture', label: 'Architecture' },
  { id: 'keeb-roadmap', label: 'Future Roadmap' },
  { id: 'keeb-challenges', label: 'Tech Challenges' },
  { id: 'keeb-metrics', label: 'Performance Metrics' },
  { id: 'keeb-tech', label: 'Tech Stack' },
  { id: 'keeb-takeaways', label: 'Key Takeaways' },
]

onMounted(() => {
  // Mockup animations and other setups
  if (mockupContainerRef.value && mockupWrapperRef.value) {
    const modalOverlay = document.querySelector('.work-modal-container')

    if (modalOverlay && mockupContainerRef.value) {
      try {
        // Mobile: simplified animations with less scrub
        if (isMobile.value) {
          // Simple scale animation
          const animation1 = gsap.to(mockupWrapperRef.value, {
            scale: 0.8,
            bottom: '-10%',
            opacity: 1,
            scrollTrigger: {
              trigger: mockupContainerRef.value,
              scroller: modalOverlay,
              start: 'top top',
              end: 'bottom center',
              scrub: 0.5, // Lighter scrub for mobile
            },
          })
          createScrollTrigger(animation1)

          // Simple margin animation
          const animation2 = gsap.to(mockupContainerRef.value, {
            marginTop: '100vh',
            height: isLandscape ? '' : '60vh',
            scrollTrigger: {
              trigger: mockupContainerRef.value,
              scroller: modalOverlay,
              start: 'top top',
              end: 'bottom center',
              scrub: 0.5,
            },
          })
          createScrollTrigger(animation2)

          // Fade out elements - consolidated
          const elementsToFade = [workModalHeaderRef.value, mockupContainerInnerRef.value].filter(
            Boolean,
          )
          if (elementsToFade.length > 0) {
            const animation3 = gsap.to(elementsToFade, {
              opacity: 0,
              scrollTrigger: {
                trigger: mockupContainerRef.value,
                scroller: modalOverlay,
                start: 'top 0px',
                end: '50px',
                scrub: 1,
              },
            })
            createScrollTrigger(animation3)
          }
        } else {
          // Desktop: full animations
          const scrollTriggerConfig1 = {
            trigger: mockupContainerRef.value,
            scroller: modalOverlay,
            start: 'top top',
            end: 'bottom center',
            scrub: 0.1,
          }

          if (scrollTriggerConfig1.trigger && scrollTriggerConfig1.scroller) {
            const animation1 = gsap.to(mockupWrapperRef.value, {
              scale: isTablet.value ? 1 : 1.5,
              bottom: isTablet.value ? '0%' : '-12%',
              opacity: 1,
              scrollTrigger: scrollTriggerConfig1,
            })
            createScrollTrigger(animation1)
          }

          const scrollTriggerConfig2 = {
            trigger: mockupContainerRef.value,
            scroller: modalOverlay,
            start: 'top top',
            end: 'bottom center',
            scrub: 0.1,
          }

          if (scrollTriggerConfig2.trigger && scrollTriggerConfig2.scroller) {
            const animation2 = gsap.to(mockupContainerRef.value, {
              marginTop: '100vh',
              height: isLandscape ? '' : '40vh',
              scrollTrigger: scrollTriggerConfig2,
            })
            createScrollTrigger(animation2)
          }

          const scrollTriggerConfig3 = {
            trigger: mockupContainerRef.value,
            scroller: modalOverlay,
            start: 'top 0px',
            end: '50px',
            scrub: 1,
          }

          if (scrollTriggerConfig3.trigger && scrollTriggerConfig3.scroller) {
            // Consolidate fade-out animations into single ScrollTrigger
            const elementsToFade = [mockupContainerInnerRef.value, workModalHeaderRef.value].filter(
              Boolean,
            )
            if (elementsToFade.length > 0) {
              const animation3 = gsap.to(elementsToFade, {
                opacity: 0,
                scrollTrigger: scrollTriggerConfig3,
              })
              createScrollTrigger(animation3)
            }
          }
        }
      } catch (error) {
        console.warn('Mockup animation setup failed:', error)
      }
    }
  }

  // Setup demo animations - single nextTick
  nextTick(() => {
    // All demo refs in one batch
    setupDemoAnimation(achievementDemoRef.value)
    setupDemoAnimation(typingDemoRef.value)
    setupDemoAnimation(keyboardTesterDemoRef.value)
    setupDemoAnimation(pixelBorderDemoRef.value)
  })

  // Setup text and block animations - single nextTick
  nextTick(() => {
    // Feature text animations
    const featureTexts = [...featureTextRefs.value, designFeatureTextRef.value]
    featureTexts.forEach((textRef) => {
      if (textRef) {
        setupFeatureTextAnimation(textRef)
      }
    })

    // Feature block animations
    featureBlockRefs.value.forEach((blockRef, index) => {
      if (blockRef) {
        setupBlockAnimation(blockRef, index)
      }
    })

    // Other blocks animations
    const blocks = document.querySelectorAll(
      '.tech-block, .roadmap-block, .challenge-block, .takeaway-block',
    )
    blocks.forEach((block, index) => {
      setupBlockAnimation(block, index)
    })
  })
})

// Cleanup on unmount
onUnmounted(() => {
  // 비디오 정리 (메모리 해제)
  if (mockupVideoRef.value) {
    try {
      mockupVideoRef.value.pause()
      mockupVideoRef.value.src = ''
      mockupVideoRef.value.load()
    } catch (error) {
      console.warn('Video cleanup failed:', error)
    }
  }

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
  padding: 0px 0px;
}

.work-modal-header {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: 100%;
  height: auto;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.work-modal-title {
  font-size: var(--hero--1);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--white--1));
  letter-spacing: -0.02em;
}

.work-modal-subtitle {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  color: rgb(var(--white--3));
}

.work-modal-body {
  overflow: hidden;
}

.mockup-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mockup-container-inner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(var(--gray--0), 0.8);
  z-index: 1;
}

.mockup-wrapper {
  position: relative;
  height: auto;
  transform: scale(4);
}

.mockup-frame {
  width: 100%;
  height: auto;
  display: block;
  position: relative;
  z-index: 2;
  object-fit: contain;
}

.mockup-screen {
  position: absolute;
  top: 6%;
  left: 3%;
  width: 95%;
  height: auto;
  border-radius: 3%;
  overflow: hidden;
  z-index: 1;
  background-color: rgb(var(--gray--0));
  pointer-events: none;
}

.mockup-video {
  width: 100%;
  height: 100%;
  object-fit: contain;
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
  color: rgb(var(--gray--1));
  margin: 0 0 30px 0;
  letter-spacing: -0.01em;
}

.section-text {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  line-height: 1.7;
  color: rgb(var(--gray--2));
  margin: 0 0 20px 0;
}

/* Feature Blocks */
.feature-block {
  margin-bottom: 60px;
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 20px;
  padding: 40px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.feature-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

.feature-text {
  display: flex;
  flex-direction: column;
}

.feature-title {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--gray--1));
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
  color: rgb(var(--gray--2));
  margin-bottom: 8px;
  padding-left: 20px;
  position: relative;
}

/* Language distinction */
.text-en {
  opacity: 0.8;
  margin-bottom: 24px;
  font-size: 0.95em;
}

.text-ko {
  color: rgb(var(--gray--1));
  font-weight: var(--font-weight--medium);
}

.feature-image-wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
}

.feature-image {
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(var(--gray--5), 0.15);
}

/* Tech Blocks */
.tech-block {
  margin-bottom: 40px;
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 20px;
  padding: 32px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.tech-title {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--gray--1));
  margin: 0 0 15px 0;
}

.tech-desc {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--medium);
  color: rgb(var(--gray--2));
  margin: 15px 0 10px 0;
}

/* Roadmap Blocks */
.roadmap-block {
  margin-bottom: 30px;
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 20px;
  padding: 32px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.roadmap-phase {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--gray--1));
  margin: 0 0 15px 0;
}

/* Challenge Blocks */
.challenge-block {
  margin-bottom: 40px;
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 20px;
  padding: 32px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.challenge-title {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--gray--1));
  margin: 0 0 15px 0;
}

/* Takeaway Blocks */
.takeaway-block {
  margin-bottom: 30px;
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 20px;
  padding: 32px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.takeaway-title {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--gray--1));
  margin: 0 0 15px 0;
}

p {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  line-height: 1.6;
  color: rgb(var(--gray--1));
  margin: 0;
}

/* Tablet: --tablet */
@media (--tablet) {
  .work-modal-title {
    font-size: var(--hero--2);
    font-weight: var(--font-weight--bold);
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
  .work-modal-title {
    font-size: var(--hero--3);
    font-weight: var(--font-weight--bold);
  }

  .work-modal-subtitle {
    font-size: var(--body--2--normal);
    font-weight: var(--font-weight--regular);
  }

  .content-section {
    padding: 30px 20px;
  }

  .section-title {
    font-size: var(--title--3);
    margin-bottom: 16px;
  }

  .feature-block {
    padding: 20px;
  }

  .feature-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .feature-image-wrapper {
    justify-content: center;
  }

  .feature-image {
    max-width: 100%;
  }
}
</style>
