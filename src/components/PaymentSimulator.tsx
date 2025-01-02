import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";

type SimulationResults = {
  months: number;
  totalInterestPaid: number;
  totalPaid: number;
  willPayOff: boolean;
};


export const PaymentSimulator = () => {
  const [currentDebt, setCurrentDebt] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [results, setResults] = useState<SimulationResults | null>(null);

  const runSimulation = () => {
    let remainingDebt = currentDebt;
    let months = 0;
    let totalInterestPaid = 0;
    let timeline = [];
    const monthlyInterestRate = interestRate / 100 / 12;

    while (remainingDebt > 0 && months < 360) { 
      months++;
      const interestThisMonth = remainingDebt * monthlyInterestRate;
      const principalThisMonth = Math.min(monthlyPayment - interestThisMonth, remainingDebt);
      
      totalInterestPaid += interestThisMonth;
      remainingDebt -= principalThisMonth;

      timeline.push({
        month: months,
        remainingDebt: Math.max(remainingDebt, 0),
        totalInterest: totalInterestPaid,
        payment: monthlyPayment,
        interestPaid: interestThisMonth,
        principalPaid: principalThisMonth
      });
    }

    setResults({
      months,
      totalInterestPaid,
      totalPaid: totalInterestPaid + (currentDebt - remainingDebt),
      willPayOff: remainingDebt <= 0
    });
  };

  return (
    <div className="h-[calc(100vh-8rem)]">
      <ScrollArea className="h-full w-full p-4">
        <div className="space-y-6 p-2 pt-0">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Current Debt Balance ($)</Label>
              <Input
                type="number"
                value={currentDebt}
                onChange={(e) => setCurrentDebt(Number(e.target.value))}
                placeholder="Enter current debt amount"
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
              <Label>Monthly Payment ($)</Label>
              <Input
                type="number"
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                placeholder="Enter monthly payment"
              />
            </div>

            <Button variant="primary" onClick={runSimulation} className="w-full">
              Run Simulation
            </Button>
          </div>

          {results && (
            <Card>
              <CardHeader>
                <CardTitle>Simulation Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {results.willPayOff ? (
                  <>
                    <p className="text-green-600 font-semibold">
                      Debt will be paid off in {results.months} months ({(results.months / 12).toFixed(1)} years)
                    </p>
                    <div className="space-y-2">
                      <p className="flex justify-between">
                        <span>Original Debt:</span>
                        <span className="font-semibold">${currentDebt.toFixed(2)}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Total Interest:</span>
                        <span className="font-semibold">${results.totalInterestPaid.toFixed(2)}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Total Amount Paid:</span>
                        <span className="font-semibold">${results.totalPaid.toFixed(2)}</span>
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="text-red-600 font-semibold">
                    Monthly payment is too low to pay off the debt. Interest charges exceed payment amount.
                  </p>
                )}
              </CardContent>
            </Card>
          )}

        </div>
      </ScrollArea>
    </div>
  );
};

export default PaymentSimulator;