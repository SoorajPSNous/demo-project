import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Building2,
  Leaf,
  LineChart,
  Star,
  LogOut,
  TrendingUp,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/companies', icon: Building2, label: 'Companies' },
  { to: '/esg', icon: Leaf, label: 'ESG Insights' },
  { to: '/indices', icon: LineChart, label: 'Indices' },
  { to: '/watchlist', icon: Star, label: 'Watchlist' },
]

export function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-navy-700 bg-navy-900">
      <div className="border-b border-navy-700 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500/20">
            <TrendingUp className="h-5 w-5 text-gold-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">MarketPulse</h1>
            <p className="text-xs text-slate-400">Intelligence Hub</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-gold-500/15 text-gold-400'
                  : 'text-slate-400 hover:bg-navy-800 hover:text-slate-200'
              }`
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-navy-700 p-4">
        <div className="mb-3 px-2">
          <p className="text-sm font-medium text-white">{user?.name}</p>
          <p className="text-xs text-slate-500">{user?.email}</p>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-navy-800 hover:text-red-400"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
