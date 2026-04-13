import React, { useState, useRef, useEffect } from 'react';
import { Badge, Button, cn } from './ui';
import { Trash2, ChevronRight, ChevronLeft, Calendar, MoreVertical, Edit2 } from 'lucide-react';

const TaskCard = ({ task, onUpdateStatus, onDelete, onEdit }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const nextStatus = {
    pending: 'in_progress',
    in_progress: 'completed',
  };

  const prevStatus = {
    in_progress: 'pending',
    completed: 'in_progress',
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="group relative flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-indigo-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <Badge status={task.status} />
        
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "rounded-lg p-1.5 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600",
              isMenuOpen && "bg-slate-100 text-slate-600"
            )}
            aria-label="Task actions"
          >
            <MoreVertical size={18} />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-full z-10 mt-1 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl animate-in fade-in zoom-in-95 duration-100">
              <div className="flex flex-col p-1">
                <button
                  onClick={() => {
                    onEdit(task);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-indigo-600"
                >
                  <Edit2 size={14} />
                  Edit Task
                </button>
                <div className="my-1 h-px bg-slate-100" />
                <button
                  onClick={() => {
                    onDelete(task.id);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50"
                >
                  <Trash2 size={14} />
                  Delete Task
                </button>
              </div>
            </div>
          )}
        </div>
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
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <Calendar size={12} />
          {new Date(task.created_at).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </div>

        <div className="flex items-center gap-1">
          {prevStatus[task.status] && (
            <Button
              variant="ghost"
              className="h-8 w-8 rounded-full p-0 transition-transform active:scale-95"
              onClick={() => onUpdateStatus(task.id, prevStatus[task.status])}
              title={`Move to ${prevStatus[task.status].replace('_', ' ')}`}
            >
              <ChevronLeft size={16} />
            </Button>
          )}
          {nextStatus[task.status] && (
            <Button
              variant="ghost"
              className="h-8 w-8 rounded-full p-0 transition-transform active:scale-95"
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

