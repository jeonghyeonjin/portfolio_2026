<template>
  <div class="experience-item" :class="{ 'is-expanded': isExpanded }" ref="experienceItemRef">
    <span class="experience-date">{{ experience.date }}</span>
    <div class="experience-item-header" @click="toggleExpand">
      <div class="experience-item-main">
        <div class="experience-role-company">
          <span class="experience-role">{{ experience.role }}</span>
          <span class="experience-separator">·</span>
          <span class="experience-company">{{ experience.company }}</span>
        </div>
      </div>
      <button
        class="experience-toggle"
        :class="{ 'is-expanded': isExpanded }"
        aria-label="확장/축소"
      >
        <img v-if="isExpanded" :src="unfoldLessIcon" alt="접기" class="experience-toggle-icon" />
        <img v-else :src="unfoldMoreIcon" alt="펼치기" class="experience-toggle-icon" />
      </button>
    </div>
    <div v-if="isExpanded" class="experience-item-content">
      <p class="experience-description">{{ experience.description }}</p>

      <div class="experience-technologies">
        <SkillChip v-for="tech in experience.technologies" :key="tech" :label="tech" />
      </div>

      <div class="experience-details">
        <div
          v-if="experience.keyProjects && experience.keyProjects.length > 0"
          class="experience-detail-group"
        >
          <h4 class="experience-detail-title">Key Project</h4>
          <ul class="experience-detail-list">
            <li
              v-for="project in experience.keyProjects"
              :key="project"
              class="experience-detail-item"
            >
              {{ project }}
            </li>
          </ul>
        </div>

        <div
          v-if="experience.achievements && experience.achievements.length > 0"
          class="experience-detail-group"
        >
          <h4 class="experience-detail-title">Achievements</h4>
          <ul class="experience-detail-list">
            <li
              v-for="achievement in experience.achievements"
              :key="achievement"
              class="experience-detail-item"
            >
              {{ achievement }}
            </li>
          </ul>
        </div>

        <div
          v-if="experience.impact && experience.impact.length > 0"
          class="experience-detail-group"
        >
          <h4 class="experience-detail-title">Impact</h4>
          <ul class="experience-detail-list">
            <li v-for="impact in experience.impact" :key="impact" class="experience-detail-item">
              {{ impact }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SkillChip from '../common/SkillChip.vue'
import unfoldLessIcon from '@/assets/images/icons/unfold_less.svg'
import unfoldMoreIcon from '@/assets/images/icons/unfold_more.svg'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps({
  experience: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    default: 0,
  },
})

const experienceItemRef = ref(null)
const isExpanded = ref(props.index === 0)
let animation = null
const scrollTriggers = ref([])

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

onMounted(() => {
  if (!experienceItemRef.value) return

  // 초기 상태: 오른쪽에서 숨김
  gsap.set(experienceItemRef.value, {
    x: 100,
    opacity: 0,
  })

  // 스크롤 트리거 애니메이션
  animation = gsap.to(experienceItemRef.value, {
    x: 0,
    opacity: 1,
    duration: 0.6,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: experienceItemRef.value,
      start: 'top bottom',
      toggleActions: 'play none none none',
    },
  })
  if (animation.scrollTrigger) {
    scrollTriggers.value.push(animation.scrollTrigger)
  }
})

onUnmounted(() => {
  // ScrollTrigger 정리
  scrollTriggers.value.forEach((trigger) => {
    if (trigger) trigger.kill()
  })
  scrollTriggers.value = []

  // 애니메이션 정리
  if (animation) {
    animation.kill()
    animation = null
  }

  // GSAP 트윈 정리
  if (experienceItemRef.value) {
    gsap.killTweensOf(experienceItemRef.value)
  }
})
</script>

<style scoped>
@import '@/assets/styles/breakpoints.css';

.experience-item {
  position: relative;
  background-color: rgb(var(--white--1));
  border-radius: 8px;
  padding: 20px 24px;
  transition: all 0.3s ease;
  cursor: pointer;
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 24px;
  align-items: start;
}

.experience-date {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  color: rgb(var(--gray--5s));
  white-space: nowrap;
  grid-column: 1;
  grid-row: 1;
  align-self: center;
}

.experience-item-header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
  grid-column: 2;
  grid-row: 1;
}

.experience-item-main {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.experience-role-company {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.experience-role {
  font-size: var(--heading--2);
  font-weight: var(--font-weight--regular);
  color: rgb(var(--gray--1));
}

.experience-separator {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  color: rgb(var(--gray--5s));
}

.experience-company {
  font-size: var(--heading--1);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--gray--1));
}

.experience-toggle {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: rgb(var(--gray--5s));
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.3s ease,
    color 0.2s ease;
}

.experience-toggle:hover {
  color: rgb(var(--gray--1));
}

.experience-toggle-icon {
  width: 16px;
  height: 16px;
  display: block;
}

.experience-item-content {
  margin-top: 0;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  grid-column: 2;
  grid-row: 2;
}

.experience-description {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  line-height: 1.6;
  color: rgb(var(--gray--5s));
  margin: 0;
}

.experience-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.experience-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.experience-detail-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.experience-detail-title {
  font-size: var(--headline--1);
  font-weight: var(--font-weight--medium);
  color: rgb(var(--gray--1));
  margin: 0;
}

.experience-detail-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.experience-detail-item {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  line-height: 1.6;
  color: rgb(var(--gray--1));
  padding-left: 0;
}

.experience-detail-item::before {
  content: '•';
  color: rgb(var(--gray--5s));
  margin-right: 8px;
}

/* Tablet: --tablet */
@media (--tablet) {
  .experience-item {
    padding: 18px 10px;
    display: block;
  }

  .experience-date {
    min-width: auto;
    font-size: var(--body--2--normal);
    font-weight: var(--font-weight--regular);
    grid-column: auto;
    grid-row: auto;
    align-self: auto;
  }

  .experience-item-header {
    display: flex;
    flex-wrap: wrap;
    grid-column: auto;
    grid-row: auto;
  }

  .experience-item-main {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    width: 100%;
    grid-column: auto;
    grid-row: auto;
  }

  .experience-role-company {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .experience-separator {
    display: none;
  }

  .experience-item-content {
    margin-top: 16px;
    padding-top: 16px;
    grid-column: auto;
    grid-row: auto;
  }
}

/* Mobile: --mobile */
@media (--mobile) {
  .experience-item {
    padding: 16px;
    display: block;
  }

  .experience-date {
    min-width: auto;
    font-size: var(--body--2--normal);
    font-weight: var(--font-weight--regular);
    grid-column: auto;
    grid-row: auto;
    align-self: auto;
  }

  .experience-item-header {
    display: flex;
    flex-wrap: wrap;
    grid-column: auto;
    grid-row: auto;
  }

  .experience-item-main {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    width: 100%;
    grid-column: auto;
    grid-row: auto;
  }

  .experience-role-company {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .experience-separator {
    display: none;
  }

  .experience-item-content {
    margin-top: 16px;
    padding-top: 16px;
    gap: 20px;
    grid-column: auto;
    grid-row: auto;
  }

  .experience-description {
    font-size: var(--body--2--normal);
    font-weight: var(--font-weight--regular);
  }

  .experience-detail-title {
    font-size: var(--headline--2);
    font-weight: var(--font-weight--medium);
  }

  .experience-detail-item {
    font-size: var(--body--2--normal);
    font-weight: var(--font-weight--regular);
  }
}
</style>
