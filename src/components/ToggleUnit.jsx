import React from "react";

const ToggleUnit = ({ unit, onToggle }) => {
  const isCelsius = unit === "metric";

  return (
    <button
      onClick={onToggle}
      title={`Switch to ${isCelsius ? "Fahrenheit" : "Celsius"}`}
      className="
        flex items-center gap-1 px-3 py-2 rounded-xl
        bg-white/10 hover:bg-white/20
        border border-white/15 hover:border-sky-400/40
        text-white font-outfit font-semibold text-sm
        transition-all duration-300
        hover:shadow-lg hover:shadow-sky-500/10
        active:scale-95
      "
    >
      <span className={`transition-all duration-200 ${isCelsius ? "text-sky-300" : "text-white/40"}`}>
        °C
      </span>
      <span className="text-white/30 mx-0.5">/</span>
      <span className={`transition-all duration-200 ${!isCelsius ? "text-sky-300" : "text-white/40"}`}>
        °F
      </span>
    </button>
  );
};

export default ToggleUnit;
