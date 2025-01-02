import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";
import { supabase } from "../integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { getNextPaymentDate } from "../utils/dateUtils";

interface PaymentDialogProps {
  debtId: string;
  debtName: string;
  currentAmount: number;
  buttonText?: string;
}

export const PaymentDialog = ({
  debtId,
  debtName,
  currentAmount,
  buttonText = "Make Payment",
}: PaymentDialogProps) => {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(currentAmount.toString());
  const { toast } = useToast();
  const queryClient = useQueryClient();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const paymentAmount = parseFloat(amount);

      // Get the debt details to determine payment frequency
      const { data: debtData } = await supabase
        .from("debts")
        .select("*")
        .eq("id", debtId)
        .single();

      if (!debtData) throw new Error("Debt not found");

      // Calculate the next payment date based on frequency
      const nextPaymentDate = getNextPaymentDate(
        new Date(),
        debtData.payment_frequency,
        debtData.next_payment_date ?? new Date().toISOString() 
      );

      // Update the debt with new amount and next payment date
      const { error: debtError } = await supabase
        .from("debts")
        .update({
          amount: Math.max(0, debtData.amount - paymentAmount),
          next_payment_date: nextPaymentDate.toISOString().split('T')[0]
        })
        .eq("id", debtId);

      if (debtError) throw debtError;

      // Record the payment in payment history
      const { error: paymentError } = await supabase
        .from("payment_history")
        .insert({
          debt_id: debtId,
          user_id: user.id,
          amount: paymentAmount,
          payment_date: new Date().toISOString()
        });

      if (paymentError) throw paymentError;

      toast({
        title: "Success",
        description: `Payment of $${paymentAmount} made successfully`,
      });

      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["debts"] });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary" size="sm">
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Make Payment - {debtName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="amount">Payment Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              max={currentAmount}
              required
            />
            <p className="text-sm text-muted-foreground pt-2">
              Outstanding balance: ${currentAmount.toLocaleString()}
            </p>
          </div>
          <Button variant="primary" type="submit" className="w-full" disabled={loading}>
            {loading ? "Processing..." : "Submit Payment"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};