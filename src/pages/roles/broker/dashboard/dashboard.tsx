import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter, CardAction } from "@/components/ui/card";
import { Calendar, FileText, Plus, Check, Users, Briefcase, Bot, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";

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
]

// Get time of day for greeting
const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
};

const BorrowerDashboard: FC = () => {
  const { user } = useAuth();
  const timeOfDay = getTimeOfDay();
  const navigate = useNavigate();   
  const userName = user?.name;
 
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Greeting Card - Using global theme variables */}
      <Card className="@container/card card-gradient-primary">
        <CardHeader>
          <CardDescription className="text-base">Welcome back</CardDescription>
          <CardTitle className="text-2xl font-semibold @[250px]/card:text-3xl">
            Good {timeOfDay}, {userName}!
          </CardTitle>
          <CardAction>
      
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar size={18} className="text-primary" />
              <span>Today: {new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FileText size={18} className="text-primary" />
              <span>{applications.length} Active Applications</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Manage borrower intake, qualification, and loan structuring
          </div>
          <div className="text-muted-foreground">
            Leverage AI and CRM integrations for efficient borrower-lender matchmaking
          </div>
        </CardFooter>
      </Card>

      {/* Feature Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/broker/applications")}>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <FileText size={32} className="text-primary mb-2" />
            <span className="text-sm font-medium text-center">Borrower Intake</span>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/broker/qualification")}>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Check size={32} className="text-primary mb-2" />
            <span className="text-sm font-medium text-center">Qualification</span>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/broker/loan-structuring")}>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Briefcase size={32} className="text-primary mb-2" />
            <span className="text-sm font-medium text-center">Loan Structuring</span>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/broker/matchmaking")}>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Building2 size={32} className="text-primary mb-2" />
            <span className="text-sm font-medium text-center">Lender Matchmaking</span>
          </CardContent>
        </Card>
      </div>

      {/* AI and CRM Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">AI Assistant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <Bot size={48} className="text-primary mr-4" />
              <div>
                <p className="mb-2">Leverage AI to streamline your workflow:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Automated document analysis</li>
                  <li>Borrower qualification suggestions</li>
                  <li>Optimal loan structure recommendations</li>
                  <li>Lender matching based on criteria</li>
                </ul>
              </div>
            </div>
            <button 
              className="w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              onClick={() => navigate("/broker/ai-assistant")}
            >
              Launch AI Assistant
            </button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">CRM Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <Users size={48} className="text-primary mr-4" />
              <div>
                <p className="mb-2">Manage your borrower relationships efficiently:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Synchronized contact management</li>
                  <li>Communication history tracking</li>
                  <li>Automated follow-ups and reminders</li>
                  <li>Pipeline management and reporting</li>
                </ul>
              </div>
            </div>
            <button 
              className="w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              onClick={() => navigate("/broker/crm")}
            >
              Access CRM Dashboard
            </button>
          </CardContent>
        </Card>
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

export default BorrowerDashboard;
