export type AssetStatus = "verified" | "pending" | "error";

export interface Asset {
  id: string;
  title: string;
  type: string;
  createdAt: string;
  licenseId: string;
  status: AssetStatus;
}
