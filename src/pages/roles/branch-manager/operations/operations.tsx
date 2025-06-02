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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  BookOpen,
  Users,
  FileText,
  Upload,
  GraduationCap,
  Clock,
} from "lucide-react";

// Mock data for training metrics
const trainingMetrics = {
  totalCourses: 12,
  activeEnrollments: 85,
  completedCourses: 34,
  averageCompletionTime: "4.2 days",
};

// Mock data for training resources/courses
const trainingResources = [
  {
    id: 1,
    title: "Financial Risk Assessment Fundamentals",
    category: "Risk Management",
    difficulty: "Intermediate",
    duration: "2 hours",
    enrollments: 25,
    completions: 18,
    rating: 4.8,
    instructor: "Dr. Sarah Johnson",
    uploadDate: "2024-03-01",
    status: "Active",
    materials: ["PDF Guide", "Video Lectures", "Practice Tests"],
  },
  {
    id: 2,
    title: "Loan Processing Best Practices",
    category: "Operations",
    difficulty: "Beginner",
    duration: "1.5 hours",
    enrollments: 32,
    completions: 28,
    rating: 4.6,
    instructor: "Michael Brown",
    uploadDate: "2024-02-28",
    status: "Active",
    materials: ["Video Course", "Handbook"],
  },
  {
    id: 3,
    title: "Compliance and Regulatory Updates 2024",
    category: "Compliance",
    difficulty: "Advanced",
    duration: "3 hours",
    enrollments: 15,
    completions: 8,
    rating: 4.9,
    instructor: "Emily Davis",
    uploadDate: "2024-03-10",
    status: "Active",
    materials: ["Document Library", "Interactive Modules"],
  },
  {
    id: 4,
    title: "Customer Service Excellence",
    category: "Soft Skills",
    difficulty: "Beginner",
    duration: "1 hour",
    enrollments: 42,
    completions: 35,
    rating: 4.5,
    instructor: "Robert Wilson",
    uploadDate: "2024-02-20",
    status: "Active",
    materials: ["Video Training", "Role-play Scenarios"],
  },
  {
    id: 5,
    title: "Anti-Money Laundering (AML) Training",
    category: "Compliance",
    difficulty: "Intermediate",
    duration: "2.5 hours",
    enrollments: 28,
    completions: 22,
    rating: 4.7,
    instructor: "Lisa Anderson",
    uploadDate: "2024-03-05",
    status: "Active",
    materials: ["E-learning Module", "Case Studies", "Assessment Quiz"],
  },
];

interface TrainingResource {
  id: number;
  title: string;
  category: string;
  difficulty: string;
  duration: string;
  enrollments: number;
  completions: number;
  rating: number;
  instructor: string;
  uploadDate: string;
  status: string;
  materials: string[];
}

const TrainingResourcesDashboard: FC = () => {
  const [resources, setResources] = useState<TrainingResource[]>(trainingResources);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: "",
    category: "",
    difficulty: "",
    duration: "",
    instructor: "",
    description: "",
    materials: null as File | null,
  });

  const getDifficultyBadge = (difficulty: string) => {
    const variants: Record<string, "default" | "destructive" | "secondary"> = {
      Beginner: "secondary",
      Intermediate: "default",
      Advanced: "destructive",
    };

    return <Badge variant={variants[difficulty] || "default"}>{difficulty}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "destructive" | "secondary"> = {
      Active: "default",
      Draft: "secondary",
      Archived: "destructive",
    };

    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  const resourceColumns = [
    createSortableColumn("title", "Course Title"),
    createSortableColumn("category", "Category"),
    createSortableColumn("difficulty", "Difficulty", (row) =>
      getDifficultyBadge(row.difficulty)
    ),
    createSortableColumn("duration", "Duration"),
    createSortableColumn("instructor", "Instructor"),
    createSortableColumn("enrollments", "Enrollments"),
    createSortableColumn("completions", "Completions"),
    createSortableColumn("rating", "Rating", (row) => (
      <div className="flex items-center gap-1">
        <span>⭐</span>
        <span>{row.rating}</span>
      </div>
    )),
    createSortableColumn("uploadDate", "Upload Date", (row) => (
      <span>{new Date(row.uploadDate).toLocaleDateString()}</span>
    )),
    createSortableColumn("status", "Status", (row) =>
      getStatusBadge(row.status)
    ),
    createActionsColumn([
      {
        label: "View Details",
        onClick: (data) => console.log("View course details", data),
      },
      {
        label: "Edit Course",
        onClick: (data) => console.log("Edit course", data),
      },
      {
        label: "Manage Enrollments",
        onClick: (data) => console.log("Manage enrollments", data),
      },
      {
        label: "Download Materials",
        onClick: (data) => console.log("Download materials", data),
      },
    ]),
  ];

  const handleUploadCourse = async () => {
    if (!uploadForm.title || !uploadForm.category || !uploadForm.difficulty) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsUploading(true);
    
    try {
      // Simulate file upload and course creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newResource: TrainingResource = {
        id: resources.length + 1,
        title: uploadForm.title,
        category: uploadForm.category,
        difficulty: uploadForm.difficulty,
        duration: uploadForm.duration,
        enrollments: 0,
        completions: 0,
        rating: 0,
        instructor: uploadForm.instructor,
        uploadDate: new Date().toISOString().split('T')[0],
        status: "Active",
        materials: uploadForm.materials ? [uploadForm.materials.name] : [],
      };
      
      setResources(prev => [...prev, newResource]);
      
      toast.success("Course Uploaded Successfully", {
        description: `${uploadForm.title} has been added to the training resources.`,
      });
      
      // Reset form and close dialog
      setUploadForm({
        title: "",
        category: "",
        difficulty: "",
        duration: "",
        instructor: "",
        description: "",
        materials: null,
      });
      setIsUploadDialogOpen(false);
    } catch (error) {
      toast.error("Failed to upload the course. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadForm(prev => ({ ...prev, materials: file }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Training Resources
          </h1>
          <p className="text-muted-foreground">
            Manage and upload training courses and materials
          </p>
        </div>
        
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Upload Training Course</DialogTitle>
              <DialogDescription>
                Add a new training course with materials for your team.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title *</Label>
                <Input
                  id="title"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter course title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={uploadForm.category}
                  onValueChange={(value) => setUploadForm(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Risk Management">Risk Management</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Compliance">Compliance</SelectItem>
                    <SelectItem value="Soft Skills">Soft Skills</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                  </SelectContent>
                </Select>
                        </div>
              
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level *</Label>
                <Select
                  value={uploadForm.difficulty}
                  onValueChange={(value) => setUploadForm(prev => ({ ...prev, difficulty: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={uploadForm.duration}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="e.g., 2 hours"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="instructor">Instructor</Label>
                  <Input
                    id="instructor"
                    value={uploadForm.instructor}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, instructor: e.target.value }))}
                    placeholder="Instructor name"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Course description..."
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="materials">Course Materials</Label>
                <Input
                  id="materials"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.zip,.mp4,.avi"
                />
                <p className="text-xs text-muted-foreground">
                  Supported formats: PDF, DOC, PPT, ZIP, MP4, AVI
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsUploadDialogOpen(false)}
                disabled={isUploading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUploadCourse}
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Upload Course"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Training Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Courses
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {trainingMetrics.totalCourses}
            </div>
            <p className="text-xs text-muted-foreground">
              Available training courses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Enrollments
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {trainingMetrics.activeEnrollments}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently enrolled users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Courses
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {trainingMetrics.completedCourses}
            </div>
            <p className="text-xs text-muted-foreground">
              Total completions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Completion Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {trainingMetrics.averageCompletionTime}
            </div>
            <p className="text-xs text-muted-foreground">Per course</p>
          </CardContent>
        </Card>
      </div>

      {/* Training Resources Table */}
      <Card>
        <CardHeader>
          <CardTitle>Training Courses</CardTitle>
          <CardDescription>
            Manage all training courses and educational resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={resourceColumns}
            data={resources}
            searchKey="title"
            filterableColumns={[
              {
                id: "category",
                title: "Category",
                options: [
                  { label: "Risk Management", value: "Risk Management" },
                  { label: "Operations", value: "Operations" },
                  { label: "Compliance", value: "Compliance" },
                  { label: "Soft Skills", value: "Soft Skills" },
                  { label: "Technology", value: "Technology" },
                ],
              },
              {
                id: "difficulty",
                title: "Difficulty",
                options: [
                  { label: "Beginner", value: "Beginner" },
                  { label: "Intermediate", value: "Intermediate" },
                  { label: "Advanced", value: "Advanced" },
                ],
              },
              {
                id: "status",
                title: "Status",
                options: [
                  { label: "Active", value: "Active" },
                  { label: "Draft", value: "Draft" },
                  { label: "Archived", value: "Archived" },
                ],
              },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingResourcesDashboard;
