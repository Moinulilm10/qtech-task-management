import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import taskService from '../services/taskService';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import { Button } from './ui';
import { Plus, LayoutGrid, List, CheckCircle2, Clock, PlayCircle, Loader2 } from 'lucide-react';
import { cn } from './ui';

const TaskDashboard = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' or 'list'

  const { data: tasks, isLoading, isError } = useQuery({
    queryKey: ['tasks'],
    queryFn: taskService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: taskService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => taskService.updateStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: taskService.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
        <p className="text-slate-500 font-medium">Loading your workspace...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
        <div className="h-16 w-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center">
           <LayoutGrid size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Something went wrong</h2>
        <p className="text-slate-500 max-w-xs">We couldn't reach the server. Please check your connection and try again.</p>
        <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['tasks'] })}>
          Retry Connection
        </Button>
      </div>
    );
  }

  const columns = [
    { id: 'pending', title: 'Pending', icon: <Clock size={16} className="text-amber-500" />, color: 'bg-amber-100/50' },
    { id: 'in_progress', title: 'In Progress', icon: <PlayCircle size={16} className="text-indigo-500" />, color: 'bg-indigo-100/50' },
    { id: 'completed', title: 'Completed', icon: <CheckCircle2 size={16} className="text-emerald-500" />, color: 'bg-emerald-100/50' },
  ];

  const getTasksByStatus = (status) => tasks?.filter(task => task.status === status) || [];

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Workspace
          </h1>
          <p className="text-slate-500 font-medium">
            Manage your daily goals and track progress.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex rounded-lg bg-slate-100 p-1">
            <button
              onClick={() => setViewMode('kanban')}
              className={cn(
                "rounded-md p-1.5 transition-all",
                viewMode === 'kanban' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <LayoutGrid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                "rounded-md p-1.5 transition-all",
                viewMode === 'list' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <List size={20} />
            </button>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="gap-2 shadow-lg shadow-indigo-200">
            <Plus size={18} />
            Add Task
          </Button>
        </div>
      </header>

      {/* Kanban Board */}
      <div className={cn(
        "grid gap-6 transition-all",
        viewMode === 'kanban' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
      )}>
        {columns.map(column => (
          <div key={column.id} className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2 font-bold text-slate-700">
                {column.icon}
                {column.title}
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-slate-100 px-1.5 text-[10px] text-slate-400">
                  {getTasksByStatus(column.id).length}
                </span>
              </div>
            </div>

            <div className={cn(
              "flex flex-col gap-4 rounded-3xl p-2 transition-all min-h-[200px]",
              column.color,
              viewMode === 'list' && "bg-transparent p-0"
            )}>
              {getTasksByStatus(column.id).map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdateStatus={(id, status) => updateStatusMutation.mutate({ id, status })}
                  onDelete={(id) => deleteMutation.mutate(id)}
                />
              ))}

              {getTasksByStatus(column.id).length === 0 && (
                <div className="flex flex-col items-center justify-center p-8 text-center text-slate-400">
                  <p className="text-xs italic font-medium">No tasks here yet.</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => createMutation.mutate(data)}
      />
    </div>
  );
};

export default TaskDashboard;
