export type LicenseType = "personal" | "exclusive" | "non-exclusive" | "PERSONAL" | "EXCLUSIVE" | "NON_EXCLUSIVE";
export type LicenseStatus = "active" | "inactive" | "ACTIVE" | "INACTIVE";

export interface Asset {
  id: string;
  file: string;
  phash: string;
  title?: string;
  description?: string;
  createdAt?: string;
  created_at?: string;
  status?: string;
}

export interface License {
  id: string;
  title: string;
  type: LicenseType | string;
  status?: LicenseStatus | string;
  price?: number | string;
  description: string;
  assets: Asset[];
  assetCount?: number;
  requestCount?: number;
  owner?: {
    id: string;
    username: string;
    email?: string;
  };
  created_at?: string;
  createdAt?: string;
}
