import { useEffect, useState } from 'react'
import { api } from '../api/client'
import { Loader } from '../components/Common'

const statuses = ['All', 'live', 'upcoming', 'completed']

export default function Leagues() {
  const [leagues, setLeagues] = useState(null)
  const [status, setStatus] = useState('All')

  useEffect(() => {
    api.leagues().then((d) => setLeagues(d.leagues))
  }, [])

  if (leagues === null) return <Loader />
  const list = status === 'All' ? leagues : leagues.filter((l) => l.status === status)

  return (
    <div>
      <div className="section-head">
        <h2>Cricket Leagues Worldwide</h2>
      </div>
      <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 14 }}>
        Domestic and franchise leagues from India, Pakistan, Australia, West Indies, UAE, England, South Africa, Sri Lanka and more.
      </p>
      <div className="chips">
        {statuses.map((s) => (
          <button key={s} className={'chip' + (status === s ? ' active' : '')} onClick={() => setStatus(s)}>
            {s === 'All' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>
      <div className="rank-grid">
        {list.map((l) => (
          <div className="side-card" key={l.id}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div className="league-logo" style={{ width: 48, height: 48, fontSize: 11 }}>
                {l.short}
              </div>
              <div style={{ flex: 1 }}>
                <b style={{ fontSize: 15 }}>{l.name}</b>
                <div style={{ color: 'var(--muted)', fontSize: 12, marginTop: 3 }}>
                  {l.country} · {l.format}
                </div>
                <div style={{ color: 'var(--brand-2)', fontSize: 11.5, marginTop: 3, fontWeight: 600 }}>{l.window}</div>
              </div>
              <span className={'pill ' + (l.status === 'live' ? 'live' : l.status === 'completed' ? 'completed' : 'upcoming')}>
                {l.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
