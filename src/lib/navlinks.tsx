import {
  Briefcase,
  IconNode,
  Wallet,
} from "lucide-react"
import {AlertCircleIcon, BuildingIcon, UsersIcon, ActivityIcon, BarChartIcon, FileTextIcon, MessageSquareIcon, BookOpenIcon ,  FileIcon,  
 } from "lucide-react";
import { UserRole } from "./users"
import { FileCheck, History } from "lucide-react"

export type NavItem = {
  title: string
  url: string
  icon?: IconNode | React.ReactNode
}

export const lenderNavLinks: NavItem[] = [
  {
    title: "Dashboard",
    url: "/lender/dashboard",
    icon: <BarChartIcon className="h-4 w-4" />,
  },
  {
    title: "Loan Review",
    url: "/lender/loan-review",
    icon: <FileTextIcon className="h-4 w-4" />,
  },
  {
    title: "Loan Programs",
    url: "/lender/loan-programs",
    icon: <BuildingIcon className="h-4 w-4" />,
  },
  {
    title: "Deal Pipeline",
    url: "/lender/deal-pipeline",
    icon: <ActivityIcon className="h-4 w-4" />,
  },

  {
    title: "Compliance",
    url: "/lender/compliance",
    icon: <AlertCircleIcon className="h-4 w-4" />,
  },
];

// Navigation links for branch manager
export const branchManagerNavLinks: NavItem[] = [
  {
    title: "Dashboard",
    url: "/branch-manager/dashboard",
    icon: <BarChartIcon className="h-4 w-4" />,
  },
  {
    title: "Broker Team",
    url: "/branch-manager/team",
    icon: <UsersIcon className="h-4 w-4" />,
  },
  {
    title: "Performance",
    url: "/branch-manager/performance",
    icon: <BarChartIcon className="h-4 w-4" />,
  },
  {
    title: "Branch Operations",
    url: "/branch-manager/operations",
    icon: <BuildingIcon className="h-4 w-4" />,
  },
  {
    title: "Training Resources",
    url: "/branch-manager/training",
    icon: <BookOpenIcon className="h-4 w-4" />,
  },
  {
    title: "Reports",
    url: "/branch-manager/reports",
    icon: <FileTextIcon className="h-4 w-4" />,
  },
 
];

// Navigation links for account executive
export const accountExecutiveNavLinks: NavItem[] = [
  {
    title: "Dashboard",
    url: "/account-executive/dashboard",
    icon: <BarChartIcon className="h-4 w-4" />,
  },
  {
    title: "Broker Network",
    url: "/account-executive/brokers",
    icon: <UsersIcon className="h-4 w-4" />,
  },
  {
    title: "Transactions",

    url: "/account-executive/transactions",
    icon: <Wallet className="h-4 w-4" />,
  },
  // {
  //   title: "Compliance",
  //   url: "/account-executive/compliance",
  //   icon: <ClipboardCheckIcon className="h-4 w-4" />,
  // },
  {
    title: "Operations",
    url: "/account-executive/operations",
    icon: <Briefcase className="h-4 w-4" />,
  },
  // {
  //   title: "Reports",
  //   url: "/account-executive/reports",
  //   icon: <FileTextIcon className="h-4 w-4" />,
  // },
  // {
  //   title: "Training",
  //   url: "/account-executive/training",
  //   icon: <BookOpenIcon className="h-4 w-4" />,
  // },
];

export const brokerNavLinks: NavItem[] = [
  {
    title: "Dashboard",
    url: "/broker/dashboard",
    icon: <BarChartIcon className="h-4 w-4" />,
  },
  {
    title: "Borrower Management",
    url: "/broker/borrower-profiles",
    icon: <UsersIcon className="h-4 w-4" />,
  },
  {
    title: "Loan Applications",
    url: "/broker/application",
    icon: <FileIcon className="h-4 w-4" />,
  },
  {
    title: "Loan Structuring",
    url: "/broker/loan-structuring",
    icon: <FileTextIcon className="h-4 w-4" />,
  },
  {
    title: "Matchmaking",
    url: "/broker/matchmaking",
    icon: <ActivityIcon className="h-4 w-4" />,
  },
  {
    title: "CRM",
    url: "/broker/crm",
    icon: <MessageSquareIcon className="h-4 w-4" />,
  },

]

// Navigation links for underwriting manager
export const underwritingManagerNavLinks: NavItem[] = [
  {
    title: "Dashboard",
    url: "/underwriting-manager/dashboard",
    icon: <BarChartIcon className="h-4 w-4" />,
  },
  {
    title: "Loan File Validation",
    url: "/underwriting-manager/loan-validation",
    icon: <FileCheck className="h-4 w-4" />,
  },
  {
    title: "Compliance Checks",
    url: "/underwriting-manager/compliance",
    icon: <AlertCircleIcon className="h-4 w-4" />,
  },
  {
    title: "Audit Trail",
    url: "/underwriting-manager/audit-trail",
    icon: <History className="h-4 w-4" />,
  },
  {
    title: "Reports & Alerts",
    url: "/underwriting-manager/reports",
    icon: <FileTextIcon className="h-4 w-4" />,
  },
];

export const borrowerNavLinks: NavItem[] = [
  {
    title: "Dashboard",
    url: "/borrower/dashboard",
    icon: <BarChartIcon className="h-4 w-4" />,
  },
]
// User data to be used throughout the application
export const mockUserData = {
  id: "1",
  name: "Test User",
  email: "test@example.com",
  role: UserRole.BROKER
}; 
