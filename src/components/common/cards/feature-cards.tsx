import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  path: string;
}

interface FeatureCardsProps {
  features: FeatureCardProps[];
}

const FeatureCard: FC<FeatureCardProps> = ({ icon: Icon, title, path }) => {
  const navigate = useNavigate();

  return (
    <Card
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => navigate(path)}
    >
      <CardContent className="flex flex-col items-center justify-center p-6">
        <Icon size={32} className="text-primary mb-2" />
        <span className="text-sm font-medium text-center">{title}</span>
      </CardContent>
    </Card>
  );
};

const FeatureCards: FC<FeatureCardsProps> = ({ features }) => {
  return (
    <>
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          path={feature.path}
        />
      ))}
    </>
  );
};

export default FeatureCards;
