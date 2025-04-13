import React from "react";
import { BurgerMenu } from "./burger-menu";
import Link from "next/link";
import { Menu } from "lucide-react";

interface Props {
  className?: string;
}

export const BurgerBtn: React.FC<Props> = ({ className }) => {
  return (
    <BurgerMenu>
      <Link href="" className={className}>
        <Menu
          size="48"
          strokeWidth={1}
          className=" cursor-pointer hover:text-red-500 lg:opacity-0 lg:cursor-none"
        />
      </Link>
    </BurgerMenu>
  );
};
