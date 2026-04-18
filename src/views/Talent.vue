<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const scenes = [
  {
    course: '音乐',
    scene: '（嘿嘿想不出来叫什么）',
    mentors: '杜丽娘、柳梦梅',
    desc: '（描述）'
  },
  {
    course: '美术',
    scene: '（想不出来叫什么x2）',
    mentors: '贾宝玉、林黛玉',
    desc: '（描述）'
  },
  {
    course: '国学',
    scene: '文枢阁',
    mentors: '梁山伯、祝英台',
    desc: '（描述）'
  },
  {
    course: '劳技',
    scene: '掠影廊',
    mentors: '项羽、虞姬',
    desc: '（描述）'
  },
  {
    course: '入梦',
    scene: '藏经阁',
    mentors: '教书先生卿卿',
    desc: '（描述）'
  }
];

const coreCourses = [
  '黄诗扶入坑导学课',
  '声乐演唱与舞台表现',
  '词曲创作与编曲基础',
  '国风音乐赏析与创作'
];

const cultureCourses = [
  '古典诗词与文学',
  '琴棋诗画通识',
  '传统艺术鉴赏',
  '传统武术技能学习'
];

const practiceCourses = [
  '组织观看【入梦】幕剧音乐会',
  '作品录制与后期',
  '艺术策划与运营'
];
</script>

<template>
  <div class="talent-page">
    <section class="subhero">
      <div class="subhero-bg" style="background-image: url('/hero.png');"></div>
      <div class="subhero-overlay"></div>
      <div class="subhero-content">
        <h1 class="subhero-title">人才培养</h1>
        <div class="subhero-divider"></div>
        <p class="subhero-motto">德艺兼修 · 知行合一</p>
      </div>
    </section>

    <div class="main-body">
      <!-- 培养宗旨与能力 -->
      <section class="section-padding bg-paper">
        <div class="container">
          <div class="section-header text-center">
            <h2 class="title-primary">培养目标</h2>
          </div>

          <div class="goal-section">
            <div class="goal-item">
              <h3 class="goal-label">培养宗旨</h3>
              <p class="goal-text">旨在轻松学习，培养不摆烂不内卷的快乐学员。</p>
            </div>
            <div class="goal-item">
              <h3 class="goal-label">培养能力</h3>
              <p class="goal-text">本学院致力于培养兼具国风素养与专业能力的复合型艺术人才。致力于把学生打造成兼具琴棋书画之雅韵与词曲演唱、编曲创作技能的新型艺术人才。培养他们注重文化底蕴与艺术修养，秉持德艺兼修、知行合一的理念，能做到气质温润、功底扎实、富有情怀，成为兼具审美与创造力的新时代文艺人才。</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 学年计划 -->
      <section class="section-padding">
        <div class="container">
          <div class="section-header text-center">
            <h2 class="title-primary">学年计划</h2>
          </div>

          <div class="semester-layout">
            <div class="semester-half">
              <div class="semester-half-deco"></div>
              <h3 class="semester-half-label">上学期</h3>
              <p class="semester-half-name">书院学习</p>
              <p class="semester-half-desc">以书院学习为主，夯实专业与文化根基。</p>
            </div>
            <div class="semester-divider">
              <div class="semester-divider-line"></div>
              <div class="semester-divider-or">一学年</div>
              <div class="semester-divider-line"></div>
            </div>
            <div class="semester-half">
              <div class="semester-half-deco"></div>
              <h3 class="semester-half-label">下学期</h3>
              <p class="semester-half-name">课外实践</p>
              <p class="semester-half-desc">以课外实践为主，登台演出与项目实训。</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 书院五景 · 限定课程 -->
      <section class="section-padding bg-alt">
        <div class="container">
          <div class="section-header text-center">
            <h2 class="title-primary">书院五景 · 限定课程</h2>
            <p class="subtitle-primary">五处幻境，五堂必修。特邀名师入梦传道。</p>
          </div>

          <div class="scene-cards">
            <div class="scene-card" v-for="item in scenes" :key="item.course">
              <div class="scene-card-inner">
                <div class="scene-header">
                  <span class="course-name">{{ item.course }}</span>
                  <h3 class="scene-title">{{ item.scene }}</h3>
                </div>
                <div class="mentor-badge">
                  <span>特邀导师：</span><strong>{{ item.mentors }}</strong>
                </div>
                <p class="scene-desc">{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 课程体系 -->
      <section class="section-padding">
        <div class="container">
          <div class="section-header text-center">
            <h2 class="title-primary">课程体系</h2>
          </div>

          <div class="course-grid">
            <div class="course-section">
              <h3 class="course-section-title">专业核心课</h3>
              <div class="course-section-line"></div>
              <ol class="course-list">
                <li v-for="c in coreCourses" :key="c">{{ c }}</li>
              </ol>
            </div>
            <div class="course-section">
              <h3 class="course-section-title">文化素养课</h3>
              <div class="course-section-line"></div>
              <ol class="course-list">
                <li v-for="c in cultureCourses" :key="c">{{ c }}</li>
              </ol>
            </div>
            <div class="course-section">
              <h3 class="course-section-title">实践拓展课</h3>
              <div class="course-section-line"></div>
              <ol class="course-list">
                <li v-for="c in practiceCourses" :key="c">{{ c }}</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <!-- 底部入口 -->
      <section class="page-entry section-padding">
        <div class="container text-center">
          <button class="entry-btn" @click="router.push('/research')">
            <span>前往 · 学术研究</span>
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

/* 培养目标 */
.goal-section {
  max-width: 800px;
  margin: 3rem auto 0;
}

.goal-item {
  padding: 1.5rem 0;
  border-bottom: 1px solid #e2dac9;
}

.goal-item:last-child {
  border-bottom: none;
}

.goal-label {
  font-size: 0.85rem;
  color: #C5A059;
  letter-spacing: 3px;
  margin-bottom: 0.8rem;
}

.goal-text {
  font-size: 1rem;
  line-height: 2;
  color: #444;
  text-align: justify;
  text-indent: 2em;
}

/* 学年计划 */
.semester-layout {
  max-width: 800px;
  margin: 3rem auto 0;
  display: flex;
  align-items: stretch;
  gap: 0;
}

.semester-half {
  flex: 1;
  text-align: center;
  padding: 2.5rem 2rem;
  position: relative;
}

.semester-half-deco {
  width: 40px;
  height: 2px;
  background: #C5A059;
  margin: 0 auto 1.5rem;
}

.semester-half-label {
  font-size: 0.8rem;
  color: #C5A059;
  letter-spacing: 4px;
  margin-bottom: 0.6rem;
  font-weight: 400;
}

.semester-half-name {
  font-size: 1.4rem;
  color: #0f1719;
  letter-spacing: 3px;
  margin-bottom: 1rem;
  font-weight: 600;
}

.semester-half-desc {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.8;
  letter-spacing: 1px;
}

.semester-divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  flex-shrink: 0;
}

.semester-divider-line {
  flex: 1;
  width: 1px;
  background: #e2dac9;
}

.semester-divider-or {
  font-size: 0.75rem;
  color: #C5A059;
  letter-spacing: 3px;
  padding: 1rem 0;
  white-space: nowrap;
  writing-mode: vertical-rl;
}

/* 书院五景 - 场景卡片 */
.scene-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
}

.scene-card {
  position: relative;
  background: #fff;
  padding: 3rem 2rem;
  border: 1px solid #e2dac9;
  transition: all 0.5s ease;
  overflow: hidden;
  z-index: 1;
}

.scene-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: #0f1719;
  transform: translateY(100%);
  transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  z-index: -1;
}

.scene-card:hover { border-color: #0f1719; }
.scene-card:hover::before { transform: translateY(0); }
.scene-card:hover * { color: #fff !important; }

.scene-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.course-name {
  display: inline-block;
  font-size: 0.85rem;
  color: #C5A059;
  border: 1px solid #C5A059;
  padding: 2px 10px;
  border-radius: 20px;
  flex-shrink: 0;
}

.scene-title {
  font-size: 1.3rem;
  color: #0f1719;
}

.mentor-badge {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 1.2rem;
  background-color: rgba(197, 160, 89, 0.1);
  padding: 6px 12px;
  display: inline-block;
}

.mentor-badge strong { color: #a53222; }

.scene-desc {
  color: #666;
  font-size: 0.95rem;
  text-align: justify;
  line-height: 1.8;
}

/* 课程体系 */
.course-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  margin-top: 3rem;
}

.course-section {
  padding: 2rem 0;
  border-top: 2px solid #0f1719;
}

.course-section-title {
  font-size: 1.15rem;
  color: #0f1719;
  letter-spacing: 2px;
}

.course-section-line {
  width: 30px;
  height: 2px;
  background: #C5A059;
  margin: 0.8rem 0 1.2rem;
}

.course-list {
  list-style: none;
  padding: 0;
  margin: 0;
  counter-reset: course-counter;
}

.course-list li {
  counter-increment: course-counter;
  padding: 0.6rem 0;
  border-bottom: 1px dashed #e2dac9;
  font-size: 0.95rem;
  color: #333;
  display: flex;
  align-items: baseline;
  gap: 0.8rem;
}

.course-list li:last-child { border-bottom: none; }

.course-list li::before {
  content: counter(course-counter, decimal-leading-zero);
  font-size: 1.1rem;
  font-weight: 600;
  color: #C5A059;
  flex-shrink: 0;
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
  .semester-layout { flex-direction: column; }
  .semester-divider { flex-direction: row; padding: 0 1rem; }
  .semester-divider-line { height: 1px; width: auto; flex: 1; }
  .semester-divider-or { writing-mode: horizontal-tb; padding: 0 1rem; }
  .scene-cards { grid-template-columns: 1fr; gap: 1.5rem; }
  .scene-card { padding: 2rem 1.5rem; }
  .course-grid { grid-template-columns: 1fr; gap: 1.5rem; }
  .page-entry { padding: 3rem 0 2rem; }
}
</style>
