import { useSuspenseQuery } from '@tanstack/react-query'
import { Outlet, createFileRoute } from '@tanstack/react-router'
import { stationsQueryOptions } from '../utils/stations'

export const Route = createFileRoute('/stations')({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(stationsQueryOptions())
  },
  component: StationsComponent,
})

function StationsComponent() {
  const stationsQuery = useSuspenseQuery(stationsQueryOptions())
  console.log(JSON.stringify(stationsQuery.data))
  return (
    <div className="p-2 flex gap-2">
      <ul className="list-disc pl-4">
        {[
          ...stationsQuery.data,
        ].map((station) => {
          return (
            <li key={station.sindex} className="whitespace-nowrap">
              <div>{station.sindex} {station.station_name}</div>
            </li>
          )
        })}
      </ul>
      <hr />
      <Outlet />
    </div>
  )
}
