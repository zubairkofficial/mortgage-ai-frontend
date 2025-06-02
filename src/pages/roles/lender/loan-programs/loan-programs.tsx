import { FC, useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { DataTable, createActionsColumn } from "@/components/common/table";
import { ColumnDef } from "@tanstack/react-table";
import { LoanProgramForm } from "./loan-program-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Types
type LoanProgram = {
  id: string;
  name: string;
  type: string;
  minAmount: string;
  maxAmount: string;
  term: string;
  rate: string;
  status: "Active" | "Inactive";
  riskCriteria: string;
};

// Dummy data for loan programs
const initialLoanPrograms: LoanProgram[] = [
  {
    id: "LP-001",
    name: "Commercial Real Estate",
    type: "Commercial",
    minAmount: "$250,000",
    maxAmount: "$5,000,000",
    term: "5-25 years",
    rate: "6.5% - 8.5%",
    status: "Active",
    riskCriteria: "LTV ≤ 75%, DSCR ≥ 1.25",
  },
  {
    id: "LP-002",
    name: "SBA 7(a)",
    type: "SBA",
    minAmount: "$50,000",
    maxAmount: "$5,000,000",
    term: "10-25 years",
    rate: "Prime + 2.75%",
    status: "Active",
    riskCriteria: "Credit Score ≥ 680, Business Plan Required",
  },
  {
    id: "LP-003",
    name: "Bridge Loan",
    type: "Commercial",
    minAmount: "$500,000",
    maxAmount: "$10,000,000",
    term: "6-24 months",
    rate: "8.5% - 12%",
    status: "Active",
    riskCriteria: "Exit Strategy Required, LTV ≤ 65%",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Active":
      return <Badge className="bg-green-100 text-green-700">Active</Badge>;
    case "Inactive":
      return <Badge className="bg-gray-100 text-gray-700">Inactive</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const LoanPrograms: FC = () => {
  const [loanPrograms, setLoanPrograms] =
    useState<LoanProgram[]>(initialLoanPrograms);
  const [showForm, setShowForm] = useState(false);
  const [editingProgram, setEditingProgram] = useState<LoanProgram | null>(
    null
  );

  // Debug effect to monitor data changes
  useEffect(() => {
    console.log("Loan programs data changed:", loanPrograms);
  }, [loanPrograms]);

  // Define columns for the DataTable
  const columns: ColumnDef<LoanProgram>[] = [
    {
      accessorKey: "id",
      header: "Program ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "amountRange",
      header: "Amount Range",
      cell: ({ row }) =>
        `${row.original.minAmount} - ${row.original.maxAmount}`,
    },
    {
      accessorKey: "term",
      header: "Term",
    },
    {
      accessorKey: "rate",
      header: "Rate",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => getStatusBadge(row.original.status),
    },
    {
      accessorKey: "riskCriteria",
      header: "Risk Criteria",
      cell: ({ row }) => (
        <div
          className="max-w-[200px] truncate"
          title={row.original.riskCriteria}
        >
          {row.original.riskCriteria}
        </div>
      ),
    },
    createActionsColumn<LoanProgram>([
      {
        label: "Edit",
        onClick: (program) => {
          setEditingProgram(program);
          setShowForm(true);
        },
      },
      {
        label: "Delete",
        onClick: (program) => {
          setLoanPrograms((prev) => prev.filter((p) => p.id !== program.id));
        },
        variant: "destructive",
      },
    ]),
  ];

  // Filter options for the DataTable
  const filterableColumns = [
    {
      id: "type",
      title: "Type",
      options: [
        { label: "Commercial", value: "Commercial" },
        { label: "SBA", value: "SBA" },
        { label: "Residential", value: "Residential" },
      ],
    },
    {
      id: "status",
      title: "Status",
      options: [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
    },
  ];

  const handleAddProgram = () => {
    setEditingProgram(null);
    setShowForm(true);
  };

  const handleFormSubmit = (program: LoanProgram) => {

    if (editingProgram) {
      // Update existing program
      setLoanPrograms((prev) => {
        const updated = prev.map((p) =>
          p.id === editingProgram.id ? program : p
        );
        return updated;
      });
    } else {
      // Add new program
      setLoanPrograms((prev) => {
        const updated = [...prev, program];
        console.log("Updated loan programs (new):", updated);
        return updated;
      });
    }
    setShowForm(false);
    setEditingProgram(null);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Debug info */}
      <div className="text-xs text-gray-400">
        Debug: Showing {loanPrograms.length} loan programs | Last updated:{" "}
        {new Date().toLocaleTimeString()}
      </div>

      <DataTable
        key={`programs-${loanPrograms.map((p) => p.id).join("-")}`}
        columns={columns}
        data={[...loanPrograms]}
        searchKey="name"
        title="Loan Programs"
        description="Manage and update loan program criteria"
        filterableColumns={filterableColumns}
        actionButtonText="Add New Program"
        actionButtonIcon={<Plus size={16} className="mr-2" />}
        onActionButtonClick={handleAddProgram}
      />

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-5xl w-[95vw] h-[95vh] flex flex-col p-0">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle className="text-2xl font-semibold">
              {editingProgram ? "Edit Loan Program" : "Add New Loan Program"}
            </DialogTitle>
            <DialogDescription>
              {editingProgram
                ? "Update loan program details"
                : "Create a new loan program with specific criteria"}
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-hidden px-6 py-4">
            <LoanProgramForm
              onSubmit={handleFormSubmit}
              initialData={editingProgram}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoanPrograms;
