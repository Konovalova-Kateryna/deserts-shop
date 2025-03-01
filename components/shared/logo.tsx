import Image from "next/image";
import NextLink from "next/link";
import logo from "../../public/logo/Logo.png";
import React from "react";

interface Props {
  classNameLogo?: string;
  classNameLink?: string;
}

export const Logo: React.FC<Props> = ({ classNameLogo, classNameLink }) => {
  return (
    <NextLink className={classNameLink} href="/">
      <Image className={classNameLogo} src={logo} alt="Logo" />
    </NextLink>
  );
};
