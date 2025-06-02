import { FC, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Eye } from "lucide-react";
import {
  DataTable,
  createSortableColumn,
  createActionsColumn,
} from "@/components/common/table";
import { ColumnDef } from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Deal interface
interface Deal {
  id: string;
  name: string;
  amount: string;
  broker: string;
  type: string;
  stage: string;
  daysInStage: number;
}

// Dummy data for deals - flattened for table view
const allDeals: Deal[] = [
  {
    id: "D-001",
    name: "ABC Corp Expansion",
    amount: "$750,000",
    broker: "John Smith",
    type: "Commercial",
    stage: "Under Review",
    daysInStage: 2,
  },
  {
    id: "D-002",
    name: "Tech Solutions Inc",
    amount: "$1,200,000",
    broker: "Sarah Johnson",
    type: "SBA",
    stage: "Under Review",
    daysInStage: 5,
  },
  {
    id: "D-003",
    name: "XYZ Manufacturing",
    amount: "$500,000",
    broker: "Mike Brown",
    type: "Commercial",
    stage: "Pending Documents",
    daysInStage: 3,
  },
  {
    id: "D-004",
    name: "Global Services LLC",
    amount: "$2,000,000",
    broker: "Lisa Chen",
    type: "Commercial",
    stage: "Approved",
    daysInStage: 1,
  },
  {
    id: "D-005",
    name: "Startup Innovations",
    amount: "$300,000",
    broker: "David Wilson",
    type: "SBA",
    stage: "Declined",
    daysInStage: 0,
  },
];

const getStageBadge = (stage: string) => {
  switch (stage) {
    case "Under Review":
      return <Badge className="bg-blue-100 text-blue-700">Under Review</Badge>;
    case "Pending Documents":
      return (
        <Badge className="bg-orange-100 text-orange-700">
          Pending Documents
        </Badge>
      );
    case "Approved":
      return <Badge className="bg-green-100 text-green-700">Approved</Badge>;
    case "Declined":
      return <Badge className="bg-red-100 text-red-700">Declined</Badge>;
    default:
      return <Badge>{stage}</Badge>;
  }
};

const getTypeBadge = (type: string) => {
  switch (type) {
    case "Commercial":
      return (
        <Badge
          variant="outline"
          className="bg-purple-50 text-purple-700 border-purple-200"
        >
          Commercial
        </Badge>
      );
    case "SBA":
      return (
        <Badge
          variant="outline"
          className="bg-emerald-50 text-emerald-700 border-emerald-200"
        >
          SBA
        </Badge>
      );
    default:
      return <Badge variant="outline">{type}</Badge>;
  }
};

const DealPipeline: FC = () => {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleViewDeal = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsViewModalOpen(true);
  };

  const closeModal = () => {
    setIsViewModalOpen(false);
    setSelectedDeal(null);
  };

  // Define table columns
  const columns: ColumnDef<Deal>[] = [
    createSortableColumn("id", "Deal ID"),
    createSortableColumn("name", "Deal Name"),
    createSortableColumn("amount", "Amount", (deal: Deal) => (
      <span className="font-medium">{deal.amount}</span>
    )),
    createSortableColumn("broker", "Broker"),
    createSortableColumn("type", "Type", (deal: Deal) =>
      getTypeBadge(deal.type)
    ),
    createSortableColumn("stage", "Stage", (deal: Deal) =>
      getStageBadge(deal.stage)
    ),
    createSortableColumn("daysInStage", "Days in Stage", (deal: Deal) => (
      <span className="text-sm">{deal.daysInStage} days</span>
    )),
    createActionsColumn<Deal>([
      {
        label: "View Details",
        onClick: handleViewDeal,
      },
    ]),
  ];

  // Filter options
  const filterableColumns = [
    {
      id: "stage",
      title: "Stage",
      options: [
        { label: "Under Review", value: "Under Review" },
        { label: "Pending Documents", value: "Pending Documents" },
        { label: "Approved", value: "Approved" },
        { label: "Declined", value: "Declined" },
      ],
    },
    {
      id: "type",
      title: "Type",
      options: [
        { label: "Commercial", value: "Commercial" },
        { label: "SBA", value: "SBA" },
      ],
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-6">
        <DataTable
          columns={columns}
          data={allDeals}
          searchKey="name"
          title="Deal Pipeline"
          description="Track and manage your loan deals"
          filterableColumns={filterableColumns}
        />
      </div>

      {/* View Deal Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText size={20} />
              Deal Details - {selectedDeal?.id}
            </DialogTitle>
            <DialogDescription>
              Comprehensive information about the selected deal
            </DialogDescription>
          </DialogHeader>

          {selectedDeal && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Deal Name
                  </label>
                  <p className="text-lg font-medium">{selectedDeal.name}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Deal ID
                  </label>
                  <p className="font-mono">{selectedDeal.id}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Loan Amount
                  </label>
                  <p className="text-2xl font-bold text-green-600">
                    {selectedDeal.amount}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Broker
                  </label>
                  <p className="font-medium">{selectedDeal.broker}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Loan Type
                  </label>
                  <div className="mt-1">{getTypeBadge(selectedDeal.type)}</div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Current Stage
                  </label>
                  <div className="mt-1">
                    {getStageBadge(selectedDeal.stage)}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Time in Current Stage
                  </label>
                  <p className="text-lg font-medium">
                    {selectedDeal.daysInStage} days
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Status
                  </label>
                  <p
                    className={`font-medium ${
                      selectedDeal.stage === "Approved"
                        ? "text-green-600"
                        : selectedDeal.stage === "Declined"
                        ? "text-red-600"
                        : selectedDeal.stage === "Pending Documents"
                        ? "text-orange-600"
                        : "text-blue-600"
                    }`}
                  >
                    {selectedDeal.stage === "Approved" && "✅ Deal Approved"}
                    {selectedDeal.stage === "Declined" && "❌ Deal Declined"}
                    {selectedDeal.stage === "Pending Documents" &&
                      "📄 Awaiting Documents"}
                    {selectedDeal.stage === "Under Review" && "🔍 Under Review"}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={closeModal}>
              Close
            </Button>
            <Button onClick={closeModal}>
              <Eye size={16} className="mr-2" />
              Edit Deal
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DealPipeline;
