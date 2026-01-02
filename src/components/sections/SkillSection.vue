<template>
  <section id="skill" class="skill-section" ref="skillSectionRef" aria-labelledby="skill-heading">
    <div class="skill-container">
      <h2 id="skill-heading" class="visually-hidden">Skill</h2>
      <svg
        ref="skillTitleRef"
        class="skill-title"
        viewBox="0 0 200 70"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <text
          class="skill-title-text"
          x="0"
          y="50"
          font-family="Wanted Sans Variable, Wanted Sans, sans-serif"
          font-size="56"
          font-weight="700"
          letter-spacing="-0.02em"
        >
          Skill
        </text>
      </svg>
      <!-- Developer Section -->
      <article ref="developerCardRef" class="skill-card skill-card-developer">
        <img :src="skillGroupImages.developer" alt="" class="skill-card-bg" aria-hidden="true" />
        <div class="skill-card-content">
          <div class="skill-card-header">
            <h3 class="skill-card-title">Developer</h3>
            <p class="skill-card-description">
              JavaScript specialist with Vue.js and Flutter expertise. I transform ideas into
              functional applications through rapid prototyping.
            </p>
          </div>
          <div class="skill-chips">
            <SkillChip v-for="skill in developerSkills" :key="skill" :label="skill" />
          </div>
        </div>
      </article>

      <!-- Designer Section -->
      <article ref="designerCardRef" class="skill-card skill-card-designer">
        <img :src="skillGroupImages.designer" alt="" class="skill-card-bg" aria-hidden="true" />
        <div class="skill-card-content">
          <div class="skill-card-header">
            <h3 class="skill-card-title">Designer</h3>
            <p class="skill-card-description">
              UI/UX designer bridging vision and development with Figma. Creating holistic solutions
              from interfaces to visual assets.
            </p>
          </div>
          <div class="skill-chips">
            <SkillChip v-for="skill in designerSkills" :key="skill" :label="skill" />
          </div>
        </div>
      </article>

      <!-- Creator Section -->
      <article ref="creatorCardRef" class="skill-card skill-card-creator">
        <img :src="skillGroupImages.creator" alt="" class="skill-card-bg" aria-hidden="true" />
        <div class="skill-card-content">
          <div class="skill-card-header">
            <h3 class="skill-card-title">Creator</h3>
            <p class="skill-card-description">
              Keyboard designer combining 3D modeling and PCB engineering. Documenting the maker
              journey through video.
            </p>
          </div>
          <div class="skill-chips">
            <SkillChip v-for="skill in creatorSkills" :key="skill" :label="skill" />
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SkillChip from '../common/SkillChip.vue'
import { useResponsive } from '@/composables/useResponsive'

gsap.registerPlugin(ScrollTrigger)

const developerSkills = ['Javascript', 'Vue', 'Flutter', 'Git', 'Sass', 'Firebase', 'Supabase']
const designerSkills = ['Figma', 'Illustrator', 'Photoshop', 'Lightroom']
const creatorSkills = ['Blender', 'Premiere', 'After effect', 'Kicad']

const { isMobile, isMobileOrTablet } = useResponsive()

const skillTitleRef = ref(null)
const skillSectionRef = ref(null)
const developerCardRef = ref(null)
const designerCardRef = ref(null)
const creatorCardRef = ref(null)
let titleAnimation = null
let cardAnimations = []
let resizeHandler = null

// 이미지 경로를 computed로 메모이제이션
const skillGroupImages = computed(() => {
  const suffix = isMobileOrTablet.value ? '_sm' : '_md'
  return {
    developer: new URL(
      `../../assets/images/skills/Skill_img_group_developer${suffix}.png`,
      import.meta.url,
    ).href,
    designer: new URL(
      `../../assets/images/skills/Skill_img_group_designer${suffix}.png`,
      import.meta.url,
    ).href,
    creator: new URL(
      `../../assets/images/skills/Skill_img_group_creator${suffix}.png`,
      import.meta.url,
    ).href,
  }
})

const setupScrollTrigger = () => {
  if (!skillTitleRef.value || !skillSectionRef.value) return

  // 기존 애니메이션 kill
  if (titleAnimation) {
    titleAnimation.kill()
    titleAnimation = null
  }
  cardAnimations.forEach((anim) => anim.kill())
  cardAnimations = []
  gsap.killTweensOf(skillTitleRef.value)
  if (developerCardRef.value) gsap.killTweensOf(developerCardRef.value)
  if (designerCardRef.value) gsap.killTweensOf(designerCardRef.value)
  if (creatorCardRef.value) gsap.killTweensOf(creatorCardRef.value)

  const skillCards = [developerCardRef.value, designerCardRef.value, creatorCardRef.value].filter(
    Boolean,
  )

  if (isMobile.value) {
    // 모바일: 초기 상태 숨김, 스크롤 시 등장
    // PortfolioHeader와 동일한 타이밍과 효과로 맞춤
    gsap.set(skillTitleRef.value, {
      opacity: 0,
      filter: 'blur(40px)',
      y: '-10%',
      display: 'block',
    })

    // gsap.to()에 scrollTrigger를 직접 넣는 방식으로 변경
    titleAnimation = gsap.to(skillTitleRef.value, {
      opacity: 1,
      filter: 'blur(0px)',
      y: '0%',
      ease: 'power2.out',
      scrollTrigger: {
        trigger: skillSectionRef.value,
        start: 'top 90%',
        end: 'top center',
        scrub: true,
      },
    })

    // 카드들 초기 상태 설정
    skillCards.forEach((card) => {
      gsap.set(card, {
        opacity: 0,
        y: 30,
      })
    })

    // 카드들 순차적으로 등장
    skillCards.forEach((card, index) => {
      const animation = gsap.to(card, {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        duration: 0.8,
        delay: index * 0.15,
        scrollTrigger: {
          trigger: card,
          start: 'bottom bottom',
          toggleActions: 'play none none none',
        },
        markers: true,
      })
      cardAnimations.push(animation)
    })
  } else {
    // 데스크톱/태블릿: 타이틀 숨김
    gsap.set(skillTitleRef.value, {
      opacity: 0,
      display: 'none',
    })

    // 카드들 초기 상태 설정
    skillCards.forEach((card) => {
      gsap.set(card, {
        opacity: 0,
        y: 30,
      })
    })

    // 카드들 순차적으로 등장
    skillCards.forEach((card, index) => {
      const animation = gsap.to(card, {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        duration: 0.8,
        delay: index * 0.15,
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          toggleActions: 'play none none none',
        },
      })
      cardAnimations.push(animation)
    })
  }
}

onMounted(() => {
  setupScrollTrigger()

  // resize 이벤트 리스너 등록
  resizeHandler = () => {
    setupScrollTrigger()
    ScrollTrigger.refresh()
  }
  window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
  // resize 이벤트 리스너 정리
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
    resizeHandler = null
  }

  // 애니메이션 정리
  if (titleAnimation) {
    titleAnimation.kill()
    titleAnimation = null
  }
  cardAnimations.forEach((anim) => anim.kill())
  cardAnimations = []

  // GSAP 트윈 정리
  if (skillTitleRef.value) {
    gsap.killTweensOf(skillTitleRef.value)
  }
  if (developerCardRef.value) gsap.killTweensOf(developerCardRef.value)
  if (designerCardRef.value) gsap.killTweensOf(designerCardRef.value)
  if (creatorCardRef.value) gsap.killTweensOf(creatorCardRef.value)

  // ScrollTrigger 정리
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
})
</script>

<style scoped>
@import '@/assets/styles/breakpoints.css';

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

.skill-section {
  width: 100%;
  padding: 120px 40px;
  position: relative;
}

.skill-container {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr;
  grid-template-rows: auto;
  gap: 40px;
  width: 100%;
}

.skill-title {
  width: 100%;
  height: auto;
  max-width: 200px;
  display: block;
  margin: 0 0 60px 0;
  grid-column: 1;
  grid-row: 1;
}

.skill-title-text {
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: var(--display--1);
  font-weight: var(--font-weight--bold);
  fill: rgb(var(--gray--1));
  letter-spacing: -0.02em;
}

.skill-card-developer {
  grid-column: 2;
  grid-row: 1;
}

.skill-card-designer {
  grid-column: 3;
  grid-row: 1;
}

.skill-card-creator {
  grid-column: 2;
  grid-row: 2;
}

.skill-card {
  position: relative;
  background-color: transparent;
  border-radius: 12px;
  padding: 40px;
  overflow: hidden;
}

.skill-card-bg {
  position: absolute;
  top: 0;
  right: 0px;
  z-index: 0;
}

.skill-card-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 24px;
}

.skill-card-header {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto;
  gap: 16px 24px;
}

.skill-card-title {
  font-size: var(--title--2);
  font-weight: var(--font-weight--medium);
  margin: 0;
  letter-spacing: -0.02em;
  color: rgb(var(--gray--1));
  grid-column: 1;
  grid-row: 1;
}

.skill-card-description {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  line-height: 1.6;
  color: rgb(var(--gray--5s));
  margin: 0;
  grid-column: 1;
  grid-row: 2;
}

.skill-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* Tablet: --tablet */
@media (--tablet) {
  .skill-section {
    padding: 80px 30px;
  }

  .skill-container {
    grid-template-columns: 1fr 3fr;
    grid-template-rows: auto;
    gap: 30px;
  }

  .skill-title {
    margin-bottom: 40px;
  }

  .skill-title-text {
    font-size: var(--display--2);
    font-weight: var(--font-weight--bold);
  }

  .skill-card-developer {
    grid-column: 2;
    grid-row: 1;
  }

  .skill-card-designer {
    grid-column: 2;
    grid-row: 2;
  }

  .skill-card-creator {
    grid-column: 2;
    grid-row: 3;
  }

  .skill-card {
    padding: 10px 30px;
  }

  .skill-card-title {
    font-size: var(--title--3);
    font-weight: var(--font-weight--medium);
  }
}

/* Mobile: --mobile */
@media (--mobile) {
  .skill-section {
    padding: 0px 20px;
  }

  .skill-container {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, auto);
    gap: 24px;
  }

  .skill-title {
    margin-bottom: 30px;
    grid-column: 1;
    grid-row: 1;
  }

  .skill-title-text {
    font-size: var(--title--1);
    font-weight: var(--font-weight--bold);
  }

  .skill-card-developer {
    grid-column: 1;
    grid-row: 2;
  }

  .skill-card-designer {
    grid-column: 1;
    grid-row: 3;
  }

  .skill-card-creator {
    grid-column: 1;
    grid-row: 4;
  }

  .skill-card {
    min-height: auto;
    padding: 24px;
  }

  .skill-card-title {
    font-size: var(--heading--1);
    font-weight: var(--font-weight--medium);
  }

  .skill-card-description {
    font-size: var(--body--2--normal);
    font-weight: var(--font-weight--regular);
  }

  .skill-card-header {
    grid-template-columns: 3fr 1fr;
    grid-template-rows: auto;
  }
}
</style>
