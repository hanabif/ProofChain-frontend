export type LicenseType = "personal" | "exclusive" | "non-exclusive" | "PERSONAL" | "EXCLUSIVE" | "NON_EXCLUSIVE";
export type LicenseStatus = "active" | "inactive" | "ACTIVE" | "INACTIVE";

export interface Asset {
  id: string;
  file: string;
  phash: string;
  title?: string;
  description?: string;
  createdAt: string;
  status: string;
}

export interface License {
  id: string;
  title: string;
  type: LicenseType;
  status?: LicenseStatus;
  price?: number | string;
  description: string;
  assets: Asset[];
  assetCount?: number;
  requestCount?: number;
}
