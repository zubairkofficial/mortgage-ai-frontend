import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter, CardAction } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockUserData } from "@/lib/navlinks";
import { IconCalendar,  IconFileText, IconTrendingUp, IconPlus } from "@tabler/icons-react";
import { DataTable, createSortableColumn, createActionsColumn } from "@/components/common/table";
import { useNavigate } from "react-router-dom";
// Define application type
type Application = {
  id: string;
  name: string;
  date: string;
  amount: string;
  term: string;
  status: string;
  statusColor: string;
}

// Mock applications data
const applications: Application[] = [
  {
    id: "APP-001",
    name: "Home Purchase Loan",
    date: "2023-10-15",
    amount: "$450,000",
    term: "30 years",
    status: "In Review",
    statusColor: "text-amber-600 bg-amber-100",
  },
  {
    id: "APP-002",
    name: "Refinance Application",
    date: "2023-11-03",
    amount: "$320,000",
    term: "15 years",
    status: "Approved",
    statusColor: "text-green-600 bg-green-100",
  },
  {
    id: "APP-003",
    name: "HELOC Application",
    date: "2023-12-21",
    amount: "$75,000",
    term: "10 years",
    status: "Pending Documents",
    statusColor: "text-blue-600 bg-blue-100",
  },
  {
    id: "APP-004",
    name: "Investment Property Loan",
    date: "2024-01-07",
    amount: "$550,000",
    term: "30 years",
    status: "Submitted",
    statusColor: "text-purple-600 bg-purple-100",
  },
];

// Get time of day for greeting
const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
};

const BorrowerDashboard: FC = () => {
  const timeOfDay = getTimeOfDay();
  const navigate = useNavigate();   
  const userName = mockUserData.name;

  // Define table columns
  const columns = [
    createSortableColumn<Application, string>("id", "Application ID"),
    createSortableColumn<Application, string>("name", "Name"),
    createSortableColumn<Application, string>("date", "Submission Date", 
      (data: Application) => <div>{new Date(data.date).toLocaleDateString()}</div>
    ),
    createSortableColumn<Application, string>("amount", "Amount"),
    createSortableColumn<Application, string>("term", "Term"),
    createSortableColumn<Application, string>("status", "Status", 
      (data: Application) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${data.statusColor}`}>
          {data.status}
        </span>
      )
    ),
    createActionsColumn<Application>([
      { 
        label: "View Details", 
        onClick: (data: Application) => console.log("View details", data.id)
      },
      { 
        label: "Edit Application", 
        onClick: (data: Application) => console.log("Edit", data.id)
      },
      { 
        label: "Delete", 
        onClick: (data: Application) => console.log("Delete", data.id),
        variant: "destructive" 
      },
    ])
  ];
 
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Greeting Card - Using global theme variables */}
      <Card className="@container/card card-gradient-primary">
        <CardHeader>
          <CardDescription className="text-base">Welcome back</CardDescription>
          <CardTitle className="text-2xl font-semibold @[250px]/card:text-3xl">
            Good {timeOfDay}, {userName}!
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              Active User
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm">
              <IconCalendar size={18} className="text-primary" />
              <span>Today: {new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <IconFileText size={18} className="text-primary" />
              <span>{applications.length} Active Applications</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Manage your mortgage applications efficiently
          </div>
          <div className="text-muted-foreground">
            Track status, submit documents, and get updates in real-time
          </div>
        </CardFooter>
      </Card>

   
      {/* Applications Table - Using DataTable component */}
      <DataTable
        columns={columns}
        data={applications}
        title="Your Applications"
        description="Track and manage all your mortgage applications"
        searchKey="name"
        filterableColumns={[
          {
            id: "status",
            title: "Status",
            options: [
              { label: "In Review", value: "In Review" },
              { label: "Approved", value: "Approved" },
              { label: "Pending Documents", value: "Pending Documents" },
              { label: "Submitted", value: "Submitted" }
            ]
          }
        ]}
        actionButtonText="New Application"
        actionButtonIcon={<IconPlus className="mr-2 h-4 w-4" />}
        onActionButtonClick={() => navigate("/borrower/application")}
      />
    </div>
  );
};

export default BorrowerDashboard;
