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
    <div class="work-modal-body">
      <div ref="heroImageContainerRef" class="hero-image-container">
        <div ref="heroImageWrapperRef" class="hero-image-wrapper">
          <div ref="heroImageOverlayRef" class="hero-image-overlay"></div>
          <img
            src="@/assets/images/works/shadow/shadow_mockup.png"
            alt="Shadow Application Mockup"
            class="hero-image"
          />
        </div>
      </div>

      <!-- Project Overview -->
      <section class="content-section" v-if="modalData.sections?.projectOverview" id="shadow-overview">
        <h2 class="section-title">{{ modalData.sections.projectOverview.title }}</h2>
        <p
          v-for="(paragraph, index) in modalData.sections.projectOverview.paragraphs"
          :key="index"
          class="section-text"
        >
          {{ paragraph }}
        </p>
      </section>

      <!-- Tech Stack -->
      <section class="content-section" v-if="modalData.sections?.techStack" id="shadow-tech">
        <h2 class="section-title">{{ modalData.sections.techStack.title }}</h2>
        <TechStackGrid :stacks="techStacks" />
      </section>

      <!-- Logo Design -->
      <section class="content-section" v-if="modalData.sections?.logoDesign" id="shadow-logo">
        <h2 class="section-title">{{ modalData.sections.logoDesign.title }}</h2>
        <p class="section-text">{{ modalData.sections.logoDesign.description }}</p>
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

      <!-- Key Features -->
      <section class="content-section" v-if="modalData.sections?.keyContributions" id="shadow-features">
        <h2 class="section-title">{{ modalData.sections.keyContributions.title }}</h2>

        <template v-for="(feature, index) in modalData.features" :key="index">
          <div class="feature-block" :ref="(el) => setFeatureBlockRef(el, index)">
            <div class="feature-content">
              <div class="feature-text" :ref="(el) => setFeatureTextRef(el, index)">
                <h3 class="feature-title">{{ feature.title }}</h3>
                <p v-if="feature.subtitle" class="feature-subtitle">{{ feature.subtitle }}</p>

                <h4 v-if="feature.problem" class="content-heading">📄 Problem</h4>
                <p v-if="feature.problem" class="content-text">{{ feature.problem }}</p>

                <h4 v-if="feature.solutions" class="content-heading">💡 Solution</h4>
                <ul v-if="feature.solutions" class="solution-list">
                  <li
                    v-for="(solution, solIndex) in feature.solutions"
                    :key="solIndex"
                    v-html="solution"
                  ></li>
                </ul>
              </div>
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
            <div class="feature-demo-image"></div>
          </div>
        </template>
      </section>

      <!-- Performance Metrics -->
      <section class="content-section" v-if="modalData.sections?.performanceImpact" id="shadow-metrics">
        <h2 class="section-title">{{ modalData.sections.performanceImpact.title }}</h2>
        <MetricsGrid :metrics="performanceMetrics" />
      </section>

      <!-- Key Takeaways -->
      <section class="content-section" v-if="modalData.sections?.keyTakeaways" id="shadow-takeaways">
        <h2 class="section-title">{{ modalData.sections.keyTakeaways.title }}</h2>

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

    <WorkModalTOC :sections="tocSections" />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, inject, computed } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useResponsive } from '@/composables/useResponsive'
import CodeBlock from '@/components/common/CodeBlock.vue'
import MetricsGrid from '@/components/common/MetricsGrid.vue'
import TechStackGrid from '@/components/common/TechStackGrid.vue'
import WorkModalTOC from '@/components/common/WorkModalTOC.vue'
import worksData from '@/data/works.json'
import modalData from '@/data/modals/WorkModalShadow.json'
import logo1 from '@/assets/images/works/shadow/logo1.png'
import logo2 from '@/assets/images/works/shadow/logo2.png'
import logo3 from '@/assets/images/works/shadow/logo3.png'
import logo4 from '@/assets/images/works/shadow/logo4.png'

const workId = inject('workId', 1)

const workData = computed(() => {
  return worksData.find((work) => work.id === workId) || null
})

gsap.registerPlugin(ScrollTrigger)

const workModalHeaderRef = ref(null)
const heroImageContainerRef = ref(null)
const heroImageOverlayRef = ref(null)
const heroImageWrapperRef = ref(null)
const { isMobile, isTablet } = useResponsive()
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
  { id: 'shadow-tech', label: 'Tech Stack' },
  { id: 'shadow-logo', label: 'Logo Design' },
  { id: 'shadow-features', label: 'Key Features' },
  { id: 'shadow-metrics', label: 'Performance Metrics' },
  { id: 'shadow-takeaways', label: 'Key Takeaways' }
]

// Logo images
const logoImages = [logo1, logo2, logo3, logo4]

const setupFeatureTextAnimation = (textRef) => {
  if (!textRef) return

  const modalOverlay = document.querySelector('.work-modal-overlay')
  if (!modalOverlay) return

  if (!textRef.offsetParent && textRef.offsetWidth === 0 && textRef.offsetHeight === 0) {
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
      return
    }

    gsap.to(textRef, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: scrollTriggerConfig,
    })
  } catch (error) {
    console.warn('Feature text animation setup failed:', error)
  }
}

const setupFeatureCodeAnimation = (codeRef, textRef) => {
  if (!codeRef || !textRef) return

  const modalOverlay = document.querySelector('.work-modal-overlay')
  if (!modalOverlay) return

  if (!codeRef.offsetParent && codeRef.offsetWidth === 0 && codeRef.offsetHeight === 0) {
    return
  }

  try {
    gsap.set(codeRef, {
      x: 100,
      opacity: 0,
    })

    // Use the same trigger as the text to sync animations
    const scrollTriggerConfig = {
      trigger: textRef,
      scroller: modalOverlay,
      start: 'top 80%',
      end: 'top 50%',
      toggleActions: 'play none none reverse',
      invalidateOnRefresh: true,
    }

    if (!scrollTriggerConfig.trigger || !scrollTriggerConfig.scroller) {
      return
    }

    gsap.to(codeRef, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: scrollTriggerConfig,
    })
  } catch (error) {
    console.warn('Feature code animation setup failed:', error)
  }
}

const setupFeatureBlockAnimation = (blockRef, index = 0) => {
  if (!blockRef) return

  const modalOverlay = document.querySelector('.work-modal-overlay')
  if (!modalOverlay) return

  if (!blockRef.offsetParent && blockRef.offsetWidth === 0 && blockRef.offsetHeight === 0) {
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
      return
    }

    gsap.to(blockRef, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      delay: index * 0.1,
      scrollTrigger: scrollTriggerConfig,
    })
  } catch (error) {
    console.warn('Feature block animation setup failed:', error)
  }
}

const setupBlockAnimation = (block, index = 0) => {
  if (!block) return

  const modalOverlay = document.querySelector('.work-modal-overlay')
  if (!modalOverlay) return

  if (!block.offsetParent && block.offsetWidth === 0 && block.offsetHeight === 0) {
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
      return
    }

    gsap.to(block, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      delay: index * 0.1,
      scrollTrigger: scrollTriggerConfig,
    })
  } catch (error) {
    console.warn('Block animation setup failed:', error)
  }
}

onMounted(() => {
  // Hero image scroll animation
  if (heroImageContainerRef.value && heroImageWrapperRef.value) {
    const modalOverlay = document.querySelector('.work-modal-overlay')

    if (modalOverlay && heroImageContainerRef.value) {
      try {
        const scrollTriggerConfig1 = {
          trigger: heroImageContainerRef.value,
          scroller: modalOverlay,
          start: 'top top',
          end: 'bottom center',
          scrub: 0.1,
        }

        if (scrollTriggerConfig1.trigger && scrollTriggerConfig1.scroller) {
          gsap.to(heroImageWrapperRef.value, {
            scale: isTablet.value ? (isMobile.value ? 0.7 : 0.7) : 0.9,
            bottom: isTablet.value ? (isMobile.value ? '-5%' : '0%') : '-8%',
            opacity: 1,
            scrollTrigger: scrollTriggerConfig1,
          })
        }

        const scrollTriggerConfig2 = {
          trigger: heroImageContainerRef.value,
          scroller: modalOverlay,
          start: 'top top',
          end: 'bottom center',
          scrub: 0.1,
        }

        if (scrollTriggerConfig2.trigger && scrollTriggerConfig2.scroller) {
          const isLandscape = window.innerWidth > window.innerHeight
          gsap.to(heroImageContainerRef.value, {
            marginTop: '100vh',
            height: isLandscape ? '' : '40vh',
            scrollTrigger: scrollTriggerConfig2,
          })
        }

        const scrollTriggerConfig3 = {
          trigger: heroImageContainerRef.value,
          scroller: modalOverlay,
          start: 'top 0px',
          end: '30px',
          scrub: 1,
        }

        if (scrollTriggerConfig3.trigger && scrollTriggerConfig3.scroller) {
          if (heroImageOverlayRef.value) {
            gsap.to(heroImageOverlayRef.value, {
              opacity: 0,
              scrollTrigger: scrollTriggerConfig3,
            })
          }

          if (workModalHeaderRef.value) {
            gsap.to(workModalHeaderRef.value, {
              opacity: 0,
              scrollTrigger: scrollTriggerConfig3,
            })
          }
        }
      } catch (error) {
        console.warn('Hero image animation setup failed:', error)
      }
    }
  }

  // Feature blocks animation (카드 컨테이너)
  nextTick(() => {
    nextTick(() => {
      const modalOverlay = document.querySelector('.work-modal-overlay')
      if (!modalOverlay) return

      featureBlockRefs.value.forEach((blockRef, index) => {
        if (!blockRef) return

        if (blockRef.offsetParent === null) {
          setTimeout(() => {
            setupFeatureBlockAnimation(blockRef, index)
          }, 100)
          return
        }

        setupFeatureBlockAnimation(blockRef, index)
      })
    })
  })

  // Feature texts animation
  nextTick(() => {
    nextTick(() => {
      const modalOverlay = document.querySelector('.work-modal-overlay')
      if (!modalOverlay) return

      featureTextRefs.value.forEach((textRef, index) => {
        if (!textRef) return

        const codeRef = featureCodeRefs.value[index]

        if (textRef.offsetParent === null) {
          setTimeout(() => {
            setupFeatureTextAnimation(textRef)
            if (codeRef) {
              setupFeatureCodeAnimation(codeRef, textRef)
            }
          }, 100)
          return
        }

        setupFeatureTextAnimation(textRef)
        if (codeRef) {
          setupFeatureCodeAnimation(codeRef, textRef)
        }
      })
    })
  })

  // Blocks animation
  nextTick(() => {
    nextTick(() => {
      const modalOverlay = document.querySelector('.work-modal-overlay')
      if (!modalOverlay) return

      const blocks = document.querySelectorAll('.takeaway-block, .tech-stack-grid')

      blocks.forEach((block, index) => {
        if (
          !block ||
          (!block.offsetParent && block.offsetWidth === 0 && block.offsetHeight === 0)
        ) {
          setTimeout(
            () => {
              setupBlockAnimation(block, index)
            },
            100 + index * 50,
          )
          return
        }

        setupBlockAnimation(block, index)
      })
    })
  })
})
</script>

<style scoped>
@import '@/assets/styles/breakpoints.css';

.work-modal-content {
  width: 100%;
  min-height: 100vh;
  padding: 0px 0px;
  background-color: rgb(var(--gray--0));
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
  background-color: rgba(var(--gray--0), 0.8);
  z-index: 3;
}

.hero-image-wrapper {
  position: relative;
  height: auto;
  transform: scale(4);
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

/* Logo Evolution */
.logo-evolution {
  margin-top: 40px;
}

.logo-timeline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
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
  background-color: rgb(var(--white--2));
  padding: 20px;
  transition: transform 0.3s ease;
  position: relative;
}

.logo-image:hover {
  transform: scale(1.05);
}

.logo-arrow {
  font-size: 2rem;
  color: rgb(var(--white--3));
  font-weight: var(--font-weight--bold);
  flex-shrink: 0;
  margin: 0 10px;
}

.logo-label {
  font-size: var(--body--2--normal);
  font-weight: var(--font-weight--medium);
  color: rgb(var(--white--2));
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

.feature-content {
  margin-bottom: 30px;
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
  font-size: var(--body--1--medium);
  font-weight: var(--font-weight--semibold);
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
  margin: 0 0 24px 0;
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

.solution-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: rgb(var(--primary--green));
  font-weight: var(--font-weight--bold);
  font-size: 1.2em;
}

.feature-code-wrapper {
  width: 100%;
  margin-top: 30px;
}

/* Feature List */
.feature-list {
  list-style: none;
  padding: 0;
  margin: 0 0 15px 0;
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

  .logo-timeline {
    gap: 15px;
  }

  .logo-image {
    max-width: 140px;
    padding: 15px;
  }

  .logo-arrow {
    font-size: 1.5rem;
    margin: 0 5px;
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
    margin-bottom: 40px;
  }

  .logo-timeline {
    gap: 10px;
  }

  .logo-image {
    max-width: 100px;
    padding: 12px;
  }

  .logo-arrow {
    font-size: 1.2rem;
    margin: 0 3px;
  }

  .logo-label {
    font-size: var(--caption--1);
  }

  .demo-gif {
    margin-top: 24px;
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
}

@media (--tablet) {
  .demo-gif {
    margin-top: 30px;
  }
}

@media (--desktop) {
  .demo-gif {
    margin-top: 40px;
  }
}
</style>
