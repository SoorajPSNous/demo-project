import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Trash2, Plus, Search, Check } from 'lucide-react'
import { companiesApi, watchlistApi } from '../api'
import { RatingBadge } from '../components/RatingBadge'
import { PageHeader, LoadingSpinner, EmptyState } from '../components/ui'
import { formatMarketCap } from '../lib/utils'

export function WatchlistPage() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [addedId, setAddedId] = useState<number | null>(null)

  const { data: items, isLoading } = useQuery({
    queryKey: ['watchlist'],
    queryFn: watchlistApi.get,
  })

  const { data: companies, isFetching: searching } = useQuery({
    queryKey: ['companies', search],
    queryFn: () => companiesApi.search(search || undefined),
    enabled: search.trim().length >= 1,
  })

  const watchedIds = new Set(items?.map((i) => i.companyId) ?? [])
  const addableCompanies = (companies ?? []).filter((c) => !watchedIds.has(c.id))

  const removeMutation = useMutation({
    mutationFn: (companyId: number) => watchlistApi.remove(companyId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['watchlist'] }),
  })

  const addMutation = useMutation({
    mutationFn: (companyId: number) => watchlistApi.add(companyId),
    onSuccess: (_, companyId) => {
      queryClient.invalidateQueries({ queryKey: ['watchlist'] })
      setAddedId(companyId)
      setTimeout(() => setAddedId(null), 2000)
    },
  })

  const handleAdd = (companyId: number) => {
    if (!addMutation.isPending) addMutation.mutate(companyId)
  }

  return (
    <div>
      <PageHeader
        title="Watchlist"
        description="Track companies you're monitoring for rating and ESG changes"
      />

      <div className="mb-6 rounded-xl border border-navy-700 bg-navy-900 p-5">
        <div className="mb-3 flex items-center gap-2">
          <Plus className="h-4 w-4 text-gold-400" />
          <h3 className="text-sm font-semibold text-white">Add to Watchlist</h3>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by symbol or company name..."
            className="w-full rounded-lg border border-navy-600 bg-navy-950 py-2.5 pl-10 pr-4 text-white outline-none focus:border-gold-500"
          />
        </div>

        {search.trim().length >= 1 && (
          <div className="mt-3 overflow-hidden rounded-lg border border-navy-700">
            {searching ? (
              <p className="px-4 py-3 text-sm text-slate-500">Searching...</p>
            ) : addableCompanies.length === 0 ? (
              <p className="px-4 py-3 text-sm text-slate-500">
                {companies?.length
                  ? 'All matching companies are already on your watchlist.'
                  : 'No companies found. Try a different search.'}
              </p>
            ) : (
              <ul className="max-h-64 divide-y divide-navy-800 overflow-y-auto">
                {addableCompanies.map((company) => (
                  <li
                    key={company.id}
                    className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-navy-800/50"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gold-400">{company.symbol}</span>
                        {company.rating && <RatingBadge grade={company.rating} />}
                      </div>
                      <p className="truncate text-sm text-slate-300">{company.name}</p>
                      <p className="text-xs text-slate-500">
                        {company.sector} · {formatMarketCap(company.marketCap)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleAdd(company.id)}
                      disabled={addMutation.isPending}
                      className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-50 ${
                        addedId === company.id
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : 'bg-gold-500/15 text-gold-400 hover:bg-gold-500/25'
                      }`}
                    >
                      {addedId === company.id ? (
                        <>
                          <Check className="h-3.5 w-3.5" /> Added
                        </>
                      ) : (
                        <>
                          <Plus className="h-3.5 w-3.5" /> Add
                        </>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {search.trim().length === 0 && (
          <p className="mt-2 text-xs text-slate-500">
            Type a symbol or name above to find companies to add.
          </p>
        )}
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : !items?.length ? (
        <EmptyState message="Your watchlist is empty. Search above to add your first company." />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.companyId}
              className="rounded-xl border border-navy-700 bg-navy-900 p-5 transition-colors hover:border-navy-600"
            >
              <div className="flex items-start justify-between">
                <div>
                  <Link
                    to={`/companies/${item.companyId}`}
                    className="text-lg font-bold text-gold-400 hover:underline"
                  >
                    {item.symbol}
                  </Link>
                  <p className="mt-0.5 text-sm text-white">{item.name}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {item.sector} · {formatMarketCap(item.marketCap)}
                  </p>
                </div>
                <button
                  onClick={() => removeMutation.mutate(item.companyId)}
                  className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
                  title="Remove from watchlist"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-4 flex items-center gap-3">
                {item.rating ? (
                  <RatingBadge grade={item.rating} />
                ) : (
                  <span className="text-xs text-slate-500">No rating</span>
                )}
                {item.esgScore != null && (
                  <span className="text-xs text-slate-400">
                    ESG: <span className="font-semibold text-white">{item.esgScore}</span>
                  </span>
                )}
              </div>
              <p className="mt-3 text-xs text-slate-600">
                Added {new Date(item.addedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
