//@ts-nocheck 
import { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileIcon, CheckCircleIcon, XCircleIcon, AlertCircleIcon, FileTextIcon } from "lucide-react";
import { DataTable, createSortableColumn, createActionsColumn } from "@/components/common/table";
import { useNavigate } from 'react-router-dom';

// Define application type
interface Application {
  id: string;
  borrowerName: string;
  submissionDate: string;
  loanAmount: string;
  status: string;
  completeness: number;
  stage: string;
  lender: string | null;
  lastUpdated: string;
  missingDocuments: string[];
}

type TabType = "all" | "active" | "completed" | "rejected" | "drafts";

const ApplicationTable = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("active");
  // Mock applications data
  const applications: Application[] = [
    {
      id: "APP001",
      borrowerName: "John Smith",
      submissionDate: "2023-05-10",
      loanAmount: "$350,000",
      status: "In Progress",
      completeness: 75,
      stage: "Document Collection",
      lender: "FirstBank Lending",
      lastUpdated: "2023-05-15",
      missingDocuments: ["Bank Statements", "Employment Verification"]
    },
    {
      id: "APP002",
      borrowerName: "Sarah Johnson",
      submissionDate: "2023-05-05",
      loanAmount: "$420,000",
      status: "Under Review",
      completeness: 90,
      stage: "Underwriting",
      lender: "HomeLoans Inc.",
      lastUpdated: "2023-05-14",
      missingDocuments: ["Property Appraisal"]
    },
    {
      id: "APP003",
      borrowerName: "Michael Davis",
      submissionDate: "2023-04-28",
      loanAmount: "$275,000",
      status: "Approved",
      completeness: 100,
      stage: "Closing",
      lender: "FirstBank Lending",
      lastUpdated: "2023-05-12",
      missingDocuments: []
    },
    {
      id: "APP004",
      borrowerName: "Emma Wilson",
      submissionDate: "2023-05-01",
      loanAmount: "$380,000",
      status: "Rejected",
      completeness: 85,
      stage: "N/A",
      lender: "Secure Mortgage Co.",
      lastUpdated: "2023-05-11",
      missingDocuments: []
    },
    {
      id: "APP005",
      borrowerName: "Robert Brown",
      submissionDate: "2023-05-12",
      loanAmount: "$550,000",
      status: "Draft",
      completeness: 40,
      stage: "Pre-Qualification",
      lender: null,
      lastUpdated: "2023-05-12",
      missingDocuments: ["Income Verification", "Credit Report", "Property Details", "Down Payment Proof"]
    }
  ];



  const getStatusBadgeClass = (status: string): string => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Under Review":
        return "bg-purple-100 text-purple-800";
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case "Pre-Qualification":
        return <AlertCircleIcon className="h-4 w-4 text-gray-500" />;
      case "Document Collection":
        return <FileIcon className="h-4 w-4 text-blue-500" />;
      case "Underwriting":
        return <FileTextIcon className="h-4 w-4 text-purple-500" />;
      case "Closing":
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
      case "N/A":
        return <XCircleIcon className="h-4 w-4 text-red-500" />;
      default:
        return <FileTextIcon className="h-4 w-4" />;
    }
  };

  // Define columns for the DataTable
  const columns = useMemo(() => [
    createSortableColumn("id", "ID"),
    createSortableColumn("borrowerName", "Borrower"),
    createSortableColumn("submissionDate", "Submission Date"),
    createSortableColumn("loanAmount", "Amount"),
    {
      accessorKey: "lender",
      header: "Lender",
      cell: ({ row }) => <div>{(row.original as Application).lender || "—"}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = (row.original as Application).status;
        return (
          <Badge variant="outline" className={getStatusBadgeClass(status)}>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "stage",
      header: "Stage",
      cell: ({ row }) => {
        const stage = (row.original as Application).stage;
        return (
          <div className="flex items-center gap-1">
            {getStageIcon(stage)}
            <span>{stage}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "completeness",
      header: "Completeness",
      cell: ({ row }) => {
        const completeness = (row.original as Application).completeness;
        return (
          <div className="flex items-center">
            <span className="mr-2">{completeness}%</span>
            <div className="w-16 bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${completeness >= 90 ? 'bg-green-600' :
                  completeness >= 70 ? 'bg-blue-600' :
                    completeness >= 40 ? 'bg-yellow-600' :
                      'bg-red-600'
                  }`}
                style={{ width: `${completeness}%` }}
              />
            </div>
          </div>
        );
      },
    },
    createActionsColumn([
      {
        label: "View Details",
        onClick: (app: unknown) => console.log("View application", (app as Application).id)
      },
      {
        label: "Edit",
        onClick: (app: unknown) => console.log("Edit application", (app as Application).id)
      },
      {
        label: "Send Message",
        onClick: (app: unknown) => console.log("Message about application", (app as Application).id)
      }
    ])
  ], []);

  // Tab title mapping
  const tabTitles: Record<TabType, string> = {
    all: "All Applications",
    active: "Active Applications",
    completed: "Completed Applications",
    rejected: "Rejected Applications",
    drafts: "Draft Applications"
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={applications}
        searchKey="borrowerName"
        title={tabTitles[activeTab]}
        description={`Manage your loan applications`}
        filterableColumns={[
          {
            id: "status",
            title: "Status",
            options: [
              { label: "In Progress", value: "In Progress" },
              { label: "Under Review", value: "Under Review" },
              { label: "Approved", value: "Approved" },
              { label: "Rejected", value: "Rejected" },
              { label: "Draft", value: "Draft" }
            ]
          },
          {
            id: "lender",
            title: "Lender",
            options: [
              { label: "FirstBank Lending", value: "FirstBank Lending" },
              { label: "HomeLoans Inc.", value: "HomeLoans Inc." },
              { label: "Secure Mortgage Co.", value: "Secure Mortgage Co." }
            ]
          }
        ]}
        actionButtonText="Create New Application"
        actionButtonIcon={<FileIcon className="mr-2 h-4 w-4" />}
        onActionButtonClick={() => navigate("/broker/application/add")}
      />

      {/* Application AI Insights Card */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>AI Insights & Recommendations</CardTitle>
          <CardDescription>AI-powered suggestions to improve application success rates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg border-primary">
              <div className="flex gap-3">
                <div className="p-2 bg-primary rounded-lg">
                  <AlertCircleIcon className="h-5 w-5 text-primary-foreground " />
                </div>
                <div>
                  <h3 className="font-medium">Application Completeness Alert</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Robert Brown's application (APP005) is only 40% complete. Critical documents are missing that may delay processing.
                  </p>
                  <Button variant="link" className="p-0 mt-2 h-auto">Send reminder</Button>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg border-success">
              <div className="flex gap-3">
                <div className=" p-2 bg-success rounded-lg">
                  <CheckCircleIcon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-medium">Application Success Probability</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Sarah Johnson's application (APP002) has a 92% chance of approval based on current documentation and lender criteria.
                  </p>
                  <Button variant="link" className="p-0 text-success/100 mt-2 h-auto">View full analysis</Button>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <FileTextIcon className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium">Lender Match Recommendation</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on John Smith's application details, 3 additional lenders match his profile with potentially better rates.
                  </p>
                  <Button variant="link" className="p-0 mt-2 h-auto">View matches</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ApplicationTable;