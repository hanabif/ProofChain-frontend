import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveRequest, declineRequest } from "../../services/requestService";

export const useApproveRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => approveRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
  });
};

export const useDeclineRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => declineRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
  });
};
