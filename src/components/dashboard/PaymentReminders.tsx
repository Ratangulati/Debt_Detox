import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Calendar, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { sortDebtsByNextPayment } from "../../utils/dateUtils";
import { PaymentDialog } from "../PaymentDialog";
import { differenceInDays } from "date-fns";


interface Debt {
  id: string;
  name: string;
  amount: number;
  next_payment_date: string;
  next_payment_amount: number;
  payment_frequency: string;
}

interface PaymentRemindersProps {
  debts: Debt[];
}

export const PaymentReminders = ({ debts }: PaymentRemindersProps) => {
  const { toast } = useToast();

  // Filter out paid debts and sort by next payment date
  const activeDebts = sortDebtsByNextPayment(
    debts.filter(debt => debt.amount > 0)
  );

  const handleAddToCalendar = (debt: Debt) => {
    toast({
      title: "Coming Soon",
      description: "Calendar integration will be available in the next update!",
    });
  };

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
        <CardTitle>
          Upcoming Payments
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeDebts.map((debt) => {
          const daysUntilPayment = debt.next_payment_date
            ? differenceInDays(new Date(debt.next_payment_date), new Date())
            : null;
          return (
            <div
              key={debt.id}
              className="flex items-center space-x-4"
            >
              <div className="flex-1">
                <p className="font-medium">{debt.name}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  {/* <Calendar className="h-4 w-4 mr-1" /> */}
                  Due: {debt.next_payment_date ? new Date(debt.next_payment_date).toLocaleDateString() : "N/A"}
                  {/* <span className="ml-2">{debt.payment_frequency}</span> */}
                </div>
                <p className="text-sm text-muted-foreground">${debt.next_payment_amount?.toLocaleString()}</p>
              </div>
              <div className="text-right items-center gap-4">
                {/* <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddToCalendar(debt)}
                >
                  <Calendar className="h-4 w-4" />
                </Button> */}
                <PaymentDialog
                  debtId={debt.id}
                  debtName={debt.name}
                  currentAmount={debt.next_payment_amount}
                  buttonText="Pay Now"
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};