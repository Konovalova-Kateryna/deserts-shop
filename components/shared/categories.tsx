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

export const Categories: React.FC<Props> = ({
  className,
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className={cn("flex lg:flex-col", className)}>
      {categories.map((cat) => (
        <NextLink
          href="#"
          key={cat.id}
          onClick={(e) => {
            e.preventDefault();
            onSelectCategory?.(cat.id);
          }}
          className={`flex flex-col h-[120px] w-[106px] pt-3 items-center lg:w-[230px] lg:h-[180px] lg:py-5 lg:pl-20 lg:justify-end transition-color ${
            activeCategory === cat.id ? cat.color : "bg-(var-) text-black"
          }`}
        >
          <Icon
            name={cat.icon}
            className="w-[78px] h-[78px] lg:w-[120px] lg:h-[120px] fill-none stroke-black"
          />
          <h3 className="font-segoe font-normal text-xs uppercase">
            {cat.nameUa}
          </h3>
        </NextLink>
      ))}
    </div>
  );
};
