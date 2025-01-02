import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { DebtForm } from "./DebtForm";
import { PaymentScheduleDisplay } from "./PaymentScheduleDisplay";
import { getNextPaymentDate } from "../utils/dateUtils";
import { calculatePayment } from "../utils/calculatePayment";
import { useToast } from "./ui/use-toast";
import { supabase } from "../integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

import { ReactNode } from "react";

interface AddDebtDialogProps {
  children: ReactNode; 
}

export const AddDebtDialog = ({ children }: AddDebtDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    interestRate: "",
    startDate: "",
    endDate: "",
    paymentFrequency: "monthly",
  });

  const paymentSchedule = formData.amount && formData.interestRate && formData.startDate && formData.endDate
    ? calculatePayment(
        parseFloat(formData.amount),
        parseFloat(formData.interestRate),
        formData.startDate,
        formData.endDate,
        formData.paymentFrequency
      )
    : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { periodicPayment } = calculatePayment(
        parseFloat(formData.amount),
        parseFloat(formData.interestRate),
        formData.startDate,
        formData.endDate,
        formData.paymentFrequency
      );

      const nextPaymentDate = getNextPaymentDate(
        new Date(formData.startDate),
        formData.paymentFrequency
      );

      const { error } = await supabase.from("debts").insert({
        user_id: user.id,
        name: formData.name,
        amount: parseFloat(formData.amount),
        total_amount: parseFloat(formData.amount),
        interest_rate: parseFloat(formData.interestRate),
        due_date: formData.endDate,
        payment_frequency: formData.paymentFrequency,
        next_payment_amount: periodicPayment,
        next_payment_date: nextPaymentDate.toISOString().split('T')[0]
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Debt added successfully",
      });

      setOpen(false);
      setFormData({
        name: "",
        amount: "",
        interestRate: "",
        startDate: "",
        endDate: "",
        paymentFrequency: "monthly",
      });
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
      <DialogTrigger asChild>{children}</DialogTrigger> {/* Render children */}
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="font-xl ">Add New Debt</DialogTitle>
        </DialogHeader>
        <div className="mt-2">
          <div className="space-y-4 overflow-y-auto max-h-[80vh]">
            <DebtForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </div>
          {paymentSchedule && (
            <div className="mt-6">
              <PaymentScheduleDisplay
                {...paymentSchedule}
                nextPaymentDate={getNextPaymentDate(
                  new Date(formData.startDate),
                  formData.paymentFrequency
                ).toISOString().split('T')[0]} 
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
