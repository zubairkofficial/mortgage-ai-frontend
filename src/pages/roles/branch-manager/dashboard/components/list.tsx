import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface TrainingResource {
  title: string;
  date: string;
  type: 'Compliance' | 'System' | 'Process' | 'Skill';
  required: boolean;
}

const getTypeStyles = (type: TrainingResource['type']): string => {
  switch (type) {
    case 'Compliance':
      return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
    case 'Process':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
    case 'System':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
    case 'Skill':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
    default:
      return '';
  }
};

interface TrainingResourceListProps {
  resources: TrainingResource[];
  title?: string;
  viewAllLink?: string;
  viewAllText?: string;
}

const TrainingResourcesList: FC<TrainingResourceListProps> = ({
  resources,
  title = "Latest Training Resources",
  viewAllLink = "/branch-manager/training",
  viewAllText = "View All Training Resources"
}) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {resources.map((resource, index) => (
            <li key={index} className="border-b pb-2 last:border-0 last:pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{resource.title}</div>
                  <div className="text-sm text-muted-foreground">
                    Added: {new Date(resource.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTypeStyles(resource.type)}`}>
                    {resource.type}
                  </span>
                  {resource.required && (
                    <span className="text-xs mt-1 text-red-500">Required</span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="justify-center">
        <button 
          className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1 hover:underline transition-colors"
          onClick={() => navigate(viewAllLink)}
        >
          {viewAllText}
          <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </CardFooter>
    </Card>
  );
};

interface BrokerCertification {
  name: string;
  position: string;
  certifications: number;
  inProgress: number;
  required: number;
}

interface BrokerCertificationListProps {
  brokers: BrokerCertification[];
  title?: string;
  description?: string;
  viewAllLink?: string;
  viewAllText?: string;
}

const BrokerCertificationList: FC<BrokerCertificationListProps> = ({
  brokers,
  title = "Broker Certification Progress",
  description = "Track and encourage professional development within your team. Set certification goals and monitor progress.",
  viewAllLink = "/branch-manager/training",
  viewAllText = "View All Certifications"
}) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-6">
          <div>
            <p>{description}</p>
          </div>
        </div>
        <ul className="space-y-3">
          {brokers.map((broker, index) => (
            <li key={index} className="border-b pb-2 last:border-0 last:pb-0">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{broker.name}</div>
                  <div className="text-sm text-muted-foreground">{broker.position}</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-xs">Completed: {broker.certifications}/{broker.required}</span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: `${(broker.certifications / broker.required) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  {broker.inProgress > 0 && (
                    <span className="text-xs text-amber-500 mt-1">{broker.inProgress} certification(s) in progress</span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="justify-center">
        <button 
          className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1 hover:underline transition-colors"
          onClick={() => navigate(viewAllLink)}
        >
          {viewAllText}
          <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </CardFooter>
    </Card>
  );
};

export { TrainingResourcesList, BrokerCertificationList };