import { Container } from "@/components/shared";
import { Button } from "@/components/ui";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotAuthPage() {
  return (
    <Container>
      <div className="flex flex-col items-center gap-5 mt-10">
        <div className="w-[280px] lg:w-[445px] text-center">
          <h1 className="font-bold text-2xl">Доступ заборонено</h1>
          <p className="text-lg text-gray-400 mt-10">
            Вам потрібно авторизуватись, щоб отримати доступ до цієї сторінки.
          </p>
        </div>

        <Image
          src="/cup.svg"
          alt="cup"
          width={120}
          height={120}
          aria-hidden="true"
        />

        <div className="flex flex-col lg:flex-row gap-5 mt-11">
          <Link href="/">
            <Button variant="secondary" className="w-full h-12">
              <ArrowLeft />
              На головну
            </Button>
          </Link>
          <Link href="">
            <Button variant="secondary" className="w-full h-12">
              Оновити
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
