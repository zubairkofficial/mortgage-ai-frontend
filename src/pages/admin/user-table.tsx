import { DataTable, createSortableColumn, createActionsColumn } from "@/components/common/table";
import { Badge } from "@/components/ui/badge";
import { IconPlus } from "@tabler/icons-react";
// Define your data type
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

// Sample data
const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    status: "active"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "user",
    status: "active"
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "editor",
    status: "inactive"
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "user",
    status: "active"
  },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    role: "editor",
    status: "active"
  },
  {
    id: "6",
    name: "Sarah Brown",
    email: "sarah.brown@example.com",
    role: "user",
    status: "inactive"
  }
];

// Create columns using the helper functions
const columns = [
  createSortableColumn<User, any>("name", "Name"),
  createSortableColumn<User, any>("email", "Email"),
  createSortableColumn<User, any>("role", "Role"),
  createSortableColumn<User, any>("status", "Status", (user) => (
    <Badge variant={user.status === "active" ? "success" : "secondary"}>
      {user.status}
    </Badge>
  )),
  createActionsColumn<User>([
    { 
      label: "Edit", 
      onClick: (user) => console.log("Edit", user) 
    },
    { 
      label: "Delete", 
      onClick: (user) => console.log("Delete", user),
      variant: "destructive" 
    }
  ])
];

// Filterable columns config
const filterableColumns = [
  {
    id: "role",
    title: "Role",
    options: [
      { label: "Admin", value: "admin" },
      { label: "User", value: "user" },
      { label: "Editor", value: "editor" }
    ]
  },
  {
    id: "status",
    title: "Status",
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" }
    ]
  }
];

// Use the component
export default function UsersTable() {
  return (
    <DataTable
      columns={columns}
      data={users}
      searchKey="name"
      title="Users"
      description="Manage your user accounts"
      filterableColumns={filterableColumns}
      actionButtonText="Add User"
      actionButtonIcon={<IconPlus className="mr-2 h-4 w-4" />}
      onActionButtonClick={() => console.log("Add user clicked")}
    />
  );
}