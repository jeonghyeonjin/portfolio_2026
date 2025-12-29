<script setup>
import PortfolioHeader from './components/PortfolioHeader.vue'
import SiteNavigation from './components/SiteNavigation.vue'
import HeroSection from './components/HeroSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import WorksSection from './components/WorksSection.vue'
</script>

<template>
  <div class="app-layout">
    <SiteNavigation />
    <PortfolioHeader />
    <HeroSection />
    <SkillsSection />
    <WorksSection />
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
  background-color: var(--white--1);
}
</style>
