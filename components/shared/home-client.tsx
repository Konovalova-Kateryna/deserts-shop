"use client";

import React, { Suspense, useMemo, useState } from "react";
import { ProductsCarousel } from "@/components/shared/products-carrousel";
import { Categories, Container } from "@/components/shared";
import { Category, Product } from "@prisma/client";
import { TrendProductComponent } from "./trend-product";
import { filterProductsByCategory } from "./filteredProducts";
import { motion } from "framer-motion";
import { useFavorites } from "@/hooks/use-favorites";
import { ProductsGridSkeleton } from "./product-card-skeleton";

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
         <motion.div
          className="
            flex flex-col gap-10
            md:flex-row md:justify-between
            mb-[60px] lg:mb-[100px]
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
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
        </motion.div>

        <Suspense fallback={<ProductsGridSkeleton count={3} />}>
        <ProductsCarousel
          products={filteredProducts}
          favoriteProductsIds={favoriteProductsIds}
        />
        </Suspense>
      </Container>
    </div>
  );
};
