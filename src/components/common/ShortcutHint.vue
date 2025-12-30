<template>
  <span class="shortcut-hint" :class="{ active: active }">
    <span v-for="(key, index) in parsedKeys" :key="index" class="shortcut-key">
      {{ key }}
    </span>
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  keys: {
    type: [String, Array],
    required: true,
    validator: (value) => {
      if (typeof value === 'string') return true
      if (Array.isArray(value)) return value.every((v) => typeof v === 'string')
      return false
    },
  },
  active: {
    type: Boolean,
    default: false,
  },
})

// 수정자 키 목록
const modifierKeys = ['cmd', 'ctrl', 'alt', 'shift', 'meta', 'option', 'control']

// 키 문자열을 파싱하여 배열로 변환
const parsedKeys = computed(() => {
  let keysArray = []

  if (typeof props.keys === 'string') {
    // 문자열인 경우 쉼표로 분리
    keysArray = props.keys
      .split(',')
      .map((key) => key.trim())
      .filter((key) => key.length > 0)
  } else if (Array.isArray(props.keys)) {
    keysArray = props.keys.map((key) => String(key).trim()).filter((key) => key.length > 0)
  }

  // 수정자 키를 앞으로 정렬
  const modifiers = []
  const regularKeys = []

  keysArray.forEach((key) => {
    const lowerKey = key.toLowerCase()
    if (modifierKeys.includes(lowerKey)) {
      modifiers.push(key)
    } else {
      regularKeys.push(key)
    }
  })

  // 수정자 키 순서: cmd/ctrl -> alt/option -> shift -> meta
  const modifierOrder = ['cmd', 'ctrl', 'meta', 'control', 'alt', 'option', 'shift']
  modifiers.sort((a, b) => {
    const aIndex = modifierOrder.indexOf(a.toLowerCase())
    const bIndex = modifierOrder.indexOf(b.toLowerCase())
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex)
  })

  return [...modifiers, ...regularKeys]
})
</script>

<style scoped>
.shortcut-hint {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: 4px;
}

.shortcut-key {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 5px;
  font-size: var(--caption--1--regular);
  border: 1px solid rgb(var(--white--2));
}
</style>
