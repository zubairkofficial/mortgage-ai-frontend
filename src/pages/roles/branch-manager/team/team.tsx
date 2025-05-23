import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, createSortableColumn, createActionsColumn } from "@/components/common/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Mail, Phone, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for the team table
const teamData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    position: "Senior Broker",
    status: "Active",
    specialization: ["Residential", "Commercial"],
    performance: 92,
    activeLoans: 8,
    certifications: 4,
    joinDate: "2022-03-15",
  },
  {
    id: 2,
    name: "Sarah Miller",
    email: "sarah.miller@example.com",
    phone: "+1 (555) 234-5678",
    position: "Broker",
    status: "Active",
    specialization: ["Residential"],
    performance: 88,
    activeLoans: 6,
    certifications: 3,
    joinDate: "2022-06-01",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "+1 (555) 345-6789",
    position: "Junior Broker",
    status: "Training",
    specialization: ["Residential"],
    performance: 75,
    activeLoans: 3,
    certifications: 2,
    joinDate: "2023-01-15",
  },
  // Add more mock data as needed
];

const TeamManagement: FC = () => {
  const navigate = useNavigate();

  const columns = [
    createSortableColumn("name", "Name", (row) => (
      <div className="flex items-center gap-2">
        <div className="font-medium">{row.name}</div>
        {row.position === "Senior Broker" && (
          <Star className="h-4 w-4 text-amber-500" />
        )}
      </div>
    )),
    createSortableColumn("position", "Position"),
    createSortableColumn("status", "Status", (row) => (
      <Badge
        variant={row.status === "Active" ? "default" : "secondary"}
        className="capitalize"
      >
        {row.status}
      </Badge>
    )),
    createSortableColumn("specialization", "Specialization", (row) => (
      <div className="flex gap-1">
        {row.specialization.map((spec: any) => (
          <Badge key={spec} variant="outline" className="capitalize">
            {spec}
          </Badge>
        ))}
      </div>
    )),
    createSortableColumn("performance", "Performance", (row) => (
      <div className="flex items-center gap-2">
        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full"
            style={{ width: `${row.performance}%` }}
          />
        </div>
        <span className="text-sm">{row.performance}%</span>
      </div>
    )),
    createSortableColumn("activeLoans", "Active Loans"),
    createSortableColumn("certifications", "Certifications"),
    createSortableColumn("joinDate", "Join Date", (row) => (
      <span>{new Date(row.joinDate).toLocaleDateString()}</span>
    )),
    createActionsColumn([
      {
        label: "View Profile",
        onClick: (data: any) => navigate(`/branch-manager/team/${data.id}`),
      },
      {
        label: "Send Message",
        onClick: (data: any) => window.location.href = `mailto:${data.email}`,
      },
      {
        label: "Call",
        onClick: (data: any) => window.location.href = `tel:${data.phone}`,
      },
    ]),
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
          <p className="text-muted-foreground">
            Manage your broker team, track performance, and handle assignments
          </p>
        </div>
        <Button onClick={() => navigate("/branch-manager/team/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamData.length}</div>
            <p className="text-xs text-muted-foreground">
              {teamData.filter(m => m.status === "Active").length} Active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                teamData.reduce((acc, curr) => acc + curr.performance, 0) / teamData.length
              )}%
            </div>
            <p className="text-xs text-muted-foreground">
              Across all team members
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Active Loans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamData.reduce((acc, curr) => acc + curr.activeLoans, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently being processed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certification Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                (teamData.reduce((acc, curr) => acc + curr.certifications, 0) /
                  (teamData.length * 5)) *
                  100
              )}%
            </div>
            <p className="text-xs text-muted-foreground">
              Of required certifications
            </p>
          </CardContent>
        </Card>
      </div>

      <DataTable
        columns={columns}
        data={teamData}
        searchKey="name"
        title="Team Members"
        description="View and manage your broker team members"
        filterableColumns={[
          {
            id: "status",
            title: "Status",
            options: [
           
              { label: "Active", value: "Active" },
              { label: "Training", value: "Training" },
            ],
          },
          {
            id: "position",
            title: "Position",
              options: [
              { label: "Senior Broker", value: "Senior Broker" },
              { label: "Broker", value: "Broker" },
              { label: "Junior Broker", value: "Junior Broker" },
            ],
          },
        ]}
        actionButtonText="Export Team Data"
        actionButtonIcon={<Mail className="mr-2 h-4 w-4" />}
        onActionButtonClick={() => {
          // Handle export functionality
          console.log("Export team data");
        }}
      />
    </div>
  );
};

export default TeamManagement; 