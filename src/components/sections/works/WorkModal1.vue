<template>
  <div class="work-modal-content">
    <div class="work-modal-header">
      <h1 class="work-modal-title">Master Forge Piexl art</h1>
      <p class="work-modal-subtitle">
        Designed for the Master Forge keyboard's pin and sticker design contest
        on Kickstarter.
      </p>
    </div>
    <div class="work-modal-body">
      <!-- 여기에 각 work의 상세 내용을 추가하세요 -->
      <div class="work-modal-placeholder">
        <p>Work 1 상세 내용이 여기에 표시됩니다.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Work 1의 상세 내용을 여기에 구현하세요
</script>

<style scoped>
@import '@/assets/styles/breakpoints.css';

.work-modal-content {
  width: 100%;
  min-height: 100vh;
  padding: 120px 40px;
}

.work-modal-header {
  max-width: 1200px;
  margin: 0 auto 60px;
}

.work-modal-title {
  font-size: var(--display--1);
  font-weight: var(--font-weight--bold);
  font-weight: 700;
  color: rgb(var(--gray--1));
  margin: 0 0 20px 0;
  letter-spacing: -0.02em;
}

.work-modal-subtitle {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  line-height: 1.6;
  color: rgb(var(--gray--1));
  margin: 0;
}

.work-modal-body {
  max-width: 1200px;
  margin: 0 auto;
}

.work-modal-placeholder {
  width: 100%;
  min-height: 400px;
  background-color: rgb(var(--gray--5s) / 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(var(--gray--3));
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
}

/* Tablet: --tablet */
@media (--tablet) {
  .work-modal-content {
    padding: 60px 30px;
  }

  .work-modal-header {
    margin-bottom: 40px;
  }

  .work-modal-title {
    font-size: var(--display--2);
    font-weight: var(--font-weight--bold);
  }
}

/* Mobile: --mobile */
@media (--mobile) {
  .work-modal-content {
    padding: 80px 20px 40px;
  }

  .work-modal-header {
    margin-bottom: 30px;
  }

  .work-modal-title {
    font-size: var(--title--1);
    font-weight: var(--font-weight--bold);
  }

  .work-modal-subtitle {
    font-size: var(--body--2--normal);
    font-weight: var(--font-weight--regular);
  }
}
</style>

