import React from "react";
import { Filter } from "lucide-react";
import { cn } from "./ui";

const FilterDropdown = ({ value, onChange, options, className }) => {
  return (
    <div className={cn("relative group w-full sm:w-auto", className)}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none">
        <Filter size={16} />
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full sm:w-40 h-10 pl-9 pr-8 appearance-none rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-xs cursor-pointer"
        aria-label="Filter tasks"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          className="w-4 h-4 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default FilterDropdown;
