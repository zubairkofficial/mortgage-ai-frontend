import { useState } from 'react';
import { CheckIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { useApplicationStore } from '@/stores/applicationStore';
import { toast } from 'sonner';

// Types for the form data
type FormData = {
  loanType: string;
  borrowerDetails: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    creditScore: string;
    annualIncome: string;
    employmentStatus: string;
  };
  loanDetails: {
    amount: string;
    purpose: string;
    term: string;
    collateral: string;
  };
  documents: {
    incomeProof: boolean;
    identityProof: boolean;
    addressProof: boolean;
    creditReport: boolean;
  };
  applicationComplete: boolean;
};

// Steps for the loan application process
const steps = [
  { id: 'step1', title: 'Loan Type', description: 'Select loan type' },
  { id: 'step2', title: 'Borrower Details', description: 'Enter borrower information' },
  { id: 'step3', title: 'Loan Details', description: 'Enter loan specifics' },
  { id: 'step4', title: 'Documents', description: 'Upload required documents' },
  { id: 'step5', title: 'Review', description: 'Review and submit' },
];

export default function BrokerBorrowerForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const applicationStore = useApplicationStore();

  const [formData, setFormData] = useState<FormData>({
    loanType: '',
    borrowerDetails: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      creditScore: '',
      annualIncome: '',
      employmentStatus: '',
    },
    loanDetails: {
      amount: '',
      purpose: '',
      term: '',
      collateral: '',
    },
    documents: {
      incomeProof: false,
      identityProof: false,
      addressProof: false,
      creditReport: false,
    },
    applicationComplete: false,
  });

  // Update form data
  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Update nested form data
  const updateBorrowerDetails = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      borrowerDetails: {
        ...prev.borrowerDetails,
        [field]: value,
      },
    }));
  };

  const updateLoanDetails = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      loanDetails: {
        ...prev.loanDetails,
        [field]: value,
      },
    }));
  };

  // Update document status
  const updateDocuments = (field: string, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: value,
      },
    }));
  };

  // Handle next step
  const handleNextStep = () => {
    // Basic validation before moving to next step
    if (currentStep === 0 && !formData.loanType) {
      alert('Please select a loan type');
      return;
    }

    if (currentStep === 1) {
      const { fullName, email, phone, address, creditScore, annualIncome, employmentStatus } = formData.borrowerDetails;
      if (!fullName || !email || !phone || !address || !creditScore || !annualIncome || !employmentStatus) {
        alert('Please fill in all borrower details');
        return;
      }
    }

    if (currentStep === 2) {
      const { amount, purpose, term, collateral } = formData.loanDetails;
      if (!amount || !purpose || !term || !collateral) {
        alert('Please fill in all loan details');
        return;
      }
    }

    if (currentStep === 3) {
      const { incomeProof, identityProof, addressProof, creditReport } = formData.documents;
      if (!incomeProof || !identityProof || !addressProof || !creditReport) {
        alert('Please upload all required documents');
        return;
      }
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle previous step
  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Add the application to the table
    const newApplication = applicationStore.addApplication(formData);
    
    // Show a brief success message
    setIsProcessing(true);
    
    // Simulate a brief processing delay for UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsProcessing(false);
    
    // Show success notification
    toast.success('Application submitted successfully!');
    
    // Redirect to applications table
    navigate('/broker/application');
  };

  // Get step icon component based on current state
  const getStepIcon = (stepIndex: number) => {
    if (stepIndex < currentStep) {
      return (
        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          <CheckIcon className="h-6 w-6" />
        </div>
      );
    } else if (stepIndex === currentStep) {
      return (
        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          {stepIndex + 1}
        </div>
      );
    } else {
      return (
        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
          {stepIndex + 1}
        </div>
      );
    }
  };

  // Render the current step content
  const renderStepContent = () => {
    return (
      <div className="flex flex-col gap-6 min-h-[500px]">
        <div>
          <h2 className="text-xl font-semibold mb-2">Step {currentStep + 1}/5</h2>
          <h3 className="text-2xl font-bold mb-4">
            {currentStep === 0 && "Select Loan Type"}
            {currentStep === 1 && "Borrower Details"}
            {currentStep === 2 && "Loan Details"}
            {currentStep === 3 && "Required Documents"}
            {currentStep === 4 && "Review Application"}
          </h3>
          <p className="text-muted-foreground mb-6">
            {currentStep === 0 && "Select the type of loan the borrower is seeking."}
            {currentStep === 1 && "Enter the borrower's personal and financial information."}
            {currentStep === 2 && "Specify the loan amount, purpose, and terms."}
            {currentStep === 3 && "Upload all required documentation."}
            {currentStep === 4 && "Review all information before submission."}
          </p>
        </div>
        
        {currentStep === 0 && (
          <div className="space-y-4 flex-1">
            <div className={cn(
              "border rounded-lg p-4 cursor-pointer transition-all",
              formData.loanType === 'mortgage' ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            )}
            onClick={() => updateFormData('loanType', 'mortgage')}>
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <div className="h-8 w-8 rounded-full bg-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Mortgage Loan</h4>
                  <p className="text-sm text-muted-foreground">Residential or commercial property financing</p>
                </div>
              </div>
            </div>
            
            <div className={cn(
              "border rounded-lg p-4 cursor-pointer transition-all",
              formData.loanType === 'business' ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            )}
            onClick={() => updateFormData('loanType', 'business')}>
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <div className="h-8 w-8 rounded-full bg-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Business Loan</h4>
                  <p className="text-sm text-muted-foreground">Working capital, equipment, or expansion financing</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {currentStep === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={formData.borrowerDetails.fullName}
                onChange={(e) => updateBorrowerDetails('fullName', e.target.value)}
                placeholder="Enter borrower's full name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.borrowerDetails.email}
                onChange={(e) => updateBorrowerDetails('email', e.target.value)}
                placeholder="Enter borrower's email"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.borrowerDetails.phone}
                onChange={(e) => updateBorrowerDetails('phone', e.target.value)}
                placeholder="Enter borrower's phone number"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.borrowerDetails.address}
                onChange={(e) => updateBorrowerDetails('address', e.target.value)}
                placeholder="Enter borrower's address"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="creditScore">Credit Score</Label>
              <Input
                id="creditScore"
                value={formData.borrowerDetails.creditScore}
                onChange={(e) => updateBorrowerDetails('creditScore', e.target.value)}
                placeholder="Enter credit score"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="annualIncome">Annual Income</Label>
              <Input
                id="annualIncome"
                value={formData.borrowerDetails.annualIncome}
                onChange={(e) => updateBorrowerDetails('annualIncome', e.target.value)}
                placeholder="Enter annual income"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="employmentStatus">Employment Status</Label>
              <Select
                value={formData.borrowerDetails.employmentStatus}
                onValueChange={(value) => updateBorrowerDetails('employmentStatus', value)}
              >
                <SelectTrigger id="employmentStatus">
                  <SelectValue placeholder="Select employment status" />
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
        )}
        
        {currentStep === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
            <div className="space-y-2">
              <Label htmlFor="amount">Loan Amount</Label>
              <Input
                id="amount"
                value={formData.loanDetails.amount}
                onChange={(e) => updateLoanDetails('amount', e.target.value)}
                placeholder="Enter loan amount"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose">Loan Purpose</Label>
              <Select
                value={formData.loanDetails.purpose}
                onValueChange={(value) => updateLoanDetails('purpose', value)}
              >
                <SelectTrigger id="purpose">
                  <SelectValue placeholder="Select loan purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="purchase">Property Purchase</SelectItem>
                  <SelectItem value="refinance">Refinance</SelectItem>
                  <SelectItem value="business">Business Expansion</SelectItem>
                  <SelectItem value="equipment">Equipment Purchase</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="term">Loan Term</Label>
              <Select
                value={formData.loanDetails.term}
                onValueChange={(value) => updateLoanDetails('term', value)}
              >
                <SelectTrigger id="term">
                  <SelectValue placeholder="Select loan term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 years</SelectItem>
                  <SelectItem value="10">10 years</SelectItem>
                  <SelectItem value="15">15 years</SelectItem>
                  <SelectItem value="20">20 years</SelectItem>
                  <SelectItem value="30">30 years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="collateral">Collateral Type</Label>
              <Select
                value={formData.loanDetails.collateral}
                onValueChange={(value) => updateLoanDetails('collateral', value)}
              >
                <SelectTrigger id="collateral">
                  <SelectValue placeholder="Select collateral type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="property">Real Estate</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="inventory">Inventory</SelectItem>
                  <SelectItem value="receivables">Accounts Receivable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        
        {currentStep === 3 && (
          <div className="space-y-4 flex-1">
            <div className="border rounded-md p-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium">Income Proof</h3>
                <p className="text-sm text-muted-foreground">Upload income verification documents</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => updateDocuments('incomeProof', true)}
                className={formData.documents.incomeProof ? "bg-primary/5 text-primary border-primary/20" : ""}
              >
                {formData.documents.incomeProof ? <CheckIcon className="h-4 w-4 mr-1" /> : "Upload"}
              </Button>
            </div>
            
            <div className="border rounded-md p-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium">Identity Proof</h3>
                <p className="text-sm text-muted-foreground">Upload government-issued ID</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => updateDocuments('identityProof', true)}
                className={formData.documents.identityProof ? "bg-primary/5 text-primary border-primary/20" : ""}
              >
                {formData.documents.identityProof ? <CheckIcon className="h-4 w-4 mr-1" /> : "Upload"}
              </Button>
            </div>
            
            <div className="border rounded-md p-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium">Address Proof</h3>
                <p className="text-sm text-muted-foreground">Upload proof of residence</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => updateDocuments('addressProof', true)}
                className={formData.documents.addressProof ? "bg-primary/5 text-primary border-primary/20" : ""}
              >
                {formData.documents.addressProof ? <CheckIcon className="h-4 w-4 mr-1" /> : "Upload"}
              </Button>
            </div>

            <div className="border rounded-md p-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium">Credit Report</h3>
                <p className="text-sm text-muted-foreground">Upload credit report</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => updateDocuments('creditReport', true)}
                className={formData.documents.creditReport ? "bg-primary/5 text-primary border-primary/20" : ""}
              >
                {formData.documents.creditReport ? <CheckIcon className="h-4 w-4 mr-1" /> : "Upload"}
              </Button>
            </div>
          </div>
        )}
        
        {currentStep === 4 && (
          <div className="space-y-4 flex-1">
            <div className="border rounded-md p-4">
              <h3 className="font-medium">Selected Loan Type</h3>
              <p className="mt-1">{formData.loanType === 'mortgage' ? 'Mortgage Loan' : 
                                 formData.loanType === 'business' ? 'Business Loan' : 'Not Selected'}</p>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium">Borrower Details</h3>
              <div className="mt-2 space-y-1 text-sm">
                <p><span className="text-muted-foreground">Name:</span> {formData.borrowerDetails.fullName}</p>
                <p><span className="text-muted-foreground">Email:</span> {formData.borrowerDetails.email}</p>
                <p><span className="text-muted-foreground">Phone:</span> {formData.borrowerDetails.phone}</p>
                <p><span className="text-muted-foreground">Address:</span> {formData.borrowerDetails.address}</p>
                <p><span className="text-muted-foreground">Credit Score:</span> {formData.borrowerDetails.creditScore}</p>
                <p><span className="text-muted-foreground">Annual Income:</span> {formData.borrowerDetails.annualIncome}</p>
                <p><span className="text-muted-foreground">Employment Status:</span> {formData.borrowerDetails.employmentStatus}</p>
              </div>
            </div>

            <div className="border rounded-md p-4">
              <h3 className="font-medium">Loan Details</h3>
              <div className="mt-2 space-y-1 text-sm">
                <p><span className="text-muted-foreground">Amount:</span> {formData.loanDetails.amount}</p>
                <p><span className="text-muted-foreground">Purpose:</span> {formData.loanDetails.purpose}</p>
                <p><span className="text-muted-foreground">Term:</span> {formData.loanDetails.term} years</p>
                <p><span className="text-muted-foreground">Collateral:</span> {formData.loanDetails.collateral}</p>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium">Documents</h3>
              <div className="mt-2 space-y-1 text-sm">
                <p className="flex items-center">
                  <CheckIcon className="h-4 w-4 mr-2 text-primary" /> Income Proof
                </p>
                <p className="flex items-center">
                  <CheckIcon className="h-4 w-4 mr-2 text-primary" /> Identity Proof
                </p>
                <p className="flex items-center">
                  <CheckIcon className="h-4 w-4 mr-2 text-primary" /> Address Proof
                </p>
                <p className="flex items-center">
                  <CheckIcon className="h-4 w-4 mr-2 text-primary" /> Credit Report
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-between mt-auto pt-4">
          <Button 
            variant="outline" 
            onClick={handlePreviousStep}
            disabled={currentStep === 0}
            className="w-32"
          >
            Back
          </Button>
          <Button 
            onClick={currentStep === 4 ? handleSubmit : handleNextStep}
            className="w-32"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting
              </>
            ) : currentStep === 4 ? 'Submit' : 'Next Step'}
          </Button>
        </div>
      </div>
    );
  };

  // Render horizontal step indicators
  const renderHorizontalSteps = () => {
    return (
      <div className="flex w-full justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            {/* Step connector line */}
            {index > 0 && (
              <div className="hidden sm:block absolute h-0.5 bg-muted" style={{
                position: 'relative',
                top: '20px',
                left: `calc(${(index - 1) * (100 / (steps.length - 1))}% + 40px)`,
                right: `calc(${100 - index * (100 / (steps.length - 1))}% + 40px)`,
              }} />
            )}
            
            {/* Step icon */}
            <div className="relative z-10">
              {getStepIcon(index)}
            </div>
            
            {/* Step title and description */}
            <div className="mt-2 text-center">
              <div className={cn(
                "font-medium text-sm",
                index === currentStep ? "text-primary" : index < currentStep ? "text-primary/70" : "text-muted-foreground"
              )}>
                {step.title}
              </div>
              <div className="text-xs text-muted-foreground hidden sm:block">
                {step.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">New Borrower Application</h1>
          <p className="text-muted-foreground">Enter borrower details and submit for AI-powered processing</p>
        </div>
        
        <div className="bg-card rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 md:p-8">
            {/* Horizontal steps at the top */}
            <div className="relative">
              {renderHorizontalSteps()}
            </div>
            
            {/* Line separating steps from content */}
            <div className="h-px bg-border w-full my-6"></div>
            
            {/* Main content area */}
            <div>
              {renderStepContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
