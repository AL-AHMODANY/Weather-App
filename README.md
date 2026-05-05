# ⛅ WeatherNow

A beautiful, fully responsive Weather App built with React and Tailwind CSS.

## Features

- 🔍 Search weather by city name
- 📍 Geolocation support (use your current location)
- 🌡️ °C / °F toggle (instant conversion, no re-fetch)
- 🗓️ 5-day forecast strip
- ⏱️ Hourly forecast (next 8 hours)
- 💧 Detailed weather stats: humidity, wind, visibility, pressure, sunrise/sunset
- 🎨 Dynamic background that shifts based on weather condition
- ✨ Glassmorphism UI with smooth animations
- 📱 Fully responsive — mobile, tablet, desktop

## Setup

### 1. Get a free API key

Sign up at [OpenWeatherMap](https://openweathermap.org/api) and grab your free API key.

### 2. Add your API key

Open the `.env` file in the project root and replace the placeholder:

```
REACT_APP_WEATHER_API_KEY=your_actual_api_key_here
```

> ⚠️ New API keys can take up to 2 hours to activate after registration.

### 3. Install dependencies

```bash
npm install
```

### 4. Start the app

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── components/
│   ├── BackgroundParticles.jsx   ← Animated CSS background dots
│   ├── CurrentWeather.jsx        ← Main hero weather card
│   ├── EmptyState.jsx            ← Default state before search
│   ├── ErrorMessage.jsx          ← Friendly error display
│   ├── ForecastStrip.jsx         ← 5-day forecast row
│   ├── HourlyForecast.jsx        ← Hourly forecast row
│   ├── LoadingSpinner.jsx        ← Spinner + skeleton components
│   ├── SearchBar.jsx             ← Search input with debounce
│   ├── ToggleUnit.jsx            ← °C / °F toggle button
│   └── WeatherIcon.jsx           ← Condition-based weather icons
├── hooks/
│   └── useWeather.js             ← Custom hook: fetch, loading, error
├── utils/
│   └── weatherHelpers.js         ← Temp conversion, date formatting, etc.
├── App.jsx
└── index.css
```

## Tech Stack

- **React** (functional components + hooks)
- **Tailwind CSS v3** (all styling)
- **react-icons** (weather icons via `react-icons/wi`)
- **OpenWeatherMap API** (current weather + 5-day forecast)
