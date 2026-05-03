<script setup lang="ts">
import { ref, onMounted } from 'vue'

const count = ref(0)
const checkedIn = ref(false)
const showToast = ref(false)
const loading = ref(true)
const error = ref(false)

onMounted(() => {
  checkedIn.value = localStorage.getItem('checkin_done') === 'true'
  fetchCount()
})

async function fetchCount() {
  try {
    const res = await fetch('/api/checkin')
    if (!res.ok) throw new Error('fetch failed')
    const data = await res.json()
    count.value = data.count
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

async function handleCheckin() {
  if (checkedIn.value) return
  checkedIn.value = true
  localStorage.setItem('checkin_done', 'true')
  try {
    const res = await fetch('/api/checkin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'checkin' }),
    })
    if (res.ok) {
      const data = await res.json()
      count.value = data.count
    }
  } catch {
    // 乐观更新：后端失败也不撤回本地计数
  }
  showToast.value = true
  setTimeout(() => { showToast.value = false }, 2000)
}
</script>

<template>
  <div class="checkin-section">
    <div class="checkin-divider">
      <span class="divider-line" />
      <span class="divider-text">从前书院</span>
      <span class="divider-line" />
    </div>
    <div class="checkin-content">
      <button
        class="checkin-btn"
        :class="{ 'checked-in': checkedIn }"
        :disabled="checkedIn || loading"
        @click="handleCheckin"
      >
        <svg class="checkin-icon" viewBox="0 0 24 24" width="18" height="18">
          <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
        </svg>
        {{ checkedIn ? '已打卡' : '参观打卡' }}
      </button>
      <span class="checkin-count">
        <span v-if="error" class="count-number count-error">--</span>
        <span v-else class="count-number">{{ loading ? '--' : count.toLocaleString() }}</span>
        人
      </span>
    </div>
    <div class="checkin-toast" :class="{ 'toast-visible': showToast }">
      打卡成功 ✓
    </div>
  </div>
</template>

<style scoped>
.checkin-section {
  padding: 3rem 1rem 2rem;
  background: #fdfbf7;
  position: relative;
}

.checkin-divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 300px;
  margin: 0 auto 1.5rem;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, transparent, #1a1a1a40, transparent);
}

.divider-text {
  font-size: 0.75rem;
  color: #999;
  letter-spacing: 4px;
  white-space: nowrap;
}

.checkin-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.checkin-btn {
  font-family: inherit;
  padding: 0.55rem 1.6rem;
  font-size: 0.95rem;
  letter-spacing: 3px;
  border: 1px solid #1a1a1a;
  background: transparent;
  color: #1a1a1a;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.checkin-btn:hover:not(:disabled) {
  background: #1a1a1a;
  color: #fbda41;
  border-color: #1a1a1a;
}

.checkin-btn:active:not(:disabled) {
  transform: scale(0.96);
}

.checkin-btn.checked-in {
  border-color: #ccc;
  color: #999;
  cursor: default;
  background: #f5f5f0;
}

.checkin-icon {
  flex-shrink: 0;
}

.checkin-count {
  font-size: 0.95rem;
  color: #666;
  letter-spacing: 2px;
}

.count-number {
  font-weight: 700;
  font-size: 1.4rem;
  color: #1a1a1a;
  font-variant-numeric: tabular-nums;
}

.count-error {
  color: #999;
}

.checkin-toast {
  position: fixed;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(15, 23, 25, 0.92);
  color: #fbda41;
  padding: 0.6rem 1.8rem;
  border-radius: 6px;
  font-size: 0.9rem;
  letter-spacing: 2px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.35s ease;
  z-index: 9999;
  border: 1px solid rgba(251, 218, 65, 0.25);
}

.checkin-toast.toast-visible {
  opacity: 1;
}

@media (max-width: 768px) {
  .checkin-section {
    padding: 2rem 1rem 1.5rem;
  }

  .checkin-btn {
    font-size: 0.85rem;
    padding: 0.5rem 1.3rem;
  }

  .count-number {
    font-size: 1.2rem;
  }
}
</style>
