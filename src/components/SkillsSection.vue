<template>
  <section id="skills" class="skills-section" ref="skillsSectionRef">
    <div class="skills-container">
      <svg
        ref="skillsTitleRef"
        class="skills-title"
        viewBox="0 0 200 70"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          class="skills-title-text"
          x="0"
          y="50"
          font-family="Wanted Sans Variable, Wanted Sans, sans-serif"
          font-size="56"
          font-weight="700"
          letter-spacing="-0.02em"
        >
          Skills
        </text>
      </svg>
      <!-- Developer Section -->
      <div class="skill-card skill-card-developer">
        <img
          :src="getSkillGroupImage('developer')"
          alt="Developer background"
          class="skill-card-bg"
        />
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
      </div>

      <!-- Designer Section -->
      <div class="skill-card skill-card-designer">
        <img
          :src="getSkillGroupImage('designer')"
          alt="Designer background"
          class="skill-card-bg"
        />
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
      </div>

      <!-- Creator Section -->
      <div class="skill-card skill-card-creator">
        <img :src="getSkillGroupImage('creator')" alt="Creator background" class="skill-card-bg" />
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
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SkillChip from './common/SkillChip.vue'
import { getTabletBreakpoint, getMobileBreakpoint } from '@/utils/breakpoints'

gsap.registerPlugin(ScrollTrigger)

const developerSkills = ['Javascript', 'Vue', 'Flutter', 'Git', 'Sass', 'Firebase', 'Supabase']
const designerSkills = ['Figma', 'Illustrator', 'Photoshop', 'Lightroom']
const creatorSkills = ['Blender', 'Premiere', 'After effect', 'Kicad']

const isMobileOrTablet = ref(false)
const skillsTitleRef = ref(null)
const skillsSectionRef = ref(null)
let titleAnimation = null

const checkScreenSize = () => {
  const tabletBreakpoint = getTabletBreakpoint()
  isMobileOrTablet.value = window.innerWidth <= tabletBreakpoint
}

const isMobile = () => {
  const mobileBreakpoint = getMobileBreakpoint()
  return window.innerWidth <= mobileBreakpoint
}

const setupScrollTrigger = () => {
  if (!skillsTitleRef.value || !skillsSectionRef.value) return

  // 기존 애니메이션 kill
  if (titleAnimation) {
    titleAnimation.kill()
    titleAnimation = null
  }
  gsap.killTweensOf(skillsTitleRef.value)

  if (isMobile()) {
    // 모바일: 초기 상태 숨김, 스크롤 시 등장
    // PortfolioHeader와 동일한 타이밍과 효과로 맞춤
    gsap.set(skillsTitleRef.value, {
      opacity: 0,
      filter: 'blur(40px)',
      y: '-10%',
      display: 'block',
    })

    // gsap.to()에 scrollTrigger를 직접 넣는 방식으로 변경
    titleAnimation = gsap.to(skillsTitleRef.value, {
      opacity: 1,
      filter: 'blur(0px)',
      y: '0%',
      ease: 'power2.out',
      scrollTrigger: {
        trigger: skillsSectionRef.value,
        start: 'top 90%',
        end: 'top center',
        scrub: true,
      },
    })
  } else {
    // 데스크톱/태블릿: 숨김
    gsap.set(skillsTitleRef.value, {
      opacity: 0,
      display: 'none',
    })
  }
}

onMounted(() => {
  checkScreenSize()
  setupScrollTrigger()

  window.addEventListener('resize', () => {
    checkScreenSize()
    setupScrollTrigger()
    ScrollTrigger.refresh()
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
  if (titleAnimation) {
    titleAnimation.kill()
    titleAnimation = null
  }
  if (skillsTitleRef.value) {
    gsap.killTweensOf(skillsTitleRef.value)
  }
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
})

const getSkillGroupImage = (type) => {
  const suffix = isMobileOrTablet.value ? '_sm' : '_md'
  return new URL(`../assets/img/skill_group/Skill_img_group_${type}${suffix}.png`, import.meta.url)
    .href
}
</script>

<style scoped>
@import '@/assets/breakpoints.css';

.skills-section {
  width: 100%;
  padding: 120px 40px;
  position: relative;
}

.skills-container {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr;
  grid-template-rows: auto;
  gap: 40px;
  width: 100%;
}

.skills-title {
  width: 100%;
  height: auto;
  max-width: 200px;
  display: block;
  margin: 0 0 60px 0;
  grid-column: 1;
  grid-row: 1;
}

.skills-title-text {
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: var(--display--1--bold);
  font-weight: 700;
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
  font-size: var(--title--2--medium);
  font-weight: 500;
  margin: 0;
  letter-spacing: -0.02em;
  color: rgb(var(--gray--1));
  grid-column: 1;
  grid-row: 1;
}

.skill-card-description {
  font-size: var(--body--1--normal--regular);
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
  .skills-section {
    padding: 80px 30px;
  }

  .skills-container {
    grid-template-columns: 1fr 3fr;
    grid-template-rows: auto;
    gap: 30px;
  }

  .skills-title {
    margin-bottom: 40px;
  }

  .skills-title-text {
    font-size: var(--display--2--bold);
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
    font-size: var(--title--3--medium);
  }
}

/* Mobile: --mobile */
@media (--mobile) {
  .skills-section {
    padding: 0px 20px;
  }

  .skills-container {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, auto);
    gap: 24px;
  }

  .skills-title {
    margin-bottom: 30px;
    grid-column: 1;
    grid-row: 1;
  }

  .skills-title-text {
    font-size: var(--title--1--bold);
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
    font-size: var(--heading--1--medium);
  }

  .skill-card-description {
    font-size: var(--body--2--normal--regular);
  }

  .skill-card-header {
    grid-template-columns: 3fr 1fr;
    grid-template-rows: auto;
  }
}
</style>
