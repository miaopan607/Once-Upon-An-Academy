<script setup lang="ts">
const coreCourses = [
  { name: '黄诗扶入坑导学课', desc: '系统了解黄诗扶音乐世界，建立国风音乐审美基础' },
  { name: '声乐演唱与舞台表现', desc: '从气息控制到情感表达，全面培养演唱能力' },
  { name: '词曲创作与编曲基础', desc: '掌握古风词曲创作的核心技法与编曲思维' },
  { name: '国风音乐赏析与创作', desc: '深入赏析经典国风作品，激发创作灵感' }
];

const cultureCourses = [
  { name: '古典诗词与文学', desc: '从诗经到宋词，领略千年文学之美' },
  { name: '琴棋诗画通识', desc: '四艺入门，涵养文人雅趣' },
  { name: '传统艺术鉴赏', desc: '戏曲、书画、器乐的多维鉴赏' },
  { name: '传统武术技能学习', desc: '强身健体，内外兼修' }
];

const practiceCourses = [
  { name: '组织观看【入梦】幕剧音乐会', desc: '沉浸式体验现场艺术之美' },
  { name: '作品录制与后期', desc: '从创作到成品的完整实践链' },
  { name: '艺术策划与运营', desc: '培养活动策划与执行能力' }
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
            <p class="subtitle-primary">不摆烂 · 不内卷 · 快乐学习</p>
          </div>

          <div class="goal-section">
            <div class="goal-card">
              <h3 class="goal-label">培养宗旨</h3>
              <p class="goal-text">旨在轻松学习，培养不摆烂不内卷的快乐学员。</p>
            </div>
            <div class="goal-card goal-card-dark">
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
            <p class="subtitle-primary">一学年两学期 · 理论与实践并重</p>
          </div>

          <div class="semester-grid">
            <div class="semester-card">
              <div class="semester-num">上学期</div>
              <h3 class="semester-title">书院学习</h3>
              <div class="semester-divider"></div>
              <p class="semester-desc">以书院课程学习为主，夯实理论基础。修习专业核心课与文化素养课，建立完整的国风音乐知识体系与艺术审美框架。</p>
            </div>
            <div class="semester-card semester-card-alt">
              <div class="semester-num">下学期</div>
              <h3 class="semester-title">课外实践</h3>
              <div class="semester-divider"></div>
              <p class="semester-desc">以课外实践为主，学以致用。参与音乐会观摩、作品录制、艺术策划等实践拓展课，将所学技能转化为实际成果。</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 课程体系 -->
      <section class="section-padding bg-alt">
        <div class="container">
          <div class="section-header text-center">
            <h2 class="title-primary">课程体系</h2>
            <p class="subtitle-primary">三阶课程 · 全面培养</p>
          </div>

          <div class="course-grid">
            <!-- 专业核心课 -->
            <div class="course-section">
              <div class="course-section-header">
                <h3 class="course-section-title">专业核心课</h3>
                <div class="course-section-line"></div>
              </div>
              <div class="course-list">
                <div class="course-item" v-for="(c, i) in coreCourses" :key="i">
                  <div class="course-num">{{ String(i + 1).padStart(2, '0') }}</div>
                  <div class="course-info">
                    <h4 class="course-name">{{ c.name }}</h4>
                    <p class="course-desc">{{ c.desc }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 文化素养课 -->
            <div class="course-section">
              <div class="course-section-header">
                <h3 class="course-section-title">文化素养课</h3>
                <div class="course-section-line"></div>
              </div>
              <div class="course-list">
                <div class="course-item" v-for="(c, i) in cultureCourses" :key="i">
                  <div class="course-num">{{ String(i + 1).padStart(2, '0') }}</div>
                  <div class="course-info">
                    <h4 class="course-name">{{ c.name }}</h4>
                    <p class="course-desc">{{ c.desc }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 实践拓展课 -->
            <div class="course-section">
              <div class="course-section-header">
                <h3 class="course-section-title">实践拓展课</h3>
                <div class="course-section-line"></div>
              </div>
              <div class="course-list">
                <div class="course-item" v-for="(c, i) in practiceCourses" :key="i">
                  <div class="course-num">{{ String(i + 1).padStart(2, '0') }}</div>
                  <div class="course-info">
                    <h4 class="course-name">{{ c.name }}</h4>
                    <p class="course-desc">{{ c.desc }}</p>
                  </div>
                </div>
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

/* 培养目标 */
.goal-section {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  margin-top: 3rem;
}

.goal-card {
  background: #fff;
  padding: 2.5rem;
  border-top: 3px solid #0f1719;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
}

.goal-card-dark {
  background: #0f1719;
  color: #fff;
  border-top: 3px solid #C5A059;
}

.goal-label {
  font-size: 0.85rem;
  color: #C5A059;
  letter-spacing: 3px;
  margin-bottom: 1.2rem;
}

.goal-text {
  font-size: 1rem;
  line-height: 2;
  color: #444;
  text-align: justify;
}

.goal-card-dark .goal-text { color: #ccc; }

/* 学年计划 */
.semester-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 3rem;
}

.semester-card {
  background: #fff;
  padding: 3rem 2.5rem;
  border: 1px solid #e2dac9;
  text-align: center;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.semester-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.06);
}

.semester-card-alt {
  background: #0f1719;
  color: #fff;
  border-color: #0f1719;
}

.semester-num {
  font-size: 0.85rem;
  color: #C5A059;
  letter-spacing: 3px;
  margin-bottom: 1rem;
}

.semester-title {
  font-size: 1.5rem;
  letter-spacing: 3px;
  margin-bottom: 0.5rem;
}

.semester-card-alt .semester-title { color: #fff; }

.semester-divider {
  width: 40px;
  height: 2px;
  background: #C5A059;
  margin: 1rem auto;
}

.semester-desc {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.8;
  text-align: justify;
  margin-top: 1rem;
}

.semester-card-alt .semester-desc { color: #aaa; }

/* 课程体系 */
.course-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  margin-top: 3rem;
}

.course-section {
  background: #fff;
  padding: 2.5rem 2rem;
  border-top: 3px solid #0f1719;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
}

.course-section-title {
  font-size: 1.2rem;
  color: #0f1719;
  letter-spacing: 2px;
}

.course-section-line {
  width: 30px;
  height: 2px;
  background: #C5A059;
  margin-top: 0.8rem;
  margin-bottom: 1.5rem;
}

.course-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px dashed #e2dac9;
}

.course-item:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }

.course-num {
  font-size: 1.4rem;
  font-weight: 600;
  color: #C5A059;
  flex-shrink: 0;
  line-height: 1;
  min-width: 2rem;
}

.course-name {
  font-size: 1rem;
  color: #0f1719;
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.course-desc {
  font-size: 0.85rem;
  color: #888;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .subhero { height: 260px; }
  .subhero-title { font-size: 1.8rem; }
  .goal-section { grid-template-columns: 1fr; }
  .semester-grid { grid-template-columns: 1fr; gap: 1.5rem; }
  .semester-card { padding: 2rem 1.5rem; }
  .course-grid { grid-template-columns: 1fr; gap: 1.5rem; }
  .course-section { padding: 2rem 1.5rem; }
}
</style>
