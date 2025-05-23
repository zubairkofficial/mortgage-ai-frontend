import { FC } from "react";
import { DataTable } from "@/components/common/table";
import { createSortableColumn, createActionsColumn } from "@/components/common/table";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, XCircle, FileCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for compliance checks
const mockComplianceChecks = [
  {
    id: "COMP-001",
    loanId: "LOAN-001",
    borrower: "John Smith",
    checkType: "Regulatory",
    status: "flagged",
    issues: ["Missing TILA disclosure", "Incomplete HMDA data"],
    dueDate: "2024-03-20",
    lastChecked: "2024-03-16",
    assignedTo: "Sarah Johnson"
  },
  {
    id: "COMP-002",
    loanId: "LOAN-002",
    borrower: "Sarah Johnson",
    checkType: "Documentation",
    status: "compliant",
    issues: [],
    dueDate: "2024-03-21",
    lastChecked: "2024-03-15",
    assignedTo: "Mike Brown"
  },
  // Add more mock data as needed
];

const CompliancePage: FC = () => {
  const columns = [
    createSortableColumn("id", "Check ID"),
    createSortableColumn("loanId", "Loan ID"),
    createSortableColumn("borrower", "Borrower"),
    createSortableColumn("checkType", "Check Type"),
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => {
        const status = row.getValue("status");
        return (
          <Badge
            variant={
              status === "compliant"
                ? "success"
                : status === "pending"
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
      accessorKey: "issues",
      header: "Issues",
      cell: ({ row }: any) => {
        const issues = row.getValue("issues") as string[];
        return issues.length > 0 ? (
          <div className="flex flex-col gap-1">
            {issues.map((issue, index) => (
              <Badge key={index} variant="destructive" className="w-fit">
                {issue}
              </Badge>
            ))}
          </div>
        ) : (
          <Badge variant="success">No Issues</Badge>
        );
      },
    },
    createSortableColumn("dueDate", "Due Date"),
    createSortableColumn("lastChecked", "Last Checked"),
    createSortableColumn("assignedTo", "Assigned To"),
    createActionsColumn([
      {
        label: "Review Compliance",
        onClick: (data: any) => {
          console.log("Review compliance for:", data.id);
          // Implement compliance review logic
        },
      },
      {
        label: "Update Status",
        onClick: (data: any) => {
          console.log("Update status for:", data.id);
          // Implement status update logic
        },
      },
      {
        label: "Flag Issues",
        onClick: (data: any) => {
          console.log("Flag issues for:", data.id);
          // Implement issue flagging logic
        },
        variant: "destructive",
      },
    ]),
  ];

  // Mock compliance statistics
  const complianceStats = {
    totalChecks: 150,
    compliant: 120,
    flagged: 25,
    pending: 5,
    averageResolutionTime: "2.5 days"
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Compliance Checks</h1>
          <p className="text-muted-foreground">
            Review loan compliance against regulatory standards and flag inconsistencies
          </p>
        </div>
        <Button>
          <FileCheck className="mr-2 h-4 w-4" />
          New Compliance Check
        </Button>
      </div>

      {/* Compliance Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Checks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceStats.totalChecks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Compliant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{complianceStats.compliant}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Flagged</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{complianceStats.flagged}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Resolution Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceStats.averageResolutionTime}</div>
          </CardContent>
        </Card>
      </div>

      <DataTable
        columns={columns}
        data={mockComplianceChecks}
        searchKey="borrower"
        title="Compliance Checks"
        description="Monitor and manage loan compliance status"
        filterableColumns={[
          {
            id: "status",
            title: "Status",
            options: [
              { label: "Compliant", value: "compliant" },
              { label: "Flagged", value: "flagged" },
              { label: "Pending", value: "pending" },
            ],
          },
          {
            id: "checkType",
            title: "Check Type",
            options: [
              { label: "Regulatory", value: "Regulatory" },
              { label: "Documentation", value: "Documentation" },
            ],
          },
        ]}
      />
    </div>
  );
};

export default CompliancePage; 