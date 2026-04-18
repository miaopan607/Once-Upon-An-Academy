<script setup lang="ts">
const teachers = [
  {
    name: '杜丽娘 · 柳梦梅',
    title: '音乐学院客座教授',
    skill: '音律传情 · 戏曲演唱',
    college: '音乐学院',
    desc: '"情不知所起，一往而深。"柳杜二位教授以牡丹亭为引，于后花园中传授音律之道。丽娘教授擅长以情入声，梦梅教授精于曲牌格律，二人琴瑟和鸣，将最缱绻的古风旋律传授于学子。'
  },
  {
    name: '项羽 · 虞姬',
    title: '体院特聘教授',
    skill: '武艺健身 · 楚风歌诀',
    college: '体院',
    desc: '"力拔山兮气盖世。"项王教授以霸王之力训练学子体魄，虞姬教授则以歌舞之法调和身心。一刚一柔，一武一文，于练武走廊中锤炼学子意志与技艺。'
  },
  {
    name: '贾宝玉 · 林黛玉',
    title: '美术学院首席教授',
    skill: '丹青水墨 · 诗词书画',
    college: '美术学院',
    desc: '"满纸荒唐言，一把辛酸泪。"宝黛二位教授一擅丹青设色，一精诗词书法。宝玉教授以大观园之景入画，黛玉教授以葬花之词入诗，于画楼之上培养学子的艺术感知与审美素养。'
  },
  {
    name: '梁山伯 · 祝英台',
    title: '日常学院资深教授',
    skill: '经史子集 · 国学通识',
    college: '日常',
    desc: '同窗三载，情深意重。梁祝二位教授于文枢阁中同台授业，山伯教授主讲经史，英台教授精于诗词。以同窗之谊示范求学之道，于国学通识中培养学子的文化底蕴与综合素养。'
  },
  {
    name: '教书先生卿卿',
    title: '藏经阁主持',
    skill: '鉴赏品评 · 入梦引路',
    college: '藏经阁',
    desc: '一入此门，便入梦境。教书先生为藏经阁之主持，亲授鉴赏之术，引领学子踏入光怪陆离的梦之彼岸。观照本心，游历幻境，大梦初醒，方知心之所向。'
  }
];
</script>

<template>
  <div class="faculty-page">
    <section class="subhero">
      <div class="subhero-bg" style="background-image: url('/hero.png');"></div>
      <div class="subhero-overlay"></div>
      <div class="subhero-content">
        <h1 class="subhero-title">师资队伍</h1>
        <div class="subhero-divider"></div>
        <p class="subhero-motto">名师荟萃 · 传道授业</p>
      </div>
    </section>

    <div class="main-body">
      <!-- 人才引进公告 -->
      <section class="section-padding bg-paper">
        <div class="container">
          <div class="section-header text-center">
            <h2 class="title-primary">人才引进</h2>
            <p class="subtitle-primary">汇聚英才 · 共筑未来</p>
          </div>
          <div class="recruit-doc">
            <div class="recruit-doc-inner">
              <h3 class="recruit-doc-title">从前书院人才引进公告</h3>
              <div class="recruit-doc-line"></div>
              <div class="recruit-doc-content">
                <p>为汇聚优质人才，现面向卿卿领域诚聘英才。学院提供优厚待遇、创作资源与发展平台，凡专业突出、认同本院理念者均可应聘，择优聘任。</p>
                <p>若有脱颖而出的卿卿老师，我院会引进成为青年教授，收入可观，年入物料最低可达3吨。</p>
                <p>有意者请联系从前书院招聘处，人生难得一知音。</p>
                <div class="recruit-doc-contact">
                  <p><strong>邮箱：</strong>0508huangshifuhappy@birth.day.com</p>
                  <p><strong>电话：</strong>0508-728370-01</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 青年教师团队 -->
      <section class="section-padding">
        <div class="container">
          <div class="section-header text-center">
            <h2 class="title-primary">青年教师团队</h2>
            <p class="subtitle-primary">五院名师 · 各展其长</p>
          </div>
          <div class="teacher-grid">
            <div class="teacher-card" v-for="t in teachers" :key="t.name">
              <div class="teacher-college">{{ t.college }}</div>
              <h3 class="teacher-name">{{ t.name }}</h3>
              <p class="teacher-title">{{ t.title }}</p>
              <div class="teacher-skill">{{ t.skill }}</div>
              <div class="teacher-divider"></div>
              <p class="teacher-desc">{{ t.desc }}</p>
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

/* 人才引进公告 */
.recruit-doc {
  max-width: 800px;
  margin: 3rem auto 0;
}

.recruit-doc-inner {
  background: #fff;
  padding: 3rem;
  border: 1px solid rgba(200, 0, 0, 0.15);
  box-shadow: inset 0 0 50px rgba(200, 0, 0, 0.02), 0 10px 40px rgba(0, 0, 0, 0.03);
}

.recruit-doc-title {
  color: #b71c1c;
  font-size: 1.6rem;
  text-align: center;
  font-weight: bold;
  font-family: "SimHei", "Microsoft YaHei", sans-serif;
  letter-spacing: 4px;
}

.recruit-doc-line {
  height: 3px;
  background: #b71c1c;
  margin: 1.2rem 0 2rem;
}

.recruit-doc-content p {
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #222;
  line-height: 2;
  text-indent: 2em;
  text-align: justify;
}

.recruit-doc-contact {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px dashed rgba(200, 0, 0, 0.2);
}

.recruit-doc-contact p {
  text-indent: 0 !important;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

/* 教师卡片 */
.teacher-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.teacher-card {
  background: #fff;
  padding: 2.5rem 2rem;
  border-top: 3px solid #0f1719;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.teacher-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.06);
}

.teacher-college {
  display: inline-block;
  font-size: 0.8rem;
  color: #C5A059;
  border: 1px solid #C5A059;
  padding: 2px 10px;
  border-radius: 20px;
  margin-bottom: 1rem;
}

.teacher-name {
  font-size: 1.3rem;
  color: #0f1719;
  font-weight: 600;
  letter-spacing: 2px;
  margin-bottom: 0.3rem;
}

.teacher-title {
  font-size: 0.9rem;
  color: #a53222;
  margin-bottom: 0.8rem;
}

.teacher-skill {
  font-size: 0.85rem;
  color: #C5A059;
  letter-spacing: 1px;
  margin-bottom: 1rem;
}

.teacher-divider {
  width: 30px;
  height: 2px;
  background: #e2dac9;
  margin-bottom: 1rem;
}

.teacher-desc {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.8;
  text-align: justify;
}

@media (max-width: 768px) {
  .subhero { height: 260px; }
  .subhero-title { font-size: 1.8rem; }
  .recruit-doc-inner { padding: 1.5rem; }
  .recruit-doc-title { font-size: 1.2rem; letter-spacing: 2px; }
  .teacher-grid { grid-template-columns: 1fr; gap: 1.5rem; }
  .teacher-card { padding: 2rem 1.5rem; }
}
</style>
