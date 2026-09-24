import { useSuspenseQuery } from '@tanstack/react-query'
import { Outlet, createFileRoute, ErrorComponent } from '@tanstack/react-router'
import { stationsQueryOptions, useStations } from '../utils/stations'

function StationList() {
  const { data, isPending, isError, error } = useStations()

  if (isPending) return <div className="p-4" data-testid="loading-fallback">Загрузка данных...</div>
  if (isError) return <ErrorComponent error={error} />

  return (
    <div className="p-2 flex gap-2">
      <ul className="list-disc pl-4">{data.map(s => <li key={s.sindex}>{s.station_name}</li>)}
      </ul>
    </div>
  )
}

export const Route = createFileRoute('/stations')({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(stationsQueryOptions())
  },
  // component: StationsComponent,
  component: StationList,
})



// function StationsComponent() {
//   const stationsQuery = useSuspenseQuery(stationsQueryOptions())
//   console.log(JSON.stringify(stationsQuery.data))
//   return (
//     <div className="p-2 flex gap-2">
//       <ul className="list-disc pl-4">
//         {[
//           ...stationsQuery.data,
//         ].map((station) => {
//           return (
//             <li key={station.sindex} className="whitespace-nowrap">
//               <div>{station.sindex} {station.station_name}</div>
//             </li>
//           )
//         })}
//       </ul>
//       <hr />
//       <Outlet />
//     </div>
//   )
// }
