// // 👇 Экспорт по умолчанию
// export default forecastRoute;
// forecastWeatherApi.tsx
import { createRoute, lazyRouteComponent } from '@tanstack/react-router';
import { Route as rootRoute } from '../routes/__root';
import { z } from 'zod';
import { fetchForecast } from '~/utils/forecast'

const forecastSearchSchema = z.object({
  i_day: z.number().int().min(0).max(2).default(0).catch(0),
});

export type ForecastSearch = z.infer<typeof forecastSearchSchema>;

// Маршрут с компонентом
const forecastRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'forecastWeatherApi',
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
  // component: () => <ForecastPage />, // 👈 Используем компонент напрямую
  // или если хотите lazy:
  component: lazyRouteComponent(() => import('./forecastWeatherApi.index'), 'ForecastPage'),
})

export default forecastRoute;