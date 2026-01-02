<template>
  <button
    :class="['icon-button', `icon-button--${size}`, { 'icon-button--disabled': disabled }]"
    :disabled="disabled"
    :aria-label="ariaLabel"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  ariaLabel: {
    type: String,
    default: '',
  },
})

defineEmits(['click'])
</script>

<style scoped>
.icon-button {
  background: none;
  border: none;
  padding: 9px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(var(--gray--2), 0.6);
  transition: all 0.2s ease;
  border-radius: 6px;
  /* WCAG 2.5.5 - Minimum touch target size 44x44px */
  min-width: 44px;
  min-height: 44px;
  width: auto;
  height: auto;
}

.icon-button:hover:not(:disabled) {
  color: rgb(var(--gray--1));
}

.icon-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Sizes */
.icon-button--small svg {
  width: 16px;
  height: 16px;
}

.icon-button--medium svg {
  width: 20px;
  height: 20px;
}

.icon-button--large svg {
  width: 24px;
  height: 24px;
}
</style>
