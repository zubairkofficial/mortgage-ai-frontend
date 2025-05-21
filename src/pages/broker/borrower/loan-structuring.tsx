import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Loader2, TrendingUp, Calculator, Sparkles } from 'lucide-react';

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

export default function LoanStructuringPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [loanOptions, setLoanOptions] = useState<LoanOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<LoanOption | null>(null);

  // Form state
  const [loanAmount, setLoanAmount] = useState(300000);
  const [loanTerm, setLoanTerm] = useState(30);
  const [loanType, setLoanType] = useState('mortgage');
  const [downPayment, setDownPayment] = useState(20);

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

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Loan Structuring Tool</h1>
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
      </div>

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