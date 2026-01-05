<script setup>
import { ref, provide, readonly } from 'vue'
import PortfolioHeader from './components/header/PortfolioHeader.vue'
import SiteNavigation from './components/navigation/SiteNavigation.vue'
import HeroSection from './components/sections/HeroSection.vue'
import AboutSection from './components/sections/AboutSection.vue'
import SkillSection from './components/sections/SkillSection.vue'
import WorkSection from './components/sections/WorkSection.vue'
import ExperienceSection from './components/sections/ExperienceSection.vue'

// Works 데이터 및 메서드를 provide로 공유
const works = ref([])
const selectWorkCallback = ref(null)
const isWorkModalOpen = ref(false)
const modalBackgroundColor = ref('rgb(var(--white--1))') // 기본값

// Works 데이터 제공
provide('works', readonly(works))

// Works 데이터 설정 메서드 제공
provide('setWorksData', (worksData) => {
  works.value = worksData
})

// Work 선택 콜백 제공
provide('selectWork', (workId) => {
  if (selectWorkCallback.value) {
    selectWorkCallback.value(workId)
  }
})

// Work 선택 콜백 설정 메서드 제공
provide('setSelectWorkCallback', (callback) => {
  selectWorkCallback.value = callback
})

// Work Modal 상태 제공
provide('isWorkModalOpen', readonly(isWorkModalOpen))
provide('setWorkModalOpen', (isOpen) => {
  isWorkModalOpen.value = isOpen
})

// Work Modal 배경색 제공
provide('setModalBackgroundColor', (color) => {
  modalBackgroundColor.value = color
})
</script>

<template>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <div class="app-layout">
    <h1 class="visually-hidden">Jeong Hyeon-jin - Portfolio</h1>
    <header :class="{ 'is-hidden': isWorkModalOpen }" :inert="isWorkModalOpen">
      <SiteNavigation />
      <PortfolioHeader />
    </header>
    <main id="main-content" :class="{ 'is-hidden': isWorkModalOpen }" :inert="isWorkModalOpen">
      <HeroSection />
      <SkillSection />
      <WorkSection />
      <ExperienceSection />
      <AboutSection />
    </main>
    <div
      v-if="isWorkModalOpen"
      class="app-overlay"
      :style="{ backgroundColor: modalBackgroundColor }"
      aria-hidden="true"
    ></div>
  </div>
</template>

<style scoped>
.app-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(var(--white--1));
  overflow-x: hidden;
  max-width: 100%;
}

.app-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(var(--white--1)); /* 모달 배경색과 동일하게 */
  z-index: 9990; /* 모달(9999)보다 낮게, 헤더/메인보다 높게 */
}

.is-hidden {
  /* 접근성 및 렌더링 최적화를 위해 숨김 처리 */
  /* display: none을 쓰면 스크롤 위치가 날아갈 수 있으므로 visibility 사용 권장 */
  visibility: hidden;
  pointer-events: none;
}

/* Skip link for accessibility */
.skip-link {
  position: absolute;
  top: -48px;
  left: 0;
  background: rgb(var(--gray--1));
  color: var(--white--0);
  padding: 8px 16px;
  text-decoration: none;
  z-index: 10000;
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--medium);
  border-radius: 0 0 4px 0;
}

.skip-link:focus {
  top: 0;
}

/* Visually hidden but accessible to screen readers */
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

header {
  position: relative;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}

main {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}
</style>
