import { useEffect, useState } from 'react'
import { api } from '../api/client'
import { Loader } from '../components/Common'

export default function News() {
  const [news, setNews] = useState(null)

  useEffect(() => {
    api.news().then((d) => setNews(d.news))
  }, [])

  if (news === null) return <Loader />

  return (
    <div>
      <div className="section-head">
        <h2>Cricket News</h2>
      </div>
      <div className="grid" style={{ gridTemplateColumns: '1fr' }}>
        {news.map((n) => (
          <div className="side-card" key={n.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <b style={{ fontSize: 16 }}>{n.title}</b>
              <span className="pill upcoming">{n.category}</span>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 13.5, marginTop: 8, lineHeight: 1.55 }}>{n.summary}</p>
            <div style={{ color: 'var(--brand-2)', fontSize: 11.5, marginTop: 8, fontWeight: 600 }}>{n.time}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
