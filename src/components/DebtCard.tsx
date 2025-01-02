import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { PaymentDialog } from "./PaymentDialog";

export interface DebtCardProps {
  id: string;
  name: string;
  amount: number;
  totalAmount: number;
  dueDate: string;
  interestRate: number;
}

export const DebtCard = ({
  id,
  name = 'Unnamed Debt',
  amount = 0,
  totalAmount = 0,
  dueDate,
  interestRate = 0,
}: DebtCardProps) => {
  const formattedDueDate = dueDate ? new Date(dueDate).toLocaleDateString() : 'No date set';
  const amountPaid = totalAmount - amount;
  const progress = totalAmount > 0 ? (amountPaid / totalAmount) * 100 : 0;
  
  // Calculate monthly interest
  const monthlyInterest = (amount * (interestRate / 100)) / 12;

  // If debt is fully paid, don't render the card
  if (amount <= 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
        <PaymentDialog debtId={id} debtName={name} currentAmount={amount} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          ${(amount || 0).toLocaleString()}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground">
            Total: ${(totalAmount || 0).toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">
            Paid: ${amountPaid.toLocaleString()}
          </p>
        </div>
        <div className="mt-4 h-2 w-full bg-gray-200 rounded-full">
          <div
            className="h-full bg-primary rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Due Date</p>
            <p className="font-medium">{formattedDueDate}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Interest Rate</p>
            <p className="font-medium">{interestRate || 0}%</p>
          </div>
        </div>
        <div className="mt-2 text-sm">
          <p className="text-muted-foreground">Monthly Interest</p>
          <p className="font-medium">${monthlyInterest.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  );
};