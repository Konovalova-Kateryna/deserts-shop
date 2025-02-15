import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const TitleComponent: React.FC<Props> = ({ children }) => {
  return (
    <h2 className="font-roboto bg-black text-white px-5 lg:px-[60px] py-[10px] lg:py-5 font-black text-xl lg:text-[48px] leading-2 tracking-[3px] uppercase text-center mx-auto table mb-[60px] lg:mb-[100px]">
      {children}
    </h2>
  );
};
