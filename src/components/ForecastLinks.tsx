import { Link } from '@tanstack/react-router';

export default function ForecastLinks() {

  return (
    <div className="flex flex-wrap gap-2 my-4">
      <Link
        to="/forecastWeatherApi"
        search={{ i_day: 0 }}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
      >
        Сегодня
      </Link>

      <Link
        to="/forecastWeatherApi"
        search={{ i_day: 1 }}
        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
      >
        Завтра
      </Link>

      <Link
        to="/forecastWeatherApi"
        search={{ i_day: 2 }}
        className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
      >
        Послезавтра
      </Link>
    </div>
  );
}