import { Hero, SurprizeSection, TitleComponent } from "@/components/shared";

import { HomeClient } from "@/components/shared/home-client";

import { prisma } from "@/prisma/prisma-client";
import { Product, Category } from "@prisma/client";

interface CategoryWithProducts extends Category {
  products: Product[];
}

export default async function Home() {
  const categories: CategoryWithProducts[] = await prisma.category.findMany({
    include: {
      products: true,
    },
  });
  const trendProducts = await prisma.product.findMany({
    where: {
      trend: true,
    },
  });
  const products = await prisma.product.findMany({});

  return (
    <div className="block mx-auto mt-[80px] lg:mt-[200px]">
      <Hero />
      <TitleComponent>Дивись наш асортимент</TitleComponent>
      <HomeClient categories={categories} trendProducts={trendProducts} />
      <SurprizeSection />
    </div>
  );
}
