import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/login";
import Landing from "./pages/landing";
import BorrowerLayout from "./pages/broker/layout/layout";
import AccountExecutiveLayout from "./pages/account-executive/layout/layout";
import UnderwritingManagerLayout from "./pages/underwriting-manager/layout/layout";
import BranchManagerLayout from "./pages/branch-manager/layout/layout";
import LenderLayout from "./pages/lender/layout/layout";
import Signup from "./pages/auth/signup";
import VerifyOtp from "./pages/auth/verify-otp";
import BorrowerDashboard from './pages/broker/dashboard/dashboard';
import AccountExecutiveDashboard from './pages/account-executive/dashboard/dashboard';
import UnderwritingManagerDashboard from './pages/underwriting-manager/dashboard/dashboard';
import BranchManagerDashboard from './pages/branch-manager/dashboard/dashboard';
import LenderDashboard from './pages/lender/dashboard/dashboard';
import ApplicationForm from './pages/broker/application/application-form';
import ForgotPassword from './pages/auth/forgot-password';
import ResetPassword from './pages/auth/reset-password';
import LoanStructuringPage from './pages/broker/borrower/loan-structuring';
import QualificationAssessmentPage from './pages/broker/borrower/qualification-assessment';
import ChatLayout from '@layout/chat-layout'


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
                path: "application",
                element: <ApplicationForm />
            },
            {
                path: "applications",
                element: <div>Borrower Intake Page</div>
            },
            {
                path: "qualification",
                element: <QualificationAssessmentPage />
            },
            {
                path: "loan-structuring",
                element: <LoanStructuringPage />
            },
            {
                path: "matchmaking",
                element: <div>Lender Matchmaking Page</div>
            },
            {
                path: "ai-assistant",
                element: <div>AI Assistant Page</div>
            },
            {
                path: "crm",
                element: <div>CRM Integration Page</div>
            }
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
        path : "/chat",
        element : (
            <ChatLayout />
        ),
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
