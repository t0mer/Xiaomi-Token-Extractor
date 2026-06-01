import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import App from '../App'

beforeEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove('dark', 'light')
})

describe('App', () => {
  it('shows a loading indicator before data arrives', () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})))
    render(<App />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('renders device names after successful fetch', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([
        { server: 'cn', name: 'Mi Vacuum', id: '1', ble_key: '', token: 'tok', model: 'rob', ip: '1.1.1.1', mac: 'AA' },
      ]),
    }))
    render(<App />)
    await waitFor(() => {
      expect(screen.getAllByText('Mi Vacuum')[0]).toBeInTheDocument()
    })
  })

  it('shows error message on failed fetch', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ detail: 'Login failed' }),
    }))
    render(<App />)
    await waitFor(() => expect(screen.getByText(/Login failed/)).toBeInTheDocument())
  })

  it('renders the navbar title', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    }))
    render(<App />)
    await waitFor(() => expect(screen.getByText('Xiaomi Token Extractor')).toBeInTheDocument())
  })
})
