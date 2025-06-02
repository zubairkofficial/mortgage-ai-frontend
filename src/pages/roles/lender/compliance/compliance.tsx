import { useState } from "react";
import {
  DataTable,
  createSortableColumn,
  createActionsColumn,
} from "@/components/common/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ComplianceForm } from "./compliance-form";
import { ColumnDef } from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, AlertCircle, FileText, Download } from "lucide-react";

// Types
type ComplianceCheck = {
  id: string;
  loanId: string;
  borrower: string;
  checkType: string;
  status: "compliant" | "flagged" | "pending";
  issues: string[];
  dueDate: string;
  lastChecked: string;
  assignedTo: string;
  riskLevel: "low" | "medium" | "high";
};

// Initial mock data for lender compliance
const initialComplianceChecks: ComplianceCheck[] = [
  {
    id: "LC-001",
    loanId: "LOAN-001",
    borrower: "John Smith",
    checkType: "Anti-Money Laundering (AML)",
    status: "compliant",
    issues: [],
    dueDate: "2024-03-15",
    lastChecked: "2024-03-10",
    assignedTo: "Sarah Lender",
    riskLevel: "low",
  },
  {
    id: "LC-002",
    loanId: "LOAN-002",
    borrower: "Jane Doe",
    checkType: "Know Your Customer (KYC)",
    status: "flagged",
    issues: [
      "Missing identity verification",
      "Incomplete address verification",
    ],
    dueDate: "2024-03-20",
    lastChecked: "2024-03-11",
    assignedTo: "Mike Lender",
    riskLevel: "high",
  },
  {
    id: "LC-003",
    loanId: "LOAN-003",
    borrower: "Robert Johnson",
    checkType: "Fair Lending",
    status: "pending",
    issues: [],
    dueDate: "2024-03-25",
    lastChecked: "2024-03-12",
    assignedTo: "Emily Lender",
    riskLevel: "medium",
  },
  {
    id: "LC-004",
    loanId: "LOAN-004",
    borrower: "Maria Garcia",
    checkType: "TILA Disclosure",
    status: "compliant",
    issues: [],
    dueDate: "2024-03-18",
    lastChecked: "2024-03-13",
    assignedTo: "John Lender",
    riskLevel: "low",
  },
];

export default function Compliance() {
  const [complianceChecks, setComplianceChecks] = useState<ComplianceCheck[]>(
    initialComplianceChecks
  );
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleNewComplianceCheck = (check: ComplianceCheck) => {
    setComplianceChecks((prev) => [...prev, check]);
    setIsFormOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return <Badge className="bg-green-100 text-green-700">Compliant</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>;
      case "flagged":
        return <Badge className="bg-red-100 text-red-700">Flagged</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getRiskLevelBadge = (level: string) => {
    switch (level) {
      case "low":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Low Risk
          </Badge>
        );
      case "medium":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
            Medium Risk
          </Badge>
        );
      case "high":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700">
            High Risk
          </Badge>
        );
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  const columns: ColumnDef<ComplianceCheck>[] = [
    createSortableColumn("id", "Check ID"),
    createSortableColumn("loanId", "Loan ID"),
    createSortableColumn("borrower", "Borrower"),
    createSortableColumn("checkType", "Check Type"),
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: true,
      cell: ({ row }: { row: { getValue: (key: string) => string } }) => {
        const status = row.getValue("status");
        return getStatusBadge(status);
      },
    },
    {
      accessorKey: "riskLevel",
      header: "Risk Level",
      enableSorting: true,
      cell: ({ row }: { row: { getValue: (key: string) => string } }) => {
        const riskLevel = row.getValue("riskLevel");
        return getRiskLevelBadge(riskLevel);
      },
    },
    {
      accessorKey: "issues",
      header: "Issues",
      cell: ({ row }: { row: { getValue: (key: string) => string[] } }) => {
        const issues = row.getValue("issues");
        return issues.length > 0 ? (
          <div className="space-y-1">
            {issues.map((issue: string, index: number) => (
              <div key={index} className="text-sm text-red-600">
                • {issue}
              </div>
            ))}
          </div>
        ) : (
          <span className="text-sm text-green-600">No issues</span>
        );
      },
    },
    createSortableColumn("dueDate", "Due Date"),
    createSortableColumn("lastChecked", "Last Checked"),
    createSortableColumn("assignedTo", "Assigned To"),
    createActionsColumn<ComplianceCheck>([
      {
        label: "Review",
        onClick: (check) => console.log("Review compliance:", check.id),
      },
      {
        label: "Update Status",
        onClick: (check) => console.log("Update status:", check.id),
      },
      {
        label: "Flag Issues",
        onClick: (check) => console.log("Flag issues:", check.id),
        variant: "destructive",
      },
    ]),
  ];

  const compliantCount = complianceChecks.filter(
    (check) => check.status === "compliant"
  ).length;
  const flaggedCount = complianceChecks.filter(
    (check) => check.status === "flagged"
  ).length;
  const pendingCount = complianceChecks.filter(
    (check) => check.status === "pending"
  ).length;
  const complianceRate = Math.round(
    (compliantCount / complianceChecks.length) * 100
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Lender Compliance Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage compliance checks for lending operations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download size={16} />
            Export Report
          </Button>
          <Button onClick={() => setIsFormOpen(true)}>
            New Compliance Check
          </Button>
        </div>
      </div>

      {/* Compliance Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield size={16} />
                <span>Overall Compliance</span>
              </div>
              <div className="text-2xl font-bold">{complianceRate}%</div>
              <div className="text-sm text-green-600">
                {compliantCount} of {complianceChecks.length} compliant
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText size={16} />
                <span>Total Checks</span>
              </div>
              <div className="text-2xl font-bold">
                {complianceChecks.length}
              </div>
              <div className="text-sm text-muted-foreground">Active checks</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertCircle size={16} />
                <span>Flagged Issues</span>
              </div>
              <div className="text-2xl font-bold text-red-600">
                {flaggedCount}
              </div>
              <div className="text-sm text-red-600">Require attention</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertCircle size={16} />
                <span>Pending Reviews</span>
              </div>
              <div className="text-2xl font-bold text-yellow-600">
                {pendingCount}
              </div>
              <div className="text-sm text-yellow-600">Awaiting review</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <DataTable
        columns={columns}
        data={complianceChecks}
        searchKey="borrower"
      />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>New Lender Compliance Check</DialogTitle>
          </DialogHeader>
          <ComplianceForm onSubmit={handleNewComplianceCheck} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
