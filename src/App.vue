<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolled = ref(false);
const showToast = ref(false);
const toastMessage = ref('');
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const showCustomAlert = (msg: string) => {
  toastMessage.value = msg;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 2500);
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 150;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const handleNavClick = (e: Event, link: string) => {
  if (link === '学校概况') {
    e.preventDefault();
    return;
  }
  e.preventDefault();
  showCustomAlert('其实没有喵，只是摆在这占位的');
};

const navLinks = [
  '学校概况', '机构设置', '师资队伍', '人才培养', '学术研究', '招生就业', '网上教学', '公开事项'
];

const scenes = [
  {
    course: '音乐',
    scene: '（嘿嘿想不出来叫什么）',
    mentors: '杜丽娘、柳梦梅',
    desc0: '“良辰美景奈何天，赏心乐事谁家院。”这片花木繁盛之所，专为修习音律而设。轻拢慢捻间，丝竹管弦于此不绝。通过旋律的交织，学子可习得古风音乐的起承转合，在亭台水榭中体会情到深处的缱绻与共鸣。',
    desc: '（描述）'
  },
  {
    course: '美术',
    scene: '（想不出来叫什么x2）',
    mentors: '贾宝玉、林黛玉',
    desc0: '“滴不尽相思血泪抛红豆，开不完春柳春花满画楼。”这里是学子们日落息作、点亮烛火的归处。一笔一墨绘流年，将日常琐碎的欢笑与长叹悉数落入画轴。在此可研习丹青之术，以色彩与线条雕刻世间悲欢万象。',
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
    desc0: '“力拔山兮气盖世，时不利兮骓不逝。”这道风声呼啸的长廊，是磨练外家技艺与意志的修罗场。于刀光剑影、楚风歌诀中穿梭游走，锻炼身骨，磨砺技术。百炼千锤方成器，学子将于劳碌汗水中见证自身的蜕变与坚韧。',
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

const programs = [
  { title: '（标题）', type: '类型（音乐）', link: '#' },
  { title: '（标题）', type: '类型（视频）', link: '#' },
  { title: '（标题）', type: '类型（舞蹈）', link: '#' },
  { title: '（标题）', type: '类型（彩蛋）', link: '#' }
];
</script>

<template>
  <div class="academy-website">

    <!-- Header -->
    <header :class="{ 'header-scrolled': isScrolled }">
      <div class="header-content">
        <div class="logo" style="white-space: nowrap;">从前书院</div>
        <div class="mobile-toggle" @click="toggleMobileMenu">
          <span></span><span></span><span></span>
        </div>
        <nav class="nav-links" :class="{ 'nav-open': isMobileMenuOpen }">
          <a href="#" v-for="link in navLinks" :key="link" :class="{ active: link === '学校概况' }"
            @click="(e) => handleNavClick(e, link)">
            {{ link }}
          </a>
        </nav>
      </div>
    </header>

    <section class="subhero">
      <div class="subhero-bg" style="background-image: url('/hero.png');"></div>
      <div class="subhero-overlay"></div>
      <div class="subhero-content">
        <h1 class="subhero-title">学校概况</h1>
        <div class="subhero-divider"></div>
        <p class="subhero-motto">相信爱永存 · 感谢传统文化带来的力量</p>
        <p class="subhero-motto">（这张图乱放的）</p>
      </div>
    </section>

    <!-- 主体内容 -->
    <div class="main-body">

      <!-- 书院简介 -->
      <!-- <section class="intro-section section-padding">
        <div class="container container-narrow text-center">
          <h2 class="title-primary">书院简介</h2>
          <div class="text-lead mt-4">
            <p>「从前书院」顾名思义，是古老传说里“从前有座山”上的书院。</p>
            <p>本书院为黄诗扶生贺限定书院，过了这个村，就没有了这个院。</p>
            <p class="mt-2 text-muted">
              以梦为马，不负韶华。这里汇聚了最真挚的祝愿与最深厚的情感，我们以古风为引，以学养为基，为她，亦为每一位向往大美中华文化的游子，筑起这座精神的乌托邦。
            </p>
          </div>
        </div>
      </section> -->

      <!-- 红头文件通知 -->
      <section class="notice-section section-padding bg-paper">
        <div class="container">
          <div class="red-document mx-auto">
            <h3 class="red-title">从前书院教务处文件</h3>
            <div class="red-line"></div>
            <h4 class="doc-subject">关于黄诗扶全国巡演（上海站）的通知</h4>
            <div class="doc-content">
              <p>各书院学子、各级班长：</p>
              <p>为庆祝本院杰出荣誉校友生辰，同时展示我院在古风音乐领域的至高艺术结晶。特向全体学子通报2026年黄诗扶全国巡演上海站盛事。</p>
              <div style="margin-bottom: 1rem; padding-left: 2rem;">
                <strong style="display: block;">公演吉期：</strong>
                <div style="padding-left: 2em; margin-top: 0.3rem; line-height: 1.8;">
                  2026 / 06 / 19 19:00<br>
                  2026 / 06 / 20 19:00
                </div>
              </div>
              <p><strong>雅集地点：</strong> 上海市 · 交通银行前滩31演艺中心</p>
              <p>望各班学子奔走相告，共襄盛举。
                <!-- 巡演票务详情请<a href="https://weibo.com/7789205210/Qz6QmzFsa" target="_blank"
                  style="color: #b71c1c; text-decoration: underline; font-weight: bold;">查看此通知</a>。 -->
                </p>
              <div class="doc-stamp">
                <p>从前书院教务处</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 荣誉校友与校史（恢复精美卡片悬浮反色布局） -->
      <section class="history-alumni-section section-padding">
        <div class="container split-layout">
          <div class="split-col">
            <div class="section-header">
              <h2 class="title-primary">校史拾遗</h2>
              <p class="subtitle-primary">（描述）</p>
            </div>
            <div class="elegant-card h-full">
              <h3 class="card-title">（标题）</h3>
              <p class="mt-4 text-detail">
                （内容）
              </p>
              <p class="mt-2 text-detail">
                <!-- （可替换） -->
              </p>
            </div>
          </div>
          <div class="split-col">
            <div class="section-header">
              <h2 class="title-primary">荣誉校友</h2>
              <p class="subtitle-primary">（描述）</p>
            </div>
            <div class="elegant-card elegant-card-dark h-full">
              <h3 class="card-title text-gold">黄诗扶</h3>
              <p class="tagline mt-2">（称号） / （称号） / （称号）</p>
              <ul class="resume-list mt-4">
                <li><strong>代表作：</strong>（代表作）</li>
                <li><strong>（其他内容）：</strong>（内容）</li>
                <!-- <li><strong>书院寄语：</strong>（寄语）</li> -->
              </ul>
            </div>
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

      <!-- 招生、培养与环境 -->
      <section class="req-env-section section-padding bg-paper">
        <div class="container split-layout">
          <div class="split-col">
            <div class="section-header">
              <h2 class="title-primary">招募与培养</h2>
              <p class="subtitle-primary">（描述）</p>
            </div>
            <div class="elegant-card h-full" style="padding: 2.5rem;">
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

          <div class="split-col" style="display: flex; flex-direction: column;">
            <div class="section-header">
              <h2 class="title-primary">雅学之境</h2>
              <p class="subtitle-primary">（描述）</p>
            </div>
            <!-- 校园环境图 -->
            <div class="env-image"
              style="flex: 1; background-image: url('/campus.png'); background-size: cover; background-position: center; border: 1px solid #e2dac9; position: relative; min-height: 350px;">
              <div
                style="position: absolute; bottom: 0; left: 0; width: 100%; background: linear-gradient(transparent, rgba(15,23,25,0.9)); padding: 2rem;">
                <h3 style="color: #C5A059; font-size: 1.4rem; margin-bottom: 0.2rem;">校园环境</h3>
                <p style="color: #eee; font-size: 0.95rem;">（描述）（先随便放一个图）</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 留言与咨询 -->
      <section class="interactive-section section-padding">
        <div class="container split-layout">
          <div class="split-col">
            <div class="section-header">
              <h2 class="title-primary">学子留言壁</h2>
              <p class="subtitle-primary">（描述）</p>
            </div>
            <div class="message-board">
              <div class="message-item">
                <span class="author">@（昵称）：</span>
                <span class="content">（内容）</span>
              </div>
              <div class="message-item">
                <span class="author">@（昵称）：</span>
                <span class="content">（内容）</span>
              </div>
              <div class="message-item">
                <span class="author">@（昵称）：</span>
                <span class="content">（内容）</span>
              </div>
            </div>
          </div>

          <div class="split-col">
            <div class="section-header">
              <h2 class="title-primary">联系我们</h2>
              <p class="subtitle-primary">缘起从前，一见如故</p>
            </div>
            <div class="elegant-card bg-gold">
              <h3 class="card-title text-dark">从前书院招生办</h3>
              <p class="mt-4 text-dark">若有心求学，望拨打专线联络。</p>
              <div class="contact-wrap mt-4">
                <p><strong>[ 统理招生 ] </strong> 卿主任</p>
                <p class="mt-2"><strong>[ 传书青鸟 ] </strong> <span class="magical-font">（编一个出道日子的电话）</span></p>
                <!-- <p class="text-xs opacity-75 mt-1">（黄诗扶生辰与出道纪念特设专线）</p> -->
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 节目板块 -->
      <section class="programs-section section-padding bg-alt">
        <div class="container text-center">
          <div class="section-header mb-6">
            <h2 class="title-primary">生贺节目大观</h2>
            <p class="subtitle-primary mt-2">丝竹管弦，如梦同赴。节目档案陆续解锁中...（可替换文案）</p>
          </div>
          <div class="programs-grid">
            <a :href="prog.link" class="program-card" v-for="prog in programs" :key="prog.title"
              @click.prevent="showCustomAlert('链接🔗更新中，敬请期待！')">
              <div class="prog-type">{{ prog.type }}</div>
              <h4 class="prog-title">{{ prog.title }}</h4>
              <div class="prog-status">敬请期待</div>
            </a>
          </div>
        </div>
      </section>

    </div>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-layout">
          <div class="footer-brand">
            <h2 class="logo-text">从前书院</h2>
            <p>（描述）</p>
            <p class="mt-4"><strong class="text-gold">校园开放日：</strong> 每年5月8日</p>
          </div>
          <div class="footer-links-wrap">
            <a href="#" @click="(e) => handleNavClick(e, link)" v-for="link in navLinks.slice(0, 4)" :key="link">{{ link
              }}</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2026 从前书院</p>
        </div>
      </div>
    </footer>

    <!-- Custom Toast -->
    <div class="custom-toast" :class="{ 'toast-visible': showToast }">
      {{ toastMessage }}
    </div>
  </div>
</template>

<style scoped>
/* 
  极具美感的初版古风样式重构
  深墨色：#0f1719 (背景、字体)
  鎏金色：#C5A059 (高亮、交互)
  古纸色：#fdfbf7 (浅色背景)
*/
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;600;700&display=swap');

.academy-website {
  font-family: "Noto Serif SC", "STSong", "SimSun", serif;
  color: #1a1a1a;
  line-height: 1.8;
  background-color: #fdfbf7;
}

/* 辅色类 */
.text-gold {
  color: #C5A059;
}

.text-dark {
  color: #0f1719;
}

.text-muted {
  color: #666;
}

.text-xs {
  font-size: 0.85rem;
}

.bg-paper {
  background-color: #f5f0e6;
}

.bg-alt {
  background-color: #f0eadc;
}

.bg-gold {
  background-color: #e5d1a7;
  color: #0f1719;
}

.mt-2 {
  margin-top: 0.5rem;
}

.mt-4 {
  margin-top: 1rem;
}

.mb-4 {
  margin-bottom: 2rem;
}

.mb-6 {
  margin-bottom: 3rem;
}

.h-full {
  flex: 1;
}

.text-center {
  text-align: center;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

/* 容器制式 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.container-narrow {
  max-width: 800px;
}

.section-padding {
  padding: 6rem 0;
}

.split-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.split-col {
  display: flex;
  flex-direction: column;
}

/* 字体排版 */
.title-primary {
  font-size: 2.2rem;
  font-weight: 600;
  color: #0f1719;
  letter-spacing: 2px;
  position: relative;
  display: inline-block;
}

.subtitle-primary {
  font-size: 1.1rem;
  color: #C5A059;
  letter-spacing: 3px;
  margin-top: 0.5rem;
}

.text-lead {
  font-size: 1.25rem;
  line-height: 2.2;
  color: #333;
}

.text-detail {
  font-size: 1.05rem;
  line-height: 1.9;
  color: #444;
}

/* Header */
header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background: transparent;
  padding: 2rem 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

header.header-scrolled {
  background: #0f1719;
  padding: 1rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.8rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: 4px;
}

header.header-scrolled .logo {
  color: #C5A059;
}

.nav-links a {
  margin-left: 2rem;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.85);
  transition: all 0.3s;
  letter-spacing: 1px;
}

.mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
}

.mobile-toggle span {
  display: block;
  width: 25px;
  height: 3px;
  background: #C5A059;
  transition: 0.3s;
}

.nav-links a:hover {
  color: #C5A059;
}

.nav-links a.active {
  color: #C5A059;
  font-weight: 600;
  border-bottom: 2px solid #C5A059;
  padding-bottom: 4px;
}

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
  font-size: 3.5rem;
  font-weight: 400;
  letter-spacing: 12px;
  margin-bottom: 1rem;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  margin-left: 12px;
  /* 补偿字间距 */
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

/* 红头文件装潢 */
.red-document {
  max-width: 850px;
  background: #fff;
  padding: 4rem;
  border: 1px solid rgba(200, 0, 0, 0.15);
  box-shadow: inset 0 0 50px rgba(200, 0, 0, 0.02), 0 10px 40px rgba(0, 0, 0, 0.03);
}

.red-title {
  color: #b71c1c;
  font-size: 2.5rem;
  text-align: center;
  font-weight: bold;
  font-family: "SimHei", "Microsoft YaHei", sans-serif;
  letter-spacing: 8px;
}

.red-line {
  height: 4px;
  background: #b71c1c;
  margin: 1.5rem 0 2.5rem;
  box-shadow: 0 2px 0 rgba(183, 28, 28, 0.3);
}

.doc-subject {
  text-align: center;
  font-size: 1.4rem;
  color: #111;
  font-weight: 600;
  margin-bottom: 2.5rem;
}

.doc-content p {
  margin-bottom: 1rem;
  font-size: 1.15rem;
  color: #222;
}

.doc-content>p {
  text-indent: 2rem;
}

.doc-content p strong {
  color: #000;
}

.doc-stamp {
  margin-top: 4rem;
  text-align: right;
  font-size: 1.15rem;
  font-weight: 600;
  color: #111;
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

.elegant-card-dark {
  background: #0f1719;
  color: #fff;
  border-top: 3px solid #C5A059;
}

.card-title {
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
}

.resume-list li {
  margin-bottom: 1rem;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.2);
  padding-bottom: 1rem;
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

/* 留言板 */
.message-board {
  border-left: 2px solid #C5A059;
  padding-left: 2.5rem;
  position: relative;
}

.message-item {
  margin-bottom: 2rem;
  position: relative;
}

.message-item::before {
  content: '';
  position: absolute;
  left: calc(-2.5rem - 1px);
  transform: translateX(-50%);
  top: 8px;
  /* Perfectly aligned to the center of the first line approx */
  width: 12px;
  height: 12px;
  background: #fdfbf7;
  border: 2px solid #C5A059;
  border-radius: 50%;
}

.author {
  font-weight: bold;
  color: #0f1719;
  display: block;
  margin-bottom: 0.3rem;
}

.content {
  color: #555;
  font-style: italic;
}

/* 节目板块 */
.programs-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

.program-card {
  background: #fff;
  border: 1px solid #ddd;
  padding: 2rem;
  text-decoration: none;
  min-width: 250px;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}

.program-card:hover {
  border-color: #C5A059;
  box-shadow: 0 10px 30px rgba(197, 160, 89, 0.15);
  transform: translateY(-5px);
}

.prog-type {
  font-size: 0.85rem;
  color: #C5A059;
  letter-spacing: 2px;
  margin-bottom: 1rem;
}

.prog-title {
  color: #0f1719;
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
}

.prog-status {
  font-size: 0.9rem;
  color: #999;
  border-top: 1px solid #eee;
  padding-top: 1rem;
}

.program-card:hover .prog-status {
  color: #C5A059;
}

/* Custom Toast Modal */
.custom-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  background: rgba(15, 23, 25, 0.9);
  color: #C5A059;
  padding: 1.2rem 3rem;
  border-radius: 8px;
  font-size: 1.2rem;
  letter-spacing: 2px;
  z-index: 9999;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(197, 160, 89, 0.3);
}

.custom-toast.toast-visible {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

/* Contact Info Magical Font */
.magical-font {
  font-size: 1.8rem;
  font-weight: bold;
  letter-spacing: 2px;
}

/* Footer */
.footer {
  background: #0a0f11;
  color: #888;
  padding: 4rem 0 2rem;
}

.footer-layout {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #222;
  padding-bottom: 3rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 3rem;
}

.logo-text {
  color: #fff;
  font-size: 2rem;
  letter-spacing: 4px;
  margin-bottom: 1rem;
}

.footer-links-wrap a {
  display: block;
  color: #aaa;
  margin-bottom: 1rem;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links-wrap a:hover {
  color: #C5A059;
}

.footer-bottom {
  text-align: center;
  font-size: 0.9rem;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .split-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .mobile-toggle {
    display: flex;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: #0f1719;
    flex-direction: column;
    padding: 1rem 0;
  }

  .nav-links.nav-open {
    display: flex;
  }

  .nav-links a {
    margin: 0.5rem 0;
    text-align: center;
  }

  header,
  header.header-scrolled {
    padding: 0.5rem 0;
    background: #0f1719;
  }

  .header-content {
    flex-wrap: wrap;
  }

  .logo {
    font-size: 1.5rem;
  }

  .subhero {
    height: 350px;
  }

  .subhero-title {
    font-size: 2.2rem;
  }

  .red-document {
    padding: 2rem 1.5rem;
  }
}
</style>
