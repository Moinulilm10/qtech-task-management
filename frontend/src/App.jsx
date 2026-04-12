import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TaskDashboard from './components/TaskDashboard';
import { CheckSquare } from 'lucide-react';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
        {/* Navigation / Header */}
        <nav className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                  <CheckSquare size={20} />
                </div>
                <span className="text-xl font-black tracking-tight text-slate-900">
                  Priority.
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                  System Online
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <TaskDashboard />
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-slate-50 py-10">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-medium text-slate-400">
              © {new Date().getFullYear()} Priority Task Management. Built for high-performance teams.
            </p>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;
