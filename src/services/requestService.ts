import { delay } from "./api";
import type { Request } from "../types/request";
import { mockRequests } from "../mocks/requests";

let requests = [...mockRequests];

export const getRequests = async (): Promise<Request[]> => {
  await delay(800);
  return requests;
};

export const approveRequest = async (id: string): Promise<Request> => {
  await delay(1000);
  const index = requests.findIndex((r) => r.id === id);
  if (index === -1) throw new Error("Request not found");
  
  const updatedRequest: Request = { ...requests[index], status: "approved" };
  requests = requests.map((r) => (r.id === id ? updatedRequest : r));
  return updatedRequest;
};

export const declineRequest = async (id: string): Promise<Request> => {
  await delay(1000);
  const index = requests.findIndex((r) => r.id === id);
  if (index === -1) throw new Error("Request not found");
  
  const updatedRequest: Request = { ...requests[index], status: "declined" };
  requests = requests.map((r) => (r.id === id ? updatedRequest : r));
  return updatedRequest;
};
