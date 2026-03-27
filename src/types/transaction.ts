export type TransactionStatus = "success" | "failed";

export interface Transaction {
  id: string;
  requestId: string;
  amount: number;
  status: TransactionStatus;
  createdAt: string;
}
