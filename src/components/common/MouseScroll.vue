<template>
  <a href="#" class="mouse-scroll" ref="mouseScrollRef">
    <div class="mouse-scroll__mouse">
      <div class="mouse-scroll__mouse-in"></div>
    </div>
    <div class="mouse-scroll__arrow">
      <span class="mouse-scroll__down-arrow"></span>
    </div>
  </a>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps({
  trigger: {
    type: Object,
    default: null,
  },
  hideOnScroll: {
    type: Boolean,
    default: true,
  },
  hideScrollDistance: {
    type: Number,
    default: 50,
  },
})

const mouseScrollRef = ref(null)
let scrollTriggerInstance = null

onMounted(() => {
  if (!mouseScrollRef.value || !props.hideOnScroll || !props.trigger?.value) return

  const animation = gsap.to(mouseScrollRef.value, {
    opacity: 0,
    pointerEvents: 'none',
    scrollTrigger: {
      trigger: props.trigger.value,
      start: 'top top',
      end: `${props.hideScrollDistance}px top`,
      scrub: true,
    },
  })

  scrollTriggerInstance = animation.scrollTrigger
})

onUnmounted(() => {
  if (mouseScrollRef.value) {
    gsap.killTweensOf(mouseScrollRef.value)
  }
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill()
    scrollTriggerInstance = null
  }
})
</script>

<style scoped>
@import '@/assets/styles/breakpoints.css';

.mouse-scroll {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  pointer-events: auto;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.mouse-scroll__mouse {
  height: 35px;
  width: 23px;
  border-radius: 10px;
  border: 2px solid rgb(var(--white--1));
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 5px;
}

.mouse-scroll__mouse-in {
  height: 6px;
  width: 3px;
  background: rgb(var(--white--1));
  border-radius: 1px;
  animation: mouse-scroll-animated 1.2s ease infinite;
}

.mouse-scroll__arrow {
  margin-top: 6px;
}

.mouse-scroll__down-arrow {
  display: block;
  width: 6px;
  height: 6px;
  transform: rotate(45deg);
  border-right: 2px solid rgb(var(--white--1));
  border-bottom: 2px solid rgb(var(--white--1));
  animation: mouse-scroll-arrow 1s infinite;
  animation-direction: alternate;
}

@keyframes mouse-scroll-animated {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(6px);
  }
}

@keyframes mouse-scroll-arrow {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

@media (--mobile) {
  .mouse-scroll {
    display: none;
  }
}
</style>
