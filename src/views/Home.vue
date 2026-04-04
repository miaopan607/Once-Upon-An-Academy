<script setup lang="ts">
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showCustomAlert = inject<(msg: string) => void>('showCustomAlert')!;

// 全页面上拉手势（仅在页面底部触发，整个页面上移）
const pullStartY = ref(0);
const pullStartScrollY = ref(0);
const pullDelta = ref(0);     // 经过阻力衰减后的显示偏移
const isPulling = ref(false);
const isAnimating = ref(false);
const THRESHOLD = 90;         // 触发跳转的显示偏移阈值
const MAX_DISPLAY = 110;      // 最大显示偏移
const DAMPING = 0.3;          // 阻力系数（越小阻力越大，需要拉更远）

const isAtBottom = () => {
  return window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 15;
};

const onPullStart = (e: TouchEvent) => {
  if (isAnimating.value) return;
  pullStartY.value = e.touches[0].clientY;
  pullStartScrollY.value = window.scrollY;
  isPulling.value = false;
};

const onPullMove = (e: TouchEvent) => {
  const touchDelta = pullStartY.value - e.touches[0].clientY;
  const scrollDelta = pullStartScrollY.value - window.scrollY;

  if (isPulling.value) {
    const overflow = touchDelta - scrollDelta;
    if (overflow > 0) {
      // 阻力衰减：线性阻尼，拉得越远阻力越大
      pullDelta.value = Math.min(MAX_DISPLAY, overflow * DAMPING);
      e.preventDefault();
    } else {
      isPulling.value = false;
      pullDelta.value = 0;
    }
    return;
  }

  if (isAtBottom() && touchDelta > 15) {
    const overflow = touchDelta - scrollDelta;
    if (overflow > 8) {
      isPulling.value = true;
      pullDelta.value = Math.min(MAX_DISPLAY, overflow * DAMPING);
      e.preventDefault();
    }
  }
};

const onPullEnd = () => {
  if (!isPulling.value) return;
  if (pullDelta.value >= THRESHOLD) {
    isAnimating.value = true;
    pullDelta.value = MAX_DISPLAY;
    setTimeout(() => {
      router.push('/recruit');
    }, 300);
  } else {
    isAnimating.value = true;
    pullDelta.value = 0;
    setTimeout(() => {
      isAnimating.value = false;
    }, 350);
  }
};

const goToRecruit = () => {
  router.push('/recruit');
};

const programs = [
  { title: '（标题）', type: '类型（音乐）', link: '#' },
  { title: '（标题）', type: '类型（视频）', link: '#' },
  { title: '（标题）', type: '类型（舞蹈）', link: '#' },
  { title: '（标题）', type: '类型（彩蛋）', link: '#' }
];
</script>

<template>
  <div
    class="home-page"
    :class="{ 'page-pulling': isPulling, 'page-animating': isAnimating }"
    :style="{ transform: (isPulling || isAnimating) && pullDelta > 0 ? `translateY(-${pullDelta}px)` : '' }"
    @touchstart="onPullStart"
    @touchmove="onPullMove"
    @touchend="onPullEnd"
  >
    <section class="subhero">
      <div class="subhero-bg" style="background-image: url('/hero.png');"></div>
      <div class="subhero-overlay"></div>
      <div class="subhero-content">
        <h1 class="subhero-title">学校概况</h1>
        <div class="subhero-divider"></div>
        <p class="subhero-motto">相信爱永存 · 感谢传统文化带来的力量</p>
        <p class="subhero-motto">（这张图乱放的）</p>
      </div>
    </section>

    <!-- 主体内容 -->
    <div class="main-body">

      <!-- 红头文件通知 -->
      <section class="notice-section section-padding bg-paper">
        <div class="container">
          <div class="red-document mx-auto">
            <h3 class="red-title">从前书院教务处文件</h3>
            <div class="red-line"></div>
            <h4 class="doc-subject">关于黄诗扶全国巡演（上海站）的通知</h4>
            <div class="doc-content">
              <p>各书院学子、各级班长：</p>
              <p>为庆祝本院杰出荣誉校友生辰，同时展示我院在古风音乐领域的至高艺术结晶。特向全体学子通报2026年黄诗扶全国巡演上海站盛事。</p>
              <div style="margin-bottom: 1rem; padding-left: 2rem;">
                <strong style="display: block;">公演吉期：</strong>
                <div style="padding-left: 2em; margin-top: 0.3rem; line-height: 1.8;">
                  2026 / 06 / 19 19:00<br>
                  2026 / 06 / 20 19:00
                </div>
              </div>
              <p><strong>雅集地点：</strong> 上海市 · 交通银行前滩31演艺中心</p>
              <p>望各班学子奔走相告，共襄盛举。</p>
              <div class="doc-stamp">
                <p>从前书院教务处</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 荣誉校友与校史 -->
      <section class="history-alumni-section section-padding">
        <div class="container split-layout">
          <div class="split-col">
            <div class="section-header">
              <h2 class="title-primary">校史拾遗</h2>
              <p class="subtitle-primary">（描述）</p>
            </div>
            <div class="elegant-card h-full">
              <h3 class="card-title">（标题）</h3>
              <p class="mt-4 text-detail">
                （内容）
              </p>
            </div>
          </div>
          <div class="split-col">
            <div class="section-header">
              <h2 class="title-primary">荣誉校友</h2>
              <p class="subtitle-primary">（描述）</p>
            </div>
            <div class="elegant-card elegant-card-dark h-full">
              <h3 class="card-title text-gold">黄诗扶</h3>
              <p class="tagline mt-2">（称号） / （称号） / （称号）</p>
              <ul class="resume-list mt-4">
                <li><strong>代表作：</strong>（代表作）</li>
                <li><strong>（其他内容）：</strong>（内容）</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 雅学之境 -->
      <section class="env-section section-padding bg-paper">
        <div class="container">
          <div class="section-header">
            <h2 class="title-primary">雅学之境</h2>
            <p class="subtitle-primary">（描述）</p>
          </div>
          <div class="env-image"
            style="background-image: url('/campus.png'); background-size: cover; background-position: center; border: 1px solid #e2dac9; position: relative; width: 100%; height: 400px;">
            <div
              style="position: absolute; bottom: 0; left: 0; width: 100%; background: linear-gradient(transparent, rgba(15,23,25,0.9)); padding: 2rem;">
              <h3 style="color: #C5A059; font-size: 1.4rem; margin-bottom: 0.2rem;">校园环境</h3>
              <p style="color: #eee; font-size: 0.95rem;">（描述）（先随便放一个图）</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 留言与咨询 -->
      <section class="interactive-section section-padding">
        <div class="container split-layout">
          <div class="split-col">
            <div class="section-header">
              <h2 class="title-primary">学子留言壁</h2>
              <p class="subtitle-primary">（描述）</p>
            </div>
            <div class="message-board">
              <div class="message-item">
                <span class="author">@（昵称）：</span>
                <span class="content">（内容）</span>
              </div>
              <div class="message-item">
                <span class="author">@（昵称）：</span>
                <span class="content">（内容）</span>
              </div>
              <div class="message-item">
                <span class="author">@（昵称）：</span>
                <span class="content">（内容）</span>
              </div>
            </div>
          </div>

          <div class="split-col">
            <div class="section-header">
              <h2 class="title-primary">联系我们</h2>
              <p class="subtitle-primary">缘起从前，一见如故</p>
            </div>
            <div class="elegant-card bg-gold">
              <h3 class="card-title text-dark">从前书院招生办</h3>
              <p class="mt-4 text-dark">若有心求学，望拨打专线联络。</p>
              <div class="contact-wrap mt-4">
                <p><strong>[ 统理招生 ] </strong> 卿主任</p>
                <p class="mt-2"><strong>[ 传书青鸟 ] </strong> <span class="magical-font">（编一个出道日子的电话）</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 节目板块 -->
      <section class="programs-section section-padding bg-alt">
        <div class="container text-center">
          <div class="section-header mb-6">
            <h2 class="title-primary">生贺节目大观</h2>
            <p class="subtitle-primary mt-2">校园开放日：每年5月8日 · 节目档案陆续解锁中...</p>
          </div>
          <div class="programs-grid">
            <a :href="prog.link" class="program-card" v-for="prog in programs" :key="prog.title"
              @click.prevent="showCustomAlert('链接🔗更新中，敬请期待！')">
              <div class="prog-type">{{ prog.type }}</div>
              <h4 class="prog-title">{{ prog.title }}</h4>
              <div class="prog-status">敬请期待</div>
            </a>
          </div>
        </div>
      </section>

      <!-- 底部入口：招募与培养 -->
      <section class="recruit-entry section-padding">
        <div class="container text-center">
          <button class="entry-btn desktop-only" @click="goToRecruit">
            <span>前往 · 招募与培养</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
          <p class="mobile-hint mobile-only" :class="{ 'hint-ready': pullDelta >= THRESHOLD }">
            {{ pullDelta >= THRESHOLD ? '松开前往「招募与培养」' : '上拉页面可前往「招募与培养」' }}
          </p>
          <div class="pull-progress mobile-only" :class="{ 'progress-active': pullDelta > 0 }">
            <div class="pull-progress-track">
              <div class="pull-progress-fill" :style="{ width: `${Math.min(pullDelta / THRESHOLD * 100, 100)}%` }"></div>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<style scoped>
/* Subhero Banner */
.subhero {
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  overflow: hidden;
}

.subhero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.subhero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(15, 23, 25, 0.6), rgba(15, 23, 25, 0.9));
}

.subhero-content {
  position: relative;
  z-index: 10;
  margin-top: 40px;
}

.subhero-title {
  font-size: 3.5rem;
  font-weight: 400;
  letter-spacing: 12px;
  margin-bottom: 1rem;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  margin-left: 12px;
}

.subhero-divider {
  width: 60px;
  height: 2px;
  background-color: #C5A059;
  margin: 0 auto 1.5rem;
}

.subhero-motto {
  font-size: 1.25rem;
  letter-spacing: 4px;
  opacity: 0.9;
}

/* 红头文件装潢 */
.red-document {
  max-width: 850px;
  background: #fff;
  padding: 4rem;
  border: 1px solid rgba(200, 0, 0, 0.15);
  box-shadow: inset 0 0 50px rgba(200, 0, 0, 0.02), 0 10px 40px rgba(0, 0, 0, 0.03);
}

.red-title {
  color: #b71c1c;
  font-size: 2.5rem;
  text-align: center;
  font-weight: bold;
  font-family: "SimHei", "Microsoft YaHei", sans-serif;
  letter-spacing: 8px;
}

.red-line {
  height: 4px;
  background: #b71c1c;
  margin: 1.5rem 0 2.5rem;
  box-shadow: 0 2px 0 rgba(183, 28, 28, 0.3);
}

.doc-subject {
  text-align: center;
  font-size: 1.4rem;
  color: #111;
  font-weight: 600;
  margin-bottom: 2.5rem;
}

.doc-content p {
  margin-bottom: 1rem;
  font-size: 1.15rem;
  color: #222;
}

.doc-content>p {
  text-indent: 2rem;
}

.doc-content p strong {
  color: #000;
}

.doc-stamp {
  margin-top: 4rem;
  text-align: right;
  font-size: 1.15rem;
  font-weight: 600;
  color: #111;
}

/* 优雅卡片系统 */
.elegant-card {
  background: #fff;
  padding: 3rem;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.03);
  border-top: 3px solid #0f1719;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.elegant-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.06);
}

.elegant-card-dark {
  background: #0f1719;
  color: #fff;
  border-top: 3px solid #C5A059;
}

.card-title {
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
}

/* 留言板 */
.message-board {
  border-left: 2px solid #C5A059;
  padding-left: 2.5rem;
  position: relative;
}

.message-item {
  margin-bottom: 2rem;
  position: relative;
}

.message-item::before {
  content: '';
  position: absolute;
  left: calc(-2.5rem - 1px);
  transform: translateX(-50%);
  top: 8px;
  width: 12px;
  height: 12px;
  background: #fdfbf7;
  border: 2px solid #C5A059;
  border-radius: 50%;
}

.author {
  font-weight: bold;
  color: #0f1719;
  display: block;
  margin-bottom: 0.3rem;
}

.content {
  color: #555;
  font-style: italic;
}

/* Contact Info Magical Font */
.magical-font {
  font-size: 1.8rem;
  font-weight: bold;
  letter-spacing: 2px;
}

/* 节目板块 */
.programs-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

.program-card {
  background: #fff;
  border: 1px solid #ddd;
  padding: 2rem;
  text-decoration: none;
  min-width: 250px;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}

.program-card:hover {
  border-color: #C5A059;
  box-shadow: 0 10px 30px rgba(197, 160, 89, 0.15);
  transform: translateY(-5px);
}

.prog-type {
  font-size: 0.85rem;
  color: #C5A059;
  letter-spacing: 2px;
  margin-bottom: 1rem;
}

.prog-title {
  color: #0f1719;
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
}

.prog-status {
  font-size: 0.9rem;
  color: #999;
  border-top: 1px solid #eee;
  padding-top: 1rem;
}

.program-card:hover .prog-status {
  color: #C5A059;
}

/* 雅学之境 */
.env-image {
  border-radius: 4px;
}

/* 底部入口 */
.recruit-entry {
  padding: 5rem 0 4rem;
  background: #f5f0e6;
}

.entry-hint {
  font-size: 1.1rem;
  color: #555;
  letter-spacing: 3px;
  margin-bottom: 2rem;
}

.entry-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  font-family: "Noto Serif SC", "STSong", "SimSun", serif;
  font-size: 1.15rem;
  color: #C5A059;
  background: #0f1719;
  border: 1px solid rgba(197, 160, 89, 0.3);
  cursor: pointer;
  letter-spacing: 2px;
  transition: all 0.35s ease;
}

.entry-btn:hover {
  background: #1a2a2e;
  border-color: #C5A059;
  box-shadow: 0 8px 30px rgba(197, 160, 89, 0.2);
  transform: translateY(-3px);
}

.mobile-hint {
  font-size: 0.95rem;
  color: #999;
  letter-spacing: 2px;
  transition: color 0.25s;
}

.hint-ready {
  color: #C5A059;
  font-weight: 600;
}

.pull-progress {
  margin-top: 1rem;
  opacity: 0;
  transition: opacity 0.25s;
}

.progress-active {
  opacity: 1;
}

.pull-progress-track {
  width: 120px;
  height: 3px;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  overflow: hidden;
  margin: 0 auto;
}

.pull-progress-fill {
  height: 100%;
  background: #C5A059;
  border-radius: 2px;
  transition: width 0.08s ease-out;
}

/* 桌面端/移动端切换 */
.desktop-only {
  display: inline-flex;
}

.mobile-only {
  display: none;
}

/* 页面整体上拉 */
.home-page {
  transition: transform 0s;
}

.page-pulling {
  transition: none;
}

.page-animating {
  transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .subhero {
    height: 350px;
  }

  .subhero-title {
    font-size: 2.2rem;
  }

  .red-document {
    padding: 2rem 1.5rem;
  }

  .env-image {
    height: 260px !important;
  }

  .desktop-only {
    display: none !important;
  }

  .mobile-only {
    display: block;
  }

  .recruit-entry {
    padding: 3rem 0 2rem;
  }
}
</style>
