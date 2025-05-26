import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/common/table";
import { createSortableColumn, createActionsColumn } from "@/components/common/table";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, XCircle, TrendingUp, FileText, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Row, ColumnDef } from "@tanstack/react-table";

// Define the type for compliance alert data
interface ComplianceAlert {
  id: string;
  broker: string;
  type: string;
  severity: "High" | "Medium" | "Low";
  description: string;
  status: "Open" | "In Progress" | "Resolved";
  createdAt: string;
  dueDate: string;
}

// Mock data for compliance alerts
const complianceAlerts: ComplianceAlert[] = [
  {
    id: "ALT001",
    broker: "ABC Mortgage",
    type: "Documentation",
    severity: "High",
    description: "Missing borrower income verification documents",
    status: "Open",
    createdAt: "2024-03-15",
    dueDate: "2024-03-22",
  },
  {
    id: "ALT002",
    broker: "XYZ Lending",
    type: "Training",
    severity: "Medium",
    description: "Broker team requires annual compliance training",
    status: "In Progress",
    createdAt: "2024-03-14",
    dueDate: "2024-03-28",
  },
  // Add more mock data as needed
];

// Define columns for the compliance alerts table
const columns: ColumnDef<ComplianceAlert>[] = [
  createSortableColumn("id", "Alert ID"),
  createSortableColumn("broker", "Broker"),
  createSortableColumn("type", "Alert Type"),
  {
    accessorKey: "severity",
    header: "Severity",
    cell: ({ row }: { row: Row<ComplianceAlert> }) => {
      const severity = row.original.severity;
      return (
        <span className={`px-2 py-1 rounded-full text-xs ${
          severity === "High" ? "bg-red-100 text-red-800" :
          severity === "Medium" ? "bg-yellow-100 text-yellow-800" :
          "bg-green-100 text-green-800"
        }`}>
          {severity}
        </span>
      );
    },
  },
  createSortableColumn("description", "Description"),
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: Row<ComplianceAlert> }) => {
      const status = row.original.status;
      return (
        <span className={`px-2 py-1 rounded-full text-xs ${
          status === "Open" ? "bg-red-100 text-red-800" :
          status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
          "bg-green-100 text-green-800"
        }`}>
          {status}
        </span>
      );
    },
  },
  createSortableColumn("dueDate", "Due Date"),
  createActionsColumn([
    {
      label: "View Details",
      onClick: (data: ComplianceAlert) => console.log("View details for", data.id),
    },
    {
      label: "Resolve",
      onClick: (data: ComplianceAlert) => console.log("Resolve", data.id),
    },
    {
      label: "Escalate",
      onClick: (data: ComplianceAlert) => console.log("Escalate", data.id),
      variant: "destructive",
    },
  ]),
];

// Compliance summary statistics
const complianceStats = {
  totalAlerts: 12,
  openAlerts: 5,
  resolvedAlerts: 7,
  averageResolutionTime: "3.2 days",
  complianceScore: 94.5,
};

const ComplianceMonitoring: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Compliance Monitoring</h1>
          <p className="text-muted-foreground">
            Track and manage compliance across your broker network with AI-driven insights
          </p>
        </div>
        <Button onClick={() => navigate("/account-executive/compliance/settings")}>
          <Bell className="mr-2 h-4 w-4" />
          Alert Settings
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceStats.totalAlerts}</div>
            <p className="text-xs text-muted-foreground">
              {complianceStats.openAlerts} open alerts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Alerts</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceStats.resolvedAlerts}</div>
            <p className="text-xs text-muted-foreground">
              Successfully addressed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Resolution Time</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceStats.averageResolutionTime}</div>
            <p className="text-xs text-muted-foreground">
              For resolved alerts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Compliance Score</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceStats.complianceScore}%</div>
            <p className="text-xs text-muted-foreground">
              Overall compliance rating
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Alerts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Compliance Alerts</CardTitle>
          <CardDescription>
            Monitor and manage compliance alerts across your broker network
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={complianceAlerts}
            searchKey="broker"
            title="Compliance Alerts"
            description="Track and manage compliance alerts for your broker network"
            filterableColumns={[
              {
                id: "severity",
                title: "Severity",
                options: [
                  { label: "All", value: "all" },
                  { label: "High", value: "High" },
                  { label: "Medium", value: "Medium" },
                  { label: "Low", value: "Low" },
                ],
              },
              {
                id: "status",
                title: "Status",
                options: [
                  { label: "All", value: "all" },
                  { label: "Open", value: "Open" },
                  { label: "In Progress", value: "In Progress" },
                  { label: "Resolved", value: "Resolved" },
                ],
              },
              {
                id: "type",
                title: "Alert Type",
                options: [
                  { label: "All", value: "all" },
                  { label: "Documentation", value: "Documentation" },
                  { label: "Training", value: "Training" },
                  { label: "Policy", value: "Policy" },
                ],
              },
            ]}
            actionButtonText="Create Alert"
            actionButtonIcon={<AlertCircle className="mr-2 h-4 w-4" />}
            onActionButtonClick={() => console.log("Create new alert")}
          />
        </CardContent>
      </Card>

      {/* AI Insights Card */}
      <Card>
        <CardHeader>
          <CardTitle>AI Compliance Insights</CardTitle>
          <CardDescription>
            AI-driven analysis and recommendations for improving compliance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-500 mt-1" />
              <div>
                <h4 className="font-medium mb-1">Documentation Trends</h4>
                <p className="text-sm text-muted-foreground">
                  Recent analysis shows a 15% increase in missing income verification documents. 
                  Consider scheduling additional training sessions for affected brokers.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
              <div>
                <h4 className="font-medium mb-1">Positive Compliance Trend</h4>
                <p className="text-sm text-muted-foreground">
                  Overall compliance score has improved by 3.2% this month. 
                  Continue current training and monitoring practices.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceMonitoring; 