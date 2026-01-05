<template>
  <div class="work-modal-content">
    <div ref="workModalHeaderRef" class="work-modal-header">
      <h1 class="work-modal-title">{{ workData?.title || '' }}</h1>
      <p class="work-modal-subtitle">{{ workData?.description || '' }}</p>
      <div ref="producthuntBadgeRef" class="producthunt-badge">
        <img
          src="@/assets/images/producthunt/dailybadge2.avif"
          alt="Product Hunt Daily #2"
          class="producthunt-badge-icon"
        />
        <div class="producthunt-badge-text">
          <span class="producthunt-badge-label">Product Hunt Daily #2</span>
          <span class="producthunt-badge-date">May 14th, 2025</span>
        </div>
      </div>
    </div>
    <div class="work-modal-body">
      <div ref="heroImageContainerRef" class="hero-image-container">
        <div ref="heroImageWrapperRef" class="hero-image-wrapper">
          <div ref="heroImageOverlayRef" class="hero-image-overlay"></div>
          <img
            src="@/assets/images/works/shadow/shadow_mockup.png"
            alt="Shadow Application Mockup"
            class="hero-image"
          />
        </div>
      </div>

      <!-- Project Overview -->
      <section class="content-section">
        <h2 class="section-title">📌 Project Overview | 프로젝트 개요</h2>
        <p class="section-text">
          Shadow는 AI 기반 실시간 회의 기록 및 분석 애플리케이션입니다. macOS에서 시스템 오디오를
          캡처하고, 자동으로 텍스트 변환 및 요약을 제공하는 데스크톱 앱입니다.
        </p>
        <p class="section-text">
          Flutter를 사용하여 개발을 진행했으며, GetX를 활용한 상태 관리와 네이티브 플러그인 연동을
          통해 고성능 앱을 구현했습니다.
        </p>
      </section>

      <!-- Tech Stack -->
      <section class="content-section">
        <h2 class="section-title">🛠️ Tech Stack Summary</h2>
        <TechStackGrid :stacks="techStacks" />
      </section>

      <!-- Logo Design -->
      <section class="content-section">
        <h2 class="section-title">🎨 Logo Design | 로고 디자인</h2>
        <p class="section-text">
          Shadow 로고는 다음과 같은 과정으로 발전하며 완성되었습니다. 원형의 물체가 그림자를 받은
          모양을 형상화한 후, 그림자만 따서 Shadow의 S자를 그려냈습니다.
        </p>
        <div class="logo-evolution">
          <div class="logo-timeline">
            <div class="logo-item">
              <img
                src="@/assets/images/works/shadow/logo1.png"
                alt="Shadow Logo 1"
                class="logo-image"
              />
              <p class="logo-label">물체에 그림자가 생긴 모습</p>
            </div>
            <div class="logo-arrow">→</div>
            <div class="logo-item">
              <img
                src="@/assets/images/works/shadow/logo2.png"
                alt="Shadow Logo 2"
                class="logo-image"
              />
              <p class="logo-label">그림자 모양을 형상화</p>
            </div>
            <div class="logo-arrow">→</div>
            <div class="logo-item">
              <img
                src="@/assets/images/works/shadow/logo3.png"
                alt="Shadow Logo 3"
                class="logo-image"
              />
              <p class="logo-label">Shadow의 S</p>
            </div>
            <div class="logo-arrow">→</div>
            <div class="logo-item">
              <img
                src="@/assets/images/works/shadow/logo4.png"
                alt="Shadow Logo 4"
                class="logo-image"
              />
              <p class="logo-label">Final</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Key Features -->
      <section class="content-section">
        <h2 class="section-title">🎨 My Key Contributions</h2>

        <!-- Feature 1 -->
        <div class="feature-block" ref="featureBlock1Ref">
          <div class="feature-content">
            <div class="feature-text" ref="featureText1Ref">
              <h3 class="feature-title">1. Zero-Latency Image Gallery Core</h3>
              <p class="feature-subtitle">이미지 갤러리 최적화 엔진</p>

              <h4 class="content-heading">📄 Problem</h4>
              <p class="content-text">
                고해상도 스크린샷 이미지를 PageView로 단순히 구현했을 때, 이미지를 넘기는
                순간(Swipe)마다 프레임 드랍(Jank)과 로딩 인디케이터가 발생하는 현상이 있었습니다.
              </p>

              <h4 class="content-heading">💡 Solution</h4>
              <ul class="solution-list">
                <li>
                  <strong>Predictive Preloading:</strong> 사용자의 네비게이션 방향을 예측하여
                  이미지를 우선적으로 메모리에 적재
                </li>
                <li>
                  <strong>Dual-Layer Caching:</strong> ImageSizeCache와 WidgetCache를 통해 레이아웃
                  시프트 방지 및 재렌더링 비용 제거
                </li>
                <li>
                  <strong>Smart Memory Management:</strong> 뷰포트에서 멀어진 이미지는 자동으로
                  캐시에서 해제하여 OOM 방지
                </li>
              </ul>
            </div>
          </div>
          <div class="feature-code-wrapper" ref="featureCode1Ref">
            <CodeBlock :code="cachingCode" language="dart" />
          </div>
          <div class="feature-demo-image">
            <!-- <img
              src="@/assets/images/works/shadow/gallery_interaction.gif"
              alt="Gallery Interaction Demo"
              class="demo-gif"
            /> -->
          </div>
        </div>

        <!-- Feature 2 -->
        <div class="feature-block" ref="featureBlock2Ref">
          <div class="feature-content">
            <div class="feature-text" ref="featureText2Ref">
              <h3 class="feature-title">2. Adaptive Responsive Layout Algorithm</h3>
              <p class="feature-subtitle">적응형 반응형 레이아웃 알고리즘</p>

              <h4 class="content-heading">📄 Problem</h4>
              <p class="content-text">
                데스크톱 앱이지만 윈도우 크기를 자유롭게 조절할 수 있습니다. 단순히 미디어 쿼리나
                하드코딩된 브레이크포인트로는 다양한 해상도와 창 크기에서 최적의 UX를 제공할 수
                없었습니다. 특히 좌우 사이드바, 메인 컨텐츠, 상세 패널이 있는 3단 레이아웃에서는 각
                영역이 동적으로 켜지고 꺼져야 했습니다.
              </p>

              <h4 class="content-heading">💡 Solution</h4>
              <ul class="solution-list">
                <li>
                  <strong>Viewport-Aware Calculation:</strong> 현재 뷰포트 너비에서 필수
                  영역(사이드바, 여백 등)을 뺀 나머지 공간을 계산하여 메인 영역과 상세 패널의 표시
                  여부 결정
                </li>
                <li>
                  <strong>Priority-Based Rendering:</strong> 공간이 부족할 때 사이드바 → 상세 패널 →
                  메인 영역 순으로 우선순위를 두어 핵심 기능이 항상 보이도록 설계
                </li>
                <li>
                  <strong>Threshold-Based Toggling:</strong> 단순 on/off가 아닌, 임계값 기반으로
                  부드럽게 레이아웃 전환 (예: 메인 영역 최소 600px 확보 시에만 상세 패널 표시)
                </li>
              </ul>
            </div>
          </div>
          <div class="feature-code-wrapper" ref="featureCode2Ref">
            <CodeBlock :code="adaptiveLayoutCode" language="dart" />
          </div>
          <div class="feature-demo-image">
            <!-- <img
              src="@/assets/images/works/shadow/multi_window_layout.gif"
              alt="Multi-Window Layout Demo"
              class="demo-gif"
            /> -->
          </div>
        </div>

        <!-- Feature 3 -->
        <div class="feature-block" ref="featureBlock3Ref">
          <div class="feature-content">
            <div class="feature-text" ref="featureText3Ref">
              <h3 class="feature-title">3. Desktop-Class Keyboard Interaction</h3>
              <p class="feature-subtitle">데스크톱급 키보드 인터랙션</p>

              <h4 class="content-heading">📄 Problem</h4>
              <p class="content-text">
                데스크톱 앱에서는 마우스 없이 키보드만으로 검색 결과를 선택하고 이동하고 싶어 하는
                니즈가 있습니다. 단순한 TextField는 방향키 입력을 커서 이동으로 소비해버리기 때문에,
                이를 가로채는 로직이 필요했습니다.
              </p>

              <h4 class="content-heading">💡 Solution</h4>
              <ul class="solution-list">
                <li>
                  <strong>Event Interception:</strong> FocusNode의 onKeyEvent 단계에서 키 입력을
                  먼저 검사하여 검색 컨트롤러로 라우팅
                </li>
                <li>
                  <strong>State Locking:</strong> 마우스 호버와 키보드 선택 간의 충돌을 방지하기
                  위한 상태 잠금 구현
                </li>
                <li>
                  <strong>Viewport Synchronization:</strong> 선택된 아이템이 항상 화면에 보이도록
                  스크롤 동기화
                </li>
              </ul>
            </div>
          </div>
          <div class="feature-code-wrapper" ref="featureCode3Ref">
            <CodeBlock :code="keyboardCode" language="dart" />
          </div>
        </div>

        <!-- Feature 4 -->
        <div class="feature-block" ref="featureBlock4Ref">
          <div class="feature-content">
            <div class="feature-text" ref="featureText4Ref">
              <h3 class="feature-title">4. Generic Search & Scroll Orchestration</h3>
              <p class="feature-subtitle">추상화된 검색 및 스크롤 로직</p>

              <h4 class="content-heading">📄 Problem</h4>
              <p class="content-text">
                '스킬(Skill)' 검색과 '스크린샷(Screenshot)' 검색은 데이터 구조도 다르고, UI
                형태(세로 리스트 vs 가로 리스트)도 다릅니다. 각각 별도의 로직으로 구현하면 코드
                중복이 발생합니다.
              </p>

              <h4 class="content-heading">💡 Solution</h4>
              <ul class="solution-list">
                <li>
                  <strong>Abstracted Initialization:</strong> 어떤 데이터 리스트와 스크롤 컨트롤러가
                  들어오든 필터링 함수만 주입하면 동작하도록 설계 (Strategy Pattern)
                </li>
                <li>
                  <strong>Viewport Aware Scrolling:</strong> 선택된 인덱스가 뷰포트를 벗어났는지
                  계산하여 필요한 만큼만 스크롤
                </li>
              </ul>
            </div>
          </div>
          <div class="feature-code-wrapper" ref="featureCode4Ref">
            <CodeBlock :code="searchCode" language="dart" />
          </div>
        </div>

        <!-- Feature 5 -->
        <div class="feature-block" ref="featureBlock5Ref">
          <div class="feature-content">
            <div class="feature-text" ref="featureText5Ref">
              <h3 class="feature-title">5. Real-Time Calendar Event Monitoring</h3>
              <p class="feature-subtitle">실시간 캘린더 이벤트 모니터링</p>

              <h4 class="content-heading">📄 Problem</h4>
              <p class="content-text">
                사용자가 미팅을 시작할 때, 해당 미팅이 Google Calendar 이벤트와 연결되어야 참석자
                정보, 제목, 시간 등이 자동으로 채워집니다. 또한 앞으로 다가올 이벤트(upcoming
                event)를 미리 캐싱하여 빠르게 표시해야 했습니다. API 호출 비용을 줄이고 실시간
                동기화가 필요했습니다.
              </p>

              <h4 class="content-heading">💡 Solution</h4>
              <ul class="solution-list">
                <li>
                  <strong>Time-Window Based Filtering:</strong> 리스닝 시작 시간 기준 ±10분 범위
                  내의 이벤트만 조회하여 불필요한 API 호출 최소화
                </li>
                <li>
                  <strong>Incremental Sync:</strong> Google Calendar API의 syncToken을 활용하여
                  변경된 이벤트만 동기화 (API 호출 80% 감소)
                </li>
                <li>
                  <strong>Multi-Criteria Matching:</strong> 미팅 링크, 참석자 수, 시간 차이 등 여러
                  조건을 만족하는 이벤트만 선택
                </li>
                <li>
                  <strong>Upcoming Event Pre-fetching:</strong> 현재 시간 기준 향후 24시간 내
                  이벤트를 백그라운드에서 미리 가져와 로컬 DB에 캐싱
                </li>
              </ul>
            </div>
          </div>
          <div class="feature-code-wrapper" ref="featureCode5Ref">
            <CodeBlock :code="calendarFetchCode" language="dart" />
            <div style="margin-top: 24px">
              <CodeBlock :code="calendarUpcomingCode" language="dart" />
            </div>
          </div>
          <div class="feature-demo-image">
            <!-- <img
              src="@/assets/images/works/shadow/upcoming_event_sync.png"
              alt="Upcoming Event Sync Demo"
              class="demo-gif"
            /> -->
          </div>
        </div>

        <!-- Feature 6 -->
        <div class="feature-block" ref="featureBlock6Ref">
          <div class="feature-content">
            <div class="feature-text" ref="featureText6Ref">
              <h3 class="feature-title">6. Event-Conversation Linking System</h3>
              <p class="feature-subtitle">이벤트-대화 연결 시스템</p>

              <h4 class="content-heading">📄 Problem</h4>
              <p class="content-text">
                사용자가 녹음을 시작하면, 해당 녹음이 어떤 캘린더 이벤트와 연결되는지 자동으로
                매칭해야 합니다. 단순히 시간만 비교하면 오류가 발생하므로, 미팅 URL, 참석자 수, 시간
                범위 등 여러 조건을 종합적으로 고려해야 했습니다.
              </p>

              <h4 class="content-heading">💡 Solution</h4>
              <ul class="solution-list">
                <li>
                  <strong>Meeting Guard Pattern:</strong> 이벤트가 실제 미팅인지 검증하는 다단계
                  필터링 (미팅 URL 존재 여부, 참석자 2명 이상, 취소되지 않음 등)
                </li>
                <li>
                  <strong>Time-Based Scoring:</strong> 녹음 시작 시간과 이벤트 시간의 차이를
                  점수화하여 가장 근접한 이벤트 선택
                </li>
                <li>
                  <strong>Automatic Association:</strong> 선택된 이벤트의 attendees를 로컬 DB에
                  자동으로 저장하여 대화 참석자 목록으로 활용
                </li>
              </ul>
            </div>
          </div>
          <div class="feature-code-wrapper" ref="featureCode6Ref">
            <CodeBlock :code="eventLinkingCode" language="dart" />
            <div style="margin-top: 24px">
              <CodeBlock :code="meetingGuardCode" language="dart" />
            </div>
          </div>
        </div>

        <!-- Feature 7 -->
        <div class="feature-block" ref="featureBlock7Ref">
          <div class="feature-content">
            <div class="feature-text" ref="featureText7Ref">
              <h3 class="feature-title">7. Complex Entity Management & Form UX</h3>
              <p class="feature-subtitle">복잡한 엔티티 관리 및 폼 UX</p>

              <h4 class="content-heading">📄 Problem</h4>
              <p class="content-text">
                화자 이름을 수정할 때, 단순히 텍스트만 바꾸는 것이 아니라 이메일/이름 매칭을 통해
                기존 연락처(Contact)와 자동으로 연결해야 했습니다. 특히 이미 존재하는 화자 이름으로
                변경 시, 두 화자의 발화 데이터를 병합(Merge)하고 마우스 없이 키보드만으로 검색,
                선택, 적용이 가능한 빠른 워크플로우가 필요했습니다.
              </p>

              <h4 class="content-heading">💡 Solution</h4>
              <ul class="solution-list">
                <li>
                  <strong>Intelligent Merging System:</strong> 변경하려는 이름이 이미 존재하거나
                  특정 이메일과 매칭될 경우, DB 트랜잭션을 통해 화자 아이디를 통합하고 관련
                  참조(Foreign Key)를 모두 업데이트
                </li>
                <li>
                  <strong>Keyboard-Centric Control:</strong> FocusNode와 KeyEvent를 정교하게
                  제어하여, 화살표 이동, 숫자 단축키(Cmd+1~9) 선택, 엔터 적용 등 마우스 없는 완전한
                  제어 구현
                </li>
                <li>
                  <strong>Context-Aware Searching:</strong> 본인(Me), 회의 참석자, 전체 연락처
                  순으로 우선순위를 부여한 검색 알고리즘 적용
                </li>
              </ul>
            </div>
          </div>
          <div class="feature-code-wrapper" ref="featureCode7Ref">
            <CodeBlock :code="assignSpeakerCode" language="dart" />
          </div>
          <div class="feature-demo-image">
            <!-- <img
              src="@/assets/images/works/shadow/assign_speaker_flow.gif"
              alt="Assign Speaker Workflow Demo"
              class="demo-gif"
            /> -->
          </div>
        </div>
      </section>

      <!-- Performance Metrics -->
      <section class="content-section">
        <h2 class="section-title">📈 Performance Impact</h2>
        <MetricsGrid :metrics="performanceMetrics" />
      </section>

      <!-- Key Takeaways -->
      <section class="content-section">
        <h2 class="section-title">🎯 Key Takeaways</h2>

        <div class="takeaway-block">
          <h3 class="takeaway-title">Performance & UX Engineering:</h3>
          <ul class="feature-list">
            <li>
              <strong>Zero-Latency Experience:</strong> Predictive Preloading을 통해 이미지 로딩
              시간을 100% 제거하여 끊김 없는 사용자 경험 제공
            </li>
            <li>
              <strong>Keyboard-First Design:</strong> 마우스 없이 모든 기능 조작 가능한 데스크톱급
              인터페이스 구현
            </li>
            <li>
              <strong>Memory Optimization:</strong> 스마트 캐싱 시스템으로 대용량 이미지 처리 시
              메모리 효율성 극대화
            </li>
          </ul>
        </div>

        <div class="takeaway-block">
          <h3 class="takeaway-title">System Integration & Architecture:</h3>
          <ul class="feature-list">
            <li>
              <strong>API Optimization:</strong> Google Calendar API 증분 동기화를 통해 API 호출
              횟수 80% 감소
            </li>
            <li>
              <strong>Event-Driven Architecture:</strong> 네이티브 플러그인과 Flutter 간 Event
              Stream 통신 설계
            </li>
            <li>
              <strong>Generic Patterns:</strong> 제네릭 패턴과 추상화를 통해 코드 재사용성 극대화 및
              유지보수성 향상
            </li>
          </ul>
        </div>

        <div class="takeaway-block">
          <h3 class="takeaway-title">Technical Skills Demonstrated:</h3>
          <ul class="feature-list">
            <li>
              <strong>Flutter Ecosystem:</strong> GetX (State Management), Native Plugins (Platform
              Channel), SQLite (Local DB)
            </li>
            <li>
              <strong>Algorithm Design:</strong> Adaptive Layout Algorithm, Time-Window Based Event
              Matching, Predictive Caching
            </li>
            <li>
              <strong>External API Integration:</strong> Google Calendar API, WebSocket, Real-time
              Sync
            </li>
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
import CodeBlock from '@/components/common/CodeBlock.vue'
import MetricsGrid from '@/components/common/MetricsGrid.vue'
import TechStackGrid from '@/components/common/TechStackGrid.vue'
import worksData from '@/data/works.json'

const workId = inject('workId', 1)

const workData = computed(() => {
  return worksData.find((work) => work.id === workId) || null
})

gsap.registerPlugin(ScrollTrigger)

const workModalHeaderRef = ref(null)
const heroImageContainerRef = ref(null)
const heroImageOverlayRef = ref(null)
const heroImageWrapperRef = ref(null)
const { isMobile, isTablet } = useResponsive()
const featureText1Ref = ref(null)
const featureText2Ref = ref(null)
const featureText3Ref = ref(null)
const featureText4Ref = ref(null)
const featureText5Ref = ref(null)
const featureText6Ref = ref(null)
const featureCode1Ref = ref(null)
const featureCode2Ref = ref(null)
const featureCode3Ref = ref(null)
const featureCode4Ref = ref(null)
const featureCode5Ref = ref(null)
const featureCode6Ref = ref(null)
const featureCode7Ref = ref(null)
const featureText7Ref = ref(null)
const featureBlock1Ref = ref(null)
const featureBlock2Ref = ref(null)
const featureBlock3Ref = ref(null)
const featureBlock4Ref = ref(null)
const featureBlock5Ref = ref(null)
const featureBlock6Ref = ref(null)
const featureBlock7Ref = ref(null)

// Code snippets
const cachingCode = `/// Smart Caching System with Predictive Preloading
void _preloadImagesForNavigation(int oldIndex, int newIndex) {
  // 1. Direction analysis
  final direction = newIndex > oldIndex ? 1 : -1;

  // 2. Priority queue construction
  final indicesToLoad = <int>[newIndex]; // Critical

  if (direction > 0 && newIndex < screenshots.length - 1) {
    indicesToLoad.add(newIndex + 1); // High priority
  } else if (direction < 0 && newIndex > 0) {
    indicesToLoad.add(newIndex - 1);
  }

  // 3. Async preloading (non-blocking UI)
  for (final index in indicesToLoad) {
    final path = screenshots[index]['screenshotFilePath'];
    if (path != null && !_imageCache.containsKey(path)) {
      _preloadImage(path);
    }
  }

  // 4. Memory management
  _cleanupCacheDelayed(indicesToLoad);
}`

const adaptiveLayoutCode = `/// Adaptive Layout Calculator
bool _shouldShowDetail(double screenWidth) {
  // Calculate available space after essential elements
  const sidebarWidth = 240.0;
  const padding = 32.0;
  const mainMinWidth = 600.0;  // Minimum for main content
  const detailMinWidth = 400.0; // Minimum for detail panel

  final availableWidth = screenWidth - sidebarWidth - padding;

  // Priority-based rendering
  if (availableWidth < mainMinWidth) {
    return false; // Not enough space even for main
  }

  if (availableWidth < mainMinWidth + detailMinWidth) {
    return false; // Main area would be too cramped
  }

  return true; // Enough space for both
}

@override
Widget build(BuildContext context) {
  return LayoutBuilder(
    builder: (context, constraints) {
      final showDetail = _shouldShowDetail(constraints.maxWidth);

      return Row(
        children: [
          Sidebar(width: 240),
          Expanded(
            flex: showDetail ? 3 : 1,
            child: MainContent(),
          ),
          if (showDetail)
            Expanded(
              flex: 2,
              child: DetailPanel(),
            ),
        ],
      );
    },
  );
}`

const keyboardCode = `/// Event Routing Architecture
KeyEventResult handleAskInputFieldKey(KeyEvent event, bool isDisabled) {
  if (event is! KeyDownEvent) return KeyEventResult.ignored;

  // Screenshot search mode
  if (isScreenshotSearchVisible.value && filteredScreenshotList.isNotEmpty) {
    if (event.logicalKey == LogicalKeyboardKey.arrowRight) {
      if (selectedScreenshotIndex.value < filteredScreenshotList.length - 1) {
        // State locking to prevent mouse hover conflicts
        _setKeyboardNavigationState(true);

        selectedScreenshotIndex.value++;
        scrollToSelectedScreenshotItem(); // Viewport sync
      }
      return KeyEventResult.handled; // Prevent cursor movement
    }

    else if (event.logicalKey == LogicalKeyboardKey.enter) {
      selectScreenshot(
        filteredScreenshotList[selectedScreenshotIndex.value],
        closeSearch: true
      );
      return KeyEventResult.handled;
    }
  }

  return KeyEventResult.ignored;
}`

const searchCode = `/// Generic Search Initialization with Strategy Pattern
void _initializeSearch({
  required RxBool isVisible,
  required RxList filteredList,
  required List<dynamic> sourceData,
  required Function(List<dynamic>) filterFunction,
}) {
  // 1. Data filtering
  try {
    if (query.isEmpty) {
      filteredList.assignAll(sourceData.cast<Map<String, dynamic>>());
    } else {
      final filtered = filterFunction(sourceData);
      filteredList.assignAll(filtered.cast<Map<String, dynamic>>());
    }
  } catch (e) {
    filteredList.clear();
  }

  // 2. Visibility state management
  if (!isVisible.value) {
    isVisible.value = true;
    selectedIndex.value = 0;
  }

  // 3. Post-frame scroll adjustment
  if (onScrollToSelected != null) {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      onScrollToSelected();
    });
  }
}`

const calendarFetchCode = `/// Time-Window Based Event Fetching with Incremental Sync
Future<void> fetchEventsForListening() async {
  if (!isConnected.value) return;

  // UTC time calculation (timezone-safe)
  final utcNow = DateTime.now().toUtc();
  final startTime = utcNow.subtract(const Duration(minutes: 10));
  final endTime = utcNow.add(const Duration(minutes: 10));

  // Duplicate request prevention
  final requestKey = 'listening:$startTime-$endTime';
  if (_shouldSkipRequest(requestKey)) return;

  try {
    // Incremental sync if syncToken exists
    if (localEventCount > 0 && _lastSyncToken.value.isNotEmpty) {
      await fetchChangedEvents(startTime: startTime, endTime: endTime);
      return;
    }

    // Full sync
    final response = await Api.getCalendarEvents(
      type: 'full',
      startTime: startTime.toIso8601String(),
      endTime: endTime.toIso8601String(),
      syncToken: _lastSyncToken.value,
    );

    // Extract and save syncToken
    if (response['syncToken'] != null) {
      _lastSyncToken.value = response['syncToken'].toString();
    }

    // Multi-criteria filtering
    final filteredEvents = newEvents
        .whereType<Map<String, dynamic>>()
        .where((event) => _passesMeetingGuards(event))
        .toList();
  } finally {
    _endRequest();
  }
}`

const calendarUpcomingCode = `/// Upcoming Event Pre-fetching
Future<void> fetchUpcomingEvents() async {
  final now = DateTime.now().toUtc();
  final endTime = now.add(const Duration(hours: 24));

  final response = await Api.getCalendarEvents(
    type: 'upcoming',
    startTime: now.toIso8601String(),
    endTime: endTime.toIso8601String(),
  );

  // Store in local DB for quick access
  final events = (response['items'] as List?)
      ?.whereType<Map<String, dynamic>>()
      .toList() ?? [];

  for (final event in events) {
    await CalendarEventDb.upsert(event);
  }
}`

const eventLinkingCode = `/// Event-Conversation Linking
Future<void> linkEventToConversation(String conversationId) async {
  final listeningStartTime = DateTime.now();

  // Get events within time window
  final events = await CalendarEventDb.getEventsInRange(
    startTime: listeningStartTime.subtract(const Duration(minutes: 10)),
    endTime: listeningStartTime.add(const Duration(minutes: 10)),
  );

  // Filter by meeting guards
  final validEvents = events.where(_passesMeetingGuards).toList();

  if (validEvents.isEmpty) return;

  // Score by time proximity
  final scoredEvents = validEvents.map((event) {
    final eventStart = DateTime.parse(event['start']['dateTime']);
    final timeDiff = eventStart.difference(listeningStartTime).abs();
    return {'event': event, 'score': timeDiff.inMinutes};
  }).toList();

  scoredEvents.sort((a, b) => a['score'].compareTo(b['score']));

  // Link best match
  final bestMatch = scoredEvents.first['event'];
  await ConversationDb.updateEventId(conversationId, bestMatch['id']);

  // Store attendees
  final attendees = bestMatch['attendees'] as List?;
  if (attendees != null) {
    for (final attendee in attendees) {
      await AttendeeDb.upsert(conversationId, attendee);
    }
  }
}`

const meetingGuardCode = `/// Meeting Guard Pattern
bool _passesMeetingGuards(Map<String, dynamic> event) {
  // Guard 1: Must have meeting URL
  final hangoutLink = event['hangoutLink'];
  if (hangoutLink == null || hangoutLink.isEmpty) return false;

  // Guard 2: Must have attendees (at least 2)
  final attendees = event['attendees'] as List?;
  if (attendees == null || attendees.length < 2) return false;

  // Guard 3: Must not be cancelled
  final status = event['status'];
  if (status == 'cancelled') return false;

  // Guard 4: Must have valid time
  final start = event['start'];
  if (start == null || start['dateTime'] == null) return false;

  return true;
}`

const assignSpeakerCode = `/// [Intelligent Speaker Merging & Update Logic]
/// 화자 정보 업데이트 시 발생할 수 있는 병합/충돌 시나리오를 처리하고
/// DB의 무결성을 유지하며 관련 데이터를 일괄 업데이트합니다.
Future<void> _updateExistingSpeaker(int spkrIdx, String newName) async {
  // 1. 이메일/이름으로 기존 화자 존재 여부 확인 (중복 체크)
  final existingAttendee = await AttendeeDb.findAttendeeByName(newName);
  if (existingAttendee != null) {
    // [Merge Case] 이미 존재하는 화자라면 데이터를 병합
    final targetSpkrIdx = existingAttendee['speakerIndex'];

    // 1. 기존 화자의 발화(Transcript) 소유권을 새 화자로 이전
    await SpeakerDb.modifyTranscriptSpeaker(
      oldSpkrIdx: spkrIdx,
      newSpkrIdx: targetSpkrIdx
    );

    // 2. Attendee 및 Contact 정보 통합
    await AttendeeDb.mergeInfo(oldSpkrIdx, targetSpkrIdx);

    // 3. 이전 화자 레코드 삭제 (Clean up)
    await SpeakerDb.deleteSpeaker(spkrIdx);
  } else {
    // [Update Case] 단순 정보 업데이트
    await SpeakerDb.updateSpeaker(
      spkrIdx: spkrIdx,
      spkrName: newName,
      spkrState: 'confirmed'
    );

    // 모든 참조된 텍스트(요약, 노트 등)에서도 이름 변경
    await _updateDataForAllReferences(oldName, newName);
  }
}

/// [Keyboard Navigation Handler]
/// 리스트 탐색과 단축키 선택을 처리하여 마우스 없는 경험 제공
void _handleArrowKeys(KeyDownEvent event) {
  if (event.logicalKey == LogicalKeyboardKey.arrowDown) {
    // 리스트 순환 탐색 (마지막 -> 처음)
    int nextIndex = selectedIndex.value + 1;
    if (nextIndex >= displayList.length) nextIndex = 0;

    _selectItemByIndex(nextIndex);
    _scrollToSelectedIndex(); // 뷰포트 동기화
  }
  // ... (ArrowUp, Enter, Cmd+Number 처리)
}`

const performanceMetrics = [
  { label: 'Image Loading Time', value: '0ms (Preloaded)' },
  { label: 'API Call Reduction', value: '80% (Incremental Sync)' },
  { label: 'Memory Efficiency', value: 'Smart Cache Cleanup' },
  { label: 'Keyboard Support', value: '100% Navigation' },
]

const techStacks = [
  {
    items: [
      'Flutter',
      'Dart',
      'GetX',
      'SQLite',
      'Native Plugins',
      'Google Calendar API',
      'WebSocket',
    ],
  },
]

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

const setupFeatureCodeAnimation = (codeRef, textRef) => {
  if (!codeRef || !textRef) return

  const modalOverlay = document.querySelector('.work-modal-overlay')
  if (!modalOverlay) return

  if (!codeRef.offsetParent && codeRef.offsetWidth === 0 && codeRef.offsetHeight === 0) {
    return
  }

  try {
    gsap.set(codeRef, {
      x: 100,
      opacity: 0,
    })

    // Use the same trigger as the text to sync animations
    const scrollTriggerConfig = {
      trigger: textRef,
      scroller: modalOverlay,
      start: 'top 80%',
      end: 'top 50%',
      toggleActions: 'play none none reverse',
      invalidateOnRefresh: true,
    }

    if (!scrollTriggerConfig.trigger || !scrollTriggerConfig.scroller) {
      return
    }

    gsap.to(codeRef, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: scrollTriggerConfig,
    })
  } catch (error) {
    console.warn('Feature code animation setup failed:', error)
  }
}

const setupFeatureBlockAnimation = (blockRef, index = 0) => {
  if (!blockRef) return

  const modalOverlay = document.querySelector('.work-modal-overlay')
  if (!modalOverlay) return

  if (!blockRef.offsetParent && blockRef.offsetWidth === 0 && blockRef.offsetHeight === 0) {
    return
  }

  try {
    gsap.set(blockRef, {
      y: 50,
      opacity: 0,
    })

    const scrollTriggerConfig = {
      trigger: blockRef,
      scroller: modalOverlay,
      start: 'top 90%',
      end: 'top 60%',
      toggleActions: 'play none none reverse',
      invalidateOnRefresh: true,
    }

    if (!scrollTriggerConfig.trigger || !scrollTriggerConfig.scroller) {
      return
    }

    gsap.to(blockRef, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      delay: index * 0.1,
      scrollTrigger: scrollTriggerConfig,
    })
  } catch (error) {
    console.warn('Feature block animation setup failed:', error)
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

onMounted(() => {
  // Hero image scroll animation
  if (heroImageContainerRef.value && heroImageWrapperRef.value) {
    const modalOverlay = document.querySelector('.work-modal-overlay')

    if (modalOverlay && heroImageContainerRef.value) {
      try {
        const scrollTriggerConfig1 = {
          trigger: heroImageContainerRef.value,
          scroller: modalOverlay,
          start: 'top top',
          end: 'bottom center',
          scrub: 0.1,
        }

        if (scrollTriggerConfig1.trigger && scrollTriggerConfig1.scroller) {
          gsap.to(heroImageWrapperRef.value, {
            scale: isTablet.value ? (isMobile.value ? 0.7 : 0.7) : 0.9,
            bottom: isTablet.value ? (isMobile.value ? '-5%' : '0%') : '-8%',
            opacity: 1,
            scrollTrigger: scrollTriggerConfig1,
          })
        }

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

        const scrollTriggerConfig3 = {
          trigger: heroImageContainerRef.value,
          scroller: modalOverlay,
          start: 'top 0px',
          end: '30px',
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

  // Feature blocks animation (카드 컨테이너)
  nextTick(() => {
    nextTick(() => {
      const modalOverlay = document.querySelector('.work-modal-overlay')
      if (!modalOverlay) return

      const featureBlocks = [
        featureBlock1Ref.value,
        featureBlock2Ref.value,
        featureBlock3Ref.value,
        featureBlock4Ref.value,
        featureBlock5Ref.value,
        featureBlock6Ref.value,
        featureBlock7Ref.value,
      ]

      featureBlocks.forEach((blockRef, index) => {
        if (!blockRef) return

        if (blockRef.offsetParent === null) {
          setTimeout(() => {
            setupFeatureBlockAnimation(blockRef, index)
          }, 100)
          return
        }

        setupFeatureBlockAnimation(blockRef, index)
      })
    })
  })

  // Feature texts animation
  nextTick(() => {
    nextTick(() => {
      const modalOverlay = document.querySelector('.work-modal-overlay')
      if (!modalOverlay) return

      const featureTexts = [
        featureText1Ref.value,
        featureText2Ref.value,
        featureText3Ref.value,
        featureText4Ref.value,
        featureText5Ref.value,
        featureText6Ref.value,
        featureText7Ref.value,
      ]

      const featureCodes = [
        featureCode1Ref.value,
        featureCode2Ref.value,
        featureCode3Ref.value,
        featureCode4Ref.value,
        featureCode5Ref.value,
        featureCode6Ref.value,
        featureCode7Ref.value,
      ]

      featureTexts.forEach((textRef, index) => {
        if (!textRef) return

        const codeRef = featureCodes[index]

        if (textRef.offsetParent === null) {
          setTimeout(() => {
            setupFeatureTextAnimation(textRef)
            if (codeRef) {
              setupFeatureCodeAnimation(codeRef, textRef)
            }
          }, 100)
          return
        }

        setupFeatureTextAnimation(textRef)
        if (codeRef) {
          setupFeatureCodeAnimation(codeRef, textRef)
        }
      })
    })
  })

  // Blocks animation
  nextTick(() => {
    nextTick(() => {
      const modalOverlay = document.querySelector('.work-modal-overlay')
      if (!modalOverlay) return

      const blocks = document.querySelectorAll('.takeaway-block, .tech-stack-grid')

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
  background-color: rgb(var(--gray--0));
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

.producthunt-badge {
  margin-top: 30px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 12px;
  pointer-events: none;
}

.producthunt-badge-icon {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.producthunt-badge-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.producthunt-badge-label {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--white--1));
  letter-spacing: -0.01em;
}

.producthunt-badge-date {
  font-size: var(--body--2--normal);
  font-weight: var(--font-weight--regular);
  color: rgb(var(--white--3));
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
}

.subsection-title {
  font-size: var(--title--3);
  font-weight: var(--font-weight--semibold);
  color: rgb(var(--white--1));
  margin: 0 0 16px 0;
}

/* Logo Evolution */
.logo-evolution {
  margin-top: 40px;
}

.logo-timeline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
  flex-wrap: wrap;
}

.logo-item {
  display: flex;
  width: 180px;
  height: 180px;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  flex: 0 0 auto;
  position: relative;
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 20px;
  background-color: rgb(var(--white--2));
  padding: 20px;
  transition: transform 0.3s ease;
  position: relative;
}

.logo-image:hover {
  transform: scale(1.05);
}

.logo-arrow {
  font-size: 2rem;
  color: rgb(var(--white--3));
  font-weight: var(--font-weight--bold);
  flex-shrink: 0;
  margin: 0 10px;
}

.logo-label {
  font-size: var(--body--2--normal);
  font-weight: var(--font-weight--medium);
  color: rgb(var(--white--2));
  text-align: center;
  margin: 0;
}

/* Feature Blocks */
.feature-block {
  margin-bottom: 80px;
  background-color: rgba(255, 255, 255, 0.02);
  border-radius: 24px;
  padding: 48px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.feature-content {
  margin-bottom: 30px;
}

.feature-text {
  display: flex;
  flex-direction: column;
}

.feature-title {
  font-size: var(--title--2);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--white--1));
  margin: 0 0 8px 0;
}

.feature-subtitle {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  color: rgb(var(--white--3));
  margin: 0 0 30px 0;
}

.content-heading {
  font-size: var(--body--1--medium);
  font-weight: var(--font-weight--semibold);
  color: rgb(var(--white--1));
  margin: 24px 0 12px 0;
}

.content-text {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  line-height: 1.7;
  color: rgb(var(--white--2));
  margin: 0 0 16px 0;
}

.solution-list {
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
}

.solution-list li {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  line-height: 1.7;
  color: rgb(var(--white--2));
  margin-bottom: 16px;
  padding-left: 24px;
  position: relative;
}

.solution-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: rgb(var(--primary--green));
  font-weight: var(--font-weight--bold);
  font-size: 1.2em;
}

.feature-code-wrapper {
  width: 100%;
  margin-top: 30px;
}

/* Feature List */
.feature-list {
  list-style: none;
  padding: 0;
  margin: 0 0 15px 0;
}

.feature-list li {
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
  line-height: 1.7;
  color: rgb(var(--white--2));
  margin-bottom: 12px;
  padding-left: 24px;
  position: relative;
}

.feature-list li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: rgb(var(--primary--green));
  font-weight: var(--font-weight--bold);
}

/* Takeaway Blocks */
.takeaway-block {
  margin-bottom: 40px;
  background-color: rgba(255, 255, 255, 0.02);
  border-radius: 24px;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.takeaway-title {
  font-size: var(--body--1--medium);
  font-weight: var(--font-weight--bold);
  color: rgb(var(--white--1));
  margin: 0 0 16px 0;
}

/* Tablet: --tablet */
@media (--tablet) {
  .work-modal-title {
    font-size: var(--hero--2);
  }

  .content-section {
    padding: 40px 30px;
  }

  .section-title {
    font-size: var(--title--2);
  }

  .feature-block {
    margin-bottom: 60px;
  }

  .logo-timeline {
    gap: 15px;
  }

  .logo-image {
    max-width: 140px;
    padding: 15px;
  }

  .logo-arrow {
    font-size: 1.5rem;
    margin: 0 5px;
  }
}

/* Mobile: --mobile */
@media (--mobile) {
  .work-modal-title {
    font-size: var(--hero--3);
  }

  .work-modal-subtitle {
    font-size: var(--body--2--normal);
  }

  .content-section {
    padding: 30px 20px;
  }

  .section-title {
    font-size: var(--title--3);
  }

  .feature-block {
    margin-bottom: 40px;
  }

  .logo-timeline {
    gap: 10px;
  }

  .logo-image {
    max-width: 100px;
    padding: 12px;
  }

  .logo-arrow {
    font-size: 1.2rem;
    margin: 0 3px;
  }

  .logo-label {
    font-size: var(--caption--1);
  }

  .demo-gif {
    margin-top: 24px;
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
}

@media (--tablet) {
  .demo-gif {
    margin-top: 30px;
  }
}

@media (--desktop) {
  .demo-gif {
    margin-top: 40px;
  }
}
</style>
