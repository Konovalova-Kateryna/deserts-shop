"use client";

import { Search } from "lucide-react";
import { useState, useRef } from "react";
import { useClickAway, useDebounce } from "react-use";
import { motion } from "framer-motion";
import { Api } from "@/services/api-client";
import { Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

export const SearchInput = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickAway(containerRef, () => {
    if (query.trim() === "") {
      setIsFocused(false);
    }
  });

  useDebounce(
    async () => {
      if (!query.trim()) {
        setProducts([]);
        return;
      }
      try {
        await Api.products.search(query).then((items) => {
          setProducts(items);
        });
      } catch (error) {
        console.log("search error", error);
      }
    },
    250,
    [query]
  );

  const onClickItem = () => {
    setIsFocused(false);
    setQuery("");
    setProducts([]);
  };

  return (
    <div
      className=" flex items-center relative text-lg font-segoe uppercase"
      ref={containerRef}
    >
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isFocused ? -320 : 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-2 "
      >
        <Search
          size="48"
          strokeWidth={1}
          className="  cursor-pointer hover:text-red-500"
          onClick={() => setIsFocused(true)}
        />
        <motion.input
          type="text"
          placeholder="search...."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          className="pl-5 pr-2 border border-black outline-none transition-all absolute left-14 h-[60px] text-lg font-segoe uppercase"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: isFocused ? 320 : 0, opacity: isFocused ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      {isFocused && query && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-full right-[260px] mt-4 w-full text-l"
        >
          {products.map((product) => (
            <Link
              onClick={onClickItem}
              key={product.id}
              className="flex items-center gap-2 w-full px-3 py-4 hover:bg-orange-300"
              href={`/product/${product.id}`}
            >
              <Image
                className="rounded-sm h-8 w-8"
                src={product.imageUrl || "/NoPhoto.png"}
                alt={product.name}
                width={8}
                height={8}
              />
              <span>{product.titleUa}</span>
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
};
