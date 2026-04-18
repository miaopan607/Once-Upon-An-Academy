<script setup lang="ts">
const getDateSortValue = (date: string) => {
  const [year, month, day] = date.split('/').map(Number);
  return new Date(year, month - 1, day).getTime();
};

const getExpiredInfoSortValue = (dates: string[]) => {
  const sortDate = dates[dates.length - 1] ?? dates[0] ?? '1970/01/01';
  return getDateSortValue(sortDate);
};

const tours = [
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
  <div class="admission-page">
    <section class="subhero">
      <div class="subhero-bg" style="background-image: url('/hero.png');"></div>
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

          <div class="tour-grid">
            <div class="tour-card" v-for="item in tours" :key="item.name">
              <div class="tour-name">{{ item.name }}</div>
              <div class="tour-dates">
                <span class="tour-date" v-for="date in item.dates" :key="date">{{ date }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 新闻报道 -->
      <section class="section-padding">
        <div class="container">
          <div class="section-header text-center">
            <h2 class="title-primary">新闻报道</h2>
            <p class="subtitle-primary">媒体报道与采访</p>
          </div>

          <div class="placeholder-section">
            <div class="placeholder-card">
              <div class="placeholder-icon">📰</div>
              <h3 class="placeholder-title">资料整理中</h3>
              <p class="placeholder-desc">新闻报道与采访数据正在收集中，敬请期待。</p>
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

/* 巡演数据 */
.tour-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
  margin-top: 3rem;
}

.tour-card {
  background: #fff;
  padding: 1.5rem;
  border: 1px solid #e2dac9;
  transition: all 0.3s ease;
}

.tour-card:hover {
  border-color: #C5A059;
  box-shadow: 0 8px 20px rgba(197, 160, 89, 0.1);
  transform: translateY(-2px);
}

.tour-name {
  font-size: 1rem;
  font-weight: 600;
  color: #0f1719;
  margin-bottom: 0.5rem;
}

.tour-dates {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tour-date {
  font-size: 0.8rem;
  color: #888;
  background: #f5f0e6;
  padding: 2px 8px;
  border-radius: 3px;
}

/* 占位 */
.placeholder-section {
  max-width: 600px;
  margin: 4rem auto 0;
}

.placeholder-card {
  background: #fff;
  padding: 4rem 3rem;
  border: 1px solid #e2dac9;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
}

.placeholder-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.placeholder-title {
  font-size: 1.3rem;
  color: #0f1719;
  letter-spacing: 3px;
  margin-bottom: 0.8rem;
}

.placeholder-desc {
  font-size: 0.95rem;
  color: #888;
  line-height: 1.8;
}

@media (max-width: 768px) {
  .subhero { height: 260px; }
  .subhero-title { font-size: 1.8rem; }
  .tour-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
  .tour-card { padding: 1rem; }
  .tour-name { font-size: 0.9rem; }
  .placeholder-card { padding: 3rem 2rem; }
}
</style>
