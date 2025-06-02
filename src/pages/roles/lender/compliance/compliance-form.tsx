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
import { CheckIcon, Loader2, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
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
  riskLevel: "low" | "medium" | "high";
};

type FormData = {
  loanId: string;
  borrower: string;
  checkType: string;
  issues: string[];
  dueDate: string;
  assignedTo: string;
  riskLevel: "low" | "medium" | "high";
};

// Steps for the lender compliance check process
const steps = [
  {
    id: "step1",
    title: "Loan Information",
    description: "Enter loan and borrower details",
  },
  {
    id: "step2",
    title: "Compliance Type",
    description: "Select compliance check type",
  },
  {
    id: "step3",
    title: "Issue Documentation",
    description: "Document any compliance issues",
  },
  {
    id: "step4",
    title: "Review & Submit",
    description: "Review and submit check",
  },
];

// Predefined data options for easier form filling
const loanIdSuggestions = [
  "LOAN-005",
  "LOAN-006",
  "LOAN-007",
  "LOAN-008",
  "LOAN-009",
  "LOAN-010",
];

const assigneeSuggestions = [
  "Sarah Lender",
  "Mike Lender",
  "Emily Lender",
  "John Lender",
  "David Compliance",
  "Lisa Reviewer",
];

const borrowerSuggestions = [
  "Alice Johnson",
  "Michael Brown",
  "Sarah Wilson",
  "David Davis",
  "Emma Martinez",
  "James Anderson",
];

interface ComplianceFormProps {
  onSubmit: (check: ComplianceCheck) => void;
}

export const ComplianceForm: FC<ComplianceFormProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [newIssue, setNewIssue] = useState("");
  const [formData, setFormData] = useState<FormData>({
    loanId: "",
    borrower: "",
    checkType: "",
    issues: [],
    dueDate: "",
    assignedTo: "",
    riskLevel: "low",
  });

  // Update form data
  const updateFormData = (field: string, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Add issue
  const addIssue = () => {
    if (newIssue.trim()) {
      setFormData((prev) => ({
        ...prev,
        issues: [...prev.issues, newIssue.trim()],
      }));
      setNewIssue("");
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
      if (!formData.loanId || !formData.borrower || !formData.assignedTo) {
        toast.error("Please fill in all required loan information");
        return;
      }
    }

    if (currentStep === 1) {
      if (!formData.checkType || !formData.dueDate) {
        toast.error("Please select compliance type and due date");
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
    // Validate all required fields
    if (
      !formData.loanId ||
      !formData.borrower ||
      !formData.assignedTo ||
      !formData.checkType ||
      !formData.dueDate
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate more realistic data
    const currentDate = new Date();
    const checkId = `LC-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    const loanId = formData.loanId.startsWith("LOAN-")
      ? formData.loanId
      : `LOAN-${formData.loanId}`;

    const newCheck: ComplianceCheck = {
      id: checkId,
      loanId: loanId,
      borrower: formData.borrower,
      checkType: formData.checkType,
      status: formData.issues.length > 0 ? "flagged" : "pending",
      issues: formData.issues,
      dueDate: formData.dueDate,
      lastChecked: currentDate.toISOString().split("T")[0],
      assignedTo: formData.assignedTo,
      riskLevel: formData.riskLevel,
    };

    onSubmit(newCheck);

    // Reset form data
    setFormData({
      loanId: "",
      borrower: "",
      checkType: "",
      issues: [],
      dueDate: "",
      assignedTo: "",
      riskLevel: "low",
    });

    // Reset to first step
    setCurrentStep(0);

    // Show success message
    toast.success("Compliance check created successfully!");

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
              <Label htmlFor="loanId">Loan ID *</Label>
              <Input
                id="loanId"
                value={formData.loanId}
                onChange={(e) => updateFormData("loanId", e.target.value)}
                placeholder={`e.g., ${loanIdSuggestions[0]}`}
                list="loanIds"
                required
              />
              <datalist id="loanIds">
                {loanIdSuggestions.map((id) => (
                  <option key={id} value={id} />
                ))}
              </datalist>
            </div>

            <div className="space-y-2">
              <Label htmlFor="borrower">Borrower Name *</Label>
              <Input
                id="borrower"
                value={formData.borrower}
                onChange={(e) => updateFormData("borrower", e.target.value)}
                placeholder={`e.g., ${borrowerSuggestions[0]}`}
                list="borrowers"
                required
              />
              <datalist id="borrowers">
                {borrowerSuggestions.map((name) => (
                  <option key={name} value={name} />
                ))}
              </datalist>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignedTo">Assigned To *</Label>
              <Input
                id="assignedTo"
                value={formData.assignedTo}
                onChange={(e) => updateFormData("assignedTo", e.target.value)}
                placeholder={`e.g., ${assigneeSuggestions[0]}`}
                list="assignees"
                required
              />
              <datalist id="assignees">
                {assigneeSuggestions.map((name) => (
                  <option key={name} value={name} />
                ))}
              </datalist>
            </div>

            <div className="space-y-2">
              <Label htmlFor="riskLevel">Risk Level</Label>
              <Select
                value={formData.riskLevel}
                onValueChange={(value) => updateFormData("riskLevel", value)}
              >
                <SelectTrigger id="riskLevel">
                  <SelectValue placeholder="Select risk level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="checkType">Compliance Check Type *</Label>
                <Select
                  value={formData.checkType}
                  onValueChange={(value) => updateFormData("checkType", value)}
                >
                  <SelectTrigger id="checkType">
                    <SelectValue placeholder="Select check type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Anti-Money Laundering (AML)">
                      Anti-Money Laundering (AML)
                    </SelectItem>
                    <SelectItem value="Know Your Customer (KYC)">
                      Know Your Customer (KYC)
                    </SelectItem>
                    <SelectItem value="Fair Lending">Fair Lending</SelectItem>
                    <SelectItem value="TILA Disclosure">
                      TILA Disclosure
                    </SelectItem>
                    <SelectItem value="HMDA Reporting">
                      HMDA Reporting
                    </SelectItem>
                    <SelectItem value="Credit Assessment">
                      Credit Assessment
                    </SelectItem>
                    <SelectItem value="Document Verification">
                      Document Verification
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date *</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => updateFormData("dueDate", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-4">
                Lender Compliance Requirements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="req1" className="rounded" />
                    <label htmlFor="req1" className="text-sm">
                      Customer identification verified
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="req2" className="rounded" />
                    <label htmlFor="req2" className="text-sm">
                      Income documentation complete
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="req3" className="rounded" />
                    <label htmlFor="req3" className="text-sm">
                      Credit history reviewed
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="req4" className="rounded" />
                    <label htmlFor="req4" className="text-sm">
                      Debt-to-income ratio calculated
                    </label>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="req5" className="rounded" />
                    <label htmlFor="req5" className="text-sm">
                      Property appraisal reviewed
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="req6" className="rounded" />
                    <label htmlFor="req6" className="text-sm">
                      Fair lending practices followed
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="req7" className="rounded" />
                    <label htmlFor="req7" className="text-sm">
                      Disclosure requirements met
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="req8" className="rounded" />
                    <label htmlFor="req8" className="text-sm">
                      Regulatory guidelines followed
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">Compliance Issues</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Document any compliance issues found during the review process
              </p>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newIssue}
                    onChange={(e) => setNewIssue(e.target.value)}
                    placeholder="Enter compliance issue..."
                    onKeyPress={(e) => e.key === "Enter" && addIssue()}
                  />
                  <Button type="button" onClick={addIssue} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {formData.issues.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Documented Issues:
                    </Label>
                    {formData.issues.map((issue, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-red-50 p-3 rounded-md"
                      >
                        <span className="text-sm text-red-700">{issue}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeIssue(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {formData.issues.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>
                      No issues documented. This indicates compliance
                      requirements are met.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-4">
                Review Compliance Check Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Loan ID
                  </Label>
                  <p className="text-sm">{formData.loanId}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Borrower
                  </Label>
                  <p className="text-sm">{formData.borrower}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Check Type
                  </Label>
                  <p className="text-sm">{formData.checkType}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Risk Level
                  </Label>
                  <p className="text-sm capitalize">{formData.riskLevel}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Assigned To
                  </Label>
                  <p className="text-sm">{formData.assignedTo}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Due Date
                  </Label>
                  <p className="text-sm">{formData.dueDate}</p>
                </div>
              </div>

              <div className="mt-4">
                <Label className="text-sm font-medium text-muted-foreground">
                  Issues
                </Label>
                {formData.issues.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    {formData.issues.map((issue, index) => (
                      <li key={index} className="text-sm text-red-600">
                        {issue}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-green-600 mt-2">
                    No compliance issues found
                  </p>
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
      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              {getStepIcon(index)}
              <div className="mt-2 text-center">
                <p className="text-sm font-medium">{step.title}</p>
                <p className="text-xs text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-1 w-12 mx-4",
                  index < currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="min-h-[300px]">{renderStepContent()}</div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={handlePreviousStep}
          disabled={currentStep === 0}
        >
          Previous
        </Button>

        {currentStep === steps.length - 1 ? (
          <Button type="button" onClick={handleSubmit} disabled={isProcessing}>
            {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Compliance Check
          </Button>
        ) : (
          <Button type="button" onClick={handleNextStep}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};
