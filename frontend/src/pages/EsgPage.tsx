import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { esgApi, companiesApi } from '../api'
import { PageHeader, LoadingSpinner } from '../components/ui'
import { getEsgColor } from '../lib/utils'

export function EsgPage() {
  const [sector, setSector] = useState('')

  const { data: sectors } = useQuery({
    queryKey: ['sectors'],
    queryFn: companiesApi.getSectors,
  })

  const { data: leaderboard, isLoading } = useQuery({
    queryKey: ['esg', sector],
    queryFn: () => esgApi.getLeaderboard(sector || undefined),
  })

  const chartData = (leaderboard ?? []).slice(0, 8).map((item) => ({
    name: item.symbol,
    Environmental: item.environmental,
    Social: item.social,
    Governance: item.governance,
  }))

  return (
    <div>
      <PageHeader
        title="ESG Insights"
        description="Environmental, Social, and Governance performance leaderboard"
      />

      <div className="mb-6">
        <select
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          className="rounded-lg border border-navy-600 bg-navy-900 px-4 py-2.5 text-white outline-none focus:border-gold-500"
        >
          <option value="">All Sectors</option>
          {(sectors ?? []).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="mb-6 rounded-xl border border-navy-700 bg-navy-900 p-5">
            <h3 className="mb-4 text-sm font-semibold text-white">ESG Breakdown — Top 8</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} barGap={2}>
                <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} width={35} />
                <Tooltip
                  contentStyle={{
                    background: '#162033',
                    border: '1px solid #2a3f5f',
                    borderRadius: '8px',
                    color: '#e2e8f0',
                  }}
                />
                <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
                <Bar dataKey="Environmental" fill="#34d399" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Social" fill="#60a5fa" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Governance" fill="#d4a853" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl border border-navy-700 bg-navy-900">
            <div className="border-b border-navy-700 px-5 py-4">
              <h3 className="text-sm font-semibold text-white">ESG Leaderboard</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-navy-700 text-left text-xs text-slate-500">
                    <th className="px-5 py-3 font-medium">Rank</th>
                    <th className="px-5 py-3 font-medium">Symbol</th>
                    <th className="px-5 py-3 font-medium">Company</th>
                    <th className="px-5 py-3 font-medium">Sector</th>
                    <th className="px-5 py-3 font-medium">E</th>
                    <th className="px-5 py-3 font-medium">S</th>
                    <th className="px-5 py-3 font-medium">G</th>
                    <th className="px-5 py-3 font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {(leaderboard ?? []).map((item, i) => (
                    <tr key={item.companyId} className="border-b border-navy-800 transition-colors hover:bg-navy-800/50">
                      <td className="px-5 py-3 text-slate-500">#{i + 1}</td>
                      <td className="px-5 py-3">
                        <Link to={`/companies/${item.companyId}`} className="font-semibold text-gold-400 hover:underline">
                          {item.symbol}
                        </Link>
                      </td>
                      <td className="px-5 py-3 text-white">{item.name}</td>
                      <td className="px-5 py-3 text-slate-400">{item.sector}</td>
                      <td className="px-5 py-3 text-emerald-400">{item.environmental}</td>
                      <td className="px-5 py-3 text-sky-400">{item.social}</td>
                      <td className="px-5 py-3 text-gold-400">{item.governance}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold text-white ${getEsgColor(item.totalScore)}`}>
                          {item.totalScore}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
