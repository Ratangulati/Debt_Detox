import { CreditCard, Building, ArrowLeft, LucideIcon } from "lucide-react";
import { DashboardStats } from "../components/dashboard/DashboardStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { AchievementList } from "../components/dashboard/AchievementsList";
import { toast } from "../components/ui/use-toast";
import { BarChart, Calculator, DollarSign, Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Debt } from "../components/dashboard/types";

type QuickActionButtonProps = {
  icon: LucideIcon; 
  label: string;
  onClick?: () => void; 
  colorClass: string;
};

const QuickActionButton = ({ icon: Icon, label, onClick, colorClass }: QuickActionButtonProps) => (
  <button 
    className={`flex sm:items-center justify-center ${colorClass} hover:bg-accent rounded-lg shadow hover:shadow-md transition-all duration-200 w-full
    sm:h-12 sm:p-3 sm:space-x-2
    flex-col items-center min-h-[4rem] p-2 space-y-1 sm:flex-row sm:space-y-0`}
    onClick={onClick}
  >
    <Icon className="h-5 w-5 sm:h-4 sm:w-4" />
    <span className="text-[10px] sm:text-sm font-medium text-center sm:text-left max-w-full sm:max-w-none line-clamp-2 sm:line-clamp-none">
      {label}
    </span>
  </button>
);


const DemoDashboard = () => {
  const debts: Debt[] = [
    {
      id: "1",
      name: "Credit Card A",
      amount: 5000,
      total_amount: 10000,
      due_date: "2025-05-15",
      interest_rate: 15.99,
      next_payment_date: "2025-03-01", 
      next_payment_amount: 945, 
      payment_frequency: "Monthly",
    },
    {
      id: "2",
      name: "Personal Loan",
      amount: 15000,
      total_amount: 25000,
      due_date: "2028-05-20",
      interest_rate: 8.5,
      next_payment_date: "2025-04-10", 
      next_payment_amount: 545, 
      payment_frequency: "Monthly",
    },
    {
      id: "3",
      name: "Student Loan",
      amount: 30000,
      total_amount: 50000,
      due_date: "2026-05-25",
      interest_rate: 4.5,
      next_payment_date: "2025-06-01", 
      next_payment_amount: 1045, 
      payment_frequency: "Monthly",
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
                    .map((debt) => (
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
                            Due: {debt.due_date}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ${debt.amount.toLocaleString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-red-500 mb-1">
                            {debt.interest_rate}% APR
                          </div>
                          <Button variant="primary" onClick={handleToast}>
                            Pay
                          </Button>
                        </div>
                      </li>
                    ))}
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
                {debts.map((debt) => (
                  <div key={debt.id} className="flex items-center space-x-4">
                    <div className="flex-1">
                      <p className="font-medium">{debt.name}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        Due: {debt.next_payment_date}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        ${debt.next_payment_amount.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right items-center gap-4">
                      <Button variant="primary" onClick={handleToast}>
                        Pay Now
                      </Button>
                    </div>
                  </div>
                ))}
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
              <QuickActionButton 
                icon={DollarSign} 
                label="Make a Payment" 
                colorClass="bg-black text-white hover:bg-black/80"
                onClick={handleToast}
              />

              <QuickActionButton 
                icon={Calculator} 
                label="Debt Calculator" 
                colorClass="bg-card"
                onClick={handleToast}
              />

              <QuickActionButton 
                icon={BarChart} 
                label="Payment Simulator" 
                colorClass="bg-card"
                onClick={handleToast}
              />

              <QuickActionButton 
              icon={Plus} 
              label="Add Debt"
              colorClass="bg-card" 
              onClick={handleToast}
            />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoDashboard;
