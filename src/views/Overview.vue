<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

const currentTime = ref('');
let timer: number | null = null;
let resizeObserver: ResizeObserver | null = null;

const noticeLeft = ref<HTMLElement | null>(null);
const mobiusSection = ref<HTMLElement | null>(null);
const redDocument = ref<HTMLElement | null>(null);
const timeDisplayEl = ref<HTMLElement | null>(null);
const redTitleEl = ref<HTMLElement | null>(null);
const expiredSectionHeight = ref('');
const showNoticeBar = ref(false);

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

const updateExpiredSectionHeight = () => {
  const left = noticeLeft.value;
  const mobius = mobiusSection.value;
  const red = redDocument.value;
  if (!left || !mobius || !red) return;

  const styles = window.getComputedStyle(left);
  const gap = parseFloat(styles.rowGap || styles.gap || '0');
  const height = red.offsetHeight - mobius.offsetHeight - gap;
  expiredSectionHeight.value = height > 0 ? `${height}px` : '';
};

const updateNoticeBarVisibility = () => {
  const timeEl = timeDisplayEl.value;
  const titleEl = redTitleEl.value;
  if (!timeEl || !titleEl) { showNoticeBar.value = false; return; }
  const triggerTop = window.innerWidth <= 768 ? 100 : 76;
  showNoticeBar.value = timeEl.getBoundingClientRect().bottom <= triggerTop && titleEl.getBoundingClientRect().bottom <= triggerTop;
};

onMounted(() => {
  updateTime();
  timer = window.setInterval(updateTime, 1000);
  nextTick(() => {
    updateExpiredSectionHeight();
    updateNoticeBarVisibility();
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => { updateExpiredSectionHeight(); updateNoticeBarVisibility(); });
      if (mobiusSection.value) resizeObserver.observe(mobiusSection.value);
      if (redDocument.value) resizeObserver.observe(redDocument.value);
    }
  });
  window.addEventListener('scroll', updateNoticeBarVisibility);
  window.addEventListener('resize', updateExpiredSectionHeight);
  window.addEventListener('resize', updateNoticeBarVisibility);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
  window.removeEventListener('scroll', updateNoticeBarVisibility);
  window.removeEventListener('resize', updateExpiredSectionHeight);
  window.removeEventListener('resize', updateNoticeBarVisibility);
  resizeObserver?.disconnect();
});

const getDateSortValue = (date: string) => {
  const [year, month, day] = date.split('/').map(Number);
  return new Date(year, month - 1, day).getTime();
};

const getExpiredInfoSortValue = (dates: string[]) => {
  const sortDate = dates[dates.length - 1] ?? dates[0] ?? '1970/01/01';
  return getDateSortValue(sortDate);
};

const expiredInfo = [
  { name: '人间·广州站', dates: ['2023/05/02'] },
  { name: '人间·武汉站', dates: ['2023/06/10'] },
  { name: '人间·成都站', dates: ['2023/06/17'] },
  { name: '人间·南京站', dates: ['2023/06/22'] },
  { name: '人间·西安站', dates: ['2023/07/08'] },
  { name: '人间·沈阳站', dates: ['2023/08/05'] },
  { name: '人间·福州站', dates: ['2023/08/19'] },
  { name: '人间·杭州站', dates: ['2023/08/26'] },
  { name: '人间·北京站', dates: ['2023/09/09'] },
  { name: '人间·重庆站', dates: ['2023/09/23'] },
  { name: '人间·上海站', dates: ['2023/09/30'] },
  { name: '人间·长沙站', dates: ['2023/10/05'] },
  { name: '入梦·杭州站', dates: ['2025/06/28'] },
  { name: '入梦·济南站', dates: ['2025/08/02'] },
  { name: '入梦·成都站', dates: ['2025/08/23'] },
  { name: '入梦·武汉站', dates: ['2025/10/04', '2025/10/06'] },
  { name: '入梦·苏州站', dates: ['2025/12/06', '2025/12/07'] },
  { name: '入梦·深圳站', dates: ['2026/03/21', '2026/03/22'] },
  { name: '入梦·北京站', dates: ['2026/04/30', '2026/05/01'] },
  { name: '入梦·上海站', dates: ['2026/06/19', '2026/06/20'] },
].sort((a, b) => getExpiredInfoSortValue(b.dates) - getExpiredInfoSortValue(a.dates));
</script>

<template>
  <div class="overview-page">
    <div v-if="showNoticeBar" class="notice-frozen-bar">
      <div class="notice-frozen-content">
        <div class="notice-frozen-time">{{ currentTime }}</div>
        <div class="notice-frozen-title">从前书院教务处文件</div>
      </div>
    </div>

    <section class="subhero">
      <div class="subhero-bg" style="background-image: url('/hero.png');"></div>
      <div class="subhero-overlay"></div>
      <div class="subhero-content">
        <h1 class="subhero-title">学校概况</h1>
        <div class="subhero-divider"></div>
        <p class="subhero-motto">相信爱永存 · 感谢传统文化带来的力量</p>
      </div>
    </section>

    <div class="main-body">

      <!-- 红头文件通知 -->
      <section class="notice-section section-padding bg-paper">
        <div class="container">
          <div class="notice-two-col">
            <div class="notice-left" ref="noticeLeft">
              <div class="mobius-section" ref="mobiusSection">
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
                          fill="none" stroke="url(#mobiusGrad)" stroke-width="8" stroke-linecap="round" />
                    <path d="M100,180 C60,180 30,150 30,110 C30,70 60,40 100,40 C130,40 150,60 150,90 C150,120 130,140 100,140 C80,140 65,125 65,105 C65,85 80,70 100,70"
                          fill="none" stroke="url(#mobiusGrad)" stroke-width="8" stroke-linecap="round" opacity="0.6" />
                  </svg>
                </div>
                <div class="time-display" ref="timeDisplayEl">{{ currentTime }}</div>
              </div>
              <div class="expired-section" :style="expiredSectionHeight ? { height: expiredSectionHeight } : undefined">
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
            <div class="notice-right">
              <div class="red-document" ref="redDocument">
                <h3 class="red-title" ref="redTitleEl">从前书院教务处文件</h3>
                <div class="red-line"></div>
                <h4 class="doc-subject">关于黄诗扶全国巡演（上海站）的通知</h4>
                <div class="doc-content">
                  <p>各书院学子、各级班长：</p>
                  <p>为庆祝本院杰出荣誉校友生辰，同时展示我院在古风音乐领域的至高艺术结晶。特向全体学子预告即将举办的2026年黄诗扶全国巡演上海站盛事。</p>
                  <div class="doc-date-section">
                    <strong class="doc-date-label">公演吉期：</strong>
                    <div class="doc-date-list">
                      <div>2026 / 06 / 19 19:00</div>
                      <div>2026 / 06 / 20 19:00</div>
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
            <h2 class="title-primary">书院概况</h2>
          </div>
          <div class="overview-content">
            <p class="overview-text">
              从前书院，简称人院，坐落于美丽的入间省人梦市清醒县有座山镇今日无路，依山傍水，环境静谧。其前身是与四大书院齐名的大四书院，教改后更名为从前书院。书院占地面积共5.8亩，后倚有座山，前饮清水河，左木修，右池阔。院内画舫水榭、亭台楼阁错落其间，风光秀丽，景色宜人，有自然之趣而无喧嚣之扰，是广大学子潜心修学的好去处。书院内师资力量雄厚，院内教师在诗书画乐艺上均有较高水准，更有雄师两座立于门前。此外，书院教学成果显著，目前已入选KFC计划，多次斩获今日无路最佳书院头衔，是目前省内公认的办学水平最高的从前书院，同时也是世界范围内影响力最大的从前书院，目前已与上海音乐学院、上海戏剧学院、布里斯托大学等高等院校开展了深度交流合作。
            </p>
          </div>
        </div>
      </section>

      <!-- 校训·精神·理念 -->
      <section class="motto-section section-padding bg-paper">
        <div class="container">
          <div class="section-header text-center">
            <h2 class="title-primary">立校之本</h2>
            <p class="subtitle-primary">勤学好诗 · 知行合一</p>
          </div>
          <div class="motto-cards">
            <div class="motto-card">
              <div class="motto-label">校训</div>
              <div class="motto-text">勤学好诗，爱国爱扶</div>
              <div class="motto-divider"></div>
              <p class="motto-desc">以勤治学，以诗修身；心系家国，以爱扶人。</p>
            </div>
            <div class="motto-card motto-card-dark">
              <div class="motto-label">学校精神</div>
              <div class="motto-text">以诗为本，以扶为怀，知行合一</div>
              <div class="motto-divider"></div>
              <p class="motto-desc">诗为根本，扶济苍生，所学即所行，所行即所信。</p>
            </div>
            <div class="motto-card">
              <div class="motto-label">教育理念</div>
              <div class="motto-text">人间最值得，醒来多加餐</div>
              <div class="motto-divider"></div>
              <p class="motto-desc">人间值得留恋，醒后仍需加餐——以乐观之心面对世间，以务实之态耕耘自我。</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 校史拾遗与荣誉校友 -->
      <section class="history-alumni-section section-padding">
        <div class="container split-layout">
          <div class="split-col">
            <div class="section-header">
              <h2 class="title-primary">校史拾遗</h2>
              <p class="subtitle-primary">从大四书院到从前书院</p>
            </div>
            <div class="elegant-card h-full">
              <h3 class="card-title">道阻且长，行则将至</h3>
              <p class="mt-4 text-detail">
                从前书院的前身大四书院，曾与四大书院齐名于世。历经教改，更名为从前书院，薪火相传，弦歌不辍。从最初的筚路蓝缕到如今的桃李满天下，书院始终秉持"以诗为本，以扶为怀"之精神，在国风音乐与传统文化领域深耕不辍，终成今日之规模与声望。
              </p>
            </div>
          </div>
          <div class="split-col">
            <div class="section-header">
              <h2 class="title-primary">荣誉校友</h2>
              <p class="subtitle-primary">书院之光，学子楷模</p>
            </div>
            <div class="elegant-card elegant-card-dark h-full">
              <h3 class="card-title text-gold">黄诗扶</h3>
              <p class="tagline mt-2">国风歌者 / 古风音乐人 / 诗意唱作人</p>
              <ul class="resume-list mt-4">
                <li><strong>代表作品：</strong>《九万字》《人间不值得》《杨花落尽》《人间朝暮》等</li>
                <li><strong>艺术成就：</strong>以独特的诗意嗓音与深厚的文化底蕴，在国风音乐领域独树一帜</li>
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
            <p class="subtitle-primary">依山傍水，潜心修学</p>
          </div>
          <div class="env-image"
            style="background-image: url('/campus.png'); background-size: cover; background-position: center; border: 1px solid #e2dac9; position: relative; width: 100%; height: 400px;">
            <div
              style="position: absolute; bottom: 0; left: 0; width: 100%; background: linear-gradient(transparent, rgba(15,23,25,0.9)); padding: 2rem;">
              <h3 style="color: #C5A059; font-size: 1.4rem; margin-bottom: 0.2rem;">校园环境</h3>
              <p style="color: #eee; font-size: 0.95rem;">后倚有座山，前饮清水河，左木修，右池阔</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<style scoped>
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
  background-color: #C5A059;
  margin: 0 auto 1.5rem;
}

.subhero-motto {
  font-size: 1.1rem;
  letter-spacing: 3px;
  opacity: 0.9;
}

.overview-page {
  --notice-frozen-top: 4.75rem;
}

.notice-frozen-bar {
  position: fixed;
  top: var(--notice-frozen-top);
  left: 0;
  width: 100%;
  z-index: 950;
  background: rgba(253, 251, 247, 0.97);
  border-bottom: 1px solid rgba(183, 28, 28, 0.12);
  box-shadow: 0 8px 20px rgba(15, 23, 25, 0.08);
  backdrop-filter: blur(10px);
}

.notice-frozen-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0.6rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.notice-frozen-time {
  color: #666;
  font-size: 1.28rem;
  letter-spacing: 1px;
  font-family: monospace;
  white-space: nowrap;
}

.notice-frozen-title {
  min-width: 0;
  color: #b71c1c;
  font-size: 1.1rem;
  text-align: right;
  font-weight: bold;
  font-family: "SimHei", "Microsoft YaHei", sans-serif;
  letter-spacing: 4px;
  white-space: nowrap;
}

.notice-two-col {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 1.5rem;
  align-items: start;
}

.notice-left {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

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

.mobius-svg { width: 100%; height: 100%; }

.time-display {
  font-size: 1rem;
  color: #666;
  letter-spacing: 1px;
  margin-top: 0.5rem;
  font-family: monospace;
}

.expired-section {
  background: #fff;
  border: 1px solid rgba(200, 0, 0, 0.15);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  min-height: 0;
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
  min-height: 0;
  padding-right: 0.5rem;
}

.expired-list::-webkit-scrollbar { width: 4px; }
.expired-list::-webkit-scrollbar-track { background: #f1f1f1; }
.expired-list::-webkit-scrollbar-thumb { background: #C5A059; border-radius: 2px; }

.expired-item {
  margin-bottom: 0.8rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px dashed #eee;
}

.expired-item:last-child { border-bottom: none; }

.expired-name { font-weight: 600; font-size: 0.9rem; color: #333; margin-bottom: 0.3rem; }

.expired-dates { display: flex; flex-direction: column; gap: 0.2rem; }

.expired-date { font-size: 0.8rem; color: #888; }

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

/* 立校之本 */
.motto-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}

.motto-card {
  background: #fff;
  padding: 2.5rem 2rem;
  border-top: 3px solid #0f1719;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.03);
  text-align: center;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.motto-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.06);
}

.motto-card-dark {
  background: #0f1719;
  color: #fff;
  border-top: 3px solid #C5A059;
}

.motto-label {
  font-size: 0.85rem;
  color: #C5A059;
  letter-spacing: 3px;
  margin-bottom: 1.2rem;
}

.motto-card-dark .motto-label { color: #C5A059; }

.motto-text {
  font-size: 1.3rem;
  font-weight: 600;
  color: #0f1719;
  letter-spacing: 2px;
  line-height: 1.8;
}

.motto-card-dark .motto-text { color: #fff; }

.motto-divider {
  width: 40px;
  height: 2px;
  background: #C5A059;
  margin: 1.2rem auto;
}

.motto-desc {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.8;
}

.motto-card-dark .motto-desc { color: #aaa; }

/* 红头文件 */
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
  text-indent: 2em;
}

.doc-content p strong { color: #000; }

.doc-date-section { margin-bottom: 0.8rem; }

.doc-date-label {
  display: block;
  font-size: 1rem;
  color: #000;
  padding-left: 2em;
}

.doc-date-list {
  padding-left: 2em;
  margin-top: 0.3rem;
  line-height: 1.8;
  font-size: 1rem;
  color: #222;
}

.doc-stamp {
  margin-top: 3rem;
  text-align: right;
  font-size: 1rem;
  font-weight: 600;
  color: #111;
}

/* 优雅卡片 */
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

.card-title { font-size: 1.4rem; margin-bottom: 0.5rem; }

.env-image { border-radius: 4px; }

.tagline { font-size: 0.95rem; color: #aaa; letter-spacing: 1px; }

@media (max-width: 768px) {
  .subhero { height: 350px; }
  .subhero-title { font-size: 1.8rem; }
  .overview-page { --notice-frozen-top: 6.25rem; }
  .notice-frozen-content { padding: 0.5rem 1rem; gap: 0.75rem; }
  .notice-frozen-time { font-size: 0.78rem; }
  .notice-frozen-title { font-size: 0.88rem; letter-spacing: 2px; }
  .notice-two-col { grid-template-columns: 2fr 3fr; gap: 0.75rem; align-items: start; }
  .mobius-section { padding: 0.5rem; }
  .time-display { font-size: 0.7rem; }
  .expired-section { padding: 0.75rem; }
  .expired-title { font-size: 0.85rem; margin-bottom: 0.5rem; }
  .expired-name { font-size: 0.8rem; }
  .expired-date { font-size: 0.75rem; }
  .red-document { padding: 0.75rem; }
  .red-title { font-size: 1.1rem; letter-spacing: 3px; }
  .red-line { margin: 0.75rem 0 1rem; }
  .doc-subject { font-size: 0.9rem; margin-bottom: 1rem; }
  .doc-content p { font-size: 0.85rem; margin-bottom: 0.5rem; text-indent: 2em; }
  .doc-date-section { margin-bottom: 0.5rem; }
  .doc-date-label { font-size: 0.85rem; }
  .doc-date-list { font-size: 0.85rem; }
  .doc-stamp { margin-top: 1.5rem; font-size: 0.85rem; }
  .env-image { height: 260px !important; }
  .motto-cards { grid-template-columns: 1fr; gap: 1.5rem; }
  .motto-card { padding: 2rem 1.5rem; }
}
</style>
