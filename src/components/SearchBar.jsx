import React, { useState, useEffect, useRef, useCallback } from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const SearchBar = ({ onSearch, onGeolocate, loading, isDark = true }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleSearch = useCallback(() => {
    const trimmed = query.trim();
    if (trimmed) onSearch(trimmed);
  }, [query, onSearch]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => onGeolocate(pos.coords.latitude, pos.coords.longitude),
      () => alert("Unable to retrieve your location. Please allow location access.")
    );
  };

  const inputBase = isDark
    ? "bg-white/10 border-white/15 text-white placeholder-white/40 focus:border-sky-400/60 focus:bg-white/15"
    : "bg-white/70 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-sky-400 focus:bg-white";

  const btnBase = isDark
    ? "bg-white/10 hover:bg-white/20 border-white/15 hover:border-sky-400/40 text-white/70 hover:text-sky-300"
    : "bg-white/70 hover:bg-white border-slate-200 hover:border-sky-400/60 text-slate-600 hover:text-sky-600";

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none ${isDark ? "text-white/40" : "text-slate-400"}`}>
            {loading
              ? <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-sky-400 animate-spin" />
              : <FiSearch size={20} />
            }
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a city name and press Enter..."
            disabled={loading}
            className={`
              w-full pl-12 pr-10 py-4 backdrop-blur-md
              border rounded-2xl font-dm text-base
              focus:outline-none transition-all duration-300
              disabled:opacity-60 disabled:cursor-not-allowed
              ${inputBase}
            `}
          />
          {query && (
            <button
              onClick={handleClear}
              className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${isDark ? "text-white/40 hover:text-white/80" : "text-slate-400 hover:text-slate-700"}`}
            >
              <IoClose size={20} />
            </button>
          )}
        </div>

        <button
          onClick={handleSearch}
          disabled={loading || !query.trim()}
          className="
            px-5 py-4 rounded-2xl
            bg-sky-500/80 hover:bg-sky-400/90
            border border-sky-400/30
            text-white font-outfit font-semibold text-sm
            transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed
            hover:shadow-lg hover:shadow-sky-500/20
            active:scale-95
          "
        >
          Search
        </button>

        <button
          onClick={handleGeolocate}
          disabled={loading}
          title="Use my location"
          className={`
            px-4 py-4 rounded-2xl border
            transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed
            hover:shadow-lg active:scale-95
            flex items-center gap-2
            ${btnBase}
          `}
        >
          <FiMapPin size={20} />
          <span className="hidden sm:inline text-sm font-dm">My Location</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
