import express from 'express'
import 'dotenv/config'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dirname, 'data')
const DATA_FILE = join(DATA_DIR, 'data.json')
const DIST_DIR = join(__dirname, '..', 'dist')
const COURSE_ADMIN_PASSWORD = process.env.COURSE_ADMIN_PASSWORD || ''
const MAX_COURSE_SCHEDULE_ROWS = 100

const defaultSchedule = [
  { id: 'preview-test', section: '课前预习', program: '抽象测试题', mentor: '星词', linkText: '', linkUrl: '' },
  { id: 'opening-song', section: '书院先行曲', program: '第七个孟夏', mentor: '芙糯酝', linkText: '', linkUrl: '' },
  { id: 'labor-dream-home', section: '劳技课', program: '梦的栖息地', mentor: '小浪花', linkText: '', linkUrl: '' },
  { id: 'labor-dance', section: '劳技课', program: '黄黄赣州舞蹈翻跳', mentor: '栋栋', linkText: '', linkUrl: '' },
  { id: 'labor-magic', section: '劳技课', program: '魔术擂台', mentor: '万梦星', linkText: '', linkUrl: '' },
  { id: 'labor-imitate', section: '劳技课', program: '模仿大赛', mentor: '咔咔', linkText: '', linkUrl: '' },
  { id: 'labor-theater', section: '劳技课', program: '特制小剧场', mentor: '葭琲super', linkText: '', linkUrl: '' },
  { id: 'break-joke', section: '课间休息', program: '文言文冷笑话', mentor: '林小默', linkText: '', linkUrl: '' },
  { id: 'music-qingxin', section: '音乐课', program: '卿心映梦', mentor: 'i若离', linkText: '', linkUrl: '' },
  { id: 'music-qinhuai', section: '音乐课', program: '秦淮河边的陈年往事', mentor: '一颗橙橙', linkText: '', linkUrl: '' },
  { id: 'music-fuqing', section: '音乐课', program: '扶卿游梦', mentor: '仁之', linkText: '', linkUrl: '' },
  { id: 'music-shidiao', section: '音乐课', program: '失调名', mentor: '万梦星', linkText: '', linkUrl: '' },
  { id: 'music-luguo', section: '音乐课', program: '从我的梦中鹿过', mentor: '嘟嘟', linkText: '', linkUrl: '' },
  { id: 'music-meow', section: '音乐课', program: '喵都喵了', mentor: '葭琲super', linkText: '', linkUrl: '' },
  { id: 'music-wanmengxing', section: '音乐课', program: '万梦星', mentor: '凌辰', linkText: '', linkUrl: '' },
  { id: 'music-jingmeng', section: '音乐课', program: '惊梦四叠', mentor: '余安', linkText: '', linkUrl: '' },
  { id: 'music-love-poem', section: '音乐课', program: '三十行情诗', mentor: '恭玉', linkText: '', linkUrl: '' },
  { id: 'movie-rumeng', section: '课间电影', program: '入梦深也', mentor: '红桃派', linkText: '', linkUrl: '' },
  { id: 'art-new-chapter', section: '美术课', program: '生日贺图：诗里见新章', mentor: '一颗橙橙', linkText: '', linkUrl: '' },
  { id: 'art-mountain-flower', section: '美术课', program: '生日贺图：海树等山花', mentor: '耐耐', linkText: '', linkUrl: '' },
  { id: 'art-flower-shadow', section: '美术课', program: '生日贺图：花影', mentor: '炸裂猛贝', linkText: '', linkUrl: '' },
  { id: 'art-ootd', section: '美术课', program: '生日贺图：奇迹小黄OOTD', mentor: '王富贵', linkText: '', linkUrl: '' },
  { id: 'art-dream', section: '美术课', program: '手绘梦境', mentor: '面条', linkText: '', linkUrl: '' },
  { id: 'break-eye', section: '课间休息', program: '眼保健操', mentor: '面条', linkText: '', linkUrl: '' },
  { id: 'classics-linjiangxian', section: '国学课', program: '临江仙', mentor: '花魂', linkText: '', linkUrl: '' },
  { id: 'classics-wushi', section: '国学课', program: '今日无轼', mentor: '北辰寒星', linkText: '', linkUrl: '' },
  { id: 'classics-bottle', section: '国学课', program: '魔鬼瓶', mentor: '林小默', linkText: '', linkUrl: '' },
  { id: 'classics-banquet', section: '国学课', program: '生辰宴', mentor: '咔咔', linkText: '', linkUrl: '' },
  { id: 'quiz-listening', section: '随堂小测', program: '听力测试', mentor: '面条', linkText: '', linkUrl: '' },
  { id: 'dream-garden', section: '入梦课', program: '惊梦·寻花【游园惊梦篇】', mentor: '浮光跃金', linkText: '', linkUrl: '' },
  { id: 'dream-wood-stone', section: '入梦课', program: '贺卿芳华【木石前盟篇】', mentor: '耐耐', linkText: '', linkUrl: '' },
  { id: 'dream-butterfly', section: '入梦课', program: '蝶携云信·卿贺诗辰【梁祝化蝶篇】', mentor: '北音卿樾', linkText: '', linkUrl: '' },
  { id: 'dream-farewell', section: '入梦课', program: '展信佳【霸王别姬篇】', mentor: '浮光跃金', linkText: '', linkUrl: '' },
  { id: 'dream-outside', section: '入梦课', program: '故事外的人【等入梦系列】', mentor: '恭玉', linkText: '', linkUrl: '' },
  { id: 'dream-extra', section: '入梦课', program: '入梦课小彩蛋', mentor: '芙糯酝', linkText: '', linkUrl: '' },
  { id: 'reading-spring', section: '午间阅读', program: '聊赠心间第一春', mentor: '多读书', linkText: '', linkUrl: '' },
  { id: 'homework-whistle', section: '课后作业', program: '弹舌口哨教学', mentor: '温若樱', linkText: '', linkUrl: '' },
  { id: 'bell-summer', section: '放学铃', program: '那年夏，从俱往矣开始', mentor: '恭玉', linkText: '', linkUrl: '' },
]

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true })
  }
}

function createDefaultData() {
  return {
    count: 0,
    courseSchedule: defaultSchedule,
    courseScheduleUpdatedAt: new Date().toISOString(),
  }
}

function normalizeSchedule(rawSchedule) {
  if (!Array.isArray(rawSchedule)) {
    return defaultSchedule
  }

  return rawSchedule.map((row, index) => ({
    id: String(row?.id || `course-${Date.now()}-${index}`),
    section: String(row?.section || '').trim(),
    program: String(row?.program || '').trim(),
    mentor: String(row?.mentor || '').trim(),
    linkText: String(row?.linkText || '').trim(),
    linkUrl: String(row?.linkUrl || '').trim(),
  }))
}

function readData() {
  ensureDataDir()

  if (!existsSync(DATA_FILE)) {
    const defaultData = createDefaultData()
    writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2), 'utf-8')
    return defaultData
  }

  try {
    const raw = readFileSync(DATA_FILE, 'utf-8')
    const parsed = JSON.parse(raw)
    return {
      ...parsed,
      count: Number(parsed.count) || 0,
      courseSchedule: normalizeSchedule(parsed.courseSchedule),
      courseScheduleUpdatedAt: parsed.courseScheduleUpdatedAt || new Date().toISOString(),
    }
  } catch {
    return createDefaultData()
  }
}

function writeData(data) {
  ensureDataDir()
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8')
}

function readCount() {
  return readData().count
}

function writeCount(count) {
  const data = readData()
  writeData({ ...data, count })
}

function hasValidPassword(req) {
  return Boolean(COURSE_ADMIN_PASSWORD) && req.body?.password === COURSE_ADMIN_PASSWORD
}

const app = express()
app.use(express.json())

app.get('/api/checkin', (_req, res) => {
  res.json({ count: readCount() })
})

app.post('/api/checkin', (req, res) => {
  const { action } = req.body
  if (action !== 'checkin') {
    return res.status(400).json({ error: 'invalid action' })
  }
  const count = readCount() + 1
  writeCount(count)
  res.json({ count })
})

app.get('/api/course-schedule', (_req, res) => {
  const data = readData()
  res.json({
    schedule: data.courseSchedule,
    updatedAt: data.courseScheduleUpdatedAt,
  })
})

app.post('/api/course-schedule/verify', (req, res) => {
  if (!COURSE_ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'admin password is not configured' })
  }

  if (!hasValidPassword(req)) {
    return res.status(401).json({ error: 'invalid password' })
  }

  res.json({ ok: true })
})

app.post('/api/course-schedule', (req, res) => {
  if (!COURSE_ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'admin password is not configured' })
  }

  if (!hasValidPassword(req)) {
    return res.status(401).json({ error: 'invalid password' })
  }

  if (!Array.isArray(req.body?.schedule)) {
    return res.status(400).json({ error: 'invalid schedule' })
  }

  if (req.body.schedule.length > MAX_COURSE_SCHEDULE_ROWS) {
    return res.status(400).json({ error: `课程表最多支持 ${MAX_COURSE_SCHEDULE_ROWS} 行` })
  }

  const schedule = normalizeSchedule(req.body.schedule)
  const updatedAt = new Date().toISOString()
  const data = readData()
  writeData({
    ...data,
    courseSchedule: schedule,
    courseScheduleUpdatedAt: updatedAt,
  })

  res.json({ schedule, updatedAt })
})

// 生产环境：由 Express 托管前端静态文件
if (existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR))
  app.get('/{*splat}', (_req, res) => {
    res.sendFile(join(DIST_DIR, 'index.html'))
  })
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Academy server running on http://localhost:${PORT}`)
})
