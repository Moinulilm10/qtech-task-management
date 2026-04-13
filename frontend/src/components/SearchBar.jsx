import React from "react";
import { Search, X, Loader2 } from "lucide-react";
import { Input } from "./ui";

/**
 * A reusable SearchBar component that handles focus preservation
 * and display of loading/clear states.
 */
const SearchBar = ({
  value,
  onChange,
  onClear,
  isFetching,
  placeholder = "Search tasks...",
  className,
  containerClassName,
}) => {
  return (
    <div className={containerClassName}>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
        leftIcon={<Search size={18} />}
        rightIcon={
          <div className="flex items-center gap-1">
            {isFetching && value && (
              <Loader2 size={14} className="animate-spin text-indigo-500 mr-1" />
            )}
            {value && (
              <button
                onMouseDown={(e) => {
                  // Prevent blur so input keeps focus when clicking clear
                  e.preventDefault();
                  onClear?.();
                }}
                className="p-0.5 rounded-full hover:bg-slate-100 text-slate-400 transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
        }
      />
    </div>
  );
};

export default SearchBar;
