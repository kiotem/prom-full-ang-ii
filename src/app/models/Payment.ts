export default interface Payment {
  objectId: string;
  saleId: string;
  amount: number;
  paymentMethd: string;
  transactionId: string;
  verified: boolean;
  liquidated: boolean;
  createdAt: Date;
  updatedAt: Date;
  status: 'pending' | 'completed' | 'failed';
}