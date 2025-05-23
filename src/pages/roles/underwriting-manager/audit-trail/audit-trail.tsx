import { FC } from "react";
import { DataTable } from "@/components/common/table";
import { createSortableColumn, createActionsColumn } from "@/components/common/table";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for audit trails
const mockAuditTrails = [
  {
    id: "AUDIT-001",
    loanId: "LOAN-001",
    action: "Document Review",
    user: "Sarah Johnson",
    timestamp: "2024-03-16 14:30:00",
    details: "Reviewed income documentation",
    status: "completed",
    changes: ["Verified income documents", "Updated borrower profile"]
  },
  {
    id: "AUDIT-002",
    loanId: "LOAN-002",
    action: "Compliance Check",
    user: "Mike Brown",
    timestamp: "2024-03-16 13:15:00",
    details: "Performed regulatory compliance check",
    status: "flagged",
    changes: ["Flagged missing TILA disclosure", "Notified compliance team"]
  },
  // Add more mock data as needed
];

const AuditTrailPage: FC = () => {
  const columns = [
    createSortableColumn("id", "Audit ID"),
    createSortableColumn("loanId", "Loan ID"),
    createSortableColumn("action", "Action"),
    createSortableColumn("user", "User"),
    createSortableColumn("timestamp", "Timestamp"),
    createSortableColumn("details", "Details"),
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => {
        const status = row.getValue("status");
        return (
          <Badge
            variant={
              status === "completed"
                ? "success"
                : status === "in_progress"
                ? "secondary"
                : "destructive"
            }
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "changes",
      header: "Changes Made",
      cell: ({ row }: any) => {
        const changes = row.getValue("changes") as string[];
        return (
          <div className="flex flex-col gap-1">
            {changes.map((change, index) => (
              <Badge key={index} variant="outline" className="w-fit">
                {change}
              </Badge>
            ))}
          </div>
        );
      },
    },
    createActionsColumn([
      {
        label: "View Details",
        onClick: (data: any) => {
          console.log("View details for:", data.id);
          // Implement view details logic
        },
      },
      {
        label: "Export Record",
        onClick: (data: any) => {
          console.log("Export record for:", data.id);
          // Implement export logic
        },
      },
    ]),
  ];

  // Mock audit statistics
  const auditStats = {
    totalAudits: 1250,
    todayAudits: 45,
    averageResponseTime: "1.5 hours",
    activeUsers: 12
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Audit Trail Review</h1>
          <p className="text-muted-foreground">
            View detailed activity logs on loan files and track all changes
          </p>
        </div>
        <Button>
          <History className="mr-2 h-4 w-4" />
          Export Audit Log
        </Button>
      </div>

      {/* Audit Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Audit Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditStats.totalAudits}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Today's Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{auditStats.todayAudits}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditStats.averageResponseTime}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditStats.activeUsers}</div>
          </CardContent>
        </Card>
      </div>

      <DataTable
        columns={columns}
        data={mockAuditTrails}
        searchKey="loanId"
        title="Audit Trail Log"
        description="Track all activities and changes made to loan files"
        filterableColumns={[
          {
            id: "status",
            title: "Status",
            options: [
              { label: "Completed", value: "completed" },
              { label: "In Progress", value: "in_progress" },
              { label: "Flagged", value: "flagged" },
            ],
          },
          {
            id: "action",
            title: "Action Type",
            options: [
              { label: "Document Review", value: "Document Review" },
              { label: "Compliance Check", value: "Compliance Check" },
              { label: "Status Update", value: "Status Update" },
            ],
          },
        ]}
      />
    </div>
  );
};

export default AuditTrailPage; 