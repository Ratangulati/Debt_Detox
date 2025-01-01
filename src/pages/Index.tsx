import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CreditCard, Building, ArrowLeft } from "lucide-react";
import { differenceInDays } from "date-fns";
import { DashboardStats } from "../components/dashboard/DashboardStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { AchievementList } from "../components/dashboard/AchievementsList";
import { toast } from "../components/ui/use-toast";
import { BarChart, Calculator, DollarSign, Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

type Debt = {
  id: string;
  name: string;
  amount: number;
  totalAmount: number;
  dueDate: string;
  interestRate: number;
  next_payment_date: string;
  next_payment_amount: number;
};

const DemoDashboard = () => {
  const debts: Debt[] = [
    {
      id: "1",
      name: "Credit Card A",
      amount: 5000,
      totalAmount: 10000,
      dueDate: "2025-05-15",
      interestRate: 15.99,
      next_payment_date: "2025-03-01",
      next_payment_amount: 945,
    },
    {
      id: "2",
      name: "Personal Loan",
      amount: 15000,
      totalAmount: 25000,
      dueDate: "2028-05-20",
      interestRate: 8.5,
      next_payment_date: "2025-04-10",
      next_payment_amount: 545,
    },
    {
      id: "3",
      name: "Student Loan",
      amount: 30000,
      totalAmount: 50000,
      dueDate: "2026-05-25",
      interestRate: 4.5,
      next_payment_date: "2025-06-01",
      next_payment_amount: 1045,
    },
  ];

  const sortedDebts = debts.sort((a, b) => a.amount - b.amount);
  const navigate = useNavigate();

  const handleToast = () => {
    toast({
      title: "User not logged in!",
      description: "Sign in to unlock this feature.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded">
          <p className="font-medium">This is a demo dashboard. Sign in to unlock full features.</p>
        </div>

        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Debt Detox</h1>
          </div>
          <div>
            <Button variant="primary" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
        </header>

        <DashboardStats
          totalDebt={debts.reduce((acc, debt) => acc + debt.amount, 0)}
          nextPaymentAmount={debts[0]?.next_payment_amount || 0}
          nextPaymentDate={debts[0]?.next_payment_date || "N/A"}
          paidOffDebts={debts.filter((d) => d.amount === 0).length}
          debts={debts}
        />

        <Tabs defaultValue="debts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="debts">Debts</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="debts" className="space-y-4">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Debt Prioritization</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {sortedDebts
                    .filter((debt) => debt.amount > 0)
                    .map((debt) => {
                      const daysUntilPayment = debt.dueDate
                        ? differenceInDays(new Date(debt.dueDate), new Date())
                        : null;

                      return (
                        <li key={debt.id} className="flex items-center space-x-4">
                          <div className="bg-secondary rounded-full p-2">
                            {debt.name.toLowerCase().includes("credit") ? (
                              <CreditCard className="h-4 w-4" />
                            ) : (
                              <Building className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{debt.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Due: {debt.dueDate ? new Date(debt.dueDate).toLocaleDateString() : "N/A"}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              ${debt.amount.toLocaleString()}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-red-500 mb-1">
                              {debt.interestRate}% APR
                            </div>
                            <Button variant="primary" onClick={handleToast} >Pay</Button>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>
                  Upcoming Payments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {debts.map((debt) => {
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
                          Due: {debt.next_payment_date ? new Date(debt.next_payment_date).toLocaleDateString() : "N/A"}
                        </div>
                        <p className="text-sm text-muted-foreground">${debt.next_payment_amount?.toLocaleString()}</p>
                      </div>
                      <div className="text-right items-center gap-4">
                        <Button variant="primary" onClick={handleToast} >Pay Now</Button>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <AchievementList debts={debts} />
          </TabsContent>
        </Tabs>

        <div className="fixed bottom-4 left-0 right-0 z-50">
          <div className="container max-w-screen-xl mx-auto">
            <div className="grid grid-cols-4 gap-6 mt-6">
              <button
                className="flex items-center justify-center bg-black text-white hover:bg-black/80 rounded-lg p-3 shadow hover:shadow-md transition-all duration-200 space-x-2 w-full h-12"
                onClick={handleToast}
              >
                <DollarSign className="h-4 w-4" />
                <span className="text-sm font-medium">Make a Payment</span>
              </button>

              <button
                className="flex items-center justify-center bg-card text-black hover:bg-accent rounded-lg p-3 shadow hover:shadow-md transition-all duration-200 space-x-2 w-full h-12"
                onClick={handleToast}
              >
                <Calculator className="h-4 w-4" />
                <span className="text-sm font-medium">Debt Calculator</span>
              </button>

              <button
                className="flex items-center justify-center bg-card text-black hover:bg-accent rounded-lg p-3 shadow hover:shadow-md transition-all duration-200 space-x-2 w-full h-12"
                onClick={handleToast}
              >
                <BarChart className="h-4 w-4" />
                <span className="text-sm font-medium">Payment Simulator</span>
              </button>

              <button
                className="flex items-center justify-center bg-card text-black hover:bg-accent rounded-lg p-3 shadow hover:shadow-md transition-all duration-200 space-x-2 w-full h-12"
                onClick={handleToast}
              >
                <Plus className="h-4 w-4" />
                <span className="text-sm font-medium">Add Debt</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoDashboard;
