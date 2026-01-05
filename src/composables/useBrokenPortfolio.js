import { ref, computed } from 'vue'
import issuesConfig from '@/data/issuesConfig.json'
import { useResponsive } from '@/composables/useResponsive'

const STORAGE_KEY = 'broken-portfolio-fixed-issues'

const fixedIssues = ref([])
const activeIssue = ref(null)
const isMarkersReady = ref(false)

// 모바일에서 제외할 검색 관련 이슈 ID
const SEARCH_RELATED_ISSUES = ['search-debounce', 'search-keyboard-nav', 'search-shortcut']

// 로컬 스토리지에서 로드
const loadFromStorage = () => {
  if (typeof window === 'undefined') return

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) {
        fixedIssues.value = parsed
      }
    }
  } catch (error) {
    console.error('Failed to load from localStorage:', error)
  }
}

// 로컬 스토리지에 저장
const saveToStorage = () => {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fixedIssues.value))
  } catch (error) {
    console.error('Failed to save to localStorage:', error)
  }
}

// 초기 로드
if (typeof window !== 'undefined') {
  loadFromStorage()

  // 페이지 로딩 완료 후 딜레이를 두고 마커 표시
  const initMarkers = () => {
    const delay = 1000

    if (document.readyState === 'complete') {
      setTimeout(() => {
        isMarkersReady.value = true
      }, delay)
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => {
          isMarkersReady.value = true
        }, delay)
      })
    }
  }

  initMarkers()
}

// 외부 설정 파일에서 이슈 데이터 가져오기
const issues = issuesConfig

export function useBrokenPortfolio() {
  const { isMobile } = useResponsive()

  const isFixed = (id) => fixedIssues.value.includes(id)

  // 모바일에서는 검색 관련 이슈 제외
  const totalIssues = computed(() => {
    const allIssueKeys = Object.keys(issues)
    if (isMobile.value) {
      return allIssueKeys.filter((id) => !SEARCH_RELATED_ISSUES.includes(id)).length
    }
    return allIssueKeys.length
  })

  // 모바일에서는 검색 관련 이슈를 제외한 progress 계산
  const progress = computed(() => {
    if (isMobile.value) {
      return fixedIssues.value.filter((id) => !SEARCH_RELATED_ISSUES.includes(id)).length
    }
    return fixedIssues.value.length
  })

  const allFixed = computed(() => progress.value === totalIssues.value)

  const fixIssue = (id) => {
    if (!isFixed(id)) {
      fixedIssues.value.push(id)
      saveToStorage()
    }
    activeIssue.value = null
  }

  const resetProgress = () => {
    fixedIssues.value = []
    activeIssue.value = null
    saveToStorage()
  }

  const openIssue = (id) => {
    if (!isFixed(id)) {
      activeIssue.value = id
    }
  }

  const closeIssue = () => {
    activeIssue.value = null
  }

  const getIssue = (id) => issues[id]

  return {
    issues,
    fixedIssues,
    activeIssue,
    isFixed,
    totalIssues,
    progress,
    allFixed,
    fixIssue,
    openIssue,
    closeIssue,
    getIssue,
    resetProgress,
    isMarkersReady,
  }
}
