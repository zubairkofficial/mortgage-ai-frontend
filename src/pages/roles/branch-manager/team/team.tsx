import { FC, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DataTable,
  createSortableColumn,
  createActionsColumn,
} from "@/components/common/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Mail, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddTeamMember } from "./add-team-member";

interface TeamMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  status: string;
  specialization: string[];
  performance: number;
  activeLoans: number;
  certifications: number;
  joinDate: string;
}

// Mock data for the team table
const initialTeamData: TeamMember[] = [
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [teamData, setTeamData] = useState<TeamMember[]>(initialTeamData);

  const handleAddTeamMember = (
    newMember: Omit<TeamMember, "id" | "status" | "performance" | "activeLoans">
  ) => {
    const member: TeamMember = {
      ...newMember,
      id: teamData.length + 1,
      status: "Active",
      performance: 0,
      activeLoans: 0,
    };
    setTeamData((prev) => [...prev, member]);
    setIsDialogOpen(false);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(20);
    doc.text("Team Members Report", 14, 20);

    // Add date
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    // Add summary
    doc.setFontSize(14);
    doc.text("Summary", 14, 40);
    doc.setFontSize(12);
    doc.text(`Total Team Members: ${teamData.length}`, 14, 50);
    doc.text(
      `Active Members: ${teamData.filter((m) => m.status === "Active").length}`,
      14,
      60
    );
    doc.text(
      `Average Performance: ${(
        teamData.reduce((acc, m) => acc + m.performance, 0) / teamData.length
      ).toFixed(1)}%`,
      14,
      70
    );
    doc.text(
      `Total Active Loans: ${teamData.reduce(
        (acc, m) => acc + m.activeLoans,
        0
      )}`,
      14,
      80
    );

    // Add table
    autoTable(doc, {
      startY: 90,
      head: [
        [
          "Name",
          "Position",
          "Status",
          "Performance",
          "Active Loans",
          "Certifications",
          "Join Date",
        ],
      ],
      body: teamData.map((member) => [
        member.name,
        member.position,
        member.status,
        `${member.performance}%`,
        member.activeLoans.toString(),
        member.certifications.toString(),
        new Date(member.joinDate).toLocaleDateString(),
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    // Save the PDF
    doc.save("team-report.pdf");
  };

  const columns = [
    createSortableColumn("name", "Name", (row: TeamMember) => (
      <div className="flex items-center gap-2">
        <div className="font-medium">{row.name}</div>
        {row.position === "Senior Broker" && (
          <Star className="h-4 w-4 text-amber-500" />
        )}
      </div>
    )),
    createSortableColumn("position", "Position"),
    createSortableColumn("status", "Status", (row: TeamMember) => (
      <Badge
        variant={row.status === "Active" ? "default" : "secondary"}
        className="capitalize"
      >
        {row.status}
      </Badge>
    )),
    createSortableColumn(
      "specialization",
      "Specialization",
      (row: TeamMember) => (
        <div className="flex gap-1">
          {row.specialization.map((spec: string) => (
            <Badge key={spec} variant="outline" className="capitalize">
              {spec}
            </Badge>
          ))}
        </div>
      )
    ),
    createSortableColumn("performance", "Performance", (row: TeamMember) => (
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
    createSortableColumn("joinDate", "Join Date", (row: TeamMember) => (
      <span>{new Date(row.joinDate).toLocaleDateString()}</span>
    )),
    createActionsColumn([
      {
        label: "View Profile",
        onClick: (data: TeamMember) =>
          navigate(`/branch-manager/team/${data.id}`),
      },
      {
        label: "Send Message",
        onClick: (data: TeamMember) =>
          (window.location.href = `mailto:${data.email}`),
      },
      {
        label: "Call",
        onClick: (data: TeamMember) =>
          (window.location.href = `tel:${data.phone}`),
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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] md:max-w-[800px] ">
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new team member to your broker
                team.
              </DialogDescription>
            </DialogHeader>
            <AddTeamMember onSubmit={handleAddTeamMember} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamData.length}</div>
            <p className="text-xs text-muted-foreground">
              {teamData.filter((m) => m.status === "Active").length} Active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                teamData.reduce((acc, curr) => acc + curr.performance, 0) /
                  teamData.length
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">
              Across all team members
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Active Loans
            </CardTitle>
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
            <CardTitle className="text-sm font-medium">
              Certification Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                (teamData.reduce((acc, curr) => acc + curr.certifications, 0) /
                  (teamData.length * 5)) *
                  100
              )}
              %
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
        onActionButtonClick={handleExportPDF}
      />
    </div>
  );
};

export default TeamManagement;
