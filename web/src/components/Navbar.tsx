import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-sm font-bold select-none">小</span>
        </div>
        <span className="font-bold text-slate-900 dark:text-slate-100 text-lg tracking-tight">
          Xiaomi Token Extractor
        </span>
      </div>
      <ThemeToggle />
    </nav>
  )
}
