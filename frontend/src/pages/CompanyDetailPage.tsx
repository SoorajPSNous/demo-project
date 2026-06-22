import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, Star, StarOff } from 'lucide-react'
import { companiesApi, watchlistApi } from '../api'
import { RatingBadge } from '../components/RatingBadge'
import { EsgBar } from '../components/EsgBar'
import { LoadingSpinner } from '../components/ui'
import { formatMarketCap, getOutlookColor } from '../lib/utils'

export function CompanyDetailPage() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()

  const { data: company, isLoading } = useQuery({
    queryKey: ['company', id],
    queryFn: () => companiesApi.getById(Number(id)),
    enabled: !!id,
  })

  const { data: watchlist } = useQuery({
    queryKey: ['watchlist'],
    queryFn: watchlistApi.get,
  })

  const isWatched = watchlist?.some((w) => w.companyId === Number(id))

  const addMutation = useMutation({
    mutationFn: () => watchlistApi.add(Number(id)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['watchlist'] }),
  })

  const removeMutation = useMutation({
    mutationFn: () => watchlistApi.remove(Number(id)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['watchlist'] }),
  })

  if (isLoading) return <LoadingSpinner />
  if (!company) return <p className="text-slate-400">Company not found.</p>

  return (
    <div>
      <Link to="/companies" className="mb-4 inline-flex items-center gap-1 text-sm text-slate-400 hover:text-gold-400">
        <ArrowLeft className="h-4 w-4" /> Back to Companies
      </Link>

      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-white">{company.symbol}</h2>
            {company.rating && <RatingBadge grade={company.rating.grade} />}
          </div>
          <p className="mt-1 text-lg text-slate-300">{company.name}</p>
          <p className="mt-1 text-sm text-slate-500">
            {company.sector} · {company.country} · {formatMarketCap(company.marketCap)}
          </p>
        </div>
        <button
          onClick={() => (isWatched ? removeMutation.mutate() : addMutation.mutate())}
          className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
            isWatched
              ? 'border-gold-500/30 bg-gold-500/10 text-gold-400'
              : 'border-navy-600 bg-navy-900 text-slate-300 hover:border-gold-500/30'
          }`}
        >
          {isWatched ? <StarOff className="h-4 w-4" /> : <Star className="h-4 w-4" />}
          {isWatched ? 'Remove from Watchlist' : 'Add to Watchlist'}
        </button>
      </div>

      <p className="mb-6 max-w-3xl text-slate-400">{company.description}</p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {company.rating && (
          <div className="rounded-xl border border-navy-700 bg-navy-900 p-5">
            <h3 className="mb-4 text-sm font-semibold text-white">Credit Rating</h3>
            <div className="mb-4 flex items-center gap-4">
              <RatingBadge grade={company.rating.grade} />
              <span className={`text-sm font-medium ${getOutlookColor(company.rating.outlook)}`}>
                Outlook: {company.rating.outlook}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Analyst</span>
                <span className="text-slate-300">{company.rating.analyst}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Rated Date</span>
                <span className="text-slate-300">
                  {new Date(company.rating.ratedDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            <p className="mt-4 rounded-lg bg-navy-800 p-3 text-sm text-slate-400">
              {company.rating.notes}
            </p>
          </div>
        )}

        {company.esgScore && (
          <div className="rounded-xl border border-navy-700 bg-navy-900 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">ESG Score</h3>
              <span className="text-2xl font-bold text-gold-400">{company.esgScore.totalScore}</span>
            </div>
            <div className="space-y-4">
              <EsgBar label="Environmental" value={company.esgScore.environmental} />
              <EsgBar label="Social" value={company.esgScore.social} />
              <EsgBar label="Governance" value={company.esgScore.governance} />
            </div>
            <p className="mt-4 text-xs text-slate-500">
              As of {new Date(company.esgScore.asOfDate).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
