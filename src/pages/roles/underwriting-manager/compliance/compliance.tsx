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
};

// Initial mock data
const initialComplianceChecks: ComplianceCheck[] = [
  {
    id: "COMP-001",
    loanId: "LOAN-001",
    borrower: "John Smith",
    checkType: "Regulatory",
    status: "compliant",
    issues: [],
    dueDate: "2024-03-15",
    lastChecked: "2024-03-10",
    assignedTo: "Sarah Johnson",
  },
  {
    id: "COMP-002",
    loanId: "LOAN-002",
    borrower: "Jane Doe",
    checkType: "Documentation",
    status: "flagged",
    issues: ["Missing income verification", "Incomplete property appraisal"],
    dueDate: "2024-03-20",
    lastChecked: "2024-03-11",
    assignedTo: "Mike Wilson",
  },
];

export default function CompliancePage() {
  const [complianceChecks, setComplianceChecks] = useState<ComplianceCheck[]>(
    initialComplianceChecks
  );
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleNewComplianceCheck = (check: ComplianceCheck) => {
    setComplianceChecks((prev) => [...prev, check]);
    setIsFormOpen(false);
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
        return (
          <Badge
            variant={
              status === "compliant"
                ? "success"
                : status === "flagged"
                ? "destructive"
                : "secondary"
            }
          >
            {status}
          </Badge>
        );
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
              <div key={index} className="text-sm text-destructive">
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Compliance Checks</h1>
          <p className="text-muted-foreground">
            Manage and track compliance checks for loan applications
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          New Compliance Check
        </Button>
      </div>

      {/* Compliance Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Checks
          </h3>
          <p className="text-2xl font-bold">{complianceChecks.length}</p>
        </div>
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="text-sm font-medium text-muted-foreground">
            Compliant
          </h3>
          <p className="text-2xl font-bold text-green-600">
            {
              complianceChecks.filter((check) => check.status === "compliant")
                .length
            }
          </p>
        </div>
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="text-sm font-medium text-muted-foreground">Flagged</h3>
          <p className="text-2xl font-bold text-destructive">
            {
              complianceChecks.filter((check) => check.status === "flagged")
                .length
            }
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={complianceChecks}
        searchKey="borrower"
      />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>New Compliance Check</DialogTitle>
          </DialogHeader>
          <ComplianceForm onSubmit={handleNewComplianceCheck} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
