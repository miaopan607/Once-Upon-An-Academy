<script setup lang="ts">
import { ref, onMounted, onUnmounted, provide } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isScrolled = ref(false);
const showToast = ref(false);
const toastMessage = ref('');

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

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const navLinks = [
  { name: '学校概况', path: '/' },
  { name: '师资队伍', path: '/faculty' },
  { name: '人才培养', path: '/talent' },
  { name: '招生就业', path: '/admission' },
  { name: '网上教学', path: '/online-learning' },
  { name: '联系我们', path: '/contact' },
];
</script>

<template>
  <div class="academy-website">

    <!-- Header -->
    <header :class="{ 'header-scrolled': isScrolled }">
      <div class="header-content">
        <router-link to="/" class="logo" style="white-space: nowrap;">从前书院</router-link>
        <nav class="nav-links desktop-nav">
          <router-link v-for="link in navLinks" :key="link.path" :to="link.path"
            :class="{ active: route.path === link.path }">
            {{ link.name }}
          </router-link>
        </nav>
      </div>
      <!-- 移动端导航栏 -->
      <div class="mobile-nav">
        <div class="mobile-nav-scroll">
          <router-link v-for="link in navLinks" :key="link.path" :to="link.path"
            :class="{ active: route.path === link.path }">
            {{ link.name }}
          </router-link>
        </div>
      </div>
    </header>

    <main class="main-content">
      <router-view />
    </main>

    <!-- Custom Toast -->
    <div class="custom-toast" :class="{ 'toast-visible': showToast }">
      {{ toastMessage }}
    </div>
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
}

.logo {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: 4px;
  text-decoration: none;
}

header.header-scrolled .logo {
  color: #C5A059;
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
  background: #C5A059;
  transition: 0.3s;
}

.nav-links a:hover {
  color: #C5A059;
}

.nav-links a.active {
  color: #C5A059;
  font-weight: 600;
  border-bottom: 2px solid #C5A059;
  padding-bottom: 4px;
}

/* 移动端导航栏 */
.mobile-nav {
  display: none;
  background: #0f1719;
  border-top: 1px solid rgba(197, 160, 89, 0.2);
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
  padding: 0.6rem 1rem;
  gap: 1.5rem;
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

.mobile-nav-scroll a.active {
  color: #F5C542;
  font-weight: 500;
}

/* Custom Toast Modal */
.custom-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  background: rgba(15, 23, 25, 0.9);
  color: #C5A059;
  padding: 1rem 2.5rem;
  border-radius: 8px;
  font-size: 1rem;
  letter-spacing: 2px;
  z-index: 9999;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(197, 160, 89, 0.3);
}

.custom-toast.toast-visible {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .main-content {
    padding-top: 82px;
  }

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
    flex-wrap: wrap;
    padding: 0.6rem 1rem;
  }

  .logo {
    font-size: 1.3rem;
  }
}
</style>
