<template>
  <div class="achievement-demo">
    <div class="demo-header">
      <div class="header-left">
        <h2 class="demo-title">Achievements</h2>
        <p class="demo-subtitle">Unlock badges as you progress</p>
      </div>

      <div class="demo-controls">
        <label class="control-toggle">
          <input type="checkbox" v-model="multiSelect" />
          <span class="toggle-label">Multi Select</span>
        </label>

        <button
          class="control-btn"
          @click="showSelected"
          :disabled="selectedAchievements.length === 0"
          :class="{ disabled: selectedAchievements.length === 0 }"
        >
          Show Selected ({{ selectedAchievements.length }})
        </button>

        <button class="control-btn" @click="playSequence" :disabled="sequencePlaying">
          {{ sequencePlaying ? 'Playing...' : 'Play All Sequence' }}
        </button>

        <button
          class="control-btn btn-clear"
          @click="clearSelection"
          v-if="selectedAchievements.length > 0"
        >
          Clear
        </button>
      </div>
    </div>

    <div class="achievements-grid">
      <div
        v-for="achievement in achievements"
        :key="achievement.id"
        class="achievement-card"
        :class="{
          selected: isSelected(achievement),
          'multi-mode': multiSelect,
        }"
        @click="toggleAchievement(achievement)"
      >
        <div class="card-inner">
          <div class="icon-wrapper">
            <img :src="getIcon(achievement.id)" :alt="achievement.title" />
          </div>
          <div class="text-content">
            <h3 class="card-title">{{ achievement.title }}</h3>
            <p class="card-desc">{{ achievement.description }}</p>
          </div>

          <div class="checkbox" v-if="multiSelect">
            <span v-if="isSelected(achievement)" class="check-mark">✓</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Component -->
    <AchievementToast ref="toastRef" :achievement="currentAchievement" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AchievementToast from './AchievementToast.vue'

// Import icons again here for the grid display, or access from the child component efficiently.
// Ideally we should share this data, but for now re-importing is safer and cleaner than hacky refs.
import imgStreak7 from '@/assets/images/works/keebbear/streak7.png'
import imgStreak30 from '@/assets/images/works/keebbear/streak30.png'
import imgStreak100 from '@/assets/images/works/keebbear/streak100.png'
import imgStreak365 from '@/assets/images/works/keebbear/streak365.png'
import imgLightning from '@/assets/images/works/keebbear/lightning.png'
import imgGodHand from '@/assets/images/works/keebbear/godhand.png'
import imgClockHand from '@/assets/images/works/keebbear/clockhand.png'
import imgSundial from '@/assets/images/works/keebbear/sundial.png'
import imgSharply from '@/assets/images/works/keebbear/sharply.png'
import imgSteady from '@/assets/images/works/keebbear/consistency.png'
import imgBird from '@/assets/images/works/keebbear/bird.png'
import imgOwl from '@/assets/images/works/keebbear/owl.png'
import imgSession1 from '@/assets/images/works/keebbear/session1.png'
import imgSession2 from '@/assets/images/works/keebbear/session2.png'
import imgSession3 from '@/assets/images/works/keebbear/session3.png'
import imgBlank from '@/assets/images/works/keebbear/blank.png'

const localIcons = {
  login_week: imgStreak7,
  login_month: imgStreak30,
  login_hundreddays: imgStreak100,
  login_year: imgStreak365,
  practice_beginner: imgSession1,
  practice_intermediate: imgSession2,
  practice_advanced: imgSession3,
  speed_master: imgLightning,
  god_hand: imgGodHand,
  accuracy_master: imgSharply,
  consistency_master: imgSteady,
  time_basic: imgClockHand,
  time_master: imgSundial,
  early_bird: imgBird,
  night_owl: imgOwl,
}

const getIcon = (id) => localIcons[id] || imgBlank

const achievements = [
  { id: 'login_year', title: 'Year of Typing', description: 'Login for 365 consecutive days' },
  { id: 'speed_master', title: 'Lightning', description: 'Reach 300 CPM' },
  { id: 'god_hand', title: 'God Hand', description: 'Reach 400 CPM' },
  { id: 'accuracy_master', title: 'Sharply', description: 'Achieve perfect accuracy' },
  { id: 'time_master', title: 'Sundial', description: 'Practice for more than 24 hours' },
  { id: 'early_bird', title: 'Early Bird', description: 'Complete sessions during dawn' },
  { id: 'night_owl', title: 'Night Owl', description: 'Complete sessions during night' },
]

const currentAchievement = ref(null)
const multiSelect = ref(false)
const selectedAchievements = ref([])
const sequencePlaying = ref(false)
const processingQueue = ref(false)
const achievementQueue = ref([])

const isSelected = (achievement) => {
  return selectedAchievements.value.some((a) => a.id === achievement.id)
}

const toggleAchievement = (achievement) => {
  if (multiSelect.value) {
    const index = selectedAchievements.value.findIndex((a) => a.id === achievement.id)
    if (index === -1) {
      selectedAchievements.value.push(achievement)
    } else {
      selectedAchievements.value.splice(index, 1)
    }
  } else {
    // Single mode: clear previous selection just for visual clarity if needed,
    // or just show immediately.
    showSingleAchievement(achievement)
  }
}

const clearSelection = () => {
  selectedAchievements.value = []
}

const showSelected = async () => {
  if (processingQueue.value) return
  achievementQueue.value = [...selectedAchievements.value]
  processQueue()
}

const playSequence = async () => {
  if (sequencePlaying.value || processingQueue.value) return

  sequencePlaying.value = true
  achievementQueue.value = [...achievements] // Play all
  await processQueue()
  sequencePlaying.value = false
}

const processQueue = async () => {
  if (processingQueue.value || achievementQueue.value.length === 0) return

  processingQueue.value = true

  while (achievementQueue.value.length > 0) {
    const achievement = achievementQueue.value.shift()
    await showSingleAchievement(achievement)
    // Wait a bit before showing the next one
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  processingQueue.value = false
}

const showSingleAchievement = async (achievement) => {
  currentAchievement.value = null
  // Brief delay to allow Vue to unmount previous toast if immediate re-trigger
  await new Promise((resolve) => setTimeout(resolve, 100))

  currentAchievement.value = achievement

  // Wait for the duration of the toast (4500ms defined in Toast) plus transition
  await new Promise((resolve) => setTimeout(resolve, 5000))
}
</script>

<style scoped>
@import '@/assets/styles/color.css';

.achievement-demo {
  width: 100%;
  background-color: rgb(var(--gray--0s)); /* Slightly lighter/darker bg */
  border-radius: 12px;
  padding: 32px;
  border: 1px solid rgb(var(--gray--2));
  position: relative;
  overflow: hidden; /* Keep absolute toast inside if we want */
}

/* Header */
.demo-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 20px;
}

.demo-title {
  font-size: var(--title--3);
  color: rgb(var(--gray--12));
  margin: 0 0 4px 0;
}

.demo-subtitle {
  font-size: var(--body--2--normal);
  color: rgb(var(--gray--8));
  margin: 0;
}

/* Controls */
.demo-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.control-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: var(--body--2--normal);
  color: rgb(var(--gray--10));
}

.control-btn {
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid rgb(var(--gray--4));
  background-color: rgb(var(--gray--2));
  color: rgb(var(--gray--11));
  font-size: var(--body--2--normal);
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.control-btn:hover:not(:disabled) {
  background-color: rgb(var(--gray--3));
  color: rgb(var(--white--0));
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.control-btn.btn-clear {
  border-color: rgba(var(--red--normal), 0.3);
  color: rgb(var(--red--normal));
  background-color: rgba(var(--red--normal), 0.1);
}

.control-btn.btn-clear:hover {
  background-color: rgba(var(--red--normal), 0.2);
}

/* Grid */
.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 8px;
}

.achievement-card {
  background-color: rgb(var(--gray--0));
  border: 1px solid rgb(var(--gray--3));
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.achievement-card:hover {
  transform: translateY(-2px);
  border-color: rgb(var(--gray--5));
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.achievement-card.selected {
  border-color: rgb(var(--yellow--normal));
  background-color: rgba(var(--yellow--normal), 0.05);
}

.card-inner {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.icon-wrapper {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.icon-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.text-content {
  flex-grow: 1;
}

.card-title {
  font-size: var(--body--1--normal);
  font-weight: 600;
  color: rgb(var(--gray--11));
}

.achievement-card.selected .card-title {
  color: rgb(var(--yellow--normal));
}

.card-desc {
  font-size: var(--caption--1);
  color: rgb(var(--gray--6));
  margin: 0;
  line-height: 1.4;
}

/* Checkbox for multi-select */
.checkbox {
  width: 18px;
  height: 18px;
  border: 2px solid rgb(var(--gray--4));
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.achievement-card.selected .checkbox {
  border-color: rgb(var(--yellow--normal));
  background-color: rgb(var(--yellow--normal));
}

.check-mark {
  color: rgb(var(--gray--0));
  font-size: var(--caption--1);
  font-weight: bold;
}

/* Responsive */
@media (max-width: 768px) {
  .achievements-grid {
    grid-template-columns: 1fr;
  }
}
</style>
