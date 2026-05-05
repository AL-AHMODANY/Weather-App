import React, { useState, useEffect, useRef, useCallback } from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const SearchBar = ({ onSearch, onGeolocate, loading }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="flex gap-2 items-center">
        {/* Search input */}
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
            {loading ? (
              <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-sky-400 animate-spin" />
            ) : (
              <FiSearch size={20} />
            )}
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a city name and press Enter..."
            disabled={loading}
            className="
              w-full pl-12 pr-10 py-4
              bg-white/10 backdrop-blur-md
              border border-white/15 rounded-2xl
              text-white placeholder-white/40
              font-dm text-base
              focus:outline-none focus:border-sky-400/60 focus:bg-white/15
              transition-all duration-300
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
            >
              <IoClose size={20} />
            </button>
          )}
        </div>

        {/* Search button */}
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

        {/* Geolocation button */}
        <button
          onClick={handleGeolocate}
          disabled={loading}
          title="Use my location"
          className="
            px-4 py-4 rounded-2xl
            bg-white/10 hover:bg-white/20
            border border-white/15 hover:border-sky-400/40
            text-white/70 hover:text-sky-300
            transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed
            hover:shadow-lg hover:shadow-sky-500/10
            active:scale-95
            flex items-center gap-2
          "
        >
          <FiMapPin size={20} />
          <span className="hidden sm:inline text-sm font-dm">My Location</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
