interface Props {
  value: string
  onChange: (v: string) => void
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none select-none">
        ⌕
      </span>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search devices…"
        className="w-full pl-8 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
    </div>
  )
}
