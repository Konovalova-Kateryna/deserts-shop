"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <NextTopLoader
        color="#1B91F0"
        height={2}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px #4DC760,0 0 5px #4DC760"
      />
      <SessionProvider>{children}</SessionProvider>
      <Toaster />
    </>
  );
};
