<script setup lang="ts">
</script>

<template>
  <div class="academy-page">
    <section class="subhero">
      <div class="subhero-bg" style="background-image: url('/hero.png');"></div>
      <div class="subhero-overlay"></div>
      <div class="subhero-content">
        <h1 class="subhero-title">学院</h1>
        <div class="subhero-divider"></div>
        <p class="subhero-motto">内容建设中，敬请期待</p>
      </div>
    </section>

    <div class="main-body">
      <section class="section-padding bg-paper">
        <div class="container text-center">
          <p class="placeholder-text">学院介绍内容即将上线...</p>
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

.placeholder-text {
  font-size: 1.2rem;
  color: #666;
  padding: 4rem 0;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .subhero {
    height: 350px;
  }

  .subhero-title {
    font-size: 1.8rem;
  }
}
</style>
