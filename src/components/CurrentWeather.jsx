import React from "react";
import WeatherIcon from "./WeatherIcon";
import {
  convertTemp,
  formatDate,
  formatTime,
  getCountryFlag,
} from "../utils/weatherHelpers";

const CurrentWeather = ({ data, unit, lastUpdated }) => {
  const { name, sys, main, weather, timezone, dt } = data;
  const condition = weather[0];
  const isNight = dt < sys.sunrise || dt > sys.sunset;

  const temp = convertTemp(main.temp, unit);
  const feelsLike = convertTemp(main.feels_like, unit);
  const tempMax = convertTemp(main.temp_max, unit);
  const tempMin = convertTemp(main.temp_min, unit);
  const unitSymbol = unit === "metric" ? "°C" : "°F";

  const flag = getCountryFlag(sys.country);
  const dateStr = formatDate(dt, timezone);
  const timeStr = formatTime(dt, timezone);

  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 animate-slide-up">
      {/* Top row: location + icon */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-outfit font-bold text-3xl md:text-4xl text-white truncate">
              {name}
            </h1>
            <span className="text-3xl" title={sys.country}>
              {flag}
            </span>
          </div>
          <p className="text-white/50 font-dm text-sm mt-1">{dateStr}</p>
          <p className="text-sky-300/80 font-dm text-sm">{timeStr} local time</p>
        </div>

        {/* Weather icon */}
        <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 md:w-24 md:h-24">
          <WeatherIcon weatherId={condition.id} isNight={isNight} size={80} />
        </div>
      </div>

      {/* Temperature */}
      <div className="mt-4 flex items-end gap-4 flex-wrap">
        <div>
          <span className="font-outfit font-extrabold text-7xl md:text-8xl text-white leading-none">
            {temp}
          </span>
          <span className="font-outfit font-light text-4xl text-white/60 ml-1">
            {unitSymbol}
          </span>
        </div>

        <div className="mb-2 flex flex-col gap-1">
          <span className="text-white/80 font-dm text-lg capitalize">
            {condition.description}
          </span>
          <span className="text-white/50 font-dm text-sm">
            Feels like{" "}
            <span className="text-white/70 font-medium">
              {feelsLike}{unitSymbol}
            </span>
          </span>
        </div>
      </div>

      {/* High / Low */}
      <div className="mt-4 flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="text-red-400 text-xs font-outfit font-semibold uppercase tracking-wider">H</span>
          <span className="text-white/80 font-dm font-medium">
            {tempMax}{unitSymbol}
          </span>
        </div>
        <div className="w-px h-4 bg-white/20" />
        <div className="flex items-center gap-1.5">
          <span className="text-sky-400 text-xs font-outfit font-semibold uppercase tracking-wider">L</span>
          <span className="text-white/80 font-dm font-medium">
            {tempMin}{unitSymbol}
          </span>
        </div>
        {lastUpdated && (
          <>
            <div className="w-px h-4 bg-white/20" />
            <span className="text-white/30 font-dm text-xs">
              Updated {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default CurrentWeather;
