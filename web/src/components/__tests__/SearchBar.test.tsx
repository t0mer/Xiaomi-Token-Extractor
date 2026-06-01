import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { SearchBar } from '../SearchBar'

describe('SearchBar', () => {
  it('renders input with placeholder', () => {
    render(<SearchBar value="" onChange={() => {}} />)
    expect(screen.getByPlaceholderText('Search devices…')).toBeInTheDocument()
  })

  it('displays the current value', () => {
    render(<SearchBar value="vacuum" onChange={() => {}} />)
    expect(screen.getByDisplayValue('vacuum')).toBeInTheDocument()
  })

  it('calls onChange with new value when user types', () => {
    const onChange = vi.fn()
    render(<SearchBar value="" onChange={onChange} />)
    fireEvent.change(screen.getByPlaceholderText('Search devices…'), {
      target: { value: 'purifier' },
    })
    expect(onChange).toHaveBeenCalledWith('purifier')
  })
})
