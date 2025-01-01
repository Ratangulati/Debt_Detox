import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface PriceCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export function PriceCard({ title, price, description, features, popular }: PriceCardProps) {
  return (
    <Card
      className={`relative flex flex-col ${
        popular ? "border-white" : "border-zinc-800"
      } bg-zinc-900/50`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-white text-black text-sm font-semibold px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="mb-4">
          <span className="text-4xl font-bold text-white">${price}</span>
          <span className="text-zinc-400">/month</span>
        </div>
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-zinc-300">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button
          className={`w-full ${
            popular
              ? "bg-white text-black hover:bg-zinc-200"
              : "bg-zinc-800 hover:bg-zinc-700"
          }`}
        >
          Get Started
        </Button>
      </CardFooter>
    </Card>
  );
}
