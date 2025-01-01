import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Calendar, CreditCard } from "lucide-react";

interface DebtStatsProps {
  totalDebt: number;
  nextPaymentAmount: number;
  nextPaymentDate: string;
  debtFreeDate: string;
  percentagePaid: number;
}

export const DebtStats = ({ 
  totalDebt, 
  nextPaymentAmount, 
  nextPaymentDate,
  debtFreeDate,
  percentagePaid 
}: DebtStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Debt</p>
              <h2 className="text-3xl font-bold">${totalDebt.toLocaleString()}</h2>
            </div>
            <DollarSign className="h-5 w-5 text-primary" />
          </div>
          <div className="w-full bg-secondary h-2 rounded-full">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: `${percentagePaid}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {percentagePaid.toFixed(1)}% paid off
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Debt Free Date</p>
              <h2 className="text-3xl font-bold">{debtFreeDate}</h2>
            </div>
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">
            Based on current payments
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Next Payment</p>
              <h2 className="text-3xl font-bold">${nextPaymentAmount.toLocaleString()}</h2>
            </div>
            <CreditCard className="h-5 w-5 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">
            Due {nextPaymentDate}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};