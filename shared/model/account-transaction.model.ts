export interface AccountTransaction {
  confirmedDate: Date;
  orderId: string;
  orderCode: string;
  transactionType: string;
  debit: number;
  credit: number;
  balance: number;
}