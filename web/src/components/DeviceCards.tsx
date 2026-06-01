import type { Device } from '../types'
import { CopyCell } from './CopyCell'
import { ServerBadge } from './ServerBadge'

interface Props {
  devices: Device[]
}

export function DeviceCards({ devices }: Props) {
  if (devices.length === 0) {
    return (
      <p className="text-center text-slate-400 dark:text-slate-500 py-12">No devices found.</p>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {devices.map((d, i) => (
        <div
          key={`${d.server}-${d.id}-${i}`}
          className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-slate-900 dark:text-slate-100">{d.name}</span>
            <ServerBadge server={d.server} />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            {d.model} · {d.ip}
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 dark:text-slate-500 w-12 shrink-0">Token</span>
              <CopyCell value={d.token} />
            </div>
            {d.ble_key && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 dark:text-slate-500 w-12 shrink-0">BLE</span>
                <CopyCell value={d.ble_key} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
