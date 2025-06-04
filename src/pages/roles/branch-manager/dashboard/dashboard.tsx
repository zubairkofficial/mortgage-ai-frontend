import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Calendar, Users, Briefcase, ChartLine, Book, ClipboardCheck } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import FeatureCards from "@/components/common/cards/feature-cards";
import StatCards from "@/components/common/cards/stat-cards";
import SupportCards from "@/components/common/cards/support-cards";
import { Separator } from "@/components/ui/separator";
import  {TrainingResourcesList, BrokerCertificationList } from "./components/list";
import GreetingCard from "@/components/common/cards/greeting-card";

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



const branchManagerFeatures = [
  {
    icon: Users,
    title: "Broker Team",
    path: "/branch-manager/team",
  },
  {
    icon: ChartLine,
    title: "Performance Metrics",
    path: "/branch-manager/performance",
  },
  {
    icon: ClipboardCheck,
    title: "Compliance",
    path: "/branch-manager/operations",
  },
  {
    icon: Book,
    title: "Training Resources",
    path: "/branch-manager/training",
  },
];

const branchStatsArray = [
  {
    title: "Conversion Rate",
    value: branchStats.conversionRate.value,
    suffix: "%",
    comparison: {
      label: `${branchStats.conversionRate.changePercent}%`,
      isIncrease: branchStats.conversionRate.isIncrease,
    },
  },
  {
    title: "Monthly Revenue",
    value: branchStats.revenue.value,
    comparison: {
      label: `${branchStats.revenue.changePercent}%`,
      isIncrease: branchStats.revenue.isIncrease,
    },
  },
  {
    title: "Compliance Score",
    value: branchStats.complianceScore.value,
    suffix: "%",
    comparison: {
      label: `${branchStats.complianceScore.changePercent}%`,
      isIncrease: branchStats.complianceScore.isIncrease,
    },
  },
];


const supportCardsData = [
  {
    title: "Team Management",
    description: "Manage broker teams at the branch level:",
    icon: Users,
    listItems: [
      "Team member profiles and assignments",
      "Skill matrix and specialization tracking",
      "Performance evaluation and goals",
      "Capacity planning and workload distribution",
    ],
    buttonText: "Manage Team",
    route: "/branch-manager/team",
  },
  {
    title: "Compliance Monitoring",
    description: "Enforce compliance across your branch:",
    icon: ClipboardCheck,
    listItems: [
      "Regulatory requirement tracking",
      "Policy adherence monitoring",
      "Audit preparation tools",
      "Compliance training completion status",
    ],
    buttonText: "View Compliance Dashboard",
    route: "/branch-manager/operations",
  },
];


 const trainingResourcesData = [
  {
    title: "New Compliance Regulations 2023",
    date: "2023-08-02",
    type: "Compliance",
    required: true,
  },
  {
    title: "Advanced CRM Usage Workshop",
    date: "2023-07-28",
    type: "System",
    required: false,
  },
  {
    title: "Best Practices for Client Onboarding",
    date: "2023-07-20",
    type: "Process",
    required: true,
  },
  {
    title: "Effective Communication with Lenders",
    date: "2023-07-15",
    type: "Skill",
    required: false,
  },
];



const brokerCertificationsData = [
  {
    name: "John Doe",
    position: "Senior Broker",
    certifications: 4,
    inProgress: 1,
    required: 5,
  },
  {
    name: "Sarah Miller",
    position: "Broker",
    certifications: 3,
    inProgress: 2,
    required: 5,
  },
  {
    name: "Robert Johnson",
    position: "Junior Broker",
    certifications: 2,
    inProgress: 2,
    required: 5,
  },
];

const BranchManagerDashboard: FC = () => {
  const { user } = useAuth();

  return (
    <div className="container flex flex-col gap-6">
      {/* Greeting Card */}

      <GreetingCard 
  userName={user?.name || "Branch Manager"}
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
  description="Welcome to your dashboard"
/>

      {/* Main Feature Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <FeatureCards features={branchManagerFeatures}  />
      </div>

    <Separator className="my-2 md:my-4 lg:my-6" />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCards stats={branchStatsArray} />
      </div>

      {/* Team Performance Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Team Performance</CardTitle>
            <div className="flex items-center gap-2">
              <ChartLine size={18} className="text-primary" />
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
          <SupportCards cards={supportCardsData} />
      </div>

      {/* Training Resources */}

      <TrainingResourcesList resources={trainingResourcesData} />

      {/* Certification and Development */}
      <BrokerCertificationList brokers={brokerCertificationsData} />
    </div>
  );
};

export default BranchManagerDashboard; 