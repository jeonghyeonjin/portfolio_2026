<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      ref="searchContainerRef"
      class="work-search-overlay"
      @click.self="closeSearch"
    >
      <div ref="searchBoxRef" class="work-search-container">
        <div class="work-search-header">
          <Transition name="issue-marker">
            <div
              v-if="!isFixed('search-debounce') && isMarkersReady"
              class="issue-marker-wrapper"
              style="top: 10px; left: 10px"
              @click.stop="openIssue('search-debounce')"
            >
              <IssueMarker />
            </div>
          </Transition>
          <BaseInput
            ref="searchInputRef"
            v-model="searchQuery"
            type="text"
            placeholder="Works 검색..."
            @keydown.esc="closeSearch"
            @keydown.enter="handleEnter"
            @keydown.down.prevent="navigateDown"
            @keydown.up.prevent="navigateUp"
          />
          <IconButton size="medium" aria-label="닫기" @click="closeSearch">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </IconButton>
        </div>
        <div class="work-search-results">
          <div
            v-for="(work, index) in filteredWorks"
            :key="work.id"
            :ref="(el) => setResultRef(el, index)"
            class="work-search-result"
            :class="{ active: selectedIndex === index }"
            @click="selectWork(work.id)"
            @mouseenter="selectedIndex = index"
          >
            <h3 class="work-search-result-title">{{ work.title }}</h3>
            <p class="work-search-result-description">{{ work.description }}</p>
          </div>
          <div v-if="filteredWorks.length === 0" class="work-search-empty">
            검색 결과가 없습니다.
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { Teleport } from 'vue'
import IconButton from '@/components/common/IconButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import IssueMarker from '@/components/broken/IssueMarker.vue'
import { useBrokenPortfolio } from '@/composables/useBrokenPortfolio'

const { isFixed, openIssue, isMarkersReady } = useBrokenPortfolio()

const props = defineProps({
  works: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['open', 'close', 'select'])

const isOpen = ref(false)
const searchQuery = ref('')
const debouncedQuery = ref('')
const selectedIndex = ref(0)
const searchContainerRef = ref(null)
const searchBoxRef = ref(null)
const searchInputRef = ref(null)
const resultRefs = ref([])

let debounceTimer = null

// Debounce 함수 (이슈 수정 시 활성화)
const debounceSearch = (value) => {
  if (isFixed('search-debounce')) {
    // 이슈가 수정되면 debounce 적용
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }
    debounceTimer = setTimeout(() => {
      debouncedQuery.value = value
    }, 300)
  } else {
    // 이슈가 수정되지 않으면 즉시 적용 (성능 저하)
    debouncedQuery.value = value
  }
}

// searchQuery가 변경될 때마다 debounce 처리
watch(searchQuery, (newValue) => {
  debounceSearch(newValue)
})

// 검색 결과 필터링
const filteredWorks = computed(() => {
  if (!debouncedQuery.value.trim()) {
    return props.works
  }
  const query = debouncedQuery.value.toLowerCase()
  return props.works.filter(
    (work) =>
      work.title.toLowerCase().includes(query) ||
      work.description.toLowerCase().includes(query)
  )
})

// 결과 ref 설정
const setResultRef = (el, index) => {
  if (el) {
    resultRefs.value[index] = el
  }
}

// 검색창 열기
const openSearch = () => {
  isOpen.value = true
  searchQuery.value = ''
  selectedIndex.value = 0
  emit('open')
  nextTick(() => {
    if (searchInputRef.value) {
      searchInputRef.value.focus()
    }
  })
}

// 검색창 닫기
const closeSearch = () => {
  isOpen.value = false
  searchQuery.value = ''
  selectedIndex.value = 0
  emit('close')
}

// Work 선택
const selectWork = (workId) => {
  emit('select', workId)
  // 검색창 닫기는 부모 컴포넌트에서 처리 (원형 애니메이션을 위해)
}

// Enter 키 처리
const handleEnter = () => {
  if (filteredWorks.value.length > 0 && selectedIndex.value >= 0) {
    const selectedWork = filteredWorks.value[selectedIndex.value]
    if (selectedWork) {
      selectWork(selectedWork.id)
    }
  }
}

// 아래 화살표 키
const navigateDown = () => {
  if (selectedIndex.value < filteredWorks.value.length - 1) {
    selectedIndex.value++
    scrollToSelected()
  }
}

// 위 화살표 키
const navigateUp = () => {
  if (selectedIndex.value > 0) {
    selectedIndex.value--
    scrollToSelected()
  }
}

// 선택된 항목으로 스크롤
const scrollToSelected = () => {
  nextTick(() => {
    const selectedEl = resultRefs.value[selectedIndex.value]
    if (selectedEl) {
      selectedEl.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  })
}

// 검색어 변경 시 선택 인덱스 리셋
watch(debouncedQuery, () => {
  selectedIndex.value = 0
})

// 검색창 열릴 때 초기화
watch(isOpen, (newValue) => {
  if (newValue) {
    debouncedQuery.value = ''
  } else {
    // 검색창 닫힐 때 타이머 정리
    if (debounceTimer) {
      clearTimeout(debounceTimer)
      debounceTimer = null
    }
  }
})

// '/' 키로 검색창 열기
const handleKeydown = (event) => {
  // input이나 textarea에 포커스가 있으면 무시
  if (
    event.target.tagName === 'INPUT' ||
    event.target.tagName === 'TEXTAREA' ||
    event.target.isContentEditable
  ) {
    return
  }

  if (event.key === '/' && !isOpen.value) {
    event.preventDefault()
    openSearch()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  // 타이머 정리
  if (debounceTimer) {
    clearTimeout(debounceTimer)
    debounceTimer = null
  }
})

// 외부에서 열 수 있도록 expose
defineExpose({
  open: openSearch,
  close: closeSearch,
  getContainer: () => searchBoxRef.value || searchContainerRef.value,
})
</script>

<style scoped>
@import '@/assets/styles/breakpoints.css';
@import '@/assets/styles/issue-marker.css';

.work-search-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 9997;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 120px;
  pointer-events: auto;
}

.work-search-container {
  width: 100%;
  max-width: 600px;
  background-color: rgb(var(--white--1));
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
}

.work-search-header {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  border-bottom: 1px solid rgba(var(--gray--5s), 0.2);
}



.work-search-results {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.work-search-result {
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.work-search-result:hover,
.work-search-result.active {
  background-color: rgba(var(--gray--5s), 0.1);
}

.work-search-result-title {
  font-family: 'Wanted Sans Variable', 'Wanted Sans', sans-serif;
  font-size: var(--headline--1);
  font-weight: var(--font-weight--medium);
  font-weight: 500;
  color: rgb(var(--gray--1));
  margin: 0 0 8px 0;
}

.work-search-result-description {
  font-size: var(--body--2--normal);
  font-weight: var(--font-weight--regular);
  color: rgba(var(--gray--5s), 0.8);
  margin: 0;
  line-height: 1.5;
}

.work-search-empty {
  padding: 40px 20px;
  text-align: center;
  color: rgba(var(--gray--5s), 0.6);
  font-size: var(--body--1--normal);
  font-weight: var(--font-weight--regular);
}

/* Tablet: --tablet */
@media (--tablet) {
  .work-search-overlay {
    padding-top: 100px;
  }

  .work-search-container {
    max-width: 500px;
  }
}

/* Mobile: --mobile */
@media (--mobile) {
  .work-search-overlay {
    padding-top: 80px;
    padding-left: 20px;
    padding-right: 20px;
  }

  .work-search-container {
    max-width: 100%;
    max-height: 80vh;
  }

  .work-search-header {
    padding: 16px;
  }
}
</style>

