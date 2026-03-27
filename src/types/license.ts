export type LicenseType = "personal" | "exclusive" | "non-exclusive";
export type LicenseStatus = "active" | "inactive";

export interface License {
  id: string;
  type: LicenseType;
  status: LicenseStatus;
  price?: number;
  description: string;
  assetCount: number;
  requestCount: number;
}
