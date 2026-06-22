import { getEsgColor } from '../lib/utils'

interface EsgBarProps {
  label: string
  value: number
}

export function EsgBar({ label, value }: EsgBarProps) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className="text-slate-400">{label}</span>
        <span className="font-medium text-white">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-navy-700">
        <div
          className={`h-full rounded-full transition-all ${getEsgColor(value)}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}
