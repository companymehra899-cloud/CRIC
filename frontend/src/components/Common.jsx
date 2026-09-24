import { useState } from 'react'
import { IconLive, IconCheck } from './Icons'

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
          <span className="ticker-label">CRICKET</span>
          <span className="ticker-item">
            No live matches right now — check the <b>Schedule</b> for upcoming games.
          </span>
        </div>
      </div>
    )
  }
  const items = [...matches, ...matches]
  return (
    <div className="ticker">
      <div className="container ticker-inner">
        <span className="ticker-label">
          <IconLive width={13} height={13} /> LIVE
        </span>
        <div className="ticker-track">
          <div className="ticker-items">
            {items.map((m, idx) => {
              const a = m.score[0]
              const b = m.score[1]
              return (
                <span className="ticker-item" key={m.id + idx}>
                  <b>{m.teams[0].short}</b> {a ? `${a.runs}/${a.wickets}` : '-'} vs{' '}
                  <b>{m.teams[1].short}</b> {b && b.overs > 0 ? `${b.runs}/${b.wickets}` : '-'}
                  <span className="tstate"> · {m.note || m.state}</span>
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Loader({ count = 4 }) {
  return (
    <div>
      {Array.from({ length: count }).map((_, i) => (
        <div className="skeleton" key={i}>
          <div className="sk-line" style={{ width: '45%', marginBottom: 14 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div className="sk-line" style={{ width: 42, height: 42, borderRadius: 12 }} />
            <div className="sk-line" style={{ flex: 1 }} />
            <div className="sk-line" style={{ width: 54 }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="sk-line" style={{ width: 42, height: 42, borderRadius: 12 }} />
            <div className="sk-line" style={{ flex: 1 }} />
            <div className="sk-line" style={{ width: 54 }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export function Empty({ text = 'Nothing here yet.' }) {
  return <div className="empty">{text}</div>
}

export function Check() {
  return <IconCheck width={14} height={14} />
}
