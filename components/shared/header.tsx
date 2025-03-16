import React from "react";
import { Container } from "./container";
import NextLink from "next/link";
import { Heart, CircleUserRound, Menu } from "lucide-react";
import { Logo } from "./logo";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";

import { Button } from "../ui";

interface Props {
  className?: string;
  hasSearch?: boolean;
  hasCart?: boolean;
}

export const Header: React.FC<Props> = ({
  className,
  hasSearch = true,
  hasCart = true,
}) => {
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
            <div className="flex gap-6">
              {hasSearch && (
                <div className="hidden lg:flex gap-6">
                  <SearchInput />

                  <NextLink href="">
                    <Heart
                      size="48"
                      strokeWidth={1}
                      className="  cursor-pointer hover:text-red-500"
                    />
                  </NextLink>
                </div>
              )}

              {hasCart ? (
                <NextLink href="/profile" className="hidden lg:flex">
                  <CircleUserRound
                    size="48"
                    strokeWidth={1}
                    className="cursor-pointer hover:text-red-500"
                  />
                </NextLink>
              ) : (
                <Button className="flex items-center justify-center w-[200px] rounded-[8px] ">
                  {/* <CircleUserRound
                    size="48"
                    strokeWidth={1}
                    className="w-48 h-48"
                  /> */}
                  Вихід
                </Button>
              )}
            </div>
            {hasCart && <CartButton />}
          </div>
        </div>
      </Container>
    </header>
  );
};
