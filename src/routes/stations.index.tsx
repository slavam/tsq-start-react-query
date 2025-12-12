import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/stations/')({
    component: StationsIndexComponent,
})

function StationsIndexComponent() {
    return <div>Select a station.</div>
}
