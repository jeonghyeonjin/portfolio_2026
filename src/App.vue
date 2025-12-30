<script setup>
import PortfolioHeader from './components/header/PortfolioHeader.vue'
import SiteNavigation from './components/navigation/SiteNavigation.vue'
import HeroSection from './components/sections/HeroSection.vue'
import SkillsSection from './components/sections/SkillsSection.vue'
import WorksSection from './components/sections/WorksSection.vue'
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
  background-color: rgb(var(--white--1));
}
</style>
