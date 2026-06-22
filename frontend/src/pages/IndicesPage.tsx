import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { indicesApi } from '../api'
import { RatingBadge } from '../components/RatingBadge'
import { PageHeader, LoadingSpinner } from '../components/ui'
import { formatNumber } from '../lib/utils'

export function IndicesPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const { data: indices, isLoading } = useQuery({
    queryKey: ['indices'],
    queryFn: indicesApi.getAll,
  })

  const activeId = selectedId ?? indices?.[0]?.id

  const { data: constituents } = useQuery({
    queryKey: ['constituents', activeId],
    queryFn: () => indicesApi.getConstituents(activeId!),
    enabled: !!activeId,
  })

  const { data: history } = useQuery({
    queryKey: ['index-history', activeId],
    queryFn: () => indicesApi.getHistory(activeId!),
    enabled: !!activeId,
  })

  const selected = indices?.find((i) => i.id === activeId)

  if (isLoading) return <LoadingSpinner />

  return (
    <div>
      <PageHeader
        title="Index Tracker"
        description="Monitor major indices and their constituent companies"
      />

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {(indices ?? []).map((index) => (
          <button
            key={index.id}
            onClick={() => setSelectedId(index.id)}
            className={`rounded-xl border p-5 text-left transition-colors ${
              activeId === index.id
                ? 'border-gold-500/50 bg-gold-500/5'
                : 'border-navy-700 bg-navy-900 hover:border-navy-600'
            }`}
          >
            <p className="text-xs font-medium text-slate-500">{index.symbol}</p>
            <p className="mt-1 text-sm font-semibold text-white">{index.name}</p>
            <p className="mt-2 text-2xl font-bold text-white">{formatNumber(index.currentValue)}</p>
            <p className={`mt-1 text-sm font-medium ${index.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {index.changePercent >= 0 ? '▲' : '▼'} {Math.abs(index.changePercent)}%
            </p>
          </button>
        ))}
      </div>

      {selected && history && history.length > 0 && (
        <div className="mb-6 rounded-xl border border-navy-700 bg-navy-900 p-5">
          <h3 className="mb-4 text-sm font-semibold text-white">{selected.name} — Historical Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={history}>
              <defs>
                <linearGradient id="indexGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity={0} />
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
              <Area type="monotone" dataKey="value" stroke="#60a5fa" strokeWidth={2} fill="url(#indexGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="rounded-xl border border-navy-700 bg-navy-900">
        <div className="border-b border-navy-700 px-5 py-4">
          <h3 className="text-sm font-semibold text-white">
            {selected?.name} Constituents
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-700 text-left text-xs text-slate-500">
                <th className="px-5 py-3 font-medium">Symbol</th>
                <th className="px-5 py-3 font-medium">Company</th>
                <th className="px-5 py-3 font-medium">Sector</th>
                <th className="px-5 py-3 font-medium">Weight %</th>
                <th className="px-5 py-3 font-medium">Rating</th>
                <th className="px-5 py-3 font-medium">ESG</th>
              </tr>
            </thead>
            <tbody>
              {(constituents ?? []).map((c) => (
                <tr key={c.companyId} className="border-b border-navy-800 transition-colors hover:bg-navy-800/50">
                  <td className="px-5 py-3">
                    <Link to={`/companies/${c.companyId}`} className="font-semibold text-gold-400 hover:underline">
                      {c.symbol}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-white">{c.name}</td>
                  <td className="px-5 py-3 text-slate-400">{c.sector}</td>
                  <td className="px-5 py-3 text-slate-300">{c.weight}%</td>
                  <td className="px-5 py-3">
                    {c.rating ? <RatingBadge grade={c.rating} /> : <span className="text-slate-500">NR</span>}
                  </td>
                  <td className="px-5 py-3 text-slate-300">{c.esgScore ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
