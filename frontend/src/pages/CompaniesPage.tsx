import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { companiesApi } from '../api'
import { RatingBadge } from '../components/RatingBadge'
import { PageHeader, LoadingSpinner } from '../components/ui'
import { formatMarketCap } from '../lib/utils'

export function CompaniesPage() {
  const [search, setSearch] = useState('')
  const [sector, setSector] = useState('')

  const { data: sectors } = useQuery({
    queryKey: ['sectors'],
    queryFn: companiesApi.getSectors,
  })

  const { data: companies, isLoading } = useQuery({
    queryKey: ['companies', search, sector],
    queryFn: () => companiesApi.search(search || undefined, sector || undefined),
  })

  return (
    <div>
      <PageHeader
        title="Company Explorer"
        description="Search and analyze company profiles, credit ratings, and ESG data"
      />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by symbol or name..."
            className="w-full rounded-lg border border-navy-600 bg-navy-900 py-2.5 pl-10 pr-4 text-white outline-none focus:border-gold-500"
          />
        </div>
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
        <div className="rounded-xl border border-navy-700 bg-navy-900">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-navy-700 text-left text-xs text-slate-500">
                  <th className="px-5 py-3 font-medium">Symbol</th>
                  <th className="px-5 py-3 font-medium">Company</th>
                  <th className="px-5 py-3 font-medium">Sector</th>
                  <th className="px-5 py-3 font-medium">Country</th>
                  <th className="px-5 py-3 font-medium">Market Cap</th>
                  <th className="px-5 py-3 font-medium">Rating</th>
                  <th className="px-5 py-3 font-medium">Outlook</th>
                  <th className="px-5 py-3 font-medium">ESG</th>
                </tr>
              </thead>
              <tbody>
                {(companies ?? []).map((c) => (
                  <tr key={c.id} className="border-b border-navy-800 transition-colors hover:bg-navy-800/50">
                    <td className="px-5 py-3">
                      <Link to={`/companies/${c.id}`} className="font-semibold text-gold-400 hover:underline">
                        {c.symbol}
                      </Link>
                    </td>
                    <td className="px-5 py-3">
                      <Link to={`/companies/${c.id}`} className="text-white hover:underline">
                        {c.name}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-slate-400">{c.sector}</td>
                    <td className="px-5 py-3 text-slate-400">{c.country}</td>
                    <td className="px-5 py-3 text-slate-300">{formatMarketCap(c.marketCap)}</td>
                    <td className="px-5 py-3">
                      {c.rating ? <RatingBadge grade={c.rating} /> : <span className="text-slate-500">NR</span>}
                    </td>
                    <td className="px-5 py-3 text-slate-400">{c.outlook ?? '—'}</td>
                    <td className="px-5 py-3 text-slate-300">{c.esgScore ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
