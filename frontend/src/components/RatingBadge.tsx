import { getRatingColor } from '../lib/utils'

export function RatingBadge({ grade }: { grade: string }) {
  return (
    <span className={`inline-flex rounded-md border px-2 py-0.5 text-xs font-semibold ${getRatingColor(grade)}`}>
      {grade}
    </span>
  )
}
