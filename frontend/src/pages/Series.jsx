import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import { Loader } from '../components/Common'

const cats = ['All', 'International', 'League', 'Domestic', 'Women']

export default function Series() {
  const [series, setSeries] = useState(null)
  const [cat, setCat] = useState('All')

  useEffect(() => {
    api.series().then((d) => setSeries(d.series))
  }, [])

  if (series === null) return <Loader />
  const list = cat === 'All' ? series : series.filter((s) => s.category === cat)

  return (
    <div>
      <div className="section-head">
        <h2>Cricket Series & Tournaments</h2>
      </div>
      <div className="chips">
        {cats.map((c) => (
          <button key={c} className={'chip' + (cat === c ? ' active' : '')} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>
      {list.map((s) => (
        <Link to={`/series/${s.id}`} className="league-row" key={s.id} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: 16, marginBottom: 10 }}>
          <div className="league-logo">{s.format}</div>
          <div className="league-info">
            <b style={{ fontSize: 15 }}>{s.name}</b>
            <small>
              {s.host} · {s.matches} matches · {s.start} to {s.end}
            </small>
          </div>
          <span className={'pill ' + (s.status === 'live' ? 'live' : s.status === 'completed' ? 'completed' : 'upcoming')}>
            {s.status}
          </span>
        </Link>
      ))}
    </div>
  )
}
