import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/login";
import Landing from "./pages/landing";
import Dashboard from "./pages/dashboard/page";
import Signup from "./pages/auth/signup";
import VerifyOtp from "./pages/auth/verify-otp";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
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
