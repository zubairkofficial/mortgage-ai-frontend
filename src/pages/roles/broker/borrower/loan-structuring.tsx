import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Loader2, TrendingUp, Sparkles, Plus, Calculator } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { DataTable, createSortableColumn } from "@/components/common/table";

type LoanOption = {
  id: string;
  type: string;
  amount: number;
  term: number;
  interestRate: number;
  monthlyPayment: number;
  totalCost: number;
  riskScore: number;
  recommended: boolean;
  features: string[];
};

type CustomLoanOption = {
  id: string;
  name: string;
  amount: number;
  term: number;
  interestRate: number;
  monthlyPayment: number;
  totalCost: number;
  features: string;
  recommended: boolean;
};

export default function LoanStructuringPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [loanOptions, setLoanOptions] = useState<LoanOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<LoanOption | null>(null);
  const [customOptions, setCustomOptions] = useState<CustomLoanOption[]>([]);
  const [editingOption, setEditingOption] = useState<CustomLoanOption | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // Form state
  const [loanAmount, setLoanAmount] = useState(300000);
  const [loanTerm, setLoanTerm] = useState(30);
  const [loanType, setLoanType] = useState('mortgage');
  const [downPayment, setDownPayment] = useState(20);

  // Custom option form state
  const [customName, setCustomName] = useState('');
  const [customAmount, setCustomAmount] = useState(300000);
  const [customTerm, setCustomTerm] = useState(30);
  const [customRate, setCustomRate] = useState(5.5);
  const [customFeatures, setCustomFeatures] = useState('');
  const [isRecommended, setIsRecommended] = useState(false);

  // Mock loan options
  const mockLoanOptions: LoanOption[] = [
    {
      id: '1',
      type: 'Conventional Mortgage',
      amount: 300000,
      term: 30,
      interestRate: 5.5,
      monthlyPayment: 1703.37,
      totalCost: 613213.20,
      riskScore: 85,
      recommended: true,
      features: [
        'Fixed interest rate',
        'No PMI required',
        'Flexible payment terms'
      ]
    },
    {
      id: '2',
      type: 'FHA Loan',
      amount: 300000,
      term: 30,
      interestRate: 5.0,
      monthlyPayment: 1610.46,
      totalCost: 579765.60,
      riskScore: 75,
      recommended: false,
      features: [
        'Lower down payment required',
        'Government-backed',
        'More flexible credit requirements'
      ]
    },
    {
      id: '3',
      type: 'VA Loan',
      amount: 300000,
      term: 30,
      interestRate: 4.75,
      monthlyPayment: 1565.72,
      totalCost: 563659.20,
      riskScore: 90,
      recommended: true,
      features: [
        'No down payment required',
        'No PMI',
        'Lower interest rates'
      ]
    }
  ];

  const handleGenerateOptions = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoanOptions(mockLoanOptions);
    setIsProcessing(false);
  };

  const calculateMonthlyPayment = (amount: number, rate: number, term: number) => {
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = term * 12;
    return (amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
           (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  };

  const calculateTotalCost = (monthlyPayment: number, term: number) => {
    return monthlyPayment * term * 12;
  };

  const handleCreateOption = () => {
    const monthlyPayment = calculateMonthlyPayment(customAmount, customRate, customTerm);
    const totalCost = calculateTotalCost(monthlyPayment, customTerm);
    
    const newOption: CustomLoanOption = {
      id: Date.now().toString(),
      name: customName,
      amount: customAmount,
      term: customTerm,
      interestRate: customRate,
      monthlyPayment,
      totalCost,
      features: customFeatures,
      recommended: isRecommended
    };
    
    setCustomOptions([...customOptions, newOption]);
    resetCustomForm();
    setShowCreateDialog(false);
  };

  const handleEditOption = (option: CustomLoanOption) => {
    setEditingOption(option);
    setCustomName(option.name);
    setCustomAmount(option.amount);
    setCustomTerm(option.term);
    setCustomRate(option.interestRate);
    setCustomFeatures(option.features);
    setIsRecommended(option.recommended);
    setShowCreateDialog(true);
  };

  const handleUpdateOption = () => {
    if (!editingOption) return;
    
    const monthlyPayment = calculateMonthlyPayment(customAmount, customRate, customTerm);
    const totalCost = calculateTotalCost(monthlyPayment, customTerm);
    
    const updatedOption: CustomLoanOption = {
      ...editingOption,
      name: customName,
      amount: customAmount,
      term: customTerm,
      interestRate: customRate,
      monthlyPayment,
      totalCost,
      features: customFeatures,
      recommended: isRecommended
    };
    
    setCustomOptions(customOptions.map(opt => 
      opt.id === editingOption.id ? updatedOption : opt
    ));
    
    resetCustomForm();
    setEditingOption(null);
    setShowCreateDialog(false);
  };

  const handleDeleteOption = (id: string) => {
    setCustomOptions(customOptions.filter(opt => opt.id !== id));
  };

  const resetCustomForm = () => {
    setCustomName('');
    setCustomAmount(300000);
    setCustomTerm(30);
    setCustomRate(5.5);
    setCustomFeatures('');
    setIsRecommended(false);
  };

  const handleDialogClose = () => {
    resetCustomForm();
    setEditingOption(null);
    setShowCreateDialog(false);
  };

  // Define columns for the DataTable
  const customColumns = useMemo(() => [
    createSortableColumn('name', 'Name'),
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => {
        const option = row.original as CustomLoanOption;
        return <div>${option.amount.toLocaleString()}</div>;
      },
    },
    {
      accessorKey: 'term',
      header: 'Term',
      cell: ({ row }) => {
        const option = row.original as CustomLoanOption;
        return <div>{option.term} years</div>;
      },
    },
    {
      accessorKey: 'interestRate',
      header: 'Interest Rate',
      cell: ({ row }) => {
        const option = row.original as CustomLoanOption;
        return <div>{option.interestRate.toFixed(2)}%</div>;
      },
    },
    {
      accessorKey: 'monthlyPayment',
      header: 'Monthly Payment',
      cell: ({ row }) => {
        const option = row.original as CustomLoanOption;
        return <div>${option.monthlyPayment.toFixed(2)}</div>;
      },
    },
    {
      accessorKey: 'totalCost',
      header: 'Total Cost',
      cell: ({ row }) => {
        const option = row.original as CustomLoanOption;
        return <div>${option.totalCost.toLocaleString(undefined, {maximumFractionDigits: 2})}</div>;
      },
    },
    {
      accessorKey: 'recommended',
      header: 'Status',
      cell: ({ row }) => {
        const option = row.original as CustomLoanOption;
        return option.recommended && (
          <Badge variant="default" className="bg-primary">
            Recommended
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const option = row.original as CustomLoanOption;
        return (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => handleEditOption(option)}>
              Edit Option
            </Button>
            <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDeleteOption(option.id)}>
              Delete Option
            </Button>
          </div>
        );
      },
    },
  ], [handleEditOption, handleDeleteOption]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Loan Structuring Tool</h1>
        <div className="flex gap-2">
          <Button onClick={handleGenerateOptions} disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Options
              </>
            )}
          </Button>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Create Custom Option
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>
                  {editingOption ? "Edit Loan Option" : "Create New Loan Option"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="option-name" className="text-right">Name</Label>
                  <Input 
                    id="option-name" 
                    value={customName} 
                    onChange={(e) => setCustomName(e.target.value)} 
                    className="col-span-3" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="option-amount" className="text-right">Amount</Label>
                  <Input 
                    id="option-amount" 
                    type="number" 
                    value={customAmount} 
                    onChange={(e) => setCustomAmount(Number(e.target.value))} 
                    className="col-span-3" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="option-term" className="text-right">Term (years)</Label>
                  <Input 
                    id="option-term" 
                    type="number" 
                    value={customTerm} 
                    onChange={(e) => setCustomTerm(Number(e.target.value))} 
                    className="col-span-3" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="option-rate" className="text-right">Interest Rate (%)</Label>
                  <Input 
                    id="option-rate" 
                    type="number" 
                    step="0.01" 
                    value={customRate} 
                    onChange={(e) => setCustomRate(Number(e.target.value))} 
                    className="col-span-3" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="option-features" className="text-right">Features</Label>
                  <Input 
                    id="option-features" 
                    value={customFeatures} 
                    onChange={(e) => setCustomFeatures(e.target.value)} 
                    className="col-span-3"
                    placeholder="Comma-separated list of features" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="option-recommended" className="text-right">Recommended</Label>
                  <div className="col-span-3 flex items-center">
                    <input 
                      id="option-recommended" 
                      type="checkbox" 
                      checked={isRecommended} 
                      onChange={(e) => setIsRecommended(e.target.checked)} 
                      className="mr-2" 
                    />
                    <Label htmlFor="option-recommended">Mark as recommended</Label>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Monthly Payment</Label>
                  <div className="col-span-3">
                    ${calculateMonthlyPayment(customAmount, customRate, customTerm).toFixed(2)}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Total Cost</Label>
                  <div className="col-span-3">
                    ${(calculateMonthlyPayment(customAmount, customRate, customTerm) * customTerm * 12).toLocaleString(undefined, {maximumFractionDigits: 2})}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleDialogClose}>
                  Cancel
                </Button>
                <Button onClick={editingOption ? handleUpdateOption : handleCreateOption}>
                  {editingOption ? "Update" : "Create"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Custom Loan Options Table */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Custom Loan Options</CardTitle>
        </CardHeader>
        <CardContent>
          {customOptions.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No custom loan options created yet. Click "Create Custom Option" to get started.
            </p>
          ) : (
            <DataTable
              columns={customColumns}
              data={customOptions}
              searchKey="name"
              title="Your Custom Loan Options"
              description="Manage and compare your custom loan structure options"
              actionButtonText="Create Custom Option"
              actionButtonIcon={<Plus className="mr-2 h-4 w-4" />}
              onActionButtonClick={() => setShowCreateDialog(true)}
            />
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Loan Parameters */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Loan Parameters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Loan Type</Label>
                <Select value={loanType} onValueChange={setLoanType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mortgage">Mortgage</SelectItem>
                    <SelectItem value="business">Business Loan</SelectItem>
                    <SelectItem value="personal">Personal Loan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Loan Amount</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground">USD</span>
                </div>
                <Slider
                  value={[loanAmount]}
                  onValueChange={([value]) => setLoanAmount(value)}
                  min={50000}
                  max={1000000}
                  step={10000}
                />
              </div>

              <div className="space-y-2">
                <Label>Loan Term</Label>
                <Select value={loanTerm.toString()} onValueChange={(value) => setLoanTerm(Number(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 years</SelectItem>
                    <SelectItem value="20">20 years</SelectItem>
                    <SelectItem value="30">30 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Down Payment</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
                <Slider
                  value={[downPayment]}
                  onValueChange={([value]) => setDownPayment(value)}
                  min={0}
                  max={50}
                  step={5}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loan Options */}
        <div className="md:col-span-2 space-y-6">
          {loanOptions.map((option) => (
            <Card
              key={option.id}
              className={`cursor-pointer transition-all ${
                selectedOption?.id === option.id ? 'border-primary' : ''
              }`}
              onClick={() => setSelectedOption(option)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {option.type}
                      {option.recommended && (
                        <Badge variant="default" className="bg-primary">
                          Recommended
                        </Badge>
                      )}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Risk Score: {option.riskScore}%
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">${option.monthlyPayment.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">Monthly Payment</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Interest Rate</p>
                    <p className="font-medium">{option.interestRate}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Cost</p>
                    <p className="font-medium">${option.totalCost.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Key Features</h4>
                  <ul className="space-y-1">
                    {option.features.map((feature, index) => (
                      <li key={index} className="text-sm flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Selected Option Details */}
      {selectedOption && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Selected Loan Option Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Payment Schedule</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Monthly Payment</span>
                      <span className="font-medium">${selectedOption.monthlyPayment.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Interest</span>
                      <span className="font-medium">
                        ${(selectedOption.totalCost - selectedOption.amount).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Cost</span>
                      <span className="font-medium">${selectedOption.totalCost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Loan Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Loan Amount</span>
                      <span className="font-medium">${selectedOption.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Interest Rate</span>
                      <span className="font-medium">{selectedOption.interestRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Term</span>
                      <span className="font-medium">{selectedOption.term} years</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Next Steps</h4>
                  <div className="space-y-2">
                    <Button className="w-full">
                      <Calculator className="mr-2 h-4 w-4" />
                      Calculate Amortization
                    </Button>
                    <Button variant="outline" className="w-full">
                      Download Loan Summary
                    </Button>
                    <Button variant="outline" className="w-full">
                      Share with Borrower
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 