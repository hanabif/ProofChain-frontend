import { useQuery } from "@tanstack/react-query";
import { getAssets } from "../../services/assetService";

export const useAssets = () => {
  return useQuery({
    queryKey: ["assets"],
    queryFn: getAssets,
  });
};
