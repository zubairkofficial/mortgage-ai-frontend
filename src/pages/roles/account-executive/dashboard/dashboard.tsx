import { FC } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  ChartBar,
  Briefcase,
  MessageCircle,
  CreditCard,
  Settings,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Greeting from "@/components/common/cards/greeting-card";
import FeatureCards from "@/components/common/cards/feature-cards";
import StatCards from "@/components/common/cards/stat-cards";
import { Separator } from "@/components/ui/separator";
import SupportCards from "@/components/common/cards/support-cards";

// Mock data for the dashboard
const brokerPerformanceData = [
  { month: "Jan", loans: 42 },
  { month: "Feb", loans: 38 },
  { month: "Mar", loans: 45 },
  { month: "Apr", loans: 52 },
  { month: "May", loans: 49 },
  { month: "Jun", loans: 58 },
  { month: "Jul", loans: 62 },
];

const features = [
  {
    title: "Broker Management",
    icon: Users,
    path: "/account-executive/brokers",
  },
  {
    title: "Transactions",
    icon: CreditCard,
    path: "/account-executive/transactions",
  },
  {
    title: "Operations",
    icon: Settings,
    path: "/account-executive/operations",
  },
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


const statCards = [
  {
    title: "Total Brokers",
    value: brokerStats.totalBrokers,
    subtitle: `Active: ${brokerStats.activeBrokers}`,
    additionalInfo: {
      label: "Total Branches",
      value: brokerStats.totalBranches,
    },
  },
  {
    title: "Monthly Performance",
    value: `${brokerStats.monthlyPerformance.value}%`,
    comparison: {isIncrease : brokerStats.monthlyPerformance.isIncrease , value: brokerStats.monthlyPerformance.value, label: "vs last month"},
    subtitle: "vs last month",
  },
  {
    title: "Compliance Rate",
    value: `${brokerStats.complianceRate.value}%`,
    comparison: {isIncrease : brokerStats.monthlyPerformance.isIncrease , value: brokerStats.monthlyPerformance.value, label: "vs last month"},
    subtitle: "vs target",
  },
];

const supportCards = [
  {
    title: "Operations Support",
    icon: Briefcase,
    description: "Support consistent operations across your network:",
    listItems: [
      "Standardized operating procedures",
      "Workflow optimization tools",
      "Process monitoring and improvements",
      "Resource allocation assistance",
    ],
    buttonText: "Manage Operations",
    route: "/account-executive/operations",
  },
  {
    title: "Communications Center",
    icon: MessageCircle,
    description: "Coordinate across your broker network:",
    listItems: [
      "Important announcements",
      "Policy updates distribution",
      "Feedback collection",
      "Quarterly review scheduling",
    ],
    buttonText: "Communications Hub",
    route: "/chat",
  },
];


// Get time of day for greeting
const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
};

const AccountExecutiveDashboard: FC = () => {
  const timeOfDay = getTimeOfDay();
  const { user } = useAuth();
  const userName = user?.name || "Executive";

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* dashboard greetings  */}
      <Greeting
        userName={user?.name || "Executive"}
        stats={[
          { 
            icon: <Users size={18} className="text-primary" />, 
            label: "Active Brokers", 
            value: 12 
          },
          { 
            icon: <Briefcase size={18} className="text-primary" />, 
            label: "Tasks Due", 
            value: 5 
          }
        ]}
        description={`Good ${timeOfDay}, ${userName}! Welcome to your dashboard.`}
        footerTitle="Manage broker teams at the branch level efficiently"
        footerDescription="Monitor performance metrics, enforce compliance, and provide training"
      />

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCards features={features} />
      </div>


      {/* Feature Cards Ends here */}

      <Separator className="my-2 : md:my-4 lg:my-6" />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCards stats={statCards} />
      </div>

      {/* Performance Chart */}
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Broker Performance
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
                data={brokerPerformanceData}
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

      {/* Additional Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SupportCards cards={supportCards} />
      </div>
    </div>
  );
};

export default AccountExecutiveDashboard;
