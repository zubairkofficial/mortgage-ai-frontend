import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Calendar, Users, Building, ArrowUpRight, ArrowDownRight, ChartBar, ClipboardCheck, Briefcase, MessageCircle, CreditCard, Settings } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the dashboard
const brokerPerformanceData = [
  { month: 'Jan', loans: 42 },
  { month: 'Feb', loans: 38 },
  { month: 'Mar', loans: 45 },
  { month: 'Apr', loans: 52 },
  { month: 'May', loans: 49 },
  { month: 'Jun', loans: 58 },
  { month: 'Jul', loans: 62 },
];

const brokerStats = {
  totalBrokers: 48,
  activeBrokers: 42,
  totalBranches: 8,
  monthlyPerformance: {
    value: 12.5,
    isIncrease: true,
  },
  complianceRate: {
    value: 98.2,
    isIncrease: true,
  },
};

// Get time of day for greeting
const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
};

const AccountExecutiveDashboard: FC = () => {
  const timeOfDay = getTimeOfDay();
  const navigate = useNavigate();
  const { user } = useAuth();
  const userName = user?.name || "Executive";

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
              <Calendar size={18} className="text-primary" />
              <span>Today: {new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users size={18} className="text-primary" />
              <span>{brokerStats.activeBrokers} Active Brokers</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Building size={18} className="text-primary" />
              <span>{brokerStats.totalBranches} Branches</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Oversee multiple brokers and branches efficiently
          </div>
          <div className="text-muted-foreground">
            Monitor performance, ensure CRM compliance, and support consistent operations
          </div>
        </CardFooter>
      </Card>

      {/* Feature Cards */}
      <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/account-executive/brokers")}>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Users size={32} className="text-primary mb-2" />
            <span className="text-sm font-medium text-center">Broker Management</span>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/account-executive/transactions")}>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <CreditCard size={32} className="text-primary mb-2" />
            <span className="text-sm font-medium text-center">Transactions</span>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/account-executive/operations")}>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Settings size={32} className="text-primary mb-2" />
            <span className="text-sm font-medium text-center">Operations</span>
          </CardContent>
        </Card>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Brokers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div className="text-3xl font-bold">{brokerStats.totalBrokers}</div>
              <div className="flex items-center gap-1 text-sm">
                <span className="text-xs">Active: {brokerStats.activeBrokers}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div className="text-3xl font-bold">{brokerStats.monthlyPerformance.value}%</div>
              <div className={`flex items-center gap-1 text-sm ${brokerStats.monthlyPerformance.isIncrease ? 'text-[var(--brand-teal)]' : 'text-destructive'}`}>
                {brokerStats.monthlyPerformance.isIncrease ? (
                  <ArrowUpRight size={16} />
                ) : (
                  <ArrowDownRight size={16} />
                )}
                <span className="text-xs">vs last month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div className="text-3xl font-bold">{brokerStats.complianceRate.value}%</div>
              <div className={`flex items-center gap-1 text-sm ${brokerStats.complianceRate.isIncrease ? 'text-[var(--brand-teal)]' : 'text-destructive'}`}>
                {brokerStats.complianceRate.isIncrease ? (
                  <ArrowUpRight size={16} />
                ) : (
                  <ArrowDownRight size={16} />
                )}
                <span className="text-xs">vs target</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Broker Performance</CardTitle>
            <div className="flex items-center gap-2">
              <ChartBar size={18} className="text-primary" />
              <span className="text-sm font-medium">2023 Monthly Loans</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={brokerPerformanceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="loans" stroke="var(--brand-teal)" strokeWidth={2} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Additional Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Operations Support</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <Briefcase size={48} className="text-primary mr-4" />
              <div>
                <p className="mb-2">Support consistent operations across your network:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Standardized operating procedures</li>
                  <li>Workflow optimization tools</li>
                  <li>Process monitoring and improvements</li>
                  <li>Resource allocation assistance</li>
                </ul>
              </div>
            </div>
            <button 
              className="w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              onClick={() => navigate("/account-executive/operations")}
            >
              Manage Operations
            </button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Communications Center</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <MessageCircle size={48} className="text-primary mr-4" />
              <div>
                <p className="mb-2">Coordinate across your broker network:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Important announcements</li>
                  <li>Policy updates distribution</li>
                  <li>Feedback collection</li>
                  <li>Quarterly review scheduling</li>
                </ul>
              </div>
            </div>
            <button 
              className="w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              onClick={() => navigate("/chat")}
            >
              Communications Hub
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountExecutiveDashboard; 