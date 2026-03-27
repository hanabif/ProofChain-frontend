import type { Asset } from "../types/asset";

export const mockAssets: Asset[] = [
  {
    id: "a1",
    title: "Project Alpha Documentation",
    type: "PDF",
    createdAt: "2026-03-20T10:00:00Z",
    licenseId: "l1",
    status: "verified",
  },
  {
    id: "a2",
    title: "Brand Logo Vector",
    type: "SVG",
    createdAt: "2026-03-21T14:30:00Z",
    licenseId: "l2",
    status: "verified",
  },
  {
    id: "a3",
    title: "Q1 Financial Report",
    type: "XLSX",
    createdAt: "2026-03-22T09:15:00Z",
    licenseId: "l3",
    status: "pending",
  },
];
