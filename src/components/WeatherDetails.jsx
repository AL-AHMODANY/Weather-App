import React from "react";
import { WiHumidity, WiStrongWind, WiBarometer, WiSunrise, WiSunset } from "react-icons/wi";
import { MdVisibility } from "react-icons/md";
import { formatWindSpeed, formatVisibility, formatTime, getWindDirection } from "../utils/weatherHelpers";

const getWindArrow = (degrees) => {
  const arrows = ["↑", "↗", "→", "↘", "↓", "↙", "←", "↖"];
  return arrows[Math.round(degrees / 45) % 8];
};

const DetailCard = ({ icon, label, value, sub, delay = 0, isDark = true }) => (
  <div
    className="glass-card rounded-2xl p-4 flex flex-col gap-2 animate-slide-up hover:scale-[1.02] transition-transform duration-300 cursor-default"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className={`flex items-center gap-2 ${isDark ? "text-white/50" : "text-slate-500"}`}>
      <span className="text-sky-500">{icon}</span>
      <span className="font-dm text-xs uppercase tracking-wider">{label}</span>
    </div>
    <div className={`font-outfit font-bold text-xl ${isDark ? "text-white" : "text-slate-800"}`}>{value}</div>
    {sub && <div className={`font-dm text-xs ${isDark ? "text-white/40" : "text-slate-400"}`}>{sub}</div>}
  </div>
);

const WeatherDetails = ({ data, unit, isDark = true }) => {
  const { main, wind, visibility, sys, timezone } = data;

  const windDir = getWindDirection(wind.deg);
  const windSpeed = formatWindSpeed(wind.speed, unit);
  const vis = formatVisibility(visibility);
  const sunrise = formatTime(sys.sunrise, timezone);
  const sunset = formatTime(sys.sunset, timezone);

  const details = [
    {
      icon: <WiHumidity size={24} />,
      label: "Humidity",
      value: `${main.humidity}%`,
      sub: main.humidity > 70 ? "High humidity" : main.humidity < 30 ? "Low humidity" : "Comfortable",
    },
    {
      icon: <WiStrongWind size={24} />,
      label: "Wind Speed",
      value: windSpeed,
      sub: `Direction: ${windDir} ${getWindArrow(wind.deg)}`,
    },
    {
      icon: <MdVisibility size={22} />,
      label: "Visibility",
      value: vis,
      sub: visibility >= 10000 ? "Clear view" : visibility >= 5000 ? "Moderate" : "Poor visibility",
    },
    {
      icon: <WiBarometer size={24} />,
      label: "Pressure",
      value: `${main.pressure} hPa`,
      sub: main.pressure > 1013 ? "High pressure" : "Low pressure",
    },
    {
      icon: <WiSunrise size={24} />,
      label: "Sunrise",
      value: sunrise,
      sub: "Local time",
    },
    {
      icon: <WiSunset size={24} />,
      label: "Sunset",
      value: sunset,
      sub: "Local time",
    },
  ];

  return (
    <div className="animate-slide-up-delay">
      <h2 className={`font-outfit font-semibold text-sm uppercase tracking-widest mb-3 px-1 ${isDark ? "text-white/60" : "text-slate-500"}`}>
        Weather Details
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {details.map((d, i) => (
          <DetailCard key={d.label} {...d} delay={i * 60} isDark={isDark} />
        ))}
      </div>
    </div>
  );
};

export default WeatherDetails;
