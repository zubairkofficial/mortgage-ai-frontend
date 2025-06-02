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
import { toast } from "sonner";
import {
  Clock,
  CheckCircle2,
  FileText,
  Play,
  AlertTriangle,
} from "lucide-react";

// Mock data for operational metrics
const operationalMetrics = {
  activeWorkflows: 45,
  pendingTasks: 28,
  completedToday: 32,
  averageProcessingTime: "2.8 days",
};

// Predefined workflow templates that can be triggered
const workflowTemplates = [
  {
    id: "loan-review",
    name: "Loan Application Review",
    description: "Complete review process for new loan applications",
    estimatedDuration: "2-3 days",
    tasks: 8,
  },
  {
    id: "document-verification",
    name: "Document Verification",
    description: "Verify and validate customer documents",
    estimatedDuration: "1-2 days",
    tasks: 5,
  },
  {
    id: "client-onboarding",
    name: "Client Onboarding",
    description: "Onboard new clients with complete setup",
    estimatedDuration: "3-4 days",
    tasks: 6,
  },
  {
    id: "compliance-audit",
    name: "Compliance Audit",
    description: "Perform compliance check and audit procedures",
    estimatedDuration: "1-2 days",
    tasks: 4,
  },
  {
    id: "risk-assessment",
    name: "Risk Assessment",
    description: "Evaluate and assess potential risks",
    estimatedDuration: "2-3 days",
    tasks: 7,
  },
];

// Predefined active workflows (static data for the table)
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
  {
    id: 4,
    name: "Compliance Audit",
    status: "In Progress",
    assignedTo: "Emily Davis",
    priority: "Medium",
    dueDate: "2024-03-25",
    progress: 60,
    tasks: {
      total: 4,
      completed: 2,
    },
    lastUpdated: "2024-03-15",
  },
  {
    id: 5,
    name: "Risk Assessment",
    status: "Completed",
    assignedTo: "Michael Brown",
    priority: "Low",
    dueDate: "2024-03-16",
    progress: 100,
    tasks: {
      total: 7,
      completed: 7,
    },
    lastUpdated: "2024-03-15",
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

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  estimatedDuration: string;
  tasks: number;
}

const OperationsDashboard: FC = () => {
  const [workflows] = useState<Workflow[]>(activeWorkflows);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>("");

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
      Pending: { variant: "secondary", icon: Clock },
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

  const handleTriggerWorkflow = async () => {
    if (!selectedWorkflow) {
      toast.error("Please select a workflow to trigger.");
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate workflow processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const workflowTemplate = workflowTemplates.find(
        template => template.id === selectedWorkflow
      );
      
      if (workflowTemplate) {
        toast.success("Workflow Triggered Successfully", {
          description: `${workflowTemplate.name} has been initiated. Expected completion in ${workflowTemplate.estimatedDuration}.`,
        });
        
        // Reset selection and close dialog
        setSelectedWorkflow("");
        setIsDialogOpen(false);
      }
    } catch (error) {
      toast.error("Failed to trigger the workflow. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Operations Management
          </h1>
          <p className="text-muted-foreground">
            Monitor workflows and manage operational efficiency
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Trigger Workflow
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Trigger Workflow</DialogTitle>
              <DialogDescription>
                Select a workflow template to trigger from the available options.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label htmlFor="workflow-select" className="text-sm font-medium">
                  Available Workflows
                </label>
                <Select
                  value={selectedWorkflow}
                  onValueChange={setSelectedWorkflow}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a workflow to trigger" />
                  </SelectTrigger>
                  <SelectContent>
                    {workflowTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{template.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {template.description} • {template.tasks} tasks • {template.estimatedDuration}
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
                onClick={() => setIsDialogOpen(false)}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button
                onClick={handleTriggerWorkflow}
                disabled={isProcessing || !selectedWorkflow}
              >
                {isProcessing ? "Triggering..." : "Trigger Workflow"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
              Total Workflows
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {workflows.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently tracked
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Workflows Table */}
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
                  { label: "Completed", value: "Completed" },
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
