import { addMonths, addYears } from "date-fns";

export const getNextPaymentDate = (
  currentDate: Date,
  frequency: string,
  lastPaymentDate?: string
): Date => {
  const startDate = lastPaymentDate ? new Date(lastPaymentDate) : new Date(currentDate);
  
  switch (frequency) {
    case 'monthly':
      return addMonths(startDate, 1);
    case 'quarterly':
      return addMonths(startDate, 3);
    case 'half-yearly':
      return addMonths(startDate, 6);
    case 'yearly':
      return addYears(startDate, 1);
    default:
      return addMonths(startDate, 1);
  }
};

export const sortDebtsByNextPayment = (debts: any[]) => {
  return [...debts].sort((a, b) => {
    if (!a.next_payment_date) return 1;
    if (!b.next_payment_date) return -1;
    return new Date(a.next_payment_date).getTime() - new Date(b.next_payment_date).getTime();
  });
};

export const calculateTotalPaymentsByDate = (debts: any[]) => {
  const paymentsByDate: { [key: string]: number } = {};
  
  debts.forEach(debt => {
    if (debt.next_payment_date && debt.next_payment_amount) {
      const date = debt.next_payment_date;
      paymentsByDate[date] = (paymentsByDate[date] || 0) + debt.next_payment_amount;
    }
  });
  
  return paymentsByDate;
};