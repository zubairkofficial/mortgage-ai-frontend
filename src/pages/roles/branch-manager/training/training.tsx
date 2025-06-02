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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Book,
  FileText,
  Video,
  Award,
  Clock,
  Users,
  Download,
  Upload,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Eye,
} from "lucide-react";
import { toast } from "sonner";

// Mock data for training metrics
const trainingMetrics = {
  totalCourses: 25,
  activeCourses: 18,
  completedCourses: 142,
  inProgressCourses: 24,
  averageCompletion: 78,
  upcomingDeadlines: 5,
};

// Enhanced course interface with materials
interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  type: string;
  duration: string;
  level: string;
  required: boolean;
  enrolled: number;
  completionRate: number;
  instructor: string;
  materials: UploadedFile[];
  lastUpdated: string;
  status: string;
}

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
}

interface CourseFormData {
  title: string;
  description: string;
  category: string;
  type: string;
  duration: string;
  level: string;
  required: boolean;
  instructor: string;
  materials: File[];
}

// Enhanced mock data with materials
const initialCourses: Course[] = [
  {
    id: 1,
    title: "Advanced Loan Processing",
    description: "Comprehensive guide to advanced loan processing techniques and best practices",
    category: "Technical",
    type: "Video Course",
    duration: "2h 30m",
    level: "Advanced",
    required: true,
    enrolled: 12,
    completionRate: 85,
    instructor: "John Smith",
    materials: [
      {
        id: "1",
        name: "loan_processing_guide.pdf",
        type: "PDF",
        size: "2.4 MB",
        uploadDate: "2024-03-01",
      },
      {
        id: "2",
        name: "loan_forms_template.xlsx",
        type: "Excel",
        size: "1.2 MB",
        uploadDate: "2024-03-01",
      },
    ],
    lastUpdated: "2024-03-01",
    status: "Active",
  },
  {
    id: 2,
    title: "Compliance Regulations 2024",
    description: "Updated compliance regulations and procedures for 2024",
    category: "Compliance",
    type: "Documentation",
    duration: "1h 45m",
    level: "Intermediate",
    required: true,
    enrolled: 15,
    completionRate: 92,
    instructor: "Sarah Johnson",
    materials: [
      {
        id: "3",
        name: "compliance_manual_2024.pdf",
        type: "PDF",
        size: "5.8 MB",
        uploadDate: "2024-02-15",
      },
    ],
    lastUpdated: "2024-02-15",
    status: "Active",
  },
  {
    id: 3,
    title: "Client Communication Skills",
    description: "Improve your client communication and relationship building skills",
    category: "Soft Skills",
    type: "Interactive",
    duration: "3h 00m",
    level: "Beginner",
    required: false,
    enrolled: 8,
    completionRate: 78,
    instructor: "Michael Brown",
    materials: [
      {
        id: "4",
        name: "communication_handbook.pdf",
        type: "PDF",
        size: "1.9 MB",
        uploadDate: "2024-03-10",
      },
      {
        id: "5",
        name: "communication_training_video.mp4",
        type: "Video",
        size: "45 MB",
        uploadDate: "2024-03-10",
      },
    ],
    lastUpdated: "2024-03-10",
    status: "Active",
  },
];

const TrainingCenter: FC = () => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    description: "",
    category: "",
    type: "",
    duration: "",
    level: "",
    required: false,
    instructor: "",
    materials: [],
  });

  const handleInputChange = (
    field: keyof CourseFormData,
    value: string | boolean | File[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleInputChange("materials", files);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.category || !formData.type) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsUploading(true);

    try {
      // Simulate file upload process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Convert uploaded files to UploadedFile format
      const uploadedMaterials: UploadedFile[] = formData.materials.map(
        (file, index) => ({
          id: `${Date.now()}-${index}`,
          name: file.name,
          type: file.type.includes("pdf") ? "PDF" : 
                file.type.includes("video") ? "Video" :
                file.type.includes("excel") || file.type.includes("spreadsheet") ? "Excel" :
                "Document",
          size: formatFileSize(file.size),
          uploadDate: new Date().toISOString().split("T")[0],
        })
      );

      const newCourse: Course = {
        id: courses.length + 1,
        ...formData,
        materials: uploadedMaterials,
        enrolled: 0,
        completionRate: 0,
        lastUpdated: new Date().toISOString().split("T")[0],
        status: "Active",
      };

      setCourses((prev) => [...prev, newCourse]);
      setIsDialogOpen(false);
      setFormData({
        title: "",
        description: "",
        category: "",
        type: "",
        duration: "",
        level: "",
        required: false,
        instructor: "",
        materials: [],
      });

      toast.success("Course created successfully!");
    } catch (error) {
      toast.error("Failed to create course");
    } finally {
      setIsUploading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      Active: "bg-green-100 text-green-800",
      Draft: "bg-yellow-100 text-yellow-800",
      Archived: "bg-gray-100 text-gray-800",
    };

    return (
      <Badge className={statusColors[status as keyof typeof statusColors]}>
        {status}
      </Badge>
    );
  };

  const getLevelBadge = (level: string) => {
    const levelColors = {
      Beginner: "bg-blue-100 text-blue-800",
      Intermediate: "bg-orange-100 text-orange-800",
      Advanced: "bg-red-100 text-red-800",
    };

    return (
      <Badge className={levelColors[level as keyof typeof levelColors]}>
        {level}
      </Badge>
    );
  };

  const handleDeleteCourse = (courseId: number) => {
    setCourses((prev) => prev.filter((course) => course.id !== courseId));
    toast.success("Course deleted successfully");
  };

  const handleViewMaterials = (course: Course) => {
    console.log("View materials for course:", course);
    // Here you would implement a modal or page to view/download materials
    toast.info(`Viewing materials for: ${course.title}`);
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
    createSortableColumn("instructor", "Instructor"),
    createSortableColumn("enrolled", "Enrolled"),
    createSortableColumn("completionRate", "Completion Rate", (row) => (
      <div className="flex items-center gap-2">
        <Progress value={row.completionRate} className="w-24" />
        <span className="text-sm">{row.completionRate}%</span>
      </div>
    )),
    createSortableColumn("materials", "Materials", (row) => (
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <span>{row.materials.length} files</span>
      </div>
    )),
    createSortableColumn("status", "Status", (row) => getStatusBadge(row.status)),
    createSortableColumn("lastUpdated", "Last Updated", (row) => (
      <span>{new Date(row.lastUpdated).toLocaleDateString()}</span>
    )),
    createActionsColumn([
      {
        label: "View Materials",
        onClick: (data) => handleViewMaterials(data),
        icon: <Eye className="h-4 w-4" />,
      },
      {
        label: "Edit Course",
        onClick: (data) => console.log("Edit course", data),
        icon: <FileText className="h-4 w-4" />,
      },
      {
        label: "Delete Course",
        onClick: (data) => handleDeleteCourse(data.id),
        icon: <Trash2 className="h-4 w-4" />,
        variant: "destructive",
      },
    ]),
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Training Management</h1>
        <p className="text-muted-foreground">
          Manage training courses and upload learning materials
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

      {/* Main Course Management Table */}
      <Card>
        <CardHeader>
          <CardTitle>Course Management</CardTitle>
          <CardDescription>
            Create, manage, and upload materials for training courses
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
            actionButtonText="Add New Course"
            actionButtonIcon={<Plus className="mr-2 h-4 w-4" />}
            onActionButtonClick={() => setIsDialogOpen(true)}
          />
        </CardContent>
      </Card>

      {/* Add Course Dialog with File Upload */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
            <DialogDescription>
              Create a new training course and upload materials like PDFs, videos, and documents
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Course Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter course title"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Enter course description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category *</Label>
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
                    <SelectItem value="Risk Management">Risk Management</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="type">Course Type *</Label>
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
                    <SelectItem value="E-Learning">E-Learning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
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
            </div>

            <div className="grid gap-2">
              <Label htmlFor="instructor">Instructor</Label>
              <Input
                id="instructor"
                value={formData.instructor}
                onChange={(e) => handleInputChange("instructor", e.target.value)}
                placeholder="Enter instructor name"
              />
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

            <div className="grid gap-2">
              <Label htmlFor="materials">Course Materials</Label>
              <Input
                id="materials"
                type="file"
                multiple
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xlsx,.xls,.mp4,.avi,.mov,.zip"
                className="cursor-pointer"
              />
              <p className="text-xs text-muted-foreground">
                Supported formats: PDF, DOC, PPT, Excel, MP4, AVI, ZIP (Multiple files allowed)
              </p>
              {formData.materials.length > 0 && (
                <div className="mt-2 space-y-2">
                  <p className="text-sm font-medium">Selected files:</p>
                  {formData.materials.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      <span>{file.name}</span>
                      <span>({formatFileSize(file.size)})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={isUploading}
              className="min-w-[120px]"
            >
              {isUploading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground" />
                  Uploading...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Create Course
                </div>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrainingCenter;
