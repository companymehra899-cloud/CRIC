import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../api/client'
import MatchCard from '../components/MatchCard'
import { Loader } from '../components/Common'

export default function SeriesDetail() {
  const { id } = useParams()
  const [data, setData] = useState(null)

  useEffect(() => {
    api.seriesDetail(id).then(setData).catch(() => setData(false))
  }, [id])

  if (data === null) return <Loader />
  if (data === false) return <div className="empty">Series not found.</div>

  return (
    <div>
      <div className="detail-head">
        <div className="mc-top">
          <span>{data.category} · {data.format}</span>
          <span className={'pill ' + (data.status === 'live' ? 'live' : data.status === 'completed' ? 'completed' : 'upcoming')}>
            {data.status}
          </span>
        </div>
        <h2 style={{ fontSize: 22, marginTop: 8 }}>{data.name}</h2>
        <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 6 }}>
          Host: {data.host} · {data.matches} matches · {data.start} to {data.end}
        </p>
      </div>
      <div className="section-head">
        <h2>Fixtures & Results</h2>
        <Link to="/series" style={{ fontSize: 12, color: 'var(--brand)', fontWeight: 700 }}>
          All Series
        </Link>
      </div>
      {data.fixtures.length ? (
        data.fixtures.map((m) => <MatchCard key={m.id} match={m} />)
      ) : (
        <div className="empty">No fixtures listed yet.</div>
      )}
    </div>
  )
}
