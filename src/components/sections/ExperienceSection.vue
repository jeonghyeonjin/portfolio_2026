<template>
  <section id="experience" class="experience-section" ref="experienceSectionRef" aria-labelledby="experience-heading">
    <div class="experience-container">
      <h2 id="experience-heading" class="visually-hidden">Experience</h2>
      <svg
        ref="experienceTitleRef"
        class="experience-title"
        viewBox="0 0 200 70"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <text
          class="experience-title-text"
          x="0"
          y="50"
          font-family="Wanted Sans Variable, Wanted Sans, sans-serif"
          font-size="56"
          font-weight="700"
          letter-spacing="-0.02em"
        >
          Experience
        </text>
      </svg>
      <div class="experience-list">
        <ExperienceItem
          v-for="(experience, index) in experiences"
          :key="experience.id"
          :experience="experience"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ExperienceItem from './ExperienceItem.vue'
import { useResponsive } from '@/composables/useResponsive'

gsap.registerPlugin(ScrollTrigger)

const { isMobile } = useResponsive()

const experienceTitleRef = ref(null)
const experienceSectionRef = ref(null)
let titleAnimation = null
let resizeHandler = null

const experiences = [
  {
    id: 1,
    date: 'Apr 2022 - Jan 2026',
    role: 'Frontend Developer & Lead UI/UX Designer',
    company: 'Taperlabs',
    description:
      'Designing and developing enterprise collaboration tools with focus on real-time features and cross-platform compatibility.',
    technologies: ['Flutter', 'Vue', 'SQLite', 'Figma', 'Adobe XD'],
    keyProjects: ['Tape | Collaborative workspace', 'Shadow | AI meeting transcription app'],
    impact: ['Responsive design', 'Real-time sync'],
  },
  {
    id: 2,
    date: 'Jan 2018 - Jul 2021',
    role: 'Frontend Developer',
    company: 'Samsung fire service',
    description:
      'Led mobile interface development for direct insurance platform serving millions of users.',
    technologies: ['JavaScript', 'jQuery', 'Node.js', 'Ajax'],
    achievements: [
      'Spearheaded 2018 mobile renewal project',
      'Developed insurance premium calculators',
      'Maintained mobile "My Direct" platform',
    ],
    impact: ['Performance optimization', 'Code reusability'],
  },
  {
    id: 3,
    date: 'Aug 20217 - Jan 2018',
    role: 'Frontend Developer',
    company: 'Cobaltlab',
    description: 'Mobile platform operations for Samsung Fire Direct services.',
    technologies: ['JavaScript', 'jQuery', 'Node.js', 'Ajax'],
  },
  {
    id: 4,
    date: 'Dec 2015 - Jul 2017',
    role: 'Junior Designer',
    company: 'Concepters',
    description: 'End-to-end design and development for marketing solutions and campaigns.',
    technologies: ['Photoshop', 'Illustrator'],
    keyProjects: [
      'BigBird | Big data marketing platform (clients: VSL3, Pulmuone, Siwon School)',
      'Pulmuone campaign (2017) | Character design, event pages, branding',
      'VSL probiotics campaign (2016) | SNS strategy, content creation',
    ],
  },
]

const setupScrollTrigger = () => {
  if (!experienceTitleRef.value || !experienceSectionRef.value) return

  // 기존 애니메이션 kill
  if (titleAnimation) {
    titleAnimation.kill()
    titleAnimation = null
  }
  gsap.killTweensOf(experienceTitleRef.value)

  if (isMobile.value) {
    // 모바일: 초기 상태 숨김, 스크롤 시 등장
    gsap.set(experienceTitleRef.value, {
      opacity: 0,
      filter: 'blur(40px)',
      y: '-10%',
      display: 'block',
    })

    titleAnimation = gsap.to(experienceTitleRef.value, {
      opacity: 1,
      filter: 'blur(0px)',
      y: '0%',
      ease: 'power2.out',
      scrollTrigger: {
        trigger: experienceSectionRef.value,
        start: 'top 90%',
        end: 'top center',
        scrub: true,
      },
    })
  } else {
    // 데스크톱/태블릿: 숨김
    gsap.set(experienceTitleRef.value, {
      opacity: 0,
      display: 'none',
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

  // GSAP 트윈 정리
  if (experienceTitleRef.value) {
    gsap.killTweensOf(experienceTitleRef.value)
  }

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

.experience-section {
  width: 100%;
  padding: 120px 40px;
  position: relative;
}

.experience-container {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr;
  grid-template-rows: auto;
  gap: 40px;
  width: 100%;
}

.experience-title {
  width: 100%;
  height: auto;
  max-width: 200px;
  display: block;
  margin: 0 0 60px 0;
  grid-column: 1;
  grid-row: 1;
}

.experience-title-text {
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: var(--display--1);
  font-weight: var(--font-weight--bold);
  fill: rgb(var(--gray--1));
  letter-spacing: -0.02em;
}

.experience-list {
  grid-column: 2 / 4;
  grid-row: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Tablet: --tablet */
@media (--tablet) {
  .experience-section {
    padding: 80px 30px;
  }

  .experience-container {
    grid-template-columns: 1fr 3fr;
    grid-template-rows: auto;
    gap: 30px;
  }

  .experience-title {
    margin-bottom: 40px;
  }

  .experience-title-text {
    font-size: var(--display--2);
    font-weight: var(--font-weight--bold);
  }

  .experience-list {
    grid-column: 2;
  }
}

/* Mobile: --mobile */
@media (--mobile) {
  .experience-section {
    padding: 40px 20px;
  }

  .experience-container {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, auto);
    gap: 24px;
  }

  .experience-title {
    margin-bottom: 30px;
    grid-column: 1;
    grid-row: 1;
  }

  .experience-title-text {
    font-size: var(--title--1);
    font-weight: var(--font-weight--bold);
  }

  .experience-list {
    grid-column: 1;
    grid-row: 2;
  }
}
</style>
