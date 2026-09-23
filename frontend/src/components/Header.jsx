import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/live', label: 'Live Scores' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/series', label: 'Series' },
  { to: '/leagues', label: 'Leagues' },
  { to: '/rankings', label: 'Rankings' },
  { to: '/news', label: 'News' }
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  return (
    <header className="header">
      <div className="container header-inner">
        <NavLink to="/" className="logo" onClick={() => setOpen(false)}>
          Crick<span>Pulse</span>
        </NavLink>
        <nav className={'nav' + (open ? ' open' : '')}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <button className="menu-btn" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          Menu
        </button>
      </div>
      {loc.pathname === '/' && null}
    </header>
  )
}
