<template>
  <input
    ref="inputRef"
    :class="['base-input', { 'base-input--disabled': disabled }]"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    :disabled="disabled"
    @input="$emit('update:modelValue', $event.target.value)"
    @keydown="$emit('keydown', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
  />
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:modelValue', 'keydown', 'focus', 'blur'])

const inputRef = ref(null)

// 부모 컴포넌트에서 focus와 blur 메서드를 사용할 수 있도록 노출
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
})
</script>

<style scoped>
.base-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  color: rgba(50, 50, 50, 0.8);
  padding: 0;
  min-width: 0;
}

.base-input::placeholder {
  color: rgba(var(--gray--5s), 0.5);
}

.base-input:focus {
  color: rgb(var(--gray--1));
}

.base-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

