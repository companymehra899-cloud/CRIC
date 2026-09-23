import express from 'express'
import cors from 'cors'
import { hasApiKey } from './config.js'
import { leagues, rankings, news, matches as mockMatches, series as mockSeries, teamList } from './data.js'
import {
  cacheInfo,
  getAllMatches,
  getMatchInfo,
  getSeriesInfo,
  getSeriesList
} from './cricapi.js'

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3001

const mockShape = (m) => ({
  id: m.id,
  status: m.status,
  state: m.state,
  format: m.format,
  formatLabel: m.formatLabel,
  category: m.category,
  series: m.series,
  seriesId: m.seriesId,
  matchNo: m.matchNo,
  venue: m.venue,
  startTime: m.startTime,
  teams: m.teams,
  score: m.score,
  note: m.note,
  city: m.city
})

const mockLive = () => mockMatches.filter((m) => m.status === 'live').map(mockShape)
const mockUpcoming = () => mockMatches.filter((m) => m.status === 'upcoming').map(mockShape)
const mockCompleted = () => mockMatches.filter((m) => m.status === 'completed').map(mockShape)

async function withFallback(fn, fallback) {
  try {
    return await fn()
  } catch (err) {
    console.warn('[api fallback]', err.message)
    return fallback()
  }
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, apiKey: hasApiKey, cache: cacheInfo(), time: new Date().toISOString() })
})

app.get('/api/home', async (_req, res) => {
  const all = await withFallback(() => getAllMatches(), () => mockMatches.map(mockShape))
  const live = all.filter((m) => m.status === 'live')
  const upcoming = all.filter((m) => m.status === 'upcoming')
  const recent = all.filter((m) => m.status === 'completed')
  const fallback = {
    live: mockLive(),
    upcoming: mockUpcoming(),
    recent: mockCompleted()
  }
  res.json({
    live: live.length ? live : fallback.live,
    upcoming: upcoming.length ? upcoming.slice(0, 8) : fallback.upcoming,
    recent: recent.length ? recent.slice(0, 8) : fallback.recent,
    leagues,
    news: news.slice(0, 6),
    featuredSeries: await withFallback(
      async () => {
        const s = await getSeriesList()
        return s.filter((x) => x.status === 'live' || x.status === 'upcoming').slice(0, 6)
      },
      () => mockSeries.filter((s) => s.status === 'live' || s.status === 'upcoming').slice(0, 6)
    )
  })
})

app.get('/api/matches', async (req, res) => {
  const { status, format, category } = req.query
  let out = await withFallback(() => getAllMatches(), () => mockMatches.map(mockShape))
  if (status) out = out.filter((m) => m.status === status)
  if (format) out = out.filter((m) => m.format === format)
  if (category) out = out.filter((m) => m.category === category)
  res.json({ count: out.length, matches: out })
})

app.get('/api/matches/live', async (_req, res) => {
  const list = await withFallback(async () => {
    const all = await getAllMatches()
    return all.filter((m) => m.status === 'live')
  }, mockLive)
  res.json({ count: list.length, matches: list })
})

app.get('/api/matches/upcoming', async (_req, res) => {
  const list = await withFallback(async () => {
    const all = await getAllMatches()
    return all.filter((m) => m.status === 'upcoming')
  }, mockUpcoming)
  res.json({ count: list.length, matches: list })
})

app.get('/api/matches/completed', async (_req, res) => {
  const list = await withFallback(async () => {
    const all = await getAllMatches()
    return all.filter((m) => m.status === 'completed')
  }, mockCompleted)
  res.json({ count: list.length, matches: list })
})

app.get('/api/matches/:id', async (req, res) => {
  try {
    const match = await withFallback(() => getMatchInfo(req.params.id), () => {
      const m = mockMatches.find((x) => x.id === req.params.id)
      if (!m) throw new Error('not found')
      return { ...mockShape(m), toss: m.toss, winner: m.winner, scores: m.scores, commentary: m.commentary, fullScorecard: true }
    })
    res.json(match)
  } catch {
    res.status(404).json({ error: 'Match not found' })
  }
})

app.get('/api/series', async (req, res) => {
  const { category, status } = req.query
  let out = await withFallback(() => getSeriesList(), () => mockSeries)
  if (category) out = out.filter((s) => s.category === category)
  if (status) out = out.filter((s) => s.status === status)
  res.json({ count: out.length, series: out })
})

app.get('/api/series/:id', async (req, res) => {
  try {
    const data = await withFallback(() => getSeriesInfo(req.params.id), () => {
      const s = mockSeries.find((x) => x.id === req.params.id)
      if (!s) throw new Error('not found')
      return { ...s, fixtures: mockMatches.filter((m) => m.seriesId === s.id).map(mockShape) }
    })
    res.json(data)
  } catch {
    res.status(404).json({ error: 'Series not found' })
  }
})

app.get('/api/leagues', (req, res) => {
  const { status } = req.query
  const out = status ? leagues.filter((l) => l.status === status) : leagues
  res.json({ count: out.length, leagues: out })
})

app.get('/api/rankings', (req, res) => {
  const { format = 'T20' } = req.query
  res.json({
    batting: rankings.batting[format] || [],
    bowling: rankings.bowling[format] || []
  })
})

app.get('/api/news', (_req, res) => res.json({ count: news.length, news }))

app.get('/api/teams', (req, res) => {
  const { category } = req.query
  let out = teamList
  if (category) out = out.filter((t) => t.category === category)
  res.json({ count: out.length, teams: out })
})

app.get('/api/archives', (req, res) => {
  const { format } = req.query
  let completed = mockMatches.filter((m) => m.status === 'completed')
  if (format) completed = completed.filter((m) => m.format === format)
  const bySeries = {}
  for (const m of completed) {
    if (!bySeries[m.seriesId]) bySeries[m.seriesId] = { series: m.series, seriesId: m.seriesId, matches: [] }
    bySeries[m.seriesId].matches.push(mockShape(m))
  }
  res.json({ count: completed.length, archives: Object.values(bySeries) })
})

app.get('/api/series/:id/points', (req, res) => {
  const seriesMatches = mockMatches.filter((m) => m.seriesId === req.params.id && m.status === 'completed')
  const table = {}
  for (const m of seriesMatches) {
    for (const t of m.teams) {
      if (!table[t.short]) table[t.short] = { team: t.name, short: t.short, flag: t.flag, played: 0, won: 0, lost: 0, drawn: 0, nr: 0, points: 0 }
    }
    const [a, b] = m.teams
    const ta = table[a.short], tb = table[b.short]
    if (m.winner) {
      ta.played++; tb.played++
      if (m.winner === a.name) { ta.won++; tb.lost++; ta.points += 2 }
      else if (m.winner === b.name) { tb.won++; ta.lost++; tb.points += 2 }
      else { ta.drawn++; tb.drawn++; ta.points++; tb.points++ }
    } else if (m.note && m.note.toLowerCase().includes('abandoned')) {
      ta.played++; tb.played++; ta.nr++; tb.nr++; ta.points++; tb.points++
    } else {
      ta.played++; tb.played++; ta.drawn++; tb.drawn++; ta.points++; tb.points++
    }
  }
  const result = Object.values(table).sort((x, y) => y.points - x.points || y.won - x.won)
  res.json({ seriesId: req.params.id, table: result })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`CrickPulse API running on http://0.0.0.0:${PORT} (cricket API key: ${hasApiKey ? 'loaded' : 'missing'})`)
})
