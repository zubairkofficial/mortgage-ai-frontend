import { DataTable } from "@/components/dashboard/data-table"
import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive"
import { SectionCards } from "@/components/dashboard/section-cards"

const mortgageApplicationsData = [
  {
    id: 1,
    borrowerName: "Michael Johnson",
    loanType: "Conventional",
    status: "Approved",
    amount: "$325,000",
    ltv: "72%",
    underwriter: "Maria Rodriguez"
  },
  {
    id: 2,
    borrowerName: "Sarah Williams",
    loanType: "FHA",
    status: "In Review",
    amount: "$215,000",
    ltv: "85%",
    underwriter: "David Chen"
  },
  {
    id: 3,
    borrowerName: "Robert Garcia",
    loanType: "VA",
    status: "Pending",
    amount: "$425,000",
    ltv: "90%",
    underwriter: "Sarah Johnson"
  },
  {
    id: 4,
    borrowerName: "Jennifer Martinez",
    loanType: "Jumbo",
    status: "Approved",
    amount: "$750,000",
    ltv: "65%",
    underwriter: "Maria Rodriguez"
  },
  {
    id: 5,
    borrowerName: "David Thompson",
    loanType: "Fixed 30yr",
    status: "In Review",
    amount: "$280,000",
    ltv: "78%",
    underwriter: "David Chen"
  },
  {
    id: 6,
    borrowerName: "Amanda Wilson",
    loanType: "Fixed 15yr",
    status: "Approved",
    amount: "$350,000",
    ltv: "70%",
    underwriter: "Sarah Johnson"
  },
  {
    id: 7,
    borrowerName: "James Brown",
    loanType: "ARM 5/1",
    status: "Denied",
    amount: "$520,000",
    ltv: "92%",
    underwriter: "Maria Rodriguez"
  },
  {
    id: 8,
    borrowerName: "Lisa Anderson",
    loanType: "USDA",
    status: "Pending",
    amount: "$195,000",
    ltv: "80%",
    underwriter: "David Chen"
  },
  {
    id: 9,
    borrowerName: "Kevin Taylor",
    loanType: "Conventional",
    status: "Suspended",
    amount: "$275,000",
    ltv: "75%",
    underwriter: "Sarah Johnson"
  },
  {
    id: 10,
    borrowerName: "Michelle Davis",
    loanType: "Fixed 30yr",
    status: "Approved",
    amount: "$320,000",
    ltv: "68%",
    underwriter: "Maria Rodriguez"
  }
]

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 py-6">
        <h2 className="text-3xl font-bold tracking-tight px-6">Mortgage AI Super Admin Dashboard</h2>
        <SectionCards />
        <div className="px-6">
          <ChartAreaInteractive />
        </div>
        <div className="px-6">
          <DataTable data={mortgageApplicationsData} />
        </div>
      </div>
    </main>
  )
} 