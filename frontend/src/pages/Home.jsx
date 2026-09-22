import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import MatchCard from '../components/MatchCard'
import { Loader } from '../components/Common'

export default function Home() {
  const [data, setData] = useState(null)

  useEffect(() => {
    api.home().then(setData).catch(() => setData(false))
  }, [])

  if (data === null) return <Loader />
  if (data === false) return <div className="empty">Could not load data. Is the API running?</div>

  return (
    <div className="grid">
      <div>
        <div className="section">
          <div className="section-head">
            <h2>
              <span className="pill live">Live</span> Live Matches
            </h2>
            <Link to="/live">All Live</Link>
          </div>
          {data.live.length ? (
            data.live.map((m) => <MatchCard key={m.id} match={m} />)
          ) : (
            <div className="empty">No live matches at the moment.</div>
          )}
        </div>

        <div className="section">
          <div className="section-head">
            <h2>
              <span className="pill upcoming">Upcoming</span> Upcoming Matches
            </h2>
            <Link to="/schedule">Full Schedule</Link>
          </div>
          {data.upcoming.slice(0, 6).map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>

        <div className="section">
          <div className="section-head">
            <h2>Recent Results</h2>
            <Link to="/schedule">All Results</Link>
          </div>
          {data.recent.slice(0, 5).map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>
      </div>

      <aside>
        <div className="side-card">
          <h3>Leagues & Tournaments</h3>
          {data.leagues.slice(0, 8).map((l) => (
            <Link to="/leagues" className="league-row" key={l.id}>
              <div className="league-logo">{l.short}</div>
              <div className="league-info">
                <b>{l.name}</b>
                <small>
                  {l.country} · {l.window}
                </small>
              </div>
              <span className={'pill ' + (l.status === 'live' ? 'live' : l.status === 'completed' ? 'completed' : 'upcoming')}>
                {l.status}
              </span>
            </Link>
          ))}
        </div>

        <div className="side-card">
          <h3>Featured Series</h3>
          {data.featuredSeries.map((s) => (
            <Link to={`/series/${s.id}`} className="league-row" key={s.id}>
              <div className="league-logo">{s.format}</div>
              <div className="league-info">
                <b>{s.name}</b>
                <small>
                  {s.matches} matches · {s.start}
                </small>
              </div>
            </Link>
          ))}
        </div>

        <div className="side-card">
          <h3>Latest News</h3>
          {data.news.map((n) => (
            <div className="news-item" key={n.id}>
              <b>{n.title}</b>
              <p>{n.summary}</p>
              <div className="meta">
                {n.category} · {n.time}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}
