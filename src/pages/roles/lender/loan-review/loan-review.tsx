import { FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { DataTable, createSortableColumn, createActionsColumn } from "@/components/common/table";
import { Row } from "@tanstack/react-table";

// Define the type for our loan application data
interface LoanApplication {
    id: string;
    broker: string;
    borrower: string;
    amount: string;
    type: string;
    status: string;
    riskScore: string;
    submittedDate: string;
}

// Dummy data for loan applications
const loanApplications: LoanApplication[] = [
    {
        id: "LA-001",
        broker: "John Smith",
        borrower: "ABC Corp",
        amount: "$500,000",
        type: "Commercial",
        status: "Pending Review",
        riskScore: "Low",
        submittedDate: "2024-03-15",
    },
    {
        id: "LA-002",
        broker: "Sarah Johnson",
        borrower: "XYZ LLC",
        amount: "$750,000",
        type: "SBA",
        status: "Under Review",
        riskScore: "Medium",
        submittedDate: "2024-03-14",
    },
    {
        id: "LA-003",
        broker: "Mike Brown",
        borrower: "Tech Solutions Inc",
        amount: "$1,200,000",
        type: "Commercial",
        status: "High Risk",
        riskScore: "High",
        submittedDate: "2024-03-13",
    },
];

const getStatusBadge = (status: string) => {
    switch (status) {
        case "Pending Review":
            return <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Pending Review</Badge>;
        case "Under Review":
            return <Badge variant="outline" className="bg-blue-50 text-blue-700">Under Review</Badge>;
        case "High Risk":
            return <Badge variant="outline" className="bg-red-50 text-red-700">High Risk</Badge>;
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
};

const getRiskScoreBadge = (score: string) => {
    switch (score) {
        case "Low":
            return <Badge className="bg-green-100 text-green-700">Low Risk</Badge>;
        case "Medium":
            return <Badge className="bg-yellow-100 text-yellow-700">Medium Risk</Badge>;
        case "High":
            return <Badge className="bg-red-100 text-red-700">High Risk</Badge>;
        default:
            return <Badge>{score}</Badge>;
    }
};

// Define column definitions
const columns = [
    createSortableColumn<LoanApplication, string>("id", "Application ID"),
    createSortableColumn<LoanApplication, string>("broker", "Broker"),
    createSortableColumn<LoanApplication, string>("borrower", "Borrower"),
    createSortableColumn<LoanApplication, string>("amount", "Amount"),
    createSortableColumn<LoanApplication, string>("type", "Type"),
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }: { row: Row<LoanApplication> }) => getStatusBadge(row.original.status)
    },
    {
        accessorKey: "riskScore",
        header: "Risk Score",
        cell: ({ row }: { row: Row<LoanApplication> }) => getRiskScoreBadge(row.original.riskScore)
    },
    createSortableColumn<LoanApplication, string>("submittedDate", "Submitted Date"),
    createActionsColumn<LoanApplication>([
        {
            label: "Review",
            onClick: (data) => console.log("Review clicked", data)
        },
        {
            label: "View Documents",
            onClick: (data) => console.log("View documents clicked", data)
        },
        {
            label: "Risk Analysis",
            onClick: (data) => console.log("Risk analysis clicked", data)
        }
    ])
];

// Define filterable columns
const filterableColumns = [
    {
        id: "status",
        title: "Status",
        options: [
            { label: "Pending Review", value: "Pending Review" },
            { label: "Under Review", value: "Under Review" },
            { label: "High Risk", value: "High Risk" }
        ]
    },
    {
        id: "riskScore",
        title: "Risk Score",
        options: [
            { label: "Low Risk", value: "Low" },
            { label: "Medium Risk", value: "Medium" },
            { label: "High Risk", value: "High" }
        ]
    },
    {
        id: "type",
        title: "Loan Type",
        options: [
            { label: "Commercial", value: "Commercial" },
            { label: "SBA", value: "SBA" }
        ]
    }
];

const LoanReview: FC = () => {
    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">Loan Application Review</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex gap-4">
                            <Button variant="outline" className="gap-2">
                                <FileText size={16} />
                                View All Documents
                            </Button>
                            <Button variant="outline" className="gap-2">
                                <AlertCircle size={16} />
                                Risk Analysis
                            </Button>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="gap-2">
                                <CheckCircle size={16} />
                                Approve Selected
                            </Button>
                            <Button variant="outline" className="gap-2">
                                <XCircle size={16} />
                                Decline Selected
                            </Button>
                        </div>
                    </div>

                    <DataTable
                        columns={columns}
                        data={loanApplications}
                        searchKey="borrower"
                        filterableColumns={filterableColumns}
                        title="Loan Applications"
                        description="Review and manage loan applications from brokers"
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default LoanReview; 