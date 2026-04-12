import React from 'react';
import { Badge, Button } from './ui';
import { Trash2, ChevronRight, ChevronLeft, Calendar } from 'lucide-react';

const TaskCard = ({ task, onUpdateStatus, onDelete }) => {
  const nextStatus = {
    pending: 'in_progress',
    in_progress: 'completed',
  };

  const prevStatus = {
    in_progress: 'pending',
    completed: 'in_progress',
  };

  return (
    <div className="group relative flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-indigo-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <Badge status={task.status} />
        <button
          onClick={() => onDelete(task.id)}
          className="rounded-lg p-1.5 text-slate-400 opacity-0 transition-all hover:bg-rose-50 hover:text-rose-600 group-hover:opacity-100"
          title="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-base font-bold text-slate-800 line-clamp-2 leading-tight">
          {task.title}
        </h3>
        {task.description && (
          <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
            {task.description}
          </p>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-slate-50 pt-3">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Calendar size={12} />
          {new Date(task.created_at).toLocaleDateString()}
        </div>

        <div className="flex items-center gap-1">
          {prevStatus[task.status] && (
            <Button
              variant="ghost"
              className="h-8 w-8 rounded-full p-0"
              onClick={() => onUpdateStatus(task.id, prevStatus[task.status])}
              title={`Move to ${prevStatus[task.status].replace('_', ' ')}`}
            >
              <ChevronLeft size={16} />
            </Button>
          )}
          {nextStatus[task.status] && (
            <Button
              variant="ghost"
              className="h-8 w-8 rounded-full p-0"
              onClick={() => onUpdateStatus(task.id, nextStatus[task.status])}
              title={`Move to ${nextStatus[task.status].replace('_', ' ')}`}
            >
              <ChevronRight size={16} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
