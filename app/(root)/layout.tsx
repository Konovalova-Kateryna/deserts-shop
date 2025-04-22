import type { Metadata } from "next";

import { Header, Footer } from "@/components/shared";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Cake-studio SWEET BAKERY | Головна",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Suspense fallback={null}>
        <Header hasSearch={true} />
      </Suspense>
      {children}
      {modal}
      <Footer />
    </main>
  );
}
