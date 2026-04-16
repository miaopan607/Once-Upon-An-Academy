<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

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

// 实时时间，年份为当前年份+1
const currentTime = ref('');
const timeDisplayEl = ref<HTMLElement | null>(null);
const redTitleEl = ref<HTMLElement | null>(null);
const showNoticeBar = ref(false);
let timer: number | null = null;

const updateTime = () => {
  const now = new Date();
  const year = now.getFullYear() + 1;
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  currentTime.value = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
};

const updateNoticeBarVisibility = () => {
  const timeEl = timeDisplayEl.value;
  const titleEl = redTitleEl.value;

  if (!timeEl || !titleEl) {
    showNoticeBar.value = false;
    return;
  }

  const triggerTop = window.innerWidth <= 768 ? 100 : 76;

  showNoticeBar.value =
    timeEl.getBoundingClientRect().bottom <= triggerTop &&
    titleEl.getBoundingClientRect().bottom <= triggerTop;
};

onMounted(() => {
  updateTime();
  timer = window.setInterval(updateTime, 1000);

  updateNoticeBarVisibility();
  window.addEventListener('scroll', updateNoticeBarVisibility);
  window.addEventListener('resize', updateNoticeBarVisibility);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }

  window.removeEventListener('scroll', updateNoticeBarVisibility);
  window.removeEventListener('resize', updateNoticeBarVisibility);
});
</script>

<template>
  <div class="recruit-page">
    <div v-if="showNoticeBar" class="notice-frozen-bar">
      <div class="notice-frozen-content">
        <div class="notice-frozen-time">{{ currentTime }}</div>
        <div class="notice-frozen-title">从前书院教务处文件</div>
      </div>
    </div>

    <section class="subhero">
      <div class="subhero-bg" style="background-image: url('/images/Gemini_Generated_Image_sewh9wsewh9wsewh(1).png');"></div>
      <div class="subhero-overlay"></div>
      <div class="subhero-content">
        <h1 class="subhero-title">导师</h1>
        <div class="subhero-divider"></div>
        <p class="subhero-motto">五处幻境，五堂必修。以梦为马，不负韶华。</p>
      </div>
    </section>

    <div class="main-body">

      <!-- 两栏布局 - 1:2比例 -->
      <section class="notice-section section-padding bg-paper">
        <div class="container">
          <div class="notice-two-col">
            <!-- 左栏：莫比乌斯环和时间 -->
            <div class="notice-left">
              <div class="mobius-section">
                <div class="mobius-container">
                  <svg class="mobius-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="mobiusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#C5A059;stop-opacity:1" />
                        <stop offset="50%" style="stop-color:#8B7355;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#C5A059;stop-opacity:1" />
                      </linearGradient>
                    </defs>
                    <path d="M100,20 C140,20 170,50 170,90 C170,130 140,160 100,160 C70,160 50,140 50,110 C50,80 70,60 100,60 C120,60 135,75 135,95 C135,115 120,130 100,130"
                          fill="none" stroke="url(#mobiusGrad)" stroke-width="8" stroke-linecap="round"/>
                    <path d="M100,180 C60,180 30,150 30,110 C30,70 60,40 100,40 C130,40 150,60 150,90 C150,120 130,140 100,140 C80,140 65,125 65,105 C65,85 80,70 100,70"
                          fill="none" stroke="url(#mobiusGrad)" stroke-width="8" stroke-linecap="round" opacity="0.6"/>
                  </svg>
                </div>
                <div class="time-display" ref="timeDisplayEl">{{ currentTime }}</div>
              </div>
            </div>
            <!-- 右栏：红头文件 -->
            <div class="notice-right">
              <div class="red-document">
                <h3 class="red-title" ref="redTitleEl">从前书院教务处文件</h3>
                <div class="red-line"></div>
                <h4 class="doc-subject">关于黄诗扶全国巡演（上海站）的通知</h4>
                <div class="doc-content">
                  <p>各书院学子、各级班长：</p>
                  <p>为庆祝本院杰出荣誉校友生辰，同时展示我院在古风音乐领域的至高艺术结晶。特向全体学子预告即将举办的2026年黄诗扶全国巡演上海站盛事。</p>
                  <div class="doc-date-section">
                    <strong class="doc-date-label">公演吉期：</strong>
                    <div class="doc-date-list">
                      <div>2026 / 06 / 19 19:00</div>
                      <div>2026 / 06 / 20 19:00</div>
                    </div>
                  </div>
                  <p><strong>雅集地点：</strong> 上海市 · 交通银行前滩31演艺中心</p>
                  <p>望各班学子届时拨冗出席，共襄盛举。</p>
                  <div class="doc-stamp">
                    <p>从前书院教务处</p>
                    <p>2027年5月8日</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 招生、培养 -->
      <section class="req-env-section section-padding">
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

.recruit-page {
  --notice-frozen-top: 4.75rem;
}

.notice-frozen-bar {
  position: fixed;
  top: var(--notice-frozen-top);
  left: 0;
  width: 100%;
  z-index: 950;
  background: rgba(253, 251, 247, 0.97);
  border-bottom: 1px solid rgba(183, 28, 28, 0.12);
  box-shadow: 0 8px 20px rgba(15, 23, 25, 0.08);
  backdrop-filter: blur(10px);
}

.notice-frozen-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0.6rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.notice-frozen-time {
  color: #666;
  font-size: 1.28rem;
  letter-spacing: 1px;
  font-family: monospace;
  white-space: nowrap;
}

.notice-frozen-title {
  min-width: 0;
  color: #b71c1c;
  font-size: 1.1rem;
  text-align: right;
  font-weight: bold;
  font-family: "SimHei", "Microsoft YaHei", sans-serif;
  letter-spacing: 4px;
  white-space: nowrap;
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
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}

.recruit-content {
  max-width: 700px;
  margin: 0 auto;
  padding: 1rem 0 0;
}

/* 两栏布局 - 1:3比例 */
.notice-two-col {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 1.5rem;
  align-items: start;
}

.notice-left {
  display: flex;
  flex-direction: column;
}

/* 莫比乌斯环区域 */
.mobius-section {
  background: #fff;
  border: 1px solid rgba(200, 0, 0, 0.15);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mobius-container {
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobius-svg {
  width: 100%;
  height: 100%;
}

.time-display {
  font-size: 1rem;
  color: #666;
  letter-spacing: 1px;
  margin-top: 0.5rem;
  font-family: monospace;
}

/* 红头文件装潢 */
.red-document {
  background: #fff;
  padding: 2rem;
  border: 1px solid rgba(200, 0, 0, 0.15);
  box-shadow: inset 0 0 50px rgba(200, 0, 0, 0.02), 0 10px 40px rgba(0, 0, 0, 0.03);
}

.red-title {
  color: #b71c1c;
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
  font-family: "SimHei", "Microsoft YaHei", sans-serif;
  letter-spacing: 6px;
}

.red-line {
  height: 4px;
  background: #b71c1c;
  margin: 1.5rem 0 2.5rem;
  box-shadow: 0 2px 0 rgba(183, 28, 28, 0.3);
}

.doc-subject {
  text-align: center;
  font-size: 1.2rem;
  color: #111;
  font-weight: 600;
  margin-bottom: 2rem;
}

.doc-content p {
  margin-bottom: 0.8rem;
  font-size: 1rem;
  color: #222;
  text-indent: 2em;
}

.doc-content p strong {
  color: #000;
}

.doc-date-section {
  margin-bottom: 0.8rem;
}

.doc-date-label {
  display: block;
  font-size: 1rem;
  color: #000;
  padding-left: 2em;
}

.doc-date-list {
  padding-left: 2em;
  margin-top: 0.3rem;
  line-height: 1.8;
  font-size: 1rem;
  color: #222;
}

.doc-stamp {
  margin-top: 3rem;
  text-align: right;
  font-size: 1rem;
  font-weight: 600;
  color: #111;
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
  font-size: 0.85rem;
  color: #C5A059;
  border: 1px solid #C5A059;
  padding: 2px 10px;
  border-radius: 20px;
  margin-bottom: 0.8rem;
}

.scene-title {
  font-size: 1.3rem;
  color: #0f1719;
  margin-bottom: 0.8rem;
}

.mentor-badge {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 1.2rem;
  background-color: rgba(197, 160, 89, 0.1);
  padding: 6px 12px;
  display: inline-block;
}

.mentor-badge strong {
  color: #a53222;
}

.scene-desc {
  color: #666;
  font-size: 0.95rem;
  text-align: justify;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .subhero {
    height: 260px;
  }

  .subhero-title {
    font-size: 1.8rem;
  }

  .recruit-page {
    --notice-frozen-top: 6.25rem;
  }

  .notice-frozen-content {
    padding: 0.5rem 1rem;
    gap: 0.75rem;
  }

  .notice-frozen-time {
    font-size: 0.78rem;
  }

  .notice-frozen-title {
    font-size: 0.88rem;
    letter-spacing: 2px;
  }

  .notice-two-col {
    grid-template-columns: 1fr 2fr;
    gap: 0.75rem;
  }

  .notice-left {
    order: 1;
  }

  .notice-right {
    order: 2;
  }

  .mobius-section {
    padding: 0.5rem;
  }

  .time-display {
    font-size: 0.7rem;
  }

  .red-document {
    padding: 0.75rem;
  }

  .red-title {
    font-size: 1.1rem;
    letter-spacing: 3px;
  }

  .red-line {
    margin: 0.75rem 0 1rem;
  }

  .doc-subject {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .doc-content p {
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
    text-indent: 2em;
  }

  .doc-date-section {
    margin-bottom: 0.5rem;
  }

  .doc-date-label {
    font-size: 0.85rem;
    padding-left: 2em;
  }

  .doc-date-list {
    font-size: 0.85rem;
    padding-left: 2em;
  }

  .doc-stamp {
    margin-top: 1.5rem;
    font-size: 0.85rem;
  }
}
</style>
