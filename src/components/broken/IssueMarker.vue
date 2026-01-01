<template>
  <div class="issue-marker">
    <span class="exclamation">!</span>
  </div>
</template>

<style scoped>
.issue-marker {
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: rgb(var(--red--normal));
  color: rgb(var(--white--0));
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--label--2);
  font-weight: 800;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  animation: pulse 2s infinite;
}

.exclamation {
  line-height: 1;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(var(--red--normal), 0.7);
  }
  70% {
    transform: scale(1.1);
    box-shadow: 0 0 0 6px rgba(var(--red--normal), 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(var(--red--normal), 0);
  }
}
</style>
