// src/hooks/useWeatherForecast.ts
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchWeatherForecast, type WeatherForecastResponse } from '../utils/weather';

export const weatherKeys = {
  all: ['weather'] as const,
  forecast: (days: number = 3) => [...weatherKeys.all, 'forecast', days] as const,
};

export function useWeatherForecast(days: number = 3) {
  return useSuspenseQuery({
    queryKey: weatherKeys.forecast(days),
    queryFn: () => fetchWeatherForecast(days),
    staleTime: 1000 * 60 * 5, // 5 минут
    refetchOnWindowFocus: false,
  });
}