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

      <!-- Thumbnails -->
      <div class="thumbnails-wrapper" ref="thumbnailsWrapperRef">
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
      </div>

      <!-- Switch Buttons -->
      <div class="switch" ref="switchRef">
        <button
          class="switch-button switch-button-grid"
          :class="{ 'switch-button-current': currentMode === 'grid' }"
          :disabled="isAnimating"
          @click="(toggleView('grid'), (isInfoVisible = false))"
        >
          <span class="indicator-dot"></span>
          GRID
        </button>
        <button
          class="switch-button switch-button-slider"
          :class="{ 'switch-button-current': currentMode === 'slider' }"
          :disabled="isAnimating"
          @click="(toggleView('slider'), (isInfoVisible = false))"
        >
          <span class="indicator-dot"></span>
          SLIDER
        </button>
      </div>

      <!-- Info Text -->
      <div v-if="currentMode === 'slider'" class="info-container" ref="infoContainerRef">
        <div class="info-text" :class="{ visible: isInfoVisible }" ref="infoTextRef" @click.stop>
          <div class="info-text-title">{{ currentSlide.title }}</div>
          <div class="info-text-line en">{{ currentSlide.description.en }}</div>
          <div class="info-text-line ko">{{ currentSlide.description.ko }}</div>
        </div>
      </div>
    </div>

    <!-- Overlay to catch outside clicks for info text -->
    <div
      v-if="currentMode === 'slider' && isInfoVisible"
      class="info-overlay"
      @click="closeInfo"
    ></div>

    <!-- Info Button - moved outside work-modal-body for mix-blend-mode -->
    <button
      v-if="currentMode === 'slider'"
      class="info-button"
      @click="toggleInfo"
      :class="{ active: isInfoVisible }"
      ref="infoButtonRef"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="info-icon"
      >
        <path
          d="M12 11V16M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12.0498 8V8.1L11.9502 8.1002V8H12.0498Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { gsap } from 'gsap'
import { Flip } from 'gsap/all'
import imgHero from '@/assets/images/works/master-forge/20241120_214422.jpg'
import imgHeroWide from '@/assets/images/works/master-forge/20241120_214422_1.jpg'
import imgPin from '@/assets/images/works/master-forge/m4g_pin.png'
import imgMockup from '@/assets/images/works/master-forge/m4g_pin_mockup.png'
import imgSticker from '@/assets/images/works/master-forge/m4g_sticker.png'
import modalData from '@/data/modals/WorkModalMasterForge.json'

gsap.registerPlugin(Flip)

// Refs
const containerRef = ref(null)
const gridContainerRef = ref(null)
const gridRef = ref(null)
const gridItemsRef = ref([])
const sliderImageRef = ref(null)
const sliderImageBgRef = ref(null)
const sliderImageNextRef = ref(null)
const transitionOverlayRef = ref(null)
const thumbnailsWrapperRef = ref(null)
const thumbnailsRef = ref(null)
const thumbnailItemsRef = ref([])
const switchRef = ref(null)
const infoContainerRef = ref(null)
const infoTextRef = ref(null)
const infoButtonRef = ref(null)

// State
const currentMode = ref('grid')
const isAnimating = ref(false)
const activeIndex = ref(0)
const previousIndex = ref(0)
const slideDirection = ref('right')
const viewportWidth = ref(window.innerWidth)
const viewportHeight = ref(window.innerHeight)
const isInfoVisible = ref(false)

// Computed
const isLandscape = computed(() => viewportWidth.value > viewportHeight.value)
const heroImage = computed(() => (isLandscape.value ? imgHeroWide : imgHero))

// Data from JSON
const slides = computed(() => {
  // JSON에서 가져온 슬라이드 데이터를 이미지 import와 매핑
  const imageMap = {
    '@/assets/images/works/master-forge/m4g_pin.png': imgPin,
    '@/assets/images/works/master-forge/m4g_pin_mockup.png': imgMockup,
    '@/assets/images/works/master-forge/m4g_sticker.png': imgSticker,
  }

  return modalData.slides.map((slide) => ({
    image: slide.isHero ? heroImage.value : imageMap[slide.imagePath] || slide.imagePath,
    title: slide.title,
    description: slide.description,
  }))
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

            // Show UI elements
            const contentTl = gsap.timeline({
              onComplete: resolve,
            })

            contentTl.to(
              thumbnailItemsRef.value,
              {
                opacity: 1,
                y: 0,
                duration: TIMING.SHORT,
                stagger: TIMING.STAGGER_TINY,
                ease: EASES.SIDE,
              },
              0,
            )

            // Scroll to active thumbnail after animation
            nextTick(() => {
              scrollToActiveThumbnail()
            })

            // Show info button and container
            if (infoButtonRef.value) {
              contentTl.fromTo(
                infoButtonRef.value,
                {
                  opacity: 0,
                  y: 20,
                  pointerEvents: 'none',
                },
                {
                  opacity: 1,
                  y: 0,
                  pointerEvents: 'auto',
                  duration: TIMING.SHORT,
                  ease: EASES.SIDE,
                },
                TIMING.STAGGER_TINY,
              )
            }
            if (infoContainerRef.value) {
              contentTl.fromTo(
                infoContainerRef.value,
                {
                  y: 20,
                  pointerEvents: 'none',
                },
                {
                  y: 0,
                  pointerEvents: 'auto',
                  duration: TIMING.SHORT,
                  ease: EASES.SIDE,
                },
                TIMING.STAGGER_TINY,
              )
            }
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
    if (infoButtonRef.value) {
      contentTl.to(
        infoButtonRef.value,
        {
          opacity: 0,
          y: 20,
          pointerEvents: 'none',
          duration: TIMING.SHORT,
          ease: EASES.SIDE,
        },
        0,
      )
    }
    if (infoContainerRef.value) {
      contentTl.to(
        infoContainerRef.value,
        {
          y: 20,
          pointerEvents: 'none',
          duration: TIMING.SHORT,
          ease: EASES.SIDE,
        },
        0,
      )
    }

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
  })
}

const transitionToSlide = (index) => {
  if (isAnimating.value || index === activeIndex.value) return
  isAnimating.value = true

  // Close info text when transitioning
  if (isInfoVisible.value) {
    isInfoVisible.value = false
  }

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
      isAnimating.value = false
    },
  })

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

const toggleInfo = () => {
  isInfoVisible.value = !isInfoVisible.value
}

const closeInfo = () => {
  isInfoVisible.value = false
}

// Scroll to active thumbnail
const scrollToActiveThumbnail = () => {
  if (!thumbnailsRef.value || !thumbnailItemsRef.value[activeIndex.value]) return

  nextTick(() => {
    const activeThumbnail = thumbnailItemsRef.value[activeIndex.value]
    const container = thumbnailsRef.value
    const containerRect = container.getBoundingClientRect()
    const thumbnailRect = activeThumbnail.getBoundingClientRect()

    const scrollLeft =
      thumbnailRect.left -
      containerRect.left +
      container.scrollLeft -
      containerRect.width / 2 +
      thumbnailRect.width / 2

    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth',
    })
  })
}

// Watch activeIndex to scroll to active thumbnail
watch(activeIndex, () => {
  if (currentMode.value === 'slider') {
    scrollToActiveThumbnail()
  }
})

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
@import '@/assets/styles/breakpoints.css';

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

/* Thumbnails */
.thumbnails-wrapper {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
  max-width: calc(100vw - 40px);
  overflow: hidden;
}

.thumbnails {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  padding: 0 10px;
}

.thumbnails::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.thumbnail {
  width: 60px;
  height: 40px;
  min-width: 60px;
  flex-shrink: 0;
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
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  background: #222;
  padding: 10px 20px;
  border-radius: 4px;
  z-index: 100;
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

.switch-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
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

/* Info Button */
.info-button {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 44px;
  height: 44px;
  background-color: transparent;
  border-radius: 50%;
  color: rgb(var(--white--2));
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  padding: 0;
  border: none;
  z-index: 98;
  mix-blend-mode: difference;
  opacity: 0;
  pointer-events: none;
}

.info-container {
  position: fixed;
  top: 74px;
  left: 20px;
  z-index: 98;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  pointer-events: none;
}

.info-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  inset: 0;
  z-index: 99;
  pointer-events: auto;
  background: transparent;
}

.info-button svg,
.info-button .info-icon {
  width: 24px;
  height: 24px;
}

.info-button:hover {
  color: rgb(var(--white--1));
  transform: scale(1.1);
}

.info-button.active {
  color: rgb(var(--white--1));
}

.info-text {
  max-width: 350px;
  padding: 16px;
  background-color: rgba(var(--gray--0), 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 8px;
  opacity: 0;
  transform: translateY(10px);
  pointer-events: none;
  transition: all 0.3s ease;
}

.info-text.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.info-text-title {
  display: flex;
  font-size: var(--title--2);
  color: rgb(var(--white--1));
  font-weight: var(--font-weight--bold);
  border-left: 4px solid rgba(var(--white--3), 0.5);
  padding-left: 16px;
  margin-bottom: 8px;
}

.info-text-line {
  font-size: var(--body--1--normal);
  color: rgb(var(--white--1));
  line-height: 1.4;
}

.info-text-line:not(:last-child) {
  margin-bottom: 8px;
}

.info-text-line.ko {
  font-size: var(--body--2--normal);
  color: rgb(var(--white--3));
}

@media (--mobile) {
  .thumbnails-wrapper {
    bottom: 20px;
    right: 20px;
    max-width: calc(100vw - 40px);
  }

  .info-text {
    max-width: calc(100vw - 80px);
  }
}
</style>
