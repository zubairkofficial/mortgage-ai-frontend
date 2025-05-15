import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/login";
import Landing from "./pages/landing";
import AdminLayout from "./pages/admin/layout/layout";
import BorrowerLayout from "./pages/borrower/layout/layout";
import LenderLayout from "./pages/lender/layout/layout";
import Signup from "./pages/auth/signup";
import VerifyOtp from "./pages/auth/verify-otp";
import UserTable from "./pages/admin/user/user-table";
import Home from './pages/dashboard/home';
import BorrowerDashboard from './pages/borrower/dashboard/dashboard';
import BorrowerForm from './components/forms/borrower-form';
import ApplicationForm from './pages/borrower/application/application-form';
import ForgotPassword from './pages/auth/forgot-password';
import ResetPassword from './pages/auth/reset-password';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />
    },
    {
        path: "/dashboard",
        element: <AdminLayout />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "users",
                element: <UserTable />
            }
        ]
    },

    
    {
        path: "/borrower",
        element: <BorrowerLayout />,
        children: [
                {
                    path: "",
                    element: <BorrowerDashboard />
                },
                {
                    path: "application",
                    element: <ApplicationForm />
                }
        ]
    },
    {
        path: "/lender",
        element: <LenderLayout />,
        children: [
            {
                path: "",
                element: <Home />
            }
        ]
    },
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
