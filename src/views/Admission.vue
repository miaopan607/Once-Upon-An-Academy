<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const getDateSortValue = (date: string) => {
  const [year, month, day] = date.split('/').map(Number);
  return new Date(year, month - 1, day).getTime();
};

const tours = [
  { name: '人间巡演', venue: '广州站', dates: ['2023/05/02'], tour: '人间' },
  { name: '人间巡演', venue: '武汉站', dates: ['2023/06/10'], tour: '人间' },
  { name: '人间巡演', venue: '成都站', dates: ['2023/06/17'], tour: '人间' },
  { name: '人间巡演', venue: '南京站', dates: ['2023/06/22'], tour: '人间' },
  { name: '人间巡演', venue: '西安站', dates: ['2023/07/08'], tour: '人间' },
  { name: '人间巡演', venue: '沈阳站', dates: ['2023/08/05'], tour: '人间' },
  { name: '人间巡演', venue: '福州站', dates: ['2023/08/19'], tour: '人间' },
  { name: '人间巡演', venue: '杭州站', dates: ['2023/08/26'], tour: '人间' },
  { name: '人间巡演', venue: '北京站', dates: ['2023/09/09'], tour: '人间' },
  { name: '人间巡演', venue: '重庆站', dates: ['2023/09/23'], tour: '人间' },
  { name: '人间巡演', venue: '上海站', dates: ['2023/09/30'], tour: '人间' },
  { name: '人间巡演', venue: '长沙站', dates: ['2023/10/05'], tour: '人间' },
  { name: '入梦巡演', venue: '杭州站', dates: ['2025/06/28'], tour: '入梦' },
  { name: '入梦巡演', venue: '济南站', dates: ['2025/08/02'], tour: '入梦' },
  { name: '入梦巡演', venue: '成都站', dates: ['2025/08/23'], tour: '入梦' },
  { name: '入梦巡演', venue: '武汉站', dates: ['2025/10/04', '2025/10/06'], tour: '入梦' },
  { name: '入梦巡演', venue: '苏州站', dates: ['2025/12/06', '2025/12/07'], tour: '入梦' },
  { name: '入梦巡演', venue: '深圳站', dates: ['2026/03/21', '2026/03/22'], tour: '入梦' },
  { name: '入梦巡演', venue: '北京站', dates: ['2026/04/30', '2026/05/01'], tour: '入梦' },
  { name: '入梦巡演', venue: '上海站', dates: ['2026/06/19', '2026/06/20'], tour: '入梦' },
].sort((a, b) => getDateSortValue(a.dates[0]) - getDateSortValue(b.dates[0]));
</script>

<template>
  <div class="admission-page">
    <section class="subhero">
      <div class="subhero-bg" style="background-image: url('/hero.jpg');"></div>
      <div class="subhero-overlay"></div>
      <div class="subhero-content">
        <h1 class="subhero-title">招生就业</h1>
        <div class="subhero-divider"></div>
        <p class="subhero-motto">广纳贤才 · 桃李天下</p>
      </div>
    </section>

    <div class="main-body">
      <!-- 登台演出数据 -->
      <section class="section-padding bg-paper">
        <div class="container">
          <div class="section-header text-center">
            <h2 class="title-primary">登台演出</h2>
            <p class="subtitle-primary">黄诗扶全国巡演纪录</p>
          </div>

          <div class="timeline-scroll">
            <div class="timeline-track">
              <div class="tl-item" v-for="(item, idx) in tours" :key="idx" :class="[
                  idx % 2 === 0 ? 'tl-item-above' : 'tl-item-below',
                  idx === 0 ? 'tl-item-first' : '',
                  idx === tours.length - 1 ? 'tl-item-last' : ''
                ]">
                <div class="tl-upper">
                  <template v-if="idx % 2 === 0">
                    <div class="tl-date">{{ item.dates[0] }}</div>
                    <div class="tl-extra-dates" v-if="item.dates.length > 1">
                      <span v-for="d in item.dates.slice(1)" :key="d">{{ d }}</span>
                    </div>
                  </template>
                  <template v-else>
                    <div class="tl-name">{{ item.name }}</div>
                    <div class="tl-venue">{{ item.venue }}</div>
                  </template>
                </div>
                <div class="tl-dot" :class="item.tour === '入梦' ? 'tl-dot-rumeng' : ''"></div>
                <div class="tl-lower">
                  <template v-if="idx % 2 === 0">
                    <div class="tl-name">{{ item.name }}</div>
                    <div class="tl-venue">{{ item.venue }}</div>
                  </template>
                  <template v-else>
                    <div class="tl-date">{{ item.dates[0] }}</div>
                    <div class="tl-extra-dates" v-if="item.dates.length > 1">
                      <span v-for="d in item.dates.slice(1)" :key="d">{{ d }}</span>
                    </div>
                  </template>
                </div>
              </div>
              <!-- timeline line drawn via .tl-dot pseudo-elements -->
            </div>
          </div>
        </div>
      </section>

      <!-- 底部入口 -->
      <section class="page-entry section-padding">
        <div class="container text-center">
          <button class="entry-btn" @click="router.push('/online-learning')">
            <span>前往 · 网上教学</span>
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
  background-color: #C5A059;
  margin: 0 auto 1.5rem;
}

.subhero-motto {
  font-size: 1.1rem;
  letter-spacing: 3px;
  opacity: 0.9;
}

/* 时间轴 - 横向 */
.timeline-scroll {
  margin-top: 3rem;
  overflow-x: auto;
  overflow-y: visible;
  padding: 0 0 2rem;
  position: relative;
}

.timeline-scroll::-webkit-scrollbar {
  height: 4px;
}

.timeline-scroll::-webkit-scrollbar-track {
  background: #e2dac9;
}

.timeline-scroll::-webkit-scrollbar-thumb {
  background: #C5A059;
}

.timeline-track {
  display: flex;
  align-items: center;
  min-width: max-content;
  padding: 0 2rem;
  position: relative;
}

/* 时间轴连接线：通过圆点伪元素绘制 */
.tl-dot::before,
.tl-dot::after {
  content: '';
  position: absolute;
  top: 50%;
  height: 2px;
  background: #e2dac9;
  transform: translateY(-50%);
  z-index: -1;
}

.tl-dot::before {
  right: 100%;
  width: calc(140px / 2);
}

.tl-dot::after {
  left: 100%;
  width: calc(140px / 2);
}

/* 第一站：左边不画线 */
.tl-item-first .tl-dot::before {
  display: none;
}

/* 最后一站：右边不画线 */
.tl-item-last .tl-dot::after {
  display: none;
}

.tl-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 140px;
  position: relative;
  z-index: 1;
}

.tl-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #C5A059;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
  box-shadow: 0 0 0 4px rgba(197, 160, 89, 0.15);
}

.tl-dot-rumeng {
  background: #a53222;
  box-shadow: 0 0 0 4px rgba(165, 50, 34, 0.15);
}

.tl-upper,
.tl-lower {
  text-align: center;
  padding: 0 0.5rem;
  height: 4.5rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.tl-upper {
  margin-bottom: 0.8rem;
  justify-content: flex-end;
}

.tl-lower {
  margin-top: 0.8rem;
  justify-content: flex-start;
}

.tl-date {
  font-size: 0.82rem;
  color: #888;
  letter-spacing: 1px;
  font-variant-numeric: tabular-nums;
}

.tl-name {
  font-size: 0.9rem;
  color: #0f1719;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 0.15rem;
}

.tl-venue {
  font-size: 0.8rem;
  color: #555;
  letter-spacing: 1px;
}

.tl-extra-dates {
  font-size: 0.82rem;
  color: #888;
  letter-spacing: 1px;
  margin-top: 0.1rem;
  font-variant-numeric: tabular-nums;
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

@media (max-width: 768px) {
  .subhero { height: 260px; }
  .subhero-title { font-size: 1.8rem; }
  .tl-item { min-width: 110px; }
  .tl-dot::before { width: calc(110px / 2); }
  .tl-dot::after { width: calc(110px / 2); }
  .tl-upper, .tl-lower { height: 3.5rem; }
  .page-entry { padding: 3rem 0 2rem; }
}
</style>
