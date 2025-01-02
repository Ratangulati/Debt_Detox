import { Card, CardContent } from "./ui/card";

interface PaymentScheduleProps {
  periodicPayment: number;
  totalPayments: number;
  totalCost: number;
  nextPaymentDate: string | null ;
}

export const PaymentScheduleDisplay = ({
  periodicPayment,
  totalPayments,
  totalCost,
  nextPaymentDate,
}: PaymentScheduleProps) => {

  return (
    <Card className="mt-6">
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-6">Payment Schedule</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Periodic Payment</p>
              <p className="text-2xl font-bold">${periodicPayment}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Next Payment Date</p>
              <p className="text-2xl font-bold">{nextPaymentDate}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Payments</p>
              <p className="text-2xl font-bold">{totalPayments}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Cost</p>
              <p className="text-2xl font-bold">${totalCost}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};