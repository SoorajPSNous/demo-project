import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrendingUp, Mail, Lock } from 'lucide-react'
import { authApi } from '../api'
import { useAuth } from '../context/AuthContext'

export function LoginPage() {
  const [email, setEmail] = useState('demo@spglobal.com')
  const [password, setPassword] = useState('Demo@123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await authApi.login(email, password)
      login(res.token, { name: res.name, email: res.email })
      navigate('/')
    } catch {
      setError('Invalid email or password. Try demo@spglobal.com / Demo@123')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 p-12 lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/20">
            <TrendingUp className="h-6 w-6 text-gold-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">MarketPulse</h1>
            <p className="text-sm text-slate-400">Intelligence Hub</p>
          </div>
        </div>

        <div>
          <h2 className="text-4xl font-bold leading-tight text-white">
            Financial intelligence<br />
            <span className="text-gold-400">at your fingertips</span>
          </h2>
          <p className="mt-4 max-w-md text-lg text-slate-400">
            Credit ratings, ESG scores, and index analytics — unified in one powerful platform built for modern analysts.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { label: 'Companies', value: '25+' },
              { label: 'Indices', value: '3' },
              { label: 'ESG Scores', value: '100%' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border border-navy-600 bg-navy-800/50 p-4">
                <p className="text-2xl font-bold text-gold-400">{stat.value}</p>
                <p className="text-xs text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-500">Demo application for S&P Global intelligence workflows</p>
      </div>

      <div className="flex w-full flex-col items-center justify-center bg-navy-950 px-6 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500/20">
                <TrendingUp className="h-5 w-5 text-gold-400" />
              </div>
              <h1 className="text-xl font-bold text-white">MarketPulse</h1>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white">Welcome back</h2>
          <p className="mt-1 text-sm text-slate-400">Sign in to access your intelligence dashboard</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm text-slate-400">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-navy-600 bg-navy-900 py-2.5 pl-10 pr-4 text-white placeholder-slate-500 outline-none focus:border-gold-500"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm text-slate-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-navy-600 bg-navy-900 py-2.5 pl-10 pr-4 text-white placeholder-slate-500 outline-none focus:border-gold-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-gold-500 py-2.5 font-semibold text-navy-950 transition-colors hover:bg-gold-400 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            Demo credentials: demo@spglobal.com / Demo@123
          </p>
        </div>
      </div>
    </div>
  )
}
