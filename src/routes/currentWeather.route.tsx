import { Outlet, createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { currentWeatherQueryOptions } from '../utils/currentWeather'

export const Route = createFileRoute('/currentWeather')({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(currentWeatherQueryOptions())
  },
  component: RouteComponent,
})

let temperature: string
let windDirection: string
let windSpeed: string
let humidity: string
function RouteComponent() {
  const absoluteZero = 273.15
  const currentWeatherQuery = useSuspenseQuery(currentWeatherQueryOptions())
  // console.log(JSON.stringify(currentWeatherQuery.data))

  currentWeatherQuery.data
    .map((data) => {
      let measurement = data.meas_hash
      switch (measurement) {
        case 1451382247:
          temperature = (+data.value - absoluteZero).toFixed(1)
          break
        case -789901366:
          windDirection = data.value
          break
        case 1345858116:
          windSpeed = data.value
          break
        case -996973625:
          humidity = data.value
          break
      }
    }
    )
  return (
    <div className="p-2 flex gap-2 ">
      <h1>Текущая погода по состоянию на {new Date().toLocaleString("ru")} </h1>
      <hr />
      <div className='font-bold text-lg'>
        <ul className="list-disc pl-4" >
          <li key='1' className="whitespace-nowrap">
            Температура: {temperature}°C
          </li>
          <li key='2' className="whitespace-nowrap">
            Направление ветра: {windDirection}°
          </li>
          <li key='3' className="whitespace-nowrap">
            Скорость ветра: {windSpeed}м/с
          </li>
          <li key='4' className="whitespace-nowrap">
            Относительная влажность: {humidity}%
          </li>
        </ul>
      </div>
      <hr />
      <Outlet />
    </div>
  )
}
