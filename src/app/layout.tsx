import type { Metadata } from "next";
import localFont from "next/font/local";
import { Prata } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// 1. Body Font: Montserrat-Regular.ttf
const bodyFont = localFont({
  src: "../../public/fonts/Montserrat-Regular.ttf",
  variable: "--font-body",
  display: "swap",
});

// 2. Logo Font: cartesius.ttf
// const logoFont = localFont({
//   src: "../../public/fonts/cartesius.ttf",
//   variable: "--font-logo",
//   display: "swap",
// });
const logoFont = Prata({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-logo",
  display: "swap",
});
// 3. Tagline Font: ArialGrotesk-Regular.otf

const taglineFont = Prata({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-tagline",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pingaksh Renewables | Clean Energy Infrastructure",
  description:
    "Powering a sustainable tomorrow through solar and renewable energy excellence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${logoFont.variable} ${taglineFont.variable} scroll-smooth`}
    >
      <body className="font-body antialiased bg-background text-foreground selection:bg-pingaksh-terracotta selection:text-white">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
