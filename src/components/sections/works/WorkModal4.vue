<template>
  <div class="work-modal-content">
    <div ref="workModalHeaderRef" class="work-modal-header">
      <h1 class="work-modal-title">Tape</h1>
      <p class="work-modal-subtitle">
        Asynchronous Video Messaging Tool for Collaborative Workspace
      </p>
    </div>
    <div class="work-modal-body">
      <div ref="heroImageContainerRef" class="hero-image-container">
        <div ref="heroImageWrapperRef" class="hero-image-wrapper">
          <div ref="heroImageOverlayRef" class="hero-image-overlay"></div>
          <img
            src="/videos/tape/tape_thumbnail-front.png"
            alt="Tape Dashboard"
            class="hero-image"
          />
        </div>
      </div>

      <!-- Project Overview -->
      <section class="content-section">
        <h2 class="section-title">📌 Project Overview | 프로젝트 개요</h2>
        <p class="section-text">
          Tape는 비동기 비디오 메시징 도구로, 회의의 번거로움 없이 작업을 명확하게 공유하고, 신중한
          피드백을 교환하며, 작업을 완료할 수 있도록 도와줍니다. Tape의 인터랙티브 기능은 협업을
          원활하고 더욱 생산적으로 만듭니다.
        </p>
        <p class="section-text">
          Tape is an asynchronous video messaging tool that helps you share your work with clarity,
          exchange thoughtful feedback, and accomplish tasks without the hassles of meetings. Tape's
          interactive features make collaboration seamless and extra-productive.
        </p>
        <!-- <div class="video-container">
          <video autoplay loop muted playsinline class="demo-video">
            <source src="/videos/tape/tape_test.webm" type="video/webm" />
            <source src="/videos/tape/tape_test.mp4" type="video/mp4" />
          </video>
        </div> -->
        <div class="screenshots-grid">
          <img
            src="@/assets/images/works/tape/tape_screenshot1.png"
            alt="Tape Screenshot 1"
            class="screenshot-image"
          />
          <!-- <img
            src="@/assets/images/works/tape/tape_screenshot2.png"
            alt="Tape Screenshot 2"
            class="screenshot-image"
          /> -->
          <img
            src="@/assets/images/works/tape/tape_screenshot3.png"
            alt="Tape Screenshot 3"
            class="screenshot-image"
          />
          <img
            src="@/assets/images/works/tape/tape_screenshot4.png"
            alt="Tape Screenshot 4"
            class="screenshot-image"
          />
        </div>
      </section>

      <!-- Key Contributions -->
      <section class="content-section">
        <h2 class="section-title">🎨 My Key Contributions | 주요 역할</h2>
        <p class="section-text">
          <strong>Role:</strong> Frontend Developer & UI/UX Designer - 전체 레이아웃 및 디자인 총괄
        </p>

        <!-- 1. Design Director -->
        <div class="feature-block" ref="featureBlock1Ref">
          <div class="feature-content">
            <div class="feature-text" ref="featureText1Ref">
              <h3 class="feature-title">🥇 #1. 디자인 총괄 | Design Director</h3>
              <p class="section-text"><strong>Scope:</strong></p>
              <ul class="feature-list">
                <li>AI 자막/요약 UI: 언어 선택 다이얼로그, 번역 버튼 디자인</li>
                <li>텍스트 클립: TipTap 에디터 통합 및 코드블락 스타일링</li>
                <li>커스텀 토스트: Element UI notify → vue-toastification 전환</li>
                <li>온보딩 시스템: 툴팁 위치 조정, Progress Bar 디자인</li>
                <li>녹화 UI: 전체 레이아웃 수정, 타이머 위치 변경</li>
                <li>반응형 디자인: 모바일/태블릿 환경 최적화</li>
              </ul>
              <p class="section-text"><strong>Key Deliverables:</strong></p>
              <ul class="feature-list">
                <li>150+ Vue 컴포넌트의 디자인 및 레이아웃 작업</li>
                <li>Element UI & Vuetify 커스터마이징</li>
                <li>모바일 가로/세로에 따른 비디오 고정 변경</li>
                <li>채널 헤더, 사이드바, 인박스 UI 개선</li>
                <li>단축키 팝업, Notification 디자인 시스템</li>
              </ul>
              <p class="section-text"><strong>Impact:</strong></p>
              <ul class="feature-list">
                <li>✅ 대규모 프로젝트 디자인 총괄 경험</li>
                <li>✅ UI 라이브러리 커스터마이징 능력</li>
                <li>✅ 프로덕션 수준 반응형 디자인</li>
              </ul>
            </div>
            <div class="feature-image-wrapper">
              <ChannelListDemo ref="channelListDemoRef" />
              <VideoDetailDemo ref="videoDetailDemoRef" />
            </div>
          </div>
        </div>

        <!-- 2. Emoji Feedback -->
        <div class="feature-block" ref="featureBlock2Ref">
          <div class="feature-content">
            <div class="feature-text" ref="featureText2Ref">
              <h3 class="feature-title">🥈 #2. 이모지 피드백 | Emoji Feedback</h3>
              <p class="section-text"><strong>Challenge:</strong></p>
              <ul class="feature-list">
                <li>비디오 위에 실시간으로 표시되는 이모지 시각화</li>
                <li>이모지 배경 투명도 조정으로 비디오 가독성 확보</li>
                <li>게스트 사용자도 이모지 입력 가능하도록 UI 개선</li>
                <li>모바일 환경에서의 이모지 리액션 화면 최적화</li>
              </ul>
              <p class="section-text"><strong>Solution:</strong></p>
              <ul class="feature-list">
                <li>이모지 피드백 화면 로직 및 디자인 조정</li>
                <li>Clip reaction 화면 배경 투명도 및 곡률 제거</li>
                <li>게스트 이모지 입력 기능 UI 구현</li>
                <li>모바일/데스크톱 반응형 레이아웃 디자인</li>
              </ul>
              <p class="section-text"><strong>Impact:</strong></p>
              <ul class="feature-list">
                <li>✅ 실시간 피드백 경험 개선</li>
                <li>✅ 비디오 위 인터랙션 디자인 능력</li>
                <li>✅ 접근성 고려 (게스트 사용자 지원)</li>
                <li>✅ 시간 기반 필터링 로직 구현 (성능 최적화)</li>
              </ul>
            </div>
            <div class="feature-image-wrapper">
              <EmojiFeedbackDemo ref="emojiFeedbackDemoRef" />
            </div>
          </div>
        </div>

        <!-- 3. Embed Integration -->
        <div class="feature-block" ref="featureBlock3Ref">
          <div class="feature-content">
            <div class="feature-text" ref="featureText3Ref">
              <h3 class="feature-title">
                🥉 #3. 다양한 클립 타입 지원 | Multiple Clip Types Support
              </h3>
              <p class="section-text"><strong>Challenge:</strong></p>
              <ul class="feature-list">
                <li>비디오뿐만 아니라 다양한 타입의 클립 지원 필요</li>
                <li>Upload, Text, Embed, Poll, Request 등 다양한 클립 타입 UI 구현</li>
                <li>각 클립 타입별로 다른 레이아웃 및 인터랙션 디자인</li>
                <li>클립 타입 선택 UI 및 생성 플로우 설계</li>
              </ul>
              <p class="section-text"><strong>Solution:</strong></p>
              <ul class="feature-list">
                <li>다양한 클립 타입 선택 버튼 UI 디자인 (Upload, Text, Embed, Poll, Request)</li>
                <li>각 클립 타입별 생성 및 편집 인터페이스 구현</li>
                <li>임베드: Calendly, CodePen, Figma 등 외부 서비스 통합</li>
                <li>텍스트 클립: TipTap 에디터 통합 및 코드블락 스타일링</li>
                <li>폴 및 리퀘스트 클립 UI/UX 디자인</li>
              </ul>
              <p class="section-text"><strong>Impact:</strong></p>
              <ul class="feature-list">
                <li>✅ 다양한 콘텐츠 타입 지원으로 플랫폼 확장성 확보</li>
                <li>✅ 각 클립 타입별 최적화된 UI/UX 제공</li>
                <li>✅ 외부 서비스 통합 및 에디터 구현 능력</li>
              </ul>
            </div>
            <div class="feature-image-wrapper">
              <img
                src="@/assets/images/works/tape/tape_clip_type.png"
                alt="Tape Clip Types"
                class="feature-image"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Tech Stack -->
      <section class="content-section">
        <h2 class="section-title">🛠️ Tech Stack Summary | 기술 스택 요약</h2>
        <TechStackGrid :stacks="techStacks" />
      </section>

      <!-- Detailed Work Examples -->
      <section class="content-section">
        <h2 class="section-title">💼 Detailed Work Examples | 상세 작업 내역</h2>

        <div class="challenge-block">
          <h3 class="challenge-title">1. Emoji Feedback System | 이모지 피드백 시스템</h3>
          <CodeBlock :code="emojiCode" />
          <ul class="feature-list">
            <li>
              <strong>이모지 피드백 화면 로직 및 디자인 조정</strong> - 비디오 위 실시간 이모지 표시
            </li>
            <li><strong>Clip reaction 화면 수정</strong> - 배경 투명도 조정 및 곡률 제거</li>
            <li><strong>게스트 이모지 입력 기능</strong> - 비로그인 사용자 접근성 개선</li>
            <li><strong>모바일 최적화</strong> - 가로/세로 환경에 따른 레이아웃 조정</li>
            <li><strong>시간 기반 필터링</strong> - 성능 최적화 및 랜덤 액세스 지원</li>
          </ul>
        </div>

        <div class="challenge-block">
          <h3 class="challenge-title">2. Multiple Clip Types Support | 다양한 클립 타입 지원</h3>
          <CodeBlock :code="embedCode" />
          <ul class="feature-list">
            <li>
              <strong>다양한 클립 타입 UI 구현</strong> - Upload, Text, Embed, Poll, Request 클립
              타입 지원
            </li>
            <li>
              <strong>임베드 레이아웃 및 디자인 작업</strong> - Calendly, CodePen, Figma 임베드 대응
            </li>
            <li><strong>텍스트 클립 에디터 통합</strong> - TipTap 에디터 및 코드블락 스타일링</li>
            <li><strong>Fixed size embed width/height 자동 계산</strong> - 반응형 크기 조정</li>
            <li><strong>임베드 시 자막 버튼 처리</strong> - UI 충돌 방지</li>
            <li><strong>임베드 URL 풀 URL 처리</strong> - 사용자 편의성 개선</li>
          </ul>
        </div>

        <div class="challenge-block">
          <h3 class="challenge-title">3. Design System & Layout | 디자인 시스템 및 레이아웃</h3>
          <ul class="feature-list">
            <li>
              <strong>AI 자막/요약 UI:</strong> 언어 선택 다이얼로그, Translate/Regenerate 버튼,
              Summary Export
            </li>
            <li>
              <strong>텍스트 클립:</strong> TipTap Script 에디터, 코드블락 스타일, 포커스/줄바꿈
              처리
            </li>
            <li>
              <strong>커스텀 토스트:</strong> Element UI notify → vue-toastification 전환, 중복 방지
            </li>
            <li>
              <strong>온보딩 시스템:</strong> Welcome 페이지, 툴팁 위치 조정, Progress Bar, 라우팅
              전환 체크
            </li>
            <li>
              <strong>녹화 UI:</strong> 전체 레이아웃 수정, Record type 선택, 타이머 표시 위치 변경
            </li>
            <li>
              <strong>채널/인박스:</strong> 채널 헤더 영역, 외부 접속 CTA, 템플릿 버튼, 채널 아이콘
            </li>
            <li>
              <strong>게스트 로그인:</strong> 팝업 문구, 이메일 가입 정합성, 이름 변경, 다운로드
              제한
            </li>
            <li><strong>Notification:</strong> 기본값 설정, 디자인 개선, 퀵 레코드 비활성화</li>
            <li>
              <strong>모바일 최적화:</strong> 채널 헤더, 툴팁, 가로/세로 비디오 고정, 레이아웃 버그
              수정
            </li>
            <li><strong>단축키:</strong> 방향키 추가, 팝업 동작 개선</li>
            <li>
              <strong>기타 UI/UX:</strong> 미팅 제목, 브라우저 탭 이름, 사이드바 여백, 폰트 사이즈,
              z-index
            </li>
          </ul>
        </div>
      </section>

      <!-- Performance Metrics -->
      <section class="content-section">
        <h2 class="section-title">📈 Performance Impact</h2>
        <MetricsGrid :metrics="performanceMetrics" />
      </section>

      <!-- Key Takeaways -->
      <section class="content-section">
        <h2 class="section-title">🎯 Why This Matters</h2>

        <div class="takeaway-block">
          <h3 class="takeaway-title">Design & Frontend Leadership:</h3>
          <ul class="feature-list">
            <li>
              <strong>Design System Ownership:</strong> 150+ Vue 컴포넌트의 전체 레이아웃 및 디자인
              총괄
            </li>
            <li>
              <strong>UI Library Mastery:</strong> Element UI & Vuetify 커스터마이징,
              vue-toastification 통합
            </li>
            <li>
              <strong>Production-level UX:</strong> 온보딩 시스템, 게스트 로그인, 단축키 등 사용자
              경험 개선
            </li>
            <li>
              <strong>Responsive Design:</strong> 모바일/태블릿 환경 최적화, 가로/세로 레이아웃 대응
            </li>
            <li>
              <strong>External Integration:</strong> Calendly, CodePen, Figma 임베드 UI 구현 및 동적
              스크립트 로딩
            </li>
          </ul>
        </div>

        <div class="takeaway-block">
          <h3 class="takeaway-title">Technical Skills:</h3>
          <ul class="feature-list">
            <li>
              <strong>Vue 2 Ecosystem:</strong> Options API, Vuex, Vue Router, 150+ 컴포넌트 구조
              설계
            </li>
            <li>
              <strong>Rich Text Editor:</strong> TipTap 통합, 코드블락 스타일링, 포커스/줄바꿈 처리
            </li>
            <li>
              <strong>Video UI/UX:</strong> 이모지 피드백 시스템, 자막 UI, 녹화 인터페이스 디자인
            </li>
            <li>
              <strong>URL Processing:</strong> 서비스별 URL 파싱 및 변환 (Calendly/CodePen/Figma)
            </li>
            <li>
              <strong>Accessibility:</strong> 게스트 사용자 지원, 권한 기반 UI, 다운로드 제한 처리
            </li>
          </ul>
        </div>

        <div class="takeaway-block">
          <h3 class="takeaway-title">Business Impact:</h3>
          <ul class="feature-list">
            <li><strong>User Onboarding:</strong> 온보딩 시스템 구축으로 신규 사용자 경험 개선</li>
            <li>
              <strong>Cross-platform Support:</strong> 모바일/데스크톱 반응형 디자인으로 사용자층
              확대
            </li>
            <li>
              <strong>External Tool Integration:</strong> Calendly/Figma 임베드로 협업 워크플로우
              개선
            </li>
            <li>
              <strong>UI Consistency:</strong> 커스텀 토스트 시스템으로 전체 앱 UX 일관성 확보
            </li>
            <li><strong>Accessibility First:</strong> 게스트 사용자 지원으로 진입 장벽 낮춤</li>
          </ul>
        </div>

        <div class="takeaway-block">
          <h3 class="takeaway-title">Work Scope Summary:</h3>
          <ul class="feature-list">
            <li><strong>Total Components:</strong> 150+ Vue 컴포넌트 디자인 및 레이아웃</li>
            <li>
              <strong>Feature Areas:</strong> 이모지 시스템, 임베드, AI 자막 UI, 텍스트 클립,
              온보딩, 녹화 UI, 채널/인박스, 게스트 로그인, Notification, 단축키, 모바일 최적화
            </li>
            <li>
              <strong>Tech Stack:</strong> Vue 2, Vuex, Element UI, Vuetify, TipTap, Video.js,
              vue-toastification
            </li>
            <li><strong>Role:</strong> Frontend Developer & UI/UX Designer (디자인 총괄)</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useResponsive } from '@/composables/useResponsive'
import CodeBlock from '@/components/common/CodeBlock.vue'
import MetricsGrid from '@/components/common/MetricsGrid.vue'
import TechStackGrid from '@/components/common/TechStackGrid.vue'
import EmojiFeedbackDemo from './demos/EmojiFeedbackDemo.vue'
import ChannelListDemo from './demos/ChannelListDemo.vue'
import VideoDetailDemo from './demos/VideoDetailDemo.vue'

gsap.registerPlugin(ScrollTrigger)

const workModalHeaderRef = ref(null)
const heroImageContainerRef = ref(null)
const heroImageOverlayRef = ref(null)
const heroImageWrapperRef = ref(null)
const { isMobile, isTablet } = useResponsive()
const featureBlock1Ref = ref(null)
const featureBlock2Ref = ref(null)
const featureBlock3Ref = ref(null)
const featureText1Ref = ref(null)
const featureText2Ref = ref(null)
const featureText3Ref = ref(null)
const emojiFeedbackDemoRef = ref(null)
const channelListDemoRef = ref(null)
const videoDetailDemoRef = ref(null)

// Code snippets for CodeBlock components
const emojiCode = `// 시간 기반 이모지 표시 로직
async displayEmoji(time) {
  if (this.filteredEmojiList?.length === 0) return

  for (let i = 0; i < this.filteredEmojiList?.length; i++) {
    let emoji = this.filteredEmojiList[i]

    // 현재 시간과 이모지 시간의 차이가 0.15초 이내면 표시
    if (Math.abs(emoji.emojiTime - time) <= this.EMOJI_DISPLAY_TIME) {
      this.filteredEmojiList.splice(i, 1)
      i--
      this.emojiFadeoutMap.set(emoji.emojiId, false)
      this.addToDisplayingEmojiList({
        id: emoji.emojiId,
        type: this.getEmojiType(emoji.unicode),
        top: emoji.positionY,
        left: emoji.positionX,
        time: emoji.emojiTime,
      })
    } else if (emoji.emojiTime < time) {
      // 현재 시간보다 이전 이모지는 제거 (성능 최적화)
      this.filteredEmojiList.splice(i, 1)
      i--
    } else {
      break // 시간순 정렬되어 있으므로 이후는 확인 불필요
    }
  }
}

// 랜덤 액세스 처리
onRandomAccess(time) {
  this.resetDisplayingEmojiList()
  this.filteredEmojiList = this.emojiList ? [...this.emojiList] : []
  this.displayEmoji(time)
}`

const embedCode = `// Service-specific URL conversion and embed handling
if (this.url.indexOf('calendly.com') > -1) {
  this.urlType = 'calendly'

  // Dynamic script loading with duplicate prevention
  if (document.querySelector('script[tag="calendly"]')) {
    document.querySelector('script[tag="calendly"]')
      .parentNode.removeChild(document.querySelector('script[tag="calendly"]'))
  }

  let calendlyScript = document.createElement('script')
  calendlyScript.setAttribute('tag', 'calendly')
  calendlyScript.setAttribute('src',
    'https://assets.calendly.com/assets/external/widget.js')
  document.head.appendChild(calendlyScript)

} else if (this.url.indexOf('codepen.io') > -1) {
  this.url = this.url.replace('/pen/', '/embed/')

} else if (this.url.indexOf('figma.com') > -1) {
  // URL encoding for Figma embed
  let prefix = 'https://www.figma.com/embed?embed_host=share&url='
  this.url = this.url
    .replaceAll('%', '%25')
    .replaceAll(':', '%3A')
    .replaceAll('/', '%2F')
  this.url = prefix.concat(this.url)
}`

const setupFeatureTextAnimation = (textRef) => {
  if (!textRef) return

  const modalOverlay = document.querySelector('.work-modal-overlay')
  if (!modalOverlay) return

  if (!textRef.offsetParent && textRef.offsetWidth === 0 && textRef.offsetHeight === 0) {
    return
  }

  try {
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

    if (!scrollTriggerConfig.trigger || !scrollTriggerConfig.scroller) {
      console.warn('ScrollTrigger params are not set properly')
      return
    }

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

const setupDemoAnimation = (demoRef) => {
  if (!demoRef) return

  const modalOverlay = document.querySelector('.work-modal-overlay')
  if (!modalOverlay) return

  const demoElement = demoRef.$el || demoRef
  if (!demoElement) return

  if (
    !demoElement.offsetParent &&
    demoElement.offsetWidth === 0 &&
    demoElement.offsetHeight === 0
  ) {
    return
  }

  try {
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

    if (!scrollTriggerConfig.trigger || !scrollTriggerConfig.scroller) {
      console.warn('ScrollTrigger params are not set properly')
      return
    }

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

const setupBlockAnimation = (block, index = 0) => {
  if (!block) return

  const modalOverlay = document.querySelector('.work-modal-overlay')
  if (!modalOverlay) return

  if (!block.offsetParent && block.offsetWidth === 0 && block.offsetHeight === 0) {
    return
  }

  try {
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

    if (!scrollTriggerConfig.trigger || !scrollTriggerConfig.scroller) {
      console.warn('ScrollTrigger params are not set properly')
      return
    }

    gsap.to(block, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      delay: index * 0.1,
      scrollTrigger: scrollTriggerConfig,
    })
  } catch (error) {
    console.warn('Block animation setup failed:', error)
  }
}

// Performance Metrics Data
const performanceMetrics = [
  { label: 'Components Designed', value: '150+ Vue Components' },
  { label: 'Feature Areas', value: '12+ Major Features' },
  { label: 'UI Libraries', value: 'Element UI + Vuetify' },
  { label: 'Responsive Support', value: 'Mobile/Tablet/Desktop' },
]

// Tech Stack Data
const techStacks = [
  {
    title: 'Frontend:',
    items: [
      'Vue 2 (Options API)',
      'Vuex (State Management)',
      'Vue Router',
      'Element UI & Vuetify',
      'Video.js',
      'TipTap (Rich Text)',
    ],
  },
  {
    title: 'External Integrations:',
    items: ['Calendly API', 'CodePen Embed', 'Figma Embed', 'vue-toastification'],
  },
]

onMounted(() => {
  // Hero 이미지 스크롤 애니메이션 (WorkModal3 참고)
  if (heroImageContainerRef.value && heroImageWrapperRef.value) {
    const modalOverlay = document.querySelector('.work-modal-overlay')

    if (modalOverlay && heroImageContainerRef.value) {
      try {
        // 이미지 축소 애니메이션
        const scrollTriggerConfig1 = {
          trigger: heroImageContainerRef.value,
          scroller: modalOverlay,
          start: 'top top',
          end: 'bottom center',
          scrub: 0.1,
        }

        if (scrollTriggerConfig1.trigger && scrollTriggerConfig1.scroller) {
          gsap.to(heroImageWrapperRef.value, {
            scale: isTablet.value ? (isMobile.value ? 0.7 : 1) : 1.1,
            bottom: isTablet.value ? (isMobile.value ? '-5%' : '0%') : '-12%',
            opacity: 1,
            scrollTrigger: scrollTriggerConfig1,
          })
        }

        // 컨테이너 높이 조정
        const scrollTriggerConfig2 = {
          trigger: heroImageContainerRef.value,
          scroller: modalOverlay,
          start: 'top top',
          end: 'bottom center',
          scrub: 0.1,
        }

        if (scrollTriggerConfig2.trigger && scrollTriggerConfig2.scroller) {
          const isLandscape = window.innerWidth > window.innerHeight
          gsap.to(heroImageContainerRef.value, {
            marginTop: '100vh',
            height: isLandscape ? '' : '40vh',
            scrollTrigger: scrollTriggerConfig2,
          })
        }

        // 타이틀 사라지기 애니메이션
        const scrollTriggerConfig3 = {
          trigger: heroImageContainerRef.value,
          scroller: modalOverlay,
          start: 'top 0px',
          end: '50px',
          scrub: 1,
        }

        if (scrollTriggerConfig3.trigger && scrollTriggerConfig3.scroller) {
          if (heroImageOverlayRef.value) {
            gsap.to(heroImageOverlayRef.value, {
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
        console.warn('Hero image animation setup failed:', error)
      }
    }
  }

  // 주요 기능 텍스트 애니메이션
  nextTick(() => {
    nextTick(() => {
      const modalOverlay = document.querySelector('.work-modal-overlay')
      if (!modalOverlay) return

      const featureTexts = [featureText1Ref.value, featureText2Ref.value, featureText3Ref.value]

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

  // Demo 애니메이션 (Emoji Feedback)
  nextTick(() => {
    nextTick(() => {
      if (!emojiFeedbackDemoRef.value) return

      const modalOverlay = document.querySelector('.work-modal-overlay')
      if (!modalOverlay) return

      const demoElement = emojiFeedbackDemoRef.value.$el || emojiFeedbackDemoRef.value
      if (!demoElement || demoElement.offsetParent === null) {
        setTimeout(() => {
          setupDemoAnimation(emojiFeedbackDemoRef.value)
        }, 100)
        return
      }

      setupDemoAnimation(emojiFeedbackDemoRef.value)
    })
  })

  // Demo 애니메이션 (Channel List)
  nextTick(() => {
    nextTick(() => {
      if (!channelListDemoRef.value) return

      const modalOverlay = document.querySelector('.work-modal-overlay')
      if (!modalOverlay) return

      const demoElement = channelListDemoRef.value.$el || channelListDemoRef.value
      if (!demoElement || demoElement.offsetParent === null) {
        setTimeout(() => {
          setupDemoAnimation(channelListDemoRef.value)
        }, 100)
        return
      }

      setupDemoAnimation(channelListDemoRef.value)
    })
  })

  // Demo 애니메이션 (Video Detail)
  nextTick(() => {
    nextTick(() => {
      if (!videoDetailDemoRef.value) return

      const modalOverlay = document.querySelector('.work-modal-overlay')
      if (!modalOverlay) return

      const demoElement = videoDetailDemoRef.value.$el || videoDetailDemoRef.value
      if (!demoElement || demoElement.offsetParent === null) {
        setTimeout(() => {
          setupDemoAnimation(videoDetailDemoRef.value)
        }, 100)
        return
      }

      setupDemoAnimation(videoDetailDemoRef.value)
    })
  })

  // 나머지 블록들 애니메이션
  nextTick(() => {
    nextTick(() => {
      const modalOverlay = document.querySelector('.work-modal-overlay')
      if (!modalOverlay) return

      const blocks = document.querySelectorAll('.tech-block, .challenge-block, .takeaway-block')

      blocks.forEach((block, index) => {
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
  background-color: rgb(29, 41, 47);
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

.hero-image-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(29, 41, 47);
}

.hero-image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(var(--gray--0), 0.8);
  z-index: 3;
}

.hero-image-wrapper {
  position: relative;
  height: auto;
  transform: scale(4);
}

.hero-image {
  width: 100%;
  max-width: 1400px;
  height: auto;
  object-fit: contain;
  display: block;
  position: relative;
  z-index: 2;
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
  color: rgb(var(--white--1));
  margin: 0 0 30px 0;
  letter-spacing: -0.01em;
}

.section-text {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  line-height: 1.7;
  color: rgb(var(--white--2));
  margin: 0 0 20px 0;
}

.video-container {
  width: 100%;
  margin: 30px 0;
  border-radius: 12px;
  overflow: hidden;
}

.demo-video {
  width: 100%;
  height: auto;
  display: block;
}

.screenshots-grid {
  display: grid;
  grid-template-columns: repeat(1fr);
  gap: 20px;
  margin-top: 30px;
}

.screenshot-image {
  width: 100%;
  height: auto;
  border-radius: 12px;
  display: block;
  border: 1px solid rgba(var(--white--1), 0.2);
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
  color: rgb(var(--white--1));
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
  color: rgb(var(--white--2));
  margin-bottom: 8px;
  padding-left: 20px;
  position: relative;
}

.feature-image-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 20px;
}

.feature-placeholder {
  width: 100%;
  min-height: 300px;
  background-color: rgb(var(--gray--5s) / 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(var(--white--3));
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
}

.feature-video {
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(var(--gray--5), 0.15);
}

.feature-image {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: #0e1519;
}

.feature-videos-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  width: 100%;
}

.feature-video-small {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(var(--gray--5), 0.15);
}

/* Tech Blocks */
.tech-block {
  margin-bottom: 40px;
}

.tech-title {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--white--1));
  margin: 0 0 15px 0;
}

.tech-desc {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--medium);
  color: rgb(var(--white--2));
  margin: 15px 0 10px 0;
}

/* Challenge Blocks */
.challenge-block {
  margin-bottom: 40px;
}

.challenge-title {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--white--1));
  margin: 0 0 15px 0;
}

/* Takeaway Blocks */
.takeaway-block {
  margin-bottom: 30px;
}

.takeaway-title {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--white--1));
  margin: 0 0 15px 0;
}

p {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  line-height: 1.6;
  color: rgb(var(--white--1));
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

  .feature-videos-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .hero-video {
    border-radius: 8px;
  }

  .screenshots-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
