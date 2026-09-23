import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import MatchCard from '../components/MatchCard'
import { Loader } from '../components/Common'

const formats = ['All', 'T20', 'ODI', 'Test']

export default function Archives() {
  const [archives, setArchives] = useState(null)
  const [format, setFormat] = useState('All')

  useEffect(() => {
    setArchives(null)
    api.archives(format === 'All' ? '' : '?format=' + format).then((d) => setArchives(d.archives))
  }, [format])

  return (
    <div>
      <div className="section-head">
        <h2>Match Archives</h2>
      </div>
      <div className="chips">
        {formats.map((f) => (
          <button key={f} className={'chip' + (format === f ? ' active' : '')} onClick={() => setFormat(f)}>
            {f}
          </button>
        ))}
      </div>
      {archives === null ? (
        <Loader />
      ) : archives.length ? (
        archives.map((s) => (
          <div className="section" key={s.seriesId}>
            <div className="section-head">
              <h2>{s.series}</h2>
              <Link to={`/series/${s.seriesId}`}>View Series</Link>
            </div>
            {s.matches.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        ))
      ) : (
        <div className="empty">No archived matches found.</div>
      )}
    </div>
  )
}
