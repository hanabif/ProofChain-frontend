import { useQuery } from '@tanstack/react-query';
import { searchLicenses, type LicenseSearchParams } from '../../api/endpoints/assets.api';

export const useLicenseSearch = (params: LicenseSearchParams) => {
  // Clean empty params to prevent backend issues with empty strings
  const cleanedParams = Object.entries(params).reduce((acc, [key, value]) => {
    if (value !== '' && value !== undefined && value !== null) {
      acc[key as keyof LicenseSearchParams] = value as any;
    }
    return acc;
  }, {} as LicenseSearchParams);

  return useQuery({
    queryKey: ['licenses', 'search', cleanedParams],
    queryFn: () => searchLicenses(cleanedParams),
  });
};
