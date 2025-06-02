import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Types
type LoanFile = {
  id: string;
  borrower: string;
  loanType: string;
  amount: string;
  status: "pending" | "verified" | "flagged";
  documents: {
    income: "verified" | "pending" | "flagged";
    credit: "verified" | "pending" | "flagged";
    property: "verified" | "pending" | "flagged";
    compliance: "verified" | "pending" | "flagged";
  };
  submittedDate: string;
  lastUpdated: string;
};

type FormData = {
  borrower: string;
  loanType: string;
  amount: string;
  documents: {
    income: "verified" | "pending" | "flagged";
    credit: "verified" | "pending" | "flagged";
    property: "verified" | "pending" | "flagged";
    compliance: "verified" | "pending" | "flagged";
  };
};

// Steps for the validation process
const steps = [
  {
    id: "step1",
    title: "Basic Information",
    description: "Enter loan details",
  },
  {
    id: "step2",
    title: "Document Review",
    description: "Review and validate documents",
  },
  {
    id: "step3",
    title: "Compliance Check",
    description: "Verify compliance requirements",
  },
  { id: "step4", title: "Review", description: "Review and submit" },
];

interface LoanValidationFormProps {
  onSubmit: (loan: LoanFile) => void;
}

export const LoanValidationForm: FC<LoanValidationFormProps> = ({
  onSubmit,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    borrower: "",
    loanType: "",
    amount: "",
    documents: {
      income: "pending",
      credit: "pending",
      property: "pending",
      compliance: "pending",
    },
  });

  // Update form data
  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Update document status
  const updateDocumentStatus = (
    docType: keyof FormData["documents"],
    status: "verified" | "pending" | "flagged"
  ) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [docType]: status,
      },
    }));
  };

  // Handle next step
  const handleNextStep = () => {
    if (currentStep === 0) {
      if (!formData.borrower || !formData.loanType || !formData.amount) {
        alert("Please fill in all basic information");
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
    setIsProcessing(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newLoan: LoanFile = {
      id: `LOAN-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      ...formData,
      status: "pending",
      submittedDate: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    onSubmit(newLoan);
    setIsProcessing(false);
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
    switch (currentStep) {
      case 0:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="borrower">Borrower Name</Label>
              <Input
                id="borrower"
                value={formData.borrower}
                onChange={(e) => updateFormData("borrower", e.target.value)}
                placeholder="Enter borrower name"
                required
              />
            </div>

            <div className="space-y-2 ">
              <Label htmlFor="loanType">Loan Type</Label>
              <Select
                value={formData.loanType}
                onValueChange={(value) => updateFormData("loanType", value)}
              >
                <SelectTrigger id="loanType">
                  <SelectValue placeholder="Select loan type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Residential">Residential</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Loan Amount</Label>
              <Input
                id="amount"
                value={formData.amount}
                onChange={(e) => updateFormData("amount", e.target.value)}
                placeholder="Enter loan amount"
                required
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            {Object.entries(formData.documents).map(([docType, status]) => (
              <div key={docType} className="border rounded-md p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium capitalize">{docType}</h3>
                    <p className="text-sm text-muted-foreground">
                      Review and validate document
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={status === "verified" ? "default" : "outline"}
                      size="sm"
                      onClick={() =>
                        updateDocumentStatus(
                          docType as keyof FormData["documents"],
                          "verified"
                        )
                      }
                    >
                      Verify
                    </Button>
                    <Button
                      variant={status === "flagged" ? "destructive" : "outline"}
                      size="sm"
                      onClick={() =>
                        updateDocumentStatus(
                          docType as keyof FormData["documents"],
                          "flagged"
                        )
                      }
                    >
                      Flag
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Compliance Requirements</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="compliance1" className="rounded" />
                  <label htmlFor="compliance1">
                    All required documents are present
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="compliance2" className="rounded" />
                  <label htmlFor="compliance2">
                    Documents meet regulatory requirements
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="compliance3" className="rounded" />
                  <label htmlFor="compliance3">
                    No suspicious activity detected
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Basic Information</h3>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="text-muted-foreground">Borrower:</span>{" "}
                  {formData.borrower}
                </p>
                <p>
                  <span className="text-muted-foreground">Loan Type:</span>{" "}
                  {formData.loanType}
                </p>
                <p>
                  <span className="text-muted-foreground">Amount:</span>{" "}
                  {formData.amount}
                </p>
              </div>
            </div>

            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Document Status</h3>
              <div className="space-y-1 text-sm">
                {Object.entries(formData.documents).map(([docType, status]) => (
                  <p key={docType} className="flex items-center">
                    <span className="text-muted-foreground capitalize">
                      {docType}:
                    </span>
                    <span className="ml-2 capitalize">{status}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Horizontal steps */}
      <div className="relative">
        <div className="flex w-full justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              {/* Step connector line */}
              {index > 0 && (
                <div
                  className="hidden sm:block absolute h-0.5 bg-muted"
                  style={{
                    position: "relative",
                    top: "20px",
                    left: `calc(${
                      (index - 1) * (100 / (steps.length - 1))
                    }% + 40px)`,
                    right: `calc(${
                      100 - index * (100 / (steps.length - 1))
                    }% + 40px)`,
                  }}
                />
              )}

              {/* Step icon */}
              <div className="relative z-10">{getStepIcon(index)}</div>

              {/* Step title and description */}
              <div className="mt-2 text-center">
                <div
                  className={cn(
                    "font-medium text-sm",
                    index === currentStep
                      ? "text-primary"
                      : index < currentStep
                      ? "text-primary/70"
                      : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </div>
                <div className="text-xs text-muted-foreground hidden sm:block">
                  {step.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="max-h-[400px]">{renderStepContent()}</div>

      {/* Navigation buttons */}
      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={handlePreviousStep}
          disabled={currentStep === 0}
          className="w-32"
        >
          Back
        </Button>
        <Button
          onClick={currentStep === 3 ? handleSubmit : handleNextStep}
          className="w-32"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing
            </>
          ) : currentStep === 3 ? (
            "Submit"
          ) : (
            "Next Step"
          )}
        </Button>
      </div>
    </div>
  );
};
