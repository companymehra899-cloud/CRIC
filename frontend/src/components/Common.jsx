import { useState } from 'react'

export function Flag({ team, className = 'flag', style }) {
  const [failed, setFailed] = useState(false)
  if (team.img && !failed) {
    return <img className={className} style={style} alt={team.name} src={team.img} onError={() => setFailed(true)} />
  }
  return (
    <span className={className} style={style}>
      {(team.short || team.name || '').slice(0, 4).toUpperCase()}
    </span>
  )
}

export function LiveTicker({ matches = [] }) {
  if (!matches.length) {
    return (
      <div className="ticker">
        <div className="container ticker-inner">
          <span className="live-dot" style={{ background: 'var(--muted)' }} />
          <span className="ticker-item">No live matches right now. Check the schedule for upcoming games.</span>
        </div>
      </div>
    )
  }
  return (
    <div className="ticker">
      <div className="container ticker-inner">
        <span className="live-dot" />
        <div className="ticker-items">
          {matches.slice(0, 6).map((m) => {
            const a = m.score[0]
            const b = m.score[1]
            return (
              <span className="ticker-item" key={m.id}>
                <span className="live-tag">LIVE</span>{' '}
                <b>{m.teams[0].short}</b> {a ? `${a.runs}/${a.wickets}` : '-'} vs{' '}
                <b>{m.teams[1].short}</b> {b && b.overs > 0 ? `${b.runs}/${b.wickets}` : '-'} · {m.state}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function Loader() {
  return (
    <div className="loading">
      <div className="spinner" />
      Loading cricket data...
    </div>
  )
}

export function Empty({ text = 'Nothing here yet.' }) {
  return <div className="empty">{text}</div>
}
