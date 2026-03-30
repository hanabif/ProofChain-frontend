import { api } from '../client';
import type { Request, RequestStatus, RequestType } from '../../types/request';

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/**
 * Maps backend request object to frontend Request model
 */
const mapRequest = (raw: any): Request => {
  const statusMapping: Record<string, RequestStatus> = {
    'PENDING': 'pending',
    'ACCEPTED': 'approved',
    'REJECTED': 'declined',
    'CANCELLED': 'cancelled'
  };

  return {
    id: raw.id,
    senderId: raw.requester,
    receiverId: raw.target_user,
    assetId: raw.asset || '', // Default if missing
    licenseId: raw.license,
    requesterName: raw.requester_name || `User ${raw.requester.substring(0, 4)}`,
    requesterEmail: raw.requester_email || '',
    receiverName: raw.target_user_name || 'License Owner',
    receiverEmail: raw.target_user_email || '',
    message: raw.message,
    status: statusMapping[raw.status] || 'pending',
    type: raw.type as RequestType,
    createdAt: raw.created_at,
  };
};

export const getRequests = async (page = 1, pageSize = 10): Promise<PaginatedResponse<Request>> => {
  const response = await api.get<PaginatedResponse<any>>('/api/transactions/requests', {
    params: { page, page_size: pageSize },
  });
  
  return {
    ...response.data,
    results: response.data.results.map(mapRequest),
  };
};

export const createRequest = async (data: Partial<Request>): Promise<Request> => {
  // Map frontend fields back to backend if necessary
  const payload = {
    license: data.licenseId,
    target_user: data.receiverId,
    message: data.message,
    type: data.type,
    requester_name: data.requesterName,
    requester_email: data.requesterEmail,
    // Add other fields as per backend requirements
  };
  
  const response = await api.post<any>('/api/transactions/requests/', payload);
  return mapRequest(response.data);
};

export const approveRequest = async (id: string): Promise<Request> => {
  const response = await api.post<any>(`/api/transactions/requests/${id}/approve/`);
  return mapRequest(response.data);
};

export const rejectRequest = async (id: string): Promise<Request> => {
  const response = await api.post<any>(`/api/transactions/requests/${id}/reject/`);
  return mapRequest(response.data);
};

export const cancelRequest = async (id: string): Promise<void> => {
  await api.delete(`/api/transactions/requests/${id}/`);
};
