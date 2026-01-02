<template>
  <span class="work-chip" :class="`work-chip--${variant}`">
    {{ label }}
  </span>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) =>
      ['default', 'dev', 'design', 'web', 'app', 'ai', 'wip', 'pixel art', 'side', 'work'].includes(
        value,
      ),
  },
})
</script>

<style scoped>
.work-chip {
  display: inline-block;
  padding: 6px 12px;
  font-size: var(--body--2--normal);
  font-weight: var(--font-weight--medium);
  border-radius: 6px;
  white-space: nowrap;
  letter-spacing: 0.02em;
  transition: all 0.2s ease;
}

/* Default variant */
.work-chip--default {
  background-color: rgb(var(--white--2));
  color: rgb(var(--gray--1));
}

/* Dev variant */
.work-chip--dev {
  background-color: rgb(var(--green--normal));
  color: rgb(var(--white--1));
}

/* Design variant */
.work-chip--design {
  background-color: rgb(var(--yellow--normal));
  color: rgb(var(--gray--1));
}

/* WIP variant */
.work-chip--wip {
  background-color: rgb(var(--gray--1));
  color: rgb(var(--white--1));
}

/* AI variant */
.work-chip--ai {
  background-color: rgb(var(--red--normal));
  color: rgb(var(--white--1));
}

/* Side project variant */
.work-chip--side {
  background-color: rgb(var(--blue--normal));
  color: rgb(var(--white--1));
}

/* Work project variant */
.work-chip--work {
  background-color: rgb(var(--orange--normal));
  color: rgb(var(--white--1));
}
</style>
