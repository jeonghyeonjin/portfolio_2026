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
</script>

<template>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <div class="app-layout">
    <h1 class="visually-hidden">Jeong Hyeon-jin - Portfolio</h1>
    <header>
      <SiteNavigation />
      <PortfolioHeader />
    </header>
    <main id="main-content">
      <HeroSection />
      <SkillSection />
      <WorkSection />
      <ExperienceSection />
      <AboutSection />
    </main>
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
}

main {
  width: 100%;
}
</style>
