import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import MatchCard from '../components/MatchCard'
import { Flag, Loader } from '../components/Common'
import { IconChevron, IconTrophy, IconNews, IconGlobe, IconClock } from '../components/Icons'

function HeroLive({ m }) {
  return (
    <div className="hero">
      <div className="hero-top">
        <span className="hero-tag">
          <span className="dot" /> Live Now
        </span>
        <span className="hero-series">
          {m.matchNo ? m.matchNo + ' · ' : ''}
          {m.series}
        </span>
      </div>
      <div className="hero-body">
        {m.teams.map((t, i) => {
          const sc = m.score.find((s) => s.team === t.short)
          return (
            <div style={{ display: 'contents' }} key={t.short + i}>
              {i === 1 && <div className="hero-center">VS</div>}
              <div className="hero-team">
                <Flag team={t} className="hero-logo" />
                <div className="tname">{t.name}</div>
                <div className="tscore">
                  {sc ? (
                    <>
                      {sc.runs}/{sc.wickets} <small>({sc.overs})</small>
                    </>
                  ) : (
                    <small>Yet to bat</small>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="hero-foot">
        <span className="hero-note">{m.note || m.state}</span>
        <Link className="hero-cta" to={`/match/${m.id}`}>
          View Live <IconChevron />
        </Link>
      </div>
    </div>
  )
}

function HeroWelcome({ upcoming }) {
  const next = upcoming && upcoming[0]
  return (
    <div className="hero hero-welcome">
      <h1>Live Cricket, Everywhere.</h1>
      <p>
        Ball-by-ball live scores, T20 &amp; ODI &amp; Test coverage, domestic and franchise leagues from
        around the world — plus upcoming fixtures, series and ICC rankings.
      </p>
      <div className="hero-chips">
        <span>T20 / T20I</span>
        <span>ODI</span>
        <span>Test</span>
        <span>Domestic</span>
        <span>Franchise Leagues</span>
        <span>Women's Cricket</span>
      </div>
      {next && (
        <div className="hero-foot">
          <span className="hero-note">Next up: {next.teams[0].short} vs {next.teams[1].short} · {next.series}</span>
          <Link className="hero-cta" to="/schedule">
            Full Schedule <IconChevron />
          </Link>
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const [data, setData] = useState(null)

  useEffect(() => {
    api.home().then(setData).catch(() => setData(false))
  }, [])

  if (data === null) return <Loader />
  if (data === false)
    return <div className="empty">Could not load data. Please check that the API server is running.</div>

  return (
    <div>
      {data.live.length ? <HeroLive m={data.live[0]} /> : <HeroWelcome upcoming={data.upcoming} />}

      <div className="grid">
        <div>
          <div className="section">
            <div className="section-head">
              <h2>
                Live Matches <span className="hl">({data.live.length})</span>
              </h2>
              <Link to="/live" className="section-link">
                All Live <IconChevron />
              </Link>
            </div>
            {data.live.length ? (
              data.live.map((m) => <MatchCard key={m.id} match={m} />)
            ) : (
              <div className="empty">No live matches at the moment. Check the schedule below.</div>
            )}
          </div>

          <div className="section">
            <div className="section-head">
              <h2>Upcoming Matches</h2>
              <Link to="/schedule" className="section-link">
                Full Schedule <IconChevron />
              </Link>
            </div>
            {data.upcoming.slice(0, 6).map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>

          <div className="section">
            <div className="section-head">
              <h2>Recent Results</h2>
              <Link to="/schedule" className="section-link">
                All Results <IconChevron />
              </Link>
            </div>
            {data.recent.slice(0, 5).map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </div>

        <aside>
          <div className="side-card">
            <h3>
              <IconTrophy /> Leagues &amp; Tournaments
              <Link to="/leagues" className="side-link">
                View all
              </Link>
            </h3>
            {data.leagues.slice(0, 8).map((l) => (
              <Link to="/leagues" className="league-row" key={l.id}>
                <div className="league-logo">{l.short}</div>
                <div className="league-info">
                  <b>{l.name}</b>
                  <small>
                    {l.country} · {l.window}
                  </small>
                </div>
                <span
                  className={
                    'pill ' + (l.status === 'live' ? 'live' : l.status === 'completed' ? 'completed' : 'upcoming')
                  }
                >
                  {l.status}
                </span>
              </Link>
            ))}
          </div>

          <div className="side-card">
            <h3>
              <IconGlobe /> Featured Series
            </h3>
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
            <h3>
              <IconNews /> Latest News
            </h3>
            {data.news.map((n) => (
              <div className="news-item" key={n.id}>
                <span className="ncat">{n.category}</span>
                <b>{n.title}</b>
                <p>{n.summary}</p>
                <span className="meta">
                  <IconClock /> {n.time}
                </span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
