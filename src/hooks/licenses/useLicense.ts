import { useQuery } from "@tanstack/react-query";
import { getLicenseById } from "../../services/licenseService";

export const useLicense = (id: string | undefined) => {
  return useQuery({
    queryKey: ["licenses", id],
    queryFn: () => getLicenseById(id!),
    enabled: !!id,
  });
};
