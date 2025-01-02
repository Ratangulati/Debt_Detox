import { Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Debt } from "./types";


interface AchievementListProps {
  debts: Debt[];
}

export const AchievementList = ({ debts }: AchievementListProps) => {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Debt Freedom Achievements</CardTitle>
        </CardHeader>
        <CardContent>
            <ul className="space-y-4">
                {debts.filter(debt => debt.amount === 0).map((debt) => (
                <li key={debt.id} className="flex items-center space-x-4 p-4 bg-secondary/10 rounded-lg">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <div className="flex-1">
                    <div className="font-medium">{debt.name} Paid Off!</div>
                    <div className="text-sm text-muted-foreground">
                        Original amount: ${debt.total_amount ? debt.total_amount.toLocaleString() : 'N/A'}
                    </div>
                    </div>
                </li>
                ))}
                {debts.filter(debt => debt.amount === 0).length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                    Keep going! Your debt freedom achievements will appear here.
                </p>
                )}
            </ul>
        </CardContent>
    </Card>
  );
};
