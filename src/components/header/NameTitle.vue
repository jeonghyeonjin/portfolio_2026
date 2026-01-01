<template>
  <div class="name-title" ref="nameTitleRef">
    <div ref="nameTextRef" class="name-text">
      <div ref="firstLineRef" class="name-line">Jeong</div>
      <div ref="secondLineRef" class="name-line">Hyeon-jin</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { gsap } from 'gsap'

const nameTitleRef = ref(null)
const nameTextRef = ref(null)
const firstLineRef = ref(null)
const secondLineRef = ref(null)

// 애니메이션 상수
const BLUR_AMOUNT_LARGE = '40px'
const BLUR_AMOUNT_MEDIUM = '30px'
const TRANSFORM_Y_UP_LARGE = '-10%'
const TRANSFORM_Y_UP_SMALL = '-5%'
const ANIMATION_DURATION_SHORT = 0.15
const EASE_OUT = 'power2.out'
const EASE_IN = 'power2.in'

// Imperative API: 텍스트 변경 (애니메이션 포함)
const changeText = (newText, options = {}) => {
  const {
    hideSecondLine = true,
    blurAmount = BLUR_AMOUNT_LARGE,
    transformY = TRANSFORM_Y_UP_LARGE,
    duration = ANIMATION_DURATION_SHORT,
  } = options

  if (!firstLineRef.value || !secondLineRef.value) return

  const firstLine = firstLineRef.value
  const secondLine = secondLineRef.value

  // 진행 중인 애니메이션 중단
  gsap.killTweensOf([firstLine, secondLine])

  // 타임라인 생성
  const timeline = gsap.timeline({
    onComplete: () => {
      // 내용 변경
      firstLine.textContent = newText
      if (hideSecondLine) {
        secondLine.style.display = 'none'
      }

      // 초기 상태 설정
      gsap.set(firstLine, {
        opacity: 0,
        filter: `blur(${blurAmount})`,
        y: transformY,
      })

      // 페이드인 애니메이션
      gsap.to(firstLine, {
        opacity: 1,
        filter: 'blur(0px)',
        y: '0%',
        duration,
        ease: EASE_OUT,
      })
    },
  })

  // 두 줄 동시에 숨기기
  timeline.to(firstLine, { opacity: 0, duration }, 0)
  timeline.to(secondLine, { opacity: 0, duration }, 0)

  return timeline
}

// Imperative API: 원래 상태로 복원
const restore = (options = {}) => {
  const {
    firstName = 'Jeong',
    secondName = 'Hyeon-jin',
    blurAmount = BLUR_AMOUNT_MEDIUM,
    transformY = TRANSFORM_Y_UP_SMALL,
    duration = ANIMATION_DURATION_SHORT,
  } = options

  if (!firstLineRef.value || !secondLineRef.value) return

  const firstLine = firstLineRef.value
  const secondLine = secondLineRef.value

  // 진행 중인 애니메이션 중단
  gsap.killTweensOf([firstLine, secondLine])

  // 첫 번째 줄 숨기기
  return gsap.to(firstLine, {
    opacity: 0,
    duration,
    ease: EASE_IN,
    onComplete: () => {
      // 텍스트 복원
      firstLine.textContent = firstName
      secondLine.textContent = secondName
      secondLine.style.display = 'block'

      // 초기 상태 설정
      gsap.set([firstLine, secondLine], {
        opacity: 0,
        filter: `blur(${blurAmount})`,
        y: transformY,
      })

      // 타임라인으로 동시에 페이드인
      const timeline = gsap.timeline()
      timeline.to(
        firstLine,
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: '0%',
          duration,
          ease: EASE_OUT,
        },
        0,
      )
      timeline.to(
        secondLine,
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: '0%',
          duration,
          ease: EASE_OUT,
        },
        0,
      )
    },
  })
}

// Expose: 명확한 imperative API 제공
defineExpose({
  $el: nameTitleRef,
  firstLineRef,
  secondLineRef,
  // Imperative methods for animations
  changeText,
  restore,
})
</script>

<style scoped>
@import '@/assets/styles/breakpoints.css';

.name-title {
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  position: relative;
}

.name-text {
  display: flex;
  flex-direction: column;
  position: relative;
}

.name-line {
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: var(--hero--1);
  font-weight: 700;
  color: rgb(var(--gray--1));
  letter-spacing: -0.02em;
  line-height: 1.1;
}

@media (max-width: 1439px) {
  .name-line {
    font-size: var(--hero--2);
  }
}

@media (max-width: 799px) {
  .name-line {
    font-size: var(--hero--3);
  }
}
</style>
