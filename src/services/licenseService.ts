import { delay } from "./api";
import type { License } from "../types/license";
import { mockLicenses } from "../mocks/licenses";

let licenses = [...mockLicenses];

export const getLicenses = async (): Promise<License[]> => {
  await delay(800);
  return licenses;
};

export const createLicense = async (license: Omit<License, "id" | "assetCount" | "requestCount">): Promise<License> => {
  await delay(1000);
  const newLicense: License = {
    ...license,
    id: `l${licenses.length + 1}`,
    assetCount: 0,
    requestCount: 0,
  };
  licenses = [...licenses, newLicense];
  return newLicense;
};

export const updateLicense = async (id: string, updates: Partial<License>): Promise<License> => {
  await delay(800);
  const index = licenses.findIndex((l) => l.id === id);
  if (index === -1) throw new Error("License not found");
  
  const updatedLicense = { ...licenses[index], ...updates };
  licenses = licenses.map((l) => (l.id === id ? updatedLicense : l));
  return updatedLicense;
};

export const getLicenseById = async (id: string): Promise<License> => {
  await delay(500);
  const license = licenses.find((l) => l.id === id);
  if (!license) throw new Error("License not found");
  return license;
};
