import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('test', 500));
    expect(result.current).toBe('test');
  });

  it('should update value only after the specified delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    // Update the value
    rerender({ value: 'updated', delay: 500 });

    // Should still be initial before time passes
    expect(result.current).toBe('initial');

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });

  it('should reset the timer if value changes before delay expires', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'first', delay: 500 } }
    );

    // Update after 300ms
    act(() => {
      vi.advanceTimersByTime(300);
    });
    rerender({ value: 'second', delay: 500 });

    // Fast-forward another 300ms (total 600ms since first change, but only 300ms since second)
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe('first'); // Still first

    // Finish the last 200ms
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe('second');
  });
});
