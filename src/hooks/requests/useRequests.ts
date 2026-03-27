import { useQuery } from "@tanstack/react-query";
import { getRequests } from "../../services/requestService";

export const useRequests = () => {
  return useQuery({
    queryKey: ["requests"],
    queryFn: getRequests,
  });
};
