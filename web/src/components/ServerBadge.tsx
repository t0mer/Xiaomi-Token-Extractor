const COLOURS: Record<string, string> = {
  cn: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  us: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  de: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  ru: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  tw: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  sg: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300',
  in: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  i2: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
}

const FALLBACK = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'

interface Props {
  server: string
}

export function ServerBadge({ server }: Props) {
  const cls = COLOURS[server] ?? FALLBACK
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${cls}`}>
      {server}
    </span>
  )
}
