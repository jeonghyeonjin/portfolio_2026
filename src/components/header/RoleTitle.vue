<template>
  <div class="role-title">
    <div class="role-line">FRONTEND DEVELOPER</div>
    <div class="role-line">UI / UX DESIGNER</div>
  </div>
</template>

<script setup></script>

<style scoped>
.role-title {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 16px;
}

.role-line {
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: var(--headline--2--medium);
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgb(var(--gray--0));
  line-height: 1.412;
}
</style>
