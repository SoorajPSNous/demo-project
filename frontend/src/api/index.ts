import api from './client'
import type {
  CompanyDetail,
  CompanyListItem,
  DashboardSummary,
  EsgLeaderboardItem,
  IndexConstituent,
  IndexHistoryPoint,
  IndexListItem,
  LoginResponse,
  WatchlistItem,
} from './types'

export const authApi = {
  login: (email: string, password: string) =>
    api.post<LoginResponse>('/auth/login', { email, password }).then((r) => r.data),
}

export const dashboardApi = {
  getSummary: () => api.get<DashboardSummary>('/dashboard/summary').then((r) => r.data),
}

export const companiesApi = {
  search: (search?: string, sector?: string) =>
    api
      .get<CompanyListItem[]>('/companies', { params: { search, sector } })
      .then((r) => r.data),
  getSectors: () => api.get<string[]>('/companies/sectors').then((r) => r.data),
  getById: (id: number) => api.get<CompanyDetail>(`/companies/${id}`).then((r) => r.data),
}

export const esgApi = {
  getLeaderboard: (sector?: string) =>
    api.get<EsgLeaderboardItem[]>('/esg/leaderboard', { params: { sector } }).then((r) => r.data),
}

export const indicesApi = {
  getAll: () => api.get<IndexListItem[]>('/indices').then((r) => r.data),
  getConstituents: (id: number) =>
    api.get<IndexConstituent[]>(`/indices/${id}/constituents`).then((r) => r.data),
  getHistory: (id: number) =>
    api.get<IndexHistoryPoint[]>(`/indices/${id}/history`).then((r) => r.data),
}

export const watchlistApi = {
  get: () => api.get<WatchlistItem[]>('/watchlist').then((r) => r.data),
  add: (companyId: number) => api.post('/watchlist', { companyId }),
  remove: (companyId: number) => api.delete(`/watchlist/${companyId}`),
}
