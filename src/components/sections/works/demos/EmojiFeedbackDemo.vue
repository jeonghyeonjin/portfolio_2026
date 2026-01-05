<template>
  <div class="emoji-demo">
    <div class="video-placeholder" ref="videoPlaceholder" @click="handleCanvasClick">
      <!-- Stamped Emojis -->
      <div class="emoji-container">
        <div class="info-click-text">Click to add emoji</div>
        <div
          v-for="emoji in displayingEmojis"
          :key="emoji.id"
          class="stamped-emoji"
          :style="{
            left: emoji.x + 'px',
            top: emoji.y + 'px',
            opacity: emoji.opacity,
            transform: `translate(-50%, -50%) scale(${emoji.scale}) rotate(${emoji.rotation}deg)`,
          }"
        >
          <img :src="emoji.src" :alt="emoji.type" class="emoji-img" />
        </div>
      </div>

      <!-- Feedback Controls -->
      <div class="feedback-controls" @click.stop>
        <div class="feedback-text">
          <span>Let</span>
          <span class="highlight">Hyeonjin</span>
          <span>know what you think</span>
        </div>
        <div class="emoji-buttons">
          <button
            v-for="(item, index) in emojiTypes"
            :key="index"
            class="btn-emoji"
            :class="{ active: selectedType === item.type }"
            @click="triggerButtonEmoji(item)"
          >
            <img :src="item.src" :alt="item.type" class="btn-emoji-img" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import imgCheck from '@/assets/images/works/tape/emoji/check_mark_button_3d.png'
import imgClap from '@/assets/images/works/tape/emoji/clapping_hands_3d_default.png'
import imgEyes from '@/assets/images/works/tape/emoji/eyes_3d.png'
import imgHeart from '@/assets/images/works/tape/emoji/red_heart_3d.png'

const emojiTypes = [
  { type: 'check', src: imgCheck },
  { type: 'clap', src: imgClap },
  { type: 'heart', src: imgHeart },
  { type: 'eyes', src: imgEyes },
]

const videoPlaceholder = ref(null)
const displayingEmojis = ref([])
const selectedType = ref('clap') // Default selected type
let emojiIdCounter = 0
let animationFrameId = null

const createEmoji = (x, y, item) => {
  const id = emojiIdCounter++
  const emoji = {
    id,
    type: item.type,
    src: item.src,
    x,
    y,
    opacity: 1,
    scale: 0, // Start from 0 scale for pop effect
    targetScale: 0.8 + Math.random() * 0.4,
    rotation: (Math.random() - 0.5) * 30, // Random rotation -15 to 15 deg
    life: 1.0,
    velocityY: -0.5 - Math.random() * 0.5, // Move up slightly
  }

  displayingEmojis.value.push(emoji)
}

const triggerButtonEmoji = (item) => {
  selectedType.value = item.type

  // Create emoji at random position in the center area
  if (videoPlaceholder.value) {
    const rect = videoPlaceholder.value.getBoundingClientRect()
    // Center area (20% to 80% width/height)
    const x = rect.width * (0.2 + Math.random() * 0.6)
    const y = rect.height * (0.2 + Math.random() * 0.5)
    createEmoji(x, y, item)
  }
}

const handleCanvasClick = (event) => {
  if (!videoPlaceholder.value) return

  const rect = videoPlaceholder.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  // Find currently selected emoji type object
  const item = emojiTypes.find((t) => t.type === selectedType.value) || emojiTypes[0]
  createEmoji(x, y, item)
}

const updateEmojis = () => {
  for (let i = displayingEmojis.value.length - 1; i >= 0; i--) {
    const emoji = displayingEmojis.value[i]

    // Pop-in animation (Elastic)
    if (emoji.scale < emoji.targetScale) {
      emoji.scale += (emoji.targetScale - emoji.scale) * 0.2
      if (Math.abs(emoji.targetScale - emoji.scale) < 0.01) emoji.scale = emoji.targetScale
    }

    // Float up and fade out
    if (emoji.scale >= emoji.targetScale * 0.8) {
      emoji.y += emoji.velocityY
      emoji.life -= 0.008
      emoji.opacity = Math.max(0, emoji.life)
    }

    if (emoji.opacity <= 0) {
      displayingEmojis.value.splice(i, 1)
    }
  }
  animationFrameId = requestAnimationFrame(updateEmojis)
}

onMounted(() => {
  updateEmojis()
})

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
})
</script>

<style scoped>
@import '@/assets/styles/breakpoints.css';

.emoji-demo {
  width: 100%;
  aspect-ratio: 1;
  background-color: #0e1519;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: crosshair; /* Indicate clickable area */
}

.video-placeholder {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 50%);
}

.emoji-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.info-click-text {
  position: absolute;
  top: 33%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: var(--body--1--normal);
  color: rgba(255, 255, 255, 0.9);
  font-weight: var(--font-weight--bold);
  pointer-events: none;
}

.stamped-emoji {
  position: absolute;
  will-change: transform, opacity, top, left;
  pointer-events: none;
}

.emoji-img {
  width: 48px;
  height: 48px;
  object-fit: contain;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

.feedback-controls {
  position: relative;
  z-index: 10;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
  cursor: default; /* Reset cursor for controls */
  pointer-events: none;
}

.feedback-text {
  font-size: var(--body--1--normal);
  color: rgb(var(--white--3));
  font-weight: var(--font-weight--medium);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.highlight {
  color: rgb(var(--white--1));
  font-weight: 700;
  margin: 0 4px;
}

.emoji-buttons {
  display: flex;
  gap: 12px;
  background: rgba(14, 21, 25, 0.8);
  padding: 8px 16px;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  pointer-events: all;
}

.btn-emoji {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 50%;
  transition:
    transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
    background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.btn-emoji:hover {
  transform: scale(1.1);
  background-color: rgba(255, 255, 255, 0.1);
}

.btn-emoji:active {
  transform: scale(0.95);
}

.btn-emoji.active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  width: 4px;
  height: 4px;
  background-color: #fff;
  border-radius: 50%;
}

.btn-emoji-img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}
</style>
