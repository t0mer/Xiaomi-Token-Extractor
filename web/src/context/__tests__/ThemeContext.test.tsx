import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { ThemeProvider, useTheme } from '../ThemeContext'

function Consumer() {
  const { theme, toggle } = useTheme()
  return (
    <>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggle}>toggle</button>
    </>
  )
}

beforeEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove('dark', 'light')
})

describe('ThemeProvider', () => {
  it('defaults to dark theme', () => {
    render(<ThemeProvider><Consumer /></ThemeProvider>)
    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
  })

  it('adds dark class to <html> by default', () => {
    render(<ThemeProvider><Consumer /></ThemeProvider>)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('toggles to light on click', () => {
    render(<ThemeProvider><Consumer /></ThemeProvider>)
    fireEvent.click(screen.getByRole('button', { name: 'toggle' }))
    expect(screen.getByTestId('theme')).toHaveTextContent('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('persists theme to localStorage', () => {
    render(<ThemeProvider><Consumer /></ThemeProvider>)
    fireEvent.click(screen.getByRole('button', { name: 'toggle' }))
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('reads initial theme from localStorage', () => {
    localStorage.setItem('theme', 'light')
    render(<ThemeProvider><Consumer /></ThemeProvider>)
    expect(screen.getByTestId('theme')).toHaveTextContent('light')
  })
})
