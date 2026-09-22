const BASE = '/api'

async function get(path) {
  const res = await fetch(BASE + path)
  if (!res.ok) throw new Error('Request failed: ' + res.status)
  return res.json()
}

export const api = {
  home: () => get('/home'),
  live: () => get('/matches/live'),
  upcoming: () => get('/matches/upcoming'),
  completed: () => get('/matches/completed'),
  matches: (q = '') => get('/matches' + q),
  match: (id) => get('/matches/' + id),
  series: () => get('/series'),
  seriesDetail: (id) => get('/series/' + id),
  leagues: () => get('/leagues'),
  rankings: (format) => get('/rankings?format=' + format),
  news: () => get('/news')
}
