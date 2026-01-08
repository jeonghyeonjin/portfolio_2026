<template>
  <img :src="emojiUrl" :alt="emoji" :class="['fluent-emoji', customClass]" :style="emojiStyle" />
</template>

<script setup>
import { computed } from 'vue'
import { getFluentEmojiCDN } from '@lobehub/fluent-emoji'

const props = defineProps({
  emoji: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: '3d',
    validator: (value) => ['3d', 'modern', 'flat', 'high-contrast', 'anim'].includes(value),
  },
  size: {
    type: [Number, String],
    default: 64,
  },
  class: {
    type: String,
    default: '',
  },
})

const customClass = computed(() => props.class)

const emojiUrl = computed(() => {
  return getFluentEmojiCDN(props.emoji, { type: props.type })
})

const emojiStyle = computed(() => {
  const size = typeof props.size === 'number' ? `${props.size}px` : props.size
  return {
    width: size,
    height: size,
  }
})
</script>

<style scoped>
@import '@/assets/styles/breakpoints.css';

.fluent-emoji {
  width: 48px !important;
  height: 48px !important;
  display: inline-block;
  vertical-align: middle;
}

@media (--tablet) {
  .fluent-emoji {
    width: 32px !important;
    height: 32px !important;
  }
}

@media (--mobile) {
  .fluent-emoji {
    width: 24px !important;
    height: 24px !important;
  }
}
</style>
