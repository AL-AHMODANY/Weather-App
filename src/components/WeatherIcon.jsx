import React from "react";
import {
  WiDaySunny,
  WiNightClear,
  WiCloud,
  WiCloudy,
  WiRain,
  WiShowers,
  WiThunderstorm,
  WiSnow,
  WiFog,
  WiDayCloudy,
  WiNightAltCloudy,
  WiDayRain,
  WiNightAltRain,
  WiSleet,
  WiDust,
  WiSmoke,
  WiTornado,
} from "react-icons/wi";

const getIcon = (weatherId, isNight = false, size = 64) => {
  const props = { size, className: "drop-shadow-lg" };

  // Thunderstorm
  if (weatherId >= 200 && weatherId < 300)
    return <WiThunderstorm {...props} className="text-yellow-300 drop-shadow-lg" />;

  // Drizzle
  if (weatherId >= 300 && weatherId < 400)
    return <WiShowers {...props} className="text-sky-300 drop-shadow-lg" />;

  // Rain
  if (weatherId >= 500 && weatherId < 600) {
    if (isNight) return <WiNightAltRain {...props} className="text-sky-300 drop-shadow-lg" />;
    return <WiDayRain {...props} className="text-sky-300 drop-shadow-lg" />;
  }

  // Snow
  if (weatherId >= 600 && weatherId < 700) {
    if (weatherId === 611 || weatherId === 612 || weatherId === 613)
      return <WiSleet {...props} className="text-blue-200 drop-shadow-lg" />;
    if (weatherId === 615 || weatherId === 616)
      return <WiRain {...props} className="text-blue-200 drop-shadow-lg" />;
    return <WiSnow {...props} className="text-blue-100 drop-shadow-lg" />;
  }

  // Atmosphere
  if (weatherId >= 700 && weatherId < 800) {
    if (weatherId === 781) return <WiTornado {...props} className="text-gray-300 drop-shadow-lg" />;
    if (weatherId === 731 || weatherId === 761)
      return <WiDust {...props} className="text-amber-300 drop-shadow-lg" />;
    if (weatherId === 762) return <WiSmoke {...props} className="text-gray-400 drop-shadow-lg" />;
    return <WiFog {...props} className="text-gray-300 drop-shadow-lg" />;
  }

  // Clear
  if (weatherId === 800) {
    if (isNight) return <WiNightClear {...props} className="text-indigo-200 drop-shadow-lg" />;
    return <WiDaySunny {...props} className="text-amber-400 drop-shadow-lg" />;
  }

  // Clouds
  if (weatherId === 801) {
    if (isNight) return <WiNightAltCloudy {...props} className="text-slate-300 drop-shadow-lg" />;
    return <WiDayCloudy {...props} className="text-slate-300 drop-shadow-lg" />;
  }
  if (weatherId === 802) return <WiCloud {...props} className="text-slate-300 drop-shadow-lg" />;
  if (weatherId >= 803) return <WiCloudy {...props} className="text-slate-400 drop-shadow-lg" />;

  return <WiDaySunny {...props} className="text-amber-400 drop-shadow-lg" />;
};

const WeatherIcon = ({ weatherId, isNight = false, size = 64 }) => {
  return getIcon(weatherId, isNight, size);
};

export default WeatherIcon;
