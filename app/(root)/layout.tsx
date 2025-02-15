import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/app/globals.css";
import { Header, Footer } from "@/components/shared";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["cyrillic"],
  weight: ["400", "300", "700", "900"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Cake-studio SWEET BAKERY",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ua">
      <body className={`${roboto.variable} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
