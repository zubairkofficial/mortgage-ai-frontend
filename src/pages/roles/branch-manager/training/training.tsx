import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataTable, createSortableColumn, createActionsColumn } from "@/components/common/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, FileText, Video, Award, Clock, Users, Download, Play, CheckCircle2, AlertCircle } from "lucide-react";

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
const availableCourses = [
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

const TrainingCenter: FC = () => {
  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "destructive" | "secondary" | "success", icon: any }> = {
      Compliant: { variant: "success", icon: CheckCircle2 },
      "At Risk": { variant: "secondary", icon: AlertCircle },
      "Non-Compliant": { variant: "destructive", icon: AlertCircle },
    };

    const { variant, icon: Icon } = variants[status] || { variant: "default", icon: null };

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

    return (
      <Badge variant={variants[level] || "default"}>
        {level}
      </Badge>
    );
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
        <span>{row.completedCourses}/{row.requiredCourses}</span>
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
    createSortableColumn("status", "Status", (row) => getStatusBadge(row.status)),
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
            <div className="text-2xl font-bold">{trainingMetrics.totalCourses}</div>
            <p className="text-xs text-muted-foreground">
              {trainingMetrics.activeCourses} active courses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Course Completions</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trainingMetrics.completedCourses}</div>
            <p className="text-xs text-muted-foreground">
              {trainingMetrics.inProgressCourses} in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Completion</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trainingMetrics.averageCompletion}%</div>
            <Progress value={trainingMetrics.averageCompletion} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trainingMetrics.upcomingDeadlines}</div>
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
                data={availableCourses}
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
                onActionButtonClick={() => console.log("Add new course")}
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
                onActionButtonClick={() => console.log("Generate progress report")}
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
                data={trainingResources}
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
                onActionButtonClick={() => console.log("Upload new resource")}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrainingCenter; 