import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";

interface DebtFormProps {
  formData: {
    name: string;
    amount: string;
    interestRate: string;
    startDate: string;
    endDate: string;
    paymentFrequency: string;
  };
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export const DebtForm = ({ formData, setFormData, onSubmit, loading }: DebtFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-3 px-1">
      <div className="space-y-1">
        <Label>Debt Name</Label>
        <Input
          value={formData.name}
          onChange={(e) => { 
            const value = e.target.value;
            setFormData({ ...formData, name: value.charAt(0).toUpperCase() + value.slice(1), }); 
          }}
          placeholder="Enter Debt name"
          required
        />
      </div>
      <div className="space-y-1">
        <Label>Amount</Label>
        <Input
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          placeholder="Enter Amount"
          required
        />
      </div>
      <div className="space-y-1">
        <Label>Interest Rate (%)</Label>
        <Input
          type="number"
          value={formData.interestRate}
          onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
          placeholder="Enter Interest Rate"
          required
        />
      </div>
      <div className="space-y-1">
        <Label>First Payment Date</Label>
        <Input
          type="date"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          required
        />
      </div>
      <div className="space-y-1">
        <Label>Loan End Date</Label>
        <Input
          type="date"
          value={formData.endDate}
          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          required
        />
      </div>
      <div className="space-y-1">
        <Label>Payment Frequency</Label>
        <Select
          value={formData.paymentFrequency}
          onValueChange={(value) => setFormData({ ...formData, paymentFrequency: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="half-yearly">Half Yearly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="pt-2">
        <Button variant="primary" type="submit" className="w-full" disabled={loading}>
          {loading ? "Adding..." : "Add Debt"}
        </Button>
      </div>
      
    </form>
  );
};