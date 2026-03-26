"use client"

import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./hero.css";
import { motion } from "framer-motion";
import { Container } from "../container";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export const Hero: React.FC<Props> = ({ className }) => {
  return (
    <section
      className={cn(
        `w-full pt-11 pb-20 lg:pt-[63px] lg:pb-[268px] text-center lg:h-[866px] lg:text-center border-b-2 border-black`,
        className
      )}
    >
      <Container>
        <div className=" lg:inline-block lg:text-start lg:w-[994px] lg:h-[535px] relative">
          <motion.div className="w-full flex justify-center mb-[38px] lg:mb-0 lg:relative"
          initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}>
            <Image
              src="/heroImg.jpg"
              alt="macaroons"
              width={320}
              height={530}
              className="bg-image"
            />
          </motion.div>
          <motion.h1 className="
              mx-auto text-shadow z-20 font-extrabold
              text-[52px] leading-none
              sm:text-[72px]
              md:text-[96px]
              lg:relative lg:pt-[160px] lg:font-bold lg:text-[200px] lg:flex items-center
              uppercase lg:tracking-[5px] mb-6 lg:mb-11 font-Open_Sans
            "
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            >
            Десер<span className="hero-title-end">ти</span>
          </motion.h1>
          <motion.p   className="
              font-roboto font-normal lowercase leading-snug
              text-base
              sm:text-lg
              md:text-xl
              lg:text-[35px]
              mb-[30px] lg:mb-11
            "
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}>
            твоя насолода на свята і будні
          </motion.p>
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <Link
              className="
                inline-block py-4 px-8 text-center
                w-full max-w-[320px]
                sm:w-auto sm:min-w-[200px]
                lg:py-[14px] lg:w-[190px]
                border-solid border-2 border-black
                font-segoe uppercase font-normal text-sm sm:text-base tracking-widest
                transition-all duration-300
                hover:bg-black hover:text-white
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black
              "
              href="/assortment"
            >
              обирай
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
