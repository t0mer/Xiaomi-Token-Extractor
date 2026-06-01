import { useState } from 'react'

interface Props {
  value: string
}

export function CopyCell({ value }: Props) {
  const [copied, setCopied] = useState(false)

  if (!value) {
    return <span className="text-slate-400 dark:text-slate-600">—</span>
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-1.5">
      <code className="font-mono text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded truncate max-w-[110px]">
        {value.slice(0, 8)}…
      </code>
      <button
        onClick={handleCopy}
        className="text-orange-500 hover:text-orange-400 transition-colors leading-none"
        title={copied ? 'Copied!' : 'Copy to clipboard'}
      >
        {copied ? '✓' : '⎘'}
      </button>
    </div>
  )
}
