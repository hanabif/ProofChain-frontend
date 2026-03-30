import { useQuery } from '@tanstack/react-query';
import { getWalletBalance } from '../../api/endpoints/auth.api';

export const useWalletBalance = () => {
  return useQuery({
    queryKey: ['walletBalance'],
    queryFn: getWalletBalance,
  });
};
