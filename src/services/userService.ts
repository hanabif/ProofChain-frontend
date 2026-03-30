import * as usersApi from "../api/endpoints/users.api";
import type { User } from "../types/auth.types";

export const getUsers = async (q?: string, limit?: number): Promise<User[]> => {
  return usersApi.getUsers(q, limit);
};

export const getUserById = async (id: string): Promise<User | undefined> => {
  return usersApi.getUserById(id);
};
