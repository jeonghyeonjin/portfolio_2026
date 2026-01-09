<template>
  <div class="work-modal-content">
    <div ref="workModalHeaderRef" class="work-modal-header">
      <h1 class="work-modal-title">{{ workData?.title || '' }}</h1>
      <p class="work-modal-subtitle">{{ workData?.description || '' }}</p>
      <div ref="producthuntBadgeRef" class="producthunt-badge">
        <img
          src="@/assets/images/producthunt/dailybadge2.avif"
          alt="Product Hunt Daily #2"
          class="producthunt-badge-icon"
        />
        <div class="producthunt-badge-text">
          <span class="producthunt-badge-label">Product Hunt Daily #2</span>
          <span class="producthunt-badge-date">May 14th, 2025</span>
        </div>
      </div>
    </div>
    <div ref="heroImageContainerRef" class="hero-image-container">
      <div ref="heroImageWrapperRef" class="hero-image-wrapper">
        <div ref="heroImageOverlayRef" class="hero-image-overlay"></div>
        <img
          src="@/assets/images/mockup/ProDisplayXDR2.png"
          alt="Shadow Application Mockup"
          class="hero-image"
        />
        <video
          v-if="modalData.sections?.projectOverview?.heroVideo"
          class="hero-video"
          autoplay
          loop
          muted
          playsinline
        >
          <source :src="modalData.sections.projectOverview.heroVideo" type="video/mp4" />
        </video>
      </div>
    </div>
    <div class="work-modal-body">
      <!-- Project Overview -->
      <section
        class="content-section"
        v-if="modalData.sections?.projectOverview"
        id="shadow-overview"
      >
        <h2 class="section-title">
          <FluentEmoji emoji="🔦" type="3d" :size="48" />
          {{ modalData.sections.projectOverview.title }}
        </h2>
        <p
          v-for="(paragraph, index) in modalData.sections.projectOverview.paragraphs"
          :key="index"
          class="section-text"
        >
          {{ paragraph }}
        </p>
        <div class="overview-meta-grid">
          <div class="meta-item" v-if="modalData.sections.projectOverview.period">
            <h4 class="meta-label">Period</h4>
            <p class="meta-value">{{ modalData.sections.projectOverview.period }}</p>
          </div>
          <div class="meta-item" v-if="modalData.sections.projectOverview.team">
            <h4 class="meta-label">Team</h4>
            <p class="meta-value">{{ modalData.sections.projectOverview.team }}</p>
          </div>
          <div class="meta-item" v-if="modalData.sections.projectOverview.role_summary">
            <h4 class="meta-label">Role</h4>
            <p class="meta-value">{{ modalData.sections.projectOverview.role_summary }}</p>
          </div>
        </div>
      </section>

      <!-- My Role -->
      <section class="content-section" v-if="modalData.sections?.myRole" id="shadow-role">
        <h2 class="section-title">
          <FluentEmoji emoji="🗃️" type="3d" :size="48" />
          {{ modalData.sections.myRole.title }}
        </h2>

        <div class="role-subsection" v-if="modalData.sections.myRole.development">
          <h3 class="subsection-title">{{ modalData.sections.myRole.development.title }}</h3>
          <p class="section-text">{{ modalData.sections.myRole.development.description }}</p>
          <ul class="feature-list">
            <li
              v-for="(item, index) in modalData.sections.myRole.development.responsibilities"
              :key="index"
            >
              {{ item }}
            </li>
          </ul>
        </div>

        <div class="role-subsection" v-if="modalData.sections.myRole.design">
          <h3 class="subsection-title">{{ modalData.sections.myRole.design.title }}</h3>
          <p class="section-text">{{ modalData.sections.myRole.design.description }}</p>
          <ul class="feature-list">
            <li
              v-for="(item, index) in modalData.sections.myRole.design.responsibilities"
              :key="index"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </section>

      <!-- Logo Design -->
      <section class="content-section" v-if="modalData.sections?.logoDesign" id="shadow-logo">
        <h2 class="section-title">
          <FluentEmoji emoji="🖌️" type="3d" :size="48" />
          {{ modalData.sections.logoDesign.title }}
        </h2>
        <!-- <p class="section-text">{{ modalData.sections.logoDesign.description }}</p> -->
        <div class="logo-evolution">
          <div class="logo-timeline">
            <template
              v-for="(label, index) in modalData.sections.logoDesign.logoLabels"
              :key="index"
            >
              <div class="logo-item">
                <img
                  :src="logoImages[index]"
                  :alt="`Shadow Logo ${index + 1}`"
                  class="logo-image"
                />
                <p class="logo-label">{{ label }}</p>
              </div>
              <div
                v-if="index < modalData.sections.logoDesign.logoLabels.length - 1"
                class="logo-arrow"
              >
                →
              </div>
            </template>
          </div>
        </div>
      </section>

      <!-- Development Contributions (Features) -->
      <section
        class="content-section"
        v-if="modalData.sections?.developmentContributions"
        id="shadow-dev-contrib"
      >
        <h2 class="section-title">
          <FluentEmoji emoji="🧑‍💻" type="3d" :size="48" />
          {{ modalData.sections.developmentContributions.title }}
        </h2>

        <template v-for="(feature, index) in modalData.features" :key="index">
          <div class="feature-block" :ref="(el) => setFeatureBlockRef(el, index)">
            <div class="feature-content">
              <div class="feature-text" :ref="(el) => setFeatureTextRef(el, index)">
                <h3 class="feature-title">{{ feature.title }}</h3>
                <p v-if="feature.subtitle" class="feature-subtitle">{{ feature.subtitle }}</p>

                <h4 v-if="feature.problem" class="content-heading">
                  <FluentEmoji emoji="🔒" type="3d" :size="24" /> Problem
                </h4>
                <p v-if="feature.problem" class="content-text">{{ feature.problem }}</p>

                <h4 v-if="feature.solutions" class="content-heading">
                  <FluentEmoji emoji="🔓" type="3d" :size="24" /> Solution
                </h4>
                <ul v-if="feature.solutions" class="solution-list">
                  <li
                    v-for="(solution, solIndex) in feature.solutions"
                    :key="solIndex"
                    v-html="solution"
                  ></li>
                </ul>

                <p v-if="feature.note" class="feature-note">
                  {{ feature.note }}
                </p>
              </div>
            </div>
            <div v-if="feature.video" class="feature-demo-video">
              <video class="demo-video" autoplay loop muted playsinline>
                <source :src="feature.video" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div
              v-if="feature.codeKey || feature.codeKeys"
              class="feature-code-wrapper"
              :ref="(el) => setFeatureCodeRef(el, index)"
            >
              <template v-if="feature.codeKey">
                <CodeBlock :code="modalData.codeSnippets[feature.codeKey]" language="dart" />
              </template>
              <template v-else-if="feature.codeKeys">
                <CodeBlock
                  v-for="(codeKey, codeIndex) in feature.codeKeys"
                  :key="codeIndex"
                  :code="modalData.codeSnippets[codeKey]"
                  language="dart"
                  :style="codeIndex > 0 ? { marginTop: '24px' } : {}"
                />
              </template>
            </div>
          </div>
        </template>
      </section>

      <!-- Design Contributions -->
      <section
        class="content-section"
        v-if="modalData.sections?.designContributions"
        id="shadow-design-contrib"
      >
        <h2 class="section-title">
          <FluentEmoji emoji="🧑‍🎨" type="3d" :size="48" />
          {{ modalData.sections.designContributions.title }}
        </h2>

        <div
          v-for="(item, index) in modalData.sections.designContributions.items"
          :key="index"
          class="design-contrib-item"
        >
          <h3 class="subsection-title">{{ item.title }}</h3>
          <p class="section-text">{{ item.description }}</p>
          <ul class="feature-list">
            <li v-for="(detail, dIndex) in item.details" :key="dIndex">
              {{ detail }}
            </li>
          </ul>
        </div>
      </section>

      <!-- Tech Stack -->
      <section class="content-section" v-if="modalData.sections?.techStack" id="shadow-tech">
        <h2 class="section-title">
          <FluentEmoji emoji="🛠️" type="3d" :size="48" />
          {{ modalData.sections.techStack.title }}
        </h2>
        <TechStackGrid :stacks="techStacks" />
      </section>

      <!-- Performance Metrics -->
      <section
        class="content-section"
        v-if="modalData.sections?.performanceImpact"
        id="shadow-metrics"
      >
        <h2 class="section-title">
          <FluentEmoji emoji="📈" type="3d" :size="48" />
          {{ modalData.sections.performanceImpact.title }}
        </h2>
        <MetricsGrid :metrics="performanceMetrics" />
      </section>

      <!-- Key Takeaways -->
      <section
        class="content-section"
        v-if="modalData.sections?.keyTakeaways"
        id="shadow-takeaways"
      >
        <h2 class="section-title">
          <FluentEmoji emoji="💡" type="3d" :size="48" />
          {{ modalData.sections.keyTakeaways.title }}
        </h2>

        <div
          v-for="(takeaway, index) in modalData.sections.keyTakeaways.takeaways"
          :key="index"
          class="takeaway-block"
        >
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
import WorkModalTOC from '@/components/common/WorkModalTOC.vue'
import FluentEmoji from '@/components/common/FluentEmoji.vue'
import worksData from '@/data/works.json'
import modalData from '@/data/modals/WorkModalShadow.json'
import logo1 from '@/assets/images/works/shadow/logo1.png'
import logo2 from '@/assets/images/works/shadow/logo2.png'
import logo3 from '@/assets/images/works/shadow/logo3.png'
import logo4 from '@/assets/images/works/shadow/logo4.png'

const workId = inject('workId', 1)

// ScrollTrigger instances management
const scrollTriggers = ref([])
const retryTimeouts = ref([])
const MAX_RETRY_ATTEMPTS = 3

const workData = computed(() => {
  return worksData.find((work) => work.id === workId) || null
})

gsap.registerPlugin(ScrollTrigger)

const workModalHeaderRef = ref(null)
const heroImageContainerRef = ref(null)
const heroImageOverlayRef = ref(null)
const heroImageWrapperRef = ref(null)
const { isMobile } = useResponsive()
// Dynamic refs for features
const featureBlockRefs = ref([])
const featureTextRefs = ref([])
const featureCodeRefs = ref([])

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

const setFeatureCodeRef = (el, index) => {
  if (el) {
    featureCodeRefs.value[index] = el
  }
}

// Data from JSON
const performanceMetrics = modalData.performanceMetrics
const techStacks = modalData.techStacks

const tocSections = [
  { id: 'shadow-overview', label: 'Project Overview' },
  { id: 'shadow-role', label: 'My Role' },
  { id: 'shadow-logo', label: 'Logo Design' },
  { id: 'shadow-dev-contrib', label: 'Dev Contributions' },
  { id: 'shadow-design-contrib', label: 'Design Contributions' },
  { id: 'shadow-tech', label: 'Tech Stack' },
  { id: 'shadow-metrics', label: 'Performance Metrics' },
  { id: 'shadow-takeaways', label: 'Key Takeaways' },
]

// Logo images
const logoImages = [logo1, logo2, logo3, logo4]

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

  const modalOverlay = document.querySelector('.work-modal-wrapper')
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
      y: 50,
      opacity: 0,
    })

    const scrollTriggerConfig = {
      trigger: textRef,
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

    const animation = gsap.to(textRef, {
      y: 0,
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

const setupFeatureCodeAnimation = (codeRef, textRef, retryCount = 0) => {
  if (!codeRef || !textRef) return

  const modalOverlay = document.querySelector('.work-modal-wrapper')
  if (!modalOverlay) return

  // 요소가 실제로 DOM에 있고 크기가 있는지 확인
  if (!codeRef.offsetParent && codeRef.offsetWidth === 0 && codeRef.offsetHeight === 0) {
    // Retry with limit
    if (retryCount < MAX_RETRY_ATTEMPTS) {
      const timeoutId = setTimeout(() => {
        setupFeatureCodeAnimation(codeRef, textRef, retryCount + 1)
      }, 100)
      addRetryTimeout(timeoutId)
    }
    return
  }

  try {
    gsap.set(codeRef, {
      y: 50,
      opacity: 0,
    })

    // Use the same trigger as the text to sync animations
    const scrollTriggerConfig = {
      trigger: textRef,
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

    const animation = gsap.to(codeRef, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: scrollTriggerConfig,
    })

    createScrollTrigger(animation)
  } catch (error) {
    console.warn('Feature code animation setup failed:', error)
  }
}

const setupFeatureBlockAnimation = (blockRef, index = 0, retryCount = 0) => {
  if (!blockRef) return

  const modalOverlay = document.querySelector('.work-modal-wrapper')
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

  const modalOverlay = document.querySelector('.work-modal-wrapper')
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

onMounted(() => {
  // Hero image scroll animation
  if (heroImageContainerRef.value && heroImageWrapperRef.value) {
    const modalOverlay = document.querySelector('.work-modal-wrapper')

    if (modalOverlay && heroImageContainerRef.value) {
      try {
        gsap.set(heroImageWrapperRef.value, { scale: 5 })

        const animation1 = gsap.to(heroImageWrapperRef.value, {
          scale: 1,
          scrollTrigger: {
            trigger: heroImageContainerRef.value,
            scroller: modalOverlay,
            start: 'top top',
            end: 'bottom center',
            pin: true,
            scrub: 0.5,
          },
        })
        createScrollTrigger(animation1)

        // Fade out elements - consolidated
        const elementsToFade = [workModalHeaderRef.value, heroImageOverlayRef.value].filter(Boolean)
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

  // Feature blocks and texts animation - single nextTick
  nextTick(() => {
    // Feature blocks
    featureBlockRefs.value.forEach((blockRef, index) => {
      if (blockRef) {
        setupFeatureBlockAnimation(blockRef, index)
      }
    })

    // Feature texts and code
    featureTextRefs.value.forEach((textRef, index) => {
      if (textRef) {
        setupFeatureTextAnimation(textRef)
        const codeRef = featureCodeRefs.value[index]
        if (codeRef) {
          setupFeatureCodeAnimation(codeRef, textRef)
        }
      }
    })

    // Other blocks
    const blocks = document.querySelectorAll(
      '.takeaway-block, .tech-stack-grid, .design-contrib-item, .role-subsection',
    )
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
  background-color: rgb(var(--gray--0));
  /* 스크롤바 트랙 색상을 위한 CSS 변수 */
  --modal-bg-color: rgb(var(--gray--0));
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

.producthunt-badge {
  margin-top: 30px;
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
}

.work-modal-subtitle {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  color: rgb(var(--white--3));
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

.hero-image-wrapper {
  position: relative;
  width: 100%;
  max-width: 1400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(var(--gray--0), 0.9);
  z-index: 3;
}

.hero-image {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
  position: relative;
  z-index: 2;
}

.hero-video {
  position: absolute;
  top: -11.15%;
  left: 2.5%;
  width: 95%;
  height: 100%;
  object-fit: contain;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
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
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-text {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  line-height: 1.7;
  color: rgb(var(--white--2));
}

.subsection-title {
  font-size: var(--title--3);
  font-weight: var(--font-weight--semibold);
  color: rgb(var(--white--1));
  margin: 0 0 16px 0;
}

/* Overview Meta Grid */
.overview-meta-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 40px;
}

.meta-item {
  padding: 24px;
}

.meta-item.full-width {
  grid-column: span 2;
}

.meta-label {
  font-size: var(--caption--1);
  color: rgb(var(--gray--5s));
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.meta-value {
  font-size: var(--body--1--normal);
  color: rgb(var(--white--1));
  font-weight: var(--font-weight--medium);
}

/* Role Subsection */
.role-subsection {
  margin-bottom: 40px;
}

.role-subsection:last-child {
  margin-bottom: 0;
}

/* Logo Evolution */
.logo-evolution {
  margin-top: 40px;
  background-color: rgba(255, 255, 255, 0.7);
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  border-radius: 24px;
  padding: 40px;
}

.logo-timeline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.logo-item {
  display: flex;
  width: 180px;
  height: 180px;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  flex: 0 0 auto;
  position: relative;
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 20px;
  padding: 20px;
  transition: transform 0.3s ease;
  position: relative;
}

.logo-image:hover {
  transform: scale(1.05);
}

.logo-arrow {
  font-size: 2rem;
  color: rgb(var(--gray--5s));
  font-weight: var(--font-weight--bold);
  flex-shrink: 0;
}

.logo-label {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--medium);
  color: rgb(var(--gray--1));
  text-align: center;
  margin: 0;
}

/* Feature Blocks */
.feature-block {
  margin-bottom: 80px;
  background-color: rgba(255, 255, 255, 0.02);
  border-radius: 24px;
  padding: 48px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.feature-text {
  display: flex;
  flex-direction: column;
}

.feature-title {
  font-size: var(--title--2);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--white--1));
  margin: 0 0 8px 0;
}

.feature-subtitle {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  color: rgb(var(--white--3));
  margin: 0 0 30px 0;
}

.content-heading {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--heading--1);
  font-weight: var(--font-weight--medium);
  color: rgb(var(--white--1));
  margin: 24px 0 12px 0;
}

.content-text {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  line-height: 1.7;
  color: rgb(var(--white--2));
  margin: 0 0 16px 0;
}

.solution-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.solution-list li {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  line-height: 1.7;
  color: rgb(var(--white--2));
  margin-bottom: 16px;
  padding-left: 24px;
  position: relative;
}

.solution-list li:last-child {
  margin-bottom: 0;
}

.solution-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: rgb(var(--primary--green));
  font-weight: var(--font-weight--bold);
  font-size: 1.2em;
}

.feature-note {
  font-size: var(--caption--1);
  color: rgb(var(--white--3));
  margin-top: 16px;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.note-label {
  font-weight: var(--font-weight--bold);
  color: rgb(var(--primary--green));
}

.feature-code-wrapper {
  width: 100%;
  margin-top: 30px;
}

.feature-demo-video {
  width: 100%;
  margin-top: 30px;
}

.demo-video {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  display: block;
}

/* Design Contributions */
.design-contrib-item {
  margin-bottom: 40px;
  background-color: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Feature List */
.feature-list {
  list-style: none;
  padding: 0;
  margin: 15px 0 15px 0;
}

.feature-list li {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  line-height: 1.7;
  color: rgb(var(--white--2));
  margin-bottom: 12px;
  padding-left: 24px;
  position: relative;
}

.feature-list li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: rgb(var(--primary--green));
  font-weight: var(--font-weight--bold);
}

/* Takeaway Blocks */
.takeaway-block {
  margin-bottom: 40px;
  background-color: rgba(255, 255, 255, 0.02);
  border-radius: 24px;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.takeaway-title {
  font-size: var(--body--1--medium);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--white--1));
  margin: 0 0 16px 0;
}

/* Tablet: --tablet */
@media (--tablet) {
  .work-modal-title {
    font-size: var(--hero--2);
  }

  .content-section {
    padding: 40px 30px;
  }

  .section-title {
    font-size: var(--title--2);
  }

  .feature-block {
    margin-bottom: 60px;
  }

  .logo-evolution {
    margin-top: 35px;
  }

  .logo-timeline {
    gap: 15px;
    margin-top: 25px;
  }

  .logo-item {
    width: 140px;
    height: auto;
    min-height: 140px;
  }

  .logo-image {
    width: 140px;
    height: 140px;
    padding: 15px;
  }

  .logo-arrow {
    font-size: 1.5rem;
    margin: 0 5px;
  }

  .overview-meta-grid {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .meta-item.full-width {
    grid-column: span 2;
  }
}

/* Mobile: --mobile */
@media (--mobile) {
  .work-modal-title {
    font-size: var(--hero--3);
  }

  .work-modal-subtitle {
    font-size: var(--body--2--normal);
  }

  .content-section {
    padding: 30px 20px;
  }

  .section-title {
    font-size: var(--title--3);
  }

  .feature-block {
    padding: 20px;
    margin-bottom: 40px;
  }

  .logo-evolution {
    margin-top: 30px;
    padding: 10px 0;
  }

  .logo-timeline {
    display: flex;
    align-items: start;
    gap: 4px;
    margin-top: 20px;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 8px;
    -webkit-overflow-scrolling: touch;
  }

  .logo-timeline::-webkit-scrollbar {
    display: none;
  }

  .logo-item {
    width: 70px;
    height: auto;
    min-height: 70px;
    gap: 6px;
    flex-shrink: 0;
  }

  .logo-image {
    width: 70px;
    height: 70px;
    padding: 8px;
    border-radius: 10px;
  }

  .logo-arrow {
    font-size: 1rem;
    margin: 0 2px;
    flex-shrink: 0;
    align-self: center;
  }

  .logo-label {
    display: none;
  }

  .demo-gif {
    margin-top: 24px;
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }

  .feature-demo-video {
    margin-top: 24px;
  }

  .overview-meta-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .meta-item {
    padding: 16px;
  }

  .meta-item.full-width {
    grid-column: span 1;
  }
}

@media (--tablet) {
  .demo-gif {
    margin-top: 30px;
  }

  .feature-demo-video {
    margin-top: 30px;
  }
}

@media (--desktop) {
  .demo-gif {
    margin-top: 40px;
  }

  .feature-demo-video {
    margin-top: 40px;
  }
}
</style>
