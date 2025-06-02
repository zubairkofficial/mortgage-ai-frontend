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
  apr: number;
  pmi?: number;
  downPaymentRequired: number;
  creditScoreRequired: number;
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

// Credit score simulation (in real app, this would come from credit check)
const simulatedCreditScore = 720;

// Default custom loan options
const getDefaultCustomOptions = (): CustomLoanOption[] => [
  {
    id: 'custom-1',
    name: 'Jumbo Loan Option',
    amount: 750000,
    term: 30,
    interestRate: 7.25,
    monthlyPayment: 5116.75,
    totalCost: 1842030,
    features: 'High loan limits, Competitive rates, Fast approval',
    recommended: false
  },
  {
    id: 'custom-2',
    name: 'First-Time Buyer Special',
    amount: 250000,
    term: 30,
    interestRate: 5.75,
    monthlyPayment: 1459.33,
    totalCost: 525358.80,
    features: 'Lower rates for first-time buyers, Reduced fees, Flexible terms',
    recommended: true
  },
  {
    id: 'custom-3',
    name: 'Investment Property Loan',
    amount: 400000,
    term: 25,
    interestRate: 7.50,
    monthlyPayment: 2947.83,
    totalCost: 884349,
    features: 'Investment property financing, Higher loan amounts, Quick processing',
    recommended: false
  }
];

export default function LoanStructuringPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [loanOptions, setLoanOptions] = useState<LoanOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<LoanOption | null>(null);
  const [customOptions, setCustomOptions] = useState<CustomLoanOption[]>(getDefaultCustomOptions());
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

  // Calculate loan metrics
  const calculateMonthlyPayment = (amount: number, rate: number, term: number) => {
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = term * 12;
    if (monthlyRate === 0) return amount / numberOfPayments;
    return (amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
           (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  };

  const calculateTotalCost = (monthlyPayment: number, term: number) => {
    return monthlyPayment * term * 12;
  };

  const calculatePMI = (loanAmount: number, homeValue: number, downPaymentPercent: number) => {
    const ltvRatio = (loanAmount / homeValue) * 100;
    if (ltvRatio > 80) {
      return loanAmount * 0.005 / 12; // 0.5% annually, divided by 12 months
    }
    return 0;
  };

  const calculateAPR = (interestRate: number, pmi: number, loanAmount: number) => {
    const monthlyPMI = pmi || 0;
    const annualPMI = monthlyPMI * 12;
    const pmiPercentage = (annualPMI / loanAmount) * 100;
    return interestRate + pmiPercentage;
  };

  const getRiskScore = (loanType: string, downPaymentPercent: number, creditScore: number, ltvRatio: number) => {
    let baseScore = 70;
    
    // Loan type adjustments
    if (loanType === 'va') baseScore += 15;
    else if (loanType === 'conventional') baseScore += 10;
    else if (loanType === 'fha') baseScore += 5;
    
    // Down payment adjustments
    if (downPaymentPercent >= 20) baseScore += 10;
    else if (downPaymentPercent >= 10) baseScore += 5;
    
    // Credit score adjustments
    if (creditScore >= 750) baseScore += 15;
    else if (creditScore >= 700) baseScore += 10;
    else if (creditScore >= 650) baseScore += 5;
    
    // LTV adjustments
    if (ltvRatio <= 80) baseScore += 5;
    
    return Math.min(Math.max(baseScore, 0), 100);
  };

  const getInterestRateByLoanType = (type: string, creditScore: number, downPaymentPercent: number) => {
    const baseRates = {
      conventional: 6.5,
      fha: 6.0,
      va: 5.8,
      usda: 6.2
    };
    
    let rate = baseRates[type as keyof typeof baseRates] || 6.5;
    
    // Credit score adjustments
    if (creditScore >= 750) rate -= 0.5;
    else if (creditScore >= 700) rate -= 0.25;
    else if (creditScore < 650) rate += 0.5;
    
    // Down payment adjustments for conventional loans
    if (type === 'conventional' && downPaymentPercent >= 20) {
      rate -= 0.25;
    }
    
    return Math.round(rate * 100) / 100;
  };

  const generateDynamicLoanOptions = () => {
    const homeValue = loanAmount / (1 - downPayment / 100);
    const actualLoanAmount = homeValue - (homeValue * downPayment / 100);
    
    const loanTypes = [
      {
        type: 'conventional',
        name: 'Conventional Mortgage',
        minDownPayment: 3,
        features: ['Fixed interest rate', 'No government backing', 'Flexible payment terms'],
        creditRequirement: 620
      },
      {
        type: 'fha',
        name: 'FHA Loan',
        minDownPayment: 3.5,
        features: ['Lower down payment required', 'Government-backed', 'More flexible credit requirements'],
        creditRequirement: 580
      },
      {
        type: 'va',
        name: 'VA Loan',
        minDownPayment: 0,
        features: ['No down payment required', 'No PMI', 'Lower interest rates', 'Veterans only'],
        creditRequirement: 600
      },
      {
        type: 'usda',
        name: 'USDA Loan',
        minDownPayment: 0,
        features: ['No down payment required', 'Rural properties', 'Government-backed'],
        creditRequirement: 640
      }
    ];

    const options: LoanOption[] = [];

    loanTypes.forEach((loanTypeInfo, index) => {
      // Skip if down payment is less than required
      if (downPayment < loanTypeInfo.minDownPayment) return;
      
      // Skip if credit score is too low
      if (simulatedCreditScore < loanTypeInfo.creditRequirement) return;

      const interestRate = getInterestRateByLoanType(loanTypeInfo.type, simulatedCreditScore, downPayment);
      const monthlyPayment = calculateMonthlyPayment(actualLoanAmount, interestRate, loanTerm);
      const totalCost = calculateTotalCost(monthlyPayment, loanTerm);
      const ltvRatio = (actualLoanAmount / homeValue) * 100;
      
      // Calculate PMI for conventional loans with < 20% down
      let pmi = 0;
      if (loanTypeInfo.type === 'conventional' && downPayment < 20) {
        pmi = calculatePMI(actualLoanAmount, homeValue, downPayment);
      }
      
      // Add MIP for FHA loans
      if (loanTypeInfo.type === 'fha') {
        pmi = actualLoanAmount * 0.0085 / 12; // 0.85% annually
      }
      
      const apr = calculateAPR(interestRate, pmi, actualLoanAmount);
      const riskScore = getRiskScore(loanTypeInfo.type, downPayment, simulatedCreditScore, ltvRatio);
      
      // Determine if recommended (best combination of rate, payment, and risk)
      const recommended = index === 0 || (interestRate <= 6.0 && riskScore >= 80);

      options.push({
        id: (index + 1).toString(),
        type: loanTypeInfo.name,
        amount: actualLoanAmount,
        term: loanTerm,
        interestRate,
        monthlyPayment: monthlyPayment + (pmi || 0),
        totalCost: totalCost + (pmi || 0) * loanTerm * 12,
        riskScore,
        recommended,
        features: loanTypeInfo.features,
        apr,
        pmi,
        downPaymentRequired: loanTypeInfo.minDownPayment,
        creditScoreRequired: loanTypeInfo.creditRequirement
      });
    });

    // Sort by recommended first, then by monthly payment
    return options.sort((a, b) => {
      if (a.recommended && !b.recommended) return -1;
      if (!a.recommended && b.recommended) return 1;
      return a.monthlyPayment - b.monthlyPayment;
    });
  };

  const handleGenerateOptions = async () => {
    setIsProcessing(true);
    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const dynamicOptions = generateDynamicLoanOptions();
    setLoanOptions(dynamicOptions);
    setSelectedOption(null); // Reset selection when new options are generated
    setIsProcessing(false);
  };

  // Auto-generate options when key parameters change
  const autoGenerateOptions = () => {
    if (loanAmount > 0 && loanTerm > 0 && downPayment >= 0) {
      const dynamicOptions = generateDynamicLoanOptions();
      setLoanOptions(dynamicOptions);
      setSelectedOption(null);
    }
  };

  // Use effect to auto-generate when parameters change
  useMemo(() => {
    autoGenerateOptions();
  }, [loanAmount, loanTerm, downPayment, loanType]);

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

  // Calculate derived values for display
  const homeValue = loanAmount / (1 - downPayment / 100);
  const actualLoanAmount = homeValue - (homeValue * downPayment / 100);
  const downPaymentAmount = homeValue * downPayment / 100;

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
                Recalculating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Refresh Options
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
                <Label>Home Value</Label>
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
                <div className="text-xs text-muted-foreground">
                  Home Value: ${homeValue.toLocaleString()}
                </div>
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
                  step={1}
                />
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div>Amount: ${downPaymentAmount.toLocaleString()}</div>
                  <div>Loan: ${actualLoanAmount.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loan Options */}
        <div className="md:col-span-2 space-y-6">
          {loanOptions.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Calculator className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Adjust your loan parameters to see available options
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            loanOptions.map((option) => (
              <Card
                key={option.id}
                className={`cursor-pointer transition-all ${
                  selectedOption?.id === option.id ? 'border-primary ring-2 ring-primary/20' : ''
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
                        Risk Score: {option.riskScore}% • APR: {option.apr.toFixed(2)}%
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">${option.monthlyPayment.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">Monthly Payment</p>
                      {option.pmi && option.pmi > 0 && (
                        <p className="text-xs text-orange-600">
                          +${option.pmi.toFixed(2)} PMI/MIP
                        </p>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Interest Rate</p>
                      <p className="font-medium">{option.interestRate.toFixed(2)}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Cost</p>
                      <p className="font-medium">${option.totalCost.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Min. Credit</p>
                      <p className="font-medium">{option.creditScoreRequired}</p>
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
            ))
          )}
        </div>
      </div>

      {/* Selected Option Details */}
      {selectedOption && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Selected Loan Option Details - {selectedOption.type}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Payment Breakdown</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Principal & Interest</span>
                      <span className="font-medium">
                        ${(selectedOption.monthlyPayment - (selectedOption.pmi || 0)).toFixed(2)}
                      </span>
                    </div>
                    {selectedOption.pmi && selectedOption.pmi > 0 && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">PMI/MIP</span>
                        <span className="font-medium">${selectedOption.pmi.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-sm font-medium">Total Monthly Payment</span>
                      <span className="font-bold">${selectedOption.monthlyPayment.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Interest</span>
                      <span className="font-medium">
                        ${(selectedOption.totalCost - selectedOption.amount).toLocaleString(undefined, {maximumFractionDigits: 0})}
                      </span>
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
                      <span className="font-medium">{selectedOption.interestRate.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">APR</span>
                      <span className="font-medium">{selectedOption.apr.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Term</span>
                      <span className="font-medium">{selectedOption.term} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Cost</span>
                      <span className="font-medium">${selectedOption.totalCost.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                    </div>
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