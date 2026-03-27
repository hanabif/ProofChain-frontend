import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLicense } from "../../services/licenseService";
import type { License } from "../../types/license";

export const useUpdateLicense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<License> }) =>
      updateLicense(id, updates),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["licenses"] });
      queryClient.invalidateQueries({ queryKey: ["licenses", id] });
    },
  });
};
