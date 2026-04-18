<script setup lang="ts">
</script>

<template>
  <div class="contact-page">
    <section class="subhero">
      <div class="subhero-bg" style="background-image: url('/hero.png');"></div>
      <div class="subhero-overlay"></div>
      <div class="subhero-content">
        <h1 class="subhero-title">联系我们</h1>
        <div class="subhero-divider"></div>
        <p class="subhero-motto">缘起从前 · 一见如故</p>
      </div>
    </section>

    <div class="main-body">
      <section class="section-padding bg-paper">
        <div class="container">
          <div class="section-header text-center">
            <h2 class="title-primary">联系方式</h2>
            <p class="subtitle-primary">人生难得一知音</p>
          </div>

          <div class="contact-layout">
            <div class="contact-main">
              <div class="contact-card">
                <h3 class="contact-card-title">从前书院招生办</h3>
                <div class="contact-divider"></div>
                <div class="contact-list">
                  <div class="contact-item">
                    <span class="contact-label">地址</span>
                    <span class="contact-value">入间省人梦市清醒县有座山镇今日无路从前书院</span>
                  </div>
                  <div class="contact-item">
                    <span class="contact-label">邮箱</span>
                    <span class="contact-value">0508huangshifuhappy@birth.day.com</span>
                  </div>
                  <div class="contact-item">
                    <span class="contact-label">电话</span>
                    <span class="contact-value">0508-728370-01</span>
                  </div>
                  <div class="contact-item">
                    <span class="contact-label">纳税号</span>
                    <span class="contact-value">8181897268748467</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="contact-side">
              <div class="side-card">
                <h3 class="side-card-title">招聘处</h3>
                <p class="side-card-desc">有意者请联系从前书院招聘处，人生难得一知音。</p>
                <div class="side-card-info">
                  <p><strong>邮箱</strong> 0508huangshifuhappy@birth.day.com</p>
                  <p><strong>电话</strong> 0508-728370-01</p>
                </div>
              </div>

              <div class="side-card side-card-dark">
                <h3 class="side-card-title">校训</h3>
                <p class="side-card-motto">勤学好诗<br/>爱国爱扶</p>
              </div>
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

/* 联系布局 */
.contact-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2.5rem;
  margin-top: 3rem;
}

.contact-card {
  background: #e5d1a7;
  color: #0f1719;
  padding: 3rem;
}

.contact-card-title {
  font-size: 1.5rem;
  letter-spacing: 3px;
  margin-bottom: 0.5rem;
}

.contact-divider {
  width: 40px;
  height: 2px;
  background: #0f1719;
  margin: 1rem 0 2rem;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.contact-label {
  font-size: 0.85rem;
  color: #555;
  letter-spacing: 2px;
  font-weight: 600;
}

.contact-value {
  font-size: 1.05rem;
  color: #0f1719;
  line-height: 1.6;
}

/* 侧边栏 */
.side-card {
  background: #fff;
  padding: 2rem;
  border: 1px solid #e2dac9;
  margin-bottom: 1.5rem;
}

.side-card-dark {
  background: #0f1719;
  color: #fff;
  border-color: #0f1719;
}

.side-card-title {
  font-size: 1rem;
  color: #C5A059;
  letter-spacing: 2px;
  margin-bottom: 1rem;
}

.side-card-desc {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.8;
  margin-bottom: 1rem;
}

.side-card-dark .side-card-desc { color: #aaa; }

.side-card-info p {
  font-size: 0.9rem;
  color: #444;
  margin-bottom: 0.5rem;
}

.side-card-info strong {
  display: inline-block;
  width: 3rem;
  color: #0f1719;
}

.side-card-motto {
  font-size: 1.3rem;
  color: #C5A059;
  letter-spacing: 4px;
  line-height: 2;
  text-align: center;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .subhero { height: 260px; }
  .subhero-title { font-size: 1.8rem; }
  .contact-layout { grid-template-columns: 1fr; }
  .contact-card { padding: 2rem 1.5rem; }
  .side-card { padding: 1.5rem; }
}
</style>
