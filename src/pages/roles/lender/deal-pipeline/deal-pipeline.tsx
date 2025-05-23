import { FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, AlertCircle, Filter } from 'lucide-react';

// Dummy data for deals
const deals = {
    "Under Review": [
        {
            id: "D-001",
            name: "ABC Corp Expansion",
            amount: "$750,000",
            broker: "John Smith",
            type: "Commercial",
            riskScore: "Low",
            daysInStage: 2,
        },
        {
            id: "D-002",
            name: "Tech Solutions Inc",
            amount: "$1,200,000",
            broker: "Sarah Johnson",
            type: "SBA",
            riskScore: "Medium",
            daysInStage: 5,
        },
    ],
    "Pending Documents": [
        {
            id: "D-003",
            name: "XYZ Manufacturing",
            amount: "$500,000",
            broker: "Mike Brown",
            type: "Commercial",
            riskScore: "High",
            daysInStage: 3,
        },
    ],
    "Approved": [
        {
            id: "D-004",
            name: "Global Services LLC",
            amount: "$2,000,000",
            broker: "Lisa Chen",
            type: "Commercial",
            riskScore: "Low",
            daysInStage: 1,
        },
    ],
    "Declined": [
        {
            id: "D-005",
            name: "Startup Innovations",
            amount: "$300,000",
            broker: "David Wilson",
            type: "SBA",
            riskScore: "High",
            daysInStage: 0,
        },
    ],
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

const DealPipeline: FC = () => {
    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-2xl font-semibold">Deal Pipeline</CardTitle>
                            <CardDescription>Track and manage your loan deals</CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="gap-2">
                                <Filter size={16} />
                                Filter
                            </Button>
                            <Button variant="outline" className="gap-2">
                                <AlertCircle size={16} />
                                Risk Analysis
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {Object.entries(deals).map(([stage, stageDeals]) => (
                            <div key={stage} className="flex flex-col gap-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-semibold">{stage}</h3>
                                    <Badge variant="outline">{stageDeals.length}</Badge>
                                </div>
                                <div className="flex flex-col gap-3">
                                    {stageDeals.map((deal) => (
                                        <Card key={deal.id} className="p-4">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-medium">{deal.name}</h4>
                                                        <p className="text-sm text-muted-foreground">{deal.id}</p>
                                                    </div>
                                                    {getRiskScoreBadge(deal.riskScore)}
                                                </div>
                                                <div className="text-sm">
                                                    <p>Amount: {deal.amount}</p>
                                                    <p>Broker: {deal.broker}</p>
                                                    <p>Type: {deal.type}</p>
                                                </div>
                                                <div className="flex justify-between items-center mt-2">
                                                    <span className="text-xs text-muted-foreground">
                                                        {deal.daysInStage} days in stage
                                                    </span>
                                                    <Button variant="ghost" size="sm" className="gap-1">
                                                        <FileText size={14} />
                                                        View
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default DealPipeline; 