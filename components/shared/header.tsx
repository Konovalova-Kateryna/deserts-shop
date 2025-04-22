"use client";

import React from "react";
import { Container } from "./container";
import NextLink from "next/link";
import { Heart } from "lucide-react";
import { Logo } from "./logo";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";
import { ProfileBtn } from "./profile-btn";
import { AuthModal } from "./modals/auth-modal/auth-modal";
import { BurgerBtn } from "./modals/burger-menu/burger-btn";
import { ToastHandler } from "@/lib/toast-handler";

interface Props {
  className?: string;
  hasSearch?: boolean;
  hasCart?: boolean;
}

export const Header: React.FC<Props> = ({ className, hasSearch = true }) => {
  const [openAuthModal, setOpenAuthModal] = React.useState(false);

  ToastHandler();

  return (
    <header className={className}>
      <Container>
        <div className="flex justify-between items-center ">
          <button>
            <BurgerBtn />
          </button>
          <Logo
            classNameLogo="w-[94px] h-[78px] lg:w-[204px] lg:h-[170px] lg:ml-[10rem]"
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

              <ProfileBtn onClick={() => setOpenAuthModal(true)} />
              <AuthModal
                open={openAuthModal}
                onClose={() => setOpenAuthModal(false)}
              />
              {/* ) : (
                <NextLink
                  href="/"
                  className="flex items-center justify-center w-[48px] rounded-[8px] "
                >
                  <LogOut
                    size="48"
                    color="black"
                    strokeWidth={1}
                    className="  cursor-pointer hover:text-red-500"
                  />
                </NextLink>
              )} */}
            </div>
            <CartButton />
          </div>
        </div>
      </Container>
    </header>
  );
};
