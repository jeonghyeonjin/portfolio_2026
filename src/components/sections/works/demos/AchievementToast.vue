<template>
  <Transition name="toast-slide">
    <div v-if="show" class="achievement-toast" :style="customStyle">
      <div class="achievement-toast-content">
        <!-- Star Effects -->
        <span class="star">★</span>
        <span class="star">★</span>
        <span class="star">★</span>
        <span class="star">★</span>
        <span class="star">★</span>

        <div class="achievement-icon">
          <img :src="achievementIcon" :alt="achievement?.title" class="toast-icon" />
        </div>
        <div class="achievement-text">
          <div class="achievement-title">{{ achievement?.title }}</div>
          <div class="achievement-description">{{ achievement?.description }}</div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  achievement: {
    type: Object,
    default: null,
  },
})

// Asset Imports
import imgBlank from '@/assets/images/works/keebbear/blank.png'
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

const achievementIcons = {
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

const show = ref(false)
const timer = ref(null)

const achievementIcon = computed(() => {
  return props.achievement ? achievementIcons[props.achievement.id] || imgBlank : imgBlank
})

// Position style - adjust as needed (can be passed as props if moving around)
const customStyle = computed(() => ({
  position: 'absolute',
  bottom: '40px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 100,
}))

watch(
  () => props.achievement,
  (newVal) => {
    if (newVal) {
      show.value = true
      if (timer.value) clearTimeout(timer.value)
      timer.value = setTimeout(() => {
        show.value = false
      }, 4500) // Slightly less than 5000 to allow fade out
    }
  },
  { deep: true },
)

// Expose icons for parent demo if needed (though cleaner to standardise IDs)
defineExpose({
  achievementIcons,
})
</script>

<style scoped>
@import '@/assets/styles/color.css';

.achievement-toast {
  /* No special layout logic here, handled by inline styles / Transition */
  pointer-events: none;
}

.achievement-toast-content {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background-color: rgb(var(--gray--0));
  border: 1px solid rgb(var(--gray--4)); /* Simple border instead of mixin */
  border-radius: 8px; /* Rounded for portfolio aesthetic */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);

  width: max-content;
  min-width: 300px;
  max-width: 90vw;
  position: relative;
  overflow: hidden;
}

/* Background Shine Effect */
.achievement-toast-content::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    45deg,
    transparent 0%,
    rgba(var(--yellow--normal), 0.05) 45%,
    rgba(var(--yellow--normal), 0.1) 50%,
    rgba(var(--yellow--normal), 0.05) 55%,
    transparent 100%
  );
  animation: shine 3s infinite;
  pointer-events: none;
}

/* Stars */
.star {
  position: absolute;
  color: rgb(var(--yellow--normal));
  font-size: var(--caption--1);
  pointer-events: none;
  opacity: 0.3;
}

.star:nth-child(1) {
  top: 20%;
  left: 10%;
  animation: starSparkle 1s infinite;
}
.star:nth-child(2) {
  top: 70%;
  left: 30%;
  animation: starSparkle 1s infinite 0.2s;
}
.star:nth-child(3) {
  top: 30%;
  left: 80%;
  animation: starSparkle 1s infinite 0.4s;
}
.star:nth-child(4) {
  top: 60%;
  left: 60%;
  animation: starSparkle 1s infinite 0.6s;
}
.star:nth-child(5) {
  top: 40%;
  left: 40%;
  animation: starSparkle 1s infinite 0.8s;
}

/* Icon */
.achievement-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  animation: iconPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Text */
.achievement-text {
  flex-grow: 1;
  position: relative;
  text-align: left;
}

.achievement-title {
  font-size: var(--body--1--normal);
  font-weight: 700;
  color: rgb(var(--yellow--normal));
  margin-bottom: 4px;
  animation: textSlideIn 0.5s ease-out forwards;
  opacity: 0;
}

.achievement-title::after {
  content: '🏆';
  display: inline-block;
  margin-left: 8px;
  font-size: var(--body--2--normal);
  animation: trophyBounce 1s infinite;
}

.achievement-description {
  font-size: var(--body--2--normal);
  color: rgb(var(--gray--8));
  animation: textSlideIn 0.5s ease-out 0.2s forwards;
  opacity: 0;
}

/* Animations */
@keyframes shine {
  0% {
    transform: translateX(-100%) rotate(-45deg);
  }
  100% {
    transform: translateX(100%) rotate(-45deg);
  }
}

@keyframes starSparkle {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.5);
  }
}

@keyframes iconPop {
  0% {
    transform: scale(0) rotate(-180deg);
    opacity: 0;
  }
  60% {
    transform: scale(1.2) rotate(10deg);
  }
  80% {
    transform: scale(0.9) rotate(-5deg);
  }
  100% {
    transform: scale(1) rotate(0);
    opacity: 1;
  }
}

@keyframes textSlideIn {
  0% {
    transform: translateX(-20px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes trophyBounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

/* Transition Classes */
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.toast-slide-enter-from,
.toast-slide-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px) !important; /* Override inline transform */
}
</style>
