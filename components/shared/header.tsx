import React from "react";
import { Container } from "./container";
import NextLink from "next/link";
import { Heart, CircleUserRound, Menu } from "lucide-react";
import { Logo } from "./logo";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={className}>
      <Container>
        <div className="flex justify-between items-center lg:px-[80px] ">
          <button>
            <Menu
              size="48"
              color="black"
              strokeWidth={1}
              className="  cursor-pointer hover:text-red-500"
            />
          </button>
          <Logo
            classNameLogo="w-[94px] h-[78px] lg:w-[204px] lg:h-[170px]"
            classNameLink={""}
          />
          <div className="flex items-center gap-6">
            <ul className="hidden lg:flex gap-6">
              <li>
                <SearchInput />
              </li>
              <li>
                <NextLink href="">
                  <Heart
                    size="48"
                    strokeWidth={1}
                    className="  cursor-pointer hover:text-red-500"
                  />
                </NextLink>
              </li>
              <li>
                <NextLink href="/profile">
                  <CircleUserRound
                    size="48"
                    strokeWidth={1}
                    className="  cursor-pointer hover:text-red-500"
                  />
                </NextLink>
              </li>
            </ul>
            <CartButton />
          </div>
        </div>
      </Container>
    </header>
  );
};
