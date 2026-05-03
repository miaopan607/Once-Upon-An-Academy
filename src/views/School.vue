<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const colleges = [
  {
    name: '音乐学院',
    desc: [
      '音乐学院是从前书院极具特色、独树一帜的艺术院系。本院深耕苦情歌与小甜歌艺术教学，摒弃枯燥的传统声乐教学模式，主打培养既有感情又有技巧的情歌小王子小公主。',
      '本院于设立之初便已拥有了自己独立的院楼——松风亭。松风亭坐落于从前书院西南角，亭外还有一大花园，桃红柳绿，春色如许。走进花园，会看到一条绘满彩色壁画的画廊，虽然画上的金粉由于年久失修早已脱落，但在一番良辰美景的衬托下，这里仍成为了从前书院公认的情侣约会天堂。',
      '本院师资专业水平一流，由杜丽娘教授、柳梦梅教授联合坐镇授课。杜丽娘教授毕业于南安书院，后留校任教，现系从前书院音乐学院教授。在读时主修声乐，曾获全国声乐大赛女子组特等奖。柳梦梅教授先后毕业于东郡书院、岭南书院，现系从前书院音乐学院教授。在读时主修作曲，曾获全国谱曲大赛第一名。二位导师深谙爱恨嗔痴、缱绻温柔的情感内核，拥有顶级的情绪理解能力与唱腔塑造能力。跨越古今的恋爱阅历，也是学院独一无二的教学教科书。不同于普通声乐老师只教音调、节拍、技巧，两位教授专攻“入梦式唱法”，不讲枯燥乐理套路，主打沉浸式情绪输出，擅长用想象梦中情人的方法教导学生掌握流行情歌的拉扯感、遗憾感，以及久别重逢、起死回生的宿命感，让学生在歌声中传递情感的时候能做到令旁听者潸然泪下。',
      '本院教学风格自由，课堂氛围轻松随性。上课可带手绢，同时也允许课上小憩入梦寻找演唱灵感。日常练习不是机械练歌，而是沉浸式亲身体验爱恨离愁；期末考核不注重理论知识，核心评判标准为是否打动了听众，是否唱得出爱恨跨越千古的故事感。考试形式多样，可凭学生的擅长之处做自由选择。',
      '自建院以来，依托两位传奇教授的独特教学体系，打破传统声乐的固化壁垒，培养了许多杰出的音乐界才子。自学院创设以来，我院始终秉持“爱恨都真诚，悲喜都真实”的教育理念，致力于培养技巧合格、感情饱满、温柔浪漫的全能情歌歌手。让学子不止学会唱歌，更学会读懂浪漫、诠释温柔，变成一个温柔且强大的人。'
    ],
    mentors: [
      {
        name: '杜丽娘',
        gender: '女',
        photo: '/导师图片/杜丽娘.webp',
        desc: '毕业并曾任教于南安书院，现系从前书院音乐学院教授，主修声乐，曾获全国声乐大赛女子组特等奖。据说对比较宅的学生会特别关照。'
      },
      {
        name: '柳梦梅',
        gender: '男',
        photo: '/导师图片/柳梦梅.webp',
        desc: '先后毕业于东郡书院、岭南书院，现系从前书院音乐学院教授，主修作曲，曾获全国谱曲大赛第一名。相传，柳老师医术高超，有起死回生之法，说是杜老师的救命恩人。'
      }
    ]
  },
  {
    name: '艺术学院',
    desc: [
      '从前书院艺术学院，向来是天下美术学子心之向往之地。他们因一腔对笔墨丹青的热爱而千里迢迢相逢于此，渴望将世间美好皆融入笔下。艺术学院愿与莘莘学子携手走向实现艺术梦想的康庄大道。',
      '本院坐落于书院西侧的潇湘画馆。画馆外有一景致雅致的花园名曰“大观园”。园内曲径通幽、花木扶苏，一步一景皆藏诗意。既是师生课余观景的好去处，也是画馆外最灵动的自然景致。闲时漫步其间，清风明月相伴，处处皆是可入画的良辰美景。',
      '师资方面，学院拥有“陌上人如玉”的两位神仙导师——贾宝玉教授与林黛玉教授。贾宝玉教授毕业于大观书院，主攻草书书法，笔下文字灵动飘逸，至今已举办个人书法展三十余次，笔下作品藏着独一份的通透意趣。就是偶尔会因琢磨作品意境，对着院里花草发呆，教学却格外认真负责。林黛玉教授毕业于金陵书院，深耕名画鉴赏，在各学堂举办的个人鉴赏讲座多达四十余次，画技鉴赏界一绝。平日里两位教授教学严谨专业，私下里却偶尔打打闹闹，拌嘴说笑。他们因对艺术教育的热忱而与书院相遇，携手搭建起这片兼具专业与温度的艺术沃土。',
      '学院一向致力于把学生培养成能“提笔绘缱倦，落笔寄相思”的成熟画功。鼓励学子执笔绘心，用画笔表达出内心最深处的细腻情感，用心感受眼前所见之画作里深层的思想与感情。让艺术扎根生活，让艺术体现生活。',
      '潇湘画馆以笔墨为舟，以天地为卷，静待每一位热爱艺术的你，共绘山河，共赴风华。'
    ],
    mentors: [
      { name: '贾宝玉', gender: '男', photo: '/导师图片/贾宝玉.webp', desc: '毕业于大观书院，现系从前书院艺术学院教授，主修书法，个人十余岁为古建筑题字牌匾，书法作品收到政治高层赞扬和求取。据说家里很有钱，周末会直升机往返书院和家，所以周末好像不怎么用加练。' },
      { name: '林黛玉', gender: '女', photo: '/导师图片/林黛玉.webp', desc: '毕业于金陵书院，现系从前书院艺术学院教授，主修美术鉴赏，现已担任国际艺术展特邀评委四十余次。喜画文风骨和明朝文物，但是林老师好像不太喜欢学生带发钗和点冷香。' }
    ]
  },
  {
    name: '文学学院',
    desc: [
      '从前书院于成立之初便设立文学学院，是书院最早成立的学院之一。建院之初，得书院鼎力相助，为本学院修建了一栋独立的院楼——万松文苑。万松文苑占地508㎡，坐落于书院居中位置，地理位置十分优渥。',
      '本学院学风松弛自由，摒弃了充满条条框框的刻板教条，允许学院学生偶尔睡个懒觉，醒来加餐。育人方面，学院坚持践行“以情悟文，以学养心”的教育理念。致力于培养温柔通透，笔墨出众的学子。曾培养出薛簿会、提布南、柳森武、陆人贾等多名为文学领域做出过突出贡献的佼佼者。',
      '本院师资队伍强大，特聘千古知名才子佳人梁山伯教授与祝英台教授担任常驻导师。两位导师学识渊博，读研期间曾为同门学子，期间共同在国内文学领域顶级杂志KTV期刊上发表过多篇一作论文。两位教授亦擅长因材施教，主要教授诗词文笔、处世涵养与风雅礼数。另外，由于一些难以揣测的千古渊源，梁教授尤为反感姓马的学生，因此本院为尊重梁教授意愿，特设立一条院规：为避免师生矛盾，影响学习体验，诚挚建议所有马姓学子择优报考其他学院。若有不便之处，敬请谅解。',
      '愿四方少年奔赴万松文苑，于此手中握笔为剑，身侧千帆相伴。与同窗共同执笔写风雅，拾字赴温柔。于松风墨韵间学有所得，在诗书天地里自在成长，奔赴属于自己独一无二的百味人间。'
    ],
    mentors: [
      {
        name: '梁山伯',
        gender: '男',
        photo: '/导师图片/梁山伯.webp',
        desc: '先后毕业于万松书院、从前书院，毕业后即聘本校教职。现为文学院教授。不太擅长猜谜。对马姓同事好像抱有一丝警惕。'
      },
      {
        name: '祝英台',
        gender: '女',
        photo: '/导师图片/祝英台.webp',
        desc: '先后毕业于万松书院、从前书院，毕业后即聘本校教职。现为文学院教授。性格活泼开朗，常常逗趣学生。上课总喜欢戴耳环。'
      }
    ]
  },
  {
    name: '体育学院',
    desc: [
      '从前书院曾开设“西楚班”，专门招收前来习武的子弟。后因西楚班规模逐渐壮大，书院决定成立体育学院，以提供更细致化更丰富的课程给更多慕名前来习武深造的江湖学子。',
      '本学院坐落于从前书院最北端的拊轼轩，是公认的最具魄力学院。“拊轼”取自霸王凭轼揽山河的典故，寓意登高砺骨，象征学子凭体魄立身、凭武艺成事，是书院锤炼筋骨、精进武术的专属宝地。本院主要教授极具王者气魄的各类武术、运动。大力弘扬以楚汉风骨为核心的学院精神，培养坚韧不屈、迎难而上、大敌当前临危不乱的大将精神。专治四肢无力、体态松散、气场不足等各类初入学院的学子通病。',
      '本院师资阵容堪称史诗顶配，两位国际健将级金牌教授坐镇。二人同毕业于吴中武校，功底深厚、履历传奇，是文武双修的标杆级导师。',
      '项羽教授，学院力量系王牌导师。天生气力超群，完美诠释“力拔山兮气盖世”的顶级体魄。专攻举重、刀枪术。主要教授力量训练、兵器实战技法、爆发力突破等课程。项羽教授教学风格耿直严厉，无人敢缨其锋芒，也坚守“英雄会当不胜不归”的信念。日常训练不花里胡哨的无用功，只练在江湖中、在战场上有用武之地的真功夫。',
      '虞姬教授，学院身法美学首席导师，专攻剑术。虞姬教授主打轻盈身法与仪态塑造。剑法动静相宜、刚柔并济，快可御敌，慢可修身。擅长矫正体态、打磨身姿，教会学生何为翩若惊鸿，剑韵天成。打破大众“体育只有蛮力”的刻板印象，证明体育运动也可以有古典美感。',
      '多年来，体育学院一直秉承“逢战必扬眉”的办学理念，给本院学子以充足而饱满的精神动力去努力学习各项武艺技能。院内特色课程包罗万象，开设举重力量训练、刀枪实战、形体剑术、仪态塑造等专项课程。不止训练体能体魄，更能磨炼心性毅力。本院坚持将楚汉武侠底蕴与现代体育训练结合，培养体魄强健、身姿优雅、文武兼备的六边形人才。'
    ],
    mentors: [
      {
        name: '项羽',
        gender: '男',
        photo: '/导师图片/项羽.webp',
        desc: '国际健将级运动员，毕业于吴中武校，现系从前书院体育学院教授，已入选国家万人计划。主修举重、刀枪术。所授武校学子有数十万之众。性急，脾气暴躁。据说曾拿酒瓶痛打训练偷懒的学生。但为人仗义，据说曾扛着学生翻过数座山前往市里就医。但好像徐州的学生期末分数普遍不高。'
      },
      {
        name: '虞姬',
        gender: '女',
        photo: '/导师图片/虞姬.webp',
        desc: '国际健将级运动员，毕业于吴中武校，现系从前书院体育学院教授，主修剑术。性格温婉近人，学生普遍更喜欢虞老师来上课，因为可以减少被训罚的风险。'
      }
    ]
  },
  {
    name: '藏经阁',
    desc: [
      '从前书院最神秘而令人神往的地方。据说其主理人名曰“卿主任”，他才高八斗，学富五车，却鲜有露面，书院内知其真容者屈指可数。阁内挂一牌匾，上书七字草书：“心有沧海可撑篙”。',
      '每每有书院学子途径藏经阁，总忍不住想进去一探究竟。而那些入了此阁的人，鲜少即刻归来，总要隔上许久，才会重现身影……'
    ],
    mentors: [
      { name: '卿主任', gender: '未知', photo: '/导师图片/卿主任.webp', desc: '性别未知，爱好未知，只知道它常常会在书院抓逃课的学生。' }
    ]
  }
];
</script>

<template>
  <div class="school-page">
    <section class="subhero">
      <div class="subhero-bg" style="background-image: url('/hero.webp');"></div>
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
            <div class="section-header college-title">
              <h2 class="title-primary">{{ college.name }}</h2>
            </div>
            <div class="college-mentors">
              <div class="mentor-card" v-for="mentor in college.mentors" :key="mentor.name">
                <div class="mentor-photo">
                  <img :src="mentor.photo" :alt="mentor.name" />
                </div>
                <div class="mentor-info">
                  <div class="mentor-header">
                    <h3 class="mentor-name">{{ mentor.name }}</h3>
                    <span class="mentor-gender">性别：{{ mentor.gender }}</span>
                  </div>
                  <p class="mentor-desc">{{ mentor.desc }}</p>
                </div>
              </div>
            </div>
            <div class="college-intro">
              <p class="college-desc" v-for="(para, i) in college.desc" :key="i">{{ para }}</p>
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

.college-title {
  text-align: center;
  margin-bottom: 2rem;
}

.college-intro {
  margin-top: 3rem;
  text-align: center;
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
  width: 120px;
  height: 160px;
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
  justify-content: flex-start;
  min-width: 0;
}

.mentor-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
}

.mentor-name {
  font-size: 1.15rem;
  color: #0f1719;
  font-weight: 600;
  letter-spacing: 2px;
}

.mentor-gender {
  font-size: 0.85rem;
  color: #b8860b;
  letter-spacing: 1px;
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
  .mentor-header { justify-content: center; }
  .mentor-photo { width: 100px; height: 133px; }
  .mentor-desc { text-align: center; }
  .page-entry { padding: 3rem 0 2rem; }
}
</style>


