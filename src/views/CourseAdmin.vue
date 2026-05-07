<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

type CourseScheduleRow = {
  id: string;
  section: string;
  program: string;
  mentor: string;
  linkText: string;
  linkUrl: string;
};

const password = ref(sessionStorage.getItem('course_admin_password') || '');
const authed = ref(false);
const loading = ref(true);
const saving = ref(false);
const saveSucceeded = ref(false);
const message = ref('');
const messageType = ref<'success' | 'error' | ''>('');
const schedule = ref<CourseScheduleRow[]>([]);
const updatedAt = ref('');
let saveSuccessTimer: number | undefined;

const canSave = computed(() => authed.value && !saving.value && schedule.value.length > 0);

function showMessage(text: string, type: 'success' | 'error') {
  message.value = text;
  messageType.value = type;
}

function showSaveSuccess() {
  saveSucceeded.value = true;
  window.clearTimeout(saveSuccessTimer);
  saveSuccessTimer = window.setTimeout(() => {
    saveSucceeded.value = false;
  }, 2000);
}

function createRow(): CourseScheduleRow {
  return {
    id: `course-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    section: '',
    program: '',
    mentor: '',
    linkText: '',
    linkUrl: '',
  };
}

function normalizeRows(rows: CourseScheduleRow[]) {
  return rows.map((row) => ({
    ...row,
    linkText: row.linkText === '敬请期待' || row.linkText === '点击跳转' ? '' : row.linkText,
  }));
}

function getAutoLinkText(row: CourseScheduleRow) {
  return row.linkUrl ? '点击跳转' : '敬请期待';
}

function useCustomLinkText(row: CourseScheduleRow) {
  row.linkText = getAutoLinkText(row);
}

function useAutoLinkText(row: CourseScheduleRow) {
  row.linkText = '';
}

async function fetchSchedule() {
  loading.value = true;

  try {
    const res = await fetch('/api/course-schedule');
    if (!res.ok) throw new Error('fetch failed');
    const data = await res.json();
    schedule.value = Array.isArray(data.schedule) ? normalizeRows(data.schedule) : [];
    updatedAt.value = data.updatedAt || '';
  } catch {
    showMessage('课程表载入失败，请检查后端服务', 'error');
  } finally {
    loading.value = false;
  }
}

async function verifyPassword() {
  if (!password.value) {
    showMessage('请先输入管理密码', 'error');
    return;
  }

  loading.value = true;

  try {
    const res = await fetch('/api/course-schedule/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: password.value }),
    });

    if (!res.ok) {
      throw new Error(res.status === 500 ? 'not configured' : 'invalid password');
    }

    authed.value = true;
    sessionStorage.setItem('course_admin_password', password.value);
    showMessage('验证成功，可以编辑课程表', 'success');
    await fetchSchedule();
  } catch (error) {
    const text = error instanceof Error && error.message === 'not configured'
      ? '后端未配置 COURSE_ADMIN_PASSWORD'
      : '密码错误，请重试';
    showMessage(text, 'error');
  } finally {
    loading.value = false;
  }
}

async function saveSchedule() {
  if (!canSave.value) return;

  saving.value = true;

  try {
    const res = await fetch('/api/course-schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: password.value, schedule: normalizeRows(schedule.value) }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      if (data?.error) {
        throw new Error(data.error);
      }

      throw new Error(res.status === 401 ? 'invalid password' : 'save failed');
    }

    const data = await res.json();
    schedule.value = Array.isArray(data.schedule) ? normalizeRows(data.schedule) : [];
    updatedAt.value = data.updatedAt || '';
    message.value = '';
    messageType.value = '';
    showSaveSuccess();
  } catch (error) {
    const text = error instanceof Error
      ? error.message === 'invalid password' ? '密码已失效，请重新验证' : error.message
      : '保存失败，请稍后再试';
    showMessage(text, 'error');
  } finally {
    saving.value = false;
  }
}

function addRow(index = schedule.value.length - 1) {
  schedule.value.splice(index + 1, 0, createRow());
}

function removeRow(index: number) {
  if (schedule.value.length <= 1) {
    showMessage('至少保留一行课程', 'error');
    return;
  }

  schedule.value.splice(index, 1);
}

function moveRow(index: number, direction: -1 | 1) {
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= schedule.value.length) return;

  const [row] = schedule.value.splice(index, 1);
  schedule.value.splice(targetIndex, 0, row);
}

function clearSession() {
  authed.value = false;
  sessionStorage.removeItem('course_admin_password');
  showMessage('已退出编辑', 'success');
}

onMounted(() => {
  if (password.value) {
    verifyPassword();
    return;
  }

  fetchSchedule();
});
</script>

<template>
  <div class="admin-page">
    <header class="admin-header">
      <h1>课程表管理</h1>
      <div class="header-actions">
        <button type="button" class="secondary-btn" :disabled="loading" @click="fetchSchedule">刷新</button>
        <button type="button" class="secondary-btn" :disabled="!authed" @click="addRow()">新增行</button>
        <button type="button" :disabled="!canSave" @click="saveSchedule">
          {{ saving ? '保存中...' : saveSucceeded ? '保存成功' : '保存' }}
        </button>
      </div>
    </header>

    <main class="admin-main">
      <div class="top-row">
        <form class="password-form" @submit.prevent="verifyPassword">
          <template v-if="authed">
            <button type="button" class="secondary-btn" @click="clearSession">退出登录</button>
          </template>
          <template v-else>
            <input v-model="password" type="password" autocomplete="current-password" placeholder="管理密码">
            <button type="submit" :disabled="loading">验证</button>
          </template>
        </form>
        <div class="status-text">
          <span v-if="loading">载入中</span>
          <span v-else-if="updatedAt">更新于 {{ new Date(updatedAt).toLocaleString('zh-CN') }}</span>
          <span v-else>未保存</span>
        </div>
      </div>

      <div v-if="message" class="message" :class="messageType">
        {{ message }}
      </div>

      <div v-if="!authed" class="locked-state">
        输入密码后编辑。
      </div>

      <div v-else class="editor-wrap">
        <p class="editor-note">链接文字为自动时：上课链接为空显示“敬请期待”，不为空显示“点击跳转”。</p>
        <table class="editor-table">
          <thead>
            <tr>
              <th>环节</th>
              <th>节目名称</th>
              <th>课程小导师</th>
              <th>链接文字</th>
              <th>上课链接</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in schedule" :key="row.id">
              <td><input v-model="row.section" placeholder="如：音乐课"></td>
              <td><input v-model="row.program" placeholder="节目名称"></td>
              <td><input v-model="row.mentor" placeholder="小导师"></td>
              <td>
                <div v-if="row.linkText" class="link-text-editor">
                  <input v-model="row.linkText" placeholder="链接文字">
                  <button type="button" class="mini-btn" @click="useAutoLinkText(row)">自动</button>
                </div>
                <div v-else class="auto-link-text">
                  <span>自动：{{ getAutoLinkText(row) }}</span>
                  <button type="button" class="mini-btn" @click="useCustomLinkText(row)">自定义</button>
                </div>
              </td>
              <td><input v-model="row.linkUrl" placeholder="留空则显示纯文本链接文字"></td>
              <td class="row-actions">
                <button type="button" class="mini-btn" :disabled="index === 0" @click="moveRow(index, -1)">上移</button>
                <button type="button" class="mini-btn" :disabled="index === schedule.length - 1" @click="moveRow(index, 1)">下移</button>
                <button type="button" class="mini-btn" @click="addRow(index)">添加</button>
                <button type="button" class="mini-btn danger" @click="removeRow(index)">删除</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="mobile-editor-list">
          <article v-for="(row, index) in schedule" :key="row.id" class="mobile-editor-card">
            <div class="mobile-card-head">
              <span>第 {{ index + 1 }} 项</span>
              <button type="button" class="mini-btn danger" @click="removeRow(index)">删除</button>
            </div>

            <label>
              <span>环节</span>
              <input v-model="row.section" placeholder="如：音乐课">
            </label>

            <label>
              <span>节目名称</span>
              <input v-model="row.program" placeholder="节目名称">
            </label>

            <label>
              <span>课程小导师</span>
              <input v-model="row.mentor" placeholder="小导师">
            </label>

              <label>
                <span>链接文字</span>
                <div v-if="row.linkText" class="link-text-editor">
                  <input v-model="row.linkText" placeholder="链接文字">
                  <button type="button" class="mini-btn" @click="useAutoLinkText(row)">自动</button>
                </div>
                <div v-else class="auto-link-text">
                  <span>自动：{{ getAutoLinkText(row) }}</span>
                  <button type="button" class="mini-btn" @click="useCustomLinkText(row)">自定义</button>
                </div>
              </label>

            <label>
              <span>上课链接</span>
              <input v-model="row.linkUrl" placeholder="留空则显示纯文本链接文字">
            </label>

            <div class="mobile-row-actions">
              <button type="button" class="mini-btn" :disabled="index === 0" @click="moveRow(index, -1)">上移</button>
              <button type="button" class="mini-btn" :disabled="index === schedule.length - 1" @click="moveRow(index, 1)">下移</button>
              <button type="button" class="mini-btn" @click="addRow(index)">添加</button>
            </div>
          </article>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.admin-page {
  min-height: 100vh;
  color: #111827;
  background: #f8fafc;
  font-family: Arial, "Microsoft YaHei", sans-serif;
}

.admin-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
  background: #fff;
}

.admin-header h1 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.admin-main {
  padding: 24px;
}

.header-actions,
.top-row,
.password-form,
.row-actions {
  display: flex;
  gap: 8px;
}

.top-row {
  align-items: center;
  justify-content: space-between;
}

.locked-state,
.message {
  border: 1px solid #e5e7eb;
  background: #fff;
}

input {
  width: 100%;
  box-sizing: border-box;
  height: 36px;
  padding: 0 10px;
  color: #111827;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background: #fff;
  font: inherit;
}

.password-form input {
  width: 240px;
}

button {
  height: 36px;
  padding: 0 14px;
  color: #fff;
  background: #2563eb;
  border: 1px solid #2563eb;
  border-radius: 4px;
  cursor: pointer;
  font: inherit;
  white-space: nowrap;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.secondary-btn,
.mini-btn {
  color: #374151;
  background: #fff;
  border-color: #d1d5db;
}

.message {
  margin-top: 12px;
  padding: 10px 12px;
  border-radius: 4px;
  font-size: 14px;
}

.message.success {
  color: #166534;
  border-color: #bbf7d0;
  background: #f0fdf4;
}

.message.error {
  color: #991b1b;
  border-color: #fecaca;
  background: #fef2f2;
}

.status-text {
  color: #6b7280;
  font-size: 14px;
}

.locked-state {
  margin-top: 12px;
  padding: 48px 16px;
  color: #6b7280;
  border-radius: 4px;
  text-align: center;
}

.editor-wrap {
  margin-top: 12px;
  overflow-x: auto;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background: #fff;
}

.editor-note {
  margin: 0;
  padding: 10px 12px;
  color: #6b7280;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
  font-size: 14px;
}

.editor-table {
  width: 100%;
  min-width: 1080px;
  border-collapse: collapse;
}

.mobile-editor-list {
  display: none;
}

.editor-table th,
.editor-table td {
  padding: 8px;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: top;
}

.editor-table th {
  color: #374151;
  background: #f9fafb;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
}

.editor-table td:nth-child(1) { width: 12%; }
.editor-table td:nth-child(2) { width: 20%; }
.editor-table td:nth-child(3) { width: 12%; }
.editor-table td:nth-child(4) { width: 14%; }
.editor-table td:nth-child(5) { width: 24%; }

.link-text-editor,
.auto-link-text {
  display: flex;
  align-items: center;
  gap: 8px;
}

.auto-link-text span {
  flex: 1;
  min-width: 0;
  height: 36px;
  line-height: 36px;
  color: #6b7280;
}

.link-text-editor input {
  flex: 1;
  min-width: 0;
}

.link-text-editor .mini-btn,
.auto-link-text .mini-btn {
  flex: 0 0 58px;
}

.row-actions {
  flex-wrap: wrap;
  width: 170px;
}

.mini-btn {
  flex: 1 1 70px;
  height: 30px;
  padding: 0 8px;
  font-size: 13px;
}

.mini-btn.danger {
  color: #991b1b;
  border-color: #fecaca;
}

@media (max-width: 768px) {
  .admin-page {
    background: #f3f4f6;
  }

  .admin-header,
  .top-row {
    align-items: stretch;
    flex-direction: column;
  }

  .admin-header {
    position: sticky;
    padding: 14px 16px;
    box-shadow: 0 1px 8px rgba(15, 23, 42, 0.08);
  }

  .admin-header h1 {
    font-size: 18px;
  }

  .admin-main {
    padding: 12px;
  }

  .header-actions,
  .password-form {
    flex-direction: column;
  }

  .header-actions {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .header-actions button {
    padding: 0 8px;
  }

  .password-form input {
    width: 100%;
  }

  .status-text {
    font-size: 12px;
  }

  .editor-wrap {
    overflow: visible;
    border: 0;
    background: transparent;
  }

  .editor-note {
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    background: #fff;
    line-height: 1.6;
  }

  .editor-table {
    display: none;
  }

  .mobile-editor-list {
    display: grid;
    gap: 12px;
    margin-top: 12px;
  }

  .mobile-editor-card {
    padding: 12px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: #fff;
  }

  .mobile-card-head,
  .mobile-row-actions {
    display: flex;
    gap: 8px;
  }

  .mobile-card-head {
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    color: #374151;
    font-size: 14px;
    font-weight: 600;
  }

  .mobile-editor-card label {
    display: grid;
    gap: 6px;
    margin-top: 10px;
  }

  .mobile-editor-card label > span {
    color: #6b7280;
    font-size: 13px;
  }

  .mobile-row-actions {
    margin-top: 12px;
  }

  .mobile-row-actions .mini-btn {
    flex: 1;
  }
}
</style>
