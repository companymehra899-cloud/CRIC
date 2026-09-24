import { useEffect, useState } from 'react'
import { api } from '../api/client'
import MatchCard from '../components/MatchCard'
import { Loader } from '../components/Common'

const cats = ['All', 'International', 'League', 'Domestic', 'Women']

export default function LiveScores() {
  const [matches, setMatches] = useState(null)

  useEffect(() => {
    const load = () => api.live().then((d) => setMatches(d.matches))
    load()
    const t = setInterval(load, 60000)
    return () => clearInterval(t)
  }, [])

  if (matches === null) return <Loader />

  return (
    <div>
      <div className="section-head">
        <h2>
          <span className="pill live">Live</span> Live Cricket Scores
        </h2>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>Auto-refresh every 30s</span>
      </div>
      {matches.length ? (
        matches.map((m) => <MatchCard key={m.id} match={m} />)
      ) : (
        <div className="empty">No matches live right now. Check the schedule for upcoming games.</div>
      )}
    </div>
  )
}
