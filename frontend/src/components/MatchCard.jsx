import { Link } from 'react-router-dom'
import { Flag } from './Common'
import { IconLocation, IconClock, IconChevron } from './Icons'

function fmtDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    hour12: false
  })
}

const statusPill = (s) => {
  const cls = s === 'live' ? 'live' : s === 'upcoming' ? 'upcoming' : 'completed'
  const label = s === 'live' ? 'Live' : s === 'upcoming' ? 'Upcoming' : 'Result'
  return <span className={'pill ' + cls}>{label}</span>
}

export default function MatchCard({ match, showVenue = true }) {
  const date = fmtDate(match.startTime)
  return (
    <Link to={`/match/${match.id}`} className={'match-card s-' + match.status}>
      <div className="mc-head">
        <span className="mc-badge">{match.formatLabel || match.format}</span>
        <span className="mc-series">{match.matchNo ? match.matchNo + ' · ' : ''}{match.series}</span>
        <span className="spacer" />
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
                <span className="team-score tbd">{match.status === 'upcoming' ? 'Yet to play' : '-'}</span>
              )}
            </div>
          )
        })}
      </div>

      {match.note && (
        <div className={'mc-note' + (match.status === 'completed' ? ' neutral' : '')}>{match.note}</div>
      )}

      {(showVenue && match.venue) || date ? (
        <div className="mc-foot">
          {showVenue && match.venue && (
            <span>
              <IconLocation />
              {match.venue}
            </span>
          )}
          {date && (
            <span>
              <IconClock />
              {date} UTC
            </span>
          )}
          <span style={{ marginLeft: 'auto', color: 'var(--brand)', fontWeight: 700 }}>
            Details <IconChevron width={12} height={12} />
          </span>
        </div>
      ) : null}
    </Link>
  )
}
