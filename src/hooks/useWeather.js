import { useState, useCallback } from "react";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE = "https://api.openweathermap.org/data/2.5";

const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchByCity = useCallback(async (city) => {
    if (!city.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(`${BASE}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`),
        fetch(`${BASE}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`),
      ]);

      if (!weatherRes.ok) {
        if (weatherRes.status === 404) throw new Error("City not found. Please check the spelling and try again.");
        if (weatherRes.status === 401) throw new Error("Invalid API key. Please check your .env file.");
        if (weatherRes.status === 429) throw new Error("Too many requests. Please wait a moment and try again.");
        throw new Error("Failed to fetch weather data. Please try again.");
      }

      const weather = await weatherRes.json();
      const forecast = await forecastRes.json();

      setWeatherData(weather);
      setForecastData(forecast);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchByCoords = useCallback(async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(`${BASE}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`),
        fetch(`${BASE}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`),
      ]);

      if (!weatherRes.ok) {
        if (weatherRes.status === 401) throw new Error("Invalid API key. Please check your .env file.");
        throw new Error("Failed to fetch weather for your location.");
      }

      const weather = await weatherRes.json();
      const forecast = await forecastRes.json();

      setWeatherData(weather);
      setForecastData(forecast);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    weatherData,
    forecastData,
    loading,
    error,
    lastUpdated,
    fetchByCity,
    fetchByCoords,
  };
};

export default useWeather;
