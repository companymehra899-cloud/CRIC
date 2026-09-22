import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../api/client'
import { Loader, Flag } from '../components/Common'

export default function MatchDetail() {
  const { id } = useParams()
  const [m, setM] = useState(null)
  const [tab, setTab] = useState('scorecard')

  useEffect(() => {
    api.match(id).then(setM).catch(() => setM(false))
  }, [id])

  if (m === null) return <Loader />
  if (m === false) return <div className="empty">Match not found. <Link to="/live" style={{ color: 'var(--green)' }}>Back to live scores</Link></div>

  return (
    <div>
      <div className="detail-head">
        <div className="mc-top">
          <span>
            {m.matchNo} · {m.series}
          </span>
          <span className={'pill ' + (m.status === 'live' ? 'live' : m.status === 'completed' ? 'completed' : 'upcoming')}>
            {m.status === 'live' ? 'Live' : m.status === 'completed' ? 'Result' : 'Upcoming'}
          </span>
        </div>
        <div className="detail-teams">
          {m.teams.map((t) => {
            const sc = m.score.find((s) => s.team === t.short)
            return (
              <div className="detail-team" key={t.short}>
                <Flag team={t} />
                <div className="tname">{t.name}</div>
                <div className="big-score">
                  {sc ? (
                    <>
                      {sc.runs}/{sc.wickets} <small>({sc.overs})</small>
                    </>
                  ) : (
                    <small>Yet to bat</small>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        {m.note && <div className="detail-note">{m.note}</div>}
        <div style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 12, marginTop: 10 }}>
          {m.venue} · {m.toss || 'Toss pending'}
        </div>
      </div>

      <div className="tabs">
        <button className={'tab' + (tab === 'scorecard' ? ' active' : '')} onClick={() => setTab('scorecard')}>
          Scorecard
        </button>
        <button className={'tab' + (tab === 'commentary' ? ' active' : '')} onClick={() => setTab('commentary')}>
          Commentary
        </button>
        <button className={'tab' + (tab === 'info' ? ' active' : '')} onClick={() => setTab('info')}>
          Match Info
        </button>
      </div>

      {tab === 'scorecard' && (
        <div>
          {m.scores && m.scores.length ? (
            m.scores.map((inn) => (
              <div className="innings" key={inn.team + inn.innings}>
                <h3>
                  {inn.innings} - {inn.runs}/{inn.wickets} ({inn.overs} ov) · RR {inn.runRate}
                </h3>
                <div className="table-wrap" style={{ marginBottom: 14 }}>
                  <table>
                    <thead>
                      <tr>
                        <th>Batter</th>
                        <th>R</th>
                        <th>B</th>
                        <th>4s</th>
                        <th>6s</th>
                        <th>SR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inn.batting && inn.batting.length > 0 ? (
                        inn.batting.map((b, i) => (
                          <tr key={i}>
                            <td>
                              {b.name}
                              {b.out ? <span className="sub">{b.how || 'out'}</span> : <span className="sub" style={{ color: 'var(--green)' }}>{b.how || 'not out'}</span>}
                            </td>
                            <td>{b.runs}</td>
                            <td>{b.balls}</td>
                            <td>{b.fours}</td>
                            <td>{b.sixes}</td>
                            <td>{b.sr}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} style={{ color: 'var(--muted)' }}>
                            Detailed batting scorecard is not available for this match.
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td style={{ color: 'var(--muted)' }}>Extras</td>
                        <td colSpan={5} style={{ textAlign: 'right' }}>{inn.extras}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 700 }}>Total</td>
                        <td colSpan={5} style={{ textAlign: 'right', fontWeight: 700 }}>
                          {inn.runs}/{inn.wickets} ({inn.overs} ov)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {inn.bowling && inn.bowling.length > 0 && (
                  <div className="table-wrap" style={{ marginBottom: 10 }}>
                    <table>
                      <thead>
                        <tr>
                          <th>Bowler</th>
                          <th>O</th>
                          <th>M</th>
                          <th>R</th>
                          <th>W</th>
                          <th>Econ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inn.bowling.map((b, i) => (
                          <tr key={i}>
                            <td>{b.name}</td>
                            <td>{b.overs}</td>
                            <td>{b.maidens}</td>
                            <td>{b.runs}</td>
                            <td>{b.wickets}</td>
                            <td>{b.econ}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {inn.fallOfWickets && inn.fallOfWickets.length > 0 && (
                  <p style={{ fontSize: 12, color: 'var(--muted)' }}>
                    <b style={{ color: 'var(--text)' }}>Fall of wickets: </b>
                    {inn.fallOfWickets.join(', ')}
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="empty">Scorecard will appear once the match begins.</div>
          )}
        </div>
      )}

      {tab === 'commentary' && (
        <div className="side-card">
          {m.commentary && m.commentary.length ? (
            m.commentary.map((c, i) => (
              <div className="commentary-item" key={i}>
                <div className="comm-over">{c.over}</div>
                <div className={'comm-text ' + (c.event || '')}>{c.text}</div>
              </div>
            ))
          ) : (
            <div className="empty">Ball-by-ball commentary will start with the first ball.</div>
          )}
        </div>
      )}

      {tab === 'info' && (
        <div className="side-card">
          {[
            ['Match', `${m.matchNo} · ${m.series}`],
            ['Format', m.formatLabel],
            ['Category', m.category],
            ['Venue', m.venue],
            ['City', m.city],
            ['Start Time', new Date(m.startTime).toUTCString()],
            ['Toss', m.toss || 'Pending'],
            ['Status', m.state]
          ].map(([k, v]) => (
            <div className="league-row" key={k}>
              <div style={{ flex: '0 0 110px', color: 'var(--muted)', fontSize: 12.5 }}>{k}</div>
              <div style={{ fontSize: 13.5 }}>{v}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
