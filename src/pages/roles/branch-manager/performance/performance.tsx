import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataTable, createSortableColumn } from "@/components/common/table";
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Lightbulb, Target, Award, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';

// Mock data for performance metrics
const monthlyPerformanceData = [
  { month: 'Jan', loans: 45, approvals: 38, revenue: 320000 },
  { month: 'Feb', loans: 52, approvals: 45, revenue: 380000 },
  { month: 'Mar', loans: 48, approvals: 42, revenue: 350000 },
  { month: 'Apr', loans: 60, approvals: 52, revenue: 420000 },
  { month: 'May', loans: 55, approvals: 48, revenue: 400000 },
  { month: 'Jun', loans: 65, approvals: 58, revenue: 450000 },
];

const brokerPerformanceData = [
  {
    id: 1,
    name: "John Doe",
    position: "Senior Broker",
    loansProcessed: 45,
    approvalRate: 92,
    avgProcessingTime: "3.2 days",
    revenue: "$320,000",
    trend: "up",
    trendValue: 12,
    coachingTip: "Focus on high-value commercial loans to increase revenue per application",
  },
  {
    id: 2,
    name: "Sarah Miller",
    position: "Broker",
    loansProcessed: 38,
    approvalRate: 88,
    avgProcessingTime: "3.5 days",
    revenue: "$280,000",
    trend: "up",
    trendValue: 8,
    coachingTip: "Consider reducing processing time by streamlining documentation collection",
  },
  {
    id: 3,
    name: "Robert Johnson",
    position: "Junior Broker",
    loansProcessed: 25,
    approvalRate: 82,
    avgProcessingTime: "4.1 days",
    revenue: "$180,000",
    trend: "down",
    trendValue: 5,
    coachingTip: "Work on improving approval rate by focusing on pre-qualification criteria",
  },
];

const branchKPIs = {
  totalLoans: {
    value: 168,
    change: 15,
    isIncrease: true,
  },
  approvalRate: {
    value: 89.2,
    change: 2.3,
    isIncrease: true,
  },
  avgProcessingTime: {
    value: "3.6 days",
    change: 0.4,
    isIncrease: false,
  },
  revenue: {
    value: "$2,320,000",
    change: 12.5,
    isIncrease: true,
  },
};

const PerformanceDashboard: FC = () => {
  const columns = [
    createSortableColumn("name", "Broker"),
    createSortableColumn("position", "Position"),
    createSortableColumn("loansProcessed", "Loans Processed"),
    createSortableColumn("approvalRate", "Approval Rate", (row) => (
      <div className="flex items-center gap-2">
        <span>{row.approvalRate}%</span>
        {row.approvalRate >= 90 && (
          <Award className="h-4 w-4 text-amber-500" />
        )}
      </div>
    )),
    createSortableColumn("avgProcessingTime", "Avg. Processing Time"),
    createSortableColumn("revenue", "Revenue"),
    createSortableColumn("trend", "Trend", (row) => (
      <div className={`flex items-center gap-1 ${
        row.trend === "up" ? "text-[var(--brand-teal)]" : "text-destructive"
      }`}>
        {row.trend === "up" ? (
          <TrendingUp className="h-4 w-4" />
        ) : (
          <TrendingDown className="h-4 w-4" />
        )}
        <span>{row.trendValue}%</span>
      </div>
    )),
    createSortableColumn("coachingTip", "AI Coaching Tip", (row) => (
      <div className="flex items-start gap-2">
        <Lightbulb className="h-4 w-4 text-amber-500 mt-1 flex-shrink-0" />
        <span className="text-sm text-muted-foreground">{row.coachingTip}</span>
      </div>
    )),
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Performance Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor branch performance metrics and broker KPIs
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Loans</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{branchKPIs.totalLoans.value}</div>
            <div className="flex items-center gap-1 text-sm">
              {branchKPIs.totalLoans.isIncrease ? (
                <ArrowUpRight className="h-4 w-4 text-[var(--brand-teal)]" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-destructive" />
              )}
              <span className={branchKPIs.totalLoans.isIncrease ? "text-[var(--brand-teal)]" : "text-destructive"}>
                {branchKPIs.totalLoans.change}%
              </span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{branchKPIs.approvalRate.value}%</div>
            <div className="flex items-center gap-1 text-sm">
              {branchKPIs.approvalRate.isIncrease ? (
                <ArrowUpRight className="h-4 w-4 text-[var(--brand-teal)]" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-destructive" />
              )}
              <span className={branchKPIs.approvalRate.isIncrease ? "text-[var(--brand-teal)]" : "text-destructive"}>
                {branchKPIs.approvalRate.change}%
              </span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Processing Time</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{branchKPIs.avgProcessingTime.value}</div>
            <div className="flex items-center gap-1 text-sm">
              {branchKPIs.avgProcessingTime.isIncrease ? (
                <ArrowUpRight className="h-4 w-4 text-destructive" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-[var(--brand-teal)]" />
              )}
              <span className={branchKPIs.avgProcessingTime.isIncrease ? "text-destructive" : "text-[var(--brand-teal)]"}>
                {branchKPIs.avgProcessingTime.change} days
              </span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{branchKPIs.revenue.value}</div>
            <div className="flex items-center gap-1 text-sm">
              {branchKPIs.revenue.isIncrease ? (
                <ArrowUpRight className="h-4 w-4 text-[var(--brand-teal)]" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-destructive" />
              )}
              <span className={branchKPIs.revenue.isIncrease ? "text-[var(--brand-teal)]" : "text-destructive"}>
                {branchKPIs.revenue.change}%
              </span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Loan Volume</CardTitle>
            <CardDescription>Total loans and approvals over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="loans" fill="var(--brand-teal)" name="Total Loans" />
                  <Bar dataKey="approvals" fill="var(--primary)" name="Approvals" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--brand-teal)"
                    name="Revenue"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Broker Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Broker Performance</CardTitle>
          <CardDescription>
            Individual broker metrics with AI-generated coaching tips
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={brokerPerformanceData}
            searchKey="name"
            filterableColumns={[
              {
                id: "position",
                title: "Position",
                options: [
             
                  { label: "Senior Broker", value: "Senior Broker" },
                  { label: "Broker", value: "Broker" },
                  { label: "Junior Broker", value: "Junior Broker" },
                ],
              },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceDashboard; 