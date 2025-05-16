import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { IconCalendar, IconUsers,  IconArrowUpRight, IconArrowDownRight, IconBriefcase, IconChartLine, IconBookUpload, IconCertificate, IconClipboardCheck } from "@tabler/icons-react";
import { useAuth } from "@/contexts/auth-context";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for the dashboard
const brokerPerformanceData = [
  { name: 'John D.', loans: 12, target: 10 },
  { name: 'Sarah M.', loans: 18, target: 15 },
  { name: 'Robert J.', loans: 8, target: 10 },
  { name: 'Amanda K.', loans: 14, target: 12 },
  { name: 'Michael P.', loans: 10, target: 10 },
  { name: 'Lisa B.', loans: 16, target: 12 },
];

const branchStats = {
  totalBrokers: 16,
  activeBrokers: 14,
  totalLoans: 78,
  conversionRate: {
    value: 68.7,
    isIncrease: true,
    changePercent: 4.2
  },
  revenue: {
    value: "$438,500",
    isIncrease: true,
    changePercent: 12.3
  },
  complianceScore: {
    value: 94,
    isIncrease: false,
    changePercent: 2.1
  }
};

// Get time of day for greeting
const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
};

const BranchManagerDashboard: FC = () => {
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
              <IconUsers size={18} className="text-primary" />
              <span>{branchStats.activeBrokers} Active Team Members</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <IconBriefcase size={18} className="text-primary" />
              <span>{branchStats.totalLoans} Active Loan Applications</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Manage broker teams at the branch level efficiently
          </div>
          <div className="text-muted-foreground">
            Monitor performance metrics, enforce compliance, and provide training
          </div>
        </CardFooter>
      </Card>

      {/* Main Feature Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/branch-manager/team")}>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <IconUsers size={32} className="text-primary mb-2" />
            <span className="text-sm font-medium text-center">Broker Team</span>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/branch-manager/performance")}>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <IconChartLine size={32} className="text-primary mb-2" />
            <span className="text-sm font-medium text-center">Performance Metrics</span>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/branch-manager/compliance")}>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <IconClipboardCheck size={32} className="text-primary mb-2" />
            <span className="text-sm font-medium text-center">Compliance</span>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/branch-manager/training")}>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <IconBookUpload size={32} className="text-primary mb-2" />
            <span className="text-sm font-medium text-center">Training Resources</span>
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div className="text-3xl font-bold">{branchStats.conversionRate.value}%</div>
              <div className={`flex items-center gap-1 text-sm ${branchStats.conversionRate.isIncrease ? 'text-[var(--brand-teal)]' : 'text-destructive'}`}>
                {branchStats.conversionRate.isIncrease ? (
                  <IconArrowUpRight size={16} />
                ) : (
                  <IconArrowDownRight size={16} />
                )}
                <span className="text-xs">{branchStats.conversionRate.changePercent}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div className="text-3xl font-bold">{branchStats.revenue.value}</div>
              <div className={`flex items-center gap-1 text-sm ${branchStats.revenue.isIncrease ? 'text-[var(--brand-teal)]' : 'text-destructive'}`}>
                {branchStats.revenue.isIncrease ? (
                  <IconArrowUpRight size={16} />
                ) : (
                  <IconArrowDownRight size={16} />
                )}
                <span className="text-xs">{branchStats.revenue.changePercent}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div className="text-3xl font-bold">{branchStats.complianceScore.value}%</div>
              <div className={`flex items-center gap-1 text-sm ${branchStats.complianceScore.isIncrease ? 'text-[var(--brand-teal)]' : 'text-destructive'}`}>
                {branchStats.complianceScore.isIncrease ? (
                  <IconArrowUpRight size={16} />
                ) : (
                  <IconArrowDownRight size={16} />
                )}
                <span className="text-xs">{branchStats.complianceScore.changePercent}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Performance Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Team Performance</CardTitle>
            <div className="flex items-center gap-2">
              <IconChartLine size={18} className="text-primary" />
              <span className="text-sm font-medium">Current Month</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={brokerPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="loans" fill="var(--brand-teal)" name="Completed Loans" />
                <Bar dataKey="target" fill="var(--primary)" name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Additional Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Team Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <IconUsers size={48} className="text-primary mr-4" />
              <div>
                <p className="mb-2">Manage broker teams at the branch level:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Team member profiles and assignments</li>
                  <li>Skill matrix and specialization tracking</li>
                  <li>Performance evaluation and goals</li>
                  <li>Capacity planning and workload distribution</li>
                </ul>
              </div>
            </div>
            <button 
              className="w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              onClick={() => navigate("/branch-manager/team")}
            >
              Manage Team
            </button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Compliance Monitoring</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <IconClipboardCheck size={48} className="text-primary mr-4" />
              <div>
                <p className="mb-2">Enforce compliance across your branch:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Regulatory requirement tracking</li>
                  <li>Policy adherence monitoring</li>
                  <li>Audit preparation tools</li>
                  <li>Compliance training completion status</li>
                </ul>
              </div>
            </div>
            <button 
              className="w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              onClick={() => navigate("/branch-manager/compliance")}
            >
              View Compliance Dashboard
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Training Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Latest Training Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {[
              { title: 'New Compliance Regulations 2023', date: '2023-08-02', type: 'Compliance', required: true },
              { title: 'Advanced CRM Usage Workshop', date: '2023-07-28', type: 'System', required: false },
              { title: 'Best Practices for Client Onboarding', date: '2023-07-20', type: 'Process', required: true },
              { title: 'Effective Communication with Lenders', date: '2023-07-15', type: 'Skill', required: false },
            ].map((resource, index) => (
              <li key={index} className="border-b pb-2 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{resource.title}</div>
                    <div className="text-sm text-muted-foreground">Added: {new Date(resource.date).toLocaleDateString()}</div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      resource.type === 'Compliance'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                        : resource.type === 'Process'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
                        : resource.type === 'System'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300'
                        : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                    }`}>
                      {resource.type}
                    </span>
                    {resource.required && (
                      <span className="text-xs mt-1 text-red-500">Required</span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="justify-center">
          <button 
            className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1 hover:underline transition-colors"
            onClick={() => navigate("/branch-manager/training")}
          >
            View All Training Resources
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </CardFooter>
      </Card>

      {/* Certification and Development */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Broker Certification Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-6">
            <IconCertificate size={48} className="text-primary mr-4" />
            <div>
              <p>Track and encourage professional development within your team. Set certification goals and monitor progress.</p>
            </div>
          </div>
          <ul className="space-y-3">
            {[
              { name: 'John Doe', position: 'Senior Broker', certifications: 4, inProgress: 1, required: 5 },
              { name: 'Sarah Miller', position: 'Broker', certifications: 3, inProgress: 2, required: 5 },
              { name: 'Robert Johnson', position: 'Junior Broker', certifications: 2, inProgress: 2, required: 5 },
            ].map((broker, index) => (
              <li key={index} className="border-b pb-2 last:border-0 last:pb-0">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{broker.name}</div>
                    <div className="text-sm text-muted-foreground">{broker.position}</div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-xs">Completed: {broker.certifications}/{broker.required}</span>
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${(broker.certifications / broker.required) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    {broker.inProgress > 0 && (
                      <span className="text-xs text-amber-500 mt-1">{broker.inProgress} certification(s) in progress</span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="justify-center">
          <button 
            className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1 hover:underline transition-colors"
            onClick={() => navigate("/branch-manager/certifications")}
          >
            View All Certifications
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BranchManagerDashboard; 