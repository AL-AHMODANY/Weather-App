import React from "react";
import { WiDayCloudy } from "react-icons/wi";

const EmptyState = ({ isDark = true }) => (
  <div className="flex flex-col items-center justify-center py-20 px-6 animate-fade-in">
    <div className="relative mb-6">
      <div className="animate-float">
        <WiDayCloudy size={100} className={isDark ? "text-white/20" : "text-slate-300"} />
      </div>
      <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-sky-400/30 animate-float-delay" />
      <div className="absolute -bottom-1 -left-3 w-2 h-2 rounded-full bg-sky-300/20 animate-float-delay2" />
    </div>

    <h2 className={`font-outfit font-bold text-2xl md:text-3xl text-center mb-3 ${isDark ? "text-white/80" : "text-slate-700"}`}>
      Search for a city to see the weather ☁️
    </h2>
    <p className={`font-dm text-center text-sm max-w-sm ${isDark ? "text-white/40" : "text-slate-500"}`}>
      Enter a city name in the search bar above, or use your current location to get started.
    </p>

    <div className="flex flex-wrap gap-2 mt-8 justify-center">
      {["New York", "London", "Tokyo", "Lagos", "Paris"].map((city) => (
        <span
          key={city}
          className={`px-3 py-1.5 rounded-full border font-dm text-xs ${
            isDark
              ? "bg-white/5 border-white/10 text-white/40"
              : "bg-white/60 border-slate-200 text-slate-500"
          }`}
        >
          {city}
        </span>
      ))}
    </div>
  </div>
);

export default EmptyState;
