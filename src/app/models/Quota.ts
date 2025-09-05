export default interface Quota
{
  id: string;
  number: number;
  type: string;
  amount: number;
  amountPaid: number;
  amountLate: number;
  balance: number;
  dueDate: Date;
  paid: boolean;
}