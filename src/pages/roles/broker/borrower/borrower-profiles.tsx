//@ts-nocheck 
import { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
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
  lastContact: string;
};

// Define form data type for new borrower
type NewBorrowerForm = {
  name: string;
  email: string;
  phone: string;
  status: string;
  creditScore: string;
};

const BorrowerProfilesPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<NewBorrowerForm>({
    name: '',
    email: '',
    phone: '',
    status: '',
    creditScore: ''
  });

  // Mock borrower data - now using state so we can add to it
  const [borrowers, setBorrowers] = useState<Borrower[]>([
    {
      id: "B001",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "(555) 123-4567",
      status: "Active",
      creditScore: 720,
      lastContact: "2023-05-10"
    },
    {
      id: "B002",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "(555) 234-5678",
      status: "Active",
      creditScore: 680,
      lastContact: "2023-05-15"
    },
    {
      id: "B003",
      name: "Michael Davis",
      email: "mdavis@example.com",
      phone: "(555) 345-6789",
      status: "Inactive",
      creditScore: 750,
      lastContact: "2023-04-28"
    },
    {
      id: "B004",
      name: "Emma Wilson",
      email: "emma.w@example.com",
      phone: "(555) 456-7890",
      status: "Active",
      creditScore: 705,
      lastContact: "2023-05-12"
    },
    {
      id: "B005",
      name: "Robert Brown",
      email: "rbrown@example.com",
      phone: "(555) 567-8901",
      status: "Pending",
      creditScore: 660,
      lastContact: "2023-05-18"
    }
  ]);

  // Handle form input changes
  const handleInputChange = (field: keyof NewBorrowerForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.status || !formData.creditScore) {
      alert('Please fill in all fields');
      return;
    }

    // Validate credit score
    const creditScore = parseInt(formData.creditScore);
    
    if (isNaN(creditScore) || creditScore < 300 || creditScore > 850) {
      alert('Credit score must be between 300 and 850');
      return;
    }
    
    // Generate new ID
    const newId = `B${String(borrowers.length + 1).padStart(3, '0')}`;
    
    // Create new borrower object
    const newBorrower: Borrower = {
      id: newId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      status: formData.status,
      creditScore: creditScore,
      lastContact: new Date().toISOString().split('T')[0] // Today's date
    };

    // Add to borrowers list
    setBorrowers(prev => [...prev, newBorrower]);

    // Reset form and close modal
    setFormData({
      name: '',
      email: '',
      phone: '',
      status: '',
      creditScore: ''
    });
    setIsModalOpen(false);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      status: '',
      creditScore: ''
    });
  };

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
    <div>
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
        onActionButtonClick={() => setIsModalOpen(true)}
      />

      <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Borrower</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="col-span-3"
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="col-span-3"
                  placeholder="Enter email address"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="col-span-3"
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange('status', value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="creditScore" className="text-right">
                  Credit Score
                </Label>
                <Input
                  id="creditScore"
                  type="number"
                  min="300"
                  max="850"
                  value={formData.creditScore}
                  onChange={(e) => handleInputChange('creditScore', e.target.value)}
                  className="col-span-3"
                  placeholder="300-850"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleModalClose}>
                Cancel
              </Button>
              <Button type="submit">
                Add Borrower
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BorrowerProfilesPage;