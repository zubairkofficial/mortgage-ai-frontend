import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataTable, createSortableColumn, createActionsColumn } from "@/components/common/table";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Clock, FileWarning, AlertTriangle,  FileCheck, ShieldAlert } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for compliance metrics
const complianceMetrics = {
  overallScore: 94,
  pendingReviews: 3,
  criticalIssues: 1,
  upcomingAudits: 2,
  requirements: {
    total: 45,
    completed: 42,
    inProgress: 2,
    overdue: 1,
  },
};

// Mock data for compliance cases
const complianceCases = [
  {
    id: 1,
    broker: "John Doe",
    type: "Documentation",
    status: "Critical",
    description: "Missing client verification documents",
    dueDate: "2024-03-20",
    priority: "High",
    assignedTo: "Sarah Miller",
    lastUpdated: "2024-03-15",
  },
  {
    id: 2,
    broker: "Robert Johnson",
    type: "Training",
    status: "Pending",
    description: "Annual compliance training overdue",
    dueDate: "2024-03-25",
    priority: "Medium",
    assignedTo: "John Doe",
    lastUpdated: "2024-03-14",
  },
  {
    id: 3,
    broker: "Sarah Miller",
    type: "Policy",
    status: "In Progress",
    description: "Client communication policy violation",
    dueDate: "2024-03-22",
    priority: "High",
    assignedTo: "Robert Johnson",
    lastUpdated: "2024-03-15",
  },
];

// Mock data for audit schedule
const auditSchedule = [
  {
    id: 1,
    type: "Internal",
    date: "2024-04-01",
    scope: "Documentation & Procedures",
    status: "Scheduled",
    assignedAuditor: "Internal Audit Team",
  },
  {
    id: 2,
    type: "External",
    date: "2024-04-15",
    scope: "Full Branch Compliance",
    status: "Preparation",
    assignedAuditor: "Regulatory Authority",
  },
];

// Mock data for training compliance
const trainingCompliance = [
  {
    id: 1,
    broker: "John Doe",
    requiredCourses: 5,
    completedCourses: 5,
    nextDue: "2024-06-15",
    status: "Compliant",
  },
  {
    id: 2,
    broker: "Sarah Miller",
    requiredCourses: 5,
    completedCourses: 4,
    nextDue: "2024-03-25",
    status: "At Risk",
  },
  {
    id: 3,
    broker: "Robert Johnson",
    requiredCourses: 5,
    completedCourses: 3,
    nextDue: "2024-03-20",
    status: "Non-Compliant",
  },
];

const ComplianceDashboard: FC = () => {
  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "destructive" | "secondary" | "success", icon: any }> = {
      Critical: { variant: "destructive", icon: AlertCircle },
      Pending: { variant: "secondary", icon: Clock },
      "In Progress": { variant: "default", icon: FileCheck },
      Compliant: { variant: "success", icon: CheckCircle2 },
      "At Risk": { variant: "secondary", icon: AlertTriangle },
      "Non-Compliant": { variant: "destructive", icon: ShieldAlert },
    };

    const { variant, icon: Icon } = variants[status] || { variant: "default", icon: null };

    return (
      <Badge variant={variant} className="flex items-center gap-1">
        {Icon && <Icon className="h-3 w-3" />}
        {status}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, "default" | "destructive" | "secondary"> = {
      High: "destructive",
      Medium: "secondary",
      Low: "default",
    };

    return (
      <Badge variant={variants[priority] || "default"}>
        {priority}
      </Badge>
    );
  };

  const complianceCasesColumns = [
    createSortableColumn("broker", "Broker"),
    createSortableColumn("type", "Type"),
    createSortableColumn("status", "Status", (row) => getStatusBadge(row.status)),
    createSortableColumn("description", "Description"),
    createSortableColumn("dueDate", "Due Date", (row) => (
      <span>{new Date(row.dueDate).toLocaleDateString()}</span>
    )),
    createSortableColumn("priority", "Priority", (row) => getPriorityBadge(row.priority)),
    createSortableColumn("assignedTo", "Assigned To"),
    createSortableColumn("lastUpdated", "Last Updated", (row) => (
      <span>{new Date(row.lastUpdated).toLocaleDateString()}</span>
    )),
    createActionsColumn([
      {
        label: "View Details",
        onClick: (data) => console.log("View case details", data),
      },
      {
        label: "Update Status",
        onClick: (data) => console.log("Update case status", data),
      },
      {
        label: "Escalate",
        onClick: (data) => console.log("Escalate case", data),
        variant: "destructive",
      },
    ]),
  ];

  const auditScheduleColumns = [
    createSortableColumn("type", "Type"),
    createSortableColumn("date", "Date", (row) => (
      <span>{new Date(row.date).toLocaleDateString()}</span>
    )),
    createSortableColumn("scope", "Scope"),
    createSortableColumn("status", "Status", (row) => getStatusBadge(row.status)),
    createSortableColumn("assignedAuditor", "Assigned Auditor"),
    createActionsColumn([
      {
        label: "View Details",
        onClick: (data) => console.log("View audit details", data),
      },
      {
        label: "Prepare Documentation",
        onClick: (data) => console.log("Prepare audit docs", data),
      },
    ]),
  ];

  const trainingComplianceColumns = [
    createSortableColumn("broker", "Broker"),
    createSortableColumn("requiredCourses", "Required Courses"),
    createSortableColumn("completedCourses", "Completed Courses", (row) => (
      <div className="flex items-center gap-2">
        <span>{row.completedCourses}/{row.requiredCourses}</span>
        <Progress
          value={(row.completedCourses / row.requiredCourses) * 100}
          className="w-24"
        />
      </div>
    )),
    createSortableColumn("nextDue", "Next Due", (row) => (
      <span>{new Date(row.nextDue).toLocaleDateString()}</span>
    )),
    createSortableColumn("status", "Status", (row) => getStatusBadge(row.status)),
    createActionsColumn([
      {
        label: "View Progress",
        onClick: (data) => console.log("View training progress", data),
      },
      {
        label: "Assign Courses",
        onClick: (data) => console.log("Assign courses", data),
      },
    ]),
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Compliance Management</h1>
        <p className="text-muted-foreground">
          Monitor compliance requirements and manage regulatory adherence
        </p>
      </div>

      {/* Compliance Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Compliance Score</CardTitle>
            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceMetrics.overallScore}%</div>
            <Progress value={complianceMetrics.overallScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <FileWarning className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceMetrics.pendingReviews}</div>
            <p className="text-xs text-muted-foreground">
              {complianceMetrics.criticalIssues} critical issues
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Audits</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceMetrics.upcomingAudits}</div>
            <p className="text-xs text-muted-foreground">
              Next audit in 15 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Requirements Status</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {complianceMetrics.requirements.completed}/{complianceMetrics.requirements.total}
            </div>
            <div className="flex gap-2 mt-2">
              <Badge variant="default">{complianceMetrics.requirements.completed} Completed</Badge>
              <Badge variant="secondary">{complianceMetrics.requirements.inProgress} In Progress</Badge>
              <Badge variant="destructive">{complianceMetrics.requirements.overdue} Overdue</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="cases" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cases">Compliance Cases</TabsTrigger>
          <TabsTrigger value="audits">Audit Schedule</TabsTrigger>
          <TabsTrigger value="training">Training Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="cases" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Compliance Cases</CardTitle>
              <CardDescription>
                Track and manage compliance issues and their resolution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={complianceCasesColumns}
                data={complianceCases}
                searchKey="broker"
                filterableColumns={[
                  {
                    id: "status",
                    title: "Status",
                    options: [
                    
                      { label: "Critical", value: "Critical" },
                      { label: "Pending", value: "Pending" },
                      { label: "In Progress", value: "In Progress" },
                    ],
                  },
                  {
                    id: "priority",
                    title: "Priority",
                    options: [
                    
                      { label: "High", value: "High" },
                      { label: "Medium", value: "Medium" },
                      { label: "Low", value: "Low" },
                    ],
                  },
                ]}
                actionButtonText="New Case"
                onActionButtonClick={() => console.log("Create new case")}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audit Schedule</CardTitle>
              <CardDescription>
                Manage upcoming audits and prepare required documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={auditScheduleColumns}
                data={auditSchedule}
                searchKey="type"
                filterableColumns={[
                  {
                    id: "type",
                    title: "Type",
                    options: [
                   
                      { label: "Internal", value: "Internal" },
                      { label: "External", value: "External" },
                    ],
                  },
                  {
                    id: "status",
                    title: "Status",
                    options: [
                     
                      { label: "Scheduled", value: "Scheduled" },
                      { label: "Preparation", value: "Preparation" },
                    ],
                  },
                ]}
                actionButtonText="Schedule Audit"
                onActionButtonClick={() => console.log("Schedule new audit")}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Training Compliance</CardTitle>
              <CardDescription>
                Monitor training completion and certification status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={trainingComplianceColumns}
                data={trainingCompliance}
                searchKey="broker"
                filterableColumns={[
                  {
                    id: "status",
                    title: "Status",
                    options: [
                   
                      { label: "Compliant", value: "Compliant" },
                      { label: "At Risk", value: "At Risk" },
                      { label: "Non-Compliant", value: "Non-Compliant" },
                    ],
                  },
                ]}
                actionButtonText="Assign Training"
                onActionButtonClick={() => console.log("Assign new training")}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplianceDashboard; 