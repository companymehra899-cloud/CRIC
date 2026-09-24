import { useEffect, useState } from 'react'
import { Routes, Route, useLocation, NavLink } from 'react-router-dom'
import Header from './components/Header'
import { LiveTicker } from './components/Common'
import { api } from './api/client'
import { IconBall } from './components/Icons'
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
      <Header liveCount={live.length} />
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
          <div className="footer-inner">
            <div>
              <div className="fbrand">
                <span className="logo-badge">
                  <IconBall />
                </span>
                CrickPulse
              </div>
              <p>
                Live cricket scores, schedules and series coverage across T20, ODI, Test, domestic and
                franchise leagues worldwide. Built as a modern cricket portal.
              </p>
            </div>
            <div className="fcols">
              <div className="fcol">
                <b>Cricket</b>
                <NavLink to="/live">Live Scores</NavLink>
                <NavLink to="/schedule">Schedule</NavLink>
                <NavLink to="/series">Series</NavLink>
              </div>
              <div className="fcol">
                <b>Explore</b>
                <NavLink to="/leagues">Leagues</NavLink>
                <NavLink to="/rankings">Rankings</NavLink>
                <NavLink to="/news">News</NavLink>
              </div>
            </div>
          </div>
          <div className="footer-bottom">© 2026 CrickPulse · Data provided for demonstration purposes.</div>
        </div>
      </footer>
    </div>
  )
}
