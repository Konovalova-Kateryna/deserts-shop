import { Product } from "@prisma/client";

export const filterProductsByCategory = (
  allProducts: Product[],
  trendProducts: Product[],
  activeCategory: string | null
): {
  filteredProducts: Product[];
  trendingProduct: Product;
} => {
  const filteredProducts = allProducts.filter(
    (product) =>
      activeCategory === null || product.categoryId === activeCategory
  );

  const trendingProduct =
    trendProducts.find((product) => product.categoryId === activeCategory) ??
    trendProducts[0];

  return { filteredProducts, trendingProduct };
};
