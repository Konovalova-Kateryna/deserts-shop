import type { Metadata } from "next";

import { Header, Footer } from "@/components/shared";

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
      <Header hasSearch={true} />
      {children}
      {modal}
      <Footer />
    </main>
  );
}
