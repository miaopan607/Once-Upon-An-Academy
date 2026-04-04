<script setup lang="ts">
const scenes = [
  {
    course: '音乐',
    scene: '（嘿嘿想不出来叫什么）',
    mentors: '杜丽娘、柳梦梅',
    desc0: '"良辰美景奈何天，赏心乐事谁家院。"这片花木繁盛之所，专为修习音律而设。轻拢慢捻间，丝竹管弦于此不绝。通过旋律的交织，学子可习得古风音乐的起承转合，在亭台水榭中体会情到深处的缱绻与共鸣。',
    desc: '（描述）'
  },
  {
    course: '美术',
    scene: '（想不出来叫什么x2）',
    mentors: '贾宝玉、林黛玉',
    desc0: '"滴不尽相思血泪抛红豆，开不完春柳春花满画楼。"这里是学子们日落息作、点亮烛火的归处。一笔一墨绘流年，将日常琐碎的欢笑与长叹悉数落入画轴。在此可研习丹青之术，以色彩与线条雕刻世间悲欢万象。',
    desc: '（描述）'
  },
  {
    course: '国学',
    scene: '文枢阁',
    mentors: '梁山伯、祝英台',
    desc0: '同窗共读伴花飞。万卷经史子集、诗词歌赋尽藏于此楼之上。推翻这陈年的书帙，字里行间是对华夏风骨的追溯与传承。在此修习国学，既是明理，亦是见心，于厚重的传统文化底蕴中，重塑跨越时代的品格与智慧。',
    desc: '（描述）'
  },
  {
    course: '劳技',
    scene: '掠影廊',
    mentors: '项羽、虞姬',
    desc0: '"力拔山兮气盖世，时不利兮骓不逝。"这道风声呼啸的长廊，是磨练外家技艺与意志的修罗场。于刀光剑影、楚风歌诀中穿梭游走，锻炼身骨，磨砺技术。百炼千锤方成器，学子将于劳碌汗水中见证自身的蜕变与坚韧。',
    desc: '（描述）'
  },
  {
    course: '入梦',
    scene: '藏经阁',
    mentors: '教书先生卿卿',
    desc0: '一入此门，便入梦境。书卷开合之间，是前尘往事与四幕剧场的虚实轮转。作为书院的至高之境，教书先生亲自引领学子踏入光怪陆离的梦之彼岸。学子在此观照本心，游历幻境，最终大梦初醒，方知最初的心之所向。',
    desc: '（描述）'
  }
];
</script>

<template>
  <div class="recruit-page">
    <section class="subhero">
      <div class="subhero-bg" style="background-image: url('/images/Gemini_Generated_Image_sewh9wsewh9wsewh(1).png');"></div>
      <div class="subhero-overlay"></div>
      <div class="subhero-content">
        <h1 class="subhero-title">招募与培养</h1>
        <div class="subhero-divider"></div>
        <p class="subhero-motto">五处幻境，五堂必修。以梦为马，不负韶华。</p>
      </div>
    </section>

    <div class="main-body">

      <!-- 招生、培养 -->
      <section class="req-env-section section-padding bg-paper">
        <div class="container">
          <div class="section-header text-center" style="display: flex; flex-direction: column; align-items: center;">
            <h2 class="title-primary">招募与培养</h2>
            <p class="subtitle-primary">（描述）</p>
          </div>
          <div class="recruit-content">
            <h3 class="card-title text-gold" style="font-size: 1.4rem;">招生要求</h3>
            <ul class="resume-list mt-2 mb-4">
              <li>热爱传统文化。</li>
              <li>对古风艺术有独特的共鸣。</li>
            </ul>

            <h3 class="card-title text-gold" style="font-size: 1.4rem;">培养要求</h3>
            <ul class="resume-list mt-2">
              <li><strong>核心科目：</strong> 古曲鉴赏、作词韵律、古典声乐。</li>
              <li><strong>综合能力：</strong> 能领悟歌词内蕴的情节，可听见琴弦间的叹息。</li>
            </ul>

            <h3 class="card-title text-gold" style="font-size: 1.4rem; margin-top: 2rem;">就业率及去向</h3>
            <div style="display: flex; align-items: baseline; gap: 1rem; margin-top: 0.5rem;">
              <div style="font-size: 3rem; color: #a53222; font-weight: bold; line-height: 1;">100<span
                  style="font-size: 1.5rem;">%</span></div>
              <p class="text-detail" style="margin:0;">(黄诗扶及其听众的专属数据)</p>
            </div>
            <p class="text-detail mt-2">毕业后均获得在精神世界里自留一片净土的能力。</p>
          </div>
        </div>
      </section>

      <!-- 特色课程与场景 -->
      <section class="scenes-section section-padding bg-alt">
        <div class="container">
          <div class="section-header text-center mx-auto mb-6">
            <h2 class="title-primary">书院五景 · 限定课程</h2>
            <p class="subtitle-primary mt-2">五处幻境，五堂必修。特邀名师入梦传道。</p>
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

    </div>
  </div>
</template>

<style scoped>
/* Subhero Banner */
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
  background: linear-gradient(to bottom, rgba(15, 23, 25, 0.55), rgba(15, 23, 25, 0.85));
}

.subhero-content {
  position: relative;
  z-index: 10;
  margin-top: 40px;
}

.subhero-title {
  font-size: 3.5rem;
  font-weight: 400;
  letter-spacing: 12px;
  margin-bottom: 1rem;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  margin-left: 12px;
}

.subhero-divider {
  width: 60px;
  height: 2px;
  background-color: #C5A059;
  margin: 0 auto 1.5rem;
}

.subhero-motto {
  font-size: 1.25rem;
  letter-spacing: 4px;
  opacity: 0.9;
}

/* 优雅卡片系统 */
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

.card-title {
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
}

.recruit-content {
  max-width: 700px;
  margin: 0 auto;
  padding: 1rem 0 0;
}

/* 场景卡片 */
.scene-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0f1719;
  transform: translateY(100%);
  transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  z-index: -1;
}

.scene-card:hover {
  border-color: #0f1719;
}

.scene-card:hover::before {
  transform: translateY(0);
}

.scene-card:hover * {
  color: #fff !important;
}

.course-name {
  display: inline-block;
  font-size: 0.9rem;
  color: #C5A059;
  border: 1px solid #C5A059;
  padding: 2px 10px;
  border-radius: 20px;
  margin-bottom: 1rem;
}

.scene-title {
  font-size: 1.5rem;
  color: #0f1719;
  margin-bottom: 1rem;
}

.mentor-badge {
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 1.5rem;
  background-color: rgba(197, 160, 89, 0.1);
  padding: 8px 15px;
  display: inline-block;
}

.mentor-badge strong {
  color: #a53222;
}

.scene-desc {
  color: #666;
  font-size: 1.05rem;
  text-align: justify;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .subhero {
    height: 260px;
  }

  .subhero-title {
    font-size: 2.2rem;
  }
}
</style>
