import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900/80 transition-colors">
      <CardHeader>
        <Icon className="w-12 h-12 mb-4 text-white" />
        <CardTitle className="text-xl text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-zinc-400">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}