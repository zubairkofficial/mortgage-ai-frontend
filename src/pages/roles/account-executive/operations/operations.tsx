import { FC, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/common/table";
import { createSortableColumn, createActionsColumn } from "@/components/common/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageSquare, Clock, CheckCircle2, AlertCircle, Users, Briefcase, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Row, ColumnDef } from "@tanstack/react-table";

// Define the type for support ticket data
interface SupportTicket {
  id: string;
  broker: string;
  type: string;
  priority: "High" | "Medium" | "Low";
  description: string;
  status: "Open" | "In Progress" | "Resolved";
  assignedTo: string;
  createdAt: string;
  lastUpdated: string;
}

// Define the type for new ticket form data
interface NewTicketForm {
  broker: string;
  type: string;
  priority: "High" | "Medium" | "Low";
  description: string;
  assignedTo: string;
}

// Initial mock data for support tickets
const initialSupportTickets: SupportTicket[] = [
  {
    id: "TKT001",
    broker: "ABC Mortgage",
    type: "Technical Support",
    priority: "High",
    description: "System access issues for multiple brokers",
    status: "Open",
    assignedTo: "John Smith",
    createdAt: "2024-03-15",
    lastUpdated: "2024-03-15",
  },
  {
    id: "TKT002",
    broker: "XYZ Lending",
    type: "Training Request",
    priority: "Medium",
    description: "Request for loan structuring training session",
    status: "In Progress",
    assignedTo: "Sarah Johnson",
    createdAt: "2024-03-14",
    lastUpdated: "2024-03-16",
  },
  // Add more mock data as needed
];

// Define columns for the support tickets table
const columns: ColumnDef<SupportTicket>[] = [
  createSortableColumn("id", "Ticket ID"),
  createSortableColumn("broker", "Broker"),
  createSortableColumn("type", "Ticket Type"),
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }: { row: Row<SupportTicket> }) => {
      const priority = row.original.priority;
      return (
        <span className={`px-2 py-1 rounded-full text-xs ${
          priority === "High" ? "bg-red-100 text-red-800" :
          priority === "Medium" ? "bg-yellow-100 text-yellow-800" :
          "bg-green-100 text-green-800"
        }`}>
          {priority}
        </span>
      );
    },
  },
  createSortableColumn("description", "Description"),
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: Row<SupportTicket> }) => {
      const status = row.original.status;
      return (
        <span className={`px-2 py-1 rounded-full text-xs ${
          status === "Open" ? "bg-red-100 text-red-800" :
          status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
          "bg-green-100 text-green-800"
        }`}>
          {status}
        </span>
      );
    },
  },
  createSortableColumn("assignedTo", "Assigned To"),
  createSortableColumn("lastUpdated", "Last Updated"),
  createActionsColumn([
    {
      label: "View Details",
      onClick: (data: SupportTicket) => console.log("View details for", data.id),
    },
    {
      label: "Update Status",
      onClick: (data: SupportTicket) => console.log("Update status for", data.id),
    },
    {
      label: "Reassign",
      onClick: (data: SupportTicket) => console.log("Reassign", data.id),
    },
  ]),
];

const OperationsSupport: FC = () => {
  const navigate = useNavigate();
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(initialSupportTickets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<NewTicketForm>({
    broker: "",
    type: "",
    priority: "Medium",
    description: "",
    assignedTo: "",
  });

  // Generate new ticket ID
  const generateTicketId = () => {
    const lastTicket = supportTickets.reduce((max, ticket) => {
      const num = parseInt(ticket.id.replace('TKT', ''));
      return num > max ? num : max;
    }, 0);
    return `TKT${String(lastTicket + 1).padStart(3, '0')}`;
  };

  // Handle form input changes
  const handleInputChange = (field: keyof NewTicketForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle form submission
  const handleSubmitTicket = () => {
    if (!formData.broker || !formData.type || !formData.description || !formData.assignedTo) {
      alert("Please fill in all required fields");
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];
    const newTicket: SupportTicket = {
      id: generateTicketId(),
      broker: formData.broker,
      type: formData.type,
      priority: formData.priority,
      description: formData.description,
      status: "Open",
      assignedTo: formData.assignedTo,
      createdAt: currentDate,
      lastUpdated: currentDate,
    };

    setSupportTickets(prev => [newTicket, ...prev]);
    setIsModalOpen(false);
    setFormData({
      broker: "",
      type: "",
      priority: "Medium",
      description: "",
      assignedTo: "",
    });
  };

  // Operations summary statistics - calculate dynamically
  const operationsStats = {
    totalTickets: supportTickets.length,
    openTickets: supportTickets.filter(ticket => ticket.status === "Open").length,
    resolvedTickets: supportTickets.filter(ticket => ticket.status === "Resolved").length,
    averageResolutionTime: "2.5 days",
    activeSupportStaff: 5,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Operations Support</h1>
          <p className="text-muted-foreground">
            Manage and track support tickets, escalations, and operational issues
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Support Ticket
        </Button>
      </div>

      {/* New Support Ticket Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Create New Support Ticket</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new support ticket for your broker network.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="broker">Broker Name *</Label>
              <Input
                id="broker"
                value={formData.broker}
                onChange={(e) => handleInputChange("broker", e.target.value)}
                placeholder="Enter broker name..."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Ticket Type *</Label>
              <Select onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ticket type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technical Support">Technical Support</SelectItem>
                  <SelectItem value="Training Request">Training Request</SelectItem>
                  <SelectItem value="Account Issue">Account Issue</SelectItem>
                  <SelectItem value="Integration Support">Integration Support</SelectItem>
                  <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <Select onValueChange={(value: "High" | "Medium" | "Low") => handleInputChange("priority", value)} defaultValue="Medium">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assignedTo">Assigned To *</Label>
              <Select onValueChange={(value) => handleInputChange("assignedTo", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select support staff" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="John Smith">John Smith</SelectItem>
                  <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                  <SelectItem value="Mike Wilson">Mike Wilson</SelectItem>
                  <SelectItem value="Emily Davis">Emily Davis</SelectItem>
                  <SelectItem value="Alex Brown">Alex Brown</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description *</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange("description", e.target.value)}
                placeholder="Describe the issue or request in detail..."
                className="min-h-[100px] flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitTicket}>
              Create Ticket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{operationsStats.totalTickets}</div>
            <p className="text-xs text-muted-foreground">
              {operationsStats.openTickets} open tickets
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Tickets</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{operationsStats.resolvedTickets}</div>
            <p className="text-xs text-muted-foreground">
              Successfully addressed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Resolution Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{operationsStats.averageResolutionTime}</div>
            <p className="text-xs text-muted-foreground">
              For resolved tickets
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Support Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{operationsStats.activeSupportStaff}</div>
            <p className="text-xs text-muted-foreground">
              Available for support
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Support Tickets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Support Tickets</CardTitle>
          <CardDescription>
            Monitor and manage support tickets across your broker network
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={supportTickets}
            searchKey="broker"
            filterableColumns={[
              {
                id: "priority",
                title: "Priority",
                options: [
                  { label: "High", value: "High" },
                  { label: "Medium", value: "Medium" },
                  { label: "Low", value: "Low" },
                ],
              },
              {
                id: "status",
                title: "Status",
                options: [
                  { label: "Open", value: "Open" },
                  { label: "In Progress", value: "In Progress" },
                  { label: "Resolved", value: "Resolved" },
                ],
              },
            ]}
          />
        </CardContent>
      </Card>

      {/* Recent Activity Card */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest updates and actions in the operations support system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
              <div>
                <h4 className="font-medium mb-1">Ticket Resolved</h4>
                <p className="text-sm text-muted-foreground">
                  Technical support ticket TKT001 has been resolved by John Smith
                </p>
                <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-500 mt-1" />
              <div>
                <h4 className="font-medium mb-1">New Training Request</h4>
                <p className="text-sm text-muted-foreground">
                  XYZ Lending has requested a loan structuring training session
                </p>
                <p className="text-xs text-muted-foreground mt-1">4 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OperationsSupport; 