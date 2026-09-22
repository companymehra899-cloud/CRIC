import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { CRICKET_API_KEY, API_BASE } from './config.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CACHE_DIR = path.join(__dirname, '.cache')
fs.mkdirSync(CACHE_DIR, { recursive: true })

const BUDGET_FILE = path.join(CACHE_DIR, 'budget.json')
const DAILY_LIMIT = 90

const TTL = {
  current: 8 * 60 * 1000,
  cricScore: 8 * 60 * 1000,
  matches: 60 * 60 * 1000,
  series: 6 * 60 * 60 * 1000,
  seriesInfo: 6 * 60 * 60 * 1000,
  matchInfo: 10 * 60 * 1000
}

const mem = new Map()

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

function readBudget() {
  try {
    const b = JSON.parse(fs.readFileSync(BUDGET_FILE, 'utf8'))
    if (b.date === todayKey()) return b
  } catch {
    /* ignore */
  }
  return { date: todayKey(), count: 0 }
}

function bumpBudget() {
  const b = readBudget()
  b.count += 1
  try {
    fs.writeFileSync(BUDGET_FILE, JSON.stringify(b))
  } catch {
    /* ignore */
  }
  return b
}

function cacheGet(key) {
  if (mem.has(key)) return mem.get(key)
  const file = path.join(CACHE_DIR, key + '.json')
  if (fs.existsSync(file)) {
    try {
      const rec = JSON.parse(fs.readFileSync(file, 'utf8'))
      mem.set(key, rec)
      return rec
    } catch {
      /* ignore */
    }
  }
  return null
}

function cacheSet(key, value) {
  const rec = { time: Date.now(), value }
  mem.set(key, rec)
  try {
    fs.writeFileSync(path.join(CACHE_DIR, key + '.json'), JSON.stringify(rec))
  } catch {
    /* ignore */
  }
}

async function upstream(pathname) {
  const sep = pathname.includes('?') ? '&' : '?'
  const url = `${API_BASE}/${pathname}${sep}apikey=${encodeURIComponent(CRICKET_API_KEY)}`
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) })
  if (!res.ok) throw new Error('upstream HTTP ' + res.status)
  const json = await res.json()
  if (json.status === 'failure') throw new Error(json.reason || 'api failure')
  if (!json.data) throw new Error('empty api response')
  return json.data
}

export async function fetchCached(key, ttlMs, pathname) {
  const rec = cacheGet(key)
  if (rec && Date.now() - rec.time < ttlMs) return rec.value

  if (readBudget().count >= DAILY_LIMIT) {
    if (rec) return rec.value
    throw new Error('daily api budget reached')
  }

  try {
    const data = await upstream(pathname)
    bumpBudget()
    cacheSet(key, data)
    return data
  } catch (err) {
    if (rec) return rec.value
    throw err
  }
}

export function cacheInfo() {
  const b = readBudget()
  return { date: b.date, used: b.count, limit: DAILY_LIMIT }
}

const FRANCHISE = [
  'ipl', 'indian premier', 'big bash', 'bbl', 'psl', 'pakistan super', 'caribbean premier',
  'cpl', 'ilt20', 'international league t20', 'sa20', 'lanka premier', 'lpl',
  'bangladesh premier', 'bpl', 'major league', 'mlc', 'the hundred',
  'vitality blast', 't20 blast', 'super smash', 'global t20', 'gt20', 'minor league',
  'milc', 'maharashtra premier', 'tamil nadu premier', 'delhi premier', 'odisha',
  'kerala', 'csa t20', 't20 challenge', 'abu dhabi', 'emirates', 'gulf', 'sharjah',
  'super50', 'cplt20', 'legends league', 'road safety', 'max60'
]

const DOMESTIC = [
  'tour of', 'a tour', 'a team', 'u19', 'u23', 'emerging', 'domestic', 'one-day cup',
  'sheffield shield', 'ranji', 'duleep', 'trophy', 'championship', 'first-class',
  'list a', 'invitational', '4-day', 'day cup', 'cricket league'
]

function classify(series, names = []) {
  const s = (series || '').toLowerCase()
  const all = (s + ' ' + names.join(' ')).toLowerCase()
  if (all.includes('women')) return 'Women'
  if (FRANCHISE.some((k) => s.includes(k))) return 'League'
  if (DOMESTIC.some((k) => s.includes(k))) return 'Domestic'
  return 'International'
}

function fmtOf(mt) {
  const t = (mt || '').toLowerCase()
  if (t.includes('test')) return { format: 'Test', formatLabel: 'Test' }
  if (t.includes('odi')) return { format: 'ODI', formatLabel: 'ODI' }
  if (t.includes('t20')) return { format: 'T20', formatLabel: 'T20I' }
  if (t.includes('t10')) return { format: 'T10', formatLabel: 'T10' }
  const up = (mt || 'Other').toUpperCase()
  return { format: up, formatLabel: up }
}

function shortOf(name, info) {
  if (info && info.shortname) return info.shortname
  return (name || '')
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 4)
    .toUpperCase()
}

function parseName(name) {
  const parts = (name || '').split(',').map((s) => s.trim()).filter(Boolean)
  if (parts.length >= 3) return { teamsStr: parts[0], matchNo: parts[1], series: parts.slice(2).join(', ') }
  if (parts.length === 2) return { teamsStr: parts[0], matchNo: '', series: parts[1] }
  return { teamsStr: name || '', matchNo: '', series: '' }
}

function toIso(dt) {
  if (!dt) return ''
  return dt.endsWith('Z') ? dt : dt + 'Z'
}

function normScores(score, teams) {
  return (score || []).map((s, idx) => {
    const raw = (s.inning || '').replace(/\s*Inning.*$/i, '').trim()
    let meta = teams.find((t) => t.name.toLowerCase() === raw.toLowerCase())
    if (!meta) {
      meta = teams.find(
        (t) => raw.toLowerCase().startsWith(t.name.toLowerCase()) || t.name.toLowerCase().startsWith(raw.toLowerCase())
      )
    }
    const m = (s.inning || '').match(/Inning\s*(\d+)/i)
    return {
      team: meta ? meta.short : shortOf(raw),
      runs: s.r ?? 0,
      wickets: s.w ?? 0,
      overs: s.o ?? 0,
      innings: m ? Number(m[1]) : idx + 1
    }
  })
}

export function normMatch(m) {
  const { teamsStr, matchNo, series } = parseName(m.name)
  const infoByName = {}
  for (const t of m.teamInfo || []) infoByName[t.name.toLowerCase()] = t
  const names = m.teams && m.teams.length ? m.teams : teamsStr.split(/\s+vs\s+/i)
  const teams = names.map((n) => {
    const info = infoByName[n.toLowerCase()] || (m.teamInfo || []).find((t) => t.name.toLowerCase().startsWith(n.toLowerCase()))
    return { short: shortOf(n, info), name: n, img: (info && info.img) || '', flag: '' }
  })
  const status = m.matchEnded ? 'completed' : m.matchStarted ? 'live' : 'upcoming'
  const { format, formatLabel } = fmtOf(m.matchType)
  return {
    id: m.id,
    status,
    state: m.status || '',
    format,
    formatLabel,
    category: classify(series || m.series, teams.map((t) => t.name)),
    series: series || m.series || '',
    seriesId: m.series_id || '',
    matchNo: matchNo || '',
    venue: m.venue || '',
    startTime: toIso(m.dateTimeGMT) || m.date || '',
    teams,
    score: normScores(m.score, teams),
    note: m.status || '',
    city: (m.venue || '').split(',').pop().trim(),
    toss: m.tossWinner ? `${m.tossWinner} won the toss and elected to ${m.tossChoice}` : '',
    winner: m.matchWinner || ''
  }
}

function parseTeamLabel(label) {
  const m = (label || '').match(/^(.*?)\s*\[([^\]]+)\]\s*$/)
  if (m) return { name: m[1].trim(), short: m[2].trim() }
  return { name: (label || '').trim(), short: (label || '').trim().slice(0, 4).toUpperCase() }
}

function parseScoreLine(line, short, innings) {
  const m = (line || '').match(/(\d+)(?:\/(\d+))?\s*(?:\(([\d.]+)\))?/)
  if (!m) return { team: short, runs: 0, wickets: 0, overs: 0, innings }
  return {
    team: short,
    runs: Number(m[1]),
    wickets: m[2] !== undefined ? Number(m[2]) : 0,
    overs: m[3] ? Number(m[3]) : 0,
    innings
  }
}

export function normCricScore(m) {
  const t1 = parseTeamLabel(m.t1)
  const t2 = parseTeamLabel(m.t2)
  const teams = [
    { short: t1.short, name: t1.name, img: m.t1img || '', flag: '' },
    { short: t2.short, name: t2.name, img: m.t2img || '', flag: '' }
  ]
  const score = []
  if (m.t1s) score.push(parseScoreLine(m.t1s, t1.short, 1))
  if (m.t2s) score.push(parseScoreLine(m.t2s, t2.short, 2))
  const status = m.ms === 'live' ? 'live' : m.ms === 'result' ? 'completed' : 'upcoming'
  const { format, formatLabel } = fmtOf(m.matchType)
  return {
    id: m.id,
    status,
    state: m.status || '',
    format,
    formatLabel,
    category: classify(m.series, [t1.name, t2.name]),
    series: m.series || '',
    seriesId: '',
    matchNo: '',
    venue: '',
    startTime: toIso(m.dateTimeGMT),
    teams,
    score,
    note: m.status || '',
    city: '',
    toss: '',
    winner: ''
  }
}

export function normSeries(s) {
  const counts = { odi: s.odi || 0, t20: s.t20 || 0, test: s.test || 0 }
  const main = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]
  const format = main && main[1] > 0 ? main[0].toUpperCase() : 'Mixed'
  const start = s.startDate || s.startdate || ''
  let status = 'upcoming'
  const t = Date.parse(start)
  if (!Number.isNaN(t)) {
    const now = Date.now()
    if (t <= now) status = 'live'
  }
  const name = s.name || ''
  return {
    id: s.id,
    name,
    host: '',
    format,
    category: classify(name),
    matches: s.matches || 0,
    start,
    end: s.endDate || s.enddate || '',
    status
  }
}

function dedupe(list) {
  const seen = new Map()
  for (const m of list) {
    if (!seen.has(m.id)) seen.set(m.id, m)
  }
  return [...seen.values()]
}

function sortMatches(list) {
  const rank = { live: 0, upcoming: 1, completed: 2 }
  return list.sort((a, b) => {
    if (rank[a.status] !== rank[b.status]) return rank[a.status] - rank[b.status]
    const ta = Date.parse(a.startTime) || 0
    const tb = Date.parse(b.startTime) || 0
    return a.status === 'completed' ? tb - ta : ta - tb
  })
}

export async function getCurrent() {
  const data = await fetchCached('currentMatches', TTL.current, 'currentMatches?offset=0')
  return data.map(normMatch)
}

export async function getCricScore() {
  const data = await fetchCached('cricScore', TTL.cricScore, 'cricScore')
  return data.map(normCricScore)
}

export async function getMatchesList() {
  const data = await fetchCached('matches', TTL.matches, 'matches?offset=0')
  return data.map(normMatch)
}

export async function getAllMatches() {
  const [cur, cs, ml] = await Promise.allSettled([getCurrent(), getCricScore(), getMatchesList()])
  const list = []
  for (const r of [cur, cs, ml]) if (r.status === 'fulfilled') list.push(...r.value)
  return sortMatches(dedupe(list))
}

export async function getMatchInfo(id) {
  const m = await fetchCached('match_' + id, TTL.matchInfo, 'match_info?id=' + encodeURIComponent(id))
  const normalized = normMatch(m)
  const scores = (m.score || []).map((s, idx) => {
    const team = normalized.score[idx] ? normalized.score[idx].team : ''
    const inningNo = ((s.inning || '').match(/Inning\s*(\d+)/i) || [])[1]
    const overs = s.o || 0
    return {
      team,
      innings: s.inning || `${team} Innings`,
      runs: s.r ?? 0,
      wickets: s.w ?? 0,
      overs,
      runRate: overs > 0 ? Number(((s.r || 0) / overs).toFixed(2)) : 0,
      batting: [],
      bowling: [],
      extras: 0,
      fallOfWickets: []
    }
  })
  return { ...normalized, scores, commentary: [], fullScorecard: false }
}

export async function getSeriesList() {
  const data = await fetchCached('series', TTL.series, 'series?offset=0')
  return data.map(normSeries)
}

export async function getSeriesInfo(id) {
  const data = await fetchCached('series_' + id, TTL.seriesInfo, 'series_info?id=' + encodeURIComponent(id))
  const info = normSeries(data.info || {})
  const fixtures = sortMatches(dedupe((data.matchList || []).map(normMatch)))
  return { ...info, fixtures }
}
