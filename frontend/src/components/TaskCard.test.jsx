import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TaskCard from './TaskCard';

describe('TaskCard Component', () => {
  const mockTask = {
    id: 1,
    title: 'Test Task',
    description: 'This is a test',
    status: 'pending'
  };

  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();
  const mockOnUpdateStatus = vi.fn();

  it('renders task details correctly', () => {
    render(
      <TaskCard 
        task={mockTask} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
        onUpdateStatus={mockOnUpdateStatus} 
      />
    );

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('This is a test')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('calls onUpdateStatus when clicking the status transition button', () => {
    render(
      <TaskCard 
        task={mockTask} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
        onUpdateStatus={mockOnUpdateStatus} 
      />
    );

    const moveBtn = screen.getByTitle(/move to in progress/i);
    fireEvent.click(moveBtn);

    expect(mockOnUpdateStatus).toHaveBeenCalledWith(1, 'in_progress');
  });

  it('calls onDelete when delete button in menu is clicked', () => {
    render(
      <TaskCard 
        task={mockTask} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
        onUpdateStatus={mockOnUpdateStatus} 
      />
    );

    // Open menu first
    const menuBtn = screen.getByLabelText(/task actions/i);
    fireEvent.click(menuBtn);

    // Click delete
    const deleteBtn = screen.getByText(/delete task/i);
    fireEvent.click(deleteBtn);

    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });
});
