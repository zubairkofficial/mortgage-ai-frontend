import { FC, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/common/table";
import { createSortableColumn, createActionsColumn } from "@/components/common/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Users, Building } from "lucide-react";
import { Row, ColumnDef } from "@tanstack/react-table";

// Define the type for broker data
interface BrokerData {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  licenseNumber: string;
  location: string;
  joinDate: string;
  status: "Active" | "Inactive";
}

// Initial mock data for the broker network
const initialBrokerData: BrokerData[] = [
  {
    id: "BRK001",
    name: "John Smith",
    email: "john.smith@abcmortgage.com",
    phone: "(555) 123-4567",
    company: "ABC Mortgage",
    licenseNumber: "LIC123456",
    location: "New York, NY",
    joinDate: "2023-01-15",
    status: "Active",
  },
  {
    id: "BRK002",
    name: "Sarah Johnson",
    email: "sarah.johnson@xyzlending.com",
    phone: "(555) 987-6543",
    company: "XYZ Lending",
    licenseNumber: "LIC789012",
    location: "Los Angeles, CA",
    joinDate: "2023-03-22",
    status: "Active",
  },
];

const BrokerNetworkOverview: FC = () => {
  const [brokerData, setBrokerData] = useState<BrokerData[]>(initialBrokerData);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    licenseNumber: "",
    location: "",
    status: "Active" as "Active" | "Inactive",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate new ID
    const newId = `BRK${String(brokerData.length + 1).padStart(3, '0')}`;

    // Create new broker record
    const newBroker: BrokerData = {
      id: newId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      licenseNumber: formData.licenseNumber,
      location: formData.location,
      joinDate: new Date().toISOString().split('T')[0],
      status: formData.status,
    };

    // Add to table data
    setBrokerData(prev => [...prev, newBroker]);

    // Reset form and close modal
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      licenseNumber: "",
      location: "",
      status: "Active",
    });
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Broker Network</h1>
          <p className="text-muted-foreground">
            Manage your broker network
          </p>
        </div>

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Broker
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Broker</DialogTitle>
              <DialogDescription>
                Enter the broker's information. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="col-span-3"
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
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="col-span-3"
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="company" className="text-right">
                    Company
                  </Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="licenseNumber" className="text-right">
                    License Number
                  </Label>
                  <Input
                    id="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="col-span-3"
                    placeholder="City, State"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select value={formData.status} onValueChange={(value: "Active" | "Inactive") => handleInputChange("status", value)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Broker</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Simplified Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Brokers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{brokerData.length}</div>
            <p className="text-xs text-muted-foreground">
              {brokerData.filter(b => b.status === "Active").length} active brokers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Brokers</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {brokerData.filter(b => b.status === "Active").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>
      </div>


      <DataTable
        title="Manage Brokers"
        description="Overview of all the brokers in the system."
        columns={columns}
        data={brokerData}
        searchKey="name"
        filterableColumns={[
          {
            id: "status",
            title: "Status",
            options: [
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" },
            ],
          },
        ]}
      />
    </div>
  );
};

// Define columns for the broker network table
const columns: ColumnDef<BrokerData>[] = [
  createSortableColumn("id", "Broker ID"),
  createSortableColumn("name", "Name"),
  createSortableColumn("email", "Email"),
  createSortableColumn("phone", "Phone"),
  createSortableColumn("company", "Company"),
  createSortableColumn("licenseNumber", "License #"),
  createSortableColumn("location", "Location"),
  {
    accessorKey: "joinDate",
    header: "Join Date",
    cell: ({ row }: { row: Row<BrokerData> }) => {
      return new Date(row.original.joinDate).toLocaleDateString();
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: Row<BrokerData> }) => {
      const status = row.original.status;
      return (
        <span className={`px-2 py-1 rounded-full text-xs ${status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
          {status}
        </span>
      );
    },
  },
  createActionsColumn([
    {
      label: "View Details",
      onClick: (data: BrokerData) => console.log("View details for", data.id),
    },
    {
      label: "Edit",
      onClick: (data: BrokerData) => console.log("Edit", data.id),
    },
    {
      label: "Deactivate",
      onClick: (data: BrokerData) => console.log("Deactivate", data.id),
      variant: "destructive",
    },
  ]),
];

export default BrokerNetworkOverview; 