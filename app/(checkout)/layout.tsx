import { Footer, Header } from "@/components/shared";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cake-studio SWEET BAKERY | Кошик",
};

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className="min-h-screen bg-cover bg-center z-0 pt-5"
      style={{
        backgroundImage: "url('/modal_bg_img.png')",
      }}
    >
      <Header
        hasSearch={false}
        hasCart={false}
        className="bg-transparent z-10"
      />
      {children}
      <Footer />
    </main>
  );
}
