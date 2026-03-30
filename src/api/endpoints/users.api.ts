import { api } from "../client";
import type { User } from "../../types/auth.types";

export const getUsers = async (q?: string, limit = 20): Promise<User[]> => {
  const params: any = { limit };
  if (q) params.q = q;
  
  const response = await api.get<User[]>("/auth/users/search", { params });
  return response.data;
};

export const getUserById = async (id: string): Promise<User | undefined> => {
  const response = await api.get<User>(`/auth/users/${id}`);
  return response.data;
};
