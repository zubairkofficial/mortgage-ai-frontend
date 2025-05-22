import {
  IconNode,
} from "lucide-react"
import { BuildingIcon, UsersIcon, ActivityIcon, BarChartIcon, FileTextIcon, MessageSquareIcon, MailIcon, BookOpenIcon
 } from "lucide-react";
import { ClipboardCheckIcon, AlertCircleIcon, FileIcon } from "lucide-react";
import { UserRole } from "./users"

export type NavItem = {
  title: string
  url: string
  icon?: IconNode | React.ReactNode
}

export const lenderNavLinks: NavItem[] = [
  {
    title: "Dashboard",
    url: "/lender",
    icon: <BarChartIcon className="h-4 w-4" />,
  },
]

// Navigation links for branch manager
export const branchManagerNavLinks: NavItem[] = [
  {
    title: "Dashboard",
    url: "/branch-manager",
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
  {
    title: "Communications",
    url: "/branch-manager/communications",
    icon: <MailIcon className="h-4 w-4" />,
  },
];

// Navigation links for account executive
export const accountExecutiveNavLinks: NavItem[] = [
  {
    title: "Dashboard",
    url: "/account-executive",
    icon: <BarChartIcon className="h-4 w-4" />,
  },
  {
    title: "Manage Brokers",
    url: "/account-executive/brokers",
    icon: <UsersIcon className="h-4 w-4" />,
  },
  {
    title: "Performance",
    url: "/account-executive/performance",
    icon: <ActivityIcon className="h-4 w-4" />,
  },
  {
    title: "Branches",
    url: "/account-executive/branches",
    icon: <BuildingIcon className="h-4 w-4" />,
  },
  {
    title: "Reports",
    url: "/account-executive/reports",
    icon: <FileTextIcon className="h-4 w-4" />,
  },
  {
    title: "Communications",
    url: "/account-executive/communications",
    icon: <MessageSquareIcon className="h-4 w-4" />,
  },
];

export const brokerNavLinks: NavItem[] = [
  {
    title: "Dashboard",
    url: "/broker",
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
  {
    title: "Communications",
    url: "/broker/communications",
    icon: <MailIcon className="h-4 w-4" />,
  },
  {
    title: "AI Assistant",
    url: "/broker/ai-assistant",
    icon: <BookOpenIcon className="h-4 w-4" />,
  }
]

// Navigation links for underwriting manager
export const underwritingManagerNavLinks: NavItem[] = [
  {
    title: "Dashboard",
    url: "/underwriting-manager",
    icon: <BarChartIcon className="h-4 w-4" />,
  },
  {
    title: "Loan Applications",
    url: "/underwriting-manager/applications",
    icon: <FileIcon className="h-4 w-4" />,
  },
  {
    title: "Review Queue",
    url: "/underwriting-manager/review-queue",
    icon: <ClipboardCheckIcon className="h-4 w-4" />,
  },
  {
    title: "Team Management",
    url: "/underwriting-manager/team",
    icon: <UsersIcon className="h-4 w-4" />,
  },
  {
    title: "Compliance",
    url: "/underwriting-manager/compliance",
    icon: <AlertCircleIcon className="h-4 w-4" />,
  },
  {
    title: "Reports",
    url: "/underwriting-manager/reports",
    icon: <FileTextIcon className="h-4 w-4" />,
  },
];

// User data to be used throughout the application
export const mockUserData = {
  id: "1",
  name: "Test User",
  email: "test@example.com",
  role: UserRole.BROKER
} 