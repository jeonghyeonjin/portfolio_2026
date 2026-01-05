<template>
  <div class="channel-demo-container">
    <!-- Header -->
    <div class="demo-header">
      <div class="header-left">
        <div class="breadcrumb">
          <span class="breadcrumb-item">Team Channels</span>
          <span class="breadcrumb-divider">/</span>
          <span class="breadcrumb-item active">General</span>
        </div>
      </div>
      <div class="header-right">
        <div class="avatar-circle user-avatar">
          <img src="@/assets/images/hero/hero.png" alt="User" />
        </div>
      </div>
    </div>

    <!-- Banner -->
    <div class="channel-banner">
      <h2 class="channel-title">Feedback</h2>
      <p class="channel-desc">기획에 대한 의견을 자유롭게 남겨주세요</p>
    </div>

    <!-- Grid -->
    <div class="cards-grid">
      <!-- Add Card -->
      <div class="card add-card" @click="addChannel" :class="{ disabled: cards.length >= 3 }">
        <div class="plus-icon">+</div>
      </div>

      <!-- Content Cards -->
      <div
        class="card video-card"
        v-for="(card, index) in cards"
        :key="index"
        :class="{ active: activeIndex === index }"
        @click="setActive(index)"
      >
        <div class="thumbnail-area">
          <img :src="card.thumbnail" alt="Thumbnail" class="thumbnail-img" />
          <span class="status-dot"></span>
          <!-- Active Indicator Overlay -->
          <div class="active-overlay" v-if="activeIndex === index">
            <span class="material-icons-round">check_circle</span>
          </div>
        </div>
        <div class="card-info">
          <h3 class="card-title">{{ card.title }}</h3>
          <p class="card-meta">Started {{ card.date }}</p>

          <div class="card-footer">
            <div class="stats">
              <span class="stat-item">
                <span class="material-icons-round icon-small">movie</span>
                {{ card.clipCount }} Clip
              </span>
              <span class="stat-item">
                <span class="material-icons-round icon-small">schedule</span>
                {{ card.duration }}
              </span>
            </div>
            <div class="author-avatar-small">
              <img :src="card.avatar" alt="Author" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import imgThumbnail from '@/assets/images/works/tape/tape_thumbnail.png'
import imgEmoji1 from '@/assets/images/works/tape/emoji/check_mark_button_3d.png'

const cards = ref([
  {
    title: '디자인 수정이 필요합니다',
    date: 'a month ago',
    clipCount: 1,
    duration: '3 mins',
    thumbnail: imgThumbnail,
    avatar: imgEmoji1,
  },
])

const activeIndex = ref(-1)

const setActive = (index) => {
  activeIndex.value = index
}

const addChannel = () => {
  if (cards.value.length >= 3) return

  const unsplashImages = [
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80',
    'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  ]
  const randomImage = unsplashImages[Math.floor(Math.random() * unsplashImages.length)]

  const newCard = {
    title: `New Review ${cards.value.length + 1}`,
    date: 'Just now',
    clipCount: 0,
    duration: '0:00',
    thumbnail: randomImage,
    avatar: imgEmoji1,
  }
  cards.value.push(newCard)
  activeIndex.value = cards.value.length - 1 // Select new one
}
</script>

<style scoped>
/* Font Import for Material Icons is assumed to be global */

.channel-demo-container {
  width: 100%;
  background-color: #141d22; /* Dark teal/gray background */
  border-radius: 12px;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}

/* Header */
.demo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #141d22;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.menu-icon {
  color: #9ca3af;
  font-size: 24px;
  cursor: pointer;
}

.breadcrumb {
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 500;
  color: #9ca3af;
}

.breadcrumb-divider {
  margin: 0 8px;
  color: #6b7280;
}

.breadcrumb-item.active {
  color: #fff;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.noti-icon {
  color: #9ca3af;
  font-size: 24px;
  cursor: pointer;
}

.avatar-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #374151;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.avatar-circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Banner */
.channel-banner {
  margin: 24px 24px 0;
  padding: 32px;
  background-color: #0e1519; /* Darker banner bg */
  border-radius: 12px;
}

.channel-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #fff;
}

.channel-desc {
  font-size: 14px;
  color: #9ca3af;
  margin: 0;
}

/* Grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 24px;
  overflow-x: auto; /* Allow scrolling if too narrow */
}

/* Add Card */
.add-card {
  aspect-ratio: 1;
  border: 2px dashed rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: transparent;
}

.add-card:hover {
  background-color: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
}

.add-card.disabled {
  opacity: 0.3;
  cursor: not-allowed;
  pointer-events: none;
}

.plus-icon {
  font-size: 48px;
  color: #289067; /* Green accent color */
  font-weight: 300;
}

/* Video Card */
.video-card {
  aspect-ratio: 1; /* Approximate ratio including text */
  background-color: #1f2b32; /* Card bg */
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  cursor: pointer;
  min-width: 200px; /* Minimum width for responsiveness */
}

.video-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.video-card.active {
  box-shadow: 0 0 0 2px #289067; /* Active border */
}

.thumbnail-area {
  width: 100%;
  height: 60%;
  position: relative;
  background-color: #000;
}

.active-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(40, 144, 103, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.active-overlay span {
  font-size: 32px;
  color: #fff;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
}

.thumbnail-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
}

.status-dot {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  background-color: #ef4444; /* Red recording/live dot */
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(239, 68, 68, 0.5);
}

.card-info {
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-meta {
  font-size: 11px;
  color: #6b7280;
  margin: 0 0 12px 0;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stats {
  display: flex;
  gap: 8px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #9ca3af;
}

.icon-small {
  font-size: 14px;
  color: #6b7280;
}

.author-avatar-small {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.author-avatar-small img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Responsive */
@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
