
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/shared/providers";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["cyrillic"],
  weight: ["400", "300", "700", "900"],
   display: "swap",
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// ── SEO metadata ────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "Десерти — твоя насолода",
    template: "%s | Десерти",
  },
  description:
    "Замовляйте авторські десерти, макаруни та подарункові бокси з доставкою.",
  keywords: ["десерти", "макаруни", "торти", "подарункові бокси", "замовити солодощі"],
  openGraph: {
    title: "Десерти — твоя насолода",
    description: "Авторські десерти та подарункові бокси з доставкою.",
    type: "website",
    locale: "uk_UA",
  },
  icons: {
    icon: "/logo/Logo.png",
    apple: "/logo/Logo.png",
  },
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <head>
        <link rel="icon" href="/logo/Logo.png" data-rh="true" />
      </head>
      <body className={`${roboto.variable} antialiased`}>
        <Providers> {children}</Providers>
      </body>
    </html>
  );
}
