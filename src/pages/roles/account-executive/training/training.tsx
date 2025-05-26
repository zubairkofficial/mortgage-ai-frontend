import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/table";
import { createSortableColumn, createActionsColumn } from "@/components/common/table";
import { BookOpen, Calendar, Users, Video, FileText, Plus, Clock, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Row, ColumnDef } from "@tanstack/react-table";

// Define the type for training session data
interface TrainingSession {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  duration: string;
  instructor: string;
  attendees: number;
  status: "Scheduled" | "In Progress" | "Completed";
}

// Define the type for training resource data
interface TrainingResource {
  id: string;
  title: string;
  type: string;
  category: string;
  lastUpdated: string;
  downloads: number;
}

// Mock data for training sessions
const trainingSessions: TrainingSession[] = [
  {
    id: "TRN001",
    title: "Loan Structuring Best Practices",
    type: "Webinar",
    date: "2024-03-25",
    time: "10:00 AM",
    duration: "2 hours",
    instructor: "John Smith",
    attendees: 24,
    status: "Scheduled",
  },
  {
    id: "TRN002",
    title: "Compliance Updates 2024",
    type: "Workshop",
    date: "2024-03-28",
    time: "2:00 PM",
    duration: "3 hours",
    instructor: "Sarah Johnson",
    attendees: 18,
    status: "Scheduled",
  },
  // Add more mock data as needed
];

// Define columns for the training sessions table
const columns: ColumnDef<TrainingSession>[] = [
  createSortableColumn("id", "Session ID"),
  createSortableColumn("title", "Session Title"),
  createSortableColumn("type", "Type"),
  createSortableColumn("date", "Date"),
  createSortableColumn("time", "Time"),
  createSortableColumn("duration", "Duration"),
  createSortableColumn("instructor", "Instructor"),
  createSortableColumn("attendees", "Attendees"),
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: Row<TrainingSession> }) => {
      const status = row.original.status;
      return (
        <span className={`px-2 py-1 rounded-full text-xs ${
          status === "Scheduled" ? "bg-green-100 text-green-800" :
          status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
          "bg-gray-100 text-gray-800"
        }`}>
          {status}
        </span>
      );
    },
  },
  createActionsColumn([
    {
      label: "View Details",
      onClick: (data: TrainingSession) => console.log("View details for", data.id),
    },
    {
      label: "Edit",
      onClick: (data: TrainingSession) => console.log("Edit", data.id),
    },
    {
      label: "Cancel",
      onClick: (data: TrainingSession) => console.log("Cancel", data.id),
      variant: "destructive",
    },
  ]),
];

// Mock data for training resources
const trainingResources: TrainingResource[] = [
  {
    id: "RES001",
    title: "Loan Application Process Guide",
    type: "PDF Guide",
    category: "Process",
    lastUpdated: "2024-03-01",
    downloads: 156,
  },
  {
    id: "RES002",
    title: "Compliance Checklist 2024",
    type: "Checklist",
    category: "Compliance",
    lastUpdated: "2024-03-15",
    downloads: 98,
  },
  // Add more mock data as needed
];

// Define columns for the resources table
const resourceColumns: ColumnDef<TrainingResource>[] = [
  createSortableColumn("id", "Resource ID"),
  createSortableColumn("title", "Resource Title"),
  createSortableColumn("type", "Type"),
  createSortableColumn("category", "Category"),
  createSortableColumn("lastUpdated", "Last Updated"),
  createSortableColumn("downloads", "Downloads"),
  createActionsColumn([
    {
      label: "Download",
      onClick: (data: TrainingResource) => console.log("Download", data.id),
    },
    {
      label: "Share",
      onClick: (data: TrainingResource) => console.log("Share", data.id),
    },
  ]),
];

const TrainingResources: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Training & Resources</h1>
          <p className="text-muted-foreground">
            Manage training sessions and access educational resources for your broker network
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate("/account-executive/training/schedule")}>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Training
          </Button>
          <Button variant="outline" onClick={() => navigate("/account-executive/training/upload")}>
            <Plus className="mr-2 h-4 w-4" />
            Upload Resource
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Next session in 3 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              Across all categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Learners</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">
              Training completion rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Training Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Training Sessions</CardTitle>
          <CardDescription>
            View and manage scheduled training sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={trainingSessions}
            searchKey="title"
            filterableColumns={[
              {
                id: "type",
                title: "Type",
                options: [
                  { label: "All", value: "all" },
                  { label: "Webinar", value: "Webinar" },
                  { label: "Workshop", value: "Workshop" },
                  { label: "One-on-One", value: "One-on-One" },
                ],
              },
              {
                id: "status",
                title: "Status",
                options: [
                  { label: "All", value: "all" },
                  { label: "Scheduled", value: "Scheduled" },
                  { label: "In Progress", value: "In Progress" },
                  { label: "Completed", value: "Completed" },
                ],
              },
            ]}
          />
        </CardContent>
      </Card>

      {/* Training Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Training Resources</CardTitle>
          <CardDescription>
            Access and manage educational materials for your broker network
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={resourceColumns}
            data={trainingResources}
            searchKey="title"
            filterableColumns={[
              {
                id: "type",
                title: "Type",
                options: [
                  { label: "All", value: "all" },
                  { label: "PDF Guide", value: "PDF Guide" },
                  { label: "Checklist", value: "Checklist" },
                  { label: "Video", value: "Video" },
                ],
              },
              {
                id: "category",
                title: "Category",
                options: [
                  { label: "All", value: "all" },
                  { label: "Process", value: "Process" },
                  { label: "Compliance", value: "Compliance" },
                  { label: "Sales", value: "Sales" },
                ],
              },
            ]}
          />
        </CardContent>
      </Card>

      {/* Quick Access Resources */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/account-executive/training/resources/compliance")}>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <FileText className="h-8 w-8 text-primary mb-2" />
            <span className="text-sm font-medium text-center">Compliance Guides</span>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/account-executive/training/resources/videos")}>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Video className="h-8 w-8 text-primary mb-2" />
            <span className="text-sm font-medium text-center">Training Videos</span>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/account-executive/training/resources/templates")}>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <BookOpen className="h-8 w-8 text-primary mb-2" />
            <span className="text-sm font-medium text-center">Document Templates</span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrainingResources; 