import React from "react";
import WeatherIcon from "./WeatherIcon";
import { convertTemp, formatHour, getHourlyForecast } from "../utils/weatherHelpers";

const HourlyForecast = ({ forecastData, unit, timezoneOffset }) => {
  const hourly = getHourlyForecast(forecastData.list);
  const unitSymbol = unit === "metric" ? "°C" : "°F";

  return (
    <div className="animate-slide-up-delay2">
      <h2 className="font-outfit font-semibold text-white/60 text-sm uppercase tracking-widest mb-3 px-1">
        Hourly Forecast
      </h2>
      <div className="flex gap-3 overflow-x-auto scroll-hide pb-2">
        {hourly.map((item, i) => {
          const time = formatHour(item.dt, timezoneOffset);
          const temp = convertTemp(item.main.temp, unit);
          const isFirst = i === 0;

          return (
            <div
              key={item.dt}
              className={`
                flex-shrink-0 flex flex-col items-center gap-2 px-4 py-4 rounded-2xl
                transition-all duration-300 hover:scale-105 cursor-default
                ${isFirst
                  ? "bg-sky-500/15 border border-sky-400/30"
                  : "glass-card"
                }
              `}
            >
              <span className={`font-dm text-xs ${isFirst ? "text-sky-300 font-semibold" : "text-white/50"}`}>
                {isFirst ? "Now" : time}
              </span>
              <WeatherIcon weatherId={item.weather[0].id} isNight={false} size={28} />
              <span className="font-outfit font-bold text-white text-sm">
                {temp}{unitSymbol}
              </span>
              {/* Pop (probability of precipitation) */}
              {item.pop > 0 && (
                <span className="text-sky-400 font-dm text-xs">
                  {Math.round(item.pop * 100)}%
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;
