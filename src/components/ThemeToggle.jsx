import React from "react";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";

const ThemeToggle = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="
        relative flex items-center gap-2 px-3 py-2 rounded-xl
        border transition-all duration-300 active:scale-95
        bg-white/10 hover:bg-white/20 border-white/15 hover:border-sky-400/40
        text-white/70 hover:text-white
      "
      aria-label="Toggle dark/light mode"
    >
      {/* Sun icon */}
      <BsSunFill
        size={15}
        className={`transition-all duration-300 ${
          isDark ? "text-white/30" : "text-amber-400"
        }`}
      />

      {/* Sliding pill */}
      <div className="relative w-10 h-5 rounded-full bg-white/10 border border-white/20">
        <div
          className={`
            absolute top-0.5 w-4 h-4 rounded-full transition-all duration-300
            ${isDark
              ? "left-0.5 bg-slate-300"
              : "left-5 bg-amber-400 shadow-lg shadow-amber-400/40"
            }
          `}
        />
      </div>

      {/* Moon icon */}
      <BsMoonStarsFill
        size={13}
        className={`transition-all duration-300 ${
          isDark ? "text-sky-300" : "text-white/30"
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
