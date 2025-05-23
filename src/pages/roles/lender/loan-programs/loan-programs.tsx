import { FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, AlertCircle } from 'lucide-react';

// Dummy data for loan programs
const loanPrograms = [
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
    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-2xl font-semibold">Loan Programs</CardTitle>
                            <CardDescription>Manage and update loan program criteria</CardDescription>
                        </div>
                        <Button className="gap-2">
                            <Plus size={16} />
                            Add New Program
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4 mb-6">
                        <Button variant="outline" className="gap-2">
                            <AlertCircle size={16} />
                            Risk Analysis
                        </Button>
                        <Button variant="outline" className="gap-2">
                            Export Programs
                        </Button>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Program ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Amount Range</TableHead>
                                <TableHead>Term</TableHead>
                                <TableHead>Rate</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Risk Criteria</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loanPrograms.map((program) => (
                                <TableRow key={program.id}>
                                    <TableCell className="font-medium">{program.id}</TableCell>
                                    <TableCell>{program.name}</TableCell>
                                    <TableCell>{program.type}</TableCell>
                                    <TableCell>{`${program.minAmount} - ${program.maxAmount}`}</TableCell>
                                    <TableCell>{program.term}</TableCell>
                                    <TableCell>{program.rate}</TableCell>
                                    <TableCell>{getStatusBadge(program.status)}</TableCell>
                                    <TableCell className="max-w-[200px] truncate">{program.riskCriteria}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="icon">
                                                <Edit size={16} />
                                            </Button>
                                            <Button variant="ghost" size="icon">
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoanPrograms; 