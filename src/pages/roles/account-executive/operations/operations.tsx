import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/common/table";
import { createSortableColumn, createActionsColumn } from "@/components/common/table";
import { Button } from "@/components/ui/button";
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

// Mock data for support tickets
const supportTickets: SupportTicket[] = [
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

// Operations summary statistics
const operationsStats = {
  totalTickets: 24,
  openTickets: 8,
  resolvedTickets: 16,
  averageResolutionTime: "2.5 days",
  activeSupportStaff: 5,
};

const OperationsSupport: FC = () => {
  const navigate = useNavigate();

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
        <Button onClick={() => navigate("/account-executive/operations/new-ticket")}>
          <Plus className="mr-2 h-4 w-4" />
          New Support Ticket
        </Button>
      </div>

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
                  { label: "All", value: "all" },
                  { label: "High", value: "High" },
                  { label: "Medium", value: "Medium" },
                  { label: "Low", value: "Low" },
                ],
              },
              {
                id: "status",
                title: "Status",
                options: [
                  { label: "All", value: "all" },
                  { label: "Open", value: "Open" },
                  { label: "In Progress", value: "In Progress" },
                  { label: "Resolved", value: "Resolved" },
                ],
              },
            ]}
          />
        </CardContent>
      </Card>

      {/* Quick Actions Card */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common operations and support tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2"
              onClick={() => navigate("/account-executive/operations/schedule-training")}
            >
              <Briefcase className="h-6 w-6" />
              <span>Schedule Training</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2"
              onClick={() => navigate("/account-executive/operations/resources")}
            >
              <MessageSquare className="h-6 w-6" />
              <span>Resource Library</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2"
              onClick={() => navigate("/account-executive/operations/team")}
            >
              <Users className="h-6 w-6" />
              <span>Support Team</span>
            </Button>
          </div>
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