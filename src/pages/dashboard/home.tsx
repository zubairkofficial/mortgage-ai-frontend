import { ChartAreaInteractive } from '@/components/layout/chart-area-interactive'
import { DataTable } from '@/components/layout/data-table'
import { SectionCards } from '@/components/layout/section-cards'
import data from "@/app/dashboard/data.json"

const Home = () => {
    return (
        <>
            <SectionCards />
            <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
        </>
    )
}

export default Home
