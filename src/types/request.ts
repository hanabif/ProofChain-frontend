export type RequestStatus = "pending" | "approved" | "declined";

export interface Request {
  id: string;
  assetId: string;
  licenseId: string;
  requesterName: string;
  requesterEmail: string;
  message: string;
  status: RequestStatus;
  createdAt: string;
}
