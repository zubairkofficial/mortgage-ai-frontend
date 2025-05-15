import {
  IconDashboard,
  IconInnerShadowTop,
  IconMessageCircle,
  IconSettings,
  IconUsers,
  type Icon,
} from "@tabler/icons-react"

export type NavItem = {
  title: string
  url: string
  icon?: Icon
}

export const adminNavLinks: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: IconDashboard,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: IconUsers,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: IconSettings,
  },
  {
    title: "Chat",
    url: "/dashboard/chat",
    icon: IconMessageCircle,
  }
]

export const borrowerNavLinks: NavItem[] = [
  {
    title: "Dashboard",
    url: "/borrower",
    icon: IconDashboard,
  },
  {
    title: "Applications",
    url: "/borrower/applications",
    icon: IconUsers,
  },
  {
    title: "Settings",
    url: "/borrower/settings",
    icon: IconSettings,
  },
  {
    title: "Chat",
    url: "/borrower/chat",
    icon: IconMessageCircle,
  }
]

export const lenderNavLinks: NavItem[] = [
  {
    title: "Dashboard",
    url: "/lender",
    icon: IconDashboard,
  },
  {
    title: "Loans",
    url: "/lender/loans",
    icon: IconUsers,
  },
  {
    title: "Settings",
    url: "/lender/settings",
    icon: IconSettings,
  },
  {
    title: "Chat",
    url: "/lender/chat",
    icon: IconMessageCircle,
  }
]

export const mockUserData = {
  name: "Test User",
  email: "test@example.com",
  avatar: "/avatars/shadcn.jpg",
} 