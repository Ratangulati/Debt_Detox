import { DollarSign, Calculator, Plus, BarChart, LucideIcon } from "lucide-react";
import { AddDebtDialog } from "./AddDebtDialog";;
import { DebtCalculator } from "./DebtCalculator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import PaymentSimulator from "./PaymentSimulator";
import { toast } from "./ui/use-toast";

type QuickActionButtonProps = {
  icon: LucideIcon; 
  label: string;
  onClick?: () => void; 
  colorClass: string;
};



const QuickActionButton = ({ icon: Icon, label, onClick, colorClass }: QuickActionButtonProps) => (
  <button 
    className={`flex sm:items-center justify-center ${colorClass} hover:bg-accent rounded-lg shadow hover:shadow-md transition-all duration-200 w-full
    sm:h-12 sm:p-3 sm:space-x-2
    flex-col items-center min-h-[4rem] p-2 space-y-1 sm:flex-row sm:space-y-0`}
    onClick={onClick}
  >
    <Icon className="h-5 w-5 sm:h-4 sm:w-4" />
    <span className="text-[10px] sm:text-sm font-medium text-center sm:text-left max-w-full sm:max-w-none line-clamp-2 sm:line-clamp-none">
      {label}
    </span>
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
  // const [isPaymentOpen, setIsPaymentOpen] = useState(false);
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