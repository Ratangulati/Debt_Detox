import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuickActions } from "../components/QuickActions";
import { useEffect, useRef, useState } from "react";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { DashboardStats } from "../components/dashboard/DashboardStats";
import { DebtsList } from "../components/dashboard/DebtsList";
import { PaymentReminders } from "../components/dashboard/PaymentReminders";
import { AchievementList } from "../components/dashboard/AchievementsList";
import confetti from 'canvas-confetti';

const Dashboard = () => {
  const { toast } = useToast();
  const [showCelebration, setShowCelebration] = useState(false);
  const [completedDebt, setCompletedDebt] = useState<string | null>(null);

  const { data: debts = [] } = useQuery({
    queryKey: ["debts"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("debts")
          .select("*")
          .order("next_payment_date", { ascending: true});

          if (error) throw error;
          return data || [];
      } catch (error: any) {
        toast({
          title: "Error fetching debts",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }
    },
  });

  const totalDebt = debts.reduce((acc, debt) => acc + debt.amount, 0);

  // Group payments by date and sum amounts
  const nextPaymentsByDate = debts.reduce((acc: { [key: string]: number }, debt) => {
    if (debt.next_payment_date && debt.next_payment_amount) {
      const date = debt.next_payment_date;
      acc[date] = (acc[date] || 0) + debt.next_payment_amount;
    }
    return acc;
  }, {});

  // Get the earliest date and its total payment amount
  const nextPaymentDate = Object.keys(nextPaymentsByDate).sort()[0];
  const nextPaymentAmount = nextPaymentDate ? nextPaymentsByDate[nextPaymentDate] : 0;


  // Check for completed debts
  const previousDebtsRef = useRef([]);

  useEffect(() => {
    const checkCompletedDebts = async () => {
      // Skip if this is the first render
      if (previousDebtsRef.current.length === 0) {
        previousDebtsRef.current = debts;
        return;
      }

      const { data: payments } = await supabase
        .from("payment_history")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1);

      if (payments && payments.length > 0) {
        const lastPayment = payments[0];
        const relatedDebt = debts.find(d => d.id === lastPayment.debt_id);
        
        // Check if debt was previously existing and had a balance
        const previousDebt = previousDebtsRef.current.find(
          d => d.id === lastPayment.debt_id
        );
        
        if (relatedDebt && 
            relatedDebt.amount === 0 && 
            previousDebt && 
            previousDebt.amount > 0) {
          
          // Check if payment is recent (within last 5 minutes)
          const paymentDate = new Date(lastPayment.created_at);
          const now = new Date();
          const paymentIsRecent = (now - paymentDate) < 1000 * 60 * 5;

          if (paymentIsRecent) {
            setCompletedDebt(relatedDebt.name);
            setShowCelebration(true);
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
            
            toast({
              title: "Congratulations! 🎉",
              description: `You've paid off your ${relatedDebt.name}!`,
              className: "animate-celebrate"
            });

            setTimeout(() => setShowCelebration(false), 5000);
          }
        }
      }

      // Update previous debts reference
      previousDebtsRef.current = debts;
    };

    checkCompletedDebts();
  }, [debts]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <DashboardHeader />

        <DashboardStats
          totalDebt={totalDebt}
          nextPaymentAmount={nextPaymentAmount}
          nextPaymentDate={nextPaymentDate}
          paidOffDebts={debts.filter(d => d.amount === 0).length}
          debts={debts}
        />

        <Tabs defaultValue="debts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="debts">Debts</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="debts" className="space-y-4">
            <DebtsList debts={debts} />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentReminders debts={debts} />
          </TabsContent>

          <TabsContent value="achievements">
            <AchievementList debts={debts} />
          </TabsContent>
        </Tabs>

        <div className="space-y-6">
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
