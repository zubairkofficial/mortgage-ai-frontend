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

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />
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
                element: <div>AI Assistant Page</div>
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
                element: <div>Broker Management Page</div>
            },
            {
                path: "performance",
                element: <div>Performance Metrics Page</div>
            },
            {
                path: "branches",
                element: <div>Branch Network Management Page</div>
            },
            {
                path: "reports",
                element: <div>Reports Page</div>
            },
            {
                path: "communications",
                element: <div>Communications Page</div>
            },
            {
                path: "compliance",
                element: <div>CRM Compliance Page</div>
            },
            {
                path: "operations",
                element: <div>Operations Support Page</div>
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
                path: "applications",
                element: <div>Document Validation Page</div>
            },
            {
                path: "review-queue",
                element: <div>Review Queue Page</div>
            },
            {
                path: "team",
                element: <div>Team Management Page</div>
            },
            {
                path: "compliance",
                element: <div>Loan Compliance Page</div>
            },
            {
                path: "reports",
                element: <div>Reports Page</div>
            },
            {
                path: "audit-trails",
                element: <div>Audit Trails Page</div>
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
                path: "team",
                element: <div>Broker Team Management Page</div>
            },
            {
                path: "performance",
                element: <div>Performance Metrics Page</div>
            },
            {
                path: "operations",
                element: <div>Branch Operations Page</div>
            },
            {
                path: "training",
                element: <div>Training Resources Page</div>
            },
            {
                path: "reports",
                element: <div>Reports Page</div>
            },
            {
                path: "communications",
                element: <div>Communications Page</div>
            },
            {
                path: "compliance",
                element: <div>Compliance Monitoring Page</div>
            },
            {
                path: "certifications",
                element: <div>Broker Certifications Page</div>
            }
        ]
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
                path: "applications",
                element: <div>Loan Applications Page</div>
            },
            {
                path: "portfolio",
                element: <div>Portfolio Management Page</div>
            },
            {
                path: "risk-assessment",
                element: <div>Risk Assessment Page</div>
            },
            {
                path: "funding",
                element: <div>Funding Management Page</div>
            },
            {
                path: "reports",
                element: <div>Reports Page</div>
            },
            {
                path: "compliance",
                element: <div>Compliance Monitoring Page</div>
            },
            {
                path: "settings",
                element: <div>Lender Settings Page</div>
            }
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
