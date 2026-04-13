import { describe, it, expect, vi } from 'vitest';
import taskService from './taskService';
import api from './api';

// Mock the api module
vi.mock('./api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('taskService', () => {
  it('getAll should fetch tasks without search query', async () => {
    const mockTasks = [{ id: 1, title: 'Test Task' }];
    api.get.mockResolvedValueOnce({ data: mockTasks });

    const result = await taskService.getAll();

    expect(api.get).toHaveBeenCalledWith('/tasks', { params: {} });
    expect(result).toEqual(mockTasks);
  });

  it('getAll should fetch tasks with search query', async () => {
    api.get.mockResolvedValueOnce({ data: [] });

    await taskService.getAll('important');

    expect(api.get).toHaveBeenCalledWith('/tasks', { 
      params: { search: 'important' } 
    });
  });

  it('create should post new task data', async () => {
    const newTask = { title: 'New' };
    api.post.mockResolvedValueOnce({ data: { id: 2, ...newTask } });

    const result = await taskService.create(newTask);

    expect(api.post).toHaveBeenCalledWith('/tasks', newTask);
    expect(result.id).toBe(2);
  });

  it('updateStatus should patch only the status field', async () => {
    api.patch.mockResolvedValueOnce({ data: { id: 1, status: 'completed' } });

    await taskService.updateStatus(1, 'completed');

    expect(api.patch).toHaveBeenCalledWith('/tasks/1', { status: 'completed' });
  });
});
