import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  subtitle?: string
  icon: LucideIcon
  trend?: { value: string; positive: boolean }
}

export function StatCard({ title, value, subtitle, icon: Icon, trend }: StatCardProps) {
  return (
    <div className="rounded-xl border border-navy-700 bg-navy-900 p-5 transition-colors hover:border-navy-600">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400">{title}</p>
          <p className="mt-1 text-2xl font-bold text-white">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500/10">
          <Icon className="h-5 w-5 text-gold-400" />
        </div>
      </div>
      {trend && (
        <p className={`mt-3 text-sm font-medium ${trend.positive ? 'text-emerald-400' : 'text-red-400'}`}>
          {trend.positive ? '▲' : '▼'} {trend.value}
        </p>
      )}
    </div>
  )
}
