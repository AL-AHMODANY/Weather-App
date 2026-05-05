import React, { useState, useCallback, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import WeatherDetails from "./components/WeatherDetails";
import ForecastStrip from "./components/ForecastStrip";
import HourlyForecast from "./components/HourlyForecast";
import ToggleUnit from "./components/ToggleUnit";
import ThemeToggle from "./components/ThemeToggle";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import EmptyState from "./components/EmptyState";
import BackgroundParticles from "./components/BackgroundParticles";
import LocationBrowser from "./components/LocationBrowser";
import useWeather from "./hooks/useWeather";
import { getBackgroundClass } from "./utils/weatherHelpers";

function App() {
  const [unit, setUnit] = useState("metric");
  const [isDark, setIsDark] = useState(true); // dark by default

  const { weatherData, forecastData, loading, error, lastUpdated, fetchByCity, fetchByCoords } =
    useWeather();

  const bgClass = getBackgroundClass(weatherData);

  // Apply/remove "light" class on <html> for Tailwind darkMode:"class"
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("light");
    } else {
      root.classList.add("light");
    }
  }, [isDark]);

  const handleSearch = useCallback((city) => fetchByCity(city), [fetchByCity]);
  const handleGeolocate = useCallback((lat, lon) => fetchByCoords(lat, lon), [fetchByCoords]);
  const toggleUnit = () => setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
  const toggleTheme = () => setIsDark((prev) => !prev);

  // Text colors based on theme
  const textPrimary = isDark ? "text-white" : "text-slate-800";
  const textSecondary = isDark ? "text-white/40" : "text-slate-500";

  return (
    <div
      className={`min-h-screen relative transition-all duration-700 ${bgClass}`}
      style={{ minHeight: "100dvh" }}
    >
      {/* Animated background particles */}
      <BackgroundParticles isDark={isDark} />

      {/* Full-screen loading overlay */}
      {loading && !weatherData && <LoadingSpinner fullScreen isDark={isDark} />}

      {/* Main content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-6 md:py-10">

        {/* Header */}
        <header className="flex items-center justify-between mb-6 animate-fade-in">
          <div>
            <h1 className={`font-outfit font-bold text-2xl tracking-tight ${textPrimary}`}>
              ⛅ WeatherNow
            </h1>
            <p className={`font-dm text-xs mt-0.5 ${textSecondary}`}>
              Real-time weather worldwide
            </p>
          </div>
          {/* Controls */}
          <div className="flex items-center gap-2">
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            <ToggleUnit unit={unit} onToggle={toggleUnit} isDark={isDark} />
          </div>
        </header>

        {/* Search bar */}
        <div className="mb-3">
          <SearchBar
            onSearch={handleSearch}
            onGeolocate={handleGeolocate}
            loading={loading}
            isDark={isDark}
          />
        </div>

        {/* Location browser */}
        <div className="mb-6">
          <LocationBrowser onSelect={handleSearch} isDark={isDark} />
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4">
            <ErrorMessage message={error} isDark={isDark} />
          </div>
        )}

        {/* Loading indicator when refreshing */}
        {loading && weatherData && (
          <div className="mb-4">
            <LoadingSpinner />
          </div>
        )}

        {/* Weather content */}
        {weatherData && forecastData && !loading ? (
          <div className="flex flex-col gap-4">
            <CurrentWeather data={weatherData} unit={unit} lastUpdated={lastUpdated} isDark={isDark} />
            <WeatherDetails data={weatherData} unit={unit} isDark={isDark} />
            <ForecastStrip forecastData={forecastData} unit={unit} timezoneOffset={weatherData.timezone} isDark={isDark} />
            <HourlyForecast forecastData={forecastData} unit={unit} timezoneOffset={weatherData.timezone} isDark={isDark} />
          </div>
        ) : (
          !loading && !error && <EmptyState isDark={isDark} />
        )}

        {/* Footer */}
        <footer className="mt-10 text-center space-y-1">
          <p className={`font-outfit font-semibold text-sm tracking-wide ${isDark ? "text-white/40" : "text-slate-500"}`}>
            © {new Date().getFullYear()} AL-AHMODANY
          </p>
          <p className={`font-dm text-xs ${isDark ? "text-white/20" : "text-slate-400"}`}>
            Powered by{" "}
            <a
              href="https://openweathermap.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-500 hover:text-sky-400 transition-colors"
            >
              OpenWeatherMap
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
