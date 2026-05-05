import React from "react";
import { WiDayCloudy } from "react-icons/wi";

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 px-6 animate-fade-in">
    {/* Animated cloud icon */}
    <div className="relative mb-6">
      <div className="animate-float">
        <WiDayCloudy size={100} className="text-white/20" />
      </div>
      {/* Floating particles around icon */}
      <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-sky-400/30 animate-float-delay" />
      <div className="absolute -bottom-1 -left-3 w-2 h-2 rounded-full bg-sky-300/20 animate-float-delay2" />
    </div>

    <h2 className="font-outfit font-bold text-2xl md:text-3xl text-white/80 text-center mb-3">
      Search for a city to see the weather ☁️
    </h2>
    <p className="font-dm text-white/40 text-center text-sm max-w-sm">
      Enter a city name in the search bar above, or use your current location to get started.
    </p>

    {/* Hint chips */}
    <div className="flex flex-wrap gap-2 mt-8 justify-center">
      {["New York", "London", "Tokyo", "Paris", "Sydney"].map((city) => (
        <span
          key={city}
          className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/40 font-dm text-xs"
        >
          {city}
        </span>
      ))}
    </div>
  </div>
);

export default EmptyState;
