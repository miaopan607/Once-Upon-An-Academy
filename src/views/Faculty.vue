<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const colleges = [
  {
    name: '音乐学院',
    desc: '（描述）',
    mentors: [
      { name: '（导师姓名）', photo: '/images/placeholder-mentor.jpg', desc: '（描述）' },
      { name: '（导师姓名）', photo: '/images/placeholder-mentor.jpg', desc: '（描述）' }
    ]
  },
  {
    name: '美术学院',
    desc: '（描述）',
    mentors: [
      { name: '（导师姓名）', photo: '/images/placeholder-mentor.jpg', desc: '（描述）' },
      { name: '（导师姓名）', photo: '/images/placeholder-mentor.jpg', desc: '（描述）' }
    ]
  },
  {
    name: '文学学院',
    desc: '（描述）',
    mentors: [
      { name: '（导师姓名）', photo: '/images/placeholder-mentor.jpg', desc: '（描述）' },
      { name: '（导师姓名）', photo: '/images/placeholder-mentor.jpg', desc: '（描述）' }
    ]
  },
  {
    name: '体育学院',
    desc: '（描述）',
    mentors: [
      { name: '（导师姓名）', photo: '/images/placeholder-mentor.jpg', desc: '（描述）' },
      { name: '（导师姓名）', photo: '/images/placeholder-mentor.jpg', desc: '（描述）' }
    ]
  },
  {
    name: '藏经阁',
    desc: '（描述）',
    mentors: [
      { name: '（导师姓名）', photo: '/images/placeholder-mentor.jpg', desc: '（描述）' }
    ]
  }
];
</script>

<template>
  <div class="faculty-page">
    <section class="subhero">
      <div class="subhero-bg" style="background-image: url('/hero.jpg');"></div>
      <div class="subhero-overlay"></div>
      <div class="subhero-content">
        <h1 class="subhero-title">学院介绍</h1>
        <div class="subhero-divider"></div>
        <p class="subhero-motto">五院并立 · 各展其长</p>
      </div>
    </section>

    <div class="main-body">
      <!-- 人才引进公告 -->
      <section class="section-padding bg-paper">
        <div class="container">
          <div class="recruit-notice">
            <h3 class="recruit-notice-title">从前书院人才引进公告</h3>
            <div class="recruit-notice-body">
              <p>为汇聚优质人才，现面向卿卿领域诚聘英才。学院提供优厚待遇、创作资源与发展平台，凡专业突出、认同本院理念者均可应聘，择优聘任。</p>
              <p>若有脱颖而出的卿卿老师，我院会引进成为青年教授，收入可观，年入物料最低可达3吨。</p>
              <p>有意者请联系从前书院招聘处，人生难得一知音。</p>
            </div>
            <div class="recruit-notice-contact">
              <span>邮箱：0508huangshifuhappy@birth.day.com</span>
              <span>电话：0508-728370-01</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 五大学院介绍 -->
      <section class="section-padding" v-for="(college, idx) in colleges" :key="college.name" :class="idx % 2 === 1 ? 'bg-alt' : ''">
        <div class="container">
          <div class="college-block">
            <div class="college-intro">
              <div class="section-header">
                <h2 class="title-primary">{{ college.name }}</h2>
              </div>
              <p class="college-desc">{{ college.desc }}</p>
            </div>
            <div class="college-mentors">
              <div class="mentor-card" v-for="mentor in college.mentors" :key="mentor.name">
                <div class="mentor-photo">
                  <img :src="mentor.photo" :alt="mentor.name" />
                </div>
                <div class="mentor-info">
                  <h3 class="mentor-name">{{ mentor.name }}</h3>
                  <p class="mentor-desc">{{ mentor.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 底部入口 -->
      <section class="page-entry section-padding">
        <div class="container text-center">
          <button class="entry-btn" @click="router.push('/talent')">
            <span>前往 · 人才培养</span>
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

/* 人才引进公告 */
.recruit-notice {
  max-width: 800px;
  margin: 3rem auto 0;
}

.recruit-notice-title {
  font-size: 1.4rem;
  color: #0f1719;
  letter-spacing: 4px;
  text-align: center;
  padding-bottom: 1.2rem;
  border-bottom: 2px solid #0f1719;
  margin-bottom: 2rem;
}

.recruit-notice-body p {
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #333;
  line-height: 2;
  text-indent: 2em;
  text-align: justify;
}

.recruit-notice-contact {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px dashed #e2dac9;
  display: flex;
  gap: 2rem;
  font-size: 0.9rem;
  color: #555;
  letter-spacing: 1px;
}

/* 学院介绍区块 */
.college-block {
  max-width: 900px;
  margin: 0 auto;
}

.college-intro {
  margin-bottom: 3rem;
}

.college-desc {
  font-size: 1rem;
  line-height: 2;
  color: #444;
  text-align: justify;
  text-indent: 2em;
  margin-top: 1.5rem;
}

/* 导师卡片 */
.college-mentors {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.mentor-card {
  background: #fff;
  border: 1px solid #e2dac9;
  display: flex;
  gap: 1.5rem;
  padding: 2rem;
  transition: all 0.4s ease;
}

.mentor-card:hover {
  border-color: #0f1719;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.06);
}

.mentor-photo {
  width: 90px;
  height: 120px;
  flex-shrink: 0;
  overflow: hidden;
  border: 2px solid #e2dac9;
}

.mentor-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mentor-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.mentor-name {
  font-size: 1.15rem;
  color: #0f1719;
  font-weight: 600;
  letter-spacing: 2px;
  margin-bottom: 0.6rem;
}

.mentor-desc {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.8;
  text-align: justify;
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
  .recruit-notice-contact { flex-direction: column; gap: 0.5rem; }
  .college-mentors { grid-template-columns: 1fr; }
  .mentor-card { flex-direction: column; align-items: center; text-align: center; }
  .mentor-photo { width: 75px; height: 100px; }
  .mentor-desc { text-align: center; }
  .page-entry { padding: 3rem 0 2rem; }
}
</style>
