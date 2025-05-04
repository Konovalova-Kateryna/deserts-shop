"use client";

import React, { useMemo, useState } from "react";
import { ProductsCarousel } from "@/components/shared/products-carrousel";
import { Categories, Container } from "@/components/shared";
import { Category, Product } from "@prisma/client";
import { TrendProductComponent } from "./trend-product";
import { filterProductsByCategory } from "./filteredProducts";
import { useFavorites } from "@/hooks/use-favorites";

interface CategoryWithProducts extends Category {
  products: Product[];
}

interface Props {
  className?: string;
  categories: CategoryWithProducts[];
  trendProducts: Product[];
}

export const HomeClient: React.FC<Props> = ({ categories, trendProducts }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const allProducts = categories.flatMap((cat) => cat.products ?? []);
  const { items } = useFavorites();
  const { filteredProducts, trendingProduct } = filterProductsByCategory(
    allProducts,
    trendProducts,
    activeCategory
  );
  const favoriteProductsIds = useMemo(() => {
    return items?.map((item) => item.product.id) ?? [];
  }, [items]);

  return (
    <div className="mb-20">
      <Container>
        <div className="lg:flex mb-[60px] lg:mb-[100px] justify-between">
          <Categories
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={(categoryId) => {
              setActiveCategory((prev) =>
                prev === categoryId ? null : categoryId
              );
            }}
          />
          <TrendProductComponent product={trendingProduct} />
        </div>
        <ProductsCarousel
          products={filteredProducts}
          favoriteProductsIds={favoriteProductsIds}
        />
      </Container>
    </div>
  );
};
