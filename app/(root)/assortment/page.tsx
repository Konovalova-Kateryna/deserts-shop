import { Assortment, Container, TitleComponent } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { Category, Product } from "@prisma/client";

interface CategoryWithProducts extends Category {
  products: Product[];
}

export default async function AssortmentPage() {
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

  return (
    <div className="border-t-2 border-black">
      <Container>
        <TitleComponent className=" mb-3 lg:mb-1">
          Наш асортимент
        </TitleComponent>

        <Assortment categories={categories} trendProducts={trendProducts} />
      </Container>
    </div>
  );
}
