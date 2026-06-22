export interface LoginResponse {
  token: string
  name: string
  email: string
}

export interface DashboardSummary {
  totalCompanies: number
  ratedCompanies: number
  avgEsgScore: number
  sp500Value: number
  sp500Change: number
  sectorBreakdown: SectorBreakdown[]
  topMovers: TopMover[]
  indexTrend: IndexHistoryPoint[]
}

export interface SectorBreakdown {
  sector: string
  count: number
  avgEsg: number
}

export interface TopMover {
  symbol: string
  name: string
  sector: string
  marketCap: number
  rating: string
  esgScore: number
}

export interface IndexHistoryPoint {
  date: string
  value: number
}

export interface CompanyListItem {
  id: number
  symbol: string
  name: string
  sector: string
  country: string
  marketCap: number
  rating: string | null
  outlook: string | null
  esgScore: number | null
}

export interface CompanyDetail {
  id: number
  symbol: string
  name: string
  sector: string
  country: string
  marketCap: number
  description: string
  rating: Rating | null
  esgScore: EsgScore | null
}

export interface Rating {
  grade: string
  outlook: string
  ratedDate: string
  analyst: string
  notes: string
}

export interface EsgScore {
  environmental: number
  social: number
  governance: number
  totalScore: number
  asOfDate: string
}

export interface EsgLeaderboardItem {
  companyId: number
  symbol: string
  name: string
  sector: string
  environmental: number
  social: number
  governance: number
  totalScore: number
}

export interface IndexListItem {
  id: number
  symbol: string
  name: string
  currentValue: number
  changePercent: number
}

export interface IndexConstituent {
  companyId: number
  symbol: string
  name: string
  sector: string
  weight: number
  rating: string | null
  esgScore: number | null
}

export interface WatchlistItem {
  companyId: number
  symbol: string
  name: string
  sector: string
  marketCap: number
  rating: string | null
  esgScore: number | null
  addedAt: string
}
