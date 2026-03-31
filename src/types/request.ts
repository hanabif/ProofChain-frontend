export type RequestStatus = "pending" | "approved" | "declined" | "cancelled";
export type RequestType = "INQUIRY" | "INVITATION" | "EXCLUSIVE" | "NON_EXCLUSIVE";

export interface Request {
  id: string;
  senderId: string;
  receiverId: string;
  assetId: string;
  licenseId: string;
  requesterName: string;
  requesterEmail: string;
  receiverName?: string;
  receiverEmail?: string;
  message: string;
  status: RequestStatus;
  type: RequestType;
  createdAt: string;
}
