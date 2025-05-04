import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Home, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import { AuthModal } from "../auth-modal/auth-modal";
import { useSession } from "next-auth/react";

interface Props {
  className?: string;
}

export const BurgerMenu: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  // const [openSubmenu, setOpenSubmenu] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { data: session } = useSession();

  const handleClick = () => {
    setOpenMenu(false);
    if (!session) {
      setOpenAuthModal(true);
    }
  };

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
            <Link
              href={"/assortment"}
              onClick={() => setOpenMenu(false)}
              className="flex items-center gap-2"
            >
              <ShoppingBag size={20} />
              Асортимент
            </Link>
          </div>

          {session ? (
            <Link
              href="/profile"
              onClick={handleClick}
              className="flex items-center gap-2 w-full"
            >
              <User size={20} />
              Профіль
            </Link>
          ) : (
            <button
              className="flex items-center gap-2 w-full"
              onClick={handleClick}
            >
              <User size={20} />
              Профіль
            </button>
          )}

          {/* {session && <FavoriteProducts/>} */}
        </div>
      </SheetContent>
      <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
    </Sheet>
  );
};
