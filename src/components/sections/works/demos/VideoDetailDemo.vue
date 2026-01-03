<template>
  <div class="video-detail-demo">
    <div class="demo-container">
      <!-- Top Bar -->
      <div class="top-bar">
        <div class="top-bar-left">
          <div class="user-avatar-small">
            <img src="@/assets/images/hero/hero.png" alt="User" />
          </div>
          <span class="video-title">디자인 수정이 필요합니다</span>
        </div>
        <div class="top-bar-right">
          <button class="btn-icon">
            <span class="material-icons-round">share</span>
          </button>
          <button class="btn-icon">
            <span class="material-icons-round">more_horiz</span>
          </button>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="content-area">
        <!-- Video Player / Embed Area -->
        <div class="video-area">
          <div class="video-placeholder">
            <div class="play-button">
              <span class="material-icons-round">play_arrow</span>
            </div>
            <div class="video-controls">
              <div class="progress-bar">
                <div class="progress-fill" style="width: 35%"></div>
              </div>
              <div class="control-buttons">
                <span class="time">0:45 / 3:12</span>
              </div>
            </div>

            <!-- Floating Emoji Feedback (Static representation) -->
            <!-- <div class="floating-reaction" style="left: 80%; bottom: 25%">
              <img :src="imgCheck" alt="Check" />
            </div>
            <div class="floating-reaction" style="left: 85%; bottom: 40%">
              <img :src="imgClap" alt="Clap" />
            </div> -->
          </div>
        </div>

        <!-- Right Sidebar (Comments/Transcript) -->
        <div class="right-sidebar">
          <div class="sidebar-tabs">
            <span class="tab active">Comment</span>
            <span class="tab">Transcript</span>
          </div>
          <div class="comment-list">
            <div class="comment-item">
              <div class="comment-avatar">
                <span class="material-icons-round">face</span>
              </div>
              <div class="comment-content">
                <div class="comment-header">
                  <span class="username">Designer</span>
                  <span class="timestamp">2 mins ago</span>
                </div>
                <div class="comment-text">이 부분 디자인 수정 부탁드려요!</div>
              </div>
            </div>
            <div class="comment-item">
              <div class="comment-avatar">
                <span class="material-icons-round">face</span>
              </div>
              <div class="comment-content">
                <div class="comment-header">
                  <span class="username">Manager</span>
                  <span class="timestamp">1 hour ago</span>
                </div>
                <div class="comment-text">확인했습니다. 반영할게요.</div>
              </div>
            </div>
          </div>
          <div class="comment-input-area">
            <input type="text" placeholder="Leave a comment..." readonly />
            <button class="btn-send">
              <span class="material-icons-round">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import imgCheck from '@/assets/images/works/tape/emoji/check_mark_button_3d.png'
// import imgClap from '@/assets/images/works/tape/emoji/clapping_hands_3d_default.png'
// import imgEmoji1 from '@/assets/images/works/tape/emoji/eyes_3d.png'
// import imgEmoji3 from '@/assets/images/works/tape/emoji/red_heart_3d.png'
</script>

<style scoped>
.video-detail-demo {
  width: 100%;
  background-color: #141d22;
  border-radius: 12px;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  aspect-ratio: 16/9;
  display: flex;
  flex-direction: column;
}

.demo-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Top Bar */
.top-bar {
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background-color: #141d22;
}

.top-bar-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar-small {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #374151;
}

.user-avatar-small img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-title {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

.top-bar-right {
  display: flex;
  gap: 8px;
}

.btn-icon {
  background: transparent;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-icon span {
  font-size: 20px;
}

/* Content Area */
.content-area {
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* Video Area */
.video-area {
  flex: 1;
  background-color: #000;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #1f2b32, #0e1519);
  position: relative;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.play-button span {
  font-size: 32px;
  color: #fff;
}

.video-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  margin-bottom: 4px;
}

.progress-fill {
  height: 100%;
  background-color: #289067;
  border-radius: 2px;
}

.time {
  font-size: 11px;
  color: #fff;
}

.floating-reaction {
  position: absolute;
  width: 32px;
  height: 32px;
  pointer-events: none;
  animation: floatUp 2s ease-out infinite;
  opacity: 0.8;
}

.floating-reaction img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

@keyframes floatUp {
  0% {
    transform: translateY(0);
    opacity: 0.8;
  }
  100% {
    transform: translateY(-40px);
    opacity: 0;
  }
}

/* Right Sidebar */
.right-sidebar {
  width: 280px;
  background-color: #141d22;
  border-left: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
}

.sidebar-tabs {
  height: 40px;
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #9ca3af;
  cursor: pointer;
  position: relative;
}

.tab.active {
  color: #fff;
  font-weight: 600;
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #289067;
}

.comment-list {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.comment-item {
  display: flex;
  gap: 10px;
}

.comment-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #374151;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.comment-avatar span {
  font-size: 22px;
  color: rgb(var(--white--3));
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
}

.username {
  font-size: 12px;
  font-weight: 600;
  color: #fff;
}

.timestamp {
  font-size: 10px;
  color: #6b7280;
}

.comment-text {
  font-size: 12px;
  color: #d1d5db;
  line-height: 1.4;
}

.comment-input-area {
  padding: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  gap: 8px;
}

.comment-input-area input {
  flex: 1;
  background-color: #1f2b32;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 8px 12px;
  color: #fff;
  font-size: 12px;
  outline: none;
}

.btn-send {
  background: transparent;
  border: none;
  color: #289067;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-send span {
  font-size: 18px;
}

/* Responsive */
@media (max-width: 768px) {
  .right-sidebar {
    display: none;
  }
}
</style>
