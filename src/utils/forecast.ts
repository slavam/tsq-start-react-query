// src/utils/forecast.ts
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

export async function fetchForecast(days: number = 3) {
  const query = `${BASE_URL}/forecast.json?key=${API_KEY}&q=id:2495932&days=${days}`;
  
  try {
    const response = await fetch(query);
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('WeatherAPI Error:', error);
    throw error;
  }
}

// Тип для ответа API
export interface WeatherForecastResponse {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  forecast: {
    forecastday: ForecastDay[];
  };
}

export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    totalprecip_mm: number;
    maxwind_kph: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  astro: {
    sunrise: string;
    sunset: string;
  };
  hour: HourlyForecast[];
}

export interface HourlyForecast {
  time: string;
  temp_c: number;
  condition: {
    text: string;
    icon: string;
  };
  chance_of_rain: number;
  chance_of_snow: number;
}