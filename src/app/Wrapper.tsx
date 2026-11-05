"use client";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { usePathname } from "next/navigation";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const router = usePathname();

  return (
    <div>
      {router === "/festive/diwali" ? null : <Navbar />}
      {children}
      {router === "/festive/diwali" ? null : <Footer />}
    </div>
  );
}
