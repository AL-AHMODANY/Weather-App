import React from "react";
import WeatherIcon from "./WeatherIcon";
import { convertTemp, getDayName, getDailyForecast, isToday } from "../utils/weatherHelpers";

const ForecastStrip = ({ forecastData, unit, timezoneOffset, isDark = true }) => {
  const daily = getDailyForecast(forecastData.list, timezoneOffset);
  const unitSymbol = unit === "metric" ? "°C" : "°F";

  return (
    <div className="animate-slide-up-delay">
      <h2 className={`font-outfit font-semibold text-sm uppercase tracking-widest mb-3 px-1 ${isDark ? "text-white/60" : "text-slate-500"}`}>
        5-Day Forecast
      </h2>
      <div className="flex gap-3 overflow-x-auto scroll-hide pb-2">
        {daily.map((item, i) => {
          const today = isToday(item.dt, timezoneOffset);
          const dayName = today ? "Today" : getDayName(item.dt, timezoneOffset);
          const high = convertTemp(item.main.temp_max, unit);
          const low = convertTemp(item.main.temp_min, unit);

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
              <span className={`font-outfit font-semibold text-sm ${today ? "text-sky-400" : isDark ? "text-white/70" : "text-slate-600"}`}>
                {dayName}
              </span>
              <WeatherIcon weatherId={item.weather[0].id} isNight={false} size={36} />
              <div className="flex flex-col items-center gap-0.5">
                <span className={`font-outfit font-bold text-sm ${isDark ? "text-white" : "text-slate-800"}`}>
                  {high}{unitSymbol}
                </span>
                <span className={`font-dm text-xs ${isDark ? "text-white/40" : "text-slate-400"}`}>
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
