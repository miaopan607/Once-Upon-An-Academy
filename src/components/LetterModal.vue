<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, inject, type Ref } from 'vue'

const STORAGE_KEY = 'letter_modal_dismissed'
const THANK_YOU_STORAGE_KEY = 'thank_you_letter_viewed'
type LetterType = 'invitation' | 'thank-you'
const INITIAL_REVEAL = 45
const BUTTON_AREA = 80
const FLIP_DURATION = 300

const isVisible = ref(false)
const isRevealed = ref(false)
const isFlipping = ref(false)
const flipStage = ref<'idle' | 'out' | 'in-start' | 'in'>('idle')
const currentLetter = ref<LetterType>('invitation')
const hasViewedThankYouLetter = ref(!!localStorage.getItem(THANK_YOU_STORAGE_KEY))
const shouldShowSwitchButton = computed(() => hasViewedThankYouLetter.value || currentLetter.value === 'thank-you')

const wrapperRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const coverRef = ref<HTMLElement | null>(null)
const modalScrollRef = ref<HTMLElement | null>(null)

const isMusicPlaying = inject<Ref<boolean>>('isMusicPlaying', ref(false))
const toggleMusic = inject<() => Promise<void>>('toggleMusic', async () => {})

let contentHeight = 0
let flipOutTimer: ReturnType<typeof window.setTimeout> | null = null
let flipDoneTimer: ReturnType<typeof window.setTimeout> | null = null
let flipFrame: number | null = null
let flipRunId = 0
let resizeFrame: number | null = null

if (!localStorage.getItem(STORAGE_KEY)) {
  isVisible.value = true
}

function measureContent() {
  const wrapper = wrapperRef.value
  const content = contentRef.value
  if (!wrapper || !content) return

  const origHeight = wrapper.style.height
  const origOverflow = wrapper.style.overflow
  const origTransition = wrapper.style.transition
  wrapper.style.height = 'auto'
  wrapper.style.overflow = 'visible'
  wrapper.style.transition = 'none'
  contentHeight = content.offsetHeight
  wrapper.style.height = origHeight
  wrapper.style.overflow = origOverflow
  wrapper.style.transition = origTransition
}

function initLayout() {
  const wrapper = wrapperRef.value
  const cover = coverRef.value
  if (!wrapper || !cover) return

  measureContent()

  const initialHeight = INITIAL_REVEAL + BUTTON_AREA
  wrapper.style.height = initialHeight + 'px'

  cover.style.top = INITIAL_REVEAL + 'px'
  cover.style.height = (contentHeight - INITIAL_REVEAL + 120) + 'px'
}

function applyCachedRevealedLayout() {
  const wrapper = wrapperRef.value
  const cover = coverRef.value
  if (!wrapper || !cover) return

  wrapper.style.height = contentHeight + 'px'
  cover.style.top = contentHeight + 'px'
}

function applyRevealedLayout() {
  measureContent()
  applyCachedRevealedLayout()
}

function clearFlipTimers() {
  flipRunId += 1
  if (flipOutTimer) {
    window.clearTimeout(flipOutTimer)
    flipOutTimer = null
  }
  if (flipDoneTimer) {
    window.clearTimeout(flipDoneTimer)
    flipDoneTimer = null
  }
  if (flipFrame !== null) {
    window.cancelAnimationFrame(flipFrame)
    flipFrame = null
  }
  isFlipping.value = false
  flipStage.value = 'idle'
}

function cancelResizeFrame() {
  if (resizeFrame !== null) {
    window.cancelAnimationFrame(resizeFrame)
    resizeFrame = null
  }
}

function reveal() {
  if (isRevealed.value) return
  isRevealed.value = true
  applyCachedRevealedLayout()
}

function markCurrentLetterViewed() {
  localStorage.setItem(currentLetter.value === 'invitation' ? STORAGE_KEY : THANK_YOU_STORAGE_KEY, '1')
}

function markThankYouViewed() {
  localStorage.setItem(THANK_YOU_STORAGE_KEY, '1')
  hasViewedThankYouLetter.value = true
}

function closeModal() {
  isVisible.value = false
  markCurrentLetterViewed()
  clearFlipTimers()
  cancelResizeFrame()
  unlockScroll()
  window.removeEventListener('resize', handleResize)
}

function handleResize() {
  cancelResizeFrame()
  resizeFrame = window.requestAnimationFrame(() => {
    resizeFrame = null

    if (!isRevealed.value) {
      initLayout()
      return
    }

    applyRevealedLayout()
  })
}

let savedScrollY = 0

function lockScroll() {
  savedScrollY = window.scrollY
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
}

function unlockScroll() {
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
}

async function initModal() {
  lockScroll()

  await nextTick()
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      initLayout()
      wrapperRef.value?.classList.add('ready')
    })
  })

  window.addEventListener('resize', handleResize)
}

async function openModal(letter: LetterType) {
  currentLetter.value = letter
  if (letter === 'thank-you') {
    markThankYouViewed()
  }

  if (isVisible.value) {
    isRevealed.value = false
    await nextTick()
    initLayout()
    return
  }

  isVisible.value = true
  isRevealed.value = false
  await initModal()
}

async function show() {
  await openModal('invitation')
}

async function showThankYou() {
  await openModal('thank-you')
}

async function showThankYouIfUnviewed() {
  if (!localStorage.getItem(THANK_YOU_STORAGE_KEY)) {
    await showThankYou()
  }
}

async function switchLetter(letter: LetterType) {
  if (letter === currentLetter.value || isFlipping.value) return

  clearFlipTimers()
  const runId = flipRunId
  isFlipping.value = true
  flipStage.value = 'out'

  flipOutTimer = window.setTimeout(async () => {
    if (runId !== flipRunId) return

    flipOutTimer = null
    currentLetter.value = letter
    isRevealed.value = true
    if (letter === 'thank-you') {
      markThankYouViewed()
    }

    await nextTick()
    if (runId !== flipRunId) return

    applyRevealedLayout()
    modalScrollRef.value?.scrollTo({ top: 0, behavior: 'auto' })
    flipStage.value = 'in-start'

    await nextTick()
    if (runId !== flipRunId) return

    wrapperRef.value?.getBoundingClientRect()

    flipFrame = window.requestAnimationFrame(() => {
      if (runId !== flipRunId) return

      flipFrame = null
      flipStage.value = 'in'
      flipDoneTimer = window.setTimeout(() => {
        if (runId !== flipRunId) return

        flipDoneTimer = null
        flipStage.value = 'idle'
        isFlipping.value = false
      }, FLIP_DURATION)
    })
  }, FLIP_DURATION)
}

onMounted(async () => {
  if (isVisible.value) {
    await initModal()
  }
})

onUnmounted(() => {
  clearFlipTimers()
  cancelResizeFrame()
  unlockScroll()
  window.removeEventListener('resize', handleResize)
})

defineExpose({ show, showThankYou, showThankYouIfUnviewed })
</script>

<template>
  <Teleport to="body">
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-actions">
        <button class="modal-action-btn modal-close-btn" @click="closeModal" aria-label="关闭">
          <svg viewBox="0 0 24 24" width="22" height="22">
            <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
          </svg>
        </button>
        <button
          v-if="shouldShowSwitchButton"
          class="modal-action-btn modal-switch-btn"
          :aria-label="currentLetter === 'invitation' ? '查看时空感谢信' : '查看时空旅行邀请函'"
          :disabled="isFlipping"
          @click="switchLetter(currentLetter === 'invitation' ? 'thank-you' : 'invitation')"
        >
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-4H6V9h12v3z" fill="currentColor"/>
          </svg>
        </button>
        <button
          class="modal-action-btn modal-music-btn"
          :class="{ 'is-playing': isMusicPlaying }"
          :aria-label="isMusicPlaying ? '暂停背景音乐' : '播放背景音乐'"
          @click="toggleMusic"
        >
          <span class="modal-music-btn__icon" aria-hidden="true">
            <svg viewBox="0 0 1024 1024" width="18" height="18">
              <path
                d="M875.008 295.424a34.133333 34.133333 0 1 0-58.197333 35.669333c35.328 57.514667 53.930667 123.562667 53.930666 191.488 0 201.898667-164.352 366.250667-366.250666 366.250667S138.24 724.48 138.24 522.581333 302.592 156.330667 504.490667 156.330667c18.773333 0 34.133333-15.36 34.133333-34.133334s-15.36-34.133333-34.133333-34.133333C264.874667 88.064 69.973333 282.965333 69.973333 522.581333s194.901333 434.517333 434.517334 434.517334 434.517333-194.901333 434.517333-434.517334c0.170667-80.384-22.016-159.061333-64-227.157333z"
              />
              <path
                d="M501.248 389.973333c-77.653333 0-140.8 63.146667-140.8 140.8s63.146667 140.8 140.8 140.8 140.8-63.146667 140.8-140.8V224.256c0-19.456 15.872-35.328 35.328-35.328 19.456 0 35.328 15.872 35.328 35.328 0 18.773333 15.36 34.133333 34.133333 34.133333s34.133333-15.36 34.133334-34.133333c0-57.173333-46.421333-103.594667-103.594667-103.594667s-103.594667 46.421333-103.594667 103.594667v186.026667a140.526933 140.526933 0 0 0-72.533333-20.309334z m0 213.333334a72.704 72.704 0 0 1-72.533333-72.533334 72.704 72.704 0 0 1 72.533333-72.533333 72.704 72.704 0 0 1 72.533333 72.533333 72.704 72.704 0 0 1-72.533333 72.533334z"
              />
            </svg>
          </span>
        </button>
      </div>

      <div class="modal-scroll" ref="modalScrollRef">
        <div class="modal-center">
          <div
            ref="wrapperRef"
            class="letter-wrapper"
            :class="{
              'is-flipping-out': flipStage === 'out',
              'is-flipping-in-start': flipStage === 'in-start',
              'is-flipping-in': flipStage === 'in'
            }"
          >
            <div ref="contentRef" class="letter-content">
              <template v-if="currentLetter === 'invitation'">
                <h2 class="letter-title">时空旅行邀请函</h2>
                <p class="verse verse-meta">现时定格:2027.05.08 00:00 UTC</p>

                <p class="verse verse-stanza">我正式启动，时空穿梭实验——</p>
                <p class="verse verse-stanza">
                  时间可扭曲，空间能折叠<br>
                  过去并非消亡，只是暂时封存<br>
                  破除因果悖论，挣脱时间枷锁
                </p>
                <p class="verse verse-stanza">
                  我向全域时空投递这份邀请函：<br>
                  无论你<br>
                  身处哪一段时间线<br>
                  停留于哪一处平行空间<br>
                  皆可借时间旅行的法则<br>
                  穿越时空 逆流岁月
                </p>
                <p class="verse verse-stanza">
                  诚邀每一位时空旅人参与：<br>
                  <span class="verse-em">2026.05.08黄诗扶</span><br>
                  <span class="verse-em">「从前书院」生辰盛会</span>
                </p>
                <p class="verse verse-stanza">
                  宇宙辽阔 星河辗转<br>
                  我在旧日时光<br>
                  等你赴约
                </p>

                <div class="letter-sign-block cn">
                  <p class="letter-sig-date">2027年5月8日</p>
                  <p class="letter-sig-author">时空研究者 执笔</p>
                </div>

                <h2 class="letter-title letter-title-en">Invitation to Time-Space Travel</h2>
                <p class="verse verse-en verse-meta">Current Timestamp: 00:00 UTC, 8 May 2027</p>

                <p class="verse verse-en verse-stanza">I hereby officially launch the time-space traversal experiment&mdash;</p>
                <p class="verse verse-en verse-stanza">
                  Time may twist, space may fold<br>
                  The past's not lost, but safely sealed<br>
                  Break causal paradoxes, break time's strict hold
                </p>
                <p class="verse verse-en verse-stanza">
                  I extend this invitation to the entire spacetime continuum:<br>
                  No matter which timeline you are in<br>
                  No matter which parallel universe you are in<br>
                  You can all follow the laws of time travel's art<br>
                  To cross the spacetime, reverse time's depart
                </p>
                <p class="verse verse-en verse-stanza">
                  We cordially invite every time traveler to join us:<br>
                  <span class="verse-em verse-em-en">May 8th, 2026, Huang Shifu</span><br>
                  <span class="verse-em verse-em-en">"Former Academy" Birthday Celebration</span>
                </p>
                <p class="verse verse-en verse-stanza">
                  The universe is vast, and the Milky Way is ever-turning<br>
                  In the days of yore<br>
                  I await your arrival
                </p>

                <div class="letter-sign-block en">
                  <p class="letter-sig-date ltr">8 May 2027</p>
                  <p class="letter-sig-author ltr">Written by a Spacetime Researcher</p>
                </div>
              </template>

              <template v-else>
                <h2 class="letter-title">时空感谢信</h2>

                <p class="verse verse-stanza">展信致礼：</p>
                <p class="verse verse-stanza">
                  我们身处2026年的时空，<br>
                  有幸收到跨越维度送来的时空邀约，<br>
                  如期赴约「从前书院」黄诗扶生辰盛会。
                </p>
                <p class="verse verse-stanza">
                  我们亲身亲历这场盛会，<br>
                  亲历当下的温柔与相逢。<br>
                  而当时序折叠、<br>
                  空间交错才恍然知晓：<br>
                  在另一条平行时间线里，<br>
                  这场盛会早已落幕，<br>
                  一切早已成为既定的过往。
                </p>
                <p class="verse verse-stanza">
                  我们奔赴的此刻，<br>
                  可能是他人回溯的从前；<br>
                  我们拥有的从前，<br>
                  可能是别人停留的此刻。
                </p>
                <p class="verse verse-stanza">
                  世间时序首尾相连，<br>
                  万物因果循环相扣，<br>
                  整个世界，<br>
                  本就是一枚无限缠绕、<br>
                  往复不息的莫比乌斯环。
                </p>
                <p class="verse verse-stanza">
                  时光从非单向奔走，<br>
                  过去与未来彼此咬合，<br>
                  我们始终在岁月里探寻因果，<br>
                  在时空缝隙中追问相逢的意义。
                </p>
                <p class="verse verse-stanza">
                  感谢这场特别的时空实验，<br>
                  感谢跨越维度的对话与联结，<br>
                  让我们打破时间的边界，<br>
                  读懂相逢的宿命与温柔。
                </p>
                <p class="verse verse-stanza">
                  以光阴为序，<br>
                  以岁月为契，<br>
                  感念相遇，致谢相逢。
                </p>

                <div class="letter-sign-block cn">
                  <p class="letter-sig-date">2026年5月8日</p>
                  <p class="letter-sig-author">某卿卿 敬上</p>
                </div>

                <button
                  v-if="isRevealed"
                  class="letter-review-btn"
                  :disabled="isFlipping"
                  @click="switchLetter('invitation')"
                >
                  回顾时空研究者的邀请
                </button>
              </template>
            </div>

            <div ref="coverRef" class="letter-cover">
              <button class="open-btn" :disabled="isRevealed" @click.stop="reveal">
                {{ isRevealed ? '已 展 开' : '展 开 信 件' }}
              </button>
              <div class="cover-bottom-indicator"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* ========== 弹窗遮罩 ========== */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(15, 23, 25, 0.72);
  animation: modal-fade-in 0.35s ease both;
  touch-action: manipulation;
}

.modal-scroll {
  position: absolute;
  inset: 0;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
}

.modal-center {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 20px;
  perspective: 1200px;
}

@keyframes modal-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.modal-actions {
  position: fixed;
  top: 50%;
  left: calc(50% + 324px);
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 10001;
}

.modal-action-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1.5px solid rgba(251, 218, 65, 0.55);
  background: rgba(15, 23, 25, 0.55);
  color: rgba(251, 218, 65, 0.85);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
}

.modal-action-btn:hover {
  background: rgba(15, 23, 25, 0.8);
  border-color: #fbda41;
  color: #fbda41;
}

.modal-switch-btn:hover {
  transform: scale(1.05);
}

.modal-music-btn.is-playing {
  filter: drop-shadow(0 0 8px rgba(251, 218, 65, 0.3));
}

.modal-music-btn.is-playing .modal-music-btn__icon {
  animation: modal-music-spin 3.2s linear infinite;
}

.modal-music-btn__icon {
  position: relative;
  z-index: 1;
  display: inline-flex;
  width: 18px;
  height: 18px;
}

.modal-music-btn__icon svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}

@keyframes modal-music-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* ========== 信件外层容器 ========== */
.letter-wrapper {
  width: 100%;
  max-width: 600px;
  background: #fdfaf3;
  border-radius: 2px;
  position: relative;
  overflow: hidden;
  transition: none;
  transform: rotateY(0deg);
  transform-style: preserve-3d;
  backface-visibility: hidden;
  box-shadow:
    0 1px 3px rgba(80, 50, 20, 0.08),
    0 4px 16px rgba(80, 50, 20, 0.1),
    0 12px 40px rgba(60, 35, 10, 0.12);
}

.letter-wrapper.ready {
  transition: height 5s linear;
}

.letter-wrapper.is-flipping-out {
  transform: rotateY(90deg);
  transition: transform 0.3s ease-in, height 0.25s ease !important;
}

.letter-wrapper.is-flipping-in-start {
  transform: rotateY(-90deg);
  transition: none !important;
}

.letter-wrapper.is-flipping-in {
  transform: rotateY(0deg);
  transition: transform 0.3s ease-out, height 0.25s ease !important;
}

.letter-wrapper.ready:not(.is-flipping-out):not(.is-flipping-in-start):not(.is-flipping-in) {
  transform: rotateY(0deg);
  transition: transform 0.3s ease-out, height 5s linear;
}

/* ========== 信纸内容 ========== */
.letter-content {
  padding: 40px 40px 40px;
  color: #3d3226;
  line-height: 2;
  letter-spacing: 0.03em;
  position: relative;
  z-index: 1;
  user-select: none;
  background-image: repeating-linear-gradient(0deg,
      transparent,
      transparent 31px,
      rgba(195, 175, 140, 0.14) 31px,
      rgba(195, 175, 140, 0.14) 32px);
  background-size: 100% 32px;
  background-position: 0 8px;
}

.letter-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 36px;
  bottom: 0;
  width: 1px;
  background: rgba(200, 160, 130, 0.2);
  pointer-events: none;
  z-index: 0;
}

.letter-content .date {
  text-align: right;
  color: #7a6b58;
  font-style: italic;
  margin-bottom: 20px;
  font-size: 0.9em;
  letter-spacing: 0.06em;
  position: relative;
  z-index: 2;
}

.letter-content .salutation {
  margin-bottom: 16px;
  font-size: 1em;
  font-weight: bold;
  color: #4a3c2c;
  position: relative;
  z-index: 2;
}

/* 信件标题 */
.letter-content .letter-title {
  text-align: center;
  font-size: 1.35em;
  font-weight: 700;
  color: #3d3226;
  letter-spacing: 0.15em;
  margin: 0 0 32px;
  position: relative;
  z-index: 2;
  line-height: 32px;
}

.letter-content .letter-title-en {
  font-family: 'Georgia', 'Noto Serif SC', 'STSong', 'KaiTi', '楷体', serif;
  font-size: 1.2em;
  font-weight: 600;
  color: #4a3c2c;
  letter-spacing: 0.06em;
  margin: 64px 0 32px;
}

/* 诗文段落基础 */
.letter-content :deep(p) {
  margin-bottom: 0;
  font-size: 0.93em;
  position: relative;
  z-index: 2;
  color: #3d3226;
  text-indent: 0;
  text-align: center;
}

.letter-content .verse {
  line-height: 32px;
  margin-bottom: 0;
}

.letter-content .verse-meta {
  font-size: 0.85em;
  color: #8a7b68;
  letter-spacing: 0.04em;
  margin-bottom: 0;
}

.letter-content .verse-stanza {
  margin-bottom: 32px;
}

.letter-content .verse-em {
  font-weight: 600;
  color: #2a1f14;
  letter-spacing: 0.04em;
}

/* 英文诗文 */
.letter-content .verse-en {
  font-family: 'Georgia', 'Noto Serif SC', 'STSong', 'KaiTi', '楷体', serif;
  line-height: 32px;
  color: #5a4c3a;
}

.letter-content .verse-em-en {
  font-weight: 600;
  color: #3d3226;
  font-style: normal;
}

/* 时间戳行保持与中文一致的样式 */
.letter-content .verse-en.verse-meta {
  color: #8a7b68;
  font-size: 0.85em;
  font-style: italic;
}
/* 签署区块 */
.letter-content .letter-sign-block {
  text-align: right;
  position: relative;
  z-index: 2;
  margin-top: 32px;
}

.letter-content .letter-sign-block.cn {
  margin-bottom: 0;
}

.letter-content .letter-sign-block.en {
  margin-top: 32px;
}

.letter-content .letter-sig-date {
  font-size: 0.85em;
  color: #7a6b58;
  letter-spacing: 0.04em;
  margin-bottom: 0;
  text-indent: 0;
  line-height: 32px;
}

.letter-content .letter-sig-author {
  font-size: 0.95em;
  font-weight: 700;
  color: #4a3c2c;
  letter-spacing: 0.06em;
  margin-bottom: 0;
  text-indent: 0;
  line-height: 32px;
}

.letter-content .ltr {
  font-family: 'Georgia', 'Noto Serif SC', 'STSong', 'KaiTi', '楷体', serif;
  direction: ltr;
}

.letter-content .letter-review-btn {
  display: block;
  margin: 32px auto 0;
  padding: 10px 22px;
  border: 1px solid rgba(139, 111, 80, 0.55);
  border-radius: 999px;
  background: rgba(139, 111, 80, 0.08);
  color: #5a3f26;
  font-family: inherit;
  font-size: 0.9em;
  letter-spacing: 0.08em;
  cursor: pointer;
  position: relative;
  z-index: 2;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.letter-content .letter-review-btn:hover {
  background: rgba(139, 111, 80, 0.14);
  border-color: rgba(139, 111, 80, 0.8);
  color: #3d3226;
  transform: translateY(-1px);
}

.letter-content .letter-review-btn:disabled {
  cursor: default;
  opacity: 0.55;
  transform: none;
}

/* ========== 遮罩层（信封盖） ========== */
.letter-cover {
  position: absolute;
  z-index: 10;
  left: 0;
  right: 0;
  background: #d9c9a8;
  background-image:
    repeating-linear-gradient(92deg,
      transparent,
      transparent 3px,
      rgba(180, 150, 115, 0.06) 3px,
      rgba(180, 150, 115, 0.06) 4px),
    repeating-linear-gradient(180deg,
      transparent,
      transparent 60px,
      rgba(160, 130, 95, 0.04) 60px,
      rgba(160, 130, 95, 0.04) 61px);
  background-size: 100% 100%, 100% 100%;
  border-top: 1px solid rgba(160, 130, 95, 0.55);
  transition: none;
}

.letter-wrapper.ready .letter-cover {
  transition: top 5s linear;
}

/* 遮罩顶部折痕线 */
.letter-cover::before {
  content: '';
  position: absolute;
  top: 0;
  left: 4%;
  right: 4%;
  height: 1px;
  background: rgba(140, 110, 75, 0.35);
  box-shadow: 0 1px 0 rgba(255, 250, 240, 0.3);
  pointer-events: none;
}

/* 遮罩在信纸上投下的阴影 */
.letter-cover::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 0;
  right: 0;
  height: 10px;
  background: linear-gradient(180deg,
      rgba(0, 0, 0, 0.06) 0%,
      transparent 100%);
  pointer-events: none;
}

/* ========== 打开按钮 ========== */
.open-btn {
  position: absolute;
  top: 28px;
  left: 50%;
  transform: translateX(-50%);
  padding: 9px 28px;
  background: #8b6f50;
  color: #fdf7ee;
  border: none;
  border-radius: 3px;
  font-size: 14px;
  font-family: inherit;
  letter-spacing: 0.1em;
  cursor: pointer;
  z-index: 20;
  -webkit-tap-highlight-color: transparent;
  white-space: nowrap;
  box-shadow: 0 2px 6px rgba(60, 30, 10, 0.2);
  transition: background 0.2s ease, box-shadow 0.2s ease;
}

.open-btn:hover {
  background: #6d5438;
  box-shadow: 0 3px 10px rgba(60, 30, 10, 0.28);
}

.open-btn:active {
  background: #5a3f26;
  box-shadow: 0 1px 3px rgba(60, 30, 10, 0.3);
  transform: translateX(-50%) scale(0.97);
}

.open-btn:disabled {
  background: #b8a48a;
  cursor: default;
  pointer-events: none;
  box-shadow: none;
}

/* ========== 遮罩底部标识 ========== */
.cover-bottom-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(180deg,
      rgba(140, 110, 75, 0.25) 0%,
      rgba(140, 110, 75, 0.5) 40%,
      rgba(140, 110, 75, 0.35) 100%);
  box-shadow: 0 -6px 10px rgba(60, 30, 5, 0.06);
  pointer-events: none;
}

/* ========== 响应式 ========== */
@media (max-width: 600px) {
  .modal-center {
    padding: 16px 12px;
  }

  .modal-actions {
    top: 14px;
    right: 14px;
    left: auto;
    transform: none;
    flex-direction: row;
    gap: 10px;
  }

  .modal-close-btn {
    order: 3;
  }

  .modal-music-btn {
    order: 2;
  }

  .modal-switch-btn {
    order: 1;
  }

  .modal-action-btn {
    width: 34px;
    height: 34px;
  }

  .letter-content {
    padding: 36px 20px 30px;
    line-height: 1.85;
    background-image: repeating-linear-gradient(0deg,
        transparent,
        transparent 29px,
        rgba(195, 175, 140, 0.2) 29px,
        rgba(195, 175, 140, 0.2) 30px);
    background-size: 100% 30px;
    background-position: 0 6px;
  }

  .letter-content::before {
    left: 18px;
  }

  .letter-content :deep(p) {
    font-size: 0.85em;
  }

  .letter-content .verse {
    line-height: 30px;
  }

  .letter-content .verse-en {
    line-height: 30px;
  }

  .letter-content .letter-sig-date {
    line-height: 30px;
  }

  .letter-content .letter-sig-author {
    line-height: 30px;
  }

  .letter-content .verse-stanza {
    margin-bottom: 30px;
  }

  .letter-content .letter-title {
    font-size: 1.2em;
    margin: 0 0 30px;
  }

  .letter-content .letter-title-en {
    font-size: 1.08em;
    margin: 60px 0 30px;
  }

  .letter-content .letter-sign-block {
    margin-top: 30px;
  }

  .letter-content .letter-sign-block.en {
    margin-top: 30px;
  }

  .letter-content .letter-sig-author {
    font-size: 0.88em;
  }

  .letter-content .date {
    font-size: 0.8em;
  }

  .letter-content .salutation {
    font-size: 0.9em;
  }

  .open-btn {
    padding: 8px 22px;
    font-size: 13px;
    top: 24px;
  }

  .letter-wrapper.ready {
    transition: height 4s linear;
  }

  .letter-wrapper.ready .letter-cover {
    transition: top 4s linear;
  }
}

@media (max-width: 400px) {
  .modal-center {
    padding: 12px 8px;
  }

  .modal-actions {
    top: 10px;
    right: 10px;
    gap: 10px;
  }

  .modal-action-btn {
    width: 30px;
    height: 30px;
  }

  .letter-content {
    padding: 32px 20px 24px;
    line-height: 1.75;
    background-image: repeating-linear-gradient(0deg,
        transparent,
        transparent 27px,
        rgba(195, 175, 140, 0.2) 27px,
        rgba(195, 175, 140, 0.2) 28px);
    background-size: 100% 28px;
    background-position: 0 4px;
  }

  .letter-content::before {
    left: 12px;
  }

  .letter-content :deep(p) {
    font-size: 0.8em;
  }

  .letter-content .verse {
    line-height: 28px;
  }

  .letter-content .verse-en {
    line-height: 28px;
  }

  .letter-content .letter-sig-date {
    line-height: 28px;
  }

  .letter-content .letter-sig-author {
    line-height: 28px;
  }

  .letter-content .verse-stanza {
    margin-bottom: 28px;
  }

  .letter-content .letter-title {
    font-size: 1.1em;
    margin: 0 0 28px;
  }

  .letter-content .letter-title-en {
    font-size: 1em;
    margin: 56px 0 28px;
  }

  .letter-content .letter-sign-block {
    margin-top: 28px;
  }

  .letter-content .letter-sign-block.en {
    margin-top: 28px;
  }

  .open-btn {
    padding: 7px 18px;
    font-size: 12px;
    top: 20px;
  }

  .letter-wrapper.ready {
    transition: height 3.5s linear;
  }

  .letter-wrapper.ready .letter-cover {
    transition: top 3.5s linear;
  }
}
</style>
