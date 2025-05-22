//@ts-nocheck 
import { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { DataTable, createSortableColumn, createActionsColumn } from "@/components/common/table";

// Define Borrower type
type Borrower = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  creditScore: number;
  qualificationScore: number;
  lastContact: string;
};

const BorrowerProfilesPage = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Mock borrower data
  const borrowers: Borrower[] = [
    {
      id: "B001",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "(555) 123-4567",
      status: "Active",
      creditScore: 720,
      qualificationScore: 85,
      lastContact: "2023-05-10"
    },
    {
      id: "B002",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "(555) 234-5678",
      status: "Active",
      creditScore: 680,
      qualificationScore: 72,
      lastContact: "2023-05-15"
    },
    {
      id: "B003",
      name: "Michael Davis",
      email: "mdavis@example.com",
      phone: "(555) 345-6789",
      status: "Inactive",
      creditScore: 750,
      qualificationScore: 88,
      lastContact: "2023-04-28"
    },
    {
      id: "B004",
      name: "Emma Wilson",
      email: "emma.w@example.com",
      phone: "(555) 456-7890",
      status: "Active",
      creditScore: 705,
      qualificationScore: 79,
      lastContact: "2023-05-12"
    },
    {
      id: "B005",
      name: "Robert Brown",
      email: "rbrown@example.com",
      phone: "(555) 567-8901",
      status: "Pending",
      creditScore: 660,
      qualificationScore: 65,
      lastContact: "2023-05-18"
    }
  ];

  // Define columns for the DataTable
  const columns = useMemo(() => [
    createSortableColumn("id", "ID"),
    createSortableColumn("name", "Name"),
    {
      accessorKey: "contactInfo",
      header: "Contact Info",
      cell: ({ row }) => {
        const borrower = row.original as Borrower;
        return (
          <div>
            <div>{borrower.email}</div>
            <div className="text-sm text-muted-foreground">{borrower.phone}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const borrower = row.original as Borrower;
        const status = borrower.status;
        return (
          <span className={`px-2 py-1 rounded-full text-xs ${status === 'Active' ? 'bg-green-100 text-green-800' :
              status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
                'bg-yellow-100 text-yellow-800'
            }`}>
            {status}
          </span>
        );
      },
    },
    createSortableColumn("creditScore", "Credit Score"),
    {
      accessorKey: "qualificationScore",
      header: "Qualification",
      cell: ({ row }) => {
        const borrower = row.original as Borrower;
        const score = borrower.qualificationScore;
        return (
          <div className="flex items-center">
            <span className={`mr-2 ${score >= 80 ? 'text-green-600' :
                score >= 70 ? 'text-yellow-600' :
                  'text-red-600'
              }`}>
              {score}%
            </span>
            <div className="w-16 bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${score >= 80 ? 'bg-green-600' :
                    score >= 70 ? 'bg-yellow-600' :
                      'bg-red-600'
                  }`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        );
      },
    },
    createSortableColumn("lastContact", "Last Contact"),
    createActionsColumn([
      {
        label: "View Profile",
        onClick: (borrower: unknown) => console.log("View profile", (borrower as Borrower).id)
      },
      {
        label: "Edit",
        onClick: (borrower: unknown) => console.log("Edit borrower", (borrower as Borrower).id)
      },
      {
        label: "Delete",
        onClick: (borrower: unknown) => console.log("Delete borrower", (borrower as Borrower).id),
        variant: "destructive"
      }
    ])
  ], []);

  const filteredBorrowers = useMemo(() => {
    if (activeTab === "all") return borrowers;
    return borrowers.filter(borrower =>
      borrower.status.toLowerCase() === activeTab.toLowerCase()
    );
  }, [borrowers, activeTab]);

  return (


    <DataTable
      columns={columns}
      data={filteredBorrowers}
      searchKey="name"
      title="Borrower Profiles"
      description="View and manage borrower profiles."
      filterableColumns={[
        {
          id: "status",
          title: "Status",
          options: [
            { label: "Active", value: "Active" },
            { label: "Inactive", value: "Inactive" },
            { label: "Pending", value: "Pending" }
          ]
        }
      ]}
      actionButtonText="Add New Borrower"
      actionButtonIcon={<PlusIcon className="mr-2 h-4 w-4" />}
      onActionButtonClick={() => console.log("Add new borrower")}
    />

  );
};

export default BorrowerProfilesPage;