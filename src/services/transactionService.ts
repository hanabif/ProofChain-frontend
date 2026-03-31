import { api } from "../api/client";
import type { Transaction } from "../types/transaction";

export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await api.get<any>("/api/transactions/purchase");
    // Map backend Purchase model to frontend Transaction type
    // Note: Adjusting based on standard DRF pagination or list results
    const results = Array.isArray(response.data)
      ? response.data
      : response.data.results || [];

    return results.map((p: any) => ({
      id: p.id,
      requestId: p.license, // Using license ID as a fallback for requestId if not directly linked
      amount: parseFloat(p.price_paid),
      status: "success", // Purchases in DB are generally successful
      createdAt: p.created_at,
      buyer: p.buyer,
      seller: p.seller,
      type: p.purchase_type,
    }));
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    return [];
  }
};

export const createTransaction = async (
  requestId: string,
  amount: number,
): Promise<Transaction> => {
  // Creating a "Purchase" directly is usually done via request approval on the backend,
  // but if needed via API:
  const response = await api.post<any>("/api/transactions/purchase", {
    request_id: requestId,
    amount: amount,
  });

  return {
    id: response.data.id,
    requestId: response.data.license,
    amount: parseFloat(response.data.price_paid),
    status: "success",
    createdAt: response.data.created_at,
  };
};
