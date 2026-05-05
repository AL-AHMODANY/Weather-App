// ─── Temperature Conversion ───────────────────────────────────────────────────
// API returns Celsius (units=metric), convert to °F when needed
export const convertTemp = (tempC, unit) => {
  if (unit === "metric") return Math.round(tempC);
  return Math.round((tempC * 9) / 5 + 32);
};

export const formatTemp = (tempC, unit) => {
  const val = convertTemp(tempC, unit);
  return `${val}°${unit === "metric" ? "C" : "F"}`;
};

// ─── Wind Speed Conversion ────────────────────────────────────────────────────
export const formatWindSpeed = (mps, unit) => {
  if (unit === "metric") return `${Math.round(mps * 3.6)} km/h`;
  return `${Math.round(mps * 2.237)} mph`;
};

// ─── Visibility ───────────────────────────────────────────────────────────────
export const formatVisibility = (meters) => {
  if (meters >= 1000) return `${(meters / 1000).toFixed(1)} km`;
  return `${meters} m`;
};

// ─── Date & Time ──────────────────────────────────────────────────────────────
export const formatDate = (timestamp, timezoneOffset) => {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
};

export const formatTime = (timestamp, timezoneOffset) => {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
};

export const formatHour = (timestamp, timezoneOffset) => {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
};

export const getDayName = (timestamp, timezoneOffset) => {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  return date.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" });
};

export const isToday = (timestamp, timezoneOffset) => {
  const itemDate = new Date((timestamp + timezoneOffset) * 1000);
  const now = new Date((Date.now() / 1000 + timezoneOffset) * 1000);
  return (
    itemDate.getUTCDate() === now.getUTCDate() &&
    itemDate.getUTCMonth() === now.getUTCMonth()
  );
};

// ─── Wind Direction ───────────────────────────────────────────────────────────
export const getWindDirection = (degrees) => {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(degrees / 45) % 8];
};

// ─── Country Flag Emoji ───────────────────────────────────────────────────────
export const getCountryFlag = (countryCode) => {
  if (!countryCode) return "";
  return countryCode
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
    .join("");
};

// ─── Weather Condition → Background Class ────────────────────────────────────
export const getBackgroundClass = (weatherData) => {
  if (!weatherData) return "bg-default";
  const id = weatherData.weather[0].id;
  const now = Date.now() / 1000;
  const sunrise = weatherData.sys.sunrise + weatherData.timezone;
  const sunset = weatherData.sys.sunset + weatherData.timezone;
  const localNow = now + weatherData.timezone;

  if (localNow < sunrise || localNow > sunset) return "bg-night";
  if (id >= 200 && id < 600) return "bg-rainy";
  if (id >= 600 && id < 700) return "bg-snowy";
  if (id >= 700 && id < 800) return "bg-cloudy";
  if (id === 800) return "bg-clear";
  if (id > 800) return "bg-cloudy";
  return "bg-default";
};

// ─── 5-Day Forecast: one entry per day (noon) ─────────────────────────────────
export const getDailyForecast = (forecastList, timezoneOffset) => {
  const seen = new Set();
  const daily = [];
  for (const item of forecastList) {
    const date = new Date((item.dt + timezoneOffset) * 1000);
    const dayKey = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`;
    if (!seen.has(dayKey)) {
      seen.add(dayKey);
      daily.push(item);
    }
    if (daily.length === 5) break;
  }
  return daily;
};

// ─── Hourly Forecast: next 8 entries ─────────────────────────────────────────
export const getHourlyForecast = (forecastList) => forecastList.slice(0, 8);

// ─── Weather Icon Code → Condition Key ───────────────────────────────────────
export const getConditionKey = (weatherId, isNight = false) => {
  if (weatherId >= 200 && weatherId < 300) return "thunderstorm";
  if (weatherId >= 300 && weatherId < 400) return "drizzle";
  if (weatherId >= 500 && weatherId < 600) return "rain";
  if (weatherId >= 600 && weatherId < 700) return "snow";
  if (weatherId >= 700 && weatherId < 800) return "mist";
  if (weatherId === 800) return isNight ? "clear-night" : "clear";
  if (weatherId > 800) return "clouds";
  return "clear";
};
