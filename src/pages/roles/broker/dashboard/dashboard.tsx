import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { FileText, Plus, Check, Users, Briefcase, Bot, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";
import GreetingCard from "@/components/common/cards/greeting-card";
import FeatureCards from "@/components/common/cards/feature-cards";
import SupportCards from "@/components/common/cards/support-cards";

// Define application type
type Application = {
  id: string;
  name: string;
  date: string;
  amount: string;
  term: string;
  status: string;
  statusColor: string;
  stage: number; // 1: Draft, 2: Submitted, 3: Processing, 4: Approved/Rejected
  isRejected?: boolean;
}

// Mock applications data
const applications: Application[] = [
 
  {
    id: "APP-002",
    name: "Refinance Application",
    date: "2023-11-03",
    amount: "$320,000",
    term: "15 years",
    status: "Approved",
    statusColor: "text-[var(--brand-teal)] bg-[color-mix(in_srgb,var(--brand-teal)_20%,transparent)]",
    stage: 2,
  },
];



const featureCardsData = [
  {
    title: "Borrower Intake",
    icon: FileText,
    path: "/broker/application",
  },
  {
    title: "Qualification",
    icon: Check,
    path: "/broker/matchmaking",
  },
  {
    title: "Loan Structuring",
    icon: Briefcase,
    path: "/broker/loan-structuring",
  },
  {
    title: "Lender Matchmaking",
    icon: Building2,
    path: "/broker/matchmaking",
  },
];

const supportCardsData = [
  {
    title: "AI Assistant",
    icon: Bot,
    description: "Leverage AI to streamline your workflow:",
    listItems: [
      "Automated document analysis",
      "Borrower qualification suggestions",
      "Optimal loan structure recommendations",
      "Lender matching based on criteria",
    ],
    buttonText: "Launch AI Assistant",
    route: "/broker/ai-assistant",
  },
  {
    title: "CRM Integration",
    icon: Users,
    description: "Manage your borrower relationships efficiently:",
    listItems: [
      "Synchronized contact management",
      "Communication history tracking",
      "Automated follow-ups and reminders",
      "Pipeline management and reporting",
    ],
    buttonText: "Access CRM Dashboard",
    route: "/broker/crm",
  },
];


const BrokerDashboard: FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();   
 
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Greeting Card - Using global theme variables */}

      <GreetingCard stats={[
        { icon : <FileText size={18} className="text-primary" /> , 
          label: "Active Applications", value: applications.length }]}
          userName={user?.name || "Broker"}
           description="Manage borrower intake, qualification, and loan structuring" 
           footerDescription="Leverage AI and CRM integrations for efficient borrower-lender matchmaking" />

      {/* Feature Cards */}



      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <FeatureCards features={featureCardsData} />
      </div>

      {/* AI and CRM Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SupportCards cards={supportCardsData} />
      </div>

      {/* Loan Applications Status Cards */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Active Loan Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {applications.length > 0 ? (
              applications.map((application) => (
                <Card key={application.id} className="hover:shadow-md transition-shadow border-l-4 mb-4" style={{ 
                  borderLeftColor: application.status === "Approved" ? "var(--brand-teal)" : 
                                 application.status === "Rejected" ? "var(--destructive)" : 
                                 "var(--primary)" 
                }}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg font-semibold">{application.name}</CardTitle>
                        <CardDescription className="text-sm opacity-80">{application.id} • {new Date(application.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</CardDescription>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${application.statusColor} shadow-sm`}>
                        {application.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardFooter className="justify-between pt-2">
                    <span className="text-xs text-gray-500">Last updated: {new Date(application.date).toLocaleDateString()}</span>
                    <button 
                      className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1 hover:underline transition-colors"
                      onClick={() => navigate(`/broker/application/${application.id}`)}
                    >
                      View Details 
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center p-6">
                <FileText size={48} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No active applications found.</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <button 
            className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            onClick={() => navigate("/broker/application")}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Application
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BrokerDashboard;
