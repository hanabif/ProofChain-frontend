import { useQuery } from "@tanstack/react-query";
import { getAssetById } from "../../services/assetService";

export const useAsset = (id: string | undefined) => {
  return useQuery({
    queryKey: ["assets", id],
    queryFn: () => getAssetById(id!),
    enabled: !!id,
  });
};
