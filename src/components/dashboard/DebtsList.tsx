import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Building, DollarSign } from "lucide-react";
import { PaymentDialog } from "../PaymentDialog";
import { differenceInDays } from "date-fns";
interface Debt {
  id: string;
  name: string;
  amount: number;
  next_payment_date: string;
  next_payment_amount: number;
  payment_frequency: string;
  interest_rate: number;
}
interface DebtsListProps {
  debts: Debt[];
}
export const DebtsList = ({ debts }: DebtsListProps) => {
  const sortedDebts = [...debts].sort((a, b) => {
    if (!a.next_payment_date) return 1;
    if (!b.next_payment_date) return -1;
    return new Date(a.next_payment_date).getTime() - new Date(b.next_payment_date).getTime();
  });


  console.log("debtlist",debts)
  return (
    <Card>
      <CardHeader>
        <CardTitle>
            Debt Priortization
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {sortedDebts.filter(debt => debt.amount > 0).map((debt) => {
            const daysUntilPayment = debt.next_payment_date
              ? differenceInDays(new Date(debt.next_payment_date), new Date())
              : null;
            return (
              <li key={debt.id} className="flex items-center space-x-4">
                <div className="bg-secondary rounded-full p-2">
                  {debt.name.toLowerCase().includes("credit") ? (
                    <CreditCard className="h-4 w-4" />
                  ) : (
                    <Building className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{debt.name}</div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      Due: {debt.due_date ? new Date(debt.due_date).toLocaleDateString() : "N/A"}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ${debt.amount.toLocaleString()}
                    </div>
                    {/* <span className="ml-2">({debt.payment_frequency})</span> */}
                    {/* {daysUntilPayment !== null && (
                      <span className="ml-2">
                        {daysUntilPayment === 0
                          ? "Due today!"
                          : daysUntilPayment < 0
                          ? `Overdue by ${Math.abs(daysUntilPayment)} days`
                          : `Due in ${daysUntilPayment} days`}
                      </span>
                    )} */}
                </div>
                <div className="text-right">
                  <div className="font-medium text-red-500 mb-1">{debt.interest_rate}% APR</div>
                  <PaymentDialog
                    debtId={debt.id}
                    debtName={debt.name}
                    currentAmount={debt.amount}
                    buttonText="Pay"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};