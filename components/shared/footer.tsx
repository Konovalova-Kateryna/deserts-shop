import React from "react";
import NextLink from "next/link";
import { Logo } from "./logo";
import Icon from "./icon";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black text-white">
      <div className="sm:w-[360px] lg:w-[1920px]  mx-auto px-[50px] pt-[2px] pb-[45px] lg:h-[270px] lg:px-[225px] lg:pb-1 lg:flex text-center">
        <Logo
          classNameLink=" bg-white px-[22px] py-[6px] mx-auto mb-10 lg:h-full lg:py-[49px] lg:px-[9px] lg:ml-0 lg:mr-[220px] lg:mb-0 flex justify-center"
          classNameLogo="w-[200px] h-[200px] lg:w-[222px] lg:h-full"
        />
        <div className=" font-segoe font-normal text-md leading-5 lg:flex lg:items-start lg:text-sm lg:pt-[84px] text-center ">
          <ul className=" uppercase mb-10">
            <li className="mb-6">
              <NextLink href="/">Головна</NextLink>
            </li>
            <li className="mb-6">
              <NextLink href="/about">Про нас</NextLink>
            </li>
            <li>
              <NextLink href="/reviews">Відгуки</NextLink>
            </li>
          </ul>
          <div className="mb-10 lg:ml-[195px] lg:mb-0">
            <h5 className="font-normal uppercase text-md leading-[24px] tracking-[1.5px] mb-5 lg:text-sm lg:leading-[17px] lg:mb-10">
              Контакти
            </h5>
            <ul className="font-roboto font-light text-lg lowercase leading-2 lg:text-base lg:leading-[19px]">
              <li className=" mb-2">
                <NextLink href="">+38 093 265 32 25</NextLink>
              </li>
              <li>
                <NextLink href="">+38 050 265 32 25</NextLink>
              </li>
            </ul>
          </div>
          <div className="lg:flex lg:flex-col items-start justify-start lg:ml-[200px]">
            <h5 className=" font-normal uppercase text-md leading-[24px] tracking-[1.5px] mb-5 lg:text-sm lg:leading-[17px] lg:mb-10">
              Слідкуй за нами у соцмережах
            </h5>
            <ul className="flex justify-center gap-6">
              <li className="">
                <NextLink href="">
                  <Icon name="icon-Instagram" className="w-[48px] h-[48px]" />
                </NextLink>
              </li>
              <li className="">
                <NextLink href="">
                  <Icon name="icon-Facebook" className="w-[48px] h-[48px]" />
                </NextLink>
              </li>
              <li className="">
                <NextLink href="">
                  <Icon name="icon-Telegram" className="w-[48px] h-[48px]" />
                </NextLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
