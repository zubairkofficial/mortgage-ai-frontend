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
type ComplianceCheck = {
  id: string;
  loanId: string;
  borrower: string;
  checkType: string;
  status: "compliant" | "flagged" | "pending";
  issues: string[];
  dueDate: string;
  lastChecked: string;
  assignedTo: string;
};

type FormData = {
  loanId: string;
  borrower: string;
  checkType: string;
  issues: string[];
  dueDate: string;
  assignedTo: string;
};

// Steps for the compliance check process
const steps = [
  {
    id: "step1",
    title: "Basic Information",
    description: "Enter loan and borrower details",
  },
  {
    id: "step2",
    title: "Compliance Review",
    description: "Review compliance requirements",
  },
  {
    id: "step3",
    title: "Issue Tracking",
    description: "Document any compliance issues",
  },
  { id: "step4", title: "Review", description: "Review and submit" },
];

interface ComplianceFormProps {
  onSubmit: (check: ComplianceCheck) => void;
}

export const ComplianceForm: FC<ComplianceFormProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    loanId: "",
    borrower: "",
    checkType: "",
    issues: [],
    dueDate: "",
    assignedTo: "",
  });

  // Update form data
  const updateFormData = (field: string, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Add issue
  const addIssue = (issue: string) => {
    if (issue.trim()) {
      setFormData((prev) => ({
        ...prev,
        issues: [...prev.issues, issue.trim()],
      }));
    }
  };

  // Remove issue
  const removeIssue = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      issues: prev.issues.filter((_, i) => i !== index),
    }));
  };

  // Handle next step
  const handleNextStep = () => {
    if (currentStep === 0) {
      if (!formData.loanId || !formData.borrower || !formData.checkType) {
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

    const newCheck: ComplianceCheck = {
      id: `COMP-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      ...formData,
      status: formData.issues.length > 0 ? "flagged" : "compliant",
      lastChecked: new Date().toISOString().split("T")[0],
    };

    onSubmit(newCheck);
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
              <Label htmlFor="loanId">Loan ID</Label>
              <Input
                id="loanId"
                value={formData.loanId}
                onChange={(e) => updateFormData("loanId", e.target.value)}
                placeholder="Enter loan ID"
                required
              />
            </div>

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

            <div className="space-y-2">
              <Label htmlFor="checkType">Check Type</Label>
              <Select
                value={formData.checkType}
                onValueChange={(value) => updateFormData("checkType", value)}
              >
                <SelectTrigger id="checkType">
                  <SelectValue placeholder="Select check type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Regulatory">Regulatory</SelectItem>
                  <SelectItem value="Documentation">Documentation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignedTo">Assigned To</Label>
              <Input
                id="assignedTo"
                value={formData.assignedTo}
                onChange={(e) => updateFormData("assignedTo", e.target.value)}
                placeholder="Enter assignee name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => updateFormData("dueDate", e.target.value)}
                required
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Compliance Requirements</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="req1" className="rounded" />
                  <label htmlFor="req1">TILA disclosure requirements met</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="req2" className="rounded" />
                  <label htmlFor="req2">HMDA data complete and accurate</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="req3" className="rounded" />
                  <label htmlFor="req3">Fair lending requirements met</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="req4" className="rounded" />
                  <label htmlFor="req4">Required documentation present</label>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Compliance Issues</h3>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter compliance issue"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addIssue(e.currentTarget.value);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                  <Button
                    onClick={() => {
                      const input = document.querySelector(
                        'input[placeholder="Enter compliance issue"]'
                      ) as HTMLInputElement;
                      if (input) {
                        addIssue(input.value);
                        input.value = "";
                      }
                    }}
                  >
                    Add Issue
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.issues.map((issue, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-muted p-2 rounded"
                    >
                      <span>{issue}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeIssue(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
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
                  <span className="text-muted-foreground">Loan ID:</span>{" "}
                  {formData.loanId}
                </p>
                <p>
                  <span className="text-muted-foreground">Borrower:</span>{" "}
                  {formData.borrower}
                </p>
                <p>
                  <span className="text-muted-foreground">Check Type:</span>{" "}
                  {formData.checkType}
                </p>
                <p>
                  <span className="text-muted-foreground">Assigned To:</span>{" "}
                  {formData.assignedTo}
                </p>
                <p>
                  <span className="text-muted-foreground">Due Date:</span>{" "}
                  {formData.dueDate}
                </p>
              </div>
            </div>

            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Compliance Issues</h3>
              <div className="space-y-1 text-sm">
                {formData.issues.length > 0 ? (
                  formData.issues.map((issue, index) => (
                    <p key={index} className="text-destructive">
                      • {issue}
                    </p>
                  ))
                ) : (
                  <p className="text-green-600">No issues found</p>
                )}
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
      <div className="max-h-[400px] overflow-y-auto">{renderStepContent()}</div>

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
