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

/* 联系方式 */
.contact-list {
  max-width: 600px;
  margin: 3rem auto 0;
}

.contact-item {
  display: flex;
  align-items: baseline;
  gap: 1.5rem;
  padding: 1.2rem 0;
  border-bottom: 1px solid #e2dac9;
}

.contact-item:last-child {
  border-bottom: none;
}

.contact-label {
  font-size: 0.85rem;
  color: #C5A059;
  letter-spacing: 3px;
  white-space: nowrap;
  flex-shrink: 0;
}

.contact-value {
  font-size: 1rem;
  color: #0f1719;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .subhero { height: 260px; }
  .subhero-title { font-size: 1.8rem; }
  .contact-item { flex-direction: column; gap: 0.3rem; }
}
</style>
