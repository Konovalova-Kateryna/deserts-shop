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

interface CategoryWithProducts extends Category {
  products: Product[];
}

type SortOptions = "price_asc" | "price_desc" | "popular";

interface Props {
  className?: string;
  categories: CategoryWithProducts[];
  trendProducts: Product[];
}

export const Assortment: React.FC<Props> = ({ categories, trendProducts }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortOptions, setSortOptions] = useState<SortOptions>("popular");

  const allProducts = categories.flatMap((cat) => cat.products ?? []);
  const fetchCartItems = useCartStore((state) => state.fetchCartItems);

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
        return products.sort((a, b) => a.favorite - b.favorite);
    }
  }, [filteredProducts, sortOptions]);

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

      <div className="w-full flex flex-wrap gap-20 my-10">
        {sortedProducts.map((item, index) => (
          <div key={item.id} className="max-w-[530px]">
            <ProductCard
              onBtnClick={() => onAddProduct(item)}
              item={item}
              index={index}
              showDescription={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
