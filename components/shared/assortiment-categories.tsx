"use client";

import { cn } from "@/lib/utils";
import React from "react";
import NextLink from "next/link";
import Icon from "./icon";
import { Category } from "@prisma/client";

interface Props {
  className?: string;
  categories: Category[];
  activeCategory?: string | null;
  onSelectCategory?: (categoryId: string) => void;
}

export const AssortimentCategories: React.FC<Props> = ({
  className,
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div
      className={cn(
        "flex justify-between lg:justify-normal items-center ",
        className
      )}
    >
      {categories.map((cat) => (
        <NextLink
          href="#"
          key={cat.id}
          onClick={(e) => {
            e.preventDefault();
            onSelectCategory?.(cat.id);
          }}
          className={`p-3 items-center lg:flex gap-1 lg:w-[230px] lg:p-3 lg:justify-center transition-color ${
            activeCategory === cat.id ? cat.color : "bg-(var-) text-black"
          }`}
        >
          <Icon
            name={cat.icon}
            className="w-[78px] h-[78px] lg:w-[120px] lg:h-[120px] fill-none stroke-black"
          />
          <h3 className="hidden lg:block font-segoe font-normal text-l uppercase">
            {cat.nameUa}
          </h3>
        </NextLink>
      ))}
    </div>
  );
};
