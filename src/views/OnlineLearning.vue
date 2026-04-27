<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const categories = [
  { name: '声乐课程', desc: '演唱技巧与舞台表现' },
  { name: '创作课程', desc: '词曲创作与编曲基础' },
  { name: '赏析课程', desc: '国风音乐作品鉴赏' },
  { name: '文化课程', desc: '古典诗词与传统文化' },
  { name: '实践课程', desc: '作品录制与艺术策划' }
];
</script>

<template>
  <div class="online-page">
    <section class="subhero">
      <div class="subhero-bg" style="background-image: url('/hero.webp');"></div>
      <div class="subhero-overlay"></div>
      <div class="subhero-content">
        <h1 class="subhero-title">网上教学</h1>
        <div class="subhero-divider"></div>
        <p class="subhero-motto">云端修学 · 不辍精进</p>
      </div>
    </section>

    <div class="main-body">
      <section class="section-padding bg-paper">
        <div class="container">
          <div class="section-header text-center">
            <h2 class="title-primary">2026 生贺节目课程</h2>
            <p class="subtitle-primary">节目表陆续更新中</p>
          </div>

          <div class="category-grid">
            <div class="category-card" v-for="cat in categories" :key="cat.name">
              <h3 class="category-name">{{ cat.name }}</h3>
              <p class="category-desc">{{ cat.desc }}</p>
              <div class="category-status">资料整理中</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 底部入口 -->
      <section class="page-entry section-padding">
        <div class="container text-center">
          <button class="entry-btn" @click="router.push('/contact')">
            <span>前往 · 联系我们</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

    </div>
  </div>
</template>

<style scoped>
.subhero {
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  overflow: hidden;
}

.subhero-bg {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-size: cover;
  background-position: center;
}

.subhero-overlay {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: linear-gradient(to bottom, rgba(15, 23, 25, 0.6), rgba(15, 23, 25, 0.9));
}

.subhero-content {
  position: relative;
  z-index: 10;
  margin-top: 40px;
}

.subhero-title {
  font-size: 2.8rem;
  font-weight: 400;
  letter-spacing: 10px;
  margin-bottom: 1rem;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  margin-left: 10px;
}

.subhero-divider {
  width: 60px;
  height: 2px;
  background-color: #fbda41;
  margin: 0 auto 1.5rem;
}

.subhero-motto {
  font-size: 1.1rem;
  letter-spacing: 3px;
  opacity: 0.9;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.category-card {
  background: #fff;
  padding: 2.5rem 2rem;
  border: 1px solid #e2dac9;
  text-align: center;
  transition: all 0.3s ease;
}

.category-card:hover {
  border-color: #C5A059;
  box-shadow: 0 10px 25px rgba(197, 160, 89, 0.12);
  transform: translateY(-3px);
}

.category-name {
  font-size: 1.15rem;
  color: #0f1719;
  font-weight: 600;
  letter-spacing: 2px;
  margin-bottom: 0.5rem;
}

.category-desc {
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 1.5rem;
}

.category-status {
  font-size: 0.8rem;
  color: #C5A059;
  letter-spacing: 2px;
  padding-top: 1rem;
  border-top: 1px dashed #e2dac9;
}

/* 底部入口 */
.page-entry {
  padding: 5rem 0 4rem;
  background: #f5f0e6;
}

.entry-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 2rem;
  font-family: "Noto Serif SC", "STSong", "SimSun", serif;
  font-size: 1rem;
  color: #fbda41;
  background: #0f1719;
  border: 1px solid rgba(251, 218, 65, 0.3);
  cursor: pointer;
  letter-spacing: 2px;
  transition: all 0.35s ease;
}

.entry-btn:hover {
  background: #1a2a2e;
  border-color: #fbda41;
  box-shadow: 0 8px 30px rgba(251, 218, 65, 0.2);
  transform: translateY(-3px);
}

@media (max-width: 768px) {
  .subhero { height: 260px; }
  .subhero-title { font-size: 1.8rem; }
  .category-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
  .category-card { padding: 2rem 1.5rem; }
  .page-entry { padding: 3rem 0 2rem; }
}
</style>
