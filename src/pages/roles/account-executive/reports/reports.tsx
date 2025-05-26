import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, BarChart3, TrendingUp, Calendar,  FileText, AlertCircle,  } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data for performance trends
const performanceData = [
  { month: "Jan", loans: 120, conversion: 65, compliance: 92 },
  { month: "Feb", loans: 145, conversion: 68, compliance: 94 },
  { month: "Mar", loans: 132, conversion: 70, compliance: 93 },
  { month: "Apr", loans: 158, conversion: 72, compliance: 95 },
  { month: "May", loans: 168, conversion: 75, compliance: 96 },
  { month: "Jun", loans: 175, conversion: 78, compliance: 97 },
];

// Mock data for loan type distribution
const loanTypeData = [
  { name: "Conventional", value: 45 },
  { name: "FHA", value: 25 },
  { name: "VA", value: 15 },
  { name: "Jumbo", value: 15 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Mock data for broker performance
const brokerPerformanceData = [
  { name: "ABC Mortgage", loans: 156, conversion: 68.5, compliance: 95 },
  { name: "XYZ Lending", loans: 98, conversion: 72.3, compliance: 92 },
  { name: "First Rate Loans", loans: 145, conversion: 70.1, compliance: 94 },
  { name: "Elite Mortgage", loans: 112, conversion: 65.8, compliance: 91 },
  { name: "Premier Lending", loans: 134, conversion: 71.2, compliance: 93 },
];

const ReportsAnalytics: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Generate performance reports and analyze trends across your broker network
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="last30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">Last 7 Days</SelectItem>
              <SelectItem value="last30days">Last 30 Days</SelectItem>
              <SelectItem value="last90days">Last 90 Days</SelectItem>
              <SelectItem value="lastyear">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Performance Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Loans</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">828</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">71.4%</div>
            <p className="text-xs text-muted-foreground">
              +3.2% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Compliance Score</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.5%</div>
            <p className="text-xs text-muted-foreground">
              +1.5% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Brokers</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              Across all branches
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trends Chart */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
          <CardDescription>
            Monthly performance metrics across your broker network
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="loans"
                  stroke="#0088FE"
                  name="Total Loans"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="conversion"
                  stroke="#00C49F"
                  name="Conversion Rate"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="compliance"
                  stroke="#FFBB28"
                  name="Compliance Score"
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Loan Type Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Loan Type Distribution</CardTitle>
          <CardDescription>
            Distribution of loan types across your network
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={loanTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {loanTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Broker Performance Comparison */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Broker Performance Comparison</CardTitle>
          <CardDescription>
            Performance metrics by broker
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={brokerPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar
                  yAxisId="left"
                  dataKey="loans"
                  fill="#0088FE"
                  name="Total Loans"
                />
                <Bar
                  yAxisId="right"
                  dataKey="conversion"
                  fill="#00C49F"
                  name="Conversion Rate"
                />
                <Bar
                  yAxisId="right"
                  dataKey="compliance"
                  fill="#FFBB28"
                  name="Compliance Score"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights Card */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Driven Insights</CardTitle>
          <CardDescription>
            Automated analysis and recommendations based on performance data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-500 mt-1" />
              <div>
                <h4 className="font-medium mb-1">Positive Trend Detected</h4>
                <p className="text-sm text-muted-foreground">
                  Conversion rates have shown consistent improvement over the last 3 months.
                  Current training and support initiatives appear effective.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-500 mt-1" />
              <div>
                <h4 className="font-medium mb-1">Opportunity Identified</h4>
                <p className="text-sm text-muted-foreground">
                  FHA loan applications show lower conversion rates compared to other loan types.
                  Consider additional training focused on FHA loan processing.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsAnalytics; 