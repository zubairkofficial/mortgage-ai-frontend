import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/common/table";
import { createSortableColumn, createActionsColumn } from "@/components/common/table";
import { Button } from "@/components/ui/button";
import { Plus, AlertCircle, TrendingUp, Users, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Row, ColumnDef } from "@tanstack/react-table";

// Define the type for broker data
interface BrokerData {
  id: string;
  name: string;
  location: string;
  activeBrokers: number;
  totalLoans: number;
  conversionRate: number;
  complianceScore: number;
  status: "Active" | "Inactive";
}

// Mock data for the broker network
const brokerNetworkData: BrokerData[] = [
  {
    id: "BRK001",
    name: "ABC Mortgage",
    location: "New York, NY",
    activeBrokers: 12,
    totalLoans: 156,
    conversionRate: 68.5,
    complianceScore: 95,
    status: "Active",
  },
  {
    id: "BRK002",
    name: "XYZ Lending",
    location: "Los Angeles, CA",
    activeBrokers: 8,
    totalLoans: 98,
    conversionRate: 72.3,
    complianceScore: 92,
    status: "Active",
  },
  // Add more mock data as needed
];

// Network summary statistics
const networkStats = {
  totalBrokers: 48,
  activeBrokers: 42,
  totalBranches: 12,
  averageConversionRate: 70.4,
  averageComplianceScore: 93.5,
  alerts: 3,
};

const BrokerNetworkOverview: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Broker Network Overview</h1>
          <p className="text-muted-foreground">
            Monitor and manage your broker network performance and compliance
          </p>
        </div>
        <Button onClick={() => navigate("/account-executive/broker-network/add")}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Broker
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Brokers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkStats.totalBrokers}</div>
            <p className="text-xs text-muted-foreground">
              {networkStats.activeBrokers} active brokers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Branches</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkStats.totalBranches}</div>
            <p className="text-xs text-muted-foreground">
              Across all broker networks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkStats.averageConversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              Across all brokers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{networkStats.alerts}</div>
            <p className="text-xs text-muted-foreground">
              Requiring attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Broker Network Table */}
      <Card>
        <CardHeader>
          <CardTitle>Broker Network</CardTitle>
          <CardDescription>
            Overview of all brokers in your network, their performance metrics, and compliance status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={brokerNetworkData}
            searchKey="name"
            filterableColumns={[
              {
                id: "status",
                title: "Status",
                options: [
                  { label: "Active", value: "Active" },
                  { label: "Inactive", value: "Inactive" },
                ],
              },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
};

// Define columns for the broker network table
const columns: ColumnDef<BrokerData>[] = [
  createSortableColumn("id", "Broker ID"),
  createSortableColumn("name", "Broker Name"),
  createSortableColumn("location", "Location"),
  createSortableColumn("activeBrokers", "Active Brokers"),
  createSortableColumn("totalLoans", "Total Loans"),
  {
    accessorKey: "conversionRate",
    header: "Conversion Rate",
    cell: ({ row }: { row: Row<BrokerData> }) => {
      return `${row.original.conversionRate}%`;
    },
  },
  {
    accessorKey: "complianceScore",
    header: "Compliance Score",
    cell: ({ row }: { row: Row<BrokerData> }) => {
      return `${row.original.complianceScore}%`;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: Row<BrokerData> }) => {
      const status = row.original.status;
      return (
        <span className={`px-2 py-1 rounded-full text-xs ${
          status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}>
          {status}
        </span>
      );
    },
  },
  createActionsColumn([
    {
      label: "View Details",
      onClick: (data: BrokerData) => console.log("View details for", data.id),
    },
    {
      label: "Edit",
      onClick: (data: BrokerData) => console.log("Edit", data.id),
    },
    {
      label: "Deactivate",
      onClick: (data: BrokerData) => console.log("Deactivate", data.id),
      variant: "destructive",
    },
  ]),
];

export default BrokerNetworkOverview; 