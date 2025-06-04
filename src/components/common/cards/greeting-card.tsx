import { Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface StatItem {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

interface GreetingCardProps {
  userName: string;
  stats?: StatItem[];
  description?: string;
  footerTitle?: string;
  footerDescription?: string;
}

const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Morning";
  if (hour < 17) return "Afternoon";
  return "Evening";
};

export default function GreetingCard({ 
  userName, 
  stats = [], 
  description = "Welcome back",
  footerTitle = "Manage broker teams at the branch level efficiently",
  footerDescription = "Monitor performance metrics, enforce compliance, and provide training"
}: GreetingCardProps) {
  const timeOfDay = getTimeOfDay();

  return (
    <Card className="@container/card card-gradient-primary">
      <CardHeader>
        <CardDescription className="text-base">{description}</CardDescription>
        <CardTitle className="text-2xl font-semibold @[250px]/card:text-3xl">
          Good {timeOfDay}, {userName}!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar size={18} className="text-primary" />
            <span>Today: {new Date().toLocaleDateString()}</span>
          </div>
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              {stat.icon}
              <span>{stat.value} {stat.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {footerTitle}
        </div>
        <div className="text-muted-foreground">
          {footerDescription}
        </div>
      </CardFooter>
    </Card>
  );
}
