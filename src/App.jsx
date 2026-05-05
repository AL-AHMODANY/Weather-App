import React, { useState, useCallback } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import WeatherDetails from "./components/WeatherDetails";
import ForecastStrip from "./components/ForecastStrip";
import HourlyForecast from "./components/HourlyForecast";
import ToggleUnit from "./components/ToggleUnit";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import EmptyState from "./components/EmptyState";
import BackgroundParticles from "./components/BackgroundParticles";
import LocationBrowser from "./components/LocationBrowser";
import useWeather from "./hooks/useWeather";
import { getBackgroundClass } from "./utils/weatherHelpers";

function App() {
  const [unit, setUnit] = useState("metric"); // "metric" | "imperial"
  const { weatherData, forecastData, loading, error, lastUpdated, fetchByCity, fetchByCoords } =
    useWeather();

  const bgClass = getBackgroundClass(weatherData);

  const handleSearch = useCallback(
    (city) => fetchByCity(city),
    [fetchByCity]
  );

  const handleGeolocate = useCallback(
    (lat, lon) => fetchByCoords(lat, lon),
    [fetchByCoords]
  );

  const toggleUnit = () =>
    setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));

  return (
    <div
      className={`min-h-screen relative transition-all duration-1000 ${bgClass}`}
      style={{ minHeight: "100dvh" }}
    >
      {/* Animated background particles */}
      <BackgroundParticles />

      {/* Full-screen loading overlay */}
      {loading && !weatherData && <LoadingSpinner fullScreen />}

      {/* Main content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-6 md:py-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-6 animate-fade-in">
          <div>
            <h1 className="font-outfit font-bold text-2xl text-white tracking-tight">
              ⛅ WeatherNow
            </h1>
            <p className="font-dm text-white/40 text-xs mt-0.5">
              Real-time weather worldwide
            </p>
          </div>
          <ToggleUnit unit={unit} onToggle={toggleUnit} />
        </header>

        {/* Search bar */}
        <div className="mb-3">
          <SearchBar
            onSearch={handleSearch}
            onGeolocate={handleGeolocate}
            loading={loading}
          />
        </div>

        {/* Location browser */}
        <div className="mb-6">
          <LocationBrowser onSelect={handleSearch} />
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4">
            <ErrorMessage message={error} />
          </div>
        )}

        {/* Loading indicator when refreshing existing data */}
        {loading && weatherData && (
          <div className="mb-4">
            <LoadingSpinner />
          </div>
        )}

        {/* Weather content */}
        {weatherData && forecastData && !loading ? (
          <div className="flex flex-col gap-4">
            {/* Main hero card */}
            <CurrentWeather
              data={weatherData}
              unit={unit}
              lastUpdated={lastUpdated}
            />

            {/* Details grid */}
            <WeatherDetails data={weatherData} unit={unit} />

            {/* 5-day forecast */}
            <ForecastStrip
              forecastData={forecastData}
              unit={unit}
              timezoneOffset={weatherData.timezone}
            />

            {/* Hourly forecast */}
            <HourlyForecast
              forecastData={forecastData}
              unit={unit}
              timezoneOffset={weatherData.timezone}
            />
          </div>
        ) : (
          !loading && !error && <EmptyState />
        )}

        {/* Footer */}
        <footer className="mt-10 text-center space-y-1">
          <p className="font-outfit font-semibold text-white/40 text-sm tracking-wide">
            © {new Date().getFullYear()} AL-AHMODANY
          </p>
          <p className="font-dm text-white/20 text-xs">
            Powered by{" "}
            <a
              href="https://openweathermap.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400/50 hover:text-sky-400 transition-colors"
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
