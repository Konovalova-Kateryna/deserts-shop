import { prisma } from "@/prisma/prisma-client";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui";
import { Heart } from "lucide-react";
import { Container } from "@/components/shared";

interface PageParams {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: PageParams) {
  const { id } = await params;
  const product = await prisma.product.findFirst({ where: { id } });

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <section className="mx-auto my-20">
        <Container>
          <div className="lg:flex flex-row-reverse gap-[200px] justify-center ">
            <div className="relative min-h-[320px]">
              <Image
                src={product.imageUrl || "/NoPhoto.png"}
                alt={product.titleUa}
                width={320}
                height={320}
                className="w-[238px] h-auto mx-auto lg:w-[330px]  z-20 relative"
              />
              <Image
                src="/shadow.png"
                alt="shadow"
                width={370}
                height={45}
                className="absolute z-20 bottom-3 lg:bottom-12 left-4 lg:left-0 w-[260px] lg:w-[370px] h-[45px]"
              />
              <div
                className={`bg-[--yellow] w-full h-[82px] lg:w-[680px] lg:h-[190px] absolute bottom-0 lg:left-[-116px] z-10`}
              ></div>
            </div>
            <div className="lg:w-[433px] gap-[70px] py-12">
              <h3 className="text-2xl font-segoe font-bold lg:text-2xl">
                {product.titleUa}
              </h3>
              <p className="text-base font-normal mt-9 col-start-1">
                {product.description}
              </p>
              <div className="grid grid-cols-2 gap-[50px] lg:gap-12 justify-between items-end mt-11">
                <div className="price-with-line  lg:text-2xl font-segoe font-bold text-xl py-3 col-start-1 lg:row-start-1">
                  {product.price}грн
                </div>
                <button
                  className="w-12 h-12  transition-all col-start-2 row-start-1 lg:row-start-2 self-end justify-self-end"
                  aria-label="Add to favorites"
                >
                  <Heart
                    className=" hover:text-red-500 w-full h-full hover:stroke-2 "
                    strokeWidth={1}
                  />
                </button>

                <Button className="lg:w-[214px] col-start-1 row-start-2">
                  В кошик
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
