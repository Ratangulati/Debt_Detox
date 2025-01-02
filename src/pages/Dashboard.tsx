import { useQuery } from "@tanstack/react-query";
import { QuickActions } from "../components/QuickActions";
import { useEffect, useRef, useState } from "react";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { DashboardStats } from "../components/dashboard/DashboardStats";
import { DebtsList } from "../components/dashboard/DebtsList";
import { PaymentReminders } from "../components/dashboard/PaymentReminders";
import { AchievementList } from "../components/dashboard/AchievementsList";
import confetti from 'canvas-confetti';
import { supabase } from "../integrations/supabase/client";
import { Debt } from "../components/dashboard/types";
import { useToast } from "../components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

interface DbDebt {
  id: string;
  name: string;
  amount: number;
  total_amount: number | null;
  payment_frequency: string;
  interest_rate: number;
  interest_type: string;
  next_payment_date: string | null;
  next_payment_amount: number | null;
  due_date: string | null;
  created_at: string;
  updated_at: string;
  user_id: string | null;
}

interface DbPayment {
  id: string;
  debt_id: string | null;
  amount: number;
  payment_date: string | null;
  created_at: string | null;
}

const Dashboard = () => {
  const { toast } = useToast();
  const [showCelebration, setShowCelebration] = useState(false);
  const [completedDebt, setCompletedDebt] = useState<string | null>(null);

  const { data: dbDebts = [] } = useQuery<DbDebt[]>({
    queryKey: ["debts"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("debts")
          .select("*")
          .order("next_payment_date", { ascending: true });

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

  const debts: Debt[] = dbDebts.map(debt => ({
    id: debt.id,
    name: debt.name,
    amount: debt.amount,
    total_amount: debt.total_amount ?? debt.amount,
    payment_frequency: debt.payment_frequency,
    interest_rate: debt.interest_rate,
    next_payment_date: debt.next_payment_date ?? "",  
    next_payment_amount: debt.next_payment_amount ?? 0, 
    due_date: debt.due_date ?? "",
  }));

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
  const nextPaymentDate = Object.keys(nextPaymentsByDate).sort()[0] ?? "";
  const nextPaymentAmount = nextPaymentDate ? nextPaymentsByDate[nextPaymentDate] : 0;

  // Check for completed debts
  const previousDebtsRef = useRef<Debt[]>([]);

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
        const lastPayment = payments[0] as DbPayment;
        if (lastPayment.created_at && lastPayment.debt_id) {
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
            const paymentTime = new Date(lastPayment.created_at).getTime();
            const currentTime = new Date().getTime();
            const paymentIsRecent = (currentTime - paymentTime) < 1000 * 60 * 5;

            if (paymentIsRecent) {
              setCompletedDebt(relatedDebt.name);
              setShowCelebration(true);
              confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
              });

              // toast({
              //   title: "Congratulations! 🎉",
              //   description: `You've paid off your ${relatedDebt.name}!`,
              //   className: "animate-celebrate"
              // });

              setTimeout(() => setShowCelebration(false), 5000);
            }
          }
        }
      }

      // Update previous debts reference
      previousDebtsRef.current = debts;
    };

    checkCompletedDebts();
  }, [debts, toast]);

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

      {/* Celebration Banner */}
      {showCelebration && completedDebt && (
        <div className="fixed top-0 left-0 right-0 p-4 bg-green-500 text-white text-center animate-slide-in">
          <h2>Congratulations!</h2>
          <p>You have paid off {completedDebt}!</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
