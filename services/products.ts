import { ApiRoutes } from "./api-routes";
import { axiosInstance } from "./instance";
import { Product } from "@prisma/client";

export const search = async (query: string): Promise<Product[]> => {
  return (
    await axiosInstance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, {
      params: { query },
    })
  ).data;
};

// export const favoriteProduct = async () => {
//   return await axiosInstance.get<>();
// };
