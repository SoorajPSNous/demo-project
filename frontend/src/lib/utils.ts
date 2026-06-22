export function formatMarketCap(value: number): string {
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}T`
  return `$${value.toFixed(0)}B`
}

export function formatNumber(value: number, decimals = 2): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export function getRatingColor(grade: string): string {
  if (grade.startsWith('AAA') || grade.startsWith('AA')) return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30'
  if (grade.startsWith('A')) return 'text-sky-400 bg-sky-400/10 border-sky-400/30'
  if (grade.startsWith('BBB')) return 'text-amber-400 bg-amber-400/10 border-amber-400/30'
  if (grade.startsWith('BB')) return 'text-orange-400 bg-orange-400/10 border-orange-400/30'
  return 'text-red-400 bg-red-400/10 border-red-400/30'
}

export function getEsgColor(score: number): string {
  if (score >= 80) return 'bg-emerald-500'
  if (score >= 70) return 'bg-sky-500'
  if (score >= 60) return 'bg-amber-500'
  return 'bg-orange-500'
}

export function getOutlookColor(outlook: string): string {
  if (outlook === 'Positive') return 'text-emerald-400'
  if (outlook === 'Negative') return 'text-red-400'
  return 'text-slate-400'
}
