import { delay } from "../../services/api";
import type { User } from "../../types/auth.types";
import { mockUsers } from "../../mocks/users";

export const getUsers = async (): Promise<User[]> => {
  await delay(800);
  return mockUsers;
};

export const getUserById = async (id: string): Promise<User | undefined> => {
  await delay(500);
  return mockUsers.find(u => u.id === id);
};
