import React from "react";

const ToggleUnit = ({ unit, onToggle, isDark = true }) => {
  const isCelsius = unit === "metric";
  return (
    <button
      onClick={onToggle}
      title={`Switch to ${isCelsius ? "Fahrenheit" : "Celsius"}`}
      className={`
        flex items-center gap-1 px-3 py-2 rounded-xl
        border transition-all duration-300
        hover:shadow-lg active:scale-95 font-outfit font-semibold text-sm
        ${isDark
          ? "bg-white/10 hover:bg-white/20 border-white/15 hover:border-sky-400/40 text-white"
          : "bg-white/70 hover:bg-white border-slate-200 hover:border-sky-400/40 text-slate-700"
        }
      `}
    >
      <span className={`transition-all duration-200 ${isCelsius ? "text-sky-400" : isDark ? "text-white/40" : "text-slate-400"}`}>
        °C
      </span>
      <span className={isDark ? "text-white/30 mx-0.5" : "text-slate-300 mx-0.5"}>/</span>
      <span className={`transition-all duration-200 ${!isCelsius ? "text-sky-400" : isDark ? "text-white/40" : "text-slate-400"}`}>
        °F
      </span>
    </button>
  );
};

export default ToggleUnit;
