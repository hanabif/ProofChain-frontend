import { create } from 'zustand';
import type { Request, RequestStatus } from '../types/request';

interface RequestState {
  incomingRequests: Request[];
  outgoingRequests: Request[];
  
  // Actions
  setIncomingRequests: (requests: Request[]) => void;
  setOutgoingRequests: (requests: Request[]) => void;
  addIncomingRequest: (request: Request) => void;
  addOutgoingRequest: (request: Request) => void;
  updateRequestStatus: (requestId: string, status: RequestStatus) => void;
  removeRequest: (requestId: string) => void;
}

export const useRequestStore = create<RequestState>((set) => ({
  incomingRequests: [],
  outgoingRequests: [],

  setIncomingRequests: (requests) => set({ incomingRequests: requests }),
  setOutgoingRequests: (requests) => set({ outgoingRequests: requests }),

  addIncomingRequest: (request) => set((state) => ({
    incomingRequests: [request, ...state.incomingRequests.filter(r => r.id !== request.id)]
  })),

  addOutgoingRequest: (request) => set((state) => ({
    outgoingRequests: [request, ...state.outgoingRequests.filter(r => r.id !== request.id)]
  })),

  updateRequestStatus: (requestId, status) => set((state) => ({
    incomingRequests: state.incomingRequests.map((r) => 
      r.id === requestId ? { ...r, status } : r
    ),
    outgoingRequests: state.outgoingRequests.map((r) => 
      r.id === requestId ? { ...r, status } : r
    )
  })),

  removeRequest: (requestId) => set((state) => ({
    incomingRequests: state.incomingRequests.filter(r => r.id !== requestId),
    outgoingRequests: state.outgoingRequests.filter(r => r.id !== requestId)
  })),
}));
