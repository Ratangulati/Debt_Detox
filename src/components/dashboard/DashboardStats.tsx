import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DollarSign, Bell, Trophy } from "lucide-react";
import { differenceInDays } from "date-fns";


interface Debt {
  id: string;
  name: string;
  amount: number;
  total_amount: number;
  next_payment_date: string;
  next_payment_amount: number;
  payment_frequency: string;
  interest_rate: number;
}

interface DashboardStatsProps {
  totalDebt: number;
  nextPaymentAmount: number;
  nextPaymentDate: string | null;
  paidOffDebts: number;
  debts: Debt[];
}

export const DashboardStats = ({
  totalDebt,
  nextPaymentAmount,
  nextPaymentDate,
  paidOffDebts,
  debts,
}: DashboardStatsProps) => {
  const daysUntilNextPayment = nextPaymentDate
    ? differenceInDays(new Date(nextPaymentDate), new Date())
    : null;

  const activeDebts = Array.isArray(debts) ? debts.filter(debt => debt.amount > 0) : [];
  const totalOriginalDebt = activeDebts.reduce((acc, debt) => acc + debt.total_amount, 0);
  const currentTotalDebt = activeDebts.reduce((acc, debt) => acc + debt.amount, 0);
  const progress = totalOriginalDebt > 0 ? ((totalOriginalDebt - currentTotalDebt) / totalOriginalDebt) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Debt</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalDebt.toLocaleString()}</div>
          <Progress value={progress} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {progress.toFixed(1)}% paid off
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Achievements</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{paidOffDebts}</div>
          <p className="text-xs text-muted-foreground mt-2">Debts paid off</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
          <Bell className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${nextPaymentAmount > 0 ? nextPaymentAmount.toLocaleString() : '0'}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {daysUntilNextPayment !== null
              ? daysUntilNextPayment === 0
                ? "Due today!"
                : daysUntilNextPayment < 0
                ? `Overdue by ${Math.abs(daysUntilNextPayment)} days`
                : `Due in ${daysUntilNextPayment} days`
              : "No upcoming payments"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};