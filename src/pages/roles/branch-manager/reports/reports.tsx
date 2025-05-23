import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataTable, createSortableColumn, createActionsColumn } from "@/components/common/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, TrendingUp } from "lucide-react";
import {  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, LineChart as RechartsLineChart, Line, CartesianGrid } from 'recharts';

// Mock data for performance trends
const performanceTrends = [
  { month: 'Jan', loans: 45, revenue: 320000, conversion: 78 },
  { month: 'Feb', loans: 52, revenue: 380000, conversion: 82 },
  { month: 'Mar', loans: 48, revenue: 350000, conversion: 80 },
  { month: 'Apr', loans: 60, revenue: 420000, conversion: 85 },
  { month: 'May', loans: 55, revenue: 400000, conversion: 83 },
  { month: 'Jun', loans: 65, revenue: 450000, conversion: 87 },
];

// Mock data for loan distribution
const loanDistribution = [
  { type: 'Residential', value: 45, color: 'var(--brand-teal)' },
  { type: 'Commercial', value: 25, color: 'var(--primary)' },
  { type: 'Investment', value: 20, color: 'var(--amber-500)' },
  { type: 'Refinance', value: 10, color: 'var(--purple-500)' },
];

// Mock data for broker performance
const brokerPerformance = [
  {
    id: 1,
    broker: "John Doe",
    position: "Senior Broker",
    totalLoans: 45,
    successRate: 92,
    avgProcessingTime: "3.2 days",
    revenue: "$320,000",
    clientSatisfaction: 4.8,
    lastMonthTrend: "+12%",
  },
  {
    id: 2,
    broker: "Sarah Miller",
    position: "Broker",
    totalLoans: 38,
    successRate: 88,
    avgProcessingTime: "3.5 days",
    revenue: "$280,000",
    clientSatisfaction: 4.6,
    lastMonthTrend: "+8%",
  },
  {
    id: 3,
    broker: "Robert Johnson",
    position: "Junior Broker",
    totalLoans: 25,
    successRate: 82,
    avgProcessingTime: "4.1 days",
    revenue: "$180,000",
    clientSatisfaction: 4.2,
    lastMonthTrend: "-5%",
  },
];

// Mock data for saved reports
const savedReports = [
  {
    id: 1,
    name: "Monthly Performance Summary",
    type: "Performance",
    lastGenerated: "2024-03-15",
    schedule: "Monthly",
    format: "PDF",
    recipients: ["management@example.com"],
  },
  {
    id: 2,
    name: "Broker Performance Analysis",
    type: "Broker",
    lastGenerated: "2024-03-14",
    schedule: "Weekly",
    format: "Excel",
    recipients: ["team@example.com"],
  },
  {
    id: 3,
    name: "Loan Distribution Report",
    type: "Loans",
    lastGenerated: "2024-03-13",
    schedule: "Monthly",
    format: "PDF",
    recipients: ["analytics@example.com"],
  },
];

const ReportsDashboard: FC = () => {
  const brokerColumns = [
    createSortableColumn("broker", "Broker"),
    createSortableColumn("position", "Position"),
    createSortableColumn("totalLoans", "Total Loans"),
    createSortableColumn("successRate", "Success Rate", (row) => (
      <div className="flex items-center gap-2">
        <span>{row.successRate}%</span>
        {row.successRate >= 90 && (
          <TrendingUp className="h-4 w-4 text-[var(--brand-teal)]" />
        )}
      </div>
    )),
    createSortableColumn("avgProcessingTime", "Avg. Processing Time"),
    createSortableColumn("revenue", "Revenue"),
    createSortableColumn("clientSatisfaction", "Client Satisfaction", (row) => (
      <div className="flex items-center gap-1">
        <span>{row.clientSatisfaction}/5</span>
        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full"
            style={{ width: `${(row.clientSatisfaction / 5) * 100}%` }}
          />
        </div>
      </div>
    )),
    createSortableColumn("lastMonthTrend", "Last Month Trend", (row) => (
      <Badge
        variant={row.lastMonthTrend.startsWith("+") ? "default" : "destructive"}
      >
        {row.lastMonthTrend}
      </Badge>
    )),
    createActionsColumn([
      {
        label: "View Details",
        onClick: (data) => console.log("View broker details", data),
      },
      {
        label: "Export Report",
        onClick: (data) => console.log("Export broker report", data),
      },
    ]),
  ];

  const savedReportsColumns = [
    createSortableColumn("name", "Report Name"),
    createSortableColumn("type", "Type", (row) => (
      <Badge variant="outline">{row.type}</Badge>
    )),
    createSortableColumn("lastGenerated", "Last Generated", (row) => (
      <span>{new Date(row.lastGenerated).toLocaleDateString()}</span>
    )),
    createSortableColumn("schedule", "Schedule"),
    createSortableColumn("format", "Format", (row) => (
      <Badge variant="secondary">{row.format}</Badge>
    )),
    createSortableColumn("recipients", "Recipients", (row) => (
      <div className="flex flex-wrap gap-1">
        {row.recipients.map((email: string) => (
          <Badge key={email} variant="outline" className="text-xs">
            {email}
          </Badge>
        ))}
      </div>
    )),
    createActionsColumn([
      {
        label: "Generate Now",
        onClick: (data) => console.log("Generate report", data),
      },
      {
        label: "Edit Schedule",
        onClick: (data) => console.log("Edit report schedule", data),
      },
      {
        label: "Delete",
        onClick: (data) => console.log("Delete report", data),
        variant: "destructive",
      },
    ]),
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-muted-foreground">
          Generate and manage reports, analyze performance metrics, and track key indicators
        </p>
      </div>

      {/* Report Generation Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Custom Report</CardTitle>
          <CardDescription>
            Create a new report with custom parameters and filters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="performance">Performance Report</SelectItem>
                  <SelectItem value="broker">Broker Analysis</SelectItem>
                  <SelectItem value="loans">Loan Distribution</SelectItem>
                  <SelectItem value="compliance">Compliance Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Format</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Performance Overview */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
            <CardDescription>Monthly performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={performanceTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="loans"
                    stroke="var(--brand-teal)"
                    name="Total Loans"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="conversion"
                    stroke="var(--primary)"
                    name="Conversion Rate"
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Loan Distribution</CardTitle>
            <CardDescription>Distribution by loan type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={loanDistribution}
                    dataKey="value"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {loanDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="broker" className="space-y-4">
        <TabsList>
          <TabsTrigger value="broker">Broker Performance</TabsTrigger>
          <TabsTrigger value="saved">Saved Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="broker" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Broker Performance Report</CardTitle>
              <CardDescription>
                Detailed analysis of individual broker performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={brokerColumns}
                data={brokerPerformance}
                searchKey="broker"
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
                actionButtonText="Export Report"
                actionButtonIcon={<Download className="mr-2 h-4 w-4" />}
                onActionButtonClick={() => console.log("Export broker performance report")}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Saved Reports</CardTitle>
              <CardDescription>
                Manage scheduled and saved reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={savedReportsColumns}
                data={savedReports}
                searchKey="name"
                filterableColumns={[
                  {
                    id: "type",
                    title: "Type",
                    options: [
                  
                      { label: "Performance", value: "Performance" },
                      { label: "Broker", value: "Broker" },
                      { label: "Loans", value: "Loans" },
                    ],
                  },
                  {
                    id: "schedule",
                    title: "Schedule",
                    options: [
                  
                      { label: "Daily", value: "Daily" },
                      { label: "Weekly", value: "Weekly" },
                      { label: "Monthly", value: "Monthly" },
                    ],
                  },
                ]}
                actionButtonText="Create New Report"
                actionButtonIcon={<FileText className="mr-2 h-4 w-4" />}
                onActionButtonClick={() => console.log("Create new report")}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsDashboard; 