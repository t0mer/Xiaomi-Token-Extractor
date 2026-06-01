import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ServerBadge } from '../ServerBadge'

describe('ServerBadge', () => {
  it('renders the server name', () => {
    render(<ServerBadge server="cn" />)
    expect(screen.getByText('cn')).toBeInTheDocument()
  })

  it('renders without crashing for unknown server', () => {
    render(<ServerBadge server="xx" />)
    expect(screen.getByText('xx')).toBeInTheDocument()
  })

  it('applies a colour class for cn', () => {
    render(<ServerBadge server="cn" />)
    const badge = screen.getByText('cn')
    expect(badge.className).toMatch(/blue/)
  })

  it('applies a colour class for us', () => {
    render(<ServerBadge server="us" />)
    const badge = screen.getByText('us')
    expect(badge.className).toMatch(/green/)
  })
})
