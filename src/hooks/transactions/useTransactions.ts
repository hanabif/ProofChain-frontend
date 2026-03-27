import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTransactions, createTransaction } from "../../services/transactionService";

export const useTransactions = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ requestId, amount }: { requestId: string; amount: number }) => 
      createTransaction(requestId, amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
  });
};
