import { useEffect, useState } from 'react'
import { api } from '../api/client'
import { Flag, Loader } from '../components/Common'

const cats = ['All', 'International', 'Women', 'League', 'Domestic']

export default function Teams() {
  const [teams, setTeams] = useState(null)
  const [cat, setCat] = useState('All')

  useEffect(() => {
    api.teams().then((d) => setTeams(d.teams))
  }, [])

  if (teams === null) return <Loader />
  const list = cat === 'All' ? teams : teams.filter((t) => t.category === cat)

  return (
    <div>
      <div className="section-head">
        <h2>Cricket Teams</h2>
      </div>
      <div className="chips">
        {cats.map((c) => (
          <button key={c} className={'chip' + (cat === c ? ' active' : '')} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>
      <div className="teams-grid">
        {list.map((t) => (
          <div className="team-card" key={t.short}>
            <Flag team={t} />
            <div className="team-info">
              <b>{t.name}</b>
              <small>{t.category}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
