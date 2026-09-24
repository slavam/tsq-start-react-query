import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';
import { z } from 'zod';
import { fetchForecast } from '~/utils/forecast';

const forecastSearchSchema = z.object({
  i_day: z.number().int().min(0).max(2).default(0).catch(0),
});

export type ForecastSearch = z.infer<typeof forecastSearchSchema>;

export const Route = createFileRoute('/forecastWeatherApi')({
  validateSearch: (search: Record<string, unknown>): ForecastSearch => {
    return forecastSearchSchema.parse(search);
  },
  loader: async ({ context }) => {
    const { queryClient } = context;
    await queryClient.ensureQueryData({
      queryKey: ['weather', 'forecast', 3],
      queryFn: () => fetchForecast(3),
    });
    return {};
  },
  component: lazyRouteComponent(
    () => import('./forecastWeatherApi.index'),
    'ForecastPage'
  ),
});