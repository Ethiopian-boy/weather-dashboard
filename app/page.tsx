'use client';
import { useState } from 'react';

interface WeatherData {
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  visibility: number;
  timezone: number; // seconds offset from UTC
  dt: number; // data calculation timestamp
  rain?: {
    '1h'?: number;
    '3h'?: number;
  };
  snow?: {
    '1h'?: number;
    '3h'?: number;
  };
}



function formatLocalTime(timestamp: number, timezoneOffset: number): string {
  // Combine the timestamp with the timezone offset and convert to milliseconds
  const localTime = new Date((timestamp + timezoneOffset) * 1000);
  return localTime.toLocaleString();
}


export default function Home() {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>('');

  const fetchWeather = async () => {
    setError('');
    try {
      const res = await fetch(`/api/weather?city=${city}`);
      const data = await res.json();
      if (res.ok) {
        setWeather(data);
      } else {
        setError(data.error || 'Error fetching weather data');
      }
    } catch (err) {
      setError('Error fetching weather data');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Weather Dashboard
        </h1>
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 text-gray-800 bg-white"
        />

          <button
            onClick={fetchWeather}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded transition-colors"
          >
            Get Weather
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-center mt-4">{error}</p>
        )}
        {weather && (
  <div className="mt-6 p-4 bg-gray-100 rounded shadow">
    <h2 className="text-xl font-semibold text-gray-700">{weather.name}</h2>
    <p className="text-gray-600">
      Country: <span className="font-bold">{weather.sys.country}</span>
    </p>
    <p className="text-gray-600">
      Temperature: <span className="font-bold">{weather.main.temp} °C</span>
    </p>
    <p className="text-gray-600">
      Weather: <span className="font-bold">{weather.weather[0].description}</span>
    </p>
    <p className="text-gray-600">
      Humidity: <span className="font-bold">{weather.main.humidity}%</span>
    </p>
    <p className="text-gray-600">
      Wind: <span className="font-bold">{weather.wind.speed} m/s</span> at {weather.wind.deg}°
    </p>
    <p className="text-gray-600">
      Pressure: <span className="font-bold">{weather.main.pressure} hPa</span>
    </p>
    <p className="text-gray-600">
      Local Time: <span className="font-bold">{formatLocalTime(weather.dt, weather.timezone)}</span>
    </p>
    <p className="text-gray-600">
      Sunrise: <span className="font-bold">{formatLocalTime(weather.sys.sunrise, weather.timezone)}</span>
    </p>
    <p className="text-gray-600">
      Sunset: <span className="font-bold">{formatLocalTime(weather.sys.sunset, weather.timezone)}</span>
    </p>

    {weather.rain && (weather.rain['1h'] || weather.rain['3h']) && (
      <p className="text-gray-600">
        Rain:{" "}
        <span className="font-bold">
          {weather.rain['1h']
            ? `${weather.rain['1h']} mm (last 1h)`
            : `${weather.rain['3h']} mm (last 3h)`}
        </span>
      </p>
    )}

    {weather.snow && (weather.snow['1h'] || weather.snow['3h']) && (
      <p className="text-gray-600">
        Snow:{" "}
        <span className="font-bold">
          {weather.snow['1h']
            ? `${weather.snow['1h']} mm (last 1h)`
            : `${weather.snow['3h']} mm (last 3h)`}
        </span>
      </p>
    )}
  </div>
)}
      </div>
    </div>
  );
}
