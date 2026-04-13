import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Automatically clean up DOM after each test
afterEach(() => {
  cleanup();
});

// Mocking window.scrollTo since jsdom doesn't implement it
Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true });
