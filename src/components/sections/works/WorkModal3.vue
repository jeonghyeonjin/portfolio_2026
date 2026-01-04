<template>
  <div class="work-modal-content">
    <div ref="workModalHeaderRef" class="work-modal-header">
      <h1 class="work-modal-title">{{ workData?.title || '' }}</h1>
      <p class="work-modal-subtitle">{{ workData?.description || '' }}</p>
    </div>
    <div class="work-modal-body">
      <div ref="mockupContainerRef" class="mockup-container">
        <div ref="mockupWrapperRef" class="mockup-wrapper">
          <img
            src="@/assets/images/mockup/mockup_ipad_pro.png"
            alt="iPad Pro Mockup"
            class="mockup-frame"
          />
          <div class="mockup-screen">
            <div ref="mockupContainerInnerRef" class="mockup-container-inner"></div>
            <video autoplay loop muted playsinline class="mockup-video">
              <source src="/portfolio_2026/videos/keebbear_1.webm" type="video/webm" />
              <source src="/portfolio_2026/videos/keebbear_1.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <!-- Project Overview -->
      <section class="content-section">
        <h2 class="section-title">📌 Project Overview | 프로젝트 개요</h2>
        <p class="section-text">
          KeeBBear는 기계식 키보드 애호가들을 위한 종합 웹 플랫폼입니다. 현재 타이핑 연습 시스템과
          키보드 스위치 테스터를 제공하며, 향후 스위치 - 키캡 호환성 체크 시스템, 키보드 추천
          프로그램, 타이핑 게임, 키보드 빌드 로그, 커뮤니티 기능으로 확장될 예정입니다.
        </p>
        <p class="section-text">
          KeeBBear is a comprehensive web platform for mechanical keyboard enthusiasts. Currently
          featuring a typing practice system and keyboard switch tester, with plans to expand into
          typing games, keyboard build logs, switch compatibility check system, keyboard
          recommendation program, and community features.
        </p>
      </section>

      <!-- Key Features -->
      <section class="content-section">
        <h2 class="section-title">🎯 Key Features | 주요 기능</h2>

        <div class="feature-block" ref="featureBlock1Ref">
          <div class="feature-content">
            <div class="feature-text" ref="featureText1Ref">
              <h3 class="feature-title">1. Interactive Typing Practice | 인터랙티브 타이핑 연습</h3>
              <ul class="feature-list">
                <li>Real-time CPM/WPM calculation and accuracy tracking</li>
                <li>Performance visualization with charts and statistics</li>
                <li>Login streak management for continuous improvement</li>
              </ul>
              <ul class="feature-list">
                <li>실시간 CPM/WPM 계산 및 정확도 추적</li>
                <li>차트와 통계를 통한 성능 시각화</li>
                <li>지속적인 향상을 위한 로그인 연속 기록 관리</li>
              </ul>
            </div>
            <div class="feature-image-wrapper">
              <TypingDemo ref="typingDemoRef" />
            </div>
          </div>
        </div>

        <div class="feature-block" ref="featureBlock2Ref">
          <div class="feature-content">
            <div class="feature-text" ref="featureText2Ref">
              <h3 class="feature-title">2. Keyboard Switch Tester | 키보드 스위치 테스터</h3>
              <ul class="feature-list">
                <li>Real-time keypress detection and visualization</li>
                <li>Switch sound and feel simulation</li>
                <li>Testing interface for keyboard enthusiasts</li>
              </ul>
              <ul class="feature-list">
                <li>실시간 키 입력 감지 및 시각화</li>
                <li>스위치 사운드 및 타감 시뮬레이션</li>
                <li>키보드 애호가를 위한 테스트 인터페이스</li>
              </ul>
            </div>
            <div class="feature-image-wrapper">
              <KeyboardTesterDemo ref="keyboardTesterDemoRef" />
            </div>
          </div>
        </div>

        <div class="feature-block" ref="featureBlock3Ref">
          <div class="feature-content">
            <div class="feature-text" ref="featureText3Ref">
              <h3 class="feature-title">
                3. User Profile & Progress Tracking | 사용자 프로필 및 진행도 추적
              </h3>
              <ul class="feature-list">
                <li>Firebase-based authentication system</li>
                <li>Personal dashboard with performance history</li>
                <li>Achievement and milestone tracking</li>
              </ul>
              <ul class="feature-list">
                <li>Firebase 기반 인증 시스템</li>
                <li>성능 기록이 포함된 개인 대시보드</li>
                <li>성과 및 마일스톤 추적</li>
              </ul>
            </div>
            <div class="feature-image-wrapper">
              <img
                ref="dashboardImageRef"
                :src="imgDashboard"
                alt="Dashboard"
                class="feature-image"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Design Features -->
      <section class="content-section">
        <h2 class="section-title">🎨 Design Features | 디자인 특징</h2>

        <div class="feature-block" ref="designFeatureBlockRef">
          <div class="feature-content">
            <div class="feature-text" ref="designFeatureTextRef">
              <h3 class="feature-title">Pixel Art Style Border | 픽셀아트 스타일 보더</h3>
              <p class="section-text">
                KeeBBear의 가장 특징적인 디자인 요소는 픽셀아트 게임에서 영감을 받은 보더
                스타일입니다. CSS box-shadow를 활용하여 픽셀 단위의 정확한 보더 효과를 구현했습니다.
              </p>
              <p class="section-text">
                The most distinctive design element of KeeBBear is the border style inspired by
                pixel art games. Using CSS box-shadow, we implemented precise pixel-level border
                effects.
              </p>
              <ul class="feature-list">
                <li>Multiple box-shadow layers for pixel-perfect borders</li>
                <li>Customizable border width (2px, 4px, 6px, 10px)</li>
                <li>Hover effects with color transitions</li>
                <li>Retro gaming aesthetic throughout the UI</li>
              </ul>
              <ul class="feature-list">
                <li>픽셀 단위의 정확한 보더를 위한 다중 box-shadow 레이어</li>
                <li>커스터마이징 가능한 보더 두께 (2px, 4px, 6px, 10px)</li>
                <li>색상 전환을 포함한 호버 효과</li>
                <li>UI 전반에 걸친 레트로 게임 미학</li>
              </ul>
            </div>
            <div class="feature-image-wrapper">
              <PixelBorderDemo ref="pixelBorderDemoRef" />
            </div>
          </div>
        </div>
      </section>

      <!-- Technical Highlights -->
      <section class="content-section">
        <h2 class="section-title">💻 Technical Highlights | 기술적 특징</h2>

        <div class="tech-block">
          <h3 class="tech-title">Frontend Architecture | 프론트엔드 아키텍처</h3>
          <TreeDiagram :data="vueEcosystemTree" />
          <p class="tech-desc">Key Implementation Points:</p>
          <ul class="feature-list">
            <li>Vue 3 Composition API: Modular and reusable component logic</li>
            <li>
              Vuex State Management: Centralized state for user data, typing statistics, and game
              progress
            </li>
            <li>
              35+ Vue Components: Clear separation of concerns (game logic, UI, controls, results)
            </li>
          </ul>
        </div>

        <div class="tech-block">
          <h3 class="tech-title">Backend & Infrastructure | 백엔드 및 인프라</h3>
          <TreeDiagram :data="firebaseTree" />
          <p class="tech-desc">Implementation:</p>
          <ul class="feature-list">
            <li>User authentication with email/password and social login</li>
            <li>Real-time data synchronization for user progress</li>
            <li>Login streak calculation and persistence</li>
            <li>Secure user data storage with Firestore rules</li>
          </ul>
        </div>

        <div class="tech-block">
          <h3 class="tech-title">Performance Optimization | 성능 최적화</h3>
          <CodeBlock :code="performanceCode" />
          <ul class="feature-list">
            <li>Strategic resource preloading (fonts, images)</li>
            <li>Loading state management for smooth UX</li>
            <li>Progressive enhancement approach</li>
          </ul>
        </div>

        <div class="tech-block">
          <h3 class="tech-title">Responsive Design | 반응형 디자인</h3>
          <TreeDiagram :data="responsiveTree" />
          <ul class="feature-list">
            <li>Mobile-first design approach</li>
            <li>Adaptive navigation (hamburger menu for mobile)</li>
            <li>Responsive typography and spacing</li>
          </ul>
        </div>
      </section>

      <!-- Component Architecture -->
      <section class="content-section">
        <h2 class="section-title">🎨 Component Architecture | 컴포넌트 아키텍처</h2>
        <TreeDiagram :data="componentArchitectureTree" />
      </section>

      <!-- Future Roadmap -->
      <section class="content-section">
        <h2 class="section-title">🚀 Future Roadmap | 향후 개발 계획</h2>
        <div class="roadmap-block">
          <h4 class="roadmap-phase">Phase 1: Current (완료)</h4>
          <ul class="feature-list">
            <li>✅ Typing practice system</li>
            <li>✅ Keyboard switch tester</li>
            <li>✅ User authentication</li>
            <li>✅ Performance tracking</li>
          </ul>
        </div>
        <div class="roadmap-block">
          <h4 class="roadmap-phase">Phase 2: In Development (개발 중)</h4>
          <ul class="feature-list">
            <li>🔄 Typing game mode (Corrupt Type)</li>
            <li>🔄 Keyboard recommendation program</li>
            <li>🔄 Enhanced statistics visualization</li>
            <li>🔄 Achievement system</li>
          </ul>
        </div>
        <div class="roadmap-block">
          <h4 class="roadmap-phase">Phase 3: Planned (계획)</h4>
          <ul class="feature-list">
            <li>📋 Switch compatibility check system</li>
            <li>📋 Keyboard build log system</li>
            <li>📋 Community features</li>
            <li>📋 Leaderboard & competitions</li>
            <li>📋 Switch database & reviews</li>
          </ul>
        </div>
      </section>

      <!-- Technical Challenges -->
      <section class="content-section">
        <h2 class="section-title">💡 Technical Challenges & Solutions | 기술적 과제 및 해결</h2>

        <div class="challenge-block">
          <h3 class="challenge-title">Challenge 1: Real-time Typing Performance Calculation</h3>
          <p class="section-text">
            문제: Accurate CPM/WPM calculation during typing without performance degradation
          </p>
          <p class="section-text">Solution:</p>
          <ul class="feature-list">
            <li>Implemented debounced calculation using Vue 3 reactivity</li>
            <li>Optimized state updates to minimize re-renders</li>
            <li>Used Web Workers for heavy calculations (planned)</li>
          </ul>
        </div>

        <div class="challenge-block">
          <h3 class="challenge-title">Challenge 2: Loading State Management</h3>
          <p class="section-text">문제: Preventing layout shift and ensuring smooth initial load</p>
          <CodeBlock :code="loadingCode" />
          <ul class="feature-list">
            <li>Coordinated loading of fonts, images, and authentication</li>
            <li>Progressive enhancement for better perceived performance</li>
          </ul>
        </div>

        <div class="challenge-block">
          <h3 class="challenge-title">Challenge 3: Responsive Navigation Design</h3>
          <p class="section-text">문제: Seamless navigation experience across devices</p>
          <ul class="feature-list">
            <li>Desktop: Horizontal navigation bar with pixel-art theme</li>
            <li>Mobile: Hamburger menu with smooth transitions</li>
            <li>Adaptive layout using Vuetify breakpoints</li>
          </ul>
        </div>
      </section>

      <!-- Performance Metrics -->
      <section class="content-section">
        <h2 class="section-title">📈 Performance Metrics | 성능 지표</h2>
        <MetricsGrid :metrics="performanceMetrics" />
      </section>

      <!-- Tech Stack -->
      <section class="content-section">
        <h2 class="section-title">🛠️ Tech Stack Summary | 기술 스택 요약</h2>
        <TechStackGrid :stacks="techStacks" />
      </section>

      <!-- Key Takeaways -->
      <section class="content-section">
        <h2 class="section-title">👨‍💻 Key Takeaways | 핵심 요약</h2>

        <div class="takeaway-block">
          <h3 class="takeaway-title">Technical Proficiency:</h3>
          <ul class="feature-list">
            <li>Vue 3 Ecosystem Mastery - Composition API, Vuex, Router</li>
            <li>Firebase Integration - Authentication, Firestore, Real-time sync</li>
            <li>Performance Optimization - Loading strategies, reactive programming</li>
            <li>Responsive Design - Mobile-first, adaptive UI/UX</li>
            <li>Modular Architecture - Scalable component structure</li>
          </ul>
        </div>

        <div class="takeaway-block">
          <h3 class="takeaway-title">Soft Skills:</h3>
          <ul class="feature-list">
            <li>Product thinking: Building for a specific community (keyboard enthusiasts)</li>
            <li>Scalability mindset: Designing for future feature expansion</li>
            <li>User experience focus: Optimizing every interaction</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, inject, computed } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useResponsive } from '@/composables/useResponsive'
import TreeDiagram from '@/components/common/TreeDiagram.vue'
import CodeBlock from '@/components/common/CodeBlock.vue'
import MetricsGrid from '@/components/common/MetricsGrid.vue'
import TechStackGrid from '@/components/common/TechStackGrid.vue'
import TypingDemo from './demos/TypingDemo.vue'
import KeyboardTesterDemo from './demos/KeyboardTesterDemo.vue'
import PixelBorderDemo from './demos/PixelBorderDemo.vue'
import imgDashboard from '@/assets/images/works/keebbear/keebbear_dashboard.png'
import worksData from '@/data/works.json'

const workId = inject('workId', 3)

const workData = computed(() => {
  return worksData.find((work) => work.id === workId) || null
})

gsap.registerPlugin(ScrollTrigger)

const mockupContainerRef = ref(null)
const mockupWrapperRef = ref(null)
const mockupContainerInnerRef = ref(null)
const workModalHeaderRef = ref(null)
const dashboardImageRef = ref(null)
const typingDemoRef = ref(null)
const keyboardTesterDemoRef = ref(null)
const pixelBorderDemoRef = ref(null)
const featureBlock1Ref = ref(null)
const featureBlock2Ref = ref(null)
const featureBlock3Ref = ref(null)
const designFeatureBlockRef = ref(null)
const featureText1Ref = ref(null)
const featureText2Ref = ref(null)
const featureText3Ref = ref(null)
const designFeatureTextRef = ref(null)
const { isMobile, isTablet } = useResponsive()

// Code snippets for CodeBlock components
const performanceCode = `// Font and image preloading
await Promise.all([
  document.fonts.ready,
  waitForElements(),
  authPromise
]);`

const loadingCode = `async initializeApp() {
  await Promise.all([
    document.fonts.ready,
    this.waitForElements(),
    authPromise
  ]);
}`

const isLandscape = window.innerWidth > window.innerHeight

// Dashboard 이미지 애니메이션 설정 함수
const setupDashboardAnimation = () => {
  if (!dashboardImageRef.value) return

  const modalOverlay = document.querySelector('.work-modal-overlay')
  if (!modalOverlay) return

  // 요소가 실제로 DOM에 있고 크기가 있는지 확인
  if (
    !dashboardImageRef.value.offsetParent &&
    dashboardImageRef.value.offsetWidth === 0 &&
    dashboardImageRef.value.offsetHeight === 0
  ) {
    return
  }

  try {
    // 초기 상태: 오른쪽으로 이동하고 투명하게
    gsap.set(dashboardImageRef.value, {
      x: 100,
      opacity: 0,
    })

    const scrollTriggerConfig = {
      trigger: dashboardImageRef.value,
      scroller: modalOverlay,
      start: 'top 80%',
      end: 'top 50%',
      toggleActions: 'play none none reverse',
      invalidateOnRefresh: true,
    }

    // ScrollTrigger 파라미터 검증
    if (!scrollTriggerConfig.trigger || !scrollTriggerConfig.scroller) {
      console.warn('ScrollTrigger params are not set properly')
      return
    }

    // 스크롤 트리거로 애니메이션
    gsap.to(dashboardImageRef.value, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: scrollTriggerConfig,
    })
  } catch (error) {
    console.warn('Dashboard animation setup failed:', error)
  }
}

const setupDemoAnimation = (demoRef) => {
  if (!demoRef) return

  const modalOverlay = document.querySelector('.work-modal-overlay')
  if (!modalOverlay) return

  // Vue 컴포넌트인 경우 $el 사용, 일반 요소인 경우 직접 사용
  const demoElement = demoRef.$el || demoRef
  if (!demoElement) return

  // 요소가 실제로 DOM에 있고 크기가 있는지 확인
  if (
    !demoElement.offsetParent &&
    demoElement.offsetWidth === 0 &&
    demoElement.offsetHeight === 0
  ) {
    return
  }

  try {
    // 초기 상태: 오른쪽으로 이동하고 투명하게
    gsap.set(demoElement, {
      x: 100,
      opacity: 0,
    })

    const scrollTriggerConfig = {
      trigger: demoElement,
      scroller: modalOverlay,
      start: 'top 80%',
      end: 'top 50%',
      toggleActions: 'play none none reverse',
      invalidateOnRefresh: true,
    }

    // ScrollTrigger 파라미터 검증
    if (!scrollTriggerConfig.trigger || !scrollTriggerConfig.scroller) {
      console.warn('ScrollTrigger params are not set properly')
      return
    }

    // 스크롤 트리거로 애니메이션
    gsap.to(demoElement, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: scrollTriggerConfig,
    })
  } catch (error) {
    console.warn('Demo animation setup failed:', error)
  }
}

const setupFeatureTextAnimation = (textRef) => {
  if (!textRef) return

  const modalOverlay = document.querySelector('.work-modal-overlay')
  if (!modalOverlay) return

  // 요소가 실제로 DOM에 있고 크기가 있는지 확인
  if (!textRef.offsetParent && textRef.offsetWidth === 0 && textRef.offsetHeight === 0) {
    return
  }

  try {
    // 초기 상태: 왼쪽으로 이동하고 투명하게
    gsap.set(textRef, {
      x: -100,
      opacity: 0,
    })

    const scrollTriggerConfig = {
      trigger: textRef,
      scroller: modalOverlay,
      start: 'top 80%',
      end: 'top 50%',
      toggleActions: 'play none none reverse',
      invalidateOnRefresh: true,
    }

    // ScrollTrigger 파라미터 검증
    if (!scrollTriggerConfig.trigger || !scrollTriggerConfig.scroller) {
      console.warn('ScrollTrigger params are not set properly')
      return
    }

    // 스크롤 트리거로 애니메이션 (왼쪽에서 오른쪽으로)
    gsap.to(textRef, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: scrollTriggerConfig,
    })
  } catch (error) {
    console.warn('Feature text animation setup failed:', error)
  }
}

const setupBlockAnimation = (block, index = 0) => {
  if (!block) return

  const modalOverlay = document.querySelector('.work-modal-overlay')
  if (!modalOverlay) return

  // 요소가 실제로 DOM에 있고 크기가 있는지 확인
  if (!block.offsetParent && block.offsetWidth === 0 && block.offsetHeight === 0) {
    return
  }

  try {
    // 초기 상태: 아래로 이동하고 투명하게
    gsap.set(block, {
      y: 50,
      opacity: 0,
    })

    const scrollTriggerConfig = {
      trigger: block,
      scroller: modalOverlay,
      start: 'top 90%',
      end: 'top 60%',
      toggleActions: 'play none none reverse',
      invalidateOnRefresh: true,
    }

    // ScrollTrigger 파라미터 검증
    if (!scrollTriggerConfig.trigger || !scrollTriggerConfig.scroller) {
      console.warn('ScrollTrigger params are not set properly')
      return
    }

    // 스크롤 트리거로 애니메이션 (아래에서 위로)
    gsap.to(block, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      delay: index * 0.1, // 순차적 애니메이션을 위한 딜레이
      scrollTrigger: scrollTriggerConfig,
    })
  } catch (error) {
    console.warn('Block animation setup failed:', error)
  }
}

// Performance Metrics Data
const performanceMetrics = [
  { label: 'Initial Load Time', value: '< 2s' },
  { label: 'Time to Interactive', value: '< 3s' },
  { label: 'Lighthouse Score', value: '90+ (Performance)' },
  { label: 'Mobile-Friendly', value: 'Yes' },
]

// Tech Stack Data
const techStacks = [
  {
    title: 'Frontend:',
    items: [
      'Vue 3 (Composition API)',
      'Vuex 4 (State Management)',
      'Vue Router 4 (SPA Routing)',
      'Vuetify 3 (UI Framework)',
      'Chart.js (Data Visualization)',
      'Sass/SCSS (Styling)',
    ],
  },
  {
    title: 'Backend:',
    items: ['Firebase Authentication', 'Cloud Firestore (Database)', 'Firebase Hosting'],
  },
  {
    title: 'Development:',
    items: [
      'Vue CLI 5',
      'Babel (Transpiling)',
      'ESLint (Code Quality)',
      'Webpack 5 (Bundling)',
      'Git (Version Control)',
    ],
  },
]

// Tree Data for Diagrams
const vueEcosystemTree = {
  label: 'Vue 3 Ecosystem',
  children: [
    { label: 'Composition API (Reactive Programming)' },
    { label: 'Vuex (State Management)' },
    { label: 'Vue Router (SPA Navigation)' },
    { label: 'Vuetify 3 (UI Framework)' },
  ],
}

const firebaseTree = {
  label: 'Firebase Services',
  children: [
    { label: 'Authentication (User Management)' },
    { label: 'Firestore (Real-time Database)' },
    { label: 'Hosting (Deployment)' },
  ],
}

const responsiveTree = {
  label: 'Breakpoints',
  children: [
    { label: 'Mobile: < 768px' },
    { label: 'Tablet: 768px - 960px' },
    { label: 'Desktop: > 960px' },
  ],
}

const componentArchitectureTree = {
  label: 'App.vue (Root)',
  children: [
    {
      label: 'HeaderItem / NavigationBar',
      children: [
        { label: 'Logo' },
        {
          label: 'Navigation Items',
          children: [
            { label: 'Home' },
            { label: 'Typing Bear (Typing Practice)' },
            { label: 'Corrupt Type (Game Mode)' },
            { label: 'Tester (Keyboard Tester)' },
          ],
        },
        {
          label: 'UserMenu',
          children: [
            { label: 'Profile Avatar' },
            { label: 'Login Streak Display' },
            {
              label: 'Dropdown Menu',
              children: [{ label: 'Dashboard' }, { label: 'Logout' }],
            },
          ],
        },
      ],
    },
    {
      label: 'Router View',
      children: [
        {
          label: 'MainWindow (Home /)',
          children: [
            { label: 'Hero Section' },
            { label: 'Feature Showcase' },
            { label: 'Call-to-Action' },
          ],
        },
        {
          label: 'TypingContainer (/TypingBear)',
          children: [
            {
              label: 'TypingWindow',
              children: [
                { label: 'ControlButtons' },
                { label: 'TypeInput (Main Typing Area)' },
                { label: 'TypingProgress' },
                { label: 'TypingResult' },
              ],
            },
          ],
        },
        {
          label: 'KeyboardTester (/Tester)',
          children: [
            { label: 'Keyboard Layout Display' },
            { label: 'Key Press Visualization' },
            { label: 'Switch Sound Player' },
            { label: 'Test Statistics' },
          ],
        },
        {
          label: 'AuthPage (/auth)',
          children: [{ label: 'Login' }, { label: 'Register' }],
        },
        {
          label: 'Dashboard (/Dashboard)',
          children: [
            { label: 'User Profile Section' },
            { label: 'Statistics Overview' },
            { label: 'Performance Charts' },
            { label: 'Achievements' },
          ],
        },
      ],
    },
    { label: 'FooterItem' },
  ],
}

onMounted(() => {
  if (mockupContainerRef.value && mockupWrapperRef.value) {
    const modalOverlay = document.querySelector('.work-modal-overlay')

    if (modalOverlay && mockupContainerRef.value) {
      try {
        const scrollTriggerConfig1 = {
          trigger: mockupContainerRef.value,
          scroller: modalOverlay,
          start: 'top top',
          end: 'bottom center',
          scrub: 0.1,
        }

        if (scrollTriggerConfig1.trigger && scrollTriggerConfig1.scroller) {
          gsap.to(mockupWrapperRef.value, {
            scale: isTablet.value ? (isMobile.value ? 0.7 : 1) : 1.5,
            bottom: isTablet.value ? (isMobile.value ? '-5%' : '0%') : '-12%',
            opacity: 1,
            scrollTrigger: scrollTriggerConfig1,
          })
        }

        const scrollTriggerConfig2 = {
          trigger: mockupContainerRef.value,
          scroller: modalOverlay,
          start: 'top top',
          end: 'bottom center',
          scrub: 0.1,
        }

        if (scrollTriggerConfig2.trigger && scrollTriggerConfig2.scroller) {
          gsap.to(mockupContainerRef.value, {
            marginTop: '100vh',
            height: isLandscape ? '' : '40vh',
            scrollTrigger: scrollTriggerConfig2,
          })
        }

        const scrollTriggerConfig3 = {
          trigger: mockupContainerRef.value,
          scroller: modalOverlay,
          start: 'top 0px',
          end: '50px',
          scrub: 1,
        }

        if (scrollTriggerConfig3.trigger && scrollTriggerConfig3.scroller) {
          if (mockupContainerInnerRef.value) {
            gsap.to(mockupContainerInnerRef.value, {
              opacity: 0,
              scrollTrigger: scrollTriggerConfig3,
            })
          }

          if (workModalHeaderRef.value) {
            gsap.to(workModalHeaderRef.value, {
              opacity: 0,
              scrollTrigger: scrollTriggerConfig3,
            })
          }
        }
      } catch (error) {
        console.warn('Mockup animation setup failed:', error)
      }
    }
  }

  // Dashboard 이미지 애니메이션 (오른쪽에서 왼쪽으로)
  // DOM이 완전히 렌더링될 때까지 대기
  nextTick(() => {
    nextTick(() => {
      if (!dashboardImageRef.value) return

      const modalOverlay = document.querySelector('.work-modal-overlay')
      if (!modalOverlay) return

      // 요소가 실제로 DOM에 있는지 확인
      if (dashboardImageRef.value.offsetParent === null) {
        // 요소가 아직 렌더링되지 않았으면 잠시 후 다시 시도
        setTimeout(() => {
          setupDashboardAnimation()
        }, 100)
        return
      }

      setupDashboardAnimation()
    })
  })

  // TypingDemo 애니메이션 (오른쪽에서 왼쪽으로)
  nextTick(() => {
    nextTick(() => {
      if (!typingDemoRef.value) return

      const modalOverlay = document.querySelector('.work-modal-overlay')
      if (!modalOverlay) return

      const demoElement = typingDemoRef.value.$el || typingDemoRef.value
      if (!demoElement || demoElement.offsetParent === null) {
        setTimeout(() => {
          setupDemoAnimation(typingDemoRef.value)
        }, 100)
        return
      }

      setupDemoAnimation(typingDemoRef.value)
    })
  })

  // KeyboardTesterDemo 애니메이션 (오른쪽에서 왼쪽으로)
  nextTick(() => {
    nextTick(() => {
      if (!keyboardTesterDemoRef.value) return

      const modalOverlay = document.querySelector('.work-modal-overlay')
      if (!modalOverlay) return

      const demoElement = keyboardTesterDemoRef.value.$el || keyboardTesterDemoRef.value
      if (!demoElement || demoElement.offsetParent === null) {
        setTimeout(() => {
          setupDemoAnimation(keyboardTesterDemoRef.value)
        }, 100)
        return
      }

      setupDemoAnimation(keyboardTesterDemoRef.value)
    })
  })

  // PixelBorderDemo 애니메이션 (오른쪽에서 왼쪽으로)
  nextTick(() => {
    nextTick(() => {
      if (!pixelBorderDemoRef.value) return

      const modalOverlay = document.querySelector('.work-modal-overlay')
      if (!modalOverlay) return

      const demoElement = pixelBorderDemoRef.value.$el || pixelBorderDemoRef.value
      if (!demoElement || demoElement.offsetParent === null) {
        setTimeout(() => {
          setupDemoAnimation(pixelBorderDemoRef.value)
        }, 100)
        return
      }

      setupDemoAnimation(pixelBorderDemoRef.value)
    })
  })

  // 주요 기능 텍스트 애니메이션 (왼쪽에서 오른쪽으로)
  nextTick(() => {
    nextTick(() => {
      const modalOverlay = document.querySelector('.work-modal-overlay')
      if (!modalOverlay) return

      // 주요 기능 섹션의 텍스트들
      const featureTexts = [
        featureText1Ref.value,
        featureText2Ref.value,
        featureText3Ref.value,
        designFeatureTextRef.value,
      ]

      featureTexts.forEach((textRef) => {
        if (!textRef) return

        if (textRef.offsetParent === null) {
          setTimeout(() => {
            setupFeatureTextAnimation(textRef)
          }, 100)
          return
        }

        setupFeatureTextAnimation(textRef)
      })
    })
  })

  // 나머지 feature-block들 애니메이션 (아래에서 위로)
  nextTick(() => {
    nextTick(() => {
      const modalOverlay = document.querySelector('.work-modal-overlay')
      if (!modalOverlay) return

      // 모든 tech-block, roadmap-block, challenge-block, takeaway-block, feature-block 선택
      const blocks = document.querySelectorAll(
        '.tech-block, .roadmap-block, .challenge-block, .takeaway-block, .feature-block',
      )

      blocks.forEach((block, index) => {
        // 요소가 실제로 DOM에 있고 크기가 있는지 확인
        if (
          !block ||
          (!block.offsetParent && block.offsetWidth === 0 && block.offsetHeight === 0)
        ) {
          setTimeout(
            () => {
              setupBlockAnimation(block, index)
            },
            100 + index * 50,
          )
          return
        }

        setupBlockAnimation(block, index)
      })
    })
  })
})
</script>

<style scoped>
@import '@/assets/styles/breakpoints.css';

.work-modal-content {
  width: 100%;
  min-height: 100vh;
  padding: 0px 0px;
}

.work-modal-header {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: 100%;
  height: auto;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.work-modal-title {
  font-size: var(--hero--1);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--white--1));
  letter-spacing: -0.02em;
}

.work-modal-subtitle {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  color: rgb(var(--white--3));
}

.work-modal-body {
  overflow: hidden;
}

.mockup-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mockup-container-inner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(var(--gray--0), 0.8);
  z-index: 1;
}

.mockup-wrapper {
  position: relative;
  height: auto;
  transform: scale(4);
}

.mockup-frame {
  width: 100%;
  height: auto;
  display: block;
  position: relative;
  z-index: 2;
  object-fit: contain;
}

.mockup-screen {
  position: absolute;
  top: 6%;
  left: 3%;
  width: 95%;
  height: auto;
  border-radius: 3%;
  overflow: hidden;
  z-index: 1;
  background-color: rgb(var(--gray--0));
  pointer-events: none;
}

.mockup-video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Content Sections */
.content-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 40px;
}

.section-title {
  font-size: var(--title--1);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--gray--1));
  margin: 0 0 30px 0;
  letter-spacing: -0.01em;
}

.section-text {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  line-height: 1.7;
  color: rgb(var(--gray--2));
  margin: 0 0 20px 0;
}

/* Feature Blocks */
.feature-block {
  margin-bottom: 60px;
}

.feature-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

.feature-text {
  display: flex;
  flex-direction: column;
}

.feature-title {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--gray--1));
  margin: 0 0 15px 0;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0 0 15px 0;
}

.feature-list li {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  line-height: 1.6;
  color: rgb(var(--gray--2));
  margin-bottom: 8px;
  padding-left: 20px;
  position: relative;
}

.feature-image-wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
}

.feature-image {
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(var(--gray--5), 0.15);
}

/* Tech Blocks */
.tech-block {
  margin-bottom: 40px;
}

.tech-title {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--gray--1));
  margin: 0 0 15px 0;
}

.tech-desc {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--medium);
  color: rgb(var(--gray--2));
  margin: 15px 0 10px 0;
}

/* Roadmap Blocks */
.roadmap-block {
  margin-bottom: 30px;
}

.roadmap-phase {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--gray--1));
  margin: 0 0 15px 0;
}

/* Challenge Blocks */
.challenge-block {
  margin-bottom: 40px;
}

.challenge-title {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--gray--1));
  margin: 0 0 15px 0;
}

/* Takeaway Blocks */
.takeaway-block {
  margin-bottom: 30px;
}

.takeaway-title {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--gray--1));
  margin: 0 0 15px 0;
}

p {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  line-height: 1.6;
  color: rgb(var(--gray--1));
  margin: 0;
}

/* Tablet: --tablet */
@media (--tablet) {
  .work-modal-title {
    font-size: var(--hero--2);
    font-weight: var(--font-weight--bold);
  }

  .content-section {
    padding: 40px 30px;
  }

  .section-title {
    font-size: var(--title--2);
  }

  .feature-content {
    gap: 30px;
  }
}

/* Mobile: --mobile */
@media (--mobile) {
  .work-modal-title {
    font-size: var(--hero--3);
    font-weight: var(--font-weight--bold);
  }

  .work-modal-subtitle {
    font-size: var(--body--2--normal);
    font-weight: var(--font-weight--regular);
  }

  .content-section {
    padding: 30px 20px;
  }

  .section-title {
    font-size: var(--title--3);
  }

  .feature-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .feature-image-wrapper {
    justify-content: center;
  }

  .feature-image {
    max-width: 100%;
  }
}
</style>
