const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
}

export const IconBall = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3c2.5 2.4 2.5 15.6 0 18M5 6.5c4 2 10 2 14 0" />
  </svg>
)

export const IconLive = (p) => (
  <svg {...base} {...p}>
    <path d="M5 12a7 7 0 0 1 14 0" />
    <path d="M8.5 12a3.5 3.5 0 0 1 7 0" />
    <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
  </svg>
)

export const IconCalendar = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="4.5" width="18" height="16" rx="3" />
    <path d="M3 9.5h18M8 3v3M16 3v3" />
  </svg>
)

export const IconTrophy = (p) => (
  <svg {...base} {...p}>
    <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
    <path d="M8 5H5.5A1.5 1.5 0 0 0 4 6.5C4 9 6 10 8 10M16 5h2.5A1.5 1.5 0 0 1 20 6.5C20 9 18 10 16 10" />
    <path d="M12 13v4M9 20h6M10 20v-3h4v3" />
  </svg>
)

export const IconChart = (p) => (
  <svg {...base} {...p}>
    <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
  </svg>
)

export const IconNews = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="4" width="14" height="16" rx="2.5" />
    <path d="M17 8h3a1 1 0 0 1 1 1v9a2 2 0 0 1-2 2H5M7 8h6M7 12h6M7 16h4" />
  </svg>
)

export const IconLocation = (p) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
)

export const IconClock = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

export const IconChevron = (p) => (
  <svg {...base} {...p}>
    <path d="M9 6l6 6-6 6" />
  </svg>
)

export const IconCheck = (p) => (
  <svg {...base} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

export const IconMenu = (p) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const IconClose = (p) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const IconGlobe = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18" />
  </svg>
)
