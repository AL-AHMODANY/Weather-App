import React from "react";
import WeatherIcon from "./WeatherIcon";
import { convertTemp, getDayName, getDailyForecast, isToday } from "../utils/weatherHelpers";

const ForecastStrip = ({ forecastData, unit, timezoneOffset }) => {
  const daily = getDailyForecast(forecastData.list, timezoneOffset);
  const unitSymbol = unit === "metric" ? "°C" : "°F";

  return (
    <div className="animate-slide-up-delay">
      <h2 className="font-outfit font-semibold text-white/60 text-sm uppercase tracking-widest mb-3 px-1">
        5-Day Forecast
      </h2>
      <div className="flex gap-3 overflow-x-auto scroll-hide pb-2">
        {daily.map((item, i) => {
          const today = isToday(item.dt, timezoneOffset);
          const dayName = today ? "Today" : getDayName(item.dt, timezoneOffset);
          const high = convertTemp(item.main.temp_max, unit);
          const low = convertTemp(item.main.temp_min, unit);
          const isNight = false; // forecast is daytime

          return (
            <div
              key={item.dt}
              className={`
                flex-shrink-0 flex flex-col items-center gap-2 px-5 py-4 rounded-2xl
                transition-all duration-300 hover:scale-105 cursor-default
                ${today
                  ? "bg-sky-500/20 border border-sky-400/40 shadow-lg shadow-sky-500/10"
                  : "glass-card"
                }
              `}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className={`font-outfit font-semibold text-sm ${today ? "text-sky-300" : "text-white/70"}`}>
                {dayName}
              </span>
              <WeatherIcon weatherId={item.weather[0].id} isNight={isNight} size={36} />
              <div className="flex flex-col items-center gap-0.5">
                <span className="font-outfit font-bold text-white text-sm">
                  {high}{unitSymbol}
                </span>
                <span className="font-dm text-white/40 text-xs">
                  {low}{unitSymbol}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastStrip;
