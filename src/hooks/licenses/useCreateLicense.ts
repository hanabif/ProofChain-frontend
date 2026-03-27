import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLicense } from "../../services/licenseService";

export const useCreateLicense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLicense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["licenses"] });
    },
  });
};
