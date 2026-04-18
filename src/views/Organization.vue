<script setup lang="ts">
const colleges = [
  {
    name: '体院',
    scene: '练武走廊',
    function: '强身健体',
    mentors: '项羽、虞姬',
    desc: '"力拔山兮气盖世，时不利兮骓不逝。"这道风声呼啸的长廊，是磨练外家技艺与意志的修罗场。于刀光剑影、楚风歌诀中穿梭游走，锻炼身骨，磨砺技术。百炼千锤方成器，学子将于劳碌汗水中见证自身的蜕变与坚韧。'
  },
  {
    name: '音乐学院',
    scene: '后花园',
    function: '培养技能',
    mentors: '杜丽娘、柳梦梅',
    desc: '"良辰美景奈何天，赏心乐事谁家院。"这片花木繁盛之所，专为修习音律而设。轻拢慢捻间，丝竹管弦于此不绝。通过旋律的交织，学子可习得古风音乐的起承转合，在亭台水榭中体会情到深处的缱绻与共鸣。'
  },
  {
    name: '美术学院',
    scene: '画楼',
    function: '艺术能力',
    mentors: '贾宝玉、林黛玉',
    desc: '"滴不尽相思血泪抛红豆，开不完春柳春花满画楼。"一笔一墨绘流年，将日常琐碎的欢笑与长叹悉数落入画轴。在此可研习丹青之术，以色彩与线条雕刻世间悲欢万象，培养学子对美的感知与创造。'
  },
  {
    name: '日常',
    scene: '文枢阁',
    function: '综合技能',
    mentors: '梁山伯、祝英台',
    desc: '同窗共读伴花飞。万卷经史子集、诗词歌赋尽藏于此楼之上。推翻这陈年的书帙，字里行间是对华夏风骨的追溯与传承。在此修习国学，既是明理，亦是见心，于厚重的传统文化底蕴中，重塑跨越时代的品格与智慧。'
  },
  {
    name: '藏经阁',
    scene: '藏经阁',
    function: '鉴赏能力',
    mentors: '教书先生卿卿',
    desc: '一入此门，便入梦境。书卷开合之间，是前尘往事与四幕剧场的虚实轮转。作为书院的至高之境，教书先生亲自引领学子踏入光怪陆离的梦之彼岸。学子在此观照本心，游历幻境，最终大梦初醒，方知最初的心之所向。'
  }
];
</script>

<template>
  <div class="organization-page">
    <section class="subhero">
      <div class="subhero-bg" style="background-image: url('/images/Gemini_Generated_Image_sewh9wsewh9wsewh(1).png');"></div>
      <div class="subhero-overlay"></div>
      <div class="subhero-content">
        <h1 class="subhero-title">机构设置</h1>
        <div class="subhero-divider"></div>
        <p class="subhero-motto">五处幻境，五堂必修 · 以梦为马，不负韶华</p>
      </div>
    </section>

    <div class="main-body">
      <section class="section-padding">
        <div class="container">
          <div class="section-header text-center">
            <h2 class="title-primary">五大学院</h2>
            <p class="subtitle-primary">各有所长，各尽其妙</p>
          </div>
          <div class="college-grid">
            <div class="college-card" v-for="item in colleges" :key="item.name">
              <div class="college-card-inner">
                <div class="college-header">
                  <span class="college-name">{{ item.name }}</span>
                  <h3 class="college-scene">{{ item.scene }}</h3>
                </div>
                <div class="college-function">{{ item.function }}</div>
                <div class="mentor-badge">
                  <span>特邀导师：</span><strong>{{ item.mentors }}</strong>
                </div>
                <p class="college-desc">{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section-padding bg-paper">
        <div class="container">
          <div class="section-header text-center">
            <h2 class="title-primary">书院全景</h2>
            <p class="subtitle-primary">依山傍水，错落其间</p>
          </div>
          <div class="panorama-text">
            <p>书院内画舫水榭、亭台楼阁错落其间，风光秀丽，景色宜人。练武走廊倚山而建，后花园临水而筑，画楼隐于林间，文枢阁居于中轴，藏经阁高耸于后山。五大学院各据一景，各司其职，共同构成从前书院的完整教学体系。</p>
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

/* 学院卡片 */
.college-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
}

.college-card {
  position: relative;
  background: #fff;
  padding: 3rem 2rem;
  border: 1px solid #e2dac9;
  transition: all 0.5s ease;
  overflow: hidden;
  z-index: 1;
}

.college-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: #0f1719;
  transform: translateY(100%);
  transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  z-index: -1;
}

.college-card:hover { border-color: #0f1719; }

.college-card:hover::before { transform: translateY(0); }

.college-card:hover * { color: #fff !important; }

.college-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.college-name {
  display: inline-block;
  font-size: 0.85rem;
  color: #C5A059;
  border: 1px solid #C5A059;
  padding: 2px 10px;
  border-radius: 20px;
  flex-shrink: 0;
}

.college-scene {
  font-size: 1.3rem;
  color: #0f1719;
}

.college-function {
  font-size: 0.9rem;
  color: #a53222;
  font-weight: 600;
  margin-bottom: 1rem;
  letter-spacing: 2px;
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

.college-desc {
  color: #666;
  font-size: 0.95rem;
  text-align: justify;
  line-height: 1.8;
}

.panorama-text {
  max-width: 800px;
  margin: 2rem auto 0;
  padding: 2rem;
  background: #fff;
  border: 1px solid #e2dac9;
}

.panorama-text p {
  font-size: 1rem;
  line-height: 2;
  color: #444;
  text-indent: 2em;
  text-align: justify;
}

@media (max-width: 768px) {
  .subhero { height: 260px; }
  .subhero-title { font-size: 1.8rem; }
  .college-grid { grid-template-columns: 1fr; gap: 1.5rem; }
  .college-card { padding: 2rem 1.5rem; }
}
</style>
