import { useState } from 'react';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Types for the form data
type FormData = {
  loanType: string;
  personalDetails: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
  };
  documents: {
    incomeProof: boolean;
    identityProof: boolean;
    addressProof: boolean;
  };
  applicationComplete: boolean;
};

// Steps for the loan application process
const steps = [
  { id: 'step1', title: 'Loan Type', description: 'Browse and select' },
  { id: 'step2', title: 'Personal Details', description: 'Browse and upload' },
  { id: 'step3', title: 'Services', description: 'Browse and upload' },
  { id: 'step4', title: 'Budget', description: 'Browse and upload' },
  { id: 'step5', title: 'Complete', description: 'Browse and upload' },
];



export default function BorrowerForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    loanType: '',
    personalDetails: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
    },
    documents: {
      incomeProof: false,
      identityProof: false,
      addressProof: false,
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

  // Update nested form data (for personal details)
  const updatePersonalDetails = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
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
      const { fullName, email, phone, address } = formData.personalDetails;
      if (!fullName || !email || !phone || !address) {
        alert('Please fill in all personal details');
        return;
      }
    }

    if (currentStep === 2) {
      const { incomeProof, identityProof, addressProof } = formData.documents;
      if (!incomeProof || !identityProof || !addressProof) {
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

  // Handle application status change


  // Get step icon component based on current state
  const getStepIcon = (stepIndex: number) => {
    if (stepIndex < currentStep) {
      // Completed step
      return (
        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          <CheckIcon className="h-6 w-6" />
        </div>
      );
    } else if (stepIndex === currentStep) {
      // Current step
      return (
        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          {stepIndex + 1}
        </div>
      );
    } else {
      // Upcoming step
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
            {currentStep === 0 && "What services are you looking for?"}
            {currentStep === 1 && "Personal Details"}
            {currentStep === 2 && "Upload Documents"}
            {currentStep === 3 && "Budget Details"}
            {currentStep === 4 && "Review & Submit"}
          </h3>
          <p className="text-muted-foreground mb-6">
            {currentStep === 0 && "Please let us know what type of business describes you."}
            {currentStep === 1 && "Please provide your personal information."}
            {currentStep === 2 && "Please upload all required documents."}
            {currentStep === 3 && "Please provide your budget information."}
            {currentStep === 4 && "Please review your information before submitting."}
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
                  <h4 className="font-medium">Website Development</h4>
                  <p className="text-sm text-muted-foreground">Development of WebFlow Website</p>
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
                  <h4 className="font-medium">Existing Business</h4>
                  <p className="text-sm text-muted-foreground">Development of Website Design</p>
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
                value={formData.personalDetails.fullName}
                onChange={(e) => updatePersonalDetails('fullName', e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.personalDetails.email}
                onChange={(e) => updatePersonalDetails('email', e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.personalDetails.phone}
                onChange={(e) => updatePersonalDetails('phone', e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.personalDetails.address}
                onChange={(e) => updatePersonalDetails('address', e.target.value)}
                placeholder="Enter your address"
                required
              />
            </div>
          </div>
        )}
        
        {currentStep === 2 && (
          <div className="space-y-4 flex-1">
            <div className="border rounded-md p-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium">Income Proof</h3>
                <p className="text-sm text-muted-foreground">Upload your income documents</p>
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
                <p className="text-sm text-muted-foreground">Upload your ID documents</p>
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
                <p className="text-sm text-muted-foreground">Upload your address documents</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => updateDocuments('addressProof', true)}
                className={formData.documents.addressProof ? "bg-primary/5 text-primary border-primary/20" : ""}
              >
                {formData.documents.addressProof ? <CheckIcon className="h-4 w-4 mr-1" /> : "Upload"}
              </Button>
            </div>
          </div>
        )}
        
        {currentStep === 3 && (
          <div className="space-y-4 flex-1">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget Range</Label>
              <Select>
                <SelectTrigger id="budget" className="w-full">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under5k">Under $5,000</SelectItem>
                  <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                  <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                  <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                  <SelectItem value="50k+">$50,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timeframe">Timeframe</Label>
              <Select>
                <SelectTrigger id="timeframe" className="w-full">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediately">Immediately</SelectItem>
                  <SelectItem value="1-3months">1-3 months</SelectItem>
                  <SelectItem value="3-6months">3-6 months</SelectItem>
                  <SelectItem value="6-12months">6-12 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        
        {currentStep === 4 && (
          <div className="space-y-4 flex-1">
            <div className="border rounded-md p-4">
              <h3 className="font-medium">Selected Service</h3>
              <p className="mt-1">{formData.loanType === 'mortgage' ? 'Website Development' : 
                                 formData.loanType === 'business' ? 'Existing Business' : 'Not Selected'}</p>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium">Personal Details</h3>
              <div className="mt-2 space-y-1 text-sm">
                <p><span className="text-muted-foreground">Name:</span> {formData.personalDetails.fullName}</p>
                <p><span className="text-muted-foreground">Email:</span> {formData.personalDetails.email}</p>
                <p><span className="text-muted-foreground">Phone:</span> {formData.personalDetails.phone}</p>
                <p><span className="text-muted-foreground">Address:</span> {formData.personalDetails.address}</p>
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
            onClick={currentStep === 4 ? () => alert('Application submitted successfully!') : handleNextStep}
            className="w-32"
          >
            {currentStep === 4 ? 'Submit' : 'Next Step'}
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
          <h1 className="text-3xl font-bold">Example with Steps UI</h1>
          <p className="text-muted-foreground">Follow the simple 5 steps to complete your mapping.</p>
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
