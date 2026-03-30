import type { Request } from "../types/request";
import * as requestsApi from "../api/endpoints/requests.api";

export const getRequests = async (): Promise<Request[]> => {
  const response = await requestsApi.getRequests(1, 100); // Fetch a larger batch for the service
  return response.results;
};

export const createRequest = async (data: Partial<Request>): Promise<Request> => {
  return await requestsApi.createRequest(data);
};

export const approveRequest = async (id: string): Promise<Request> => {
  return await requestsApi.approveRequest(id);
};

export const declineRequest = async (id: string): Promise<Request> => {
  return await requestsApi.rejectRequest(id);
};

export const rejectRequest = async (id: string): Promise<Request> => {
  return await requestsApi.rejectRequest(id);
};

export const cancelRequest = async (id: string): Promise<void> => {
  return await requestsApi.cancelRequest(id);
};

