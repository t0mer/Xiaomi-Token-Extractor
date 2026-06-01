import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { DeviceCards } from '../DeviceCards'
import type { Device } from '../../types'

const DEVICES: Device[] = [
  { server: 'cn', name: 'Mi Vacuum', id: '123', ble_key: '', token: 'abc12345', model: 'roborock.sweep', ip: '192.168.1.1', mac: 'AA:BB' },
]

describe('DeviceCards', () => {
  it('renders a card for each device', () => {
    render(<DeviceCards devices={DEVICES} />)
    expect(screen.getByText('Mi Vacuum')).toBeInTheDocument()
  })

  it('shows model and IP on the card', () => {
    render(<DeviceCards devices={DEVICES} />)
    expect(screen.getByText('roborock.sweep · 192.168.1.1')).toBeInTheDocument()
  })

  it('renders empty state when devices array is empty', () => {
    render(<DeviceCards devices={[]} />)
    expect(screen.getByText('No devices found.')).toBeInTheDocument()
  })

  it('renders Token label', () => {
    render(<DeviceCards devices={DEVICES} />)
    expect(screen.getByText('Token')).toBeInTheDocument()
  })
})
