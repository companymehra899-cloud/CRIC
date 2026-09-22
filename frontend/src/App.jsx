import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import { LiveTicker } from './components/Common'
import { api } from './api/client'
import Home from './pages/Home'
import LiveScores from './pages/LiveScores'
import Schedule from './pages/Schedule'
import Series from './pages/Series'
import SeriesDetail from './pages/SeriesDetail'
import Leagues from './pages/Leagues'
import Rankings from './pages/Rankings'
import News from './pages/News'
import MatchDetail from './pages/MatchDetail'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const [live, setLive] = useState([])

  useEffect(() => {
    const load = () => api.live().then((d) => setLive(d.matches)).catch(() => {})
    load()
    const t = setInterval(load, 30000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="app">
      <ScrollTop />
      <Header />
      <LiveTicker matches={live} />
      <main className="main">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/live" element={<LiveScores />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/series" element={<Series />} />
            <Route path="/series/:id" element={<SeriesDetail />} />
            <Route path="/leagues" element={<Leagues />} />
            <Route path="/rankings" element={<Rankings />} />
            <Route path="/news" element={<News />} />
            <Route path="/match/:id" element={<MatchDetail />} />
            <Route path="*" element={<div className="empty">Page not found.</div>} />
          </Routes>
        </div>
      </main>
      <footer className="footer">
        <div className="container">
          CrickPulse · Live cricket scores, T20, ODI, Test, domestic & international leagues, schedules and rankings.
          <br />
          Data shown is for demonstration purposes. © 2026 CrickPulse.
        </div>
      </footer>
    </div>
  )
}
