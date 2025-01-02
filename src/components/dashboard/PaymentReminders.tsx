import { Bell } from "lucide-react";
import { sortDebtsByNextPayment } from "../../utils/dateUtils";
import { PaymentDialog } from "../PaymentDialog";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Debt } from "./types";


interface PaymentRemindersProps {
  debts: Debt[];
}

export const PaymentReminders = ({ debts }: PaymentRemindersProps) => {

  // Filter out paid debts and sort by next payment date
  const activeDebts = sortDebtsByNextPayment(
    debts.filter(debt => debt.amount > 0)
  );
  
  if (activeDebts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Upcoming Payments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            No active debts to display
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Payments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeDebts.map((debt) => (
          <div key={debt.id} className="flex items-center space-x-4">
            <div className="flex-1">
              <p className="font-medium">{debt.name}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                Due:{" "}
                {debt.next_payment_date
                  ? new Date(debt.next_payment_date).toLocaleDateString()
                  : "N/A"}
                {/* <span className="ml-2">{debt.payment_frequency}</span> */}
              </div>
              <p className="text-sm text-muted-foreground">
                ${debt.next_payment_amount?.toLocaleString()}
              </p>
            </div>
            <div className="text-right items-center gap-4">
              <PaymentDialog
                debtId={debt.id}
                debtName={debt.name}
                currentAmount={debt.next_payment_amount}
                buttonText="Pay Now"
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};