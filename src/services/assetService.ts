import { delay } from "./api";
import type { Asset } from "../types/asset";
import { mockAssets } from "../mocks/assets";

let assets = [...mockAssets];

export const getAssets = async (): Promise<Asset[]> => {
  await delay(800);
  return assets;
};

export const getAssetById = async (id: string): Promise<Asset | null> => {
  await delay(500);
  return assets.find((a) => a.id === id) || null;
};

export const getAssetsByLicenseId = async (licenseId: string): Promise<Asset[]> => {
  await delay(600);
  return assets.filter((a) => a.licenseId === licenseId);
};
