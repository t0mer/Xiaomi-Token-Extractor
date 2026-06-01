import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { CopyCell } from '../CopyCell'

beforeEach(() => {
  Object.assign(navigator, {
    clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
  })
})

describe('CopyCell', () => {
  it('renders em-dash for empty value', () => {
    render(<CopyCell value="" />)
    expect(screen.getByText('—')).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('renders truncated value with copy button', () => {
    render(<CopyCell value="abcdefghijklmnop" />)
    expect(screen.getByText(/abcdefgh/)).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('copies full value to clipboard on click', async () => {
    render(<CopyCell value="mytoken123" />)
    await act(async () => {
      fireEvent.click(screen.getByRole('button'))
    })
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('mytoken123')
  })

  it('shows checkmark immediately after copy', async () => {
    vi.useFakeTimers()
    render(<CopyCell value="mytoken123" />)
    await act(async () => {
      fireEvent.click(screen.getByRole('button'))
    })
    expect(screen.getByRole('button')).toHaveTextContent('✓')
    vi.useRealTimers()
  })

  it('resets copy button after 2 seconds', async () => {
    vi.useFakeTimers()
    render(<CopyCell value="mytoken123" />)
    await act(async () => {
      fireEvent.click(screen.getByRole('button'))
    })
    act(() => { vi.advanceTimersByTime(2000) })
    expect(screen.getByRole('button')).toHaveTextContent('⎘')
    vi.useRealTimers()
  })
})
