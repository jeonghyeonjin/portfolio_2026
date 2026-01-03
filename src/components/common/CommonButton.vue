<template>
  <button
    :class="[
      'base-button',
      `base-button--${variant}`,
      `base-button--${size}`,
      { 'base-button--disabled': disabled },
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
// Vue 3.5 props destructuring with defaults
const {
  variant = 'secondary',
  size = 'medium',
  disabled = false,
} = defineProps({
  variant: {
    type: String,
    default: 'secondary',
    validator: (value) => ['primary', 'secondary', 'destructive', 'ghost'].includes(value),
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['click'])
</script>

<style scoped>
.base-button {
  border: none;
  border-radius: 12px;
  font-family: inherit;
  font-weight: var(--font-weight--medium);
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  /* WCAG 2.5.5 - Minimum touch target size */
  min-height: 44px;
}

.base-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Sizes */
.base-button--small {
  padding: 12px 16px;
  font-size: var(--body--2--normal);
}

.base-button--medium {
  padding: 12px 24px;
  font-size: var(--body--1--normal);
}

.base-button--large {
  padding: 14px 28px;
  font-size: var(--body--1--normal);
}

/* Variants */
.base-button--primary {
  background: rgb(var(--green--normal));
  color: white;
}

.base-button--primary:hover:not(:disabled) {
  background: rgb(var(--green--dark));
}

.base-button--secondary {
  background: rgba(var(--gray--5s), 0.1);
  color: rgb(var(--gray--2));
  border: 1px solid rgba(var(--gray--5s), 0.2);
}

.base-button--secondary:hover:not(:disabled) {
  background: rgba(var(--gray--5s), 0.15);
  border-color: rgba(var(--gray--5s), 0.3);
}

.base-button--destructive {
  background: rgb(var(--red--normal));
  color: white;
}

.base-button--destructive:hover:not(:disabled) {
  background: rgb(var(--red--dark));
}

.base-button--ghost {
  background: transparent;
  color: rgb(var(--gray--2));
}

.base-button--ghost:hover:not(:disabled) {
  background: rgba(var(--gray--5s), 0.1);
}
</style>
