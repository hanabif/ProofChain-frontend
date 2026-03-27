import type { Request } from "../types/request";

export const mockRequests: Request[] = [
  {
    id: "r1",
    assetId: "a1",
    licenseId: "l1",
    requesterName: "John Doe",
    requesterEmail: "john@example.com",
    message: "I would like to use this for my personal project.",
    status: "pending",
    createdAt: "2026-03-25T11:00:00Z",
  },
  {
    id: "r2",
    assetId: "a2",
    licenseId: "l2",
    requesterName: "Jane Smith",
    requesterEmail: "jane@company.com",
    message: "Interested in exclusive rights for our upcoming campaign.",
    status: "approved",
    createdAt: "2026-03-26T15:45:00Z",
  },
  {
    id: "r3",
    assetId: "a3",
    licenseId: "l3",
    requesterName: "Bob Johnson",
    requesterEmail: "bob@agency.com",
    message: "Need this for a client presentation.",
    status: "declined",
    createdAt: "2026-03-24T10:20:00Z",
  },
];
