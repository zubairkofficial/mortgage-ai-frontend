import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, UserPlus, Search, Filter } from 'lucide-react';

type BorrowerProfile = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  creditScore: number;
  annualIncome: number;
  employmentStatus: string;
  riskScore: number;
  status: 'active' | 'pending' | 'inactive';
  lastUpdated: string;
};

export default function BorrowerProfilePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBorrower, setSelectedBorrower] = useState<BorrowerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration
  const mockBorrowers: BorrowerProfile[] = [
    {
      id: '1',
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234-567-8900',
      address: '123 Main St, City, State',
      creditScore: 750,
      annualIncome: 120000,
      employmentStatus: 'Employed',
      riskScore: 85,
      status: 'active',
      lastUpdated: '2024-03-15'
    },
    // Add more mock data as needed
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search logic
  };

  const handleAddBorrower = () => {
    // Implement add borrower logic
  };

  const handleEditBorrower = (borrower: BorrowerProfile) => {
    setSelectedBorrower(borrower);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Borrower Management</h1>
        <Button onClick={handleAddBorrower}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Borrower
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Search and Filters */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Search & Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search borrowers..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Credit Score Range</Label>
                <div className="flex gap-2">
                  <Input placeholder="Min" type="number" />
                  <Input placeholder="Max" type="number" />
                </div>
              </div>

              <Button className="w-full" variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Borrower List */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Borrower List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockBorrowers.map((borrower) => (
                <div
                  key={borrower.id}
                  className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleEditBorrower(borrower)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{borrower.fullName}</h3>
                      <p className="text-sm text-muted-foreground">{borrower.email}</p>
                    </div>
                    <Badge
                      variant={
                        borrower.status === 'active'
                          ? 'default'
                          : borrower.status === 'pending'
                          ? 'secondary'
                          : 'destructive'
                      }
                    >
                      {borrower.status}
                    </Badge>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Credit Score:</span>{' '}
                      {borrower.creditScore}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Risk Score:</span>{' '}
                      {borrower.riskScore}%
                    </div>
                    <div>
                      <span className="text-muted-foreground">Income:</span>{' '}
                      ${borrower.annualIncome.toLocaleString()}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Updated:</span>{' '}
                      {borrower.lastUpdated}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Borrower Modal */}
      {selectedBorrower && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Edit Borrower Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="personal">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="financial">Financial Info</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input defaultValue={selectedBorrower.fullName} />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input defaultValue={selectedBorrower.email} />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input defaultValue={selectedBorrower.phone} />
                    </div>
                    <div className="space-y-2">
                      <Label>Address</Label>
                      <Input defaultValue={selectedBorrower.address} />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="financial" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Credit Score</Label>
                      <Input type="number" defaultValue={selectedBorrower.creditScore} />
                    </div>
                    <div className="space-y-2">
                      <Label>Annual Income</Label>
                      <Input type="number" defaultValue={selectedBorrower.annualIncome} />
                    </div>
                    <div className="space-y-2">
                      <Label>Employment Status</Label>
                      <Select defaultValue={selectedBorrower.employmentStatus}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="employed">Employed</SelectItem>
                          <SelectItem value="self-employed">Self-Employed</SelectItem>
                          <SelectItem value="business-owner">Business Owner</SelectItem>
                          <SelectItem value="retired">Retired</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="space-y-4">
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Required Documents</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span>Income Proof</span>
                          <Button variant="outline" size="sm">Upload</Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Identity Proof</span>
                          <Button variant="outline" size="sm">Upload</Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Address Proof</span>
                          <Button variant="outline" size="sm">Upload</Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Credit Report</span>
                          <Button variant="outline" size="sm">Upload</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-4 mt-6">
                <Button variant="outline" onClick={() => setSelectedBorrower(null)}>
                  Cancel
                </Button>
                <Button>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 