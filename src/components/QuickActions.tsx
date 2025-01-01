import { DollarSign, Calculator, Plus, Bell, BarChart, Trophy, X } from "lucide-react";
import { AddDebtDialog } from "./AddDebtDialog";;
import { DebtCalculator } from "./DebtCalculator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import PaymentSimulator from "./PaymentSimulator";
import { toast } from "./ui/use-toast";


const QuickActionButton = ({ icon: Icon, label, onClick, colorClass }) => (
  <button 
    className={`flex items-center justify-center ${colorClass} hover:bg-accent rounded-lg p-3 shadow hover:shadow-md transition-all duration-200 space-x-2 w-full h-12`}
    onClick={onClick}
  >
    <Icon className="h-4 w-4" />
    <span className="text-sm font-medium">{label}</span>
  </button>
);


const handlePaymentComingSoon = () => {
  toast({
    title: "Coming Soon",
    description: "Payment integration will be available in the next update!",
  });
};

export const QuickActions = () => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

  return ( 
    <div className="fixed bottom-4 left-0 right-0 z-50">
      <div className="container max-w-screen-xl mx-auto">
        <div className="grid grid-cols-4 gap-6">

          <QuickActionButton 
            icon={DollarSign} 
            label="Make a Payment" 
            colorClass="bg-black text-white hover:bg-black/80"
            onClick={handlePaymentComingSoon}
          />

          <Sheet open={isCalculatorOpen} onOpenChange={setIsCalculatorOpen}>
            <SheetTrigger asChild>
              <QuickActionButton 
                icon={Calculator} 
                label="Debt Calculator" 
                colorClass="bg-card"
              />
            </SheetTrigger>
            <SheetContent className="p-0 w-full sm:max-w-xl">
              <SheetHeader className="p-6 pb-2 flex flex-row items-center justify-between">
                <SheetTitle>Debt Calculator</SheetTitle>
                {/* <Button variant="ghost" size="icon" onClick={() => setIsCalculatorOpen(false)}>
                  <X className="h-4 w-4" />
                </Button> */}
              </SheetHeader>
              <DebtCalculator />
            </SheetContent>
          </Sheet>

          <Sheet open={isSimulatorOpen} onOpenChange={setIsSimulatorOpen}>
            <SheetTrigger asChild>
              <QuickActionButton 
                icon={BarChart} 
                label="Payment Simulator" 
                colorClass="bg-card"
              />
            </SheetTrigger>
            <SheetContent className="p-0 w-full sm:max-w-xl">
              <SheetHeader className="p-6 pb-2 flex flex-row items-center justify-between">
                <SheetTitle>Payment Simulator</SheetTitle>
                {/* <Button variant="ghost" size="icon" onClick={() => setIsSimulatorOpen(false)}>
                  <X className="h-4 w-4" />
                </Button> */}
              </SheetHeader>
              <PaymentSimulator />
            </SheetContent>
          </Sheet>

          <AddDebtDialog>
            <QuickActionButton 
              icon={Plus} 
              label="Add Debt"
              colorClass="bg-card" 
            />
          </AddDebtDialog>
        </div>
      </div>
    </div>
  );
};