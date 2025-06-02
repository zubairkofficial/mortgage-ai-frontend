import { FC, useState } from "react";
import { DataTable } from "@/components/common/table";
import {
  createSortableColumn,
  createActionsColumn,
} from "@/components/common/table";
import { Button } from "@/components/ui/button";
import { FileCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoanValidationForm } from "./loan-validation-form";

// Types for loan files
type LoanFile = {
  id: string;
  borrower: string;
  loanType: string;
  amount: string;
  status: "pending" | "verified" | "flagged";
  documents: {
    income: "verified" | "pending" | "flagged";
    credit: "verified" | "pending" | "flagged";
    property: "verified" | "pending" | "flagged";
    compliance: "verified" | "pending" | "flagged";
  };
  submittedDate: string;
  lastUpdated: string;
};

// Initial mock data
const initialLoanFiles: LoanFile[] = [
  {
    id: "LOAN-001",
    borrower: "John Smith",
    loanType: "Commercial",
    amount: "$500,000",
    status: "pending",
    documents: {
      income: "verified",
      credit: "pending",
      property: "verified",
      compliance: "flagged",
    },
    submittedDate: "2024-03-15",
    lastUpdated: "2024-03-16",
  },
  {
    id: "LOAN-002",
    borrower: "Sarah Johnson",
    loanType: "Residential",
    amount: "$350,000",
    status: "verified",
    documents: {
      income: "verified",
      credit: "verified",
      property: "verified",
      compliance: "verified",
    },
    submittedDate: "2024-03-14",
    lastUpdated: "2024-03-15",
  },
];

const LoanValidationPage: FC = () => {
  const [loanFiles, setLoanFiles] = useState<LoanFile[]>(initialLoanFiles);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleNewValidation = (newLoan: LoanFile) => {
    setLoanFiles((prev) => [...prev, newLoan]);
    setIsFormOpen(false);
  };

  const columns = [
    createSortableColumn("id", "Loan ID"),
    createSortableColumn("borrower", "Borrower"),
    createSortableColumn("loanType", "Loan Type"),
    createSortableColumn("amount", "Amount"),
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: { getValue: (key: string) => string } }) => {
        const status = row.getValue("status");
        return (
          <Badge
            variant={
              status === "verified"
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
      accessorKey: "documents",
      header: "Document Status",
      cell: ({ row }: { row: { getValue: (key: string) => any } }) => {
        const docs = row.getValue("documents");
        return (
          <div className="flex gap-2">
            {Object.entries(docs).map(([key, value]) => (
              <Badge
                key={key}
                variant={
                  value === "verified"
                    ? "success"
                    : value === "pending"
                    ? "secondary"
                    : "destructive"
                }
                className="capitalize"
              >
                {key}
              </Badge>
            ))}
          </div>
        );
      },
    },
    createSortableColumn("submittedDate", "Submitted Date"),
    createSortableColumn("lastUpdated", "Last Updated"),
    createActionsColumn([
      {
        label: "Review Documents",
        onClick: (data: LoanFile) => {
          console.log("Review documents for:", data.id);
          // Implement document review logic
        },
      },
      {
        label: "Verify Documents",
        onClick: (data: LoanFile) => {
          console.log("Verify documents for:", data.id);
          // Implement document verification logic
        },
      },
      {
        label: "Flag Issues",
        onClick: (data: LoanFile) => {
          console.log("Flag issues for:", data.id);
          // Implement issue flagging logic
        },
        variant: "destructive",
      },
    ]),
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Loan File Validation
          </h1>
          <p className="text-muted-foreground">
            Access and validate borrower loan files and submitted documentation
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <FileCheck className="mr-2 h-4 w-4" />
          New Validation
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={loanFiles}
        searchKey="borrower"
        title="Loan Files"
        description="Review and validate loan documentation"
        filterableColumns={[
          {
            id: "status",
            title: "Status",
            options: [
              { label: "Pending", value: "pending" },
              { label: "Verified", value: "verified" },
              { label: "Flagged", value: "flagged" },
            ],
          },
          {
            id: "loanType",
            title: "Loan Type",
            options: [
              { label: "Commercial", value: "Commercial" },
              { label: "Residential", value: "Residential" },
            ],
          },
        ]}
      />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-h-[90vh] max-w-[70vw] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>New Loan Validation</DialogTitle>
          </DialogHeader>
          <LoanValidationForm onSubmit={handleNewValidation} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoanValidationPage;
