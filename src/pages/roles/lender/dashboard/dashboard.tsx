import { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Calendar,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Shield,
  GitBranch,
  Briefcase,
  ChartBar,
} from "lucide-react";
import { getTimeOfDay } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import GreetingCard from "@/components/common/cards/greeting-card";


export const greetingCardData = {
    userName: "John Doe",
    stats: [
      { icon: <FileText size={18} className="text-primary" />, label: "Active Applications", value: 12 }
    ],
    description: "Welcome back",
    footerTitle: "Manage loan applications, reviews, and funding decisions",
    footerDescription: "Streamline your lending process with AI-powered insights",
  }

const LenderDashboard: FC = () => {
  const { user } = useAuth();
  const timeOfDay = getTimeOfDay();
  const navigate = useNavigate();
  const userName = user?.name;

  // Sample data for charts
  const loanStatusData = [
    { name: "Approved", value: 35, color: "var(--brand-teal)" },
    { name: "Pending", value: 25, color: "var(--primary)" },
    { name: "Rejected", value: 15, color: "var(--destructive)" },
  ];

  const loanPerformanceData = [
    { month: "Jan", loans: 12 },
    { month: "Feb", loans: 15 },
    { month: "Mar", loans: 18 },
    { month: "Apr", loans: 14 },
    { month: "May", loans: 20 },
    { month: "Jun", loans: 22 },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Welcome Card */}
      <GreetingCard data={greetingCardData} />
      {/* Feature Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card
          className="hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => navigate("/lender/loan-review")}
        >
          <CardContent className="flex flex-col items-center justify-center p-6">
            <CheckCircle size={32} className="text-primary mb-2" />
            <span className="text-sm font-medium text-center">Loan Review</span>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => navigate("/lender/compliance")}
        >
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Shield size={32} className="text-primary mb-2" />
            <span className="text-sm font-medium text-center">Compliance</span>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => navigate("/lender/deal-pipeline")}
        >
          <CardContent className="flex flex-col items-center justify-center p-6">
            <GitBranch size={32} className="text-primary mb-2" />
            <span className="text-sm font-medium text-center">
              Deal Pipeline
            </span>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => navigate("/lender/loan-programs")}
        >
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Briefcase size={32} className="text-primary mb-2" />
            <span className="text-sm font-medium text-center">
              Loan Programs
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Active Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div className="text-3xl font-bold">12</div>
              <div className="flex items-center gap-1 text-sm text-[var(--brand-teal)]">
                <ArrowUpRight size={16} />
                <span className="text-xs">+2 this week</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div className="text-3xl font-bold">5</div>
              <div className="flex items-center gap-1 text-sm text-[var(--brand-teal)]">
                <ArrowDownRight size={16} />
                <span className="text-xs">-1 today</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Funded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div className="text-3xl font-bold">$2.4M</div>
              <div className="flex items-center gap-1 text-sm text-[var(--brand-teal)]">
                <ArrowUpRight size={16} />
                <span className="text-xs">+15% vs last month</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Loan Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Loan Application Status
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-[300px] w-full max-w-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={loanStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {loanStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                Loan Performance
              </CardTitle>
              <div className="flex items-center gap-2">
                <ChartBar size={18} className="text-primary" />
                <span className="text-sm font-medium">2025 Monthly Loans</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={loanPerformanceData}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <Line
                    type="monotone"
                    dataKey="loans"
                    stroke="var(--brand-teal)"
                    strokeWidth={2}
                  />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LenderDashboard;
