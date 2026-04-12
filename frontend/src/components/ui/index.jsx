import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge tailwind classes safely.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Button = ({ children, className, variant = "primary", ...props }) => {
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 active:bg-slate-300",
    outline: "border border-slate-300 bg-transparent hover:bg-slate-50 text-slate-700",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-600",
    danger: "bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-all focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const Input = ({ label, error, className, ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-slate-700 ml-1">
          {label}
        </label>
      )}
      <input
        className={cn(
          "flex w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all disabled:cursor-not-allowed disabled:opacity-50 shadow-xs",
          error && "border-rose-500 focus-visible:ring-rose-500/20 focus-visible:border-rose-500",
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-xs font-medium text-rose-500 ml-1">{error}</span>
      )}
    </div>
  );
};

export const TextArea = ({ label, error, className, ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-slate-700 ml-1">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          "flex w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm ring-offset-white placeholder:text-slate-400 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all disabled:cursor-not-allowed disabled:opacity-50 shadow-xs min-h-[100px] resize-none",
          error && "border-rose-500 focus-visible:ring-rose-500/20 focus-visible:border-rose-500",
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-xs font-medium text-rose-500 ml-1">{error}</span>
      )}
    </div>
  );
};

export const Badge = ({ children, status = "pending", className }) => {
  const styles = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    in_progress: "bg-indigo-50 text-indigo-700 border-indigo-200",
    completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };

  const labels = {
    pending: "Pending",
    in_progress: "In Progress",
    completed: "Completed",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold shadow-xs transition-colors",
        styles[status],
        className
      )}
    >
      {children || labels[status]}
    </span>
  );
};
