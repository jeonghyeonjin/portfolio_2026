<template>
  <div class="code-block">
    <pre><code><slot /></code></pre>
  </div>
</template>

<script setup>
// CodeBlock 컴포넌트 - 코드를 표시하는 공통 컴포넌트
</script>

<style scoped>
.code-block {
  background: rgb(var(--gray--1));
  border-radius: 12px;
  padding: 16px;
  overflow-y: auto;
  overflow-x: auto;
  max-height: 280px;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  margin: 20px 0;
}

.code-block pre {
  margin: 0;
  font-size: var(--body--1--normal);
  color: rgb(var(--white--2));
  line-height: 1.6;
  white-space: pre-wrap;
}
</style>
