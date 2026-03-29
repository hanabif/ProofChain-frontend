import type { License } from "../types/license";

export const mockLicenses: License[] = [
  {
    id: "l1",
    title: "Personal Portfolio License",
    type: "personal",
    status: "active",
    price: 0,
    description: "Standard personal use license for individual creators.",
    assets: [],
    assetCount: 12,
    requestCount: 5,
  },
  {
    id: "l2",
    title: "Exclusive Photography Rights",
    type: "exclusive",
    status: "active",
    price: 500,
    description: "Full exclusive rights to the asset. No one else can use it.",
    assets: [],
    assetCount: 3,
    requestCount: 2,
  },
  {
    id: "l3",
    title: "Commercial Distribution License",
    type: "non-exclusive",
    status: "active",
    price: 150,
    description: "Standard commercial use license for businesses.",
    assets: [],
    assetCount: 25,
    requestCount: 10,
  },
];
