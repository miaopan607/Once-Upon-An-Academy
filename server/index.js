import express from 'express'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dirname, 'data')
const DATA_FILE = join(DATA_DIR, 'data.json')
const DIST_DIR = join(__dirname, '..', 'dist')

function readCount() {
  try {
    if (!existsSync(DATA_DIR)) {
      mkdirSync(DATA_DIR, { recursive: true })
    }
    if (!existsSync(DATA_FILE)) {
      writeFileSync(DATA_FILE, JSON.stringify({ count: 0 }), 'utf-8')
    }
    const raw = readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(raw).count ?? 0
  } catch {
    return 0
  }
}

function writeCount(count) {
  writeFileSync(DATA_FILE, JSON.stringify({ count }), 'utf-8')
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

// 生产环境：由 Express 托管前端静态文件
if (existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR))
  app.get('/{*splat}', (_req, res) => {
    res.sendFile(join(DIST_DIR, 'index.html'))
  })
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Checkin server running on http://localhost:${PORT}`)
})
