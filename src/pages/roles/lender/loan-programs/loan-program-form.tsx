import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
type LoanProgram = {
  id: string;
  name: string;
  type: string;
  minAmount: string;
  maxAmount: string;
  term: string;
  rate: string;
  status: "Active" | "Inactive";
  riskCriteria: string;
};

type FormData = {
  name: string;
  type: string;
  minAmount: string;
  maxAmount: string;
  term: string;
  rate: string;
  status: "Active" | "Inactive";
  riskCriteria: string;
  description: string;
  eligibilityCriteria: string[];
  documents: string[];
};

// Steps for the loan program creation process
const steps = [
  {
    id: "step1",
    title: "Basic Information",
    description: "Enter program name and type",
  },
  {
    id: "step2",
    title: "Loan Terms",
    description: "Set loan amounts, terms, and rates",
  },
  {
    id: "step3",
    title: "Criteria & Requirements",
    description: "Define eligibility and risk criteria",
  },
  {
    id: "step4",
    title: "Review & Submit",
    description: "Review and submit program",
  },
];

// Predefined data options for easier form filling
const programNameSuggestions = [
  "Business Term Loan",
  "Equipment Financing",
  "Working Capital Line",
  "Commercial Real Estate Plus",
  "SBA Express",
  "Construction Bridge",
  "Asset-Based Lending",
];

const minAmountSuggestions = [
  "$25,000",
  "$50,000",
  "$100,000",
  "$250,000",
  "$500,000",
];

const maxAmountSuggestions = [
  "$1,000,000",
  "$2,500,000",
  "$5,000,000",
  "$10,000,000",
  "$25,000,000",
];

const termSuggestions = [
  "6-24 months",
  "1-5 years",
  "5-10 years",
  "10-25 years",
  "15-30 years",
];

const rateSuggestions = [
  "Prime + 2.5%",
  "6.5% - 8.5%",
  "7.25% - 9.75%",
  "8.5% - 12%",
  "Prime + 1.75% - 3.25%",
];

interface LoanProgramFormProps {
  onSubmit: (program: LoanProgram) => void;
  initialData?: LoanProgram | null;
}

export const LoanProgramForm: FC<LoanProgramFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [newCriteria, setNewCriteria] = useState("");
  const [newDocument, setNewDocument] = useState("");

  const [formData, setFormData] = useState<FormData>({
    name: initialData?.name || "",
    type: initialData?.type || "",
    minAmount: initialData?.minAmount || "",
    maxAmount: initialData?.maxAmount || "",
    term: initialData?.term || "",
    rate: initialData?.rate || "",
    status: initialData?.status || "Active",
    riskCriteria: initialData?.riskCriteria || "",
    description: "",
    eligibilityCriteria: [],
    documents: [],
  });

  // Update form data
  const updateFormData = (field: string, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Add eligibility criteria
  const addCriteria = () => {
    if (newCriteria.trim()) {
      setFormData((prev) => ({
        ...prev,
        eligibilityCriteria: [...prev.eligibilityCriteria, newCriteria.trim()],
      }));
      setNewCriteria("");
    }
  };

  // Remove eligibility criteria
  const removeCriteria = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      eligibilityCriteria: prev.eligibilityCriteria.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // Add required document
  const addDocument = () => {
    if (newDocument.trim()) {
      setFormData((prev) => ({
        ...prev,
        documents: [...prev.documents, newDocument.trim()],
      }));
      setNewDocument("");
    }
  };

  // Remove required document
  const removeDocument = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
  };

  // Handle next step
  const handleNextStep = () => {
    if (currentStep === 0) {
      if (!formData.name || !formData.type) {
        toast.error("Please fill in program name and type");
        return;
      }
    }

    if (currentStep === 1) {
      if (
        !formData.minAmount ||
        !formData.maxAmount ||
        !formData.term ||
        !formData.rate
      ) {
        toast.error("Please fill in all loan terms");
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
      !formData.name ||
      !formData.type ||
      !formData.minAmount ||
      !formData.maxAmount ||
      !formData.term ||
      !formData.rate
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate more realistic data
    const programId =
      initialData?.id ||
      `LP-${String(Math.floor(Math.random() * 9000) + 1000)}`;

    const newProgram: LoanProgram = {
      id: programId,
      name: formData.name,
      type: formData.type,
      minAmount: formData.minAmount,
      maxAmount: formData.maxAmount,
      term: formData.term,
      rate: formData.rate,
      status: formData.status,
      riskCriteria: formData.riskCriteria,
    };

    onSubmit(newProgram);

    // Reset form if creating new program (not editing)
    if (!initialData) {
      setFormData({
        name: "",
        type: "",
        minAmount: "",
        maxAmount: "",
        term: "",
        rate: "",
        status: "Active",
        riskCriteria: "",
        description: "",
        eligibilityCriteria: [],
        documents: [],
      });

      // Reset to first step
      setCurrentStep(0);
    }

    // Show success message
    toast.success(
      initialData
        ? "Loan program updated successfully!"
        : "Loan program created successfully!"
    );

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Program Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                placeholder={`e.g., ${programNameSuggestions[0]}`}
                list="programNames"
                required
              />
              <datalist id="programNames">
                {programNameSuggestions.map((name) => (
                  <option key={name} value={name} />
                ))}
              </datalist>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Program Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => updateFormData("type", value)}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select program type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="SBA">SBA</SelectItem>
                  <SelectItem value="Residential">Residential</SelectItem>
                  <SelectItem value="Construction">Construction</SelectItem>
                  <SelectItem value="Bridge">Bridge</SelectItem>
                  <SelectItem value="Equipment">Equipment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  updateFormData("status", value as "Active" | "Inactive")
                }
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 lg:col-span-2">
              <Label htmlFor="description">Program Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
                placeholder="Enter program description"
                rows={3}
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <Label htmlFor="minAmount">Minimum Amount *</Label>
                <Input
                  id="minAmount"
                  value={formData.minAmount}
                  onChange={(e) => updateFormData("minAmount", e.target.value)}
                  placeholder={`e.g., ${minAmountSuggestions[0]}`}
                  list="minAmounts"
                  required
                />
                <datalist id="minAmounts">
                  {minAmountSuggestions.map((amount) => (
                    <option key={amount} value={amount} />
                  ))}
                </datalist>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxAmount">Maximum Amount *</Label>
                <Input
                  id="maxAmount"
                  value={formData.maxAmount}
                  onChange={(e) => updateFormData("maxAmount", e.target.value)}
                  placeholder={`e.g., ${maxAmountSuggestions[0]}`}
                  list="maxAmounts"
                  required
                />
                <datalist id="maxAmounts">
                  {maxAmountSuggestions.map((amount) => (
                    <option key={amount} value={amount} />
                  ))}
                </datalist>
              </div>

              <div className="space-y-2">
                <Label htmlFor="term">Loan Term *</Label>
                <Input
                  id="term"
                  value={formData.term}
                  onChange={(e) => updateFormData("term", e.target.value)}
                  placeholder={`e.g., ${termSuggestions[0]}`}
                  list="terms"
                  required
                />
                <datalist id="terms">
                  {termSuggestions.map((term) => (
                    <option key={term} value={term} />
                  ))}
                </datalist>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rate">Interest Rate *</Label>
                <Input
                  id="rate"
                  value={formData.rate}
                  onChange={(e) => updateFormData("rate", e.target.value)}
                  placeholder={`e.g., ${rateSuggestions[0]}`}
                  list="rates"
                  required
                />
                <datalist id="rates">
                  {rateSuggestions.map((rate) => (
                    <option key={rate} value={rate} />
                  ))}
                </datalist>
              </div>
            </div>

            <div className="border rounded-md p-3 md:p-4">
              <h3 className="font-medium mb-3 md:mb-4">
                Loan Terms Guidelines
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 text-sm text-muted-foreground">
                <div className="space-y-2">
                  <p>• Use consistent currency formatting (e.g., $50,000)</p>
                  <p>• Specify range format for amounts (e.g., $50K - $5M)</p>
                  <p>• Include time units for terms (years/months)</p>
                </div>
                <div className="space-y-2">
                  <p>• Use percentage format for rates (e.g., 6.5%)</p>
                  <p>• Consider market competitiveness</p>
                  <p>• Include any rate adjustment factors</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="riskCriteria">Risk Criteria</Label>
              <Textarea
                id="riskCriteria"
                value={formData.riskCriteria}
                onChange={(e) => updateFormData("riskCriteria", e.target.value)}
                placeholder="Enter risk assessment criteria (e.g., LTV ≤ 75%, DSCR ≥ 1.25)"
                rows={3}
              />
            </div>

            <div>
              <Label className="text-base font-medium">
                Eligibility Criteria
              </Label>
              <p className="text-sm text-muted-foreground mb-4">
                Define specific eligibility requirements for this loan program
              </p>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newCriteria}
                    onChange={(e) => setNewCriteria(e.target.value)}
                    placeholder="Enter eligibility criteria..."
                    onKeyPress={(e) => e.key === "Enter" && addCriteria()}
                  />
                  <Button type="button" onClick={addCriteria} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {formData.eligibilityCriteria.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Eligibility Requirements:
                    </Label>
                    {formData.eligibilityCriteria.map((criteria, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-blue-50 p-3 rounded-md"
                      >
                        <span className="text-sm text-blue-700">
                          {criteria}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCriteria(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">
                Required Documents
              </Label>
              <p className="text-sm text-muted-foreground mb-4">
                List documents required for this loan application
              </p>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newDocument}
                    onChange={(e) => setNewDocument(e.target.value)}
                    placeholder="Enter required document..."
                    onKeyPress={(e) => e.key === "Enter" && addDocument()}
                  />
                  <Button type="button" onClick={addDocument} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {formData.documents.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Required Documents:
                    </Label>
                    {formData.documents.map((document, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-green-50 p-3 rounded-md"
                      >
                        <span className="text-sm text-green-700">
                          {document}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDocument(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4 md:space-y-6">
            <div className="border rounded-md p-3 md:p-4">
              <h3 className="font-medium mb-3 md:mb-4">
                Review Loan Program Details
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Program Name
                  </Label>
                  <p className="text-sm">{formData.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Type
                  </Label>
                  <p className="text-sm">{formData.type}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Amount Range
                  </Label>
                  <p className="text-sm">
                    {formData.minAmount} - {formData.maxAmount}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Term
                  </Label>
                  <p className="text-sm">{formData.term}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Interest Rate
                  </Label>
                  <p className="text-sm">{formData.rate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Status
                  </Label>
                  <p className="text-sm">{formData.status}</p>
                </div>
              </div>

              {formData.riskCriteria && (
                <div className="mt-3 md:mt-4">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Risk Criteria
                  </Label>
                  <p className="text-sm">{formData.riskCriteria}</p>
                </div>
              )}

              {formData.eligibilityCriteria.length > 0 && (
                <div className="mt-3 md:mt-4">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Eligibility Criteria
                  </Label>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    {formData.eligibilityCriteria.map((criteria, index) => (
                      <li key={index} className="text-sm text-blue-600">
                        {criteria}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {formData.documents.length > 0 && (
                <div className="mt-3 md:mt-4">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Required Documents
                  </Label>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    {formData.documents.map((document, index) => (
                      <li key={index} className="text-sm text-green-600">
                        {document}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Progress Steps */}
      <div className="flex-shrink-0 mb-6">
        <div className="flex items-center justify-center gap-2 md:gap-4 overflow-x-auto pb-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-shrink-0">
              <div className="flex flex-col items-center min-w-0">
                {getStepIcon(index)}
                <div className="mt-2 text-center">
                  <p className="text-xs md:text-sm font-medium truncate max-w-[80px] md:max-w-none">
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate max-w-[100px] md:max-w-none hidden md:block">
                    {step.description}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-1 w-6 md:w-12 mx-2 md:mx-4 flex-shrink-0",
                    index < currentStep ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="min-h-[300px] pb-6">{renderStepContent()}</div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex-shrink-0 flex justify-between pt-4 border-t">
        <div>
          <Button
            type="button"
            variant="outline"
            onClick={handlePreviousStep}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
        </div>

        <div className="flex gap-2">
          {currentStep === steps.length - 1 ? (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isProcessing}
            >
              {isProcessing && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {initialData ? "Update Program" : "Create Program"}
            </Button>
          ) : (
            <Button type="button" onClick={handleNextStep}>
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
