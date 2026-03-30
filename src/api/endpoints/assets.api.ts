import { api, publicApi } from '../client';
import type { License } from '../../types/license';

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface LicenseSearchParams {
  q?: string;
  min_price?: number;
  max_price?: number;
  sort?: string;
  type?: string;
  page?: number;
  page_size?: number;
}

export const uploadAssetAndLicense = (formData: FormData): Promise<any> => {
  return api.post('/api/assets/upload', formData).then((res) => res.data);
};

export const getMyLicenses = (page = 1, pageSize = 5): Promise<PaginatedResponse<License>> => {
  return api.get<PaginatedResponse<License>>('/api/assets/licenses/me', {
    params: { page, page_size: pageSize },
  }).then((res) => res.data);
};

export const uploadAssetsToLicense = (id: string, formData: FormData): Promise<any> => {
  return api.post(`/api/assets/licenses/${id}/upload-assets`, formData).then((res) => res.data);
};

export const verifyAsset = (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/api/assets/verify', formData).then((res) => res.data);
};

export const getLicenseById = (id: string): Promise<License> => {
  return publicApi.get<License>(`/api/assets/licenses/${id}`).then((res) => res.data);
};

export const updateLicense = (id: string, data: Partial<License>): Promise<License> => {
  return api.patch<License>(`/api/assets/licenses/${id}`, data).then((res) => res.data);
};

export const searchLicenses = (params: LicenseSearchParams): Promise<PaginatedResponse<License>> => {
  return publicApi.get<PaginatedResponse<License>>('/api/assets/licenses/search', {
    params,
  }).then((res) => res.data);
};
