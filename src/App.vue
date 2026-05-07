<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, provide, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';
import LetterModal from './components/LetterModal.vue';
import CheckIn from './components/CheckIn.vue';

const route = useRoute();
const isStandalonePage = computed(() => route.path === '/course-admin');
const isScrolled = ref(false);
const isPlaying = ref(false);
const showToast = ref(false);
const toastMessage = ref('');
const audioRef = ref<HTMLAudioElement | null>(null);
let removeAutoplayUnlockListeners: (() => void) | null = null;

const showCustomAlert = (msg: string) => {
  toastMessage.value = msg;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 2500);
};

provide('showCustomAlert', showCustomAlert);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 150;
};

const tryPlayAudio = async (showBlockedMessage = false) => {
  const audio = audioRef.value;

  if (!audio) {
    return false;
  }

  try {
    await audio.play();
    return true;
  } catch {
    if (showBlockedMessage) {
      showCustomAlert('当前浏览器阻止了自动播放，请再点击一次');
    }
    return false;
  }
};

const setupAutoplayUnlock = () => {
  if (removeAutoplayUnlockListeners) {
    return;
  }

  const interactionEvents: Array<'pointerdown' | 'keydown' | 'touchstart'> = ['pointerdown', 'keydown', 'touchstart'];
  const handleFirstInteraction = async () => {
    const played = await tryPlayAudio();

    if (played) {
      removeAutoplayUnlockListeners?.();
    }
  };

  interactionEvents.forEach((eventName) => {
    window.addEventListener(eventName, handleFirstInteraction, { passive: true });
  });

  removeAutoplayUnlockListeners = () => {
    interactionEvents.forEach((eventName) => {
      window.removeEventListener(eventName, handleFirstInteraction);
    });
    removeAutoplayUnlockListeners = null;
  };
};

onMounted(async () => {
  if (isStandalonePage.value) {
    return;
  }

  window.addEventListener('scroll', handleScroll);
  const played = await tryPlayAudio();

  if (!played) {
    setupAutoplayUnlock();
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  removeAutoplayUnlockListeners?.();
});

const togglePlayback = async () => {
  const audio = audioRef.value;

  if (!audio) {
    return;
  }

  if (audio.paused) {
    const played = await tryPlayAudio(true);

    if (played) {
      removeAutoplayUnlockListeners?.();
    }
    return;
  }

  audio.pause();
};

provide('isMusicPlaying', isPlaying);
provide('toggleMusic', togglePlayback);

const handleAudioPlay = () => {
  isPlaying.value = true;
};

const handleAudioPause = () => {
  isPlaying.value = false;
};

const navLinks = [
  { name: '学校概况', path: '/' },
  { name: '学院介绍', path: '/school' },
  { name: '人才培养', path: '/talent' },
  { name: '招生就业', path: '/admission' },
  { name: '网上教学', path: '/online-learning' },
  { name: '联系我们', path: '/contact' },
];

const letterModalRef = ref<InstanceType<typeof LetterModal> | null>(null);

function openLetter() {
  letterModalRef.value?.show();
}

function showOnlineLearningThankYouLetter() {
  letterModalRef.value?.showThankYouIfUnviewed();
}

watch(
  () => route.path,
  async (path) => {
    if (path !== '/online-learning') return

    await nextTick()
    showOnlineLearningThankYouLetter()
  },
  { immediate: true }
);
</script>

<template>
  <div class="academy-website">
    <main v-if="isStandalonePage">
      <router-view />
    </main>

    <template v-else>
      <!-- Header -->
      <header :class="{ 'header-scrolled': isScrolled }">
      <div class="header-content">
        <div class="brand-group">
          <router-link to="/" class="logo" style="white-space: nowrap;">从前书院</router-link>
          <button
            type="button"
            class="music-toggle desktop-music-toggle"
            :class="{ 'is-playing': isPlaying }"
            :aria-label="isPlaying ? '暂停背景音乐' : '播放背景音乐'"
            @click="togglePlayback"
          >
            <span class="music-toggle__icon" aria-hidden="true">
              <svg viewBox="0 0 1024 1024" focusable="false">
                <path
                  d="M875.008 295.424a34.133333 34.133333 0 1 0-58.197333 35.669333c35.328 57.514667 53.930667 123.562667 53.930666 191.488 0 201.898667-164.352 366.250667-366.250666 366.250667S138.24 724.48 138.24 522.581333 302.592 156.330667 504.490667 156.330667c18.773333 0 34.133333-15.36 34.133333-34.133334s-15.36-34.133333-34.133333-34.133333C264.874667 88.064 69.973333 282.965333 69.973333 522.581333s194.901333 434.517333 434.517334 434.517334 434.517333-194.901333 434.517333-434.517334c0.170667-80.384-22.016-159.061333-64-227.157333z"
                />
                <path
                  d="M501.248 389.973333c-77.653333 0-140.8 63.146667-140.8 140.8s63.146667 140.8 140.8 140.8 140.8-63.146667 140.8-140.8V224.256c0-19.456 15.872-35.328 35.328-35.328 19.456 0 35.328 15.872 35.328 35.328 0 18.773333 15.36 34.133333 34.133333 34.133333s34.133333-15.36 34.133334-34.133333c0-57.173333-46.421333-103.594667-103.594667-103.594667s-103.594667 46.421333-103.594667 103.594667v186.026667a140.526933 140.526933 0 0 0-72.533333-20.309334z m0 213.333334a72.704 72.704 0 0 1-72.533333-72.533334 72.704 72.704 0 0 1 72.533333-72.533333 72.704 72.704 0 0 1 72.533333 72.533333 72.704 72.704 0 0 1-72.533333 72.533334z"
                />
              </svg>
            </span>
          </button>
          <button
            type="button"
            class="music-toggle desktop-letter-toggle"
            aria-label="查看信件"
            @click="openLetter"
          >
            <span class="music-toggle__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </span>
          </button>
        </div>
        <nav class="nav-links desktop-nav">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            :class="{ active: route.path === link.path }"
          >
            {{ link.name }}
          </router-link>
        </nav>
        <div class="mobile-actions">
          <button
            type="button"
            class="music-toggle mobile-letter-toggle"
            aria-label="查看信件"
            @click="openLetter"
          >
            <span class="music-toggle__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </span>
          </button>
          <button
            type="button"
            class="music-toggle mobile-music-toggle"
            :class="{ 'is-playing': isPlaying }"
            :aria-label="isPlaying ? '暂停背景音乐' : '播放背景音乐'"
            @click="togglePlayback"
          >
            <span class="music-toggle__icon" aria-hidden="true">
              <svg viewBox="0 0 1024 1024" focusable="false">
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
      </div>
      <!-- 移动端导航栏 -->
      <div class="mobile-nav">
        <div class="mobile-nav-scroll">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            :class="{ active: route.path === link.path }"
          >
            {{ link.name }}
          </router-link>
        </div>
      </div>
      </header>

      <main class="main-content">
        <router-view />
      </main>

      <CheckIn />

      <!-- Custom Toast -->
      <div class="custom-toast" :class="{ 'toast-visible': showToast }">
        {{ toastMessage }}
      </div>

      <audio
        ref="audioRef"
        src="/audio/music.opus"
        autoplay
        loop
        preload="auto"
        @play="handleAudioPlay"
        @pause="handleAudioPause"
        @ended="handleAudioPause"
      />

      <LetterModal ref="letterModalRef" />
    </template>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;600;700&display=swap');

.academy-website {
  font-family: "Noto Serif SC", "STSong", "SimSun", serif;
  color: #1a1a1a;
  line-height: 1.8;
  background-color: #fdfbf7;
}

/* Header */
header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background: transparent;
  padding: 2rem 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

header.header-scrolled {
  background: #0f1719;
  padding: 1rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.25rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: 4px;
  text-decoration: none;
}

header.header-scrolled .logo {
  color: #fbda41;
}

.brand-group {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  min-width: 0;
}

.desktop-music-toggle {
  margin-top: 3px;
}

.desktop-letter-toggle {
  margin-top: 3px;
}

.music-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.9rem;
  height: 2.9rem;
  flex-shrink: 0;
  border: none;
  background: transparent;
  color: #fbda41;
  cursor: pointer;
  padding: 0;
  transition: transform 0.3s ease, color 0.3s ease, filter 0.3s ease;
}

.music-toggle:hover {
  transform: translateY(-1px);
  color: #fbda41;
}

.music-toggle.is-playing {
  filter: drop-shadow(0 0 10px rgba(251, 218, 65, 0.22));
}

.music-toggle__icon {
  position: relative;
  z-index: 1;
  display: inline-flex;
  width: 1.45rem;
  height: 1.45rem;
}

.music-toggle__icon svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}

.music-toggle.is-playing .music-toggle__icon {
  animation: music-note-spin 3.2s linear infinite;
}

.mobile-music-toggle {
  display: none;
}

.mobile-letter-toggle {
  display: none;
}

.mobile-actions {
  display: none;
  align-items: center;
  gap: 0.3rem;
}

.nav-links a {
  margin-left: 1.4rem;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.85);
  transition: all 0.3s;
  letter-spacing: 1px;
  text-decoration: none;
}

.mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
}

.mobile-toggle span {
  display: block;
  width: 25px;
  height: 3px;
  background: #fbda41;
  transition: 0.3s;
}

.nav-links a:hover {
  color: #fbda41;
}

.nav-links a.active {
  color: #fbda41;
  font-weight: 600;
  border-bottom: 2px solid #fbda41;
  padding-bottom: 4px;
}

/* 移动端导航栏 */
.mobile-nav {
  display: none;
  background: #0f1719;
  border-top: 1px solid rgba(251, 218, 65, 0.2);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.mobile-nav::-webkit-scrollbar {
  display: none;
}

.mobile-nav-scroll {
  display: flex;
  padding: 0.6rem 0 0.6rem 1rem;
  white-space: nowrap;
}

.mobile-nav-scroll a {
  font-size: 0.85rem;
  color: #888;
  text-decoration: none;
  letter-spacing: 1px;
  transition: color 0.3s;
  flex-shrink: 0;
}

.mobile-nav-scroll a + a {
  margin-left: 1.5rem;
}

.mobile-nav-scroll a.active {
  color: #fbda41;
  font-weight: 500;
}

.mobile-nav-scroll::after {
  content: '';
  flex-shrink: 0;
  width: 1rem;
}

/* Custom Toast Modal */
.custom-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  background: rgba(15, 23, 25, 0.9);
  color: #fbda41;
  padding: 1rem 2.5rem;
  border-radius: 8px;
  font-size: 1rem;
  letter-spacing: 2px;
  z-index: 9999;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(251, 218, 65, 0.3);
}

.custom-toast.toast-visible {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

@keyframes music-note-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .main-content {
    padding-top: 82px;
  }

  .brand-group .desktop-music-toggle,
  .brand-group .desktop-letter-toggle,
  .desktop-nav {
    display: none;
  }

  .mobile-nav {
    display: block;
  }

  header,
  header.header-scrolled {
    padding: 0;
    background: #0f1719;
  }

  .header-content {
    flex-wrap: nowrap;
    padding: 0.6rem 1rem;
  }

  .logo {
    font-size: 1.3rem;
    margin-right: auto;
  }

  .mobile-actions {
    display: flex;
  }

  .mobile-music-toggle {
    display: inline-flex;
    width: 2.55rem;
    height: 2.55rem;
  }

  .mobile-letter-toggle {
    display: inline-flex;
    width: 2.55rem;
    height: 2.55rem;
  }
}
</style>
