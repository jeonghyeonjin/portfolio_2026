<template>
  <pre class="tree-diagram" v-html="displayContent"></pre>
</template>

<script setup>
import { useSlots, computed } from 'vue'

const props = defineProps({
  data: {
    type: Object, // { label: string, children: [] }
    default: null,
  },
})

const slots = useSlots()

const formatPrefix = (prefix) => {
  // prefix의 각 문자를 분석하여 트리 문자만 색상 적용
  return prefix
    .split('')
    .map((char) => {
      if (char === '├' || char === '└' || char === '│') {
        return `<span class="tree-prefix">${char}</span>`
      }
      return char
    })
    .join('')
}

const generateTree = (node, prefix = '', isRoot = true, isLast = true) => {
  let result = ''

  if (isRoot) {
    result += node.label + '\n'
  } else {
    // prefix와 connector를 색상이 있는 span으로 감싸기
    const formattedPrefix = formatPrefix(prefix)
    const connector = isLast ? '└─ ' : '├─ '
    const formattedConnector = connector
      .split('')
      .map((char) => {
        if (char === '├' || char === '└' || char === '─') {
          return `<span class="tree-prefix">${char}</span>`
        }
        return char
      })
      .join('')
    result += formattedPrefix + formattedConnector + node.label + '\n'
  }

  const children = node.children || []
  const childPrefix = isRoot ? '' : prefix + (isLast ? '    ' : '│   ')

  children.forEach((child, index) => {
    result += generateTree(child, childPrefix, false, index === children.length - 1)
  })

  return result
}

const displayContent = computed(() => {
  if (props.data) {
    return generateTree(props.data)
  }

  const slotContent = slots.default?.()
  if (!slotContent || slotContent.length === 0) return ''

  // 텍스트 노드에서 실제 텍스트 추출
  const textContent = slotContent
    .map((node) => {
      if (typeof node.children === 'string') {
        return node.children
      }
      return ''
    })
    .join('')

  return textContent
})
</script>

<style scoped>
@import '@/assets/styles/breakpoints.css';

.tree-diagram {
  font-size: var(--body--2--normal);
  background: linear-gradient(135deg, rgba(var(--white--2), 0.3) 0%, rgba(var(--white--2), 1) 100%);
  border: 1px solid rgba(var(--gray--4), 0.25);
  border-radius: 12px;
  padding: 24px;
  padding-left: 32px;
  line-height: 1.8;
  color: rgb(var(--gray--1));
  overflow-x: auto;
  margin: 20px 0;
  position: relative;
  white-space: pre;
  tab-size: 4;
}

.tree-diagram::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(var(--primary-color), 0.5),
    rgba(var(--accent-color), 0.3)
  );
  border-radius: 12px 0 0 12px;
}

.tree-diagram :deep(.tree-prefix) {
  color: rgb(var(--gray--8));
}

/* Tablet */
@media (--tablet) {
  .tree-diagram {
    font-size: var(--body--1--normal);
    padding: 20px;
    padding-left: 28px;
  }
}

/* Mobile */
@media (--mobile) {
  .tree-diagram {
    font-size: var(--body--1--normal);
    padding: 16px;
    padding-left: 20px;
    line-height: 1.6;
  }
}
</style>
