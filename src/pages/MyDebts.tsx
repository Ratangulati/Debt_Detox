import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const MyDebts = () => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [expandedPayments, setExpandedPayments] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  
  const { data: debts = [], isLoading } = useQuery({
    queryKey: ["all-debts", sortOrder],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("debts")
        .select(`
          *,
          payment_history (
            amount,
            payment_date
          )
        `)
        .order("due_date", { ascending: sortOrder === "asc" });

      if (error) throw error;
      const sortedData = data || [];
      return sortedData.sort((a, b) => {
        const aIsPaid = a.amount === 0;
        const bIsPaid = b.amount === 0;
        if (aIsPaid !== bIsPaid) return aIsPaid ? 1 : -1;
        return sortOrder === "asc" 
          ? new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
          : new Date(b.due_date).getTime() - new Date(a.due_date).getTime();
      });
    },
  });

  const togglePaymentHistory = (debtId: string) => {
    setExpandedPayments(prev => ({
      ...prev,
      [debtId]: !prev[debtId]
    }));
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">My Debts</h1>
          <div className="mt-2 text-muted-foreground">
            <p>Active Debts: {debts.filter(d => d.amount > 0).length}</p>
            <p>Paid Off: {debts.filter(d => d.amount === 0).length}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            <ArrowUpDown className="h-4 w-4 mr-2" />
            Sort by Due Date
          </Button>
          <Button variant="primary" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {debts.map((debt) => (
          <Card 
            key={debt.id} 
            className={`hover:shadow-lg transition-shadow ${debt.amount === 0 ? 'opacity-75' : ''}`}
          >
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{debt.name}</CardTitle>
              {debt.amount === 0 && <Badge className="bg-black text-white hover:bg-secondary hover:text-black">Paid</Badge>}
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Original Amount</span>
                  <span className="font-medium">${debt.total_amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Current Amount</span>
                  <span className="font-medium">${debt.amount.toFixed(2)}</span>
                </div>
                {debt.interest_rate && (
                  <div className="flex justify-between">
                    <span>Interest Rate</span>
                    <span className="font-medium">{debt.interest_rate}%</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Due Date</span>
                  <span className="font-medium">{new Date(debt.due_date).toLocaleDateString()}</span>
                </div>
                {/* <div className="flex justify-between">
                  <span>First Payment Date</span>
                  <span className="font-medium">
                    {debt.payment_history && debt.payment_history.length > 0
                      ? new Date(debt.payment_history[debt.payment_history.length - 1].payment_date).toLocaleDateString()
                      : 'No payments yet'}
                  </span>
                </div> */}
                
                {debt.payment_history && debt.payment_history.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Payment History</h4>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => togglePaymentHistory(debt.id)}
                      >
                        {expandedPayments[debt.id] ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {debt.payment_history
                        .slice(0, expandedPayments[debt.id] ? undefined : 3)
                        .map((payment: any, index: number) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{new Date(payment.payment_date).toLocaleDateString()}</span>
                            <span className="text-green-600 dark:text-green-400">
                              ${payment.amount.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      {!expandedPayments[debt.id] && debt.payment_history.length > 3 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full text-muted-foreground"
                          onClick={() => togglePaymentHistory(debt.id)}
                        >
                          Show {debt.payment_history.length - 3} more payments
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyDebts;