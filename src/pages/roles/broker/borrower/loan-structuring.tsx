import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calculator, DollarSign } from 'lucide-react';

type LoanOption = {
  id: string;
  loanType: string;
  loanAmount: number;
  interestRate: number;
  termYears: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  description: string;
};

export default function LoanStructuringPage() {
  // Input parameters
  const [loanAmount, setLoanAmount] = useState<number>(300000);
  const [propertyValue, setPropertyValue] = useState<number>(375000);
  const [loanPurpose, setLoanPurpose] = useState<string>('purchase');
  const [creditScore, setCreditScore] = useState<number>(720);
  
  // Generated loan options
  const [loanOptions, setLoanOptions] = useState<LoanOption[]>([]);

  // Calculate monthly payment using standard loan formula
  const calculateMonthlyPayment = (principal: number, annualRate: number, years: number): number => {
    const monthlyRate = annualRate / 100 / 12;
    const numberOfPayments = years * 12;
    
    if (monthlyRate === 0) {
      return principal / numberOfPayments;
    }
    
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return monthlyPayment;
  };

  // Get interest rate based on loan type and credit score
  const getInterestRate = (loanType: string, creditScore: number): number => {
    const baseRates: { [key: string]: number } = {
      'conventional-30': 7.0,
      'conventional-15': 6.5,
      'fha-30': 6.5,
      'va-30': 6.2,
      'jumbo-30': 7.3,
    };

    let rate = baseRates[loanType] || 7.0;

    // Adjust rate based on credit score
    if (creditScore >= 760) rate -= 0.5;
    else if (creditScore >= 720) rate -= 0.25;
    else if (creditScore >= 680) rate -= 0.0;
    else if (creditScore >= 640) rate += 0.25;
    else rate += 0.75;

    return Math.round(rate * 100) / 100; // Round to 2 decimal places
  };

  // Generate loan options based on input parameters
  const generateLoanOptions = (): LoanOption[] => {
    const downPayment = propertyValue - loanAmount;
    const ltvRatio = (loanAmount / propertyValue) * 100;
    
    const options: LoanOption[] = [];

    // Define available loan programs
    const loanPrograms = [
      {
        type: 'conventional-30',
        name: '30-Year Conventional',
        term: 30,
        description: 'Standard 30-year fixed-rate mortgage',
        minLtv: 5, // 95% max LTV = 5% min down payment
      },
      {
        type: 'conventional-15',
        name: '15-Year Conventional',
        term: 15,
        description: 'Shorter term with lower interest rate',
        minLtv: 5,
      },
      {
        type: 'fha-30',
        name: '30-Year FHA',
        term: 30,
        description: 'Government-backed loan with lower down payment',
        minLtv: 3.5,
      },
      {
        type: 'va-30',
        name: '30-Year VA',
        term: 30,
        description: 'Veterans loan with no down payment required',
        minLtv: 0,
      },
      {
        type: 'jumbo-30',
        name: '30-Year Jumbo',
        term: 30,
        description: 'High-balance loan for expensive properties',
        minLtv: 10,
      },
    ];

    loanPrograms.forEach((program, index) => {
      // Check if loan qualifies for this program
      const minDownPayment = (propertyValue * program.minLtv) / 100;
      if (downPayment < minDownPayment) return;

      // Skip VA if not applicable (simplified check)
      if (program.type === 'va-30' && loanPurpose !== 'va-eligible') return;

      // Skip Jumbo if loan amount is below jumbo limit ($766,550 in most areas)
      if (program.type === 'jumbo-30' && loanAmount <= 766550) return;

      // Skip regular conventional/FHA if above jumbo limit
      if ((program.type === 'conventional-30' || program.type === 'conventional-15' || program.type === 'fha-30') 
          && loanAmount > 766550) return;

      const interestRate = getInterestRate(program.type, creditScore);
      const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, program.term);
      const totalPayment = monthlyPayment * program.term * 12;
      const totalInterest = totalPayment - loanAmount;

      options.push({
        id: (index + 1).toString(),
        loanType: program.name,
        loanAmount,
        interestRate,
        termYears: program.term,
        monthlyPayment,
        totalPayment,
        totalInterest,
        description: program.description,
      });
    });

    // Sort by monthly payment (lowest first)
    return options.sort((a, b) => a.monthlyPayment - b.monthlyPayment);
  };

  // Generate options when inputs change
  useEffect(() => {
    if (loanAmount > 0 && propertyValue > 0 && loanAmount <= propertyValue) {
      const options = generateLoanOptions();
      setLoanOptions(options);
    } else {
      setLoanOptions([]);
    }
  }, [loanAmount, propertyValue, loanPurpose, creditScore]);

  const downPayment = propertyValue - loanAmount;
  const downPaymentPercent = ((downPayment / propertyValue) * 100).toFixed(1);
  const ltvRatio = ((loanAmount / propertyValue) * 100).toFixed(1);

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Loan Structuring Tool</h1>
        <p className="text-muted-foreground">
          Enter your loan parameters below to see available loan options with calculations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Parameters */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Loan Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="property-value">Property Value</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="property-value"
                  type="number"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(Number(e.target.value))}
                  className="pl-9"
                  placeholder="375000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="loan-amount">Loan Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="loan-amount"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="pl-9"
                  placeholder="300000"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                Down Payment: ${downPayment.toLocaleString()} ({downPaymentPercent}%)
              </div>
              <div className="text-sm text-muted-foreground">
                LTV Ratio: {ltvRatio}%
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="credit-score">Credit Score</Label>
              <Input
                id="credit-score"
                type="number"
                value={creditScore}
                onChange={(e) => setCreditScore(Number(e.target.value))}
                min="300"
                max="850"
                placeholder="720"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="loan-purpose">Loan Purpose</Label>
              <Select value={loanPurpose} onValueChange={setLoanPurpose}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="purchase">Purchase</SelectItem>
                  <SelectItem value="refinance">Refinance</SelectItem>
                  <SelectItem value="cash-out">Cash-Out Refinance</SelectItem>
                  <SelectItem value="va-eligible">VA Eligible Purchase</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Loan Options */}
        <div className="lg:col-span-2">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Available Loan Options</h2>
            <p className="text-sm text-muted-foreground">
              Based on your parameters, here are the loan options available to you:
            </p>
          </div>

          {loanOptions.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Calculator className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    {loanAmount > propertyValue 
                      ? "Loan amount cannot exceed property value" 
                      : "Enter your loan parameters to see available options"
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {loanOptions.map((option, index) => (
                <Card key={option.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{option.loanType}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {option.description}
                        </p>
                      </div>
                      {index === 0 && (
                        <Badge variant="default">Lowest Payment</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Interest Rate</p>
                        <p className="text-lg font-semibold">{option.interestRate.toFixed(3)}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Monthly Payment</p>
                        <p className="text-lg font-semibold text-primary">
                          ${option.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Interest</p>
                        <p className="text-lg font-medium">
                          ${option.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Payment</p>
                        <p className="text-lg font-medium">
                          ${option.totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between text-sm">
                        <span>Loan Amount:</span>
                        <span>${option.loanAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Term:</span>
                        <span>{option.termYears} years</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}