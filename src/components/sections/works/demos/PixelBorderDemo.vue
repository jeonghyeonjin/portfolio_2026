<template>
  <div class="pixel-border-demo">
    <div class="demo-container">
      <h3 class="demo-title">픽셀아트 스타일 보더 | Pixel Art Style Border</h3>
      <p class="demo-description">
        CSS box-shadow를 활용하여 픽셀아트 게임의 특징적인 보더 스타일을 구현했습니다.
        <br />
        Using CSS box-shadow to implement the characteristic border style of pixel art games.
      </p>

      <div class="demo-grid">
        <!-- 중간 보더 -->
        <div class="demo-item">
          <div class="pixel-border-box pixel-border-4">
            <div class="box-content"></div>
          </div>
        </div>
      </div>
      <!-- 코드 예시 -->
      <div class="code-example">
        <h4 class="code-title">CSS 구현 예시 | CSS Implementation Example</h4>
        <CodeBlock
          :code="`.pixel-border-2 {
  box-shadow:
    -2px 0 0 0 rgb(var(--gray--10)),
    2px 0 0 0 rgb(var(--gray--10)),
    0 -2px 0 0 rgb(var(--gray--10)),
    0 2px 0 0 rgb(var(--gray--10));
}`"
          language="css"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import CodeBlock from '@/components/common/CodeBlock.vue'
</script>

<style scoped>
@import '@/assets/styles/color.css';
@import '@/assets/styles/breakpoints.css';

.pixel-border-demo {
  width: 100%;
  background: rgb(var(--gray--1));
  border-radius: 12px;
  padding: 40px;
}

.demo-container {
  width: 100%;
}

.demo-title {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--white--1));
  margin: 0 0 15px 0;
}

.demo-description {
  font-size: var(--body--2--normal);
  font-weight: var(--font-weight--regular);
  line-height: 1.6;
  color: rgb(var(--white--2));
  margin: 0 0 50px 0;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-bottom: 50px;
}

.demo-item {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.demo-label {
  font-size: var(--body--2--normal);
  font-weight: var(--font-weight--medium);
  color: rgb(var(--gray--2));
}

.pixel-border-box {
  background-color: rgb(var(--gray--0));
  padding: 20px 30px;
  margin: 0 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateZ(0); /* Safari fix */
  animation: marginPulse 5s ease-in-out infinite;
}

@keyframes marginPulse {
  0%,
  100% {
    margin: 0 100px;
  }
  50% {
    margin: 0 50px;
  }
}

.box-content {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--medium);
  color: rgb(var(--gray--12));
  text-align: center;
}

/* 픽셀아트 보더 스타일 - 2px */
.pixel-border-2 {
  box-shadow:
    /* Background Color */
    0 -6px 0 -2px rgb(var(--gray--0)),
    0 6px 0 -2px rgb(var(--gray--0)),
    0 -12px 0 -4px rgb(var(--gray--0)),
    0 12px 0 -4px rgb(var(--gray--0)),
    0 -18px 0 -8px rgb(var(--gray--0)),
    0 18px 0 -8px rgb(var(--gray--0)),
    0 -24px 0 -12px rgb(var(--gray--0)),
    0 24px 0 -12px rgb(var(--gray--0)),
    /* Border */ -2px 0 0 0 rgb(var(--gray--10)),
    2px 0 0 0 rgb(var(--gray--10)),
    0 -4px 0 0 rgb(var(--gray--10)),
    0 4px 0 0 rgb(var(--gray--10)),
    0 -10px 0 -2px rgb(var(--gray--10)),
    0 10px 0 -2px rgb(var(--gray--10)),
    0 -14px 0 -4px rgb(var(--gray--10)),
    0 14px 0 -4px rgb(var(--gray--10)),
    0 -20px 0 -8px rgb(var(--gray--10)),
    0 20px 0 -8px rgb(var(--gray--10)),
    0 -26px 0 -12px rgb(var(--gray--10)),
    0 26px 0 -12px rgb(var(--gray--10));
}

/* 픽셀아트 보더 스타일 - 4px */
.pixel-border-4 {
  box-shadow:
    /* Background Color */
    0 -12px 0 -4px rgb(var(--gray--0)),
    0 12px 0 -4px rgb(var(--gray--0)),
    0 -24px 0 -8px rgb(var(--gray--0)),
    0 24px 0 -8px rgb(var(--gray--0)),
    0 -36px 0 -16px rgb(var(--gray--0)),
    0 36px 0 -16px rgb(var(--gray--0)),
    0 -48px 0 -24px rgb(var(--gray--0)),
    0 48px 0 -24px rgb(var(--gray--0)),
    /* Border */ -4px 0 0 0 rgb(var(--gray--10)),
    4px 0 0 0 rgb(var(--gray--10)),
    0 -8px 0 0 rgb(var(--gray--10)),
    0 8px 0 0 rgb(var(--gray--10)),
    0 -20px 0 -4px rgb(var(--gray--10)),
    0 20px 0 -4px rgb(var(--gray--10)),
    0 -28px 0 -8px rgb(var(--gray--10)),
    0 28px 0 -8px rgb(var(--gray--10)),
    0 -40px 0 -16px rgb(var(--gray--10)),
    0 40px 0 -16px rgb(var(--gray--10)),
    0 -52px 0 -24px rgb(var(--gray--10)),
    0 52px 0 -24px rgb(var(--gray--10));
}

/* 픽셀아트 보더 스타일 - 6px */
.pixel-border-6 {
  box-shadow:
    /* Background Color */
    0 -18px 0 -6px rgb(var(--gray--0)),
    0 18px 0 -6px rgb(var(--gray--0)),
    0 -36px 0 -12px rgb(var(--gray--0)),
    0 36px 0 -12px rgb(var(--gray--0)),
    0 -54px 0 -24px rgb(var(--gray--0)),
    0 54px 0 -24px rgb(var(--gray--0)),
    0 -72px 0 -36px rgb(var(--gray--0)),
    0 72px 0 -36px rgb(var(--gray--0)),
    /* Border */ -6px 0 0 0 rgb(var(--gray--10)),
    6px 0 0 0 rgb(var(--gray--10)),
    0 -12px 0 0 rgb(var(--gray--10)),
    0 12px 0 0 rgb(var(--gray--10)),
    0 -30px 0 -6px rgb(var(--gray--10)),
    0 30px 0 -6px rgb(var(--gray--10)),
    0 -42px 0 -12px rgb(var(--gray--10)),
    0 42px 0 -12px rgb(var(--gray--10)),
    0 -60px 0 -24px rgb(var(--gray--10)),
    0 60px 0 -24px rgb(var(--gray--10)),
    0 -78px 0 -36px rgb(var(--gray--10)),
    0 78px 0 -36px rgb(var(--gray--10));
}

/* 호버 효과 */
.pixel-border-hover {
  box-shadow:
    /* Background Color */
    0 -6px 0 -2px rgb(var(--gray--0)),
    0 6px 0 -2px rgb(var(--gray--0)),
    0 -12px 0 -4px rgb(var(--gray--0)),
    0 12px 0 -4px rgb(var(--gray--0)),
    0 -18px 0 -8px rgb(var(--gray--0)),
    0 18px 0 -8px rgb(var(--gray--0)),
    0 -24px 0 -12px rgb(var(--gray--0)),
    0 24px 0 -12px rgb(var(--gray--0)),
    /* Border */ -2px 0 0 0 rgb(var(--gray--10)),
    2px 0 0 0 rgb(var(--gray--10)),
    0 -4px 0 0 rgb(var(--gray--10)),
    0 4px 0 0 rgb(var(--gray--10)),
    0 -10px 0 -2px rgb(var(--gray--10)),
    0 10px 0 -2px rgb(var(--gray--10)),
    0 -14px 0 -4px rgb(var(--gray--10)),
    0 14px 0 -4px rgb(var(--gray--10)),
    0 -20px 0 -8px rgb(var(--gray--10)),
    0 20px 0 -8px rgb(var(--gray--10)),
    0 -26px 0 -12px rgb(var(--gray--10)),
    0 26px 0 -12px rgb(var(--gray--10));
  cursor: pointer;
}

.pixel-border-hover:hover {
  box-shadow:
    /* Background Color */
    0 -6px 0 -2px rgb(var(--gray--0)),
    0 6px 0 -2px rgb(var(--gray--0)),
    0 -12px 0 -4px rgb(var(--gray--0)),
    0 12px 0 -4px rgb(var(--gray--0)),
    0 -18px 0 -8px rgb(var(--gray--0)),
    0 18px 0 -8px rgb(var(--gray--0)),
    0 -24px 0 -12px rgb(var(--gray--0)),
    0 24px 0 -12px rgb(var(--gray--0)),
    /* Border - 호버 시 더 밝은 색상 */ -2px 0 0 0 rgb(var(--gray--12)),
    2px 0 0 0 rgb(var(--gray--12)),
    0 -4px 0 0 rgb(var(--gray--12)),
    0 4px 0 0 rgb(var(--gray--12)),
    0 -10px 0 -2px rgb(var(--gray--12)),
    0 10px 0 -2px rgb(var(--gray--12)),
    0 -14px 0 -4px rgb(var(--gray--12)),
    0 14px 0 -4px rgb(var(--gray--12)),
    0 -20px 0 -8px rgb(var(--gray--12)),
    0 20px 0 -8px rgb(var(--gray--12)),
    0 -26px 0 -12px rgb(var(--gray--12)),
    0 26px 0 -12px rgb(var(--gray--12));
  transform: translateY(-2px);
}

.code-example {
  margin-top: 40px;
  padding: 24px;
  background-color: rgb(var(--gray--0));
  border-radius: 8px;
}

.code-title {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--gray--12));
  margin: 0 0 15px 0;
}

/* Tablet */
@media (--tablet) {
  .pixel-border-demo {
    padding: 30px;
  }

  .demo-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }
}

/* Mobile */
@media (--mobile) {
  .pixel-border-demo {
    padding: 20px;
  }

  .demo-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .demo-title {
    font-size: var(--body--2--normal);
  }

  .demo-description {
    font-size: var(--body--2--normal);
  }
}
</style>
