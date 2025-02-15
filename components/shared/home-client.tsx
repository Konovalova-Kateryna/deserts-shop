"use client";

import React, { useState } from "react";
import { ProductsCarousel } from "@/components/shared/products-carrousel";
import { Categories, Container } from "@/components/shared";
import { Category, Product } from "@prisma/client";
import { TrendProductComponent } from "./trend-product";
import { filterProductsByCategory } from "./filteredProducts";

interface CategoryWithProducts extends Category {
  products: Product[];
}

interface Props {
  className?: string;
  categories: CategoryWithProducts[];
  trendProducts: Product[];
  activeCategory?: number | null;
}

export const HomeClient: React.FC<Props> = ({ categories, trendProducts }) => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const allProducts = categories.flatMap((cat) => cat.products ?? []);

  const { filteredProducts, trendingProduct } = filterProductsByCategory(
    allProducts,
    trendProducts,
    activeCategory
  );

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
        <ProductsCarousel products={filteredProducts} />
      </Container>
    </div>
  );
};
