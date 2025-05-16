import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { IconCalendar, IconFileCheck, IconFiles, IconArrowUpRight, IconArrowDownRight, IconAlertTriangle, IconFileSearch, IconCheckbox, IconHistory } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useAuth } from "@/contexts/auth-context";

// Mock data for the dashboard
const loanStatusData = [
  { name: 'Pending Review', value: 18, color: '#FFB86B' },
  { name: 'In Progress', value: 12, color: '#3B82F6' },
  { name: 'Approved', value: 24, color: '#10B981' },
  { name: 'Rejected', value: 6, color: '#EF4444' },
];

const underwritingStats = {
  pendingReviews: 18,
  completedToday: 7,
  averageTurnaround: "1.2 days",
  complianceIssues: 2,
  approvalRate: {
    value: 80,
    isIncrease: true,
    changePercent: 5.2
  },
  efficiencyRate: {
    value: 92.5,
    isIncrease: true,
    changePercent: 3.8
  }
};

// Get time of day for greeting
const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
};

const UnderwritingManagerDashboard: FC = () => {
  const timeOfDay = getTimeOfDay();
  const navigate = useNavigate();
  const { user } = useAuth();
  const userName = user?.name || "Manager";

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Greeting Card */}
      <Card className="@container/card card-gradient-primary">
        <CardHeader>
          <CardDescription className="text-base">Welcome back</CardDescription>
          <CardTitle className="text-2xl font-semibold @[250px]/card:text-3xl">
            Good {timeOfDay}, {userName}!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm">
              <IconCalendar size={18} className="text-primary" />
              <span>Today: {new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <IconFileCheck size={18} className="text-primary" />
              <span>{underwritingStats.completedToday} Reviews Completed Today</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <IconFiles size={18} className="text-primary" />
              <span>{underwritingStats.pendingReviews} Pending Reviews</span>
            </div>
            {underwritingStats.complianceIssues > 0 && (
              <div className="flex items-center gap-2 text-sm text-amber-500">
                <IconAlertTriangle size={18} />
                <span>{underwritingStats.complianceIssues} Compliance Issues Flagged</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Validate borrower documentation and ensure loan compliance
          </div>
          <div className="text-muted-foreground">
            Review applications, maintain quality standards, and monitor audit trails
          </div>
        </CardFooter>
      </Card>

      {/* Main Feature Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/underwriting-manager/applications")}>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <IconFileSearch size={32} className="text-primary mb-2" />
            <span className="text-sm font-medium text-center">Document Validation</span>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/underwriting-manager/compliance")}>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <IconCheckbox size={32} className="text-primary mb-2" />
            <span className="text-sm font-medium text-center">Loan Compliance</span>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/underwriting-manager/audit-trails")}>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <IconHistory size={32} className="text-primary mb-2" />
            <span className="text-sm font-medium text-center">Audit Trails</span>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/underwriting-manager/review-queue")}>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <IconFiles size={32} className="text-primary mb-2" />
            <span className="text-sm font-medium text-center">Review Queue</span>
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div className="text-3xl font-bold">{underwritingStats.approvalRate.value}%</div>
              <div className={`flex items-center gap-1 text-sm ${underwritingStats.approvalRate.isIncrease ? 'text-[var(--brand-teal)]' : 'text-destructive'}`}>
                {underwritingStats.approvalRate.isIncrease ? (
                  <IconArrowUpRight size={16} />
                ) : (
                  <IconArrowDownRight size={16} />
                )}
                <span className="text-xs">{underwritingStats.approvalRate.changePercent}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Turnaround Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div className="text-3xl font-bold">{underwritingStats.averageTurnaround}</div>
              <div className="flex items-center gap-1 text-sm text-[var(--brand-teal)]">
                <span className="text-xs">On Target</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Team Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div className="text-3xl font-bold">{underwritingStats.efficiencyRate.value}%</div>
              <div className={`flex items-center gap-1 text-sm ${underwritingStats.efficiencyRate.isIncrease ? 'text-[var(--brand-teal)]' : 'text-destructive'}`}>
                {underwritingStats.efficiencyRate.isIncrease ? (
                  <IconArrowUpRight size={16} />
                ) : (
                  <IconArrowDownRight size={16} />
                )}
                <span className="text-xs">{underwritingStats.efficiencyRate.changePercent}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Loan Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Loan Application Status</CardTitle>
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
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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

        {/* Priority Review Queue */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Priority Review Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                { id: 'LOAN-4392', borrower: 'Smith, John', deadline: '2023-08-12', priority: 'High', status: 'Pending' },
                { id: 'LOAN-4387', borrower: 'Johnson, Lisa', deadline: '2023-08-12', priority: 'Medium', status: 'Processing' },
                { id: 'LOAN-4381', borrower: 'Williams, Robert', deadline: '2023-08-13', priority: 'High', status: 'Pending' },
                { id: 'LOAN-4378', borrower: 'Brown, Sarah', deadline: '2023-08-13', priority: 'Medium', status: 'Pending' },
                { id: 'LOAN-4375', borrower: 'Garcia, Maria', deadline: '2023-08-14', priority: 'Low', status: 'Processing' },
              ].map((loan) => (
                <li key={loan.id} className="border-b pb-2 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{loan.id}</div>
                      <div className="text-sm text-muted-foreground">{loan.borrower}</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        loan.priority === 'High'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                          : loan.priority === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
                      }`}>
                        {loan.priority}
                      </span>
                      <span className="text-xs mt-1">Due: {new Date(loan.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="justify-center">
            <button 
              className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1 hover:underline transition-colors"
              onClick={() => navigate("/underwriting-manager/review-queue")}
            >
              View All Review Tasks
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </CardFooter>
        </Card>
      </div>

      {/* Compliance and Audit Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Compliance Monitoring</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <IconAlertTriangle size={48} className="text-primary mr-4" />
              <div>
                <p className="mb-2">Ensure loan compliance with all regulations:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Regulatory requirements validation</li>
                  <li>Documentation completeness checks</li>
                  <li>Fraud detection systems</li>
                  <li>Quality control processes</li>
                </ul>
              </div>
            </div>
            <button 
              className="w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              onClick={() => navigate("/underwriting-manager/compliance")}
            >
              View Compliance Dashboard
            </button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Audit Trail Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <IconHistory size={48} className="text-primary mr-4" />
              <div>
                <p className="mb-2">Maintain complete loan file integrity:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Complete audit trail history</li>
                  <li>Document change tracking</li>
                  <li>Decision justification logs</li>
                  <li>Review timeline monitoring</li>
                </ul>
              </div>
            </div>
            <button 
              className="w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              onClick={() => navigate("/underwriting-manager/audit-trails")}
            >
              Access Audit Trails
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UnderwritingManagerDashboard; 