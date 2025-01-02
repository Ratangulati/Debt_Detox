export interface Debt {
    id: string;
    name: string;
    amount: number;
    total_amount: number;
    payment_frequency: string;
    interest_rate: number;
    next_payment_date: string;
    next_payment_amount: number;
    due_date?: string;
  }