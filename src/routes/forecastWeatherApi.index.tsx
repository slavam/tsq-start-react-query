import { createFileRoute } from '@tanstack/react-router'
// // src/routes/forecast/index.tsx
// import { Suspense } from 'react';
// import { useSearch } from '@tanstack/react-router';
// import { forecastRoute, type ForecastSearch } from './forecastWeatherApi';
// import { useWeatherForecast } from '~/hooks/useWeatherForecast';
// import ForecastLinks from '~/components/ForecastLinks';
// import ForecastTable from '~/components/ForecastTable';

// export function ForecastPage() {
//   // 📍 Получаем search-параметры
//   const search = useSearch({ from: forecastRoute.id });
//   const iDay = search.i_day || 0;

//   // 📊 Получаем данные из Query (уже предзагружены)
//   const { data: forecastData } = useWeatherForecast(3);

//   // 🕐 Вычисляем дату на клиенте
//   const todayTime = Date.now();
//   const targetDate = new Date(todayTime + iDay * 24 * 3600 * 1000);
//   const dateString = targetDate.toLocaleDateString('ru', {
//     month: 'long',
//     day: 'numeric',
//   });

//   return (
//     <div className="w-full p-4">
//       <div className="flex w-full items-center justify-between">
//         <h1 className="text-2xl font-bold">
//           Прогноз погоды в г. Донецк на {dateString}
//         </h1>
//       </div>

//       <ForecastLinks />

//       <Suspense key={iDay} fallback={<div className="p-4">Загрузка прогноза...</div>}>
//         <ForecastTable forecastData={forecastData} iDay={iDay} />
//       </Suspense>

//       <div className="footer-bottom text-center pb-5 mt-8">
//         <small className="copyright">
//           Copyright &copy;{' '}
//           <a href="https://www.weatherapi.com" title="Weather API">
//             Weather API
//           </a>
//         </small>
//       </div>
//     </div>
//   );
// }
// forecastWeatherApi.index.tsx

import ForecastLinks from '~/components/ForecastLinks'
import ForecastTable from '~/components/ForecastTable'
import { Suspense } from 'react'
import { useWeatherForecast } from '~/hooks/useWeatherForecast'
import { ForecastSearch } from './forecastWeatherApi'
import forecastRoute from './forecastWeatherApi'
import { useSearch } from '@tanstack/react-router'

export function ForecastPage() {
  const search = useSearch({ from: '/forecastWeatherApi/' }) as ForecastSearch;
  const iDay = search.i_day || 0;

  // 📊 Получаем данные из Query (уже предзагружены)
  const { data: forecastData } = useWeatherForecast(3);

  // 🕐 Вычисляем дату на клиенте
  const todayTime = Date.now();
  const targetDate = new Date(todayTime + iDay * 24 * 3600 * 1000);
  const dateString = targetDate.toLocaleDateString('ru', {
    month: 'long',
    day: 'numeric',
  });
  return (
    <div className="w-full p-4">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">
          Прогноз погоды в г. Донецк на {dateString}
        </h1>
      </div>

      <ForecastLinks />

      <Suspense key={iDay} fallback={<div className="p-4">Загрузка прогноза...</div>}>
        <ForecastTable forecastData={forecastData} iDay={iDay} />
      </Suspense>

      <div className="footer-bottom text-center pb-5 mt-8">
        <small className="copyright">
          Copyright &copy;{' '}
          <a href="https://www.weatherapi.com" title="Weather API">
            Weather API
          </a>
        </small>
      </div>
    </div>
  );
}

// Если нужно, можете добавить Route для совместимости
export const Route = createFileRoute('/forecastWeatherApi/')({
  component: ForecastPage,
});