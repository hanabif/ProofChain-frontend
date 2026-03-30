import * as usersApi from "../api/endpoints/users.api";
import type { User } from "../types/auth.types";

export const getUsers = async (): Promise<User[]> => {
  return usersApi.getUsers();
};

export const getUserById = async (id: string): Promise<User | undefined> => {
  return usersApi.getUserById(id);
};
