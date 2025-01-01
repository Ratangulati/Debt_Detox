import { TrendingUp, PiggyBank, Shield, Target } from "lucide-react";
import { Navbar } from "../components/landing/Navbar";
import { HeroSection } from "../components/landing/HeroSection";
import { FeatureCard } from "../components/landing/FeatureCard";
import { TestimonialSection } from "../components/landing/TestimonialSection";
import { PricingSection } from "../components/landing/PricingSection";
import { Footer } from "../components/landing/FooterSection";

const features = [
  {
    icon: Target,
    title: "Smart Debt Prioritization",
    description: "Optimize your debt repayment strategy with our intelligent algorithm that considers interest rates and balances."
  },
  {
    icon: Shield,
    title: "Financial Protection",
    description: "Stay protected with early warning systems and alerts for upcoming payments and potential financial risks."
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Watch your progress with interactive charts and celebrate milestones on your journey to becoming debt-free."
  },
  {
    icon: PiggyBank,
    title: "Savings Automation",
    description: "Build better financial habits with automated savings rules and smart budgeting recommendations."
  }
];

const Landing = () => {
  return (
    <div className="min-h-screen border-t border-zinc-800 py-8 bg-black text-white">
      <main>

        <Navbar />
        <section id="hero">
          <HeroSection />
        </section>

        <section id="features" className="py-16 px-4 bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Features That Drive Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials">
          <TestimonialSection />
        </section>

        <section id="pricing">
          <PricingSection />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Landing;