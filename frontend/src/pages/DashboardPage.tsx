import { useQuery } from '@tanstack/react-query'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { Building2, Shield, Leaf, TrendingUp } from 'lucide-react'
import { dashboardApi } from '../api'
import { StatCard } from '../components/StatCard'
import { RatingBadge } from '../components/RatingBadge'
import { PageHeader, LoadingSpinner } from '../components/ui'
import { formatMarketCap, formatNumber } from '../lib/utils'

const SECTOR_COLORS = ['#d4a853', '#60a5fa', '#34d399', '#f472b6', '#a78bfa', '#fb923c']

export function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: dashboardApi.getSummary,
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Real-time overview of ratings, ESG performance, and market indices"
      />

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Companies"
          value={String(data?.totalCompanies ?? 0)}
          subtitle="Across all sectors"
          icon={Building2}
        />
        <StatCard
          title="Credit Rated"
          value={String(data?.ratedCompanies ?? 0)}
          subtitle="With active ratings"
          icon={Shield}
        />
        <StatCard
          title="Avg ESG Score"
          value={String(data?.avgEsgScore ?? 0)}
          subtitle="Portfolio average"
          icon={Leaf}
        />
        <StatCard
          title="S&P 500"
          value={formatNumber(data?.sp500Value ?? 0)}
          icon={TrendingUp}
          trend={{
            value: `${data?.sp500Change ?? 0}% today`,
            positive: (data?.sp500Change ?? 0) >= 0,
          }}
        />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-xl border border-navy-700 bg-navy-900 p-5 xl:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-white">S&P 500 — 90 Day Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={data?.indexTrend ?? []}>
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d4a853" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#d4a853" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tick={{ fill: '#64748b', fontSize: 11 }}
                tickFormatter={(v: string) => v.slice(5)}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#64748b', fontSize: 11 }}
                domain={['auto', 'auto']}
                axisLine={false}
                tickLine={false}
                width={55}
              />
              <Tooltip
                contentStyle={{
                  background: '#162033',
                  border: '1px solid #2a3f5f',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#d4a853"
                strokeWidth={2}
                fill="url(#goldGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-navy-700 bg-navy-900 p-5">
          <h3 className="mb-4 text-sm font-semibold text-white">Sector Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data?.sectorBreakdown ?? []}
                dataKey="count"
                nameKey="sector"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
              >
                {(data?.sectorBreakdown ?? []).map((_, i) => (
                  <Cell key={i} fill={SECTOR_COLORS[i % SECTOR_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: '#162033',
                  border: '1px solid #2a3f5f',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5">
            {(data?.sectorBreakdown ?? []).map((s, i) => (
              <div key={s.sector} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: SECTOR_COLORS[i % SECTOR_COLORS.length] }}
                  />
                  <span className="text-slate-400">{s.sector}</span>
                </div>
                <span className="text-slate-300">{s.count} cos · ESG {s.avgEsg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-navy-700 bg-navy-900">
        <div className="border-b border-navy-700 px-5 py-4">
          <h3 className="text-sm font-semibold text-white">Top Companies by Market Cap</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-700 text-left text-xs text-slate-500">
                <th className="px-5 py-3 font-medium">Symbol</th>
                <th className="px-5 py-3 font-medium">Company</th>
                <th className="px-5 py-3 font-medium">Sector</th>
                <th className="px-5 py-3 font-medium">Market Cap</th>
                <th className="px-5 py-3 font-medium">Rating</th>
                <th className="px-5 py-3 font-medium">ESG</th>
              </tr>
            </thead>
            <tbody>
              {(data?.topMovers ?? []).map((c) => (
                <tr key={c.symbol} className="border-b border-navy-800 transition-colors hover:bg-navy-800/50">
                  <td className="px-5 py-3 font-semibold text-gold-400">{c.symbol}</td>
                  <td className="px-5 py-3 text-white">{c.name}</td>
                  <td className="px-5 py-3 text-slate-400">{c.sector}</td>
                  <td className="px-5 py-3 text-slate-300">{formatMarketCap(c.marketCap)}</td>
                  <td className="px-5 py-3"><RatingBadge grade={c.rating} /></td>
                  <td className="px-5 py-3 text-slate-300">{c.esgScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
