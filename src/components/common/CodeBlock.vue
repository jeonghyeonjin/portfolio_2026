<template>
  <div class="code-block">
    <pre><code ref="codeRef" class="hljs">{{ formattedCode }}</code></pre>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import 'highlight.js/styles/github-dark.css'

// Register languages
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('css', css)

const props = defineProps({
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    default: 'javascript',
  },
})

const codeRef = ref(null)

const formattedCode = computed(() => {
  if (!props.code) return ''

  // HTML 엔티티를 실제 문자로 변환
  const decoded = props.code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')

  // 앞뒤 공백만 제거하고 내부 줄바꿈은 유지
  return decoded.trim()
})

const highlightCode = () => {
  if (codeRef.value) {
    hljs.highlightElement(codeRef.value)
  }
}

onMounted(highlightCode)
watch(() => props.code, highlightCode)
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
  border-radius: 12px;
}

.code-block pre {
  margin: 0;
  font-size: var(--body--1--normal);
  line-height: 1.6;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.code-block code {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9em;
  white-space: pre-wrap;
  display: block;
}

/* Override highlight.js theme to match portfolio design */
.code-block :deep(.hljs) {
  background: transparent;
  color: rgb(var(--white--2));
}

.code-block :deep(.hljs-keyword),
.code-block :deep(.hljs-selector-tag),
.code-block :deep(.hljs-literal),
.code-block :deep(.hljs-section),
.code-block :deep(.hljs-link) {
  color: #ff6b9d;
}

.code-block :deep(.hljs-string),
.code-block :deep(.hljs-attr) {
  color: #98c379;
}

.code-block :deep(.hljs-name),
.code-block :deep(.hljs-type),
.code-block :deep(.hljs-number),
.code-block :deep(.hljs-selector-id),
.code-block :deep(.hljs-selector-class) {
  color: #61afef;
}

.code-block :deep(.hljs-attribute),
.code-block :deep(.hljs-variable),
.code-block :deep(.hljs-template-variable) {
  color: #d19a66;
}

.code-block :deep(.hljs-comment),
.code-block :deep(.hljs-quote) {
  color: rgba(var(--white--2), 0.5);
  font-style: italic;
}

.code-block :deep(.hljs-function),
.code-block :deep(.hljs-title) {
  color: #c678dd;
}

.code-block {
  scrollbar-width: thin;
  scrollbar-color: rgba(var(--gray--5s), 0.5) rgba(var(--gray--0), 0.5);
  scroll-margin: 5px;
}
</style>
