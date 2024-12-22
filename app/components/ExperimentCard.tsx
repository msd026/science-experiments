// components/ExperimentCard.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { cn } from "@/lib/utils";

interface ExperimentCardProps {
  title: string;
  description: string;
  subject: "physics" | "chemistry" | "computer-science";
  children: React.ReactNode;
  className?: string;
}

const ExperimentCard = ({ title, description, subject, children, className }: ExperimentCardProps) => {
  const subjectColors = {
    "physics": "border-blue-500/20",
    "chemistry": "border-teal-500/20",
    "computer-science": "border-orange-500/20"
  };

  return (
    <Card className={cn("w-full transition-all hover:shadow-lg", subjectColors[subject], className)}>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default ExperimentCard;
