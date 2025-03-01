import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { ChooseProductModal } from "@/components/shared";

type ProductModalPageProps = {
  params: Promise<{ id?: string }>;
};

export default async function ProductModalPage({
  params,
}: ProductModalPageProps) {
  const { id } = await params;

  if (!id) {
    return notFound();
  }

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} />;
}
