import { useMemo, useState, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { SearchBar } from './components/SearchBar'
import { DeviceCards } from './components/DeviceCards'
import { DeviceTable } from './components/DeviceTable'
import { ThemeProvider } from './context/ThemeContext'
import type { Device } from './types'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

function DeviceView() {
  const [devices, setDevices] = useState<Device[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const isMobile = useIsMobile()

  useEffect(() => {
    fetch('/api/v1/devices')
      .then(r =>
        r.ok
          ? r.json()
          : r.json().then((e: { detail?: string }) => Promise.reject(e.detail ?? 'Unknown error'))
      )
      .then((data: Device[]) => setDevices(data))
      .catch((e: unknown) => setError(String(e)))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    if (!search) return devices
    const q = search.toLowerCase()
    return devices.filter(d =>
      Object.values(d).some(v => String(v).toLowerCase().includes(q))
    )
  }, [devices, search])

  return (
    <>
      <Navbar />
      <main className="max-w-screen-xl mx-auto px-4 py-6 space-y-4">
        {loading && (
          <div className="flex justify-center py-20">
            <span className="text-slate-400 dark:text-slate-500 animate-pulse">Loading…</span>
          </div>
        )}
        {error && (
          <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 px-4 py-3 text-sm">
            {error}
          </div>
        )}
        {!loading && !error && (
          <>
            <SearchBar value={search} onChange={setSearch} />
            {isMobile
              ? <DeviceCards devices={filtered} />
              : <DeviceTable devices={filtered} />
            }
          </>
        )}
      </main>
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
        <DeviceView />
      </div>
    </ThemeProvider>
  )
}
