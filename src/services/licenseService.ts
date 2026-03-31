import { api, publicApi } from "../api/client";
import type { License } from "../types/license";

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const getLicenses = async (): Promise<License[]> => {
  try {
    const response = await api.get<PaginatedResponse<License>>('/api/assets/licenses/me');
    return response.data.results;
  } catch (error) {
    console.error('Failed to fetch my licenses:', error);
    return [];
  }
};

export const createLicense = async (license: Omit<License, "id" | "assetCount" | "requestCount">): Promise<License> => {
  // Direct creation not used in this specific flow, but kept for interface completeness
  const response = await api.post<License>('/api/assets/licenses', license);
  return response.data;
};

export const updateLicense = async (id: string, updates: Partial<License>): Promise<License> => {
  const response = await api.patch<License>(`/api/assets/licenses/${id}`, updates);
  return response.data;
};

export const getLicenseById = async (id: string): Promise<License> => {
  const response = await publicApi.get<License>(`/api/assets/licenses/${id}`);
  return response.data;
};
