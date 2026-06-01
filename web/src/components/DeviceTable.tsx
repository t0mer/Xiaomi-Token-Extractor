import type { Device } from '../types'
import { CopyCell } from './CopyCell'
import { ServerBadge } from './ServerBadge'

interface Props {
  devices: Device[]
}

export function DeviceTable({ devices }: Props) {
  if (devices.length === 0) {
    return (
      <p className="text-center text-slate-400 dark:text-slate-500 py-12">No devices found.</p>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-50 dark:bg-slate-800 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <tr>
            {['Server', 'Name', 'Id', 'BLE Key', 'Token', 'Model', 'IP', 'Mac'].map(h => (
              <th key={h} className="px-4 py-3 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
          {devices.map((d, i) => (
            <tr
              key={`${d.server}-${d.id}-${i}`}
              className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <td className="px-4 py-3"><ServerBadge server={d.server} /></td>
              <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">{d.name}</td>
              <td className="px-4 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">{d.id}</td>
              <td className="px-4 py-3"><CopyCell value={d.ble_key} /></td>
              <td className="px-4 py-3"><CopyCell value={d.token} /></td>
              <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{d.model}</td>
              <td className="px-4 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">{d.ip}</td>
              <td className="px-4 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">{d.mac}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
