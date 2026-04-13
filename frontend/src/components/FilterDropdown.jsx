import React, { useState, useRef, useEffect } from "react";
import {
  Filter,
  Check,
  ChevronDown,
  Clock,
  PlayCircle,
  CheckCircle2,
  LayoutGrid,
} from "lucide-react";
import { cn } from "./ui";

/**
 * A modern, animated custom dropdown for status filtering.
 */
const FilterDropdown = ({ value, onChange, options, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption =
    options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEsc = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  const getIcon = (val) => {
    switch (val) {
      case "all":
        return <LayoutGrid size={16} />;
      case "pending":
        return <Clock size={16} className="text-amber-500" />;
      case "in_progress":
        return <PlayCircle size={16} className="text-indigo-500" />;
      case "completed":
        return <CheckCircle2 size={16} className="text-emerald-500" />;
      default:
        return <Filter size={16} />;
    }
  };

  return (
    <div
      className={cn("relative w-full sm:w-auto", className)}
      ref={dropdownRef}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full sm:w-44 h-10 px-3 flex items-center justify-between gap-2.5 rounded-xl border bg-white text-sm font-semibold transition-all shadow-xs cursor-pointer select-none",
          isOpen
            ? "border-indigo-500 ring-4 ring-indigo-500/10"
            : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]",
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="text-slate-400 shrink-0">{getIcon(value)}</div>
          <span className="truncate">{selectedOption.label}</span>
        </div>
        <ChevronDown
          size={16}
          className={cn(
            "text-slate-400 transition-transform duration-300",
            isOpen && "rotate-180 text-indigo-500",
          )}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={cn(
          "absolute top-full left-0 sm:left-auto sm:right-0 mt-2 z-50 w-full sm:w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md p-1.5 shadow-2xl transition-all duration-300 origin-top transform-gpu",
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none",
        )}
        role="listbox"
      >
        <div className="text-[10px] font-black text-slate-400 px-3.5 py-2 uppercase tracking-widest border-b border-slate-50 mb-1">
          Perspective
        </div>
        <div className="flex flex-col gap-0.5">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={cn(
                "w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer group",
                value === option.value
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100/50"
                  : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 active:bg-indigo-100",
              )}
              role="option"
              aria-selected={value === option.value}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={cn(
                    "transition-colors",
                    value === option.value
                      ? "text-white"
                      : "text-slate-400 group-hover:text-indigo-500",
                  )}
                >
                  {getIcon(option.value)}
                </div>
                {option.label}
              </div>
              {value === option.value && (
                <Check size={16} className="text-white" strokeWidth={3} />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;
