import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["cyrillic"],
  weight: ["400", "300", "700", "900"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ua">
      <head>
        <link rel="icon" href="/logo/Logo.png" data-rh="true" />
      </head>
      <body className={`${roboto.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
