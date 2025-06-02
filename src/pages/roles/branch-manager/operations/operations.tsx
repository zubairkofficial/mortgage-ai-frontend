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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  AlertCircle,
  CheckCircle2,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  Plus,
  AlertTriangle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Mock data for operational metrics
const operationalMetrics = {
  activeWorkflows: 45,
  pendingTasks: 28,
  completedToday: 32,
  averageProcessingTime: "2.8 days",
  slaCompliance: 94,
  workloadDistribution: 78,
};

// Mock data for active workflows
const activeWorkflows = [
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
];

// Mock data for pending tasks
const pendingTasks = [
  {
    id: 1,
    title: "Review Loan Application #1234",
    workflow: "Loan Application Review",
    assignedTo: "John Doe",
    priority: "High",
    dueDate: "2024-03-20",
    status: "In Progress",
    estimatedTime: "2 hours",
  },
  {
    id: 2,
    title: "Verify Client Documents",
    workflow: "Document Verification",
    assignedTo: "Sarah Miller",
    priority: "Medium",
    dueDate: "2024-03-22",
    status: "Pending",
    estimatedTime: "1 hour",
  },
  {
    id: 3,
    title: "Complete Client Onboarding",
    workflow: "Client Onboarding",
    assignedTo: "Robert Johnson",
    priority: "High",
    dueDate: "2024-03-18",
    status: "At Risk",
    estimatedTime: "3 hours",
  },
];

// Mock data for SLA metrics
const mockSlaMetrics = [
  {
    id: 1,
    category: "Loan Processing",
    target: "48 hours",
    current: "42 hours",
    compliance: 95,
    trend: "up",
  },
  {
    id: 2,
    category: "Document Verification",
    target: "24 hours",
    current: "26 hours",
    compliance: 88,
    trend: "down",
  },
  {
    id: 3,
    category: "Client Onboarding",
    target: "72 hours",
    current: "65 hours",
    compliance: 92,
    trend: "up",
  },
];

interface Workflow {
  id: number;
  name: string;
  status: string;
  assignedTo: string;
  priority: string;
  dueDate: string;
  progress: number;
  tasks: {
    total: number;
    completed: number;
  };
  lastUpdated: string;
}

interface Task {
  id: number;
  title: string;
  workflow: string;
  assignedTo: string;
  priority: string;
  dueDate: string;
  status: string;
  estimatedTime: string;
}

interface SLA {
  id: number;
  category: string;
  target: string;
  current: string;
  compliance: number;
  trend: "up" | "down";
}

interface WorkflowFormData {
  name: string;
  assignedTo: string;
  priority: string;
  dueDate: string;
  description: string;
}

interface TaskFormData {
  title: string;
  workflow: string;
  assignedTo: string;
  priority: string;
  dueDate: string;
  estimatedTime: string;
  description: string;
}

interface SLAFormData {
  category: string;
  target: string;
  description: string;
}

const OperationsDashboard: FC = () => {
  // State for workflows
  const [workflows, setWorkflows] = useState<Workflow[]>(activeWorkflows);
  const [isWorkflowDialogOpen, setIsWorkflowDialogOpen] = useState(false);
  const [workflowFormData, setWorkflowFormData] = useState<WorkflowFormData>({
    name: "",
    assignedTo: "",
    priority: "",
    dueDate: "",
    description: "",
  });

  // State for tasks
  const [tasks, setTasks] = useState<Task[]>(pendingTasks);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [taskFormData, setTaskFormData] = useState<TaskFormData>({
    title: "",
    workflow: "",
    assignedTo: "",
    priority: "",
    dueDate: "",
    estimatedTime: "",
    description: "",
  });

  // State for SLA
  const [slaMetrics, setSlaMetrics] = useState<SLA[]>(mockSlaMetrics);
  const [isSLADialogOpen, setIsSLADialogOpen] = useState(false);
  const [slaFormData, setSlaFormData] = useState<SLAFormData>({
    category: "",
    target: "",
    description: "",
  });

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
        icon: any;
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

  const taskColumns = [
    createSortableColumn("title", "Task Title"),
    createSortableColumn("workflow", "Workflow"),
    createSortableColumn("assignedTo", "Assigned To"),
    createSortableColumn("priority", "Priority", (row) =>
      getPriorityBadge(row.priority)
    ),
    createSortableColumn("dueDate", "Due Date", (row) => (
      <span>{new Date(row.dueDate).toLocaleDateString()}</span>
    )),
    createSortableColumn("status", "Status", (row) =>
      getStatusBadge(row.status)
    ),
    createSortableColumn("estimatedTime", "Estimated Time"),
    createActionsColumn([
      {
        label: "Start Task",
        onClick: (data) => console.log("Start task", data),
      },
      {
        label: "Reassign",
        onClick: (data) => console.log("Reassign task", data),
      },
      {
        label: "Mark Complete",
        onClick: (data) => console.log("Complete task", data),
        //  variant: "success",
      },
    ]),
  ];

  const slaColumns = [
    createSortableColumn("category", "Category"),
    createSortableColumn("target", "Target SLA"),
    createSortableColumn("current", "Current Average"),
    createSortableColumn("compliance", "Compliance", (row) => (
      <div className="flex items-center gap-2">
        <Progress value={row.compliance} className="w-24" />
        <span className="text-sm">{row.compliance}%</span>
      </div>
    )),
    createSortableColumn("trend", "Trend", (row) => (
      <div
        className={`flex items-center gap-1 ${
          row.trend === "up" ? "text-[var(--brand-teal)]" : "text-destructive"
        }`}
      >
        {row.trend === "up" ? (
          <ArrowUpRight className="h-4 w-4" />
        ) : (
          <ArrowDownRight className="h-4 w-4" />
        )}
        <span>vs last month</span>
      </div>
    )),
  ];

  // Workflow form handlers
  const handleWorkflowInputChange = (
    field: keyof WorkflowFormData,
    value: string
  ) => {
    setWorkflowFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleWorkflowSubmit = () => {
    const newWorkflow: Workflow = {
      id: workflows.length + 1,
      name: workflowFormData.name,
      status: "Pending",
      assignedTo: workflowFormData.assignedTo,
      priority: workflowFormData.priority,
      dueDate: workflowFormData.dueDate,
      progress: 0,
      tasks: {
        total: 0,
        completed: 0,
      },
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    setWorkflows((prev) => [...prev, newWorkflow]);
    setIsWorkflowDialogOpen(false);
    setWorkflowFormData({
      name: "",
      assignedTo: "",
      priority: "",
      dueDate: "",
      description: "",
    });
  };

  // Task form handlers
  const handleTaskInputChange = (field: keyof TaskFormData, value: string) => {
    setTaskFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTaskSubmit = () => {
    const newTask: Task = {
      id: tasks.length + 1,
      title: taskFormData.title,
      workflow: taskFormData.workflow,
      assignedTo: taskFormData.assignedTo,
      priority: taskFormData.priority,
      dueDate: taskFormData.dueDate,
      status: "Pending",
      estimatedTime: taskFormData.estimatedTime,
    };

    setTasks((prev) => [...prev, newTask]);
    setIsTaskDialogOpen(false);
    setTaskFormData({
      title: "",
      workflow: "",
      assignedTo: "",
      priority: "",
      dueDate: "",
      estimatedTime: "",
      description: "",
    });
  };

  // SLA form handlers
  const handleSLAInputChange = (field: keyof SLAFormData, value: string) => {
    setSlaFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSLASubmit = () => {
    const newSLA: SLA = {
      id: slaMetrics.length + 1,
      category: slaFormData.category,
      target: slaFormData.target,
      current: "0 hours",
      compliance: 100,
      trend: "up",
    };

    setSlaMetrics((prev) => [...prev, newSLA]);
    setIsSLADialogOpen(false);
    setSlaFormData({
      category: "",
      target: "",
      description: "",
    });
  };

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
            <div className="text-2xl font-bold">
              {operationalMetrics.activeWorkflows}
            </div>
            <p className="text-xs text-muted-foreground">
              {operationalMetrics.pendingTasks} pending tasks
            </p>
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
            <CardTitle className="text-sm font-medium">
              SLA Compliance
            </CardTitle>
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

      {/* Main Content Tabs */}
      <Tabs defaultValue="workflows" className="space-y-4">
        <TabsList>
          <TabsTrigger value="workflows">Active Workflows</TabsTrigger>
          <TabsTrigger value="tasks">Pending Tasks</TabsTrigger>
          <TabsTrigger value="sla">SLA Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="workflows" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Workflows</CardTitle>
              <CardDescription>
                Monitor and manage ongoing operational workflows
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={workflowColumns}
                data={workflows}
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
                actionButtonText="Create Workflow"
                actionButtonIcon={<Plus className="mr-2 h-4 w-4" />}
                onActionButtonClick={() => setIsWorkflowDialogOpen(true)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Tasks</CardTitle>
              <CardDescription>
                Track and manage individual tasks across workflows
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={taskColumns}
                data={tasks}
                searchKey="title"
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
                actionButtonText="Create Task"
                actionButtonIcon={<Plus className="mr-2 h-4 w-4" />}
                onActionButtonClick={() => setIsTaskDialogOpen(true)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sla" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SLA Metrics</CardTitle>
              <CardDescription>
                Monitor service level agreement compliance across operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={slaColumns}
                data={slaMetrics}
                searchKey="category"
                filterableColumns={[
                  {
                    id: "trend",
                    title: "Trend",
                    options: [
                      { label: "Improving", value: "up" },
                      { label: "Declining", value: "down" },
                    ],
                  },
                ]}
                actionButtonText="Configure SLAs"
                actionButtonIcon={<Settings className="mr-2 h-4 w-4" />}
                onActionButtonClick={() => setIsSLADialogOpen(true)}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Workflow Dialog */}
      <Dialog
        open={isWorkflowDialogOpen}
        onOpenChange={setIsWorkflowDialogOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Workflow</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new operational workflow
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="workflow-name">Workflow Name</Label>
              <Input
                id="workflow-name"
                value={workflowFormData.name}
                onChange={(e) =>
                  handleWorkflowInputChange("name", e.target.value)
                }
                placeholder="Enter workflow name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="workflow-assigned">Assigned To</Label>
              <Input
                id="workflow-assigned"
                value={workflowFormData.assignedTo}
                onChange={(e) =>
                  handleWorkflowInputChange("assignedTo", e.target.value)
                }
                placeholder="Enter assignee name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="workflow-priority">Priority</Label>
              <Select
                value={workflowFormData.priority}
                onValueChange={(value) =>
                  handleWorkflowInputChange("priority", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="workflow-due">Due Date</Label>
              <Input
                id="workflow-due"
                type="date"
                value={workflowFormData.dueDate}
                onChange={(e) =>
                  handleWorkflowInputChange("dueDate", e.target.value)
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="workflow-description">Description</Label>
              <Textarea
                id="workflow-description"
                value={workflowFormData.description}
                onChange={(e) =>
                  handleWorkflowInputChange("description", e.target.value)
                }
                placeholder="Enter workflow description"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsWorkflowDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleWorkflowSubmit}>Create Workflow</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Task Dialog */}
      <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new task
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="task-title">Task Title</Label>
              <Input
                id="task-title"
                value={taskFormData.title}
                onChange={(e) => handleTaskInputChange("title", e.target.value)}
                placeholder="Enter task title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="task-workflow">Workflow</Label>
              <Select
                value={taskFormData.workflow}
                onValueChange={(value) =>
                  handleTaskInputChange("workflow", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select workflow" />
                </SelectTrigger>
                <SelectContent>
                  {workflows.map((workflow) => (
                    <SelectItem key={workflow.id} value={workflow.name}>
                      {workflow.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="task-assigned">Assigned To</Label>
              <Input
                id="task-assigned"
                value={taskFormData.assignedTo}
                onChange={(e) =>
                  handleTaskInputChange("assignedTo", e.target.value)
                }
                placeholder="Enter assignee name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="task-priority">Priority</Label>
              <Select
                value={taskFormData.priority}
                onValueChange={(value) =>
                  handleTaskInputChange("priority", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="task-due">Due Date</Label>
              <Input
                id="task-due"
                type="date"
                value={taskFormData.dueDate}
                onChange={(e) =>
                  handleTaskInputChange("dueDate", e.target.value)
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="task-time">Estimated Time</Label>
              <Input
                id="task-time"
                value={taskFormData.estimatedTime}
                onChange={(e) =>
                  handleTaskInputChange("estimatedTime", e.target.value)
                }
                placeholder="e.g., 2 hours"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="task-description">Description</Label>
              <Textarea
                id="task-description"
                value={taskFormData.description}
                onChange={(e) =>
                  handleTaskInputChange("description", e.target.value)
                }
                placeholder="Enter task description"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsTaskDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleTaskSubmit}>Create Task</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Configure SLA Dialog */}
      <Dialog open={isSLADialogOpen} onOpenChange={setIsSLADialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Configure SLA</DialogTitle>
            <DialogDescription>
              Set up new service level agreement metrics
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="sla-category">Category</Label>
              <Input
                id="sla-category"
                value={slaFormData.category}
                onChange={(e) =>
                  handleSLAInputChange("category", e.target.value)
                }
                placeholder="Enter category name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sla-target">Target Time</Label>
              <Input
                id="sla-target"
                value={slaFormData.target}
                onChange={(e) => handleSLAInputChange("target", e.target.value)}
                placeholder="e.g., 48 hours"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sla-description">Description</Label>
              <Textarea
                id="sla-description"
                value={slaFormData.description}
                onChange={(e) =>
                  handleSLAInputChange("description", e.target.value)
                }
                placeholder="Enter SLA description"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsSLADialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSLASubmit}>Configure SLA</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OperationsDashboard;
