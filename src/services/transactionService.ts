import { delay } from "./api";
import type { Transaction } from "../types/transaction";
import { mockTransactions } from "../mocks/transactions";

let transactions = [...mockTransactions];

export const getTransactions = async (): Promise<Transaction[]> => {
  await delay(800);
  return transactions;
};

export const createTransaction = async (requestId: string, amount: number): Promise<Transaction> => {
  await delay(1500);
  const newTransaction: Transaction = {
    id: `t${transactions.length + 1}`,
    requestId,
    amount,
    status: "success",
    createdAt: new Date().toISOString(),
  };
  transactions = [...transactions, newTransaction];
  return newTransaction;
};
