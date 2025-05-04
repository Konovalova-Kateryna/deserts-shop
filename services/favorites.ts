import { axiosInstance } from "./instance";

export const getFavorites = async () => {
  const { data } = await axiosInstance.get("/favorite");

  return data;
};
export const addFavoriteItem = async (id: string) => {
  const { data } = await axiosInstance.post("/favorite", { id });
  return data;
};
