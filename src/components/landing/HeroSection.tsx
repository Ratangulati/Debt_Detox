import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import DashboardCard from "./DebtDashboard";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate(); 

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900 to-black text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-4">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold tracking-tight">
            Manage Your{" "}
            <span className="bg-gradient-to-r from-white to-zinc-500 text-transparent bg-clip-text">
              Debt with Ease
            </span>
          </h1>
          <p className="text-xl text-zinc-400">
            Our web app provides a comprehensive solution to help you track and manage all your outstanding debts in one place. Get full visibility into your financial obligations and set up payment reminders.
          </p>
          <div className="flex gap-4">
            <Button className="bg-white text-black hover:bg-zinc-200" onClick={() => navigate("/auth")} size="lg">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -z-10 aspect-square w-full max-w-xl rounded-full bg-gradient-to-tr from-zinc-900 to-zinc-800 blur-3xl" />
          <DashboardCard />
        </div>
      </div>
    </div>
  );
}
