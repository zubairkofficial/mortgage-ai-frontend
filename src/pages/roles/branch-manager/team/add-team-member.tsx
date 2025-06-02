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
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

interface TeamMember {
  name: string;
  email: string;
  phone: string;
  position: string;
  specialization: string[];
  certifications: number;
  joinDate: string;
}

interface AddTeamMemberProps {
  onSubmit: (member: TeamMember) => void;
}

const specializations = [
  "Residential",
  "Commercial",
  "Investment",
  "Refinance",
];
const positions = ["Senior Broker", "Broker", "Junior Broker"];

export const AddTeamMember: FC<AddTeamMemberProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<TeamMember>({
    name: "",
    email: "",
    phone: "",
    position: "",
    specialization: [],
    certifications: 0,
    joinDate: new Date().toISOString().split("T")[0],
  });

  const handleInputChange = (
    field: keyof TeamMember,
    value: string | string[] | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSpecializationChange = (spec: string) => {
    setFormData((prev) => ({
      ...prev,
      specialization: prev.specialization.includes(spec)
        ? prev.specialization.filter((s) => s !== spec)
        : [...prev.specialization, spec],
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const renderStep1 = () => (
    <div className="space-y-4 flex flex-wrap gap-1">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="min-w-full"
          placeholder="Enter full name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          placeholder="Enter email address"
          className="min-w-full"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          placeholder="Enter phone number"
          className="min-w-full"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="position">Position</Label>
        <Select
          value={formData.position}
          onValueChange={(value) => handleInputChange("position", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select position" />
          </SelectTrigger>
          <SelectContent>
            {positions.map((position) => (
              <SelectItem key={position} value={position}>
                {position}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Specialization</Label>
        <div className="grid grid-cols-2 gap-2">
          {specializations.map((spec) => (
            <div key={spec} className="flex items-center space-x-2">
              <Checkbox
                id={spec}
                checked={formData.specialization.includes(spec)}
                onCheckedChange={() => handleSpecializationChange(spec)}
              />
              <Label htmlFor={spec}>{spec}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="certifications">Number of Certifications</Label>
        <Input
          id="certifications"
          type="number"
          min="0"
          max="10"
          value={formData.certifications}
          onChange={(e) =>
            handleInputChange("certifications", parseInt(e.target.value))
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="joinDate">Join Date</Label>
        <Input
          id="joinDate"
          type="date"
          value={formData.joinDate}
          onChange={(e) => handleInputChange("joinDate", e.target.value)}
        />
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return null;
    }
  };

  return (
    <div className="py-4 ">
      <div className="flex items-center justify-center space-x-2 mb-6">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === currentStep
                ? "bg-primary text-primary-foreground"
                : step < currentStep
                ? "bg-primary/20 text-primary"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {step < currentStep ? <Check className="h-4 w-4" /> : step}
          </div>
        ))}
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        {renderStepContent()}

        <div className="flex justify-between pt-4">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep((prev) => prev - 1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
          )}
          {currentStep < 3 ? (
            <Button
              className="ml-auto"
              onClick={() => setCurrentStep((prev) => prev + 1)}
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button className="ml-auto" onClick={handleSubmit}>
              Add Team Member
              <Check className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
