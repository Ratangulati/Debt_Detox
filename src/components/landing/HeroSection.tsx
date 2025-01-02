import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import DashboardCard from "./DebtDashboard";
import { useNavigate } from "react-router-dom";


export function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900 to-black text-white pt-24 md:pt-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left Section */}
        <div className="space-y-6 text-center lg:text-left py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Manage Your{" "}
            <span className="bg-gradient-to-r from-white to-zinc-500 text-transparent bg-clip-text">
              Debt with Ease
            </span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-zinc-400 max-w-2xl mx-auto lg:mx-0">
            Our web app provides a comprehensive solution to help you track and manage all your outstanding debts in one place. Get full visibility into your financial obligations and set up payment reminders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
            <Button
              className="bg-white text-black hover:bg-zinc-200 w-full md:w-auto"
              onClick={() => navigate("/auth")}
              size="lg"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Right Section - Hidden on mobile */}
        <div className="relative hidden sm:flex justify-center items-center">
          <div className="absolute -z-10 aspect-square w-full max-w-xl rounded-full bg-gradient-to-tr from-zinc-900 to-zinc-800 blur-3xl" />
          <DashboardCard />
        </div>
      </div>
    </div>
  );
}
