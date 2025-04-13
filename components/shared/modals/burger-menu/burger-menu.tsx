import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ChevronDown, Home, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Icon from "../../icon";
import { set } from "react-hook-form";
import { AuthModal } from "../auth-modal/auth-modal";
import { Button } from "@/components/ui";

interface Props {
  className?: string;
}

export const BurgerMenu: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <Sheet open={openMenu} onOpenChange={setOpenMenu}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="left"
        className={cn(
          "min-w-[320px] lg:w-[500px] mx-auto bg-[--yellow] px-3 left-1",
          className
        )}
      >
        <div className="flex flex-col gap-2 font-segoe font-semibold text-xl">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => setOpenMenu(false)}
          >
            <Home size={20} />
            Головна
          </Link>
          <div className="relative">
            <button
              onClick={() => setOpenSubmenu(!openSubmenu)}
              className="flex items-center justify-between w-full"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag size={20} />
                Асортимент
              </span>
              <ChevronDown
                size={20}
                className={cn(
                  "transition-transform",
                  openSubmenu && "rotate-180"
                )}
              />
            </button>
            {openSubmenu && (
              <div className="flex flex-col gap-2 pl-6 mt-2 text-lg">
                <Link
                  href="/assortiment/donuts"
                  className="flex gap-2"
                  onClick={() => setOpenMenu(false)}
                >
                  <Icon
                    name="icon-donut"
                    className=" fill-none stroke-black stroke-2 w-5 h-5"
                  />
                  Пончики
                </Link>
                <Link
                  href="/assortiment/macaroons"
                  className="flex gap-2"
                  onClick={() => setOpenMenu(false)}
                >
                  <Icon
                    name="icon-makaroon"
                    className=" fill-none stroke-black w-5 h-5"
                  />
                  Макаруни
                </Link>
                <Link
                  href="/assortiment/cupcakes"
                  className="flex gap-2"
                  onClick={() => setOpenMenu(false)}
                >
                  <Icon
                    name="icon-cupcake"
                    className=" fill-none stroke-black w-5 h-5"
                  />
                  Капкейки
                </Link>
              </div>
            )}
          </div>

          <Button
            className="flex items-center gap-2 w-full"
            onClick={() => {
              setOpenAuthModal(true);
            }}
          >
            <User size={20} />
            Профіль
          </Button>
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
