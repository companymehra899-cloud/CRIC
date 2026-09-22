import { Link } from 'react-router-dom'
import { Flag } from './Common'

const statusPill = (s) => {
  const cls = s === 'live' ? 'live' : s === 'upcoming' ? 'upcoming' : 'completed'
  return <span className={'pill ' + cls}>{s === 'live' ? 'Live' : s === 'upcoming' ? 'Upcoming' : 'Result'}</span>
}

export default function MatchCard({ match, showVenue = true }) {
  return (
    <Link to={`/match/${match.id}`} className="match-card">
      <div className="mc-top">
        <div style={{ minWidth: 0 }}>
          <div className="mc-series">
            {match.matchNo ? match.matchNo + ' - ' : ''}
            {match.series}
          </div>
          {showVenue && <div className="mc-venue">{match.venue}</div>}
        </div>
        {statusPill(match.status)}
      </div>
      <div className="mc-body">
        {match.teams.map((t, i) => {
          const sc = match.score.find((s) => s.team === t.short)
          return (
            <div className="mc-team" key={t.short + i}>
              <Flag team={t} />
              <span className="team-name">{t.name}</span>
              {sc ? (
                <span className="team-score">
                  {sc.runs}/{sc.wickets}
                  <span className="ov">({sc.overs})</span>
                </span>
              ) : (
                <span className="team-score" style={{ color: 'var(--muted)', fontSize: 12 }}>
                  {match.status === 'upcoming' ? 'Yet to play' : '-'}
                </span>
              )}
            </div>
          )
        })}
      </div>
      {match.note && (
        <div className={'mc-note' + (match.status === 'completed' ? ' neutral' : '')}>{match.note}</div>
      )}
    </Link>
  )
}
