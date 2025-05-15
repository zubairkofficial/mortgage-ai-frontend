import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter, CardAction } from "@/components/ui/card";
import { mockUserData } from "@/lib/navlinks";
import { IconCalendar, IconFileText, IconPlus, IconCheck, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
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
  const timeOfDay = getTimeOfDay();
  const navigate = useNavigate();   
  const userName = mockUserData.name;
 
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
              <IconCalendar size={18} className="text-primary" />
              <span>Today: {new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <IconFileText size={18} className="text-primary" />
              <span>{applications.length} Active Applications</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Manage your mortgage applications efficiently
          </div>
          <div className="text-muted-foreground">
            Track status, submit documents, and get updates in real-time
          </div>
        </CardFooter>
      </Card>

      {/* Loan Applications Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {applications.map((application) => (
          <Card key={application.id} className="hover:shadow-md transition-shadow border-l-4" style={{ 
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
            <CardContent>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="bg-secondary rounded-md p-2 flex-1">
                  <span className="text-xs text-muted-foreground block">Amount</span>
                  <span className="font-semibold">{application.amount}</span>
                </div>
                <div className="bg-secondary rounded-md p-2 flex-1">
                  <span className="text-xs text-muted-foreground block">Term</span>
                  <span className="font-semibold">{application.term}</span>
                </div>
              </div>
              
              {/* Progress Stages */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-foreground">Application Progress</span>
                </div>
                <div className="flex justify-center items-center relative">
                  {/* Stage indicators with connecting lines */}
                  <div className="flex items-center w-full bottom-3">
                    {/* Stage 1: Draft */}
                    <div className="flex flex-col items-center relative z-10">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm transition-all ${application.stage >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                        {application.stage > 1 ? <IconCheck size={14} /> : '1'}
                      </div>
                      <span className="text-xs mt-2 font-medium">Draft</span>
                    </div>
                    
                    {/* Connector 1-2 */}
                    <div className="flex-1 px-2 mx-1">
                      <div className={`h-1 ${application.stage >= 2 ? 'bg-primary' : 'bg-muted'} relative -top-2`}></div>
                    </div>
                    
                    {/* Stage 2: Submitted */}
                    <div className="flex flex-col items-center relative z-10">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm transition-all ${application.stage >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                        {application.stage > 2 ? <IconCheck size={14} /> : '2'}
                      </div>
                      <span className="text-xs mt-2 font-medium">Submitted</span>
                    </div>
                    
                    {/* Connector 2-3 */}
                    <div className="flex-1 px-2 mx-1">
                      <div className={`h-1 ${application.stage >= 3 ? 'bg-primary' : 'bg-muted'} relative -top-2`}></div>
                    </div>
                    
                    {/* Stage 3: Processing */}
                    <div className="flex flex-col items-center relative z-10">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm transition-all ${application.stage >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                        {application.stage > 3 ? <IconCheck size={14} /> : '3'}
                      </div>
                      <span className="text-xs mt-2 font-medium">Processing</span>
                    </div>
                    
                    {/* Connector 3-4 */}
                    <div className="flex-1 px-2 mx-1">
                      <div className={`h-1 ${application.stage >= 4 ? 'bg-primary' : 'bg-muted'} relative -top-2`}></div>
                    </div>
                    
                    {/* Stage 4: Decision */}
                    <div className="flex flex-col items-center relative z-10">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm transition-all ${application.stage >= 4 ? (application.isRejected ? 'bg-destructive text-destructive-foreground' : 'bg-[var(--brand-teal)] text-primary-foreground') : 'bg-muted text-muted-foreground'}`}>
                        {application.stage >= 4 ? (application.isRejected ? <IconX size={14} /> : <IconCheck size={14} />) : '4'}
                      </div>
                      <span className="text-xs mt-2 font-medium">Decision</span>
                    </div>
                  </div>
                </div>
              </div>

              
            </CardContent>
            <CardFooter className="justify-between pt-2 border-t mt-2">
              <span className="text-xs text-gray-500">Last updated: {new Date(application.date).toLocaleDateString()}</span>
              <button 
                className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1 hover:underline transition-colors"
                onClick={() => navigate(`/borrower/application/${application.id}`)}
              >
                View Details 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Add New Application Button */}
      <div className="flex justify-center mt-2">
        <button 
          className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          onClick={() => navigate("/borrower/application")}
        >
          <IconPlus className="mr-2 h-4 w-4" />
          New Application
        </button>
      </div>
    </div>
  );
};

export default BorrowerDashboard;
