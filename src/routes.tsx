import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/login";
import Landing from "./pages/landing";
import Layout from "./pages/layout/layout";
import Signup from "./pages/auth/signup";
import VerifyOtp from "./pages/auth/verify-otp";
import UserTable from "./pages/admin/user-table";
import Home from './pages/dashboard/home';
const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />
    },
    {
        path: "/dashboard",
        element: <Layout />,
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
