import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./hero.css";
import { Container } from "../container";

export const Hero: React.FC<Props> = ({ className }) => {
  return (
    <section className="w-full pt-11 pb-20 lg:pt-[63px] lg:pb-[268px] text-center lg:h-[866px] lg:text-center border-b-2 border-black">
      <Container>
        <div className=" lg:inline-block lg:text-start lg:w-[994px] lg:h-[535px] relative">
          <div className="w-full flex justify-center mb-[38px] lg:mb-0 lg:relative">
            <Image
              src="/heroImg.jpg"
              alt="macaroons"
              width={320}
              height={530}
              className="bg-image"
            />
          </div>
          <h1 className="mx-auto text-shadow lg:relative lg:pt-[160px]  z-20 font-extrabold lg:font-bold text-[60px] lg:text-[200px] lg:flex items-center  uppercase lg:tracking-[5px] mb-6 lg:mb-11 font-Open_Sans">
            Десер<span className="hero-title-end">ти</span>
          </h1>
          <p className=" font-roboto font-normal text-md lowercase leading-2  lg:text-[35px] mb-[30px] lg:mb-11 ">
            твоя насолода на свята і будні
          </p>
          <Link
            className="inline-block py-5 lg:py-[14px] text-center w-full lg:w-[190px] border-solid border-2 border-black font-segoe uppercase font-normal text-md tracking-widest max-w-[320px]"
            href="/products"
          >
            обирай
          </Link>
        </div>
      </Container>
    </section>
  );
};
