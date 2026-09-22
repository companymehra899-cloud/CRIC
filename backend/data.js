const T = (short, name, flag) => ({ short, name, flag })

export const teams = {
  IND: T('IND', 'India', 'IN'),
  JPN: T('JPN', 'Japan', 'JP'),
  ENG: T('ENG', 'England', 'GB'),
  SL: T('SL', 'Sri Lanka', 'LK'),
  PAK: T('PAK', 'Pakistan', 'PK'),
  BAN: T('BAN', 'Bangladesh', 'BD'),
  AUS: T('AUS', 'Australia', 'AU'),
  NZ: T('NZ', 'New Zealand', 'NZ'),
  SA: T('SA', 'South Africa', 'ZA'),
  WI: T('WI', 'West Indies', 'WI'),
  AFG: T('AFG', 'Afghanistan', 'AF'),
  ZIM: T('ZIM', 'Zimbabwe', 'ZW'),
  IRE: T('IRE', 'Ireland', 'IE'),
  NED: T('NED', 'Netherlands', 'NL'),
  SCO: T('SCO', 'Scotland', 'GB'),
  NEP: T('NEP', 'Nepal', 'NP'),
  OMA: T('OMA', 'Oman', 'OM'),
  USA: T('USA', 'United States', 'US'),
  NAM: T('NAM', 'Namibia', 'NA'),
  HK: T('HK', 'Hong Kong', 'HK'),
  PNG: T('PNG', 'Papua New Guinea', 'PG'),
  UAE: T('UAE', 'United Arab Emirates', 'AE'),
  INDA: T('INDA', 'India A', 'IN'),
  AUSA: T('AUSA', 'Australia A', 'AU'),
  INDW: T('INDW', 'India Women', 'IN'),
  SLW: T('SLW', 'Sri Lanka Women', 'LK'),
  PAKW: T('PAKW', 'Pakistan Women', 'PK'),
  BANW: T('BANW', 'Bangladesh Women', 'BD'),
  ENGW: T('ENGW', 'England Women', 'GB'),
  AUSW: T('AUSW', 'Australia Women', 'AU'),
  CHENNAI: T('CSK', 'Chennai Super Kings', 'IN'),
  MUMBAI: T('MI', 'Mumbai Indians', 'IN'),
  BENGALURU: T('RCB', 'Royal Challengers Bengaluru', 'IN'),
  KOLKATA: T('KKR', 'Kolkata Knight Riders', 'IN'),
  LAHORE: T('LQ', 'Lahore Qalandars', 'PK'),
  KARACHI: T('KK', 'Karachi Kings', 'PK'),
  SYDNEY: T('SS', 'Sydney Sixers', 'AU'),
  PERTH: T('PS', 'Perth Scorchers', 'AU'),
  TRINBAGO: T('TKR', 'Trinbago Knight Riders', 'WI'),
  BARBADOS: T('BR', 'Barbados Royals', 'WI'),
  DUBAI: T('DC', 'Dubai Capitals', 'AE'),
  ABUDHABI: T('ADKR', 'Abu Dhabi Knight Riders', 'AE'),
  QUEENSLAND: T('QL', 'Queensland', 'AU'),
  NSW: T('NSW', 'New South Wales', 'AU'),
  TASMANIA: T('TAS', 'Tasmania', 'AU'),
  SAUS: T('SAUS', 'South Australia', 'AU'),
  KENT: T('KENT', 'Kent', 'GB'),
  SURREY: T('SUR', 'Surrey', 'GB'),
  LANCASHIRE: T('LAN', 'Lancashire', 'GB'),
  MINERS: T('KM', 'Keonjhar Miners', 'IN'),
  TIGERS: T('BT', 'Bhubaneswar Tigers', 'IN')
}

const ov = (o, b = 0) => ({ overs: o, balls: b })

const batsman = (name, runs, balls, fours, sixes, sr, out = true, how = '') => ({
  name, runs, balls, fours, sixes, sr, out, how
})
const bowler = (name, overs, maidens, runs, wickets, econ) => ({ name, overs, maidens, runs, wickets, econ })

export const matches = [
  {
    id: 'eng-vs-sl-1st-odi',
    status: 'live',
    state: 'Innings Break',
    format: 'ODI',
    formatLabel: 'ODI',
    category: 'International',
    series: 'Sri Lanka tour of England, 2026',
    seriesId: 'sl-tour-eng-2026',
    matchNo: '1st ODI',
    venue: 'Riverside Ground, Chester-le-Street, England',
    startTime: '2026-09-22T10:00:00Z',
    toss: 'England won the toss and elected to bat',
    teams: [teams.ENG, teams.SL],
    score: [
      { team: 'ENG', runs: 265, wickets: 10, overs: 48.1, innings: 1 },
      { team: 'SL', runs: 0, wickets: 0, overs: 0, innings: 2 }
    ],
    note: 'Sri Lanka need 266 runs to win',
    city: 'Chester-le-Street',
    scores: [
      {
        team: 'ENG',
        innings: 'England Innings',
        runs: 265,
        wickets: 10,
        overs: 48.1,
        runRate: 5.5,
        batting: [
          batsman('Ben Duckett', 42, 38, 6, 0, 110.5, true, 'c Mendis b Theekshana'),
          batsman('Phil Salt', 28, 22, 4, 1, 127.3, true, 'b Chameera'),
          batsman('Harry Brook', 67, 61, 5, 2, 109.8, true, 'c Asalanka b Hasaranga'),
          batsman('Joe Root', 35, 46, 3, 0, 76.1, true, 'lbw b Wellalage'),
          batsman('Ben Stokes', 24, 30, 2, 0, 80.0, true, 'c Samarawickrama b Chameera'),
          batsman('Jos Buttler', 31, 34, 2, 1, 91.2, true, 'c Nissanka b Theekshana'),
          batsman('Liam Livingstone', 18, 16, 1, 1, 112.5, true, 'b Hasaranga'),
          batsman('Adil Rashid', 8, 12, 0, 0, 66.7, true, 'run out'),
          batsman('Jofra Archer', 4, 6, 0, 0, 66.7, true, 'c Mendis b Chameera'),
          batsman('Mark Wood', 2, 4, 0, 0, 50.0, true, 'b Theekshana'),
          batsman('Gus Atkinson', 0, 2, 0, 0, 0, false, 'not out')
        ],
        bowling: [
          bowler('Maheesh Theekshana', 9.1, 0, 48, 3, 5.24),
          bowler('Dushmantha Chameera', 10, 1, 52, 3, 5.2),
          bowler('Wanindu Hasaranga', 10, 0, 55, 2, 5.5),
          bowler('Dunith Wellalage', 9, 0, 44, 1, 4.89),
          bowler('Asitha Fernando', 10, 0, 62, 0, 6.2)
        ],
        extras: 8,
        fallOfWickets: ['1-48 (Salt, 7.2)', '2-89 (Duckett, 14.1)', '3-145 (Brook, 25.3)', '4-178 (Root, 31.5)', '5-210 (Stokes, 38.2)', '6-236 (Livingstone, 43.1)', '7-252 (Buttler, 45.4)', '8-261 (Rashid, 47.1)', '9-263 (Archer, 47.5)', '10-265 (Wood, 48.1)']
      },
      {
        team: 'SL',
        innings: 'Sri Lanka Innings',
        runs: 0,
        wickets: 0,
        overs: 0,
        runRate: 0,
        batting: [
          batsman('Pathum Nissanka', 0, 0, 0, 0, 0, false, 'yet to bat'),
          batsman('Kusal Mendis', 0, 0, 0, 0, 0, false, 'yet to bat'),
          batsman('Kusal Perera', 0, 0, 0, 0, 0, false, 'yet to bat'),
          batsman('Charith Asalanka', 0, 0, 0, 0, 0, false, 'yet to bat'),
          batsman('Sadeera Samarawickrama', 0, 0, 0, 0, 0, false, 'yet to bat'),
          batsman('Dunith Wellalage', 0, 0, 0, 0, 0, false, 'yet to bat'),
          batsman('Wanindu Hasaranga', 0, 0, 0, 0, 0, false, 'yet to bat'),
          batsman('Maheesh Theekshana', 0, 0, 0, 0, 0, false, 'yet to bat'),
          batsman('Dushmantha Chameera', 0, 0, 0, 0, 0, false, 'yet to bat'),
          batsman('Asitha Fernando', 0, 0, 0, 0, 0, false, 'yet to bat'),
          batsman('Jeffrey Vandersay', 0, 0, 0, 0, 0, false, 'yet to bat')
        ],
        bowling: [],
        extras: 0,
        fallOfWickets: []
      }
    ],
    commentary: [
      { over: '48.1', text: 'OUT! Wood b Theekshana. England bowled out for 265.', event: 'wicket' },
      { over: '48.0', text: 'Atkinson clips it to deep midwicket for a single.', event: 'run' },
      { over: '47.5', text: 'OUT! Archer c Mendis b Chameera. England 263/9.', event: 'wicket' },
      { over: '47.1', text: 'OUT! Rashid run out. England 261/8.', event: 'wicket' },
      { over: '46.2', text: 'FOUR! Buttler cuts it past point.', event: 'four' },
      { over: '45.4', text: 'OUT! Buttler c Nissanka b Theekshana. England 252/7.', event: 'wicket' },
      { over: '44.3', text: 'SIX! Livingstone launches it over long-on.', event: 'six' }
    ]
  },
  {
    id: 'ind-vs-jpn-t20i',
    status: 'completed',
    state: 'India won by 2 runs',
    format: 'T20',
    formatLabel: 'T20I',
    category: 'International',
    series: 'India tour of Japan, 2026',
    seriesId: 'ind-tour-jpn-2026',
    matchNo: 'One-off T20I',
    venue: 'Sano International Cricket Ground, Sano, Kanto, Japan',
    startTime: '2026-09-22T04:00:00Z',
    toss: 'India won the toss and elected to bat',
    teams: [teams.IND, teams.JPN],
    score: [
      { team: 'IND', runs: 32, wickets: 4, overs: 5, innings: 1 },
      { team: 'JPN', runs: 30, wickets: 3, overs: 5, innings: 2 }
    ],
    note: 'India won by 2 runs - 5 over game due to wet outfield',
    winner: 'India',
    city: 'Sano',
    scores: [
      {
        team: 'IND', innings: 'India Innings', runs: 32, wickets: 4, overs: 5, runRate: 6.4,
        batting: [
          batsman('Abhishek Sharma', 12, 8, 2, 1, 150.0, true, 'c b Yano'),
          batsman('Shubman Gill', 6, 7, 1, 0, 85.7, true, 'b Kato'),
          batsman('Suryakumar Yadav', 5, 5, 0, 0, 100.0, true, 'c b Yano'),
          batsman('Rinku Singh', 6, 7, 0, 0, 85.7, true, 'run out'),
          batsman('Hardik Pandya', 2, 3, 0, 0, 66.7, false, 'not out'),
          batsman('Rishabh Pant', 1, 1, 0, 0, 100.0, false, 'not out')
        ],
        bowling: [
          bowler('Yano', 2, 0, 14, 2, 7.0),
          bowler('Kato', 2, 0, 11, 1, 5.5),
          bowler('Sato', 1, 0, 7, 0, 7.0)
        ],
        extras: 0, fallOfWickets: ['1-18', '2-21', '3-27', '4-31']
      },
      {
        team: 'JPN', innings: 'Japan Innings', runs: 30, wickets: 3, overs: 5, runRate: 6.0,
        batting: [
          batsman('Lachlan Lake', 14, 12, 2, 0, 116.7, true, 'c Pant b Bumrah'),
          batsman('Kendel Fleming', 8, 9, 1, 0, 88.9, true, 'b Kuldeep'),
          batsman('Sabaorish Ravichandran', 4, 5, 0, 0, 80.0, true, 'c Gill b Arshdeep'),
          batsman('Declan Suzuki', 3, 4, 0, 0, 75.0, false, 'not out')
        ],
        bowling: [
          bowler('Jasprit Bumrah', 2, 0, 9, 1, 4.5),
          bowler('Arshdeep Singh', 2, 0, 14, 1, 7.0),
          bowler('Kuldeep Yadav', 1, 0, 7, 1, 7.0)
        ],
        extras: 1, fallOfWickets: ['1-20', '2-25', '3-29']
      }
    ],
    commentary: [
      { over: '5.0', text: 'Japan finish on 30/3. India win by 2 runs.', event: 'run' },
      { over: '4.4', text: 'FOUR! Lake finds the gap through covers.', event: 'four' },
      { over: '4.1', text: 'OUT! Ravichandran c Gill b Arshdeep.', event: 'wicket' }
    ]
  },
  {
    id: 'indw-vs-slw-final',
    status: 'completed',
    state: 'India Women won by 147 runs',
    format: 'T20',
    formatLabel: 'T20I',
    category: 'Women',
    series: "Women's Asian Games, 2026",
    seriesId: 'womens-asian-games-2026',
    matchNo: 'Final',
    venue: 'Korogi Sports Park, Nisshin, Japan',
    startTime: '2026-09-22T05:00:00Z',
    toss: 'India Women won the toss and elected to bat',
    teams: [teams.INDW, teams.SLW],
    score: [
      { team: 'INDW', runs: 216, wickets: 3, overs: 20, innings: 1 },
      { team: 'SLW', runs: 69, wickets: 10, overs: 15.4, innings: 2 }
    ],
    note: 'India Women won by 147 runs',
    winner: 'India Women',
    city: 'Nisshin',
    scores: [
      {
        team: 'INDW', innings: 'India Women Innings', runs: 216, wickets: 3, overs: 20, runRate: 10.8,
        batting: [
          batsman('Smriti Mandhana', 78, 52, 9, 3, 150.0, true, 'c b Prabodhani'),
          batsman('Shafali Verma', 45, 30, 5, 2, 150.0, true, 'b Ranaweera'),
          batsman('Jemimah Rodrigues', 52, 25, 4, 3, 208.0, true, 'c b Dilhari'),
          batsman('Harmanpreet Kaur', 22, 11, 1, 2, 200.0, false, 'not out'),
          batsman('Richa Ghosh', 12, 4, 1, 1, 300.0, false, 'not out')
        ],
        bowling: [
          bowler('Prabodhani', 4, 0, 42, 1, 10.5),
          bowler('Ranaweera', 4, 0, 38, 1, 9.5),
          bowler('Dilhari', 4, 0, 45, 1, 11.25),
          bowler('Fernando', 4, 0, 48, 0, 12.0),
          bowler('Kumari', 4, 0, 39, 0, 9.75)
        ],
        extras: 7, fallOfWickets: ['1-98', '2-168', '3-196']
      },
      {
        team: 'SLW', innings: 'Sri Lanka Women Innings', runs: 69, wickets: 10, overs: 15.4, runRate: 4.4,
        batting: [
          batsman('Vishmi Gunaratne', 21, 24, 3, 0, 87.5, true, 'b Deepti'),
          batsman('Chamari Athapaththu', 14, 12, 2, 0, 116.7, true, 'c Ghosh b Renuka'),
          batsman('Harshitha Samarawickrama', 8, 14, 1, 0, 57.1, true, 'lbw b Deepti'),
          batsman('Kavisha Dilhari', 6, 9, 0, 0, 66.7, true, 'c Mandhana b Shreyanka'),
          batsman('Anushka Sanjeewani', 5, 8, 0, 0, 62.5, true, 'b Shreyanka'),
          batsman('Nilakshi de Silva', 4, 9, 0, 0, 44.4, true, 'run out'),
          batsman('Hasini Perera', 3, 6, 0, 0, 50.0, true, 'b Radha'),
          batsman('Inoka Ranaweera', 2, 4, 0, 0, 50.0, true, 'c Kaur b Deepti'),
          batsman('Achini Kulasuriya', 1, 3, 0, 0, 33.3, true, 'b Radha'),
          batsman('Udeshika Prabodhani', 0, 2, 0, 0, 0, true, 'b Radha'),
          batsman('Kavisha Fernando', 0, 1, 0, 0, 0, false, 'not out')
        ],
        bowling: [
          bowler('Renuka Singh', 3, 0, 18, 1, 6.0),
          bowler('Radha Yadav', 3.4, 1, 12, 3, 3.27),
          bowler('Deepti Sharma', 4, 0, 16, 3, 4.0),
          bowler('Shreyanka Patil', 3, 0, 14, 2, 4.67),
          bowler('Asha Sobhana', 2, 0, 9, 0, 4.5)
        ],
        extras: 5, fallOfWickets: ['1-26', '2-40', '3-48', '4-54', '5-58', '6-62', '7-65', '8-68', '9-69', '10-69']
      }
    ],
    commentary: [
      { over: '15.4', text: 'OUT! Radha Yadav cleans up Fernando. Sri Lanka 69 all out.', event: 'wicket' },
      { over: '14.5', text: 'OUT! Deepti strikes again, Ranaweera departs.', event: 'wicket' },
      { over: '12.3', text: 'SIX! Athapaththu goes aerial over midwicket.', event: 'six' }
    ]
  },
  {
    id: 'inda-vs-ausa-test',
    status: 'live',
    state: 'Day 1: Stumps',
    format: 'Test',
    formatLabel: 'FC',
    category: 'Domestic',
    series: 'Australia A tour of India, 2026',
    seriesId: 'ausa-tour-ind-2026',
    matchNo: '1st unofficial Test',
    venue: 'Cricket Association Puducherry Ground, Puducherry, India',
    startTime: '2026-09-22T04:00:00Z',
    toss: 'India A won the toss and elected to bat',
    teams: [teams.INDA, teams.AUSA],
    score: [
      { team: 'INDA', runs: 257, wickets: 5, overs: 90, innings: 1 },
      { team: 'AUSA', runs: 0, wickets: 0, overs: 0, innings: 2 }
    ],
    note: 'Day 1: Stumps',
    city: 'Puducherry',
    scores: [
      {
        team: 'INDA', innings: 'India A 1st Innings', runs: 257, wickets: 5, overs: 90, runRate: 2.86,
        batting: [
          batsman('Abhimanyu Easwaran', 34, 72, 4, 0, 47.2, true, 'c Bancroft b Morris'),
          batsman('Kumar Kushagra', 89, 156, 11, 1, 57.1, true, 'c Carey b Murphy'),
          batsman('Ricky Bhui', 18, 45, 2, 0, 40.0, true, 'b Boland'),
          batsman('Sarfaraz Khan', 27, 52, 3, 0, 51.9, true, 'lbw b Murphy'),
          batsman('Tanush Kotian', 54, 88, 6, 0, 61.4, false, 'batting'),
          batsman('Dhruv Jurel', 22, 40, 3, 0, 55.0, false, 'batting'),
          batsman('Manav Suthar', 6, 18, 1, 0, 33.3, true, 'c b Morris')
        ],
        bowling: [
          bowler('Scott Boland', 20, 6, 48, 1, 2.4),
          bowler('Lance Morris', 19, 4, 62, 2, 3.26),
          bowler('Todd Murphy', 26, 5, 71, 2, 2.73),
          bowler('Nathan McAndrew', 15, 3, 42, 0, 2.8),
          bowler('Beau Webster', 10, 2, 28, 0, 2.8)
        ],
        extras: 7, fallOfWickets: ['1-72 (Easwaran, 22.4)', '2-97 (Bhui, 33.1)', '3-156 (Sarfaraz, 52.3)', '4-201 (Kushagra, 71.2)', '5-238 (Suthar, 84.5)']
      },
      {
        team: 'AUSA', innings: 'Australia A 1st Innings', runs: 0, wickets: 0, overs: 0, runRate: 0,
        batting: [
          batsman('Cameron Bancroft', 0, 0, 0, 0, 0, false, 'yet to bat'),
          batsman('Marcus Harris', 0, 0, 0, 0, 0, false, 'yet to bat'),
          batsman('Alex Carey', 0, 0, 0, 0, 0, false, 'yet to bat'),
          batsman('Beau Webster', 0, 0, 0, 0, 0, false, 'yet to bat'),
          batsman('Matt Renshaw', 0, 0, 0, 0, 0, false, 'yet to bat')
        ],
        bowling: [], extras: 0, fallOfWickets: []
      }
    ],
    commentary: [
      { over: '90.0', text: 'Stumps on Day 1. India A 257/5 with Kotian 54*, Jurel 22*.', event: 'run' },
      { over: '88.2', text: 'FOUR! Kotian drives through extra cover to bring up his fifty.', event: 'four' },
      { over: '84.5', text: 'OUT! Suthar c Webster b Morris.', event: 'wicket' }
    ]
  },
  {
    id: 'qld-vs-nsw-odd-cup',
    status: 'completed',
    state: 'New South Wales won by 4 wkts',
    format: 'ODI',
    formatLabel: 'List A',
    category: 'Domestic',
    series: 'Australia Domestic One-Day Cup 2026-27',
    seriesId: 'aus-domestic-cup-2026-27',
    matchNo: '4th Match',
    venue: 'Allan Border Field, Brisbane, Australia',
    startTime: '2026-09-22T04:00:00Z',
    toss: 'Queensland won the toss and elected to bat',
    teams: [teams.QUEENSLAND, teams.NSW],
    score: [
      { team: 'QL', runs: 358, wickets: 10, overs: 49.5, innings: 1 },
      { team: 'NSW', runs: 359, wickets: 6, overs: 49, innings: 2 }
    ],
    note: 'New South Wales won by 4 wickets',
    winner: 'New South Wales',
    city: 'Brisbane',
    scores: [
      {
        team: 'QL', innings: 'Queensland Innings', runs: 358, wickets: 10, overs: 49.5, runRate: 7.18,
        batting: [
          batsman('Jimmy Peirson', 64, 55, 7, 2, 116.4, true, 'c b Bird'),
          batsman('Usman Khawaja', 88, 96, 9, 1, 91.7, true, 'b Dwarshuis'),
          batsman('Marnus Labuschagne', 42, 48, 4, 0, 87.5, true, 'lbw b Green'),
          batsman('Matt Renshaw', 51, 44, 3, 2, 115.9, true, 'c b Henriques'),
          batsman('Sam Heazlett', 33, 27, 2, 1, 122.2, true, 'run out'),
          batsman('Jack Wildermuth', 21, 15, 1, 1, 140.0, true, 'c b Bird'),
          batsman('Xavier Bartlett', 18, 11, 2, 1, 163.6, true, 'b Dwarshuis'),
          batsman('Mitchell Swepson', 12, 8, 1, 0, 150.0, true, 'run out'),
          batsman('Liam Guthrie', 6, 5, 1, 0, 120.0, true, 'c b Bird'),
          batsman('Kane Richardson', 4, 3, 0, 0, 133.3, true, 'b Dwarshuis'),
          batsman('Cameron Boyce', 1, 2, 0, 0, 50.0, false, 'not out')
        ],
        bowling: [
          bowler('Jackson Bird', 10, 0, 62, 3, 6.2),
          bowler('Ben Dwarshuis', 9.5, 0, 71, 3, 7.22),
          bowler('Chris Green', 10, 0, 58, 1, 5.8),
          bowler('Moises Henriques', 10, 0, 74, 1, 7.4),
          bowler('Hayden Kerr', 10, 0, 88, 0, 8.8)
        ],
        extras: 16, fallOfWickets: ['1-98', '2-172', '3-240', '4-274', '5-310', '6-330', '7-345', '8-352', '9-356', '10-358']
      },
      {
        team: 'NSW', innings: 'New South Wales Innings', runs: 359, wickets: 6, overs: 49, runRate: 7.33,
        batting: [
          batsman('Daniel Hughes', 92, 88, 11, 2, 104.5, true, 'c Peirson b Bartlett'),
          batsman('Jack Edwards', 74, 69, 8, 1, 107.2, true, 'b Swepson'),
          batsman('Moises Henriques', 58, 52, 4, 2, 111.5, true, 'c b Boyce'),
          batsman('Oliver Davies', 41, 34, 3, 2, 120.6, true, 'run out'),
          batsman('Matthew Gilkes', 37, 31, 2, 1, 119.4, true, 'c b Guthrie'),
          batsman('Chris Green', 24, 16, 2, 1, 150.0, false, 'not out'),
          batsman('Hayden Kerr', 19, 11, 1, 1, 172.7, false, 'not out')
        ],
        bowling: [
          bowler('Xavier Bartlett', 10, 0, 68, 1, 6.8),
          bowler('Kane Richardson', 9, 0, 71, 0, 7.89),
          bowler('Mitchell Swepson', 10, 0, 62, 1, 6.2),
          bowler('Cameron Boyce', 10, 0, 74, 1, 7.4),
          bowler('Liam Guthrie', 10, 0, 78, 1, 7.8)
        ],
        extras: 14, fallOfWickets: ['1-142', '2-198', '3-256', '4-298', '5-320', '6-338']
      }
    ],
    commentary: [
      { over: '49.0', text: 'NSW chase down 359 with an over to spare. Kerr finishes it off.', event: 'run' },
      { over: '48.2', text: 'SIX! Green seals it with a massive hit over long-on.', event: 'six' }
    ]
  },
  {
    id: 'gh-vs-sle-2nd-match',
    status: 'completed',
    state: 'Complete',
    format: 'T20',
    formatLabel: 'T20I',
    category: 'International',
    series: 'Quadrangular T20I Series in Nigeria, 2026',
    seriesId: 'quad-t20i-nigeria-2026',
    matchNo: '2nd Match',
    venue: "Tafawa Balewa Square Cricket Oval, Lagos, Nigeria",
    startTime: '2026-09-22T12:00:00Z',
    toss: 'Sierra Leone won the toss and elected to field',
    teams: [teams.BANW, teams.SLW],
    score: [
      { team: 'GH', runs: 148, wickets: 6, overs: 20, innings: 1 },
      { team: 'SLE', runs: 149, wickets: 4, overs: 19.2, innings: 2 }
    ],
    note: 'Sierra Leone won by 6 wickets',
    winner: 'Sierra Leone',
    city: 'Lagos',
    scores: [
      {
        team: 'GH', innings: 'Ghana Innings', runs: 148, wickets: 6, overs: 20, runRate: 7.4,
        batting: [
          batsman('James Vifah', 52, 44, 5, 3, 118.2, true, 'c b Kpaka'),
          batsman('Obed Harvey', 31, 28, 3, 2, 110.7, true, 'b Kamara'),
          batsman('Rexford Bakum', 24, 21, 2, 1, 114.3, true, 'run out'),
          batsman('Samson Awiah', 18, 14, 1, 1, 128.6, true, 'c b Bangura'),
          batsman('Kofi Bagabena', 12, 9, 1, 0, 133.3, false, 'not out')
        ],
        bowling: [
          bowler('George Ngegba', 4, 0, 28, 1, 7.0),
          bowler('Alusine Kpaka', 4, 0, 32, 1, 8.0),
          bowler('Abass Kamara', 4, 0, 30, 1, 7.5),
          bowler('Samuel Bangura', 4, 0, 26, 1, 6.5),
          bowler('Raymond Kroma', 4, 0, 30, 0, 7.5)
        ],
        extras: 11, fallOfWickets: ['1-74', '2-96', '3-114', '4-128', '5-140', '6-146']
      },
      {
        team: 'SLE', innings: 'Sierra Leone Innings', runs: 149, wickets: 4, overs: 19.2, runRate: 7.71,
        batting: [
          batsman('Alusine Kpaka', 61, 48, 7, 2, 127.1, true, 'c b Bakum'),
          batsman('George Ngegba', 42, 39, 4, 1, 107.7, true, 'b Harvey'),
          batsman('Lansana Bangura', 23, 18, 2, 1, 127.8, true, 'run out'),
          batsman('Abass Kamara', 14, 9, 1, 1, 155.6, false, 'not out'),
          batsman('Mohamed Turay', 5, 4, 0, 0, 125.0, false, 'not out')
        ],
        bowling: [
          bowler('Rexford Bakum', 4, 0, 32, 1, 8.0),
          bowler('Obed Harvey', 4, 0, 28, 1, 7.0),
          bowler('Kofi Bagabena', 4, 0, 30, 0, 7.5),
          bowler('Samson Awiah', 3.2, 0, 31, 0, 9.3),
          bowler('Daniel Anefie', 4, 0, 25, 0, 6.25)
        ],
        extras: 4, fallOfWickets: ['1-88', '2-112', '3-134', '4-142']
      }
    ],
    commentary: [
      { over: '19.2', text: 'Sierra Leone complete a fine chase, winning by 6 wickets.', event: 'run' },
      { over: '18.4', text: 'FOUR! Kamara finishes it in style through covers.', event: 'four' }
    ]
  },
  {
    id: 'ght-vs-nga-1st-match',
    status: 'completed',
    state: 'Nigeria won by 5 wickets',
    format: 'T20',
    formatLabel: 'T20I',
    category: 'International',
    series: 'Quadrangular T20I Series in Nigeria, 2026',
    seriesId: 'quad-t20i-nigeria-2026',
    matchNo: '1st Match',
    venue: "Tafawa Balewa Square Cricket Oval, Lagos, Nigeria",
    startTime: '2026-09-22T08:00:00Z',
    toss: 'Ghana won the toss and elected to bat',
    teams: [teams.BANW, teams.NAM],
    score: [
      { team: 'GH', runs: 132, wickets: 8, overs: 20, innings: 1 },
      { team: 'NGA', runs: 135, wickets: 5, overs: 18.4, innings: 2 }
    ],
    note: 'Nigeria won by 5 wickets',
    winner: 'Nigeria',
    city: 'Lagos',
    scores: [
      {
        team: 'GH', innings: 'Ghana Innings', runs: 132, wickets: 8, overs: 20, runRate: 6.6,
        batting: [
          batsman('James Vifah', 44, 38, 4, 1, 115.8, true, 'b Aho'),
          batsman('Obed Harvey', 28, 25, 3, 0, 112.0, true, 'c b Useni'),
          batsman('Rexford Bakum', 21, 19, 2, 1, 110.5, true, 'lbw b Okpe'),
          batsman('Samson Awiah', 15, 14, 1, 0, 107.1, true, 'run out'),
          batsman('Kofi Bagabena', 8, 10, 0, 0, 80.0, false, 'not out')
        ],
        bowling: [
          bowler('Prosper Useni', 4, 0, 24, 1, 6.0),
          bowler('Peter Aho', 4, 0, 22, 1, 5.5),
          bowler('Isaac Okpe', 4, 0, 28, 1, 7.0),
          bowler('Sylvester Okpe', 4, 0, 30, 0, 7.5),
          bowler('Ridwan Abdulkareem', 4, 0, 26, 1, 6.5)
        ],
        extras: 12, fallOfWickets: ['1-68', '2-92', '3-108', '4-118', '5-124', '6-128', '7-130', '8-132']
      },
      {
        team: 'NGA', innings: 'Nigeria Innings', runs: 135, wickets: 5, overs: 18.4, runRate: 7.23,
        batting: [
          batsman('Sulaimon Runsewe', 48, 41, 5, 2, 117.1, true, 'c b Bakum'),
          batsman('Ashmit Shreshta', 39, 33, 4, 1, 118.2, true, 'b Harvey'),
          batsman('Isaac Okpe', 22, 17, 2, 1, 129.4, true, 'run out'),
          batsman('Ridwan Abdulkareem', 11, 8, 1, 0, 137.5, false, 'not out'),
          batsman('Prosper Useni', 6, 5, 0, 0, 120.0, false, 'not out')
        ],
        bowling: [
          bowler('Rexford Bakum', 4, 0, 30, 1, 7.5),
          bowler('Obed Harvey', 4, 0, 26, 1, 6.5),
          bowler('Kofi Bagabena', 4, 0, 32, 0, 8.0),
          bowler('Samson Awiah', 3.4, 0, 27, 0, 7.36),
          bowler('Daniel Anefie', 3, 0, 20, 0, 6.67)
        ],
        extras: 9, fallOfWickets: ['1-84', '2-104', '3-118', '4-126', '5-130']
      }
    ],
    commentary: [
      { over: '18.4', text: 'Nigeria get home with 8 balls to spare.', event: 'run' }
    ]
  },
  {
    id: 'ktm-vs-bt-2nd-match',
    status: 'completed',
    state: 'Bhubaneswar Tigers won by 7 runs',
    format: 'T20',
    formatLabel: 'T20',
    category: 'Domestic',
    series: 'Odisha T20 League 2026',
    seriesId: 'odisha-t20-2026',
    matchNo: '2nd Match',
    venue: 'Barabati Stadium, Cuttack, India',
    startTime: '2026-09-21T09:00:00Z',
    toss: 'Bhubaneswar Tigers won the toss and elected to bat',
    teams: [teams.MINERS, teams.TIGERS],
    score: [
      { team: 'BT', runs: 64, wickets: 3, overs: 7, innings: 1 },
      { team: 'KM', runs: 40, wickets: 2, overs: 4, innings: 2 }
    ],
    note: 'Bhubaneswar Tigers won by 7 runs (DLS)',
    winner: 'Bhubaneswar Tigers',
    city: 'Cuttack',
    scores: [
      {
        team: 'BT', innings: 'Bhubaneswar Tigers Innings', runs: 64, wickets: 3, overs: 7, runRate: 9.14,
        batting: [
          batsman('Anurag Sarangi', 28, 18, 3, 2, 155.6, true, 'c b Das'),
          batsman('Rakesh Pattanaik', 18, 14, 2, 0, 128.6, true, 'b Mohanty'),
          batsman('Subhranshu Senapati', 12, 8, 1, 1, 150.0, false, 'not out')
        ],
        bowling: [
          bowler('Suryakant Das', 2, 0, 18, 1, 9.0),
          bowler('Debabrata Mohanty', 2, 0, 16, 1, 8.0),
          bowler('Anil Parida', 2, 0, 20, 0, 10.0),
          bowler('Saswat Mohanty', 1, 0, 10, 1, 10.0)
        ],
        extras: 6, fallOfWickets: ['1-38', '2-52', '3-60']
      },
      {
        team: 'KM', innings: 'Keonjhar Miners Innings', runs: 40, wickets: 2, overs: 4, runRate: 10.0,
        batting: [
          batsman('Bikash Rout', 22, 13, 2, 2, 169.2, true, 'c b Senapati'),
          batsman('Prayash Singh', 14, 10, 1, 1, 140.0, false, 'not out')
        ],
        bowling: [
          bowler('Subhranshu Senapati', 1, 0, 8, 1, 8.0),
          bowler('Anurag Sarangi', 1, 0, 12, 0, 12.0),
          bowler('Rakesh Pattanaik', 1, 0, 10, 1, 10.0),
          bowler('Rajesh Mohanty', 1, 0, 9, 0, 9.0)
        ],
        extras: 1, fallOfWickets: ['1-30', '2-38']
      }
    ],
    commentary: [
      { over: '4.0', text: 'Rain ends the chase. Tigers win by 7 runs on DLS.', event: 'run' }
    ]
  },
  {
    id: 'bhm-vs-caym-2nd-match',
    status: 'completed',
    state: 'Match Abandoned',
    format: 'T20',
    formatLabel: 'T20I',
    category: 'International',
    series: 'North American Cup, 2026',
    seriesId: 'north-american-cup-2026',
    matchNo: '2nd Match',
    venue: 'Coconut Park, Fort Lauderdale, USA',
    startTime: '2026-09-21T14:00:00Z',
    toss: 'No toss',
    teams: [teams.USA, teams.NAM],
    score: [
      { team: 'BHM', runs: 0, wickets: 0, overs: 0, innings: 1 },
      { team: 'CAYM', runs: 0, wickets: 0, overs: 0, innings: 2 }
    ],
    note: 'Match abandoned due to rain',
    city: 'Fort Lauderdale',
    scores: [],
    commentary: [
      { over: '0.0', text: 'Persistent rain means no play is possible. Match abandoned.', event: 'run' }
    ]
  },
  {
    id: 'ncape-vs-limpo-1st-match',
    status: 'upcoming',
    state: 'Preview',
    format: 'T20',
    formatLabel: 'T20',
    category: 'League',
    series: 'CSA T20 Challenge 2026',
    seriesId: 'csa-t20-challenge-2026',
    matchNo: '1st Match',
    venue: 'Diamond Oval, Kimberley, South Africa',
    startTime: '2026-09-23T12:00:00Z',
    toss: '',
    teams: [teams.SA, teams.NAM],
    score: [],
    note: 'Match starts at 12:00 UTC',
    city: 'Kimberley',
    scores: [],
    commentary: []
  },
  {
    id: 'nga-vs-sle-3rd-match',
    status: 'upcoming',
    state: 'Preview',
    format: 'T20',
    formatLabel: 'T20I',
    category: 'International',
    series: 'Quadrangular T20I Series in Nigeria, 2026',
    seriesId: 'quad-t20i-nigeria-2026',
    matchNo: '3rd Match',
    venue: "Tafawa Balewa Square Cricket Oval, Lagos, Nigeria",
    startTime: '2026-09-23T08:00:00Z',
    toss: '',
    teams: [teams.NAM, teams.WI],
    score: [],
    note: 'Match starts at 08:00 UTC',
    city: 'Lagos',
    scores: [],
    commentary: []
  },
  {
    id: 'sa-vs-aus-1st-odi',
    status: 'upcoming',
    state: 'Preview',
    format: 'ODI',
    formatLabel: 'ODI',
    category: 'International',
    series: 'Australia tour of South Africa, 2026',
    seriesId: 'aus-tour-sa-2026',
    matchNo: '1st ODI',
    venue: 'Mangaung Oval, Bloemfontein, South Africa',
    startTime: '2026-09-24T11:00:00Z',
    toss: '',
    teams: [teams.SA, teams.AUS],
    score: [],
    note: 'Match starts at 11:00 UTC',
    city: 'Bloemfontein',
    scores: [],
    commentary: []
  },
  {
    id: 'ind-vs-wi-1st-t20i',
    status: 'upcoming',
    state: 'Preview',
    format: 'T20',
    formatLabel: 'T20I',
    category: 'International',
    series: 'West Indies tour of India, 2026',
    seriesId: 'wi-tour-ind-2026',
    matchNo: '1st T20I',
    venue: 'Arun Jaitley Stadium, Delhi, India',
    startTime: '2026-10-06T14:00:00Z',
    toss: '',
    teams: [teams.IND, teams.WI],
    score: [],
    note: 'Match starts at 14:00 UTC',
    city: 'Delhi',
    scores: [],
    commentary: []
  },
  {
    id: 'eng-vs-sl-2nd-odi',
    status: 'upcoming',
    state: 'Preview',
    format: 'ODI',
    formatLabel: 'ODI',
    category: 'International',
    series: 'Sri Lanka tour of England, 2026',
    seriesId: 'sl-tour-eng-2026',
    matchNo: '2nd ODI',
    venue: "Lord's, London, England",
    startTime: '2026-09-25T10:00:00Z',
    toss: '',
    teams: [teams.ENG, teams.SL],
    score: [],
    note: 'Match starts at 10:00 UTC',
    city: 'London',
    scores: [],
    commentary: []
  },
  {
    id: 'in-u19-vs-au-u19-3rd-odi',
    status: 'upcoming',
    state: 'Preview',
    format: 'ODI',
    formatLabel: 'ODI',
    category: 'Domestic',
    series: 'Australia U19 tour of India 2026',
    seriesId: 'aus-u19-tour-ind-2026',
    matchNo: '3rd unofficial ODI',
    venue: 'Niranjan Shah Stadium, Rajkot, India',
    startTime: '2026-09-24T03:30:00Z',
    toss: '',
    teams: [teams.IND, teams.AUS],
    score: [],
    note: 'Match starts at 03:30 UTC',
    city: 'Rajkot',
    scores: [],
    commentary: []
  }
]

export const series = [
  { id: 'sl-tour-eng-2026', name: 'Sri Lanka tour of England, 2026', host: 'England', format: 'ODI', category: 'International', matches: 3, start: '2026-09-22', end: '2026-10-01', status: 'live' },
  { id: 'ind-tour-jpn-2026', name: 'India tour of Japan, 2026', host: 'Japan', format: 'T20I', category: 'International', matches: 1, start: '2026-09-22', end: '2026-09-22', status: 'completed' },
  { id: 'womens-asian-games-2026', name: "Women's Asian Games, 2026", host: 'Japan', format: 'T20I', category: 'Women', matches: 12, start: '2026-09-15', end: '2026-09-22', status: 'completed' },
  { id: 'quad-t20i-nigeria-2026', name: 'Quadrangular T20I Series in Nigeria, 2026', host: 'Nigeria', format: 'T20I', category: 'International', matches: 8, start: '2026-09-22', end: '2026-09-28', status: 'live' },
  { id: 'north-american-cup-2026', name: 'North American Cup, 2026', host: 'USA', format: 'T20I', category: 'International', matches: 6, start: '2026-09-20', end: '2026-09-27', status: 'live' },
  { id: 'csa-t20-challenge-2026', name: 'CSA T20 Challenge 2026', host: 'South Africa', format: 'T20', category: 'League', matches: 24, start: '2026-09-23', end: '2026-10-15', status: 'upcoming' },
  { id: 'aus-domestic-cup-2026-27', name: 'Australia Domestic One-Day Cup 2026-27', host: 'Australia', format: 'List A', category: 'Domestic', matches: 22, start: '2026-09-18', end: '2026-10-20', status: 'live' },
  { id: 'aus-tour-sa-2026', name: 'Australia tour of South Africa, 2026', host: 'South Africa', format: 'ODI', category: 'International', matches: 5, start: '2026-09-24', end: '2026-10-10', status: 'upcoming' },
  { id: 'wi-tour-ind-2026', name: 'West Indies tour of India, 2026', host: 'India', format: 'T20I', category: 'International', matches: 5, start: '2026-10-06', end: '2026-10-15', status: 'upcoming' },
  { id: 'aus-u19-tour-ind-2026', name: 'Australia U19 tour of India 2026', host: 'India', format: 'ODI', category: 'Domestic', matches: 3, start: '2026-09-18', end: '2026-09-24', status: 'live' },
  { id: 'odisha-t20-2026', name: 'Odisha T20 League 2026', host: 'India', format: 'T20', category: 'Domestic', matches: 15, start: '2026-09-21', end: '2026-10-05', status: 'live' },
  { id: 'ausa-tour-ind-2026', name: 'Australia A tour of India, 2026', host: 'India', format: 'Test', category: 'Domestic', matches: 2, start: '2026-09-22', end: '2026-10-02', status: 'live' }
]

export const leagues = [
  { id: 'ipl', name: 'Indian Premier League', short: 'IPL', country: 'India', format: 'T20', status: 'upcoming', window: 'Mar - May 2027' },
  { id: 'psl', name: 'Pakistan Super League', short: 'PSL', country: 'Pakistan', format: 'T20', status: 'upcoming', window: 'Feb - Mar 2027' },
  { id: 'bbl', name: 'Big Bash League', short: 'BBL', country: 'Australia', format: 'T20', status: 'upcoming', window: 'Dec 2026 - Jan 2027' },
  { id: 'cpl', name: 'Caribbean Premier League', short: 'CPL', country: 'West Indies', format: 'T20', status: 'completed', window: 'Aug - Sep 2026' },
  { id: 'ilt20', name: 'International League T20', short: 'ILT20', country: 'UAE', format: 'T20', status: 'upcoming', window: 'Jan - Feb 2027' },
  { id: 'sat20', name: 'SA20', short: 'SA20', country: 'South Africa', format: 'T20', status: 'upcoming', window: 'Jan - Feb 2027' },
  { id: 'thehundred', name: 'The Hundred', short: 'Hundred', country: 'England', format: '100-ball', status: 'completed', window: 'Aug 2026' },
  { id: 'lpl', name: 'Lanka Premier League', short: 'LPL', country: 'Sri Lanka', format: 'T20', status: 'upcoming', window: 'Dec 2026' },
  { id: 'bpl', name: 'Bangladesh Premier League', short: 'BPL', country: 'Bangladesh', format: 'T20', status: 'upcoming', window: 'Jan 2027' },
  { id: 'mlc', name: 'Major League Cricket', short: 'MLC', country: 'USA', format: 'T20', status: 'completed', window: 'Jul 2026' },
  { id: 'csa-t20', name: 'CSA T20 Challenge', short: 'CSA T20', country: 'South Africa', format: 'T20', status: 'live', window: 'Sep - Oct 2026' },
  { id: 'county', name: 'County Championship', short: 'County', country: 'England', format: 'First-Class', status: 'live', window: 'Apr - Sep 2026' }
]

export const rankings = {
  batting: {
    T20: [
      { rank: 1, player: 'Suryakumar Yadav', team: 'India', rating: 861 },
      { rank: 2, player: 'Phil Salt', team: 'England', rating: 845 },
      { rank: 3, player: 'Babar Azam', team: 'Pakistan', rating: 838 },
      { rank: 4, player: 'Travis Head', team: 'Australia', rating: 812 },
      { rank: 5, player: 'Yashasvi Jaiswal', team: 'India', rating: 798 }
    ],
    ODI: [
      { rank: 1, player: 'Shubman Gill', team: 'India', rating: 892 },
      { rank: 2, player: 'Babar Azam', team: 'Pakistan', rating: 878 },
      { rank: 3, player: 'Rohit Sharma', team: 'India', rating: 856 },
      { rank: 4, player: 'Kane Williamson', team: 'New Zealand', rating: 831 },
      { rank: 5, player: 'Harry Brook', team: 'England', rating: 815 }
    ],
    Test: [
      { rank: 1, player: 'Joe Root', team: 'England', rating: 899 },
      { rank: 2, player: 'Yashasvi Jaiswal', team: 'India', rating: 872 },
      { rank: 3, player: 'Kane Williamson', team: 'New Zealand', rating: 859 },
      { rank: 4, player: 'Steve Smith', team: 'Australia', rating: 841 },
      { rank: 5, player: 'Virat Kohli', team: 'India', rating: 826 }
    ]
  },
  bowling: {
    T20: [
      { rank: 1, player: 'Adil Rashid', team: 'England', rating: 812 },
      { rank: 2, player: 'Wanindu Hasaranga', team: 'Sri Lanka', rating: 798 },
      { rank: 3, player: 'Rashid Khan', team: 'Afghanistan', rating: 789 },
      { rank: 4, player: 'Jasprit Bumrah', team: 'India', rating: 776 },
      { rank: 5, player: 'Arshdeep Singh', team: 'India', rating: 758 }
    ],
    ODI: [
      { rank: 1, player: 'Jasprit Bumrah', team: 'India', rating: 845 },
      { rank: 2, player: 'Josh Hazlewood', team: 'Australia', rating: 821 },
      { rank: 3, player: 'Shaheen Afridi', team: 'Pakistan', rating: 802 },
      { rank: 4, player: 'Marco Jansen', team: 'South Africa', rating: 788 },
      { rank: 5, player: 'Mitchell Starc', team: 'Australia', rating: 771 }
    ],
    Test: [
      { rank: 1, player: 'Jasprit Bumrah', team: 'India', rating: 890 },
      { rank: 2, player: 'Pat Cummins', team: 'Australia', rating: 872 },
      { rank: 3, player: 'Kagiso Rabada', team: 'South Africa', rating: 855 },
      { rank: 4, player: 'Josh Hazlewood', team: 'Australia', rating: 831 },
      { rank: 5, player: 'R Ashwin', team: 'India', rating: 809 }
    ]
  }
}

export const news = [
  { id: 1, title: 'CSK board to meet amid fixing expose', summary: 'A recent expose alleged that a CSK player was providing classified information to a Delhi-based former first-class player.', category: 'IPL', time: '12m ago' },
  { id: 2, title: 'ILT20 auction in Dubai on October 1', summary: 'More than 800 players from 20 countries have registered for the ILT20 Season 5 auction.', category: 'ILT20', time: '1h ago' },
  { id: 3, title: 'India survive Japan scare to clinch 200th T20I win', summary: 'The defending T20 world champions just about got over the line in a truncated five-overs-a-side clash.', category: 'T20I', time: '6h ago' },
  { id: 4, title: 'India smash record 13 sixes to retain Asian Games Gold', summary: 'A total of 216 proved too much for Sri Lanka to chase as they folded for a paltry 69.', category: 'Women', time: '7h ago' },
  { id: 5, title: 'Mark Wood retires from international cricket', summary: 'The England quick, who took 253 wickets, had been beset with injury concerns.', category: 'England', time: '7h ago' },
  { id: 6, title: 'Marco Jansen ready to lead depleted South Africa attack', summary: "Without their usual leaders, it's Jansen's chance to step up against Australia.", category: 'South Africa', time: '2h ago' },
  { id: 7, title: 'Hetmyer rested for India ODIs; Kamil Pooran gets maiden T20I call-up', summary: 'West Indies have also rested Jason Holder for the T20Is between October 6 and 11.', category: 'West Indies', time: '5h ago' },
  { id: 8, title: 'BCB unveils six-team, three-format domestic competition', summary: 'The new structure will bring First-Class, List A and T20 cricket under one competition.', category: 'Bangladesh', time: '8h ago' }
]
