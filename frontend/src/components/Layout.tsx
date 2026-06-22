import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-navy-950">
      <Sidebar />
      <main className="ml-64 min-h-screen">
        <div className="px-8 py-6">{children}</div>
      </main>
    </div>
  )
}
