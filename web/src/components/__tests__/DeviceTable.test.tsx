import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { DeviceTable } from '../DeviceTable'
import type { Device } from '../../types'

const DEVICES: Device[] = [
  { server: 'cn', name: 'Mi Vacuum', id: '123', ble_key: '', token: 'abc12345', model: 'roborock.sweep', ip: '192.168.1.1', mac: 'AA:BB' },
  { server: 'us', name: 'Mi Purifier', id: '456', ble_key: 'bkey99', token: 'def45678', model: 'zhimi.air', ip: '192.168.1.2', mac: 'CC:DD' },
]

describe('DeviceTable', () => {
  it('renders a row for each device', () => {
    render(<DeviceTable devices={DEVICES} />)
    expect(screen.getByText('Mi Vacuum')).toBeInTheDocument()
    expect(screen.getByText('Mi Purifier')).toBeInTheDocument()
  })

  it('renders all column headers', () => {
    render(<DeviceTable devices={DEVICES} />)
    for (const header of ['Server', 'Name', 'Id', 'BLE Key', 'Token', 'Model', 'IP', 'Mac']) {
      expect(screen.getByText(header)).toBeInTheDocument()
    }
  })

  it('renders empty state message when devices array is empty', () => {
    render(<DeviceTable devices={[]} />)
    expect(screen.getByText('No devices found.')).toBeInTheDocument()
  })

  it('renders model and IP values', () => {
    render(<DeviceTable devices={DEVICES} />)
    expect(screen.getByText('roborock.sweep')).toBeInTheDocument()
    expect(screen.getByText('192.168.1.1')).toBeInTheDocument()
  })
})
