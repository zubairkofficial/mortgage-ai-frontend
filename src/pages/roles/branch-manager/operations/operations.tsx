import { FC, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  DataTable,
  createSortableColumn,
  createActionsColumn,
} from "@/components/common/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Clock,
  AlertCircle,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Play,
  LucideIcon,
} from "lucide-react";

// Mock data for operational metrics
const operationalMetrics = {
  activeWorkflows: 45,
  pendingTasks: 28,
  completedToday: 32,
  averageProcessingTime: "2.8 days",
  slaCompliance: 94,
  workloadDistribution: 78,
};

// Mock workflow templates for triggering
const workflowTemplates = [
  {
    id: "loan-review",
    name: "Loan Application Review",
    estimatedTime: "2-3 hours",
  },
  {
    id: "doc-verification",
    name: "Document Verification",
    estimatedTime: "1-2 hours",
  },
  {
    id: "client-onboarding",
    name: "Client Onboarding",
    estimatedTime: "3-4 hours",
  },
  { id: "credit-check", name: "Credit Assessment", estimatedTime: "1 hour" },
  {
    id: "compliance-review",
    name: "Compliance Review",
    estimatedTime: "2 hours",
  },
];

const OperationsDashboard: FC = () => {
  const [activeWorkflows, setActiveWorkflows] = useState([
    {
      id: 1,
      name: "Loan Application Review",
      status: "In Progress",
      assignedTo: "John Doe",
      priority: "High",
      dueDate: "2024-03-20",
      progress: 75,
      tasks: {
        total: 8,
        completed: 6,
      },
      lastUpdated: "2024-03-15",
    },
    {
      id: 2,
      name: "Document Verification",
      status: "Pending",
      assignedTo: "Sarah Miller",
      priority: "Medium",
      dueDate: "2024-03-22",
      progress: 30,
      tasks: {
        total: 5,
        completed: 1,
      },
      lastUpdated: "2024-03-15",
    },
    {
      id: 3,
      name: "Client Onboarding",
      status: "At Risk",
      assignedTo: "Robert Johnson",
      priority: "High",
      dueDate: "2024-03-18",
      progress: 45,
      tasks: {
        total: 6,
        completed: 3,
      },
      lastUpdated: "2024-03-15",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      {
        variant:
          | "default"
          | "destructive"
          | "outline"
          | "secondary"
          | "success"
          | null
          | undefined;
        icon: LucideIcon | null;
      }
    > = {
      "In Progress": { variant: "default", icon: Clock },
      Pending: { variant: "secondary", icon: AlertCircle },
      "At Risk": { variant: "destructive", icon: AlertTriangle },
      Completed: { variant: "success", icon: CheckCircle2 },
    };

    const { variant, icon: Icon } = variants[status] || {
      variant: "default",
      icon: null,
    };

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

    return <Badge variant={variants[priority] || "default"}>{priority}</Badge>;
  };

  const handleTriggerWorkflow = () => {
    if (!selectedTemplate) return;

    const template = workflowTemplates.find((t) => t.id === selectedTemplate);
    if (!template) return;

    const newWorkflow = {
      id: Math.max(...activeWorkflows.map((w) => w.id)) + 1,
      name: template.name,
      status: "Pending",
      assignedTo: "Unassigned",
      priority: "Medium",
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0], // 3 days from now
      progress: 0,
      tasks: {
        total: Math.floor(Math.random() * 8) + 3, // Random between 3-10 tasks
        completed: 0,
      },
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    setActiveWorkflows((prev) => [...prev, newWorkflow]);
    setIsModalOpen(false);
    setSelectedTemplate("");
  };

  const workflowColumns = [
    createSortableColumn("name", "Workflow Name"),
    createSortableColumn("status", "Status", (row) =>
      getStatusBadge(row.status)
    ),
    createSortableColumn("assignedTo", "Assigned To"),
    createSortableColumn("priority", "Priority", (row) =>
      getPriorityBadge(row.priority)
    ),
    createSortableColumn("dueDate", "Due Date", (row) => (
      <span>{new Date(row.dueDate).toLocaleDateString()}</span>
    )),
    createSortableColumn("progress", "Progress", (row) => (
      <div className="flex items-center gap-2">
        <Progress value={row.progress} className="w-24" />
        <span className="text-sm">{row.progress}%</span>
      </div>
    )),
    createSortableColumn("tasks", "Tasks", (row) => (
      <span>
        {row.tasks.completed}/{row.tasks.total}
      </span>
    )),
    createSortableColumn("lastUpdated", "Last Updated", (row) => (
      <span>{new Date(row.lastUpdated).toLocaleDateString()}</span>
    )),
    createActionsColumn([
      {
        label: "View Details",
        onClick: (data) => console.log("View workflow details", data),
      },
      {
        label: "Update Status",
        onClick: (data) => console.log("Update workflow status", data),
      },
      {
        label: "Reassign",
        onClick: (data) => console.log("Reassign workflow", data),
      },
    ]),
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Operations Management
        </h1>
        <p className="text-muted-foreground">
          Monitor workflows, track tasks, and manage operational efficiency
        </p>
      </div>

      {/* Operational Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Workflows
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeWorkflows.length}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Today
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {operationalMetrics.completedToday}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all workflows
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Processing Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {operationalMetrics.averageProcessingTime}
            </div>
            <p className="text-xs text-muted-foreground">Per workflow</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {operationalMetrics.slaCompliance}%
            </div>
            <Progress
              value={operationalMetrics.slaCompliance}
              className="mt-2"
            />
          </CardContent>
        </Card>
      </div>

      {/* Workflows Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Active Workflows</CardTitle>
              <CardDescription>
                Monitor and manage ongoing operational workflows
              </CardDescription>
            </div>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Play className="mr-2 h-4 w-4" />
                  Trigger Workflow
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Trigger New Workflow</DialogTitle>
                  <DialogDescription>
                    Select a workflow template to start a new workflow instance.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="workflow-template"
                      className="text-sm font-medium"
                    >
                      Workflow Template
                    </label>
                    <Select
                      value={selectedTemplate}
                      onValueChange={setSelectedTemplate}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a workflow template" />
                      </SelectTrigger>
                      <SelectContent>
                        {workflowTemplates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            <div className="flex flex-col">
                              <span>{template.name}</span>
                              <span className="text-xs text-muted-foreground">
                                Est. time: {template.estimatedTime}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleTriggerWorkflow}
                    disabled={!selectedTemplate}
                  >
                    Start Workflow
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={workflowColumns}
            data={activeWorkflows}
            searchKey="name"
            filterableColumns={[
              {
                id: "status",
                title: "Status",
                options: [
                  { label: "In Progress", value: "In Progress" },
                  { label: "Pending", value: "Pending" },
                  { label: "At Risk", value: "At Risk" },
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
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default OperationsDashboard;
