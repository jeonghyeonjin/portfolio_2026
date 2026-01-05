<template>
  <section class="hero-section" ref="heroSectionRef">
    <div class="hero-section-container">
      <div class="hero-grid">
        <div class="hero-grid-item hero-grid-item-empty"></div>
        <div class="hero-grid-item hero-grid-item-image">
          <div class="hero-image-container">
            <div class="hero-image-wrapper">
              <img
                src="@/assets/images/hero/hero.png"
                alt="정현진 포트폴리오 메인 이미지"
                class="hero-image"
                ref="heroImageRef"
                :decoding="isFixed('hero-image-decoding') ? 'async' : 'sync'"
              />
              <Transition name="issue-marker">
                <div
                  v-if="!isFixed('hero-image-decoding') && isMarkersReady"
                  class="issue-marker-wrapper"
                  style="top: 10%; right: 10%"
                  @click.stop="openIssue('hero-image-decoding')"
                >
                  <IssueMarker />
                </div>
              </Transition>
            </div>
            <div class="hero-bg-container" aria-hidden="true">
              <svg
                class="hero-bg-svg"
                :class="{ 'is-optimized': isFixed('hero-bg-animation') }"
                viewBox="-10 -5 200 195"
                xmlns="http://www.w3.org/2000/svg"
                ref="heroBgSvgRef"
                aria-hidden="true"
              >
                <path
                  ref="heroBgPathRef"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M194.77,84.25c1.45-25-3.92-53.49-21-66.79S128,5.88,98.37,8.47s-60,6-76.79,23.35S1.52,80.51,8.35,106.8s23.63,47.68,44,61.57,44.38,20.41,65.69,16.49,40.07-18.39,53.54-36.27a116.17,116.17,0,0,0,23.15-64.34Z"
                  class="hero-bg-path"
                  fill="rgb(250, 189, 47)"
                />
              </svg>
            </div>
            <Transition name="issue-marker">
              <div
                v-if="!isFixed('hero-bg-animation') && isMarkersReady"
                class="issue-marker-wrapper"
                style="top: 20%; right: 20%; z-index: 10"
                @click.stop="openIssue('hero-bg-animation')"
              >
                <IssueMarker />
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>

    <a href="#" class="mouse-scroll" ref="mouseScrollRef">
      <div class="mouse-scroll__mouse">
        <div class="mouse-scroll__mouse-in"></div>
      </div>
      <div class="mouse-scroll__arrow">
        <span class="mouse-scroll__down-arrow"></span>
      </div>
    </a>

    <Teleport to="body">
      <SolutionModal />
    </Teleport>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject, watch } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { useBrokenPortfolio } from '@/composables/useBrokenPortfolio'
import { useResponsive } from '@/composables/useResponsive'
import IssueMarker from '@/components/broken/IssueMarker.vue'
import SolutionModal from '@/components/broken/SolutionModal.vue'
import heroShapes from '@/data/heroShapes.json'

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin)

const { isFixed, openIssue, isMarkersReady } = useBrokenPortfolio()
const { isTablet } = useResponsive()
const isWorkModalOpen = inject('isWorkModalOpen')

const heroSectionRef = ref(null)
const heroImageRef = ref(null)
const heroBgSvgRef = ref(null)
const heroBgPathRef = ref(null)
const mouseScrollRef = ref(null)
let heroBgPathAnimation = null
const scrollTriggers = ref([])

onMounted(() => {
  if (!heroImageRef.value || !heroSectionRef.value) return

  // 페이지 로딩 시 hero-image 등장 애니메이션 (아래에서 위로)
  gsap.fromTo(
    heroImageRef.value,
    {
      y: 60,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.3,
    },
  )

  // 페이지 로딩 시 hero-bg-svg 등장 애니메이션 (아래에서 위로, hero-image보다 늦게)
  if (heroBgSvgRef.value) {
    // 초기 상태를 즉시 설정
    gsap.set(heroBgSvgRef.value, {
      y: 60,
      opacity: 0,
    })

    gsap.to(heroBgSvgRef.value, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      delay: 1,
      onComplete: () => {
        // 등장 애니메이션 완료 후 morphSVG random 포인트 애니메이션 시작
        if (heroBgSvgRef.value && heroBgPathRef.value) {
          // 랜덤하게 shape를 선택하는 함수 생성
          const getRandomShape = gsap.utils.random(heroShapes, true)

          // morphing 애니메이션 - random 포인트로 계속 변경
          heroBgPathAnimation = gsap.to(heroBgPathRef.value, {
            morphSVG: getRandomShape,
            repeat: -1,
            repeatRefresh: true, // 매 반복마다 새로운 랜덤 포인트 선택
            duration: isTablet.value ? 10 : 10,
            ease: 'power2.inOut',
          })
        }
      },
    })
  }

  // hero-bg-svg 스크롤 애니메이션 (blur)
  // if (!tablet) {
  const bgBlurTween = gsap.to(heroBgSvgRef.value, {
    filter: 'blur(100px)',
    scrollTrigger: {
      trigger: heroSectionRef.value,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  })
  if (bgBlurTween.scrollTrigger) {
    scrollTriggers.value.push(bgBlurTween.scrollTrigger)
  }
  // }

  // 마우스 스크롤 애니메이션 숨김 처리
  if (mouseScrollRef.value) {
    const mouseScrollTween = gsap.to(mouseScrollRef.value, {
      opacity: 0,
      pointerEvents: 'none',
      scrollTrigger: {
        trigger: heroSectionRef.value,
        start: 'top top',
        end: '50px top',
        scrub: true,
      },
    })
    if (mouseScrollTween.scrollTrigger) {
      scrollTriggers.value.push(mouseScrollTween.scrollTrigger)
    }
  }
})

// 모달 상태에 따라 애니메이션 제어
watch(
  () => isWorkModalOpen?.value,
  (isOpen) => {
    if (heroBgPathAnimation) {
      if (isOpen) {
        heroBgPathAnimation.pause()
      } else {
        heroBgPathAnimation.play()
      }
    }
  },
)

onUnmounted(() => {
  // ScrollTrigger 정리
  scrollTriggers.value.forEach((trigger) => {
    if (trigger) trigger.kill()
  })
  scrollTriggers.value = []

  // 애니메이션 정리
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
  if (heroImageRef.value) {
    gsap.killTweensOf(heroImageRef.value)
  }
  if (mouseScrollRef.value) {
    gsap.killTweensOf(mouseScrollRef.value)
  }
})
</script>

<style scoped>
@import '@/assets/styles/breakpoints.css';
@import '@/assets/styles/issue-marker.css';

.hero-section {
  width: 100%;
  /* fallback for older browsers */
  height: 100vh;
  /* 모바일에서는 dvh 사용 */
  height: 100dvh;
  display: flex;
  align-items: center;
  position: relative;
  padding: 10px;
  overflow: hidden;
  overflow-x: hidden;
  max-width: 100%;
  box-sizing: border-box;
}

.hero-section-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: rgb(var(--white--2));
}

.hero-section-container::after {
  content: '';
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  height: 70%;
  border-radius: 20px;
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
  overflow: visible;
}

.hero-image-container {
  position: relative;
  width: 100%;
  max-width: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.is-interactive {
  cursor: pointer;
  pointer-events: auto;
}

.is-interactive::after {
  content: '';
  position: absolute;
  inset: -10px;
  border: 2px dashed rgba(var(--red--normal), 0.3);
  border-radius: 8px;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
}

.is-interactive:hover::after {
  opacity: 1;
}

.hero-image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.hero-image {
  position: relative;
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
  will-change: transform, opacity;
  z-index: 2;
  pointer-events: none;
}

.hero-bg-container {
  position: absolute;
  top: 0%;
  left: 0%;
  right: 0%;
  bottom: 0%;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-bg-svg {
  position: relative;
  width: 80%;
  height: auto;
  max-width: 1000px;
  display: block;
  pointer-events: none;
}

.hero-bg-svg.is-optimized {
  will-change: transform, filter;
  transform: translate3d(0, 0, 0); /* GPU 가속 활성화 */
}

.hero-bg-svg :deep(path) {
  fill: rgb(var(--white--1)) !important;
}

.mouse-scroll {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  pointer-events: auto;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.mouse-scroll__mouse {
  height: 35px;
  width: 23px;
  border-radius: 10px;
  border: 2px solid rgb(var(--white--1));
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 5px;
}

.mouse-scroll__mouse-in {
  height: 6px;
  width: 3px;
  background: rgb(var(--white--1));
  border-radius: 1px;
  animation: mouse-scroll-animated 1.2s ease infinite;
}

.mouse-scroll__arrow {
  margin-top: 6px;
}

.mouse-scroll__down-arrow {
  display: block;
  width: 6px;
  height: 6px;
  transform: rotate(45deg);
  border-right: 2px solid rgb(var(--white--1));
  border-bottom: 2px solid rgb(var(--white--1));
  animation: mouse-scroll-arrow 1s infinite;
  animation-direction: alternate;
}

@keyframes mouse-scroll-animated {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(6px);
  }
}

@keyframes mouse-scroll-arrow {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
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
  .hero-section {
    /* padding: 0; */
  }
  .hero-section-container::after {
  }
  .hero-grid-item-image {
    height: 100dvh;
    padding: 20px;
  }

  .mouse-scroll {
    display: none;
  }
}
</style>
