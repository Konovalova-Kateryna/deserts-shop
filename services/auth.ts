import { User } from "@prisma/client";
import { axiosInstance } from "./instance";

export const getPersonalData = async () => {
  const { data } = await axiosInstance.get<User>("/auth/personal-data");
  return data;
};
