import { FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, AlertCircle, Shield, Download, Search } from 'lucide-react';

// Dummy data for audit logs
const auditLogs = [
    {
        id: "AL-001",
        action: "Loan Application Review",
        user: "John Lender",
        details: "Reviewed and approved loan application LA-001",
        timestamp: "2024-03-15 14:30:00",
        status: "Compliant",
        riskLevel: "Low",
    },
    {
        id: "AL-002",
        action: "Document Verification",
        user: "Sarah Lender",
        details: "Verified borrower documents for LA-002",
        timestamp: "2024-03-15 13:15:00",
        status: "Pending Review",
        riskLevel: "Medium",
    },
    {
        id: "AL-003",
        action: "Risk Assessment",
        user: "Mike Lender",
        details: "Completed risk assessment for LA-003",
        timestamp: "2024-03-15 11:45:00",
        status: "Non-Compliant",
        riskLevel: "High",
    },
];

// Dummy data for compliance requirements
const complianceRequirements = [
    {
        id: "CR-001",
        requirement: "Anti-Money Laundering (AML)",
        status: "Compliant",
        lastChecked: "2024-03-14",
        nextCheck: "2024-04-14",
    },
    {
        id: "CR-002",
        requirement: "Know Your Customer (KYC)",
        status: "Compliant",
        lastChecked: "2024-03-13",
        nextCheck: "2024-04-13",
    },
    {
        id: "CR-003",
        requirement: "Fair Lending",
        status: "Review Required",
        lastChecked: "2024-03-12",
        nextCheck: "2024-03-26",
    },
];

const getStatusBadge = (status: string) => {
    switch (status) {
        case "Compliant":
            return <Badge className="bg-green-100 text-green-700">Compliant</Badge>;
        case "Pending Review":
            return <Badge className="bg-yellow-100 text-yellow-700">Pending Review</Badge>;
        case "Non-Compliant":
            return <Badge className="bg-red-100 text-red-700">Non-Compliant</Badge>;
        case "Review Required":
            return <Badge className="bg-orange-100 text-orange-700">Review Required</Badge>;
        default:
            return <Badge>{status}</Badge>;
    }
};

const getRiskLevelBadge = (level: string) => {
    switch (level) {
        case "Low":
            return <Badge variant="outline" className="bg-green-50 text-green-700">Low Risk</Badge>;
        case "Medium":
            return <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Medium Risk</Badge>;
        case "High":
            return <Badge variant="outline" className="bg-red-50 text-red-700">High Risk</Badge>;
        default:
            return <Badge variant="outline">{level}</Badge>;
    }
};

const Compliance: FC = () => {
    return (
        <div className="flex flex-col gap-6">
            {/* Compliance Overview Card */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-2xl font-semibold">Compliance & Audit</CardTitle>
                            <CardDescription>Monitor compliance requirements and audit logs</CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="gap-2">
                                <Download size={16} />
                                Export Report
                            </Button>
                            <Button variant="outline" className="gap-2">
                                <Shield size={16} />
                                Compliance Check
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Shield size={16} />
                                        <span>Overall Compliance</span>
                                    </div>
                                    <div className="text-2xl font-bold">98%</div>
                                    <div className="text-sm text-green-600">+2% from last month</div>
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
                                    <div className="text-2xl font-bold">3</div>
                                    <div className="text-sm text-yellow-600">Due this week</div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <FileText size={16} />
                                        <span>Audit Logs</span>
                                    </div>
                                    <div className="text-2xl font-bold">156</div>
                                    <div className="text-sm text-muted-foreground">This month</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Compliance Requirements Table */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-4">Compliance Requirements</h3>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Requirement</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Last Checked</TableHead>
                                    <TableHead>Next Check</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {complianceRequirements.map((req) => (
                                    <TableRow key={req.id}>
                                        <TableCell className="font-medium">{req.requirement}</TableCell>
                                        <TableCell>{getStatusBadge(req.status)}</TableCell>
                                        <TableCell>{req.lastChecked}</TableCell>
                                        <TableCell>{req.nextCheck}</TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="sm">Review</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Audit Logs Section */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Audit Logs</h3>
                            <div className="flex gap-2">
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search logs..." className="pl-8" />
                                </div>
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Filter by status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="compliant">Compliant</SelectItem>
                                        <SelectItem value="pending">Pending Review</SelectItem>
                                        <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Action</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead>Details</TableHead>
                                    <TableHead>Timestamp</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Risk Level</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {auditLogs.map((log) => (
                                    <TableRow key={log.id}>
                                        <TableCell className="font-medium">{log.action}</TableCell>
                                        <TableCell>{log.user}</TableCell>
                                        <TableCell className="max-w-[300px] truncate">{log.details}</TableCell>
                                        <TableCell>{log.timestamp}</TableCell>
                                        <TableCell>{getStatusBadge(log.status)}</TableCell>
                                        <TableCell>{getRiskLevelBadge(log.riskLevel)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Compliance; 