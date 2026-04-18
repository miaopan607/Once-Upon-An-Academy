<script setup lang="ts">
</script>

<template>
  <div class="research-page">
    <section class="subhero">
      <div class="subhero-bg" style="background-image: url('/hero.png');"></div>
      <div class="subhero-overlay"></div>
      <div class="subhero-content">
        <h1 class="subhero-title">学术研究</h1>
        <div class="subhero-divider"></div>
        <p class="subhero-motto">诗以载道 · 学以致用</p>
      </div>
    </section>

    <div class="main-body">
      <section class="section-padding bg-paper">
        <div class="container">
          <div class="section-header text-center">
            <h2 class="title-primary">研究成果</h2>
            <p class="subtitle-primary">黄诗扶歌曲数据</p>
          </div>

          <div class="placeholder-section">
            <div class="placeholder-card">
              <div class="placeholder-icon">📚</div>
              <h3 class="placeholder-title">资料整理中</h3>
              <p class="placeholder-desc">歌曲数据正在收集中，敬请期待。</p>
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
  .placeholder-card { padding: 3rem 2rem; }
}
</style>
