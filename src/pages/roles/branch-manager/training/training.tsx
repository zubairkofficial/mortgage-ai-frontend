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
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Book,
  FileText,
  Video,
  Award,
  Clock,
  Users,
  Download,
  Play,
  CheckCircle2,
  AlertCircle,
  Plus,
} from "lucide-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// Mock data for training metrics
const trainingMetrics = {
  totalCourses: 25,
  activeCourses: 18,
  completedCourses: 142,
  inProgressCourses: 24,
  averageCompletion: 78,
  upcomingDeadlines: 5,
};

// Mock data for available courses
const initialCourses = [
  {
    id: 1,
    title: "Advanced Loan Processing",
    category: "Technical",
    type: "Video Course",
    duration: "2h 30m",
    level: "Advanced",
    required: true,
    enrolled: 12,
    completionRate: 85,
    lastUpdated: "2024-03-01",
  },
  {
    id: 2,
    title: "Compliance Regulations 2024",
    category: "Compliance",
    type: "Documentation",
    duration: "1h 45m",
    level: "Intermediate",
    required: true,
    enrolled: 15,
    completionRate: 92,
    lastUpdated: "2024-02-15",
  },
  {
    id: 3,
    title: "Client Communication Skills",
    category: "Soft Skills",
    type: "Interactive",
    duration: "3h 00m",
    level: "Beginner",
    required: false,
    enrolled: 8,
    completionRate: 78,
    lastUpdated: "2024-03-10",
  },
];

// Mock data for broker progress
const brokerProgress = [
  {
    id: 1,
    broker: "John Doe",
    position: "Senior Broker",
    requiredCourses: 8,
    completedCourses: 8,
    inProgress: 0,
    nextDeadline: "2024-04-15",
    status: "Compliant",
  },
  {
    id: 2,
    broker: "Sarah Miller",
    position: "Broker",
    requiredCourses: 8,
    completedCourses: 6,
    inProgress: 2,
    nextDeadline: "2024-03-25",
    status: "At Risk",
  },
  {
    id: 3,
    broker: "Robert Johnson",
    position: "Junior Broker",
    requiredCourses: 8,
    completedCourses: 4,
    inProgress: 3,
    nextDeadline: "2024-03-20",
    status: "Non-Compliant",
  },
];

// Mock data for training resources
const trainingResources = [
  {
    id: 1,
    title: "Loan Processing Guide 2024",
    type: "PDF",
    category: "Documentation",
    size: "2.4 MB",
    downloads: 45,
    lastUpdated: "2024-03-01",
  },
  {
    id: 2,
    title: "Compliance Checklist",
    type: "Excel",
    category: "Compliance",
    size: "1.2 MB",
    downloads: 38,
    lastUpdated: "2024-02-15",
  },
  {
    id: 3,
    title: "Client Onboarding Process",
    type: "Video",
    category: "Process",
    size: "45 MB",
    downloads: 28,
    lastUpdated: "2024-03-10",
  },
];

interface Course {
  id: number;
  title: string;
  category: string;
  type: string;
  duration: string;
  level: string;
  required: boolean;
  enrolled: number;
  completionRate: number;
  lastUpdated: string;
}

interface CourseFormData {
  title: string;
  category: string;
  type: string;
  duration: string;
  level: string;
  required: boolean;
}

interface Resource {
  id: number;
  title: string;
  type: string;
  category: string;
  size: string;
  downloads: number;
  lastUpdated: string;
}

interface ResourceFormData {
  title: string;
  type: string;
  category: string;
  size: string;
}

const TrainingCenter: FC = () => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    category: "",
    type: "",
    duration: "",
    level: "",
    required: false,
  });
  const [resources, setResources] = useState<Resource[]>(trainingResources);
  const [isResourceDialogOpen, setIsResourceDialogOpen] = useState(false);
  const [resourceFormData, setResourceFormData] = useState<ResourceFormData>({
    title: "",
    type: "",
    category: "",
    size: "",
  });

  const handleInputChange = (
    field: keyof CourseFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const newCourse: Course = {
      id: courses.length + 1,
      ...formData,
      enrolled: 0,
      completionRate: 0,
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    setCourses((prev) => [...prev, newCourse]);
    setIsDialogOpen(false);
    setFormData({
      title: "",
      category: "",
      type: "",
      duration: "",
      level: "",
      required: false,
    });
  };

  const handleResourceInputChange = (
    field: keyof ResourceFormData,
    value: string
  ) => {
    setResourceFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleResourceSubmit = () => {
    const newResource: Resource = {
      id: resources.length + 1,
      ...resourceFormData,
      downloads: 0,
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    setResources((prev) => [...prev, newResource]);
    setIsResourceDialogOpen(false);
    setResourceFormData({
      title: "",
      type: "",
      category: "",
      size: "",
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      {
        variant: "default" | "destructive" | "secondary" | "success";
        icon: any;
      }
    > = {
      Compliant: { variant: "success", icon: CheckCircle2 },
      "At Risk": { variant: "secondary", icon: AlertCircle },
      "Non-Compliant": { variant: "destructive", icon: AlertCircle },
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

  const getLevelBadge = (level: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      Beginner: "default",
      Intermediate: "secondary",
      Advanced: "outline",
    };

    return <Badge variant={variants[level] || "default"}>{level}</Badge>;
  };

  const coursesColumns = [
    createSortableColumn("title", "Course Title"),
    createSortableColumn("category", "Category"),
    createSortableColumn("type", "Type", (row) => (
      <div className="flex items-center gap-2">
        {row.type === "Video Course" ? (
          <Video className="h-4 w-4 text-primary" />
        ) : row.type === "Documentation" ? (
          <FileText className="h-4 w-4 text-primary" />
        ) : (
          <Users className="h-4 w-4 text-primary" />
        )}
        <span>{row.type}</span>
      </div>
    )),
    createSortableColumn("duration", "Duration", (row) => (
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span>{row.duration}</span>
      </div>
    )),
    createSortableColumn("level", "Level", (row) => getLevelBadge(row.level)),
    createSortableColumn("required", "Required", (row) => (
      <Badge variant={row.required ? "destructive" : "outline"}>
        {row.required ? "Required" : "Optional"}
      </Badge>
    )),
    createSortableColumn("enrolled", "Enrolled"),
    createSortableColumn("completionRate", "Completion Rate", (row) => (
      <div className="flex items-center gap-2">
        <Progress value={row.completionRate} className="w-24" />
        <span className="text-sm">{row.completionRate}%</span>
      </div>
    )),
    createSortableColumn("lastUpdated", "Last Updated", (row) => (
      <span>{new Date(row.lastUpdated).toLocaleDateString()}</span>
    )),
    createActionsColumn([
      {
        label: "View Course",
        onClick: (data) => console.log("View course", data),
      },
      {
        label: "Assign to Team",
        onClick: (data) => console.log("Assign course", data),
      },
    ]),
  ];

  const progressColumns = [
    createSortableColumn("broker", "Broker"),
    createSortableColumn("position", "Position"),
    createSortableColumn("requiredCourses", "Required Courses"),
    createSortableColumn("completedCourses", "Completed Courses", (row) => (
      <div className="flex items-center gap-2">
        <span>
          {row.completedCourses}/{row.requiredCourses}
        </span>
        <Progress
          value={(row.completedCourses / row.requiredCourses) * 100}
          className="w-24"
        />
      </div>
    )),
    createSortableColumn("inProgress", "In Progress"),
    createSortableColumn("nextDeadline", "Next Deadline", (row) => (
      <span>{new Date(row.nextDeadline).toLocaleDateString()}</span>
    )),
    createSortableColumn("status", "Status", (row) =>
      getStatusBadge(row.status)
    ),
    createActionsColumn([
      {
        label: "View Progress",
        onClick: (data) => console.log("View progress", data),
      },
      {
        label: "Assign Courses",
        onClick: (data) => console.log("Assign courses", data),
      },
    ]),
  ];

  const resourcesColumns = [
    createSortableColumn("title", "Resource Title"),
    createSortableColumn("type", "Type", (row) => (
      <div className="flex items-center gap-2">
        {row.type === "PDF" ? (
          <FileText className="h-4 w-4 text-primary" />
        ) : row.type === "Video" ? (
          <Video className="h-4 w-4 text-primary" />
        ) : (
          <FileText className="h-4 w-4 text-primary" />
        )}
        <span>{row.type}</span>
      </div>
    )),
    createSortableColumn("category", "Category"),
    createSortableColumn("size", "Size"),
    createSortableColumn("downloads", "Downloads"),
    createSortableColumn("lastUpdated", "Last Updated", (row) => (
      <span>{new Date(row.lastUpdated).toLocaleDateString()}</span>
    )),
    createActionsColumn([
      {
        label: "Download",
        onClick: (data) => console.log("Download resource", data),
      },
      {
        label: "Share",
        onClick: (data) => console.log("Share resource", data),
      },
    ]),
  ];

  const handleGenerateReport = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(20);
    doc.text("Training Progress Report", 14, 20);

    // Add date
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    // Add summary statistics
    doc.setFontSize(14);
    doc.text("Summary", 14, 45);
    doc.setFontSize(12);
    doc.text(`Total Team Members: ${brokerProgress.length}`, 14, 55);
    doc.text(
      `Compliant Members: ${
        brokerProgress.filter((b) => b.status === "Compliant").length
      }`,
      14,
      65
    );
    doc.text(
      `At Risk Members: ${
        brokerProgress.filter((b) => b.status === "At Risk").length
      }`,
      14,
      75
    );
    doc.text(
      `Non-Compliant Members: ${
        brokerProgress.filter((b) => b.status === "Non-Compliant").length
      }`,
      14,
      85
    );

    // Add broker progress table
    const tableData = brokerProgress.map((broker) => [
      broker.broker,
      broker.position,
      `${broker.completedCourses}/${broker.requiredCourses}`,
      broker.inProgress.toString(),
      new Date(broker.nextDeadline).toLocaleDateString(),
      broker.status,
    ]);

    autoTable(doc, {
      startY: 95,
      head: [
        [
          "Broker",
          "Position",
          "Completed Courses",
          "In Progress",
          "Next Deadline",
          "Status",
        ],
      ],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [41, 128, 185] },
      styles: { fontSize: 10 },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 30 },
        2: { cellWidth: 30 },
        3: { cellWidth: 25 },
        4: { cellWidth: 30 },
        5: { cellWidth: 30 },
      },
    });

    // Save the PDF
    doc.save("training-progress-report.pdf");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Training Center</h1>
        <p className="text-muted-foreground">
          Manage training courses, track progress, and access learning resources
        </p>
      </div>

      {/* Training Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {trainingMetrics.totalCourses}
            </div>
            <p className="text-xs text-muted-foreground">
              {trainingMetrics.activeCourses} active courses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Course Completions
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {trainingMetrics.completedCourses}
            </div>
            <p className="text-xs text-muted-foreground">
              {trainingMetrics.inProgressCourses} in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Completion
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {trainingMetrics.averageCompletion}%
            </div>
            <Progress
              value={trainingMetrics.averageCompletion}
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Deadlines
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {trainingMetrics.upcomingDeadlines}
            </div>
            <p className="text-xs text-muted-foreground">
              Courses due this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">Available Courses</TabsTrigger>
          <TabsTrigger value="progress">Training Progress</TabsTrigger>
          <TabsTrigger value="resources">Learning Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Courses</CardTitle>
              <CardDescription>
                Browse and manage training courses for your team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={coursesColumns}
                data={courses}
                searchKey="title"
                filterableColumns={[
                  {
                    id: "category",
                    title: "Category",
                    options: [
                      { label: "Technical", value: "Technical" },
                      { label: "Compliance", value: "Compliance" },
                      { label: "Soft Skills", value: "Soft Skills" },
                    ],
                  },
                  {
                    id: "level",
                    title: "Level",
                    options: [
                      { label: "Beginner", value: "Beginner" },
                      { label: "Intermediate", value: "Intermediate" },
                      { label: "Advanced", value: "Advanced" },
                    ],
                  },
                ]}
                actionButtonText="Add New Course"
                actionButtonIcon={<Plus className="mr-2 h-4 w-4" />}
                onActionButtonClick={() => setIsDialogOpen(true)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Training Progress</CardTitle>
              <CardDescription>
                Monitor individual and team training completion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={progressColumns}
                data={brokerProgress}
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
                actionButtonText="Generate Report"
                actionButtonIcon={<FileText className="mr-2 h-4 w-4" />}
                onActionButtonClick={handleGenerateReport}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Learning Resources</CardTitle>
              <CardDescription>
                Access training materials and documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={resourcesColumns}
                data={resources}
                searchKey="title"
                filterableColumns={[
                  {
                    id: "type",
                    title: "Type",
                    options: [
                      { label: "PDF", value: "PDF" },
                      { label: "Video", value: "Video" },
                      { label: "Excel", value: "Excel" },
                    ],
                  },
                  {
                    id: "category",
                    title: "Category",
                    options: [
                      { label: "Documentation", value: "Documentation" },
                      { label: "Compliance", value: "Compliance" },
                      { label: "Process", value: "Process" },
                    ],
                  },
                ]}
                actionButtonText="Upload Resource"
                actionButtonIcon={<FileText className="mr-2 h-4 w-4" />}
                onActionButtonClick={() => setIsResourceDialogOpen(true)}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Course Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new training course
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter course title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="Compliance">Compliance</SelectItem>
                  <SelectItem value="Soft Skills">Soft Skills</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Course Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleInputChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Video Course">Video Course</SelectItem>
                  <SelectItem value="Documentation">Documentation</SelectItem>
                  <SelectItem value="Interactive">Interactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                placeholder="e.g., 2h 30m"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="level">Level</Label>
              <Select
                value={formData.level}
                onValueChange={(value) => handleInputChange("level", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="required"
                checked={formData.required}
                onCheckedChange={(checked) =>
                  handleInputChange("required", checked as boolean)
                }
              />
              <Label htmlFor="required">Required Course</Label>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Add Course</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Resource Dialog */}
      <Dialog
        open={isResourceDialogOpen}
        onOpenChange={setIsResourceDialogOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Upload New Resource</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new learning resource
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="resource-title">Resource Title</Label>
              <Input
                id="resource-title"
                value={resourceFormData.title}
                onChange={(e) =>
                  handleResourceInputChange("title", e.target.value)
                }
                placeholder="Enter resource title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="resource-type">Resource Type</Label>
              <Select
                value={resourceFormData.type}
                onValueChange={(value) =>
                  handleResourceInputChange("type", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PDF">PDF</SelectItem>
                  <SelectItem value="Video">Video</SelectItem>
                  <SelectItem value="Excel">Excel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="resource-category">Category</Label>
              <Select
                value={resourceFormData.category}
                onValueChange={(value) =>
                  handleResourceInputChange("category", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Documentation">Documentation</SelectItem>
                  <SelectItem value="Compliance">Compliance</SelectItem>
                  <SelectItem value="Process">Process</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="resource-size">File Size</Label>
              <Input
                id="resource-size"
                value={resourceFormData.size}
                onChange={(e) =>
                  handleResourceInputChange("size", e.target.value)
                }
                placeholder="e.g., 2.4 MB"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsResourceDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleResourceSubmit}>Upload Resource</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrainingCenter;
