import { useQuery } from "@tanstack/react-query";
import { getLicenseById } from "../../api/endpoints/assets.api.ts";

export const useLicense = (id: string | undefined) => {
  return useQuery({
    queryKey: ["license", id],
    queryFn: () => getLicenseById(id!),
    enabled: !!id,
  });
};
