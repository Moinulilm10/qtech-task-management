import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  CheckCircle2,
  Clock,
  LayoutGrid,
  List,
  Loader2,
  PlayCircle,
  Plus,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import taskService from "../services/taskService";
import FilterDropdown from "./FilterDropdown";
import SearchBar from "./SearchBar";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import { Button, cn } from "./ui";

const TaskDashboard = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("kanban");
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const debouncedSearchQuery = useDebounce(searchQuery, 400);

  const {
    data: tasks,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["tasks", debouncedSearchQuery],
    queryFn: () => taskService.getAll(debouncedSearchQuery),
    placeholderData: keepPreviousData,
  });

  const createMutation = useMutation({
    mutationFn: taskService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsModalOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => taskService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setEditingTask(null);
      setIsModalOpen(false);
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => taskService.updateStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: taskService.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleFormSubmit = (data) => {
    if (editingTask) {
      updateMutation.mutate({ id: editingTask.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const filterOptions = [
    { value: "all", label: "All Tasks" },
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  const columns = [
    {
      id: "pending",
      title: "Pending",
      icon: <Clock size={16} className="text-amber-500" />,
      color: "bg-amber-100/50",
    },
    {
      id: "in_progress",
      title: "In Progress",
      icon: <PlayCircle size={16} className="text-indigo-500" />,
      color: "bg-indigo-100/50",
    },
    {
      id: "completed",
      title: "Completed",
      icon: <CheckCircle2 size={16} className="text-emerald-500" />,
      color: "bg-emerald-100/50",
    },
  ];

  const getTasksByStatus = (status) =>
    tasks?.filter((task) => task.status === status) || [];

  const displayColumns =
    filterStatus === "all"
      ? viewMode === "list"
        ? [...columns].sort(
            (a, b) =>
              getTasksByStatus(b.id).length - getTasksByStatus(a.id).length,
          )
        : columns
      : columns.filter((col) => col.id === filterStatus);

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

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <SearchBar
            value={searchQuery}
            onChange={(e) => {
              if (e.target.value.length <= 100) {
                setSearchQuery(e.target.value);
              }
            }}
            onClear={() => setSearchQuery("")}
            isFetching={isFetching}
            containerClassName="w-full lg:w-72"
            className="h-10"
          />

          <FilterDropdown
            value={filterStatus}
            onChange={setFilterStatus}
            options={filterOptions}
          />

          <div className="flex items-center gap-3">
            <div className="flex rounded-lg bg-slate-100 p-1">
              <button
                onClick={() => setViewMode("kanban")}
                className={cn(
                  "rounded-md p-1.5 transition-all text-sm font-medium flex items-center gap-2",
                  viewMode === "kanban"
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700",
                )}
              >
                <LayoutGrid size={18} />
                <span className="hidden sm:inline">Kanban</span>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "rounded-md p-1.5 transition-all text-sm font-medium flex items-center gap-2",
                  viewMode === "list"
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700",
                )}
              >
                <List size={18} />
                <span className="hidden sm:inline">List</span>
              </button>
            </div>
            <Button
              onClick={handleOpenCreateModal}
              className="gap-2 shadow-lg shadow-indigo-200 h-10"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Add Task</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>
        </div>
      </header>
      {/* Kanban Board / Empty State / Loading / Error */}
      {isLoading ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
          <Loader2 className="animate-spin text-indigo-600" size={40} />
          <p className="text-slate-500 font-medium">
            Loading your workspace...
          </p>
        </div>
      ) : isError ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
          <div className="h-16 w-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center">
            <LayoutGrid size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Something went wrong
          </h2>
          <p className="text-slate-500 max-w-xs">
            We couldn't reach the server. Please check your connection and try
            again.
          </p>
          <Button
            onClick={() =>
              queryClient.invalidateQueries({ queryKey: ["tasks"] })
            }
          >
            Retry Connection
          </Button>
        </div>
      ) : debouncedSearchQuery && tasks?.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 text-center p-8 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
          <div className="h-16 w-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center">
            <Search size={32} />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-slate-900">No tasks found</h2>
            <p className="text-slate-500 max-w-xs">
              We couldn't find any tasks matching "{debouncedSearchQuery}". Try
              a different term.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setSearchQuery("")}
            className="mt-2"
          >
            Clear Search
          </Button>
        </div>
      ) : (
        <div
          className={cn(
            "grid gap-6 transition-all duration-500 ease-in-out",
            filterStatus !== "all" && viewMode === "kanban"
              ? "flex flex-col items-center"
              : viewMode === "kanban"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1",
          )}
        >
          {displayColumns.map((column) => (
            <div
              key={column.id}
              className={cn(
                "flex flex-col gap-4 animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-500",
                filterStatus !== "all" &&
                  viewMode === "kanban" &&
                  "w-full max-w-lg lg:max-w-md",
              )}
            >
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2 font-bold text-slate-700">
                  {column.icon}
                  {column.title}
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-slate-100 px-1.5 text-[10px] text-slate-400">
                    {getTasksByStatus(column.id).length}
                  </span>
                </div>
              </div>

              <div
                className={cn(
                  "flex flex-col gap-4 rounded-3xl p-2 transition-all min-h-[200px]",
                  column.color,
                  viewMode === "list" && "bg-transparent p-0",
                )}
              >
                {getTasksByStatus(column.id).map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onUpdateStatus={(id, status) =>
                      updateStatusMutation.mutate({ id, status })
                    }
                    onDelete={(id) => deleteMutation.mutate(id)}
                    onEdit={handleOpenEditModal}
                  />
                ))}

                {getTasksByStatus(column.id).length === 0 && (
                  <div className="flex flex-col items-center justify-center p-8 text-center text-slate-400">
                    <p className="text-xs italic font-medium">
                      No tasks here yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        initialData={editingTask}
      />
    </div>
  );
};

export default TaskDashboard;
