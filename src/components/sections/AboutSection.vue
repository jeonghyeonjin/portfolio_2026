<template>
  <section id="about" class="about-section" ref="aboutSectionRef" aria-labelledby="about-heading">
    <div class="about-container">
      <h2 id="about-heading" class="visually-hidden">About Me</h2>

      <div class="about-content">
        <!-- Introduction -->
        <div class="about-intro">
          <h3 class="intro-title">Hi 👋</h3>
          <p class="intro-text">
            I majored in Library and Information Science and Living Design at Yonsei University. I
            started my career as a designer, but I've now been working as a developer for longer,
            and my expertise has reached a balance between both.
          </p>
          <p class="intro-text">
            Creating the intersection between users and products has always been interesting to me.
            That's why I'm still working in the fields of design and frontend development.
          </p>
          <p class="intro-text">
            In my spare time, I usually build keyboards. Rather than manufacturing ready-made
            products, I work on everything from PCB design to 3D modeling (I usually make split
            keyboards!). I hope that someday this minor keyboard will become mainstream. You can see
            some photos about this on the Instagram account below.
          </p>
        </div>

        <!-- Contact & Links -->
        <div class="about-section-block">
          <div class="contact-links">
            <div class="contact-link-wrapper">
              <a href="mailto:j.hyeonjin@gmail.com" class="contact-link" aria-label="이메일 보내기">
                <img src="@/assets/images/icons/mail.svg" alt="Email" class="contact-icon" />
                <span class="contact-text">j.hyeonjin@gmail.com</span>
              </a>
            </div>
            <div class="contact-link-wrapper">
              <a
                href="https://github.com/jeonghyeonjin"
                target="_blank"
                rel="noopener noreferrer"
                class="contact-link"
                aria-label="GitHub 프로필 열기"
              >
                <img src="@/assets/images/icons/github.svg" alt="GitHub" class="contact-icon" />
                <span class="contact-text">GitHub</span>
              </a>
              <p class="contact-description">
                I have a GitHub account, but it has many private repositories. Please refer to the
                Work section.
              </p>
            </div>
            <div class="contact-link-wrapper">
              <a
                href="https://www.linkedin.com/in/hyeonjin-jeong-f13"
                target="_blank"
                rel="noopener noreferrer"
                class="contact-link"
                aria-label="LinkedIn 프로필 열기"
              >
                <img src="@/assets/images/icons/linkedin.svg" alt="LinkedIn" class="contact-icon" />
                <span class="contact-text">LinkedIn</span>
              </a>
            </div>
            <div class="contact-link-wrapper">
              <a
                href="https://www.instagram.com/keebbear_official/"
                target="_blank"
                rel="noopener noreferrer"
                class="contact-link"
                aria-label="Instagram 프로필 열기 (keebbear)"
              >
                <img
                  src="@/assets/images/icons/instagram.svg"
                  alt="Instagram"
                  class="contact-icon"
                />
                <span class="contact-text">Instagram (keebbear)</span>
              </a>
              <p class="contact-description">Instagram link is for my second persona, keebbear.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useResponsive } from '@/composables/useResponsive'

gsap.registerPlugin(ScrollTrigger)

const { isMobile } = useResponsive()

const aboutTitleRef = ref(null)
const aboutSectionRef = ref(null)
let titleAnimation = null
let resizeHandler = null

const setupScrollTrigger = () => {
  if (!aboutTitleRef.value || !aboutSectionRef.value) return

  // 기존 애니메이션 kill
  if (titleAnimation) {
    titleAnimation.kill()
    titleAnimation = null
  }
  gsap.killTweensOf(aboutTitleRef.value)

  if (isMobile.value) {
    // 모바일: 초기 상태 숨김, 스크롤 시 등장
    gsap.set(aboutTitleRef.value, {
      opacity: 0,
      filter: 'blur(40px)',
      y: '-10%',
      display: 'block',
    })

    titleAnimation = gsap.to(aboutTitleRef.value, {
      opacity: 1,
      filter: 'blur(0px)',
      y: '0%',
      ease: 'power2.out',
      scrollTrigger: {
        trigger: aboutSectionRef.value,
        start: 'top 90%',
        end: 'top center',
        scrub: true,
      },
    })
  } else {
    // 데스크톱/태블릿: 숨김
    gsap.set(aboutTitleRef.value, {
      opacity: 0,
      display: 'none',
    })
  }
}

onMounted(() => {
  setupScrollTrigger()

  // resize 이벤트 리스너 등록
  resizeHandler = () => {
    setupScrollTrigger()
    ScrollTrigger.refresh()
  }
  window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
  if (titleAnimation) {
    titleAnimation.kill()
  }
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
  }
})
</script>

<style scoped>
@import '@/assets/styles/breakpoints.css';

.about-section {
  position: relative;
  width: 100%;
  padding: 120px 40px;
}

.about-container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: auto;
  gap: 40px;
  width: 100%;
}

/* Visually hidden but accessible to screen readers */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Section Title (Mobile Only) */
.about-title {
  display: none;
  width: 100%;
  max-width: 400px;
  height: auto;
  margin-bottom: 40px;
  overflow: visible;
}

.about-title-text {
  fill: rgb(var(--gray--1));
}

/* About Content */
.about-content {
  grid-column: 2;
  grid-row: 1;
  display: flex;
  flex-direction: column;
  gap: 80px;
}

/* Profile Section */
.about-profile {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 40px;
  align-items: start;
}

.profile-image-wrapper {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgb(var(--gray--5));
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.profile-name {
  font-size: var(--title--1);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--gray--1));
  margin: 0;
}

.profile-role {
  font-size: var(--headline--1);
  font-weight: var(--font-weight--medium);
  color: rgb(var(--gray--3));
  margin: 0;
}

.profile-links {
  display: flex;
  gap: 16px;
  margin-top: 8px;
}

.profile-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: rgb(var(--gray--5));
  text-decoration: none;
  color: rgb(var(--gray--1));
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--medium);
  transition: all 0.2s ease;
}

.profile-link:hover {
  background-color: rgb(var(--gray--4));
  transform: translateY(-2px);
}

.link-icon {
  font-size: 18px;
}

.link-text {
  font-size: var(--body--1--normal);
}

/* Introduction */
.about-intro {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.intro-title {
  font-size: var(--title--1);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--gray--1));
  margin: 0;
}

.intro-text {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  line-height: 1.7;
  color: rgb(var(--gray--2));
  margin: 0;
}

/* Section Block */
.about-section-block {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.block-title {
  font-size: var(--title--1);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--gray--1));
  margin: 0;
}

/* Capabilities Grid */
.capabilities-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.capability-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  border-radius: 12px;
  background-color: rgb(var(--gray--5));
  transition: all 0.2s ease;
}

.capability-item:hover {
  background-color: rgb(var(--gray--4));
  transform: translateY(-4px);
}

.capability-icon {
  font-size: 40px;
}

.capability-title {
  font-size: var(--heading--1);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--gray--1));
  margin: 0;
}

.capability-desc {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  line-height: 1.6;
  color: rgb(var(--gray--2));
  margin: 0;
}

/* Values List */
.values-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.value-item {
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 24px;
  padding: 24px;
  border-radius: 12px;
  background-color: rgb(var(--gray--5));
  transition: all 0.2s ease;
}

.value-item:hover {
  background-color: rgb(var(--gray--4));
  transform: translateX(8px);
}

.value-number {
  font-size: var(--title--1);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--gray--3));
}

.value-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.value-title {
  font-size: var(--heading--1);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--gray--1));
  margin: 0;
}

.value-desc {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  line-height: 1.6;
  color: rgb(var(--gray--2));
  margin: 0;
}

/* Education List */
.education-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.education-item {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 24px;
  padding: 20px;
  border-radius: 12px;
  background-color: rgb(var(--gray--5));
}

.education-year {
  font-size: var(--heading--1);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--gray--3));
}

.education-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.education-title {
  font-size: var(--heading--1);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--gray--1));
  margin: 0;
}

.education-desc {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  color: rgb(var(--gray--2));
  margin: 0;
}

/* Contact Links */
.contact-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-link-wrapper {
  display: flex;
  flex-direction: column;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  text-decoration: none;
  color: rgb(var(--gray--1));
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--medium);
  transition: all 0.2s ease;
}

.contact-link:hover {
  transform: translateX(4px);
}

.contact-icon {
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  filter: brightness(0) invert(1) brightness(0.46);
  transition: filter 0.2s;
}

.contact-link:hover .contact-icon {
  filter: brightness(0) invert(1) brightness(0.16);
}

.contact-text {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--medium);
}

.contact-description {
  font-size: var(--body--2--normal);
  font-weight: var(--font-weight--regular);
  color: rgb(var(--gray--3));
  line-height: 1.6;
  text-indent: 58px;
}

/* Tablet: --tablet */
@media (--tablet) {
  .about-section {
    padding: 60px 30px;
  }

  .about-container {
    grid-template-columns: 1fr 3fr;
    grid-template-rows: auto;
    gap: 30px;
  }

  .about-content {
    grid-column: 2;
    gap: 60px;
  }

  .about-profile {
    grid-template-columns: 1fr 3fr;
    gap: 30px;
  }

  .profile-image-wrapper {
    width: 160px;
    height: 160px;
  }

  .capabilities-grid {
    grid-template-columns: 1fr;
  }

  .value-item {
    grid-template-columns: 50px 1fr;
    gap: 20px;
    padding: 20px;
  }
}

/* Mobile: --mobile */
@media (--mobile) {
  .about-section {
    padding: 40px 20px;
  }

  .about-container {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: 24px;
  }

  .about-content {
    grid-column: 1;
    grid-row: 1;
    gap: 50px;
  }

  .about-profile {
    grid-template-columns: 1fr;
    gap: 20px;
    text-align: center;
  }

  .profile-image-wrapper {
    width: 120px;
    height: 120px;
    margin: 0 auto;
  }

  .profile-info {
    align-items: center;
  }

  .profile-links {
    justify-content: center;
    flex-wrap: wrap;
  }

  .intro-title {
    font-size: var(--title--2);
  }

  .block-title {
    font-size: var(--title--2);
  }

  .capabilities-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .capability-item {
    padding: 20px;
  }

  .value-item {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 16px;
  }

  .value-number {
    font-size: var(--heading--1);
  }

  .education-item {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 16px;
  }

  .contact-link {
    padding: 10px 14px;
  }

  .contact-icon {
    width: 18px;
    height: 18px;
  }
}
</style>
