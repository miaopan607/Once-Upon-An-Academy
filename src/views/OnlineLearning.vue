<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="online-page">
    <section class="subhero">
      <div class="subhero-bg" style="background-image: url('/hero.webp');"></div>
      <div class="subhero-overlay"></div>
      <div class="subhero-content">
        <h1 class="subhero-title">网上教学</h1>
        <div class="subhero-divider"></div>
        <p class="subhero-motto">云端修学 · 不辍精进</p>
      </div>
    </section>

    <div class="main-body">
      <section class="course-section section-padding bg-paper">
        <div class="container">
          <div class="section-header text-center">
            <h2 class="title-primary">2026 生贺节目课程</h2>
          </div>

          <div class="course-schedule">
            <table class="schedule-table">
              <thead>
                <tr>
                  <th>环节</th>
                  <th>节目名称</th>
                  <th>课程小导师</th>
                  <th>上课链接</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">课前预习</th>
                  <td>抽象测试题</td>
                  <td>星词</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <th scope="row">书院先行曲</th>
                  <td>第七个孟夏</td>
                  <td>芙糯酝</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <th scope="row" rowspan="5">劳技课</th>
                  <td>梦的栖息地</td>
                  <td>小浪花</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <td>黄黄赣州舞蹈翻跳</td>
                  <td>栋栋</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <td>魔术擂台</td>
                  <td>万梦星</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <td>模仿大赛</td>
                  <td>咔咔</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <td>特制小剧场</td>
                  <td>葭琲super</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <th scope="row">课间休息</th>
                  <td>文言文冷笑话</td>
                  <td>林小默</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <th scope="row" rowspan="9">音乐课</th>
                  <td>卿心映梦</td>
                  <td>i若离</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <td>秦淮河边的陈年往事</td>
                  <td>一颗橙橙</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <td>扶卿游梦</td>
                  <td>仁之</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <td>失调名</td>
                  <td>万梦星</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <td>从我的梦中鹿过</td>
                  <td>嘟嘟</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <td>喵都喵了</td>
                  <td>葭琲super</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <td>万梦星</td>
                  <td>凌辰</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <td>惊梦四叠</td>
                  <td>余安</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <td>三十行情诗</td>
                  <td>恭玉</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <th scope="row">课间电影</th>
                  <td>入梦深也</td>
                  <td>红桃派</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <th scope="row" rowspan="5">美术课</th>
                  <td>生日贺图：诗里见新章</td>
                  <td>一颗橙橙</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <td>生日贺图：海树等山花</td>
                  <td>耐耐</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <td>生日贺图：花影</td>
                  <td>炸裂猛贝</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <td>生日贺图：奇迹小黄OOTD</td>
                  <td>王富贵</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <td>手绘梦境</td>
                  <td>面条</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <th scope="row">课间休息</th>
                  <td>眼保健操</td>
                  <td>面条</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <th scope="row" rowspan="4">国学课</th>
                  <td>临江仙</td>
                  <td>花魂</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <td>今日无轼</td>
                  <td>北辰寒星</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <td>魔鬼瓶</td>
                  <td>林小默</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <td>生辰宴</td>
                  <td>咔咔</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <th scope="row">随堂小测</th>
                  <td>听力测试</td>
                  <td>面条</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <th scope="row" rowspan="6">入梦课</th>
                  <td>惊梦·寻花【游园惊梦篇】</td>
                  <td>浮光跃金</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <td>贺卿芳华【木石前盟篇】</td>
                  <td>耐耐</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <td>蝶携云信·卿贺诗辰【梁祝化蝶篇】</td>
                  <td>北音卿樾</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <td>展信佳【霸王别姬篇】</td>
                  <td>浮光跃金</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <td>故事外的人【等入梦系列】</td>
                  <td>恭玉</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <td>入梦课小彩蛋</td>
                  <td>芙糯酝</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <th scope="row">午间阅读</th>
                  <td>聊赠心间第一春</td>
                  <td>多读书</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <th scope="row">课后作业</th>
                  <td>弹舌口哨教学</td>
                  <td>温若樱</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
                <tr>
                  <th scope="row">放学铃</th>
                  <td>那年夏，从俱往矣开始</td>
                  <td>恭玉</td>
                  <td class="location-cell">敬请期待</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- 底部入口 -->
      <section class="page-entry section-padding">
        <div class="container text-center">
          <button class="entry-btn" @click="router.push('/contact')">
            <span>前往 · 联系我们</span>
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

.course-schedule {
  margin-top: 3rem;
  overflow-x: auto;
}

.schedule-table {
  width: 100%;
  min-width: 760px;
  border-collapse: collapse;
  overflow: hidden;
  font-family: "Noto Serif SC", "STSong", "SimSun", serif;
  color: #1b272a;
  background: rgba(255, 252, 244, 0.86);
  border: 1px solid rgba(15, 23, 25, 0.12);
  box-shadow: 0 18px 45px rgba(15, 23, 25, 0.08);
}

.schedule-table th,
.schedule-table td {
  padding: 0.9rem 1rem;
  border: 1px solid rgba(15, 23, 25, 0.12);
  line-height: 1.7;
  text-align: left;
  vertical-align: middle;
}

.schedule-table thead th {
  color: #3f3a2f;
  background: rgba(228, 218, 194, 0.62);
  font-weight: 500;
  letter-spacing: 0.12em;
  text-align: center;
}

.schedule-table tbody th {
  width: 16%;
  color: #4a4336;
  background: rgba(235, 228, 210, 0.52);
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.08em;
}

.schedule-table tbody tr:nth-child(even) td {
  background: rgba(255, 255, 255, 0.42);
}

.location-cell {
  width: 15%;
  color: #655c4d;
  font-weight: 600;
  text-align: center !important;
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

  .course-section .container { padding: 0 1rem; }

  .course-schedule {
    margin-top: 2rem;
    overflow-x: visible;
  }

  .schedule-table {
    min-width: 0;
    table-layout: fixed;
    font-size: 0.78rem;
  }

  .schedule-table th,
  .schedule-table td {
    padding: 0.5rem 0.35rem;
    line-height: 1.5;
    word-break: break-word;
  }

  .schedule-table thead th {
    letter-spacing: 0.04em;
  }

  .schedule-table tbody th {
    width: 18%;
    letter-spacing: 0.02em;
  }

  .location-cell { width: 18%; }

  .page-entry { padding: 3rem 0 2rem; }
}
</style>
