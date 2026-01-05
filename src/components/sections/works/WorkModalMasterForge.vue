<template>
  <div class="work-modal-content">
    <div class="work-modal-body">
      <!-- Grid Container -->
      <div class="container" ref="containerRef">
        <div class="grid-container" ref="gridContainerRef">
          <div class="grid" ref="gridRef">
            <div
              v-for="(slide, index) in slides"
              :key="index"
              class="grid-item"
              :class="{ target: index === activeIndex }"
              :data-index="index"
              ref="gridItemsRef"
              @click="handleGridItemClick(index)"
            >
              <div class="grid-item-img" :style="{ backgroundImage: `url(${slide.image})` }"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Slide Layers -->
      <div class="slider-image" ref="sliderImageRef"></div>
      <div class="slider-image-bg" ref="sliderImageBgRef"></div>
      <div class="slider-image-next" ref="sliderImageNextRef"></div>
      <div class="transition-overlay" ref="transitionOverlayRef"></div>

      <!-- Content -->
      <div class="content" ref="contentRef">
        <h1 class="content-title">
          <span ref="contentTitleSpanRef">{{ currentSlide.title }}</span>
        </h1>
        <div class="content-paragraph" ref="contentParagraphRef">
          <div class="description-line">{{ currentSlide.description.en }}</div>
          <div class="description-line">{{ currentSlide.description.ko }}</div>
        </div>
      </div>

      <!-- Thumbnails -->
      <div class="thumbnails" ref="thumbnailsRef">
        <div
          v-for="(slide, index) in slides"
          :key="`thumb-${index}`"
          class="thumbnail"
          :class="{ active: index === activeIndex }"
          :data-index="index"
          @click="handleThumbnailClick(index)"
          ref="thumbnailItemsRef"
        >
          <div class="thumbnail-img" :style="{ backgroundImage: `url(${slide.image})` }"></div>
        </div>
      </div>

      <!-- Switch Buttons -->
      <div class="switch" ref="switchRef">
        <button
          class="switch-button switch-button-grid"
          :class="{ 'switch-button-current': currentMode === 'grid' }"
          @click="toggleView('grid')"
        >
          <span class="indicator-dot"></span>
          GRID
        </button>
        <button
          class="switch-button switch-button-slider"
          :class="{ 'switch-button-current': currentMode === 'slider' }"
          @click="toggleView('slider')"
        >
          <span class="indicator-dot"></span>
          SLIDER
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, inject } from 'vue'
import { gsap } from 'gsap'
import { Flip } from 'gsap/all'
import imgHero from '@/assets/images/works/master-forge/20241120_214422.jpg'
import imgHeroWide from '@/assets/images/works/master-forge/20241120_214422_1.jpg'
import imgPin from '@/assets/images/works/master-forge/m4g_pin.png'
import imgMockup from '@/assets/images/works/master-forge/m4g_pin_mockup.png'
import imgSticker from '@/assets/images/works/master-forge/m4g_sticker.png'
import worksData from '@/data/works.json'
import modalData from '@/data/modals/WorkModalMasterForge.json'

gsap.registerPlugin(Flip)

const workId = inject('workId', 2)
const workData = worksData.find((work) => work.id === workId) || null

// Refs
const containerRef = ref(null)
const gridContainerRef = ref(null)
const gridRef = ref(null)
const gridItemsRef = ref([])
const sliderImageRef = ref(null)
const sliderImageBgRef = ref(null)
const sliderImageNextRef = ref(null)
const transitionOverlayRef = ref(null)
const contentRef = ref(null)
const contentTitleSpanRef = ref(null)
const contentParagraphRef = ref(null)
const thumbnailsRef = ref(null)
const thumbnailItemsRef = ref([])
const switchRef = ref(null)

// State
const currentMode = ref('grid')
const isAnimating = ref(false)
const activeIndex = ref(0)
const previousIndex = ref(0)
const slideDirection = ref('right')
const viewportWidth = ref(window.innerWidth)
const viewportHeight = ref(window.innerHeight)

// Computed
const isLandscape = computed(() => viewportWidth.value > viewportHeight.value)
const heroImage = computed(() => (isLandscape.value ? imgHeroWide : imgHero))

// Data from JSON
const slides = computed(() => {
  const heroSlide = {
    image: heroImage.value,
    title: workData?.title?.toUpperCase() || 'MASTER FORGE',
    description: {
      en: workData?.description || "Designed for the Master Forge keyboard's pin and sticker design contest on Kickstarter. Expressing the passion and creativity of the keyboard community.",
      ko: workData?.description || 'Kickstarter의 Master Forge 키보드 핀 및 스티커 디자인 콘테스트를 위해 제작되었습니다. 키보드 커뮤니티의 열정과 창의성을 표현했습니다.',
    },
  }

  // JSON에서 가져온 슬라이드 데이터를 이미지 import와 매핑
  const imageMap = {
    '@/assets/images/works/master-forge/m4g_pin.png': imgPin,
    '@/assets/images/works/master-forge/m4g_pin_mockup.png': imgMockup,
    '@/assets/images/works/master-forge/m4g_sticker.png': imgSticker,
  }

  const additionalSlides = modalData.slides.map((slide) => ({
    image: imageMap[slide.imagePath] || slide.imagePath,
    title: slide.title,
    description: slide.description,
  }))

  return [heroSlide, ...additionalSlides]
})

const currentSlide = computed(() => slides.value[activeIndex.value])

// Viewport resize handler
const handleResize = () => {
  viewportWidth.value = window.innerWidth
  viewportHeight.value = window.innerHeight
}

// Timing constants (in seconds)
const TIMING = {
  BASE: 0.512,
  SHORTEST: 0.256,
  SHORT: 0.384,
  LONG: 0.768,
  STAGGER_TINY: 0.032,
  STAGGER_SMALL: 0.064,
  STAGGER_MED: 0.128,
}

// Ease constants (Standard GSAP eases since CustomEase is premium)
const EASES = {
  MAIN: 'power3.out',
  SIDE: 'power2.out',
  NATURAL: 'expo.out',
}

// Methods
const getGridItemByIndex = (index) => {
  return gridItemsRef.value[index]
}

const toggleView = async (mode) => {
  if (isAnimating.value || currentMode.value === mode) return
  isAnimating.value = true
  currentMode.value = mode

  if (mode === 'slider') {
    await showSliderView()
  } else {
    await showGridView()
  }
  isAnimating.value = false
}

const showSliderView = () => {
  return new Promise((resolve) => {
    const activeItem = getGridItemByIndex(activeIndex.value)
    const activeItemRect = activeItem.getBoundingClientRect()
    const activeImageUrl = slides.value[activeIndex.value].image

    // Set slider image
    sliderImageRef.value.style.backgroundImage = `url(${activeImageUrl})`
    sliderImageBgRef.value.style.backgroundImage = `url(${activeImageUrl})`

    // Position slider image over active item
    gsap.set(sliderImageRef.value, {
      width: activeItemRect.width,
      height: activeItemRect.height,
      x: activeItemRect.left,
      y: activeItemRect.top,
      opacity: 1,
      visibility: 'visible',
      borderRadius: '0px',
    })

    // STEP 1: Expand height to 100vh using FLIP
    const heightState = Flip.getState(sliderImageRef.value)

    gsap.set(sliderImageRef.value, {
      height: '100vh',
      y: 0,
      width: activeItemRect.width,
      x: activeItemRect.left,
    })

    Flip.from(heightState, {
      duration: TIMING.BASE,
      ease: EASES.MAIN,
      onComplete: () => {
        // STEP 2: Expand width to 100vw using FLIP
        const widthState = Flip.getState(sliderImageRef.value)

        gsap.set(sliderImageRef.value, {
          width: '100vw',
          x: 0,
        })

        Flip.from(widthState, {
          duration: TIMING.BASE,
          ease: EASES.MAIN,
          onComplete: () => {
            // Hide grid
            gsap.to(gridRef.value, {
              opacity: 0,
              duration: TIMING.SHORTEST,
              ease: 'power2.inOut',
            })

            // Show content
            const contentTl = gsap.timeline({
              onComplete: resolve,
            })

            contentTl.to(
              contentRef.value,
              {
                opacity: 1,
                duration: TIMING.SHORT,
                ease: EASES.MAIN,
              },
              0,
            )

            contentTl.to(
              contentTitleSpanRef.value,
              {
                y: 0,
                duration: TIMING.BASE,
                ease: EASES.SIDE,
              },
              TIMING.STAGGER_TINY,
            )

            contentTl.to(
              contentParagraphRef.value,
              {
                opacity: 1,
                duration: TIMING.BASE,
                ease: EASES.MAIN,
              },
              TIMING.STAGGER_SMALL,
            )

            contentTl.to(
              thumbnailItemsRef.value,
              {
                opacity: 1,
                y: 0,
                duration: TIMING.SHORT,
                stagger: TIMING.STAGGER_TINY,
                ease: EASES.SIDE,
              },
              TIMING.STAGGER_MED,
            )
          },
        })
      },
    })
  })
}

const showGridView = () => {
  return new Promise((resolve) => {
    const activeItem = getGridItemByIndex(activeIndex.value)
    const activeItemRect = activeItem.getBoundingClientRect()

    const contentTl = gsap.timeline({
      onComplete: () => {
        // Show grid
        gsap.to(gridRef.value, {
          opacity: 1,
          duration: TIMING.SHORTEST,
          ease: 'power2.inOut',
        })

        gsap.set([sliderImageNextRef.value, sliderImageBgRef.value, transitionOverlayRef.value], {
          opacity: 0,
          visibility: 'hidden',
        })

        // STEP 1: Shrink width using FLIP
        const widthState = Flip.getState(sliderImageRef.value)

        gsap.set(sliderImageRef.value, {
          width: activeItemRect.width,
          x: activeItemRect.left,
          height: '100vh',
          y: 0,
        })

        Flip.from(widthState, {
          duration: TIMING.BASE,
          ease: EASES.MAIN,
          onComplete: () => {
            // STEP 2: Shrink height using FLIP
            const heightState = Flip.getState(sliderImageRef.value)

            gsap.set(sliderImageRef.value, {
              height: activeItemRect.height,
              y: activeItemRect.top,
            })

            Flip.from(heightState, {
              duration: TIMING.BASE,
              ease: EASES.MAIN,
              onComplete: () => {
                gsap.to(sliderImageRef.value, {
                  opacity: 0,
                  duration: TIMING.SHORTEST,
                  ease: 'power2.inOut',
                  onComplete: () => {
                    sliderImageRef.value.style.visibility = 'hidden'
                    resolve()
                  },
                })
              },
            })
          },
        })
      },
    })

    // Hide UI elements
    contentTl.to(
      thumbnailItemsRef.value,
      {
        opacity: 0,
        y: 20,
        duration: TIMING.SHORT,
        stagger: -TIMING.STAGGER_TINY,
        ease: EASES.SIDE,
      },
      0,
    )

    contentTl.to(
      contentParagraphRef.value,
      {
        opacity: 0,
        duration: TIMING.SHORT,
        ease: EASES.MAIN,
      },
      TIMING.STAGGER_TINY,
    )

    contentTl.to(
      contentTitleSpanRef.value,
      {
        y: '100%',
        duration: TIMING.SHORT,
        ease: EASES.SIDE,
      },
      TIMING.STAGGER_SMALL,
    )

    contentTl.to(
      contentRef.value,
      {
        opacity: 0,
        duration: TIMING.SHORT,
        ease: EASES.MAIN,
      },
      TIMING.STAGGER_MED,
    )
  })
}

const transitionToSlide = (index) => {
  if (isAnimating.value || index === activeIndex.value) return
  isAnimating.value = true

  slideDirection.value = index > activeIndex.value ? 'right' : 'left'
  previousIndex.value = activeIndex.value

  const newImageUrl = slides.value[index].image
  const xOffset = slideDirection.value === 'right' ? '100%' : '-100%'

  // Setup transition elements
  sliderImageNextRef.value.style.backgroundImage = `none`
  sliderImageBgRef.value.style.backgroundImage = `url(${newImageUrl})`

  gsap.set([sliderImageNextRef.value, sliderImageBgRef.value], {
    visibility: 'visible',
  })

  gsap.set(sliderImageNextRef.value, {
    x: xOffset,
    y: 0,
    opacity: 1,
    width: '100vw',
    height: '100vh',
  })

  gsap.set(sliderImageBgRef.value, {
    x: xOffset,
    y: 0,
    opacity: 1,
    width: '100vw',
    height: '100vh',
    scale: 1,
  })

  const masterTl = gsap.timeline({
    onComplete: () => {
      // Update main slider image
      sliderImageRef.value.style.backgroundImage = `url(${newImageUrl})`

      gsap.set([sliderImageNextRef.value, sliderImageBgRef.value, transitionOverlayRef.value], {
        opacity: 0,
        x: 0,
        y: 0,
        visibility: 'hidden',
      })

      gsap.set(sliderImageRef.value, {
        x: 0,
        opacity: 1,
      })

      activeIndex.value = index

      // Show content
      const showTl = gsap.timeline({
        onComplete: () => {
          isAnimating.value = false
        },
      })

      showTl.to(
        contentTitleSpanRef.value,
        {
          y: 0,
          duration: TIMING.BASE,
          ease: EASES.SIDE,
        },
        0,
      )

      showTl.to(
        contentParagraphRef.value,
        {
          opacity: 1,
          duration: TIMING.BASE,
          ease: EASES.MAIN,
        },
        TIMING.STAGGER_SMALL,
      )
    },
  })

  // Hide current content
  masterTl.to(
    contentParagraphRef.value,
    {
      opacity: 0,
      duration: TIMING.SHORT,
      ease: EASES.MAIN,
    },
    0,
  )

  masterTl.to(
    contentTitleSpanRef.value,
    {
      y: '100%',
      duration: TIMING.SHORT,
      ease: EASES.SIDE,
    },
    TIMING.STAGGER_TINY,
  )

  // Flash effect
  masterTl.to(
    transitionOverlayRef.value,
    {
      opacity: 0.15,
      duration: TIMING.SHORTEST,
      ease: 'power1.in',
    },
    TIMING.STAGGER_SMALL,
  )

  masterTl.to(
    transitionOverlayRef.value,
    {
      opacity: 0,
      duration: TIMING.SHORT,
      ease: 'power1.out',
    },
    TIMING.STAGGER_MED,
  )

  // Slide animations
  masterTl.to(
    sliderImageRef.value,
    {
      x: slideDirection.value === 'right' ? '-35%' : '35%',
      opacity: 1,
      duration: TIMING.LONG,
      ease: EASES.MAIN,
    },
    0,
  )

  masterTl.to(
    sliderImageBgRef.value,
    {
      x: '0%',
      y: 0,
      opacity: 1,
      scale: 1,
      duration: TIMING.LONG,
      ease: EASES.SIDE,
    },
    TIMING.STAGGER_TINY,
  )

  masterTl.to(
    sliderImageNextRef.value,
    {
      x: 0,
      opacity: 1,
      duration: TIMING.LONG,
      ease: EASES.SIDE,
    },
    TIMING.STAGGER_SMALL,
  )
}

const handleThumbnailClick = (index) => {
  if (currentMode.value !== 'slider' || isAnimating.value) return
  transitionToSlide(index)
}

const handleGridItemClick = (index) => {
  if (currentMode.value === 'grid' && !isAnimating.value) {
    activeIndex.value = index
    toggleView('slider')
  }
}

// Keyboard navigation
const handleKeydown = (e) => {
  if (currentMode.value !== 'slider' || isAnimating.value) return

  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    const nextIndex = (activeIndex.value + 1) % slides.value.length
    transitionToSlide(nextIndex)
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    const prevIndex = (activeIndex.value - 1 + slides.value.length) % slides.value.length
    transitionToSlide(prevIndex)
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  window.addEventListener('resize', handleResize)
  handleResize() // 초기 뷰포트 크기 설정
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.work-modal-content {
  width: 100%;
  height: 100vh;
  padding: 0;
  background-color: #111;
  color: #f0f0f0;
  overflow: hidden;
}

.work-modal-body {
  position: relative;
  width: 100%;
  height: 100%;
}

/* Grid layout */
.container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.grid-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 0;
  width: 100%;
  height: 100%;
  will-change: transform;
}

.grid-item {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.grid-item:hover {
  opacity: 0.9;
}

.grid-item-img {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

/* Slide layers */
.slider-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  z-index: 80;
  opacity: 0;
  visibility: hidden;
  will-change: transform, opacity;
}

.slider-image-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  z-index: 85;
  opacity: 0;
  visibility: hidden;
  will-change: transform;
  transform-origin: center;
}

.slider-image-next {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  z-index: 90;
  opacity: 0;
  visibility: hidden;
  will-change: transform;
  transform-origin: center;
}

.transition-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 95;
  opacity: 0;
  visibility: hidden;
  will-change: opacity;
}

/* Content */
.content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;
  opacity: 0;
  padding: 10% 10%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.content-title {
  text-align: left;
  font-size: var(--hero--1);
  color: rgb(var(--white--1));
  text-transform: uppercase;
  letter-spacing: -0.02em;
  overflow: hidden;
  font-weight: var(--font-weight--bold);
}

.content-title span {
  display: inline-block;
  transform: translateY(100%);
  background-color: rgb(var(--gray--0));
}

.content-paragraph {
  text-align: left;
  font-size: var(--body--1--normal);
  color: rgb(var(--white--1));
  max-width: 600px;
  line-height: 1.3;
  margin-bottom: 10%;
  opacity: 0;
  background-color: rgb(var(--gray--0));
}

.description-line {
  display: block;
}

.description-line:not(:last-child) {
  margin-bottom: 0.5em;
}

/* Thumbnails */
.thumbnails {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  z-index: 200;
}

.thumbnail {
  width: 60px;
  height: 40px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
  transition: border 0.3s ease;
}

.thumbnail-img {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.thumbnail:hover {
  border: 2px solid rgba(255, 255, 255, 0.7);
}

.thumbnail.active {
  border: 2px solid #fff;
}

/* Switch */
.switch {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  background: #222;
  padding: 10px 20px;
  border-radius: 4px;
  z-index: 1000;
}

.switch-button {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 14px;
  padding: 5px 10px;
  position: relative;
  transition: all 0.3s ease-in-out;
}

.switch-button-current {
  color: #f0f0f0;
}

.indicator-dot {
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #f0f0f0;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  top: 50%;
  transform: translateY(-50%);
}

.switch-button-grid .indicator-dot {
  left: -8px;
}

.switch-button-slider .indicator-dot {
  right: -8px;
}

.switch-button:hover .indicator-dot,
.switch-button-current .indicator-dot {
  opacity: 1;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }

  .content-title {
    font-size: 3rem;
  }

  .content-paragraph {
    margin-bottom: 20%;
  }

  .thumbnails {
    display: none;
  }
}
</style>
