import { FC } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Calendar, FileText, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";
import { getTimeOfDay } from "@/lib/utils";

// Define loan application type for borrowers
type LoanApplication = {
  id: string;
  type: string;
  amount: string;
  submittedDate: string;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'Funded';
  statusColor: string;
  statusIcon: React.ReactNode;
  lastUpdated: string;
  loanTerm: string;
  interestRate?: string;
}

// Mock loan applications data for the borrower
const loanApplications: LoanApplication[] = [
  {
    id: "LA-001",
    type: "Home Purchase Loan",
    amount: "$450,000",
    submittedDate: "2023-11-15",
    status: "Under Review",
    statusColor: "text-orange-600 bg-orange-50 border-orange-200",
    statusIcon: <Clock size={16} className="text-orange-600" />,
    lastUpdated: "2023-11-18",
    loanTerm: "30 years",
    interestRate: "6.75%"
  },
  {
    id: "LA-002", 
    type: "Refinance Loan",
    amount: "$320,000",
    submittedDate: "2023-10-28",
    status: "Approved",
    statusColor: "text-green-600 bg-green-50 border-green-200",
    statusIcon: <CheckCircle size={16} className="text-green-600" />,
    lastUpdated: "2023-11-10",
    loanTerm: "15 years",
    interestRate: "6.25%"
  },
  {
    id: "LA-003",
    type: "Personal Loan",
    amount: "$25,000",
    submittedDate: "2023-09-15",
    status: "Funded",
    statusColor: "text-blue-600 bg-blue-50 border-blue-200",
    statusIcon: <CheckCircle size={16} className="text-blue-600" />,
    lastUpdated: "2023-10-01",
    loanTerm: "5 years",
    interestRate: "8.50%"
  }
];

const BorrowerDashboard: FC = () => {
  const { user } = useAuth();
  const timeOfDay = getTimeOfDay();
  const navigate = useNavigate();
  const userName = user?.name;

  const totalApplications = loanApplications.length;
  const pendingApplications = loanApplications.filter(app => 
    app.status === 'Submitted' || app.status === 'Under Review'
  ).length;
  const approvedApplications = loanApplications.filter(app => 
    app.status === 'Approved' || app.status === 'Funded'
  ).length;

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
              <FileText size={18} className="text-primary" />
              <span>{totalApplications} Total Applications</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Track your loan applications and manage your lending journey
          </div>
          <div className="text-muted-foreground">
            Monitor application status, review terms, and stay updated on your loan progress
          </div>
        </CardFooter>
      </Card>

      {/* Single Feature Card - My Applications */}
      <div className="grid grid-cols-1 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/borrower/applications")}>
          <CardContent className="flex flex-col items-center justify-center p-8">
            <FileText size={48} className="text-primary mb-4" />
            <h3 className="text-lg font-semibold text-center mb-2">My Loan Applications</h3>
            <p className="text-sm text-muted-foreground text-center">
              View and manage all your loan applications in one place
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Application Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalApplications}</div>
            <p className="text-xs text-muted-foreground mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{pendingApplications}</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting decision</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved/Funded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{approvedApplications}</div>
            <p className="text-xs text-muted-foreground mt-1">Successfully processed</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Loan Applications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">My Loan Applications</CardTitle>
          <CardDescription>Track the status of your loan applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loanApplications.length > 0 ? (
              loanApplications.map((application) => (
                <Card 
                  key={application.id} 
                  className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-primary"
                  onClick={() => navigate(`/borrower/applications/${application.id}`)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg font-semibold">{application.type}</CardTitle>
                        <CardDescription className="text-sm opacity-80">
                          {application.id} • Submitted: {new Date(application.submittedDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </CardDescription>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${application.statusColor}`}>
                        {application.statusIcon}
                        {application.status}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Amount:</span>
                        <div className="font-medium">{application.amount}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Term:</span>
                        <div className="font-medium">{application.loanTerm}</div>
                      </div>
                      {application.interestRate && (
                        <div>
                          <span className="text-muted-foreground">Interest Rate:</span>
                          <div className="font-medium">{application.interestRate}</div>
                        </div>
                      )}
                      <div>
                        <span className="text-muted-foreground">Last Updated:</span>
                        <div className="font-medium">
                          {new Date(application.lastUpdated).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <FileText size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Applications Yet</h3>
                <p className="text-muted-foreground">
                  You haven't submitted any loan applications yet. Contact your broker to get started.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BorrowerDashboard;