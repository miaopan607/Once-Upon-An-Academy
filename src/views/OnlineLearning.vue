<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

type CourseScheduleRow = {
  id: string;
  section: string;
  program: string;
  mentor: string;
  linkText: string;
  linkUrl: string;
};

type CourseScheduleDisplayRow = CourseScheduleRow & {
  rowSpan: number;
  showSection: boolean;
};

const schedule = ref<CourseScheduleRow[]>([]);
const loading = ref(true);
const loadError = ref(false);

function getLinkText(row: CourseScheduleRow) {
  return row.linkText || (row.linkUrl ? '点击跳转' : '敬请期待');
}

const displaySchedule = computed<CourseScheduleDisplayRow[]>(() => {
  return schedule.value.map((row, index, rows) => {
    const showSection = index === 0 || row.section !== rows[index - 1].section;
    const rowSpan = showSection
      ? rows.slice(index).findIndex((nextRow) => nextRow.section !== row.section)
      : 0;

    return {
      ...row,
      showSection,
      rowSpan: rowSpan === -1 ? rows.length - index : rowSpan,
    };
  });
});

async function fetchSchedule(showLoading = false) {
  if (showLoading) {
    loading.value = true;
  }

  try {
    const res = await fetch('/api/course-schedule');
    if (!res.ok) throw new Error('fetch failed');
    const data = await res.json();
    schedule.value = Array.isArray(data.schedule) ? data.schedule : [];
    loadError.value = false;
  } catch {
    loadError.value = true;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchSchedule(true);
});
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
                <tr v-if="loading">
                  <td class="table-state" colspan="4">课程表载入中...</td>
                </tr>
                <tr v-else-if="loadError">
                  <td class="table-state" colspan="4">课程表暂时无法载入，请稍后再试</td>
                </tr>
                <tr v-else-if="displaySchedule.length === 0">
                  <td class="table-state" colspan="4">暂无课程安排</td>
                </tr>
                <template v-else>
                  <tr v-for="row in displaySchedule" :key="row.id">
                    <th v-if="row.showSection" scope="row" :rowspan="row.rowSpan">{{ row.section }}</th>
                    <td>{{ row.program }}</td>
                    <td>{{ row.mentor }}</td>
                    <td class="location-cell">
                      <a
                        v-if="row.linkUrl"
                        class="course-link"
                        :href="row.linkUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {{ getLinkText(row) }}
                      </a>
                      <span v-else>{{ getLinkText(row) }}</span>
                    </td>
                  </tr>
                </template>
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

.schedule-table tbody td {
  text-align: center;
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

.table-state {
  padding: 2rem 1rem !important;
  color: #655c4d;
  text-align: center !important;
  letter-spacing: 0.08em;
}

.course-link {
  color: #7c5a14;
  text-decoration: none;
  border-bottom: 1px solid rgba(124, 90, 20, 0.35);
  transition: color 0.25s ease, border-color 0.25s ease;
}

.course-link:hover {
  color: #0f1719;
  border-color: #0f1719;
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
