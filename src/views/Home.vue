<script setup lang="ts">
import { inject, ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showCustomAlert = inject<(msg: string) => void>('showCustomAlert')!;

const goToRecruit = () => {
  router.push('/recruit');
};

const programs = [
  { title: '（标题）', type: '类型（音乐）', link: '#' },
  { title: '（标题）', type: '类型（视频）', link: '#' },
  { title: '（标题）', type: '类型（舞蹈）', link: '#' },
  { title: '（标题）', type: '类型（彩蛋）', link: '#' }
];

// 实时时间，年份为当前年份+1
const currentTime = ref('');
let timer: number | null = null;

const updateTime = () => {
  const now = new Date();
  const year = now.getFullYear() + 1;
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  currentTime.value = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
};

onMounted(() => {
  updateTime();
  timer = window.setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});

// 过期信息数据
const expiredInfo = [
  { name: '入梦·北京站', dates: ['2026/04/30', '2026/05/01'] },
  { name: '入梦·上海站', dates: ['2026/03/15', '2026/03/16'] },
  { name: '入梦·广州站', dates: ['2026/02/20', '2026/02/21', '2026/02/22'] },
  { name: '入梦·成都站', dates: ['2026/01/10', '2026/01/11'] },
  { name: '入梦·杭州站', dates: ['2025/12/25', '2025/12/26'] },
  { name: '入梦·南京站', dates: ['2025/12/05', '2025/12/06'] },
  { name: '入梦·西安站', dates: ['2025/11/20', '2025/11/21'] },
  { name: '入梦·武汉站', dates: ['2025/11/01', '2025/11/02'] },
  { name: '入梦·深圳站', dates: ['2025/10/15', '2025/10/16'] },
  { name: '入梦·重庆站', dates: ['2025/09/28', '2025/09/29'] },
  { name: '入梦·苏州站', dates: ['2025/09/10', '2025/09/11'] },
  { name: '入梦·天津站', dates: ['2025/08/22', '2025/08/23'] },
];
</script>

<template>
  <div class="home-page">
    <section class="subhero">
      <div class="subhero-bg" style="background-image: url('/hero.png');"></div>
      <div class="subhero-overlay"></div>
      <div class="subhero-content">
        <h1 class="subhero-title">校园</h1>
        <div class="subhero-divider"></div>
        <p class="subhero-motto">相信爱永存 · 感谢传统文化带来的力量</p>
        <p class="subhero-motto">（这张图乱放的）</p>
      </div>
    </section>

    <!-- 主体内容 -->
    <div class="main-body">

      <!-- 红头文件通知 - 两栏布局 -->
      <section class="notice-section section-padding bg-paper">
        <div class="container">
          <div class="notice-two-col">
            <!-- 左栏 -->
            <div class="notice-left">
              <!-- 上部分：莫比乌斯环和时间 -->
              <div class="mobius-section">
                <div class="mobius-container">
                  <svg class="mobius-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="mobiusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#C5A059;stop-opacity:1" />
                        <stop offset="50%" style="stop-color:#8B7355;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#C5A059;stop-opacity:1" />
                      </linearGradient>
                    </defs>
                    <path d="M100,20 C140,20 170,50 170,90 C170,130 140,160 100,160 C70,160 50,140 50,110 C50,80 70,60 100,60 C120,60 135,75 135,95 C135,115 120,130 100,130"
                          fill="none" stroke="url(#mobiusGrad)" stroke-width="8" stroke-linecap="round"/>
                    <path d="M100,180 C60,180 30,150 30,110 C30,70 60,40 100,40 C130,40 150,60 150,90 C150,120 130,140 100,140 C80,140 65,125 65,105 C65,85 80,70 100,70"
                          fill="none" stroke="url(#mobiusGrad)" stroke-width="8" stroke-linecap="round" opacity="0.6"/>
                  </svg>
                </div>
                <div class="time-display">{{ currentTime }}</div>
              </div>
              <!-- 下部分：过期信息 -->
              <div class="expired-section">
                <h4 class="expired-title">过期信息</h4>
                <div class="expired-list">
                  <div class="expired-item" v-for="item in expiredInfo" :key="item.name">
                    <div class="expired-name">{{ item.name }}</div>
                    <div class="expired-dates">
                      <div v-for="date in item.dates" :key="date" class="expired-date">{{ date }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 右栏：红头文件 -->
            <div class="notice-right">
              <div class="red-document">
                <h3 class="red-title">从前书院教务处文件</h3>
                <div class="red-line"></div>
                <h4 class="doc-subject">关于黄诗扶全国巡演（上海站）的通知</h4>
                <div class="doc-content">
                  <p>各书院学子、各级班长：</p>
                  <p>为庆祝本院杰出荣誉校友生辰，同时展示我院在古风音乐领域的至高艺术结晶。特向全体学子预告即将举办的2026年黄诗扶全国巡演上海站盛事。</p>
                  <div style="margin-bottom: 1rem; padding-left: 2rem;">
                    <strong style="display: block;">公演吉期：</strong>
                    <div style="padding-left: 2em; margin-top: 0.3rem; line-height: 1.8;">
                      2026 / 06 / 19 19:00<br>
                      2026 / 06 / 20 19:00
                    </div>
                  </div>
                  <p><strong>雅集地点：</strong> 上海市 · 交通银行前滩31演艺中心</p>
                  <p>望各班学子届时拨冗出席，共襄盛举。</p>
                  <div class="doc-stamp">
                    <p>从前书院教务处</p>
                    <p>2027年5月8日</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 校园概况 -->
      <section class="campus-overview section-padding">
        <div class="container">
          <div class="section-header text-center">
            <h2 class="title-primary">校园概况</h2>
          </div>
          <div class="overview-content">
            <p class="overview-text">
              从前书院，简称人院，坐落于美丽的入间省人梦市清醒县有座山镇今日无路，依山傍水，环境静谧。其前身是与四大书院齐名的大四书院，教改后更名为从前书院。书院占地面积共5.8亩，后倚有座山，前饮清水河，左木修，右池阔。院内画舫水榭、亭台楼阁错落其间，风光秀丽，景色宜人，有自然之趣而无喧嚣之扰，是广大学子潜心修学的好去处。书院内师资力量雄厚，院内教师在诗书画乐艺上均有较高水准，更有雄师两座立于门前。此外，书院教学成果显著，目前已入选KFC计划，多次斩获今日无路最佳书院头衔，是目前省内公认的办学水平最高的从前书院，同时也是世界范围内影响力最大的从前书院，目前已与上海音乐学院、上海戏剧学院、布里斯托大学等高等院校开展了深度交流合作。
            </p>
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
          <button class="entry-btn" @click="goToRecruit">
            <span>前往 · 招募与培养</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
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
  background-color: #C5A059;
  margin: 0 auto 1.5rem;
}

.subhero-motto {
  font-size: 1.1rem;
  letter-spacing: 3px;
  opacity: 0.9;
}

/* 两栏布局 */
.notice-two-col {
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 1.5rem;
  align-items: start;
}

.notice-left {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* 莫比乌斯环区域 */
.mobius-section {
  background: #fff;
  border: 1px solid rgba(200, 0, 0, 0.15);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mobius-container {
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobius-svg {
  width: 100%;
  height: 100%;
}

.time-display {
  font-size: 0.85rem;
  color: #666;
  letter-spacing: 1px;
  margin-top: 0.5rem;
  font-family: monospace;
}

/* 过期信息区域 */
.expired-section {
  background: #fff;
  border: 1px solid rgba(200, 0, 0, 0.15);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  max-height: 240px;
}

.expired-title {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.8rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.expired-list {
  overflow-y: auto;
  flex: 1;
  padding-right: 0.5rem;
}

.expired-list::-webkit-scrollbar {
  width: 4px;
}

.expired-list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.expired-list::-webkit-scrollbar-thumb {
  background: #C5A059;
  border-radius: 2px;
}

.expired-item {
  margin-bottom: 0.8rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px dashed #eee;
}

.expired-item:last-child {
  border-bottom: none;
}

.expired-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 0.3rem;
}

.expired-dates {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.expired-date {
  font-size: 0.8rem;
  color: #888;
}

/* 校园概况 */
.campus-overview {
  background: linear-gradient(to bottom, #f5f0e6, #fdfbf7);
}

.overview-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  background: #fff;
  border: 1px solid #e2dac9;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
}

.overview-text {
  font-size: 1rem;
  line-height: 2;
  color: #444;
  text-align: justify;
  text-indent: 2em;
}

/* 红头文件装潢 */
.red-document {
  background: #fff;
  padding: 2rem;
  border: 1px solid rgba(200, 0, 0, 0.15);
  box-shadow: inset 0 0 50px rgba(200, 0, 0, 0.02), 0 10px 40px rgba(0, 0, 0, 0.03);
}

.red-title {
  color: #b71c1c;
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
  font-family: "SimHei", "Microsoft YaHei", sans-serif;
  letter-spacing: 6px;
}

.red-line {
  height: 4px;
  background: #b71c1c;
  margin: 1.5rem 0 2.5rem;
  box-shadow: 0 2px 0 rgba(183, 28, 28, 0.3);
}

.doc-subject {
  text-align: center;
  font-size: 1.2rem;
  color: #111;
  font-weight: 600;
  margin-bottom: 2rem;
}

.doc-content p {
  margin-bottom: 0.8rem;
  font-size: 1rem;
  color: #222;
}

.doc-content>p {
  text-indent: 2rem;
}

.doc-content p strong {
  color: #000;
}

.doc-stamp {
  margin-top: 3rem;
  text-align: right;
  font-size: 1rem;
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
  font-size: 1.4rem;
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
  font-size: 1.5rem;
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
  font-size: 0.8rem;
  color: #C5A059;
  letter-spacing: 2px;
  margin-bottom: 0.8rem;
}

.prog-title {
  color: #0f1719;
  font-size: 1.15rem;
  margin-bottom: 1.2rem;
}

.prog-status {
  font-size: 0.85rem;
  color: #999;
  border-top: 1px solid #eee;
  padding-top: 0.8rem;
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
  padding: 0.8rem 2rem;
  font-family: "Noto Serif SC", "STSong", "SimSun", serif;
  font-size: 1rem;
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

/* 桌面端/移动端切换 */
.desktop-only {
  display: inline-flex;
}

.mobile-only {
  display: none;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .subhero {
    height: 350px;
  }

  .subhero-title {
    font-size: 1.8rem;
  }

  .notice-two-col {
    grid-template-columns: 2fr 3fr;
    gap: 0.75rem;
    align-items: start;
  }

  .notice-left {
    order: 1;
    display: flex;
    flex-direction: column;
  }

  .notice-right {
    order: 2;
  }

  .mobius-section {
    padding: 0.5rem;
  }

  .time-display {
    font-size: 0.7rem;
  }

  .expired-section {
    padding: 0.75rem;
    max-height: 180px;
  }

  .expired-title {
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
  }

  .expired-name {
    font-size: 0.8rem;
  }

  .expired-date {
    font-size: 0.75rem;
  }

  .red-document {
    padding: 0.75rem;
  }

  .red-title {
    font-size: 1.1rem;
    letter-spacing: 3px;
  }

  .red-line {
    margin: 0.75rem 0 1rem;
  }

  .doc-subject {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .doc-content p {
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
  }

  .doc-stamp {
    margin-top: 1.5rem;
    font-size: 0.8rem;
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
