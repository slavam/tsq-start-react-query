import { dataTagErrorSymbol, useSuspenseQuery } from '@tanstack/react-query'
import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { stationsQueryOptions } from '../utils/stations'

export const Route = createFileRoute('/stations')({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(stationsQueryOptions())
  },
  component: StationsComponent,
})

function StationsComponent() {
  const stationsQuery = useSuspenseQuery(stationsQueryOptions())
  console.log(stationsQuery.data)
  return (
    <div className="p-2 flex gap-2">
      <ul className="list-disc pl-4">
        {[
          ...stationsQuery.data,
          { index: 'i-do-not-exist', name: 'Non-existent Station' },
        ].map((station) => {
          return (
            <li key={station.index} className="whitespace-nowrap">
              {/* <Link
                to="/stations/$index"
                params={{
                  index: String(station.index),
                }}
                className="block py-1 text-blue-800 hover:text-blue-600"
                activeProps={{ className: 'text-black font-bold' }}
              >
                <div>{station.name}</div>
              </Link> */}
              <div>{station.name}</div>
            </li>
          )
        })}
      </ul>
      <hr />
      <Outlet />
    </div>
  )
}
