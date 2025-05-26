import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/login";
import Landing from "./pages/landing";
import BorrowerLayout from "./pages/roles/broker/layout/layout";
import AccountExecutiveLayout from "./pages/roles/account-executive/layout/layout";
import UnderwritingManagerLayout from "./pages/roles/underwriting-manager/layout/layout";
import BranchManagerLayout from "./pages/roles/branch-manager/layout/layout";
import LenderLayout from "./pages/roles/lender/layout/layout";
import Signup from "./pages/auth/signup";
import VerifyOtp from "./pages/auth/verify-otp";
import BorrowerDashboard from './pages/roles/broker/dashboard/dashboard';
import AccountExecutiveDashboard from './pages/roles/account-executive/dashboard/dashboard';
import UnderwritingManagerDashboard from './pages/roles/underwriting-manager/dashboard/dashboard';
import BranchManagerDashboard from './pages/roles/branch-manager/dashboard/dashboard';
import LenderDashboard from './pages/roles/lender/dashboard/dashboard';
import ApplicationForm from './pages/roles/broker/application/application-form';
import ForgotPassword from './pages/auth/forgot-password';
import ResetPassword from './pages/auth/reset-password';
import LoanStructuringPage from './pages/roles/broker/borrower/loan-structuring';
import QualificationAssessmentPage from './pages/roles/broker/borrower/qualification-assessment';
import ChatLayout from './pages/chat/chat-layout'
import BrokerCRM from './pages/roles/broker/crm/crm';
import BorrowerProfilesPage from './pages/roles/broker/borrower/borrower-profiles';
import ApplicationTable from './pages/roles/broker/application/application-table';
import ProfilePage from './pages/profile/profile-page';
import NotFound from './pages/not-found';
import LoanReview from './pages/roles/lender/loan-review/loan-review';
import Compliance from './pages/roles/lender/compliance/compliance';
import DealPipeline from './pages/roles/lender/deal-pipeline/deal-pipeline';
import LoanPrograms from './pages/roles/lender/loan-programs/loan-programs';
import TeamManagement from './pages/roles/branch-manager/team/team';
import TrainingCenter from './pages/roles/branch-manager/training/training';
import PerformanceDashboard from './pages/roles/branch-manager/performance/performance';
import ReportsDashboard from './pages/roles/branch-manager/reports/reports';
import OperationsDashboard from './pages/roles/branch-manager/operations/operations';
import LoanValidationPage from './pages/roles/underwriting-manager/loan-validation/loan-validation';
import CompliancePage from './pages/roles/underwriting-manager/compliance/compliance';
import AuditTrailPage from './pages/roles/underwriting-manager/audit-trail/audit-trail';
import ReportsPage from './pages/roles/underwriting-manager/reports/reports';
import AIAssistant from './pages/chat/ai-assistant';
import OperationsSupport from './pages/roles/account-executive/operations/operations';
import ComplianceMonitoring from './pages/roles/account-executive/compliance/compliance';
import ReportsAnalytics from './pages/roles/account-executive/reports/reports';
import BrokerNetworkOverview from './pages/roles/account-executive/broker-network/broker-network';
import TrainingResources from './pages/roles/account-executive/training/training';
const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />
    },

    {
        path: "/chat",
        element: (
            <ChatLayout />
        ),
        children: [
            {
                path: ":id",
                element: <>Chat Page</>,
            }
        ]
    },


    // Broker Portal Routes
    {
        path: "/broker",
        element: (
            <BorrowerLayout />
        ),
        children: [
            {
                path: "",
                element: <BorrowerDashboard />
            },
            {
                path: "profile",
                element: <ProfilePage />
            },
            {
                path: "application",
                element: <ApplicationTable />
            },
            {
                path: "application/add",
                element: <ApplicationForm />
            },
            {
                path: "matchmaking",
                element: <QualificationAssessmentPage />
            },
            {
                path: "loan-structuring",
                element: <LoanStructuringPage />
            },
            {
                path: "ai-assistant",
                element: <AIAssistant />
            },
            {
                path: "crm",
                element: <BrokerCRM />
            },
            {
                path: "borrower-profiles",
                element: <BorrowerProfilesPage />
            },

        ]
    },

    // Account Executive Portal Routes
    {
        path: "/account-executive",
        element: (
            <AccountExecutiveLayout />
        ),
        children: [
            {
                path: "",
                element: <AccountExecutiveDashboard />
            },
            {
                path: "profile",
                element: <ProfilePage />
            },
            {
                path: "brokers",
                element: <BrokerNetworkOverview/>
            }, 
            {
                path: "reports",
                element: <ReportsAnalytics/>
            },
            {
                path: "compliance",
                element: <ComplianceMonitoring/>
            },
            {
                path: "operations",
                element: <OperationsSupport/>
            },
            {
                path: "training",
                element: <TrainingResources/>
            }
        ]
    },

    // Underwriting Manager Portal Routes
    {
        path: "/underwriting-manager",
        element: (
            <UnderwritingManagerLayout />
        ),
        children: [
            {
                path: "",
                element: <UnderwritingManagerDashboard />
            },
            {
                path: "profile",
                element: <ProfilePage />
            },
            {
                path: "ai-assistant",
                element: <AIAssistant />
            },
            {
                path: "loan-validation",
                element: <LoanValidationPage />
            },
            {
                path: "compliance",
                element: <CompliancePage />
            },
            {
                path: "audit-trail",
                element: <AuditTrailPage />
            },
            {
                path: "reports",
                element: <ReportsPage />
            }
        ]
    },

    // Branch Manager Portal Routes
    {
        path: "/branch-manager",
        element: (
            <BranchManagerLayout />
        ),
        children: [
            {
                path: "",
                element: <BranchManagerDashboard />
            },
            {
                path: "profile",
                element: <ProfilePage />
            },
            {
                path: "ai-assistant",
                element: <AIAssistant />
            },
            {
                path: "team",
                element: <TeamManagement />
            },
            {
                path: "performance",
                element: <PerformanceDashboard />
            },
            {
                path: "operations",
                element: <OperationsDashboard />
            },
            {
                path: "training",
                element: <TrainingCenter />
            },
            {
                path: "reports",
                element: <ReportsDashboard />
            },


        ]
    },


    // Lender Portal Routes
    {
        path: "/lender",
        element: (
            <LenderLayout />
        ),
        children: [
            {
                path: "",
                element: <LenderDashboard />
            },
            {
                path: "profile",
                element: <ProfilePage />
            },
            {
                path: "ai-assistant",
                element: <AIAssistant />
            },
            {
                path: "loan-review",
                element: <LoanReview />
            },
            {
                path: "compliance",
                element: <Compliance />
            },
            {
                path: "deal-pipeline",
                element: <DealPipeline />
            },
            {
                path: "loan-programs",
                element: <LoanPrograms />
            },

        ]
    },
 
    // Authentication Routes
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/verify-otp",
        element: <VerifyOtp />
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />
    },
    {
        path: "/reset-password",
        element: <ResetPassword />
    },
    {
        path: "*",
        element: <NotFound />
    }
])

const AppRouter = () => {
    return (
        <React.Suspense fallback={<div>Loading router...</div>}>
            <RouterProvider router={router} />
        </React.Suspense>
    )
}

export default AppRouter;
