export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      {description && <p className="mt-1 text-sm text-slate-400">{description}</p>}
    </div>
  )
}

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold-400 border-t-transparent" />
    </div>
  )
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-navy-700 bg-navy-900 px-6 py-16 text-center">
      <p className="text-slate-400">{message}</p>
    </div>
  )
}
