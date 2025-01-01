import { PriceCard } from "./Price_Card";


const pricingPlans = [
  {
    title: "Basic",
    price: "0",
    description: "Perfect for getting started",
    features: [
      "Debt tracking for up to 3 accounts",
      "Basic payment reminders",
      "Monthly financial report",
      "Email support"
    ]
  },
  {
    title: "Pro",
    price: "19",
    description: "Best for serious debt management",
    features: [
      "Unlimited debt tracking",
      "Advanced payment strategies",
      "Custom payment schedules",
      "Priority support",
      "Debt consolidation tools",
      "Financial coaching"
    ],
    popular: true
  },
  {
    title: "Enterprise",
    price: "49",
    description: "For financial advisors",
    features: [
      "Everything in Pro",
      "Client management",
      "White-label options",
      "API access",
      "Custom reporting",
      "Dedicated account manager"
    ]
  }
];

export function PricingSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-zinc-400">Choose the plan that fits your needs</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <PriceCard key={plan.title} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}