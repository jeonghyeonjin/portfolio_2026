<template>
  <section class="hero-section" ref="heroSectionRef">
    <div class="hero-grid">
      <div class="hero-grid-item hero-grid-item-empty"></div>
      <div class="hero-grid-item hero-grid-item-image">
        <div class="hero-image-container">
          <img src="@/assets/hero.png" alt="Hero" class="hero-image" ref="heroImageRef" />
          <svg
            class="hero-bg-svg"
            viewBox="0 0 715 806"
            xmlns="http://www.w3.org/2000/svg"
            ref="heroBgSvgRef"
          >
            <path
              ref="heroBgPathRef"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M392.206 0.607399C483.425 4.94157 579.379 38.8412 635.075 109.419C686.573 174.677 651.971 267.339 666.681 348.422C678.507 413.609 722.644 471.433 712.629 536.908C701.534 609.446 666.16 678.669 608.895 726.214C548.918 776.01 469.479 817.851 392.206 802.941C317.31 788.489 293.979 693.714 229.99 653.104C159.976 608.67 37.9131 633.022 5.91028 557.779C-25.4405 484.069 77.1598 419.319 97.7018 342.076C120.456 256.512 73.1635 153.143 131.509 85.4931C191.956 15.4065 298.403 -3.8495 392.206 0.607399Z"
              class="hero-bg-path"
              fill="rgb(250, 189, 47)"
            />
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { getTabletBreakpoint } from '@/utils/breakpoints'

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin)

const heroSectionRef = ref(null)
const heroImageRef = ref(null)
const heroBgSvgRef = ref(null)
const heroBgPathRef = ref(null)
let heroBgSvgAnimation = null
let heroBgPathAnimation = null

const isTablet = () => {
  const tabletBreakpoint = getTabletBreakpoint()
  return window.innerWidth <= tabletBreakpoint
}

onMounted(() => {
  if (!heroImageRef.value || !heroSectionRef.value) return

  const tablet = isTablet()

  gsap.to(heroImageRef.value, {
    scrollTrigger: {
      trigger: heroSectionRef.value,
      start: 'top top',
      end: 'center top',
      scrub: true,
    },
    // x: '200%',
    // scale: 1.5,
    autoAlpha: 0,
    ease: 'power2.in',
  })

  // hero-bg-svg 스크롤 애니메이션 (blur) - 태블릿에서는 제거하여 성능 최적화
  if (!tablet) {
    gsap.to(heroBgSvgRef.value, {
      filter: 'blur(100px)',
      scrollTrigger: {
        trigger: heroSectionRef.value,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }

  // hero-bg-svg 부드러운 움직임 애니메이션 (무한 반복) - 태블릿에서는 간소화
  if (heroBgSvgRef.value) {
    heroBgSvgAnimation = gsap.to(heroBgSvgRef.value, {
      x: tablet ? '+=15' : '+=30',
      y: tablet ? '+=10' : '+=20',
      rotation: tablet ? 5 : 10,
      scale: tablet ? 1.05 : 1.1,
      duration: tablet ? 15 : 10,
      ease: 'power2.inOut',
      repeat: -1,
      yoyo: true,
    })
  }

  // hero-bg-path morphing 애니메이션 - 태블릿에서는 간소화
  if (heroBgSvgRef.value && heroBgPathRef.value) {
    // hero-bg-svg 내의 모든 path 요소들의 d 속성을 배열로 가져오기
    const shapes = gsap.utils.toArray('path', heroBgSvgRef.value).map((el) => el.getAttribute('d'))

    // path가 하나 이상 있을 때만 애니메이션 적용
    if (shapes.length > 0) {
      // 랜덤하게 path를 선택하는 함수
      const getRandomShape = gsap.utils.random(shapes, true)

      // morphing 애니메이션 - 태블릿에서는 repeatRefresh 제거하고 duration 증가
      heroBgPathAnimation = gsap.to(heroBgPathRef.value, {
        morphSVG: getRandomShape,
        repeat: -1,
        repeatRefresh: !tablet, // 태블릿에서는 false로 설정하여 성능 최적화
        duration: tablet ? 1.5 : 0.5, // 태블릿에서는 더 느리게
        ease: 'power1.inOut',
      })
    }
  }
})

onUnmounted(() => {
  if (heroBgSvgAnimation) {
    heroBgSvgAnimation.kill()
    heroBgSvgAnimation = null
  }
  if (heroBgPathAnimation) {
    heroBgPathAnimation.kill()
    heroBgPathAnimation = null
  }
  if (heroBgSvgRef.value) {
    gsap.killTweensOf(heroBgSvgRef.value)
  }
  if (heroBgPathRef.value) {
    gsap.killTweensOf(heroBgPathRef.value)
  }
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
})
</script>

<style scoped>
@import '@/assets/breakpoints.css';

.hero-section {
  width: calc(100vw - 40px);
  height: calc(100vh - 40px);
  /* height: 100vh;
  width: 100vw; */
  display: flex;
  align-items: center;
  background-color: var(--white--2);
  margin: 20px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
}

.hero-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70%;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.19983340274885466) 2.0408163265306123%,
    rgba(0, 0, 0, 0.19933361099541857) 4.081632653061225%,
    rgba(0, 0, 0, 0.1985006247396918) 6.122448979591836%,
    rgba(0, 0, 0, 0.19733444398167432) 8.16326530612245%,
    rgba(0, 0, 0, 0.1958350687213661) 10.204081632653061%,
    rgba(0, 0, 0, 0.1940024989587672) 12.244897959183673%,
    rgba(0, 0, 0, 0.19183673469387757) 14.285714285714285%,
    rgba(0, 0, 0, 0.18933777592669723) 16.3265306122449%,
    rgba(0, 0, 0, 0.18650562265722617) 18.367346938775512%,
    rgba(0, 0, 0, 0.1833402748854644) 20.408163265306122%,
    rgba(0, 0, 0, 0.17984173261141192) 22.448979591836736%,
    rgba(0, 0, 0, 0.17600999583506875) 24.489795918367346%,
    rgba(0, 0, 0, 0.17184506455643483) 26.53061224489796%,
    rgba(0, 0, 0, 0.1673469387755102) 28.57142857142857%,
    rgba(0, 0, 0, 0.1625156184922949) 30.612244897959183%,
    rgba(0, 0, 0, 0.15735110370678885) 32.6530612244898%,
    rgba(0, 0, 0, 0.1518533944189921) 34.69387755102041%,
    rgba(0, 0, 0, 0.14602249062890463) 36.734693877551024%,
    rgba(0, 0, 0, 0.13985839233652647) 38.775510204081634%,
    rgba(0, 0, 0, 0.13336109954185755) 40.816326530612244%,
    rgba(0, 0, 0, 0.12653061224489798) 42.857142857142854%,
    rgba(0, 0, 0, 0.11936693044564765) 44.89795918367347%,
    rgba(0, 0, 0, 0.11187005414410661) 46.93877551020408%,
    rgba(0, 0, 0, 0.1040399833402749) 48.97959183673469%,
    rgba(0, 0, 0, 0.09596001665972508) 51.02040816326531%,
    rgba(0, 0, 0, 0.08812994585589338) 53.06122448979592%,
    rgba(0, 0, 0, 0.08063306955435237) 55.10204081632652%,
    rgba(0, 0, 0, 0.07346938775510203) 57.14285714285714%,
    rgba(0, 0, 0, 0.06663890045814244) 59.183673469387756%,
    rgba(0, 0, 0, 0.06014160766347354) 61.224489795918366%,
    rgba(0, 0, 0, 0.05397750937109538) 63.26530612244898%,
    rgba(0, 0, 0, 0.04814660558100789) 65.3061224489796%,
    rgba(0, 0, 0, 0.04264889629321117) 67.3469387755102%,
    rgba(0, 0, 0, 0.03748438150770511) 69.38775510204081%,
    rgba(0, 0, 0, 0.032653061224489825) 71.42857142857143%,
    rgba(0, 0, 0, 0.02815493544356515) 73.46938775510205%,
    rgba(0, 0, 0, 0.0239900041649313) 75.51020408163265%,
    rgba(0, 0, 0, 0.020158267388588115) 77.55102040816327%,
    rgba(0, 0, 0, 0.01665972511453559) 79.59183673469387%,
    rgba(0, 0, 0, 0.013494377342773866) 81.63265306122449%,
    rgba(0, 0, 0, 0.010662224073302806) 83.6734693877551%,
    rgba(0, 0, 0, 0.008163265306122491) 85.71428571428571%,
    rgba(0, 0, 0, 0.005997501041232811) 87.75510204081633%,
    rgba(0, 0, 0, 0.00416493127863396) 89.79591836734694%,
    rgba(0, 0, 0, 0.00266555601832566) 91.83673469387756%,
    rgba(0, 0, 0, 0.0014993752603082445) 93.87755102040816%,
    rgba(0, 0, 0, 0.0006663890045814358) 95.91836734693877%,
    rgba(0, 0, 0, 0.00016659725114537282) 97.95918367346938%,
    rgba(0, 0, 0, 0) 100%
  );
  pointer-events: none;
  z-index: 0;
}

.hero-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  height: 100%;
  gap: 0;
  z-index: 1;
}

.hero-grid-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-grid-item-image {
  grid-column: 2 / 4;
  padding: 40px 80px;
  overflow: hidden;
}

.hero-image-container {
  position: relative;
  width: 100%;
  max-width: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-image {
  position: relative;
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
  will-change: transform, opacity;
  z-index: 2;
}

.hero-bg-svg {
  position: absolute;
  width: 80%;
  height: auto;
  max-width: 1000px;
  display: block;
  z-index: 1;
  top: -15%;
  left: 10%;
  pointer-events: none;
  will-change: transform, filter;
  transform: translate3d(0, 0, 0); /* GPU 가속 활성화 */
  /* opacity: 0.2; */
}

.hero-bg-svg :deep(path) {
  fill: var(--white--1) !important;
}

/* Tablet: --tablet */
@media (--tablet) {
  .hero-grid {
    grid-template-columns: 1fr;
  }

  .hero-grid-item-empty {
    display: none;
  }

  .hero-grid-item-image {
    grid-column: 1;
  }
}

@media (--mobile) {
  .hero-grid-item-image {
    padding: 20px;
  }
}
</style>
