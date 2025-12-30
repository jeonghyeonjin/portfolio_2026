<template>
  <section id="works" class="works-section" ref="worksSectionRef">
    <div class="works-container">
      <svg
        ref="worksTitleRef"
        class="works-title"
        viewBox="0 0 200 70"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          class="works-title-text"
          x="0"
          y="50"
          font-family="Wanted Sans Variable, Wanted Sans, sans-serif"
          font-size="56"
          font-weight="700"
          letter-spacing="-0.02em"
        >
          Works
        </text>
      </svg>
      <div class="works-grid">
        <div v-for="work in works" :key="work.id" class="work-item">
          <div class="work-image-placeholder"></div>
          <h3 class="work-title">{{ work.title }}</h3>
          <p class="work-description">{{ work.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getMobileBreakpoint } from '@/utils/breakpoints'

gsap.registerPlugin(ScrollTrigger)

const worksTitleRef = ref(null)
const worksSectionRef = ref(null)
let titleAnimation = null

const works = [
  {
    id: 1,
    title: 'Master Forge Piexl art',
    description:
      "Designed for the Master Forge keyboard's pin and sticker design contest on Kickstarter.",
  },
  {
    id: 2,
    title: 'Master Forge Piexl art',
    description:
      "Designed for the Master Forge keyboard's pin and sticker design contest on Kickstarter.",
  },
  {
    id: 3,
    title: 'Master Forge Piexl art',
    description:
      "Designed for the Master Forge keyboard's pin and sticker design contest on Kickstarter.",
  },
  {
    id: 4,
    title: 'Master Forge Piexl art',
    description:
      "Designed for the Master Forge keyboard's pin and sticker design contest on Kickstarter.",
  },
]

const isMobile = () => {
  const mobileBreakpoint = getMobileBreakpoint()
  return window.innerWidth <= mobileBreakpoint
}

const setupScrollTrigger = () => {
  if (!worksTitleRef.value || !worksSectionRef.value) return

  // 기존 애니메이션 kill
  if (titleAnimation) {
    titleAnimation.kill()
    titleAnimation = null
  }
  gsap.killTweensOf(worksTitleRef.value)

  if (isMobile()) {
    // 모바일: 초기 상태 숨김, 스크롤 시 등장
    // PortfolioHeader와 동일한 타이밍과 효과로 맞춤
    gsap.set(worksTitleRef.value, {
      opacity: 0,
      filter: 'blur(40px)',
      y: '-10%',
      display: 'block',
    })

    // gsap.to()에 scrollTrigger를 직접 넣는 방식으로 변경
    titleAnimation = gsap.to(worksTitleRef.value, {
      opacity: 1,
      filter: 'blur(0px)',
      y: '0%',
      ease: 'power2.out',
      scrollTrigger: {
        trigger: worksSectionRef.value,
        start: 'top 90%',
        end: 'top center',
        scrub: true,
      },
    })
  } else {
    // 데스크톱/태블릿: 숨김
    gsap.set(worksTitleRef.value, {
      opacity: 0,
      display: 'none',
    })
  }
}

onMounted(() => {
  setupScrollTrigger()

  window.addEventListener('resize', () => {
    setupScrollTrigger()
    ScrollTrigger.refresh()
  })
})

onUnmounted(() => {
  if (titleAnimation) {
    titleAnimation.kill()
    titleAnimation = null
  }
  if (worksTitleRef.value) {
    gsap.killTweensOf(worksTitleRef.value)
  }
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
})
</script>

<style scoped>
@import '@/assets/styles/breakpoints.css';

.works-section {
  width: 100%;
  padding: 120px 40px;
  position: relative;
}

.works-container {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr;
  grid-template-rows: auto;
  gap: 40px;
  width: 100%;
}

.works-title {
  width: 100%;
  height: auto;
  max-width: 200px;
  display: block;
  margin: 0 0 60px 0;
  grid-column: 1;
  grid-row: 1;
}

.works-title-text {
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: var(--display--1--bold);
  font-weight: 700;
  fill: rgb(var(--gray--1));
  letter-spacing: -0.02em;
}

.works-grid {
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
}

.work-image-placeholder {
  width: 100%;
  aspect-ratio: 1;
  background-color: rgb(var(--gray--5s));
  border-radius: 8px;
}

.work-title {
  font-size: var(--headline--1--medium);
  font-weight: 500;
  color: rgb(var(--gray--1));
  margin: 0;
}

.work-description {
  font-size: var(--body--1--normal--regular);
  line-height: 1.6;
  color: rgb(var(--gray--1));
  margin: 0;
}

/* Tablet: --tablet */
@media (--tablet) {
  .works-section {
    padding: 60px 30px;
  }

  .works-container {
    grid-template-columns: 1fr 3fr;
    grid-template-rows: auto;
    gap: 30px;
  }

  .works-title {
    margin-bottom: 40px;
  }

  .works-title-text {
    font-size: var(--display--2--bold);
  }

  .works-grid {
    grid-column: 2;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
}

/* Mobile: --mobile */
@media (--mobile) {
  .works-section {
    padding: 40px 20px;
  }

  .works-container {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, auto);
    gap: 24px;
  }

  .works-title {
    margin-bottom: 30px;
    grid-column: 1;
    grid-row: 1;
  }

  .works-title-text {
    font-size: var(--title--1--bold);
  }

  .works-grid {
    grid-column: 1;
    grid-row: 2;
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .work-title {
    font-size: var(--headline--1--medium);
  }

  .work-description {
    font-size: var(--body--2--normal--regular);
  }
}
</style>
