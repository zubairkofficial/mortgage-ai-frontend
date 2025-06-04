import { FC } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  suffix?: string;
  comparison?: {
    value?: number;
    label: string;
    isIncrease?: boolean;
  };
  additionalInfo?: {
    label: string;
    value: number | string;
  };
}

const StatCard: FC<StatCardProps> = ({
  title,
  value,
  suffix = "",
  comparison,
  additionalInfo,
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end">
          <div className="text-3xl font-bold">
            {value}{suffix}
          </div>
          {comparison ? (
            <div
              className={`flex items-center gap-1 text-sm ${
                comparison.isIncrease
                  ? "text-[var(--brand-teal)]"
                  : "text-destructive"
              }`}
            >
              {comparison.isIncrease ? (
                <ArrowUpRight size={16} />
              ) : (
                <ArrowDownRight size={16} />
              )}
              <span className="text-xs">{comparison.label}</span>
            </div>
          ) : additionalInfo ? (
            <div className="flex items-center gap-1 text-sm">
              <span className="text-xs">
                {additionalInfo.label}: {additionalInfo.value}
              </span>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
