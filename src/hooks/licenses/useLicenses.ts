import { useQuery } from "@tanstack/react-query";
import { getMyLicenses, getLicenseById } from "../../api/endpoints/assets.api";

export const useLicenses = (page = 1, pageSize = 10) => {
  return useQuery({
    queryKey: ["licenses", page, pageSize],
    queryFn: () => getMyLicenses(page, pageSize),
    select: (data) => data.results,
  });
};

export const useLicense = (id: string | undefined) => {
  const { data: licenses } = useLicenses(1, 100);
  return licenses?.find(l => l.id === id);
};

export const useLicenseDetail = (id: string | undefined) => {
  return useQuery({
    queryKey: ["license", id],
    queryFn: () => getLicenseById(id!),
    enabled: !!id,
  });
};
