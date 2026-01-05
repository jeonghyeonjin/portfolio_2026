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
              Specializing in <span class="text-highlight">JavaScript</span>-based development with
              proficiency in <span class="text-highlight">Vue.js</span> and
              <span class="text-highlight">Flutter</span>. I rapidly
              <span class="text-highlight">prototype</span> ideas and efficiently implement them
              into <span class="text-highlight">practical applications</span>. I enjoy creating the
              <span class="text-highlight">intersection</span> where ideas meet users.
            </p>
            <p class="skill-card-description-ko">
              자바스크립트 기반 개발을 전문으로 하며 Vue.js와 Flutter에 능숙합니다. 아이디어를
              빠르게 프로토타이핑하고 효율적으로 구현하여 실용적인 애플리케이션으로 전환합니다.
              아이디어와 사용자가 만나는 접점을 만드는 것을 좋아합니다.
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
              With a <span class="text-highlight">design background</span>, I create intuitive
              <span class="text-highlight">UI/UX solutions</span> using
              <span class="text-highlight">Figma</span> and Adobe XD. Beyond interface design, I'm
              skilled in <span class="text-highlight">visual asset production</span> and
              illustration work using <span class="text-highlight">Photoshop</span> and
              <span class="text-highlight">Illustrator</span>, considering both
              <span class="text-highlight">aesthetic appeal</span> and
              <span class="text-highlight">functional usability</span>.
            </p>
            <p class="skill-card-description-ko">
              디자인 전공을 바탕으로 Figma와 Adobe XD를 활용해 직관적인 UI/UX 솔루션을 만듭니다.
              Photoshop과 Illustrator를 활용한 비주얼 에셋 제작과 일러스트 작업에도 능숙하며, 심미적
              매력과 기능적 사용성을 모두 고려하고자 합니다.
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
              Passionate about <span class="text-highlight">keyboard design</span>, I combine
              <span class="text-highlight">3D modeling</span> with
              <span class="text-highlight">Blender</span> and
              <span class="text-highlight">PCB engineering</span> with Illustrator and
              <span class="text-highlight">KiCad</span> to create custom keyboard solutions from
              concept to reality. I document the creation process through
              <span class="text-highlight">video</span> using
              <span class="text-highlight">Premiere Pro</span> and After Effects.
            </p>
            <p class="skill-card-description-ko">
              키보드 디자인에 열정을 가지고 Blender를 활용한 3D 모델링과 Illustrator 및 KiCad를
              사용한 PCB 엔지니어링을 결합하여 컨셉부터 실물까지 커스텀 키보드 솔루션을 제작합니다.
              Premiere Pro와 After Effects로 제작 과정을 영상으로 기록합니다.
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
let highlightTriggers = []
let resizeHandler = null
const scrollTriggers = ref([])

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

  // 기존 ScrollTrigger 정리
  scrollTriggers.value.forEach((trigger) => {
    if (trigger) trigger.kill()
  })
  scrollTriggers.value = []

  // 기존 애니메이션 kill
  if (titleAnimation) {
    titleAnimation.kill()
    titleAnimation = null
  }
  cardAnimations.forEach((anim) => anim.kill())
  cardAnimations = []
  highlightTriggers.forEach((t) => t.kill())
  highlightTriggers = []
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
    if (titleAnimation.scrollTrigger) {
      scrollTriggers.value.push(titleAnimation.scrollTrigger)
    }

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
          start: 'center bottom',
          toggleActions: 'play none none none',
          // markers: true,
        },
      })
      cardAnimations.push(animation)
      if (animation.scrollTrigger) {
        scrollTriggers.value.push(animation.scrollTrigger)
      }
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
      if (animation.scrollTrigger) {
        scrollTriggers.value.push(animation.scrollTrigger)
      }
    })
  }

  // 텍스트 하이라이트 애니메이션
  const highlights = skillSectionRef.value.querySelectorAll('.text-highlight')
  highlights.forEach((highlight) => {
    highlight.classList.remove('active')
    const trigger = ScrollTrigger.create({
      trigger: highlight,
      start: 'top 70%',
      onEnter: () => highlight.classList.add('active'),
      onLeaveBack: () => highlight.classList.remove('active'),
    })
    highlightTriggers.push(trigger)
    scrollTriggers.value.push(trigger)
  })
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

  // ScrollTrigger 정리
  scrollTriggers.value.forEach((trigger) => {
    if (trigger) trigger.kill()
  })
  scrollTriggers.value = []

  // 애니메이션 정리
  if (titleAnimation) {
    titleAnimation.kill()
    titleAnimation = null
  }
  cardAnimations.forEach((anim) => anim.kill())
  cardAnimations = []

  // 하이라이트 트리거 정리
  highlightTriggers.forEach((t) => t.kill())
  highlightTriggers = []

  // GSAP 트윈 정리
  if (skillTitleRef.value) {
    gsap.killTweensOf(skillTitleRef.value)
  }
  if (developerCardRef.value) gsap.killTweensOf(developerCardRef.value)
  if (designerCardRef.value) gsap.killTweensOf(designerCardRef.value)
  if (creatorCardRef.value) gsap.killTweensOf(creatorCardRef.value)
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
  overflow-x: hidden;
  max-width: 100%;
  box-sizing: border-box;
}

.skill-container {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr;
  grid-template-rows: auto;
  gap: 40px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
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

.skill-card-description-ko {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  line-height: 1.6;
  color: rgb(var(--gray--5s));
  grid-column: 1;
  grid-row: 3;
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
    padding: 30px 20px;
  }

  .skill-container {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, auto);
    gap: 10px;
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

  .skill-card-description-ko {
    display: none;
  }
}
</style>
