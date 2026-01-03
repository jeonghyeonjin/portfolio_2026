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
      <div class="card add-card">
        <div class="plus-icon">+</div>
      </div>

      <!-- Content Cards -->
      <div class="card video-card" v-for="(card, index) in cards" :key="index">
        <div class="thumbnail-area">
          <img :src="card.thumbnail" alt="Thumbnail" class="thumbnail-img" />
          <span class="status-dot"></span>
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
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 24px;
  overflow-x: auto; /* Allow scrolling if too narrow */
}

/* Add Card */
.add-card {
  aspect-ratio: 4/3;
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

.plus-icon {
  font-size: 48px;
  color: #289067; /* Green accent color */
  font-weight: 300;
}

/* Video Card */
.video-card {
  aspect-ratio: 4/3; /* Approximate ratio including text */
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

.thumbnail-area {
  width: 100%;
  height: 60%;
  position: relative;
  background-color: #000;
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
