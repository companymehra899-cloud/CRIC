import { useEffect, useState } from 'react'
import { api } from '../api/client'
import MatchCard from '../components/MatchCard'
import { Loader } from '../components/Common'

const tabs = [
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'live', label: 'Live' },
  { key: 'completed', label: 'Results' }
]

export default function Schedule() {
  const [tab, setTab] = useState('upcoming')
  const [matches, setMatches] = useState(null)

  useEffect(() => {
    setMatches(null)
    api.matches('?status=' + tab).then((d) => setMatches(d.matches))
  }, [tab])

  return (
    <div>
      <div className="section-head">
        <h2>Cricket Schedule</h2>
      </div>
      <div className="chips">
        {tabs.map((t) => (
          <button key={t.key} className={'chip' + (tab === t.key ? ' active' : '')} onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>
      {matches === null ? (
        <Loader />
      ) : matches.length ? (
        matches.map((m) => <MatchCard key={m.id} match={m} />)
      ) : (
        <div className="empty">No matches in this category.</div>
      )}
    </div>
  )
}
