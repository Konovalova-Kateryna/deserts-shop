import { useSession } from "next-auth/react";
import React from "react";

import { CircleUserRound } from "lucide-react";
import NextLink from "next/link";

import { Avatar } from "./avatar";

interface Props {
  className?: string;
  onClick?: () => void;
}

export const ProfileBtn: React.FC<Props> = ({ className, onClick }) => {
  const { data: session } = useSession();

  return (
    <div className={className}>
      {!session ? (
        <button onClick={onClick} className="hidden lg:flex">
          <CircleUserRound
            size="48"
            strokeWidth={1}
            className="cursor-pointer hover:text-red-500"
          />
        </button>
      ) : (
        <NextLink href="/profile">
          <Avatar name={session?.user?.name || "A A"} />
        </NextLink>
      )}
    </div>
  );
};
