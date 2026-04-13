import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TaskDashboard from './TaskDashboard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import taskService from '../services/taskService';

// Mock the service
vi.mock('../services/taskService', () => ({
  default: {
    getAll: vi.fn(),
  },
}));

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe('TaskDashboard Component', () => {
  let queryClient;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    vi.clearAllMocks();
  });

  it('shows loading state initially', async () => {
    taskService.getAll.mockReturnValue(new Promise(() => {})); // Never resolves

    render(
      <QueryClientProvider client={queryClient}>
        <TaskDashboard />
      </QueryClientProvider>
    );

    expect(screen.getByText(/loading your workspace/i)).toBeInTheDocument();
  });

  it('renders tasks after successful fetch', async () => {
    const mockTasks = [
      { id: 1, title: 'Dashboard Task', status: 'pending', created_at: new Date().toISOString() }
    ];
    taskService.getAll.mockResolvedValue(mockTasks);

    render(
      <QueryClientProvider client={queryClient}>
        <TaskDashboard />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Dashboard Task')).toBeInTheDocument();
    });
  });

  it('shows error state on failure', async () => {
    taskService.getAll.mockRejectedValue(new Error('Fetch failed'));

    render(
      <QueryClientProvider client={queryClient}>
        <TaskDashboard />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
});
