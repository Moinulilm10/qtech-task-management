import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  it('renders with initial value', () => {
    render(<SearchBar value="hello" onChange={() => {}} />);
    const input = screen.getByPlaceholderText(/search tasks/i);
    expect(input.value).toBe('hello');
  });

  it('calls onChange when typing', () => {
    const mockOnChange = vi.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);
    
    const input = screen.getByPlaceholderText(/search tasks/i);
    fireEvent.change(input, { target: { value: 'testing' } });

    expect(mockOnChange).toHaveBeenCalled();
  });
});
