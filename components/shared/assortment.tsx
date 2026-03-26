"use client";

import React, { useMemo, useState } from "react";
import { filterProductsByCategory } from "./filteredProducts";
import { Category, Product } from "@prisma/client";
import { ProductCard } from "./product-card";
import { AssortimentCategories } from "./assortiment-categories";
import { addCartItem } from "@/services/cart";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { useCartStore } from "@/store";
import { useFavorites } from "@/hooks/use-favorites";
import { motion, AnimatePresence } from "framer-motion";

interface CategoryWithProducts extends Category {
  products: Product[];
}

type SortOptions = "price_asc" | "price_desc" | "popular";

interface Props {
  className?: string;
  categories: CategoryWithProducts[];
  trendProducts: Product[];
}

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

export const Assortment: React.FC<Props> = ({ categories, trendProducts }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortOptions, setSortOptions] = useState<SortOptions>("popular");

  const allProducts = categories.flatMap((cat) => cat.products ?? []);
  const fetchCartItems = useCartStore((state) => state.fetchCartItems);

  const { items } = useFavorites();

  const { filteredProducts } = filterProductsByCategory(
    allProducts,
    trendProducts,
    activeCategory
  );

  const onAddProduct = async (item: Product) => {
    try {
      await addCartItem({
        productItemId: item.id,
        quantity: 1,
      });
      await fetchCartItems();
      toast.success(`${item.titleUa} додано до кошика.`);
    } catch (error) {
      toast.error("Упс! Щось пішло не так.");
      console.error(error);
    }
  };

  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];

    switch (sortOptions) {
      case "price_asc":
        return products.sort((a, b) => a.price - b.price);
      case "price_desc":
        return products.sort((a, b) => b.price - a.price);
      case "popular":

      default:
        return products.sort((a, b) => a.favoriteCount! - b.favoriteCount!);
    }
  }, [filteredProducts, sortOptions]);

  const favoriteProductsIds = useMemo(() => {
    return items?.map((item) => item.product.id) ?? [];
  }, [items]);

  return (
    <div>
      <div className=" flex flex-col lg:flex-row justify-between items-center">
        <AssortimentCategories
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={(categoryId) => {
            setActiveCategory((prev) =>
              prev === categoryId ? null : categoryId
            );
          }}
        />
        <Select
          value={sortOptions}
          onValueChange={(val: SortOptions) => setSortOptions(val)}
        >
          <SelectTrigger className="w-full lg:w-[320px] mt-5 bg-white border-black rounded-none font-segoe font-normal text-l uppercase">
            <SelectValue placeholder="Сортувати" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              className="font-segoe font-normal text-l uppercase"
              value="price_asc"
            >
              Збільшення ціни
            </SelectItem>
            <SelectItem
              className="font-segoe font-normal text-l uppercase"
              value="price_desc"
            >
              Зменшення ціни
            </SelectItem>
            <SelectItem
              className="font-segoe font-normal text-l uppercase"
              value="popular"
            >
              За популярністю
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

        {/* Product grid with stagger + AnimatePresence for filter transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory ?? "all"}
          className="
            w-full grid gap-6 my-10
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
          "
          variants={listVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
        {sortedProducts.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              layout
              className="w-full"
            >
            <ProductCard
              onBtnClick={() => onAddProduct(item)}
              item={item}
              index={index}
              showDescription={true}
              isProductFavorite={favoriteProductsIds.includes(item.id)}
            />
          </motion.div> 
        ))}
        </motion.div>
      </AnimatePresence>

       {sortedProducts.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 font-segoe text-xl py-20"
        >
          Товарів у цій категорії не знайдено
        </motion.p>
      )}
    </div>
  );
};
