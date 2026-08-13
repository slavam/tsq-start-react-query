// src/routes/forecast/components/ForecastTable.tsx
import { type WeatherForecastResponse } from '~/utils/weather';

interface ForecastTableProps {
  forecastData: WeatherForecastResponse;
  iDay: number;
}

export default function ForecastTable({ forecastData, iDay }: ForecastTableProps) {
  // 📊 Получаем данные за нужный день
  const forecastDay = forecastData.forecast.forecastday[iDay] || forecastData.forecast.forecastday[0];
  const todayForecast = forecastDay.day;

  // Основные показатели
  const totalPrecip = todayForecast.totalprecip_mm;
  const maxTemp = todayForecast.maxtemp_c;
  const minTemp = todayForecast.mintemp_c;
  const sunrise = forecastDay.astro.sunrise.slice(0, 5);
  const sunset = forecastDay.astro.sunset.slice(0, 5);
  const maxWind = (todayForecast.maxwind_kph * 1000 / 3600).toFixed(1);

  // 🕐 Текущий час
  const currentHour = iDay === 0 ? new Date().getHours() : 0;

  // 📋 Формируем данные по часам (с текущего часа)
  const hours = [];
  for (let i = currentHour; i < 24; i++) {
    const data = forecastDay.hour[i];
    hours.push({
      hour: i,
      icon: data.condition.icon,
      condition: data.condition.text,
      temp: data.temp_c,
      chance: (data.chance_of_rain === 0 && data.chance_of_snow === 0)
        ? 0
        : Math.max(data.chance_of_rain, data.chance_of_snow),
    });
  }

  return (
    <div className="space-y-4">
      {/* 📊 Дневной прогноз */}
      <table
        className="w-full table-auto border-collapse text-sm"
        data-testid="daily-forecast-table"
      >
        <thead>
          <tr className="bg-gray-700 text-white" style={{ height: '80px' }}>
            <th className="p-2" style={{ width: '150px' }}>
              Восход: {sunrise}
              <br />
              Закат: {sunset}
            </th>
            <th className="p-2" style={{ width: '150px' }}>
              Max:
              <br />
              {maxTemp} °C
            </th>
            <th className="p-2" style={{ width: '150px' }}>
              Min:
              <br />
              {minTemp} °C
            </th>
            <th className="p-2" style={{ width: '150px' }}>
              Осадки:
              <br />
              {totalPrecip} mm
            </th>
            <th className="p-2" style={{ width: '150px' }}>
              Скорость ветра:
              <br />
              {maxWind} м/сек
            </th>
          </tr>
        </thead>
      </table>

      {/* ⏰ Почасовой прогноз */}
      <h2 className="text-2xl font-bold">Почасовой прогноз</h2>

      <div className="overflow-x-auto" data-testid="hourly-forecast-container">
        <table
          className="w-full table-auto border-collapse text-sm"
          data-testid="hourly-forecast-table"
        >
          <thead>
            {/* Заголовки часов */}
            <tr className="bg-gray-600 text-white">
              <th className="p-2 bg-gray-600" style={{ minWidth: '100px' }}></th>
              {hours.map((h) => (
                <th key={h.hour} className="p-2 text-center" style={{ minWidth: '80px' }}>
                  {`${h.hour}:00`}
                </th>
              ))}
            </tr>

            {/* Иконки погоды */}
            <tr className="bg-gray-700 text-white">
              <th className="p-2 bg-gray-600">Погода</th>
              {hours.map((h) => (
                <th key={h.hour} className="p-2 text-center">
                  <img
                    className="mx-auto w-12 h-12"
                    src={h.icon}
                    alt={h.condition}
                    title={h.condition}
                  />
                </th>
              ))}
            </tr>

            {/* Температура */}
            <tr className="bg-gray-700 text-white">
              <th className="p-2 bg-gray-600">Температура °C</th>
              {hours.map((h) => (
                <th key={h.hour} className="p-2 text-center">
                  {h.temp}
                </th>
              ))}
            </tr>

            {/* Вероятность осадков */}
            <tr className="bg-gray-700 text-white">
              <th className="p-2 bg-gray-600">Вероятность осадков %</th>
              {hours.map((h) => (
                <th key={h.hour} className="p-2 text-center">
                  {h.chance}
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}