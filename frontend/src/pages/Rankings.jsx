import { useEffect, useState } from 'react'
import { api } from '../api/client'
import { Loader } from '../components/Common'

const formats = ['T20', 'ODI', 'Test']

export default function Rankings() {
  const [format, setFormat] = useState('T20')
  const [data, setData] = useState(null)

  useEffect(() => {
    setData(null)
    api.rankings(format).then(setData)
  }, [format])

  return (
    <div>
      <div className="section-head">
        <h2>ICC Rankings</h2>
      </div>
      <div className="chips">
        {formats.map((f) => (
          <button key={f} className={'chip' + (format === f ? ' active' : '')} onClick={() => setFormat(f)}>
            {f}
          </button>
        ))}
      </div>
      {data === null ? (
        <Loader />
      ) : (
        <div className="rank-grid">
          <div className="table-wrap">
            <h3 style={{ fontSize: 14, marginBottom: 10, color: 'var(--brand-2)' }}>Batting</h3>
            <table className="rank-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Player</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {data.batting.map((p) => (
                  <tr key={p.rank}>
                    <td>{p.rank}</td>
                    <td>
                      {p.player}
                      <span className="sub">{p.team}</span>
                    </td>
                    <td>{p.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="table-wrap">
            <h3 style={{ fontSize: 14, marginBottom: 10, color: 'var(--brand-2)' }}>Bowling</h3>
            <table className="rank-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Player</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {data.bowling.map((p) => (
                  <tr key={p.rank}>
                    <td>{p.rank}</td>
                    <td>
                      {p.player}
                      <span className="sub">{p.team}</span>
                    </td>
                    <td>{p.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
