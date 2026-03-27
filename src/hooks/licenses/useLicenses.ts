import { useQuery } from "@tanstack/react-query";
import { getLicenses } from "../../services/licenseService";

export const useLicenses = () => {
  return useQuery({
    queryKey: ["licenses"],
    queryFn: getLicenses,
  });
};
