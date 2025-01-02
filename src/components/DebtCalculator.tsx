import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PaymentSchedule {
  month: number;
  payment: string;
  interest: string;
  principal: string;
  remaining: string | number;
}

interface ChartData {
  month: number;
  remainingBalance: number;
  totalInterest: number;
}


export const DebtCalculator = () => {
  const [principal, setPrincipal] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [loanTerm, setLoanTerm] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);
  const [paymentSchedule, setPaymentSchedule] = useState<PaymentSchedule[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  
  const calculateDebt = () => {
    const interestRateMonthly = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    const numerator = interestRateMonthly * Math.pow(1 + interestRateMonthly, numberOfPayments);
    const denominator = Math.pow(1 + interestRateMonthly, numberOfPayments) - 1;
    const monthlyPaymentAmount = principal * (numerator / denominator);

    let remainingPrincipal = principal;
    let schedule: PaymentSchedule[] = [];
    let graphData: ChartData[] = [];
    let totalInterestPaid = 0;

    for (let i = 1; i <= numberOfPayments; i++) {
      const interestPayment = remainingPrincipal * interestRateMonthly;
      const principalPayment = monthlyPaymentAmount - interestPayment;
      totalInterestPaid += interestPayment;
      remainingPrincipal -= principalPayment;

      schedule.push({
        month: i,
        payment: monthlyPaymentAmount.toFixed(2),
        interest: interestPayment.toFixed(2),
        principal: principalPayment.toFixed(2),
        remaining: remainingPrincipal > 0 ? remainingPrincipal.toFixed(2) : 0
      });

      graphData.push({
        month: i,
        remainingBalance: Number(remainingPrincipal.toFixed(2)),
        totalInterest: Number(totalInterestPaid.toFixed(2))
      });

      if (remainingPrincipal <= 0) break;
    }

    setMonthlyPayment(monthlyPaymentAmount);
    setTotalInterest(totalInterestPaid);
    setTotalPayment(monthlyPaymentAmount * numberOfPayments);
    setPaymentSchedule(schedule);
    setChartData(graphData);
  };

  return (
    <div className="h-[calc(100vh-8rem)]">
      <Tabs defaultValue="calculator" className="w-full h-full py-2">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="schedule">Amortization Schedule</TabsTrigger>
          <TabsTrigger value="chart">Chart</TabsTrigger>
        </TabsList>

        <div className="h-[calc(100%-40px)] overflow-hidden">
          <ScrollArea className="h-full w-full">
            <TabsContent value="calculator" className="mt-2 space-y-4 p-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Principal Amount ($)</Label>
                  <Input
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    placeholder="Enter principal amount"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Annual Interest Rate (%)</Label>
                  <Input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    placeholder="Enter interest rate"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Loan Term (years)</Label>
                  <Input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    placeholder="Enter loan term"
                  />
                </div>

                <Button variant="primary" onClick={calculateDebt} className="w-full">Calculate</Button>

                {monthlyPayment !== null && (
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle>Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="flex justify-between">
                        <span>Monthly Payment:</span>
                        <span className="font-semibold">${monthlyPayment.toFixed(2)}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Total Interest:</span>
                        <span className="font-semibold">${totalInterest?.toFixed(2)}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Total Payment:</span>
                        <span className="font-semibold">${totalPayment?.toFixed(2)}</span>
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="mt-4 p-4">
              {paymentSchedule.length > 0 ? (
                <div className="space-y-4">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="p-2">Month</th>
                        <th className="p-2">Payment</th>
                        <th className="p-2">Interest</th>
                        <th className="p-2">Principal</th>
                        <th className="p-2">Remaining</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentSchedule.map((payment) => (
                        <tr key={payment.month} className="border-b">
                          <td className="p-2">{payment.month}</td>
                          <td className="p-2">${payment.payment}</td>
                          <td className="p-2">${payment.interest}</td>
                          <td className="p-2">${payment.principal}</td>
                          <td className="p-2">${payment.remaining}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  Calculate debt to see payment schedule
                </div>
              )}
            </TabsContent>

            <TabsContent value="chart" className="mt-4 h-[500px] p-4">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="remainingBalance"
                      stroke="#8884d8"
                      name="Remaining Balance"
                    />
                    <Line
                      type="monotone"
                      dataKey="totalInterest"
                      stroke="#82ca9d"
                      name="Total Interest Paid"
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center text-muted-foreground">
                  Calculate debt to see visualization
                </div>
              )}
            </TabsContent>
          </ScrollArea>
        </div>
      </Tabs>
    </div>
  );
};

export default DebtCalculator;