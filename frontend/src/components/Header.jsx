import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import {
  IconBall,
  IconLive,
  IconCalendar,
  IconTrophy,
  IconGlobe,
  IconChart,
  IconNews,
  IconMenu,
  IconClose
} from './Icons'

const links = [
  { to: '/', label: 'Home', Icon: IconBall },
  { to: '/live', label: 'Live Scores', Icon: IconLive },
  { to: '/schedule', label: 'Schedule', Icon: IconCalendar },
  { to: '/series', label: 'Series', Icon: IconTrophy },
  { to: '/leagues', label: 'Leagues', Icon: IconGlobe },
  { to: '/rankings', label: 'Rankings', Icon: IconChart },
  { to: '/news', label: 'News', Icon: IconNews }
]

export default function Header({ liveCount = 0 }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="header">
      <div className="container header-inner">
        <NavLink to="/" className="logo" onClick={() => setOpen(false)}>
          <span className="logo-badge">
            <IconBall />
          </span>
          <span className="logo-text">
            <b>
              Crick<i>Pulse</i>
            </b>
            <small>Live Cricket</small>
          </span>
        </NavLink>

        <nav className={'nav' + (open ? ' open' : '')}>
          {links.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={() => setOpen(false)}
            >
              <Icon />
              {label}
            </NavLink>
          ))}
        </nav>

        {liveCount > 0 && (
          <NavLink to="/live" className="live-badge" onClick={() => setOpen(false)}>
            <span className="dot" />
            {liveCount} Live
          </NavLink>
        )}

        <button className="menu-btn" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>
    </header>
  )
}
