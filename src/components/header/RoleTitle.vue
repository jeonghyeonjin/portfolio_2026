<template>
  <div class="role-title">
    <div class="role-wrapper">
      <div class="role-line">FRONTEND DEVELOPER</div>
      <div class="role-line">UI / UX DESIGNER</div>
    </div>
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

.role-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
}

.role-line {
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: var(--headline--2);
  font-weight: var(--font-weight--medium);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgb(var(--gray--0));
  line-height: 1.412;
}
</style>
