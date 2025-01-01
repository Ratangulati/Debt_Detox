export const calculatePayment = (principal: number, annualRate: number, startDate: string, endDate: string, frequency: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const yearsDiff = end.getFullYear() - start.getFullYear();
  const monthsDiff = end.getMonth() - start.getMonth();
  const totalYears = yearsDiff + (monthsDiff / 12);

  const periodsPerYear = {
    monthly: 12,
    quarterly: 4,
    'half-yearly': 2,
    yearly: 1
  };

  const updateDebtNextPayment = async (debtId: string, paymentDate: string, paymentFrequency: string) => {
    const nextPaymentDate = calculateNextPaymentDate(paymentDate, paymentFrequency);
  
    const { data, error } = await supabase
      .from('debts')
      .update({ next_payment_date: nextPaymentDate })
      .eq('id', debtId);
  
    if (error) {
      console.error('Error updating next payment date:', error);
    }
  
    return data;
  };

  const periods = periodsPerYear[frequency as keyof typeof periodsPerYear];
  const periodicRate = (annualRate / 100) / periods;
  const totalPeriods = Math.ceil(totalYears * periods);
  
  const payment = principal * 
    (periodicRate * Math.pow(1 + periodicRate, totalPeriods)) / 
    (Math.pow(1 + periodicRate, totalPeriods) - 1);

  const totalCost = payment * totalPeriods;
    
  return {
    periodicPayment: Math.round(payment * 100) / 100,
    totalPayments: totalPeriods,
    totalCost: Math.round(totalCost * 100) / 100,
    nextPaymentDate: new Date(startDate).toLocaleDateString()
  };
};